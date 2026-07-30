import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-helpers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const forbidden = await requireAdmin()
  if (forbidden) return forbidden

  try {
    const { userId } = await params

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        referralCode: true,
        referredBy: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { referrals: true, commissions: true } },
        referrals: {
          select: { id: true, status: true, createdAt: true, referee: { select: { id: true, name: true, phone: true, status: true } } },
          orderBy: { createdAt: "desc" },
          take: 50,
        },
        commissions: {
          select: { id: true, amount: true, type: true, status: true, description: true, createdAt: true },
          orderBy: { createdAt: "desc" },
          take: 50,
        },
        transactions: {
          select: { id: true, type: true, amount: true, status: true, description: true, createdAt: true },
          orderBy: { createdAt: "desc" },
          take: 50,
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let referrer = null
    if (user.referredBy) {
      const referrerUser = await db.user.findUnique({
        where: { id: user.referredBy },
        select: { name: true, phone: true },
      })
      referrer = referrerUser
    }

    return NextResponse.json({ ...user, referrer })
  } catch (error) {
    console.error("Admin user detail error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
