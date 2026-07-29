import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "all"

    const now = new Date()
    let dateFilter: Date | undefined

    if (period === "month") {
      dateFilter = new Date(now.getFullYear(), now.getMonth(), 1)
    } else if (period === "year") {
      dateFilter = new Date(now.getFullYear(), 0, 1)
    }

    const commissionFilter: any = { userId: session.user.id }
    if (dateFilter) {
      commissionFilter.createdAt = { gte: dateFilter }
    }

    const [totalAgg, pendingAgg, paidAgg, periodAgg, recentCommissions] = await Promise.all([
      db.commission.aggregate({
        where: { userId: session.user.id },
        _sum: { amount: true },
      }),
      db.commission.aggregate({
        where: { userId: session.user.id, status: "pending" },
        _sum: { amount: true },
      }),
      db.commission.aggregate({
        where: { userId: session.user.id, status: "paid" },
        _sum: { amount: true },
      }),
      db.commission.aggregate({
        where: commissionFilter,
        _sum: { amount: true },
      }),
      db.commission.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ])

    return NextResponse.json({
      totalEarned: totalAgg._sum.amount || 0,
      pending: pendingAgg._sum.amount || 0,
      paidOut: paidAgg._sum.amount || 0,
      thisPeriod: periodAgg._sum.amount || 0,
      period,
      recentCommissions,
    })
  } catch (error) {
    console.error("Earnings error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
