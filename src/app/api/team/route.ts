import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

interface MemberNode {
  id: string
  name: string
  phone: string
  dateJoined: string
  referrals: number
  earnings: number
  downline: MemberNode[]
}

async function buildTree(referrerId: string, depth = 0): Promise<MemberNode[]> {
  if (depth > 3) return []

  const referrals = await db.referral.findMany({
    where: { referrerId, status: "completed" },
    include: {
      referee: {
        select: { id: true, name: true, phone: true, createdAt: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  const nodes: MemberNode[] = []
  for (const ref of referrals) {
    const r = ref.referee
    const count = await db.referral.count({ where: { referrerId: r.id, status: "completed" } })
    const earnings = await db.commission.aggregate({ where: { userId: r.id }, _sum: { amount: true } })
    const downline = await buildTree(r.id, depth + 1)
    nodes.push({
      id: r.id,
      name: r.name || r.phone,
      phone: r.phone,
      dateJoined: r.createdAt.toISOString().split("T")[0],
      referrals: count,
      earnings: earnings._sum.amount || 0,
      downline,
    })
  }
  return nodes
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.user.findUnique({ where: { id: session.user.id }, select: { id: true, name: true } })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const teamTree = await buildTree(session.user.id)

    const [totalMembers, activeThisMonth, teamEarnings] = await Promise.all([
      db.referral.count({ where: { referrerId: session.user.id, status: "completed" } }),
      db.referral.count({
        where: { referrerId: session.user.id, status: "completed", createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } },
      }),
      db.commission.aggregate({ where: { userId: session.user.id, type: "override" }, _sum: { amount: true } }),
    ])

    return NextResponse.json({
      teamTree,
      stats: {
        totalMembers,
        activeThisMonth,
        teamEarnings: teamEarnings._sum.amount || 0,
      },
    })
  } catch (error) {
    console.error("Team error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
