import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-helpers"

export async function GET() {
  const forbidden = await requireAdmin()
  if (forbidden) return forbidden

  try {
    const [totalUsers, activeUsers, pendingUsers, suspendedUsers, pendingPayoutsAgg, pendingPaymentsAgg, revenueAgg, recentUsers, weekSignups] = await Promise.all([
      db.user.count(),
      db.user.count({ where: { status: "active" } }),
      db.user.count({ where: { status: "pending" } }),
      db.user.count({ where: { status: "suspended" } }),
      db.payout.aggregate({ where: { status: "pending" }, _sum: { amount: true } }),
      db.mpesaTransaction.count({ where: { status: "pending", type: "registration" } }),
      db.transaction.aggregate({ _sum: { amount: true } }),
      db.user.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { id: true, name: true, phone: true, status: true, createdAt: true, referredBy: true } }),
      db.user.findMany({ where: { createdAt: { gte: new Date(Date.now() - 7 * 86400000) } }, select: { createdAt: true } }),
    ])

    const pendingPayoutsCount = await db.payout.count({ where: { status: "pending" } })
    const totalRevenue = revenueAgg._sum.amount || 0

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const chartData: { day: string; signups: number }[] = []
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate())
      const dayEnd = new Date(dayStart.getTime() + 86400000)
      const count = weekSignups.filter((u) => {
        const c = new Date(u.createdAt)
        return c >= dayStart && c < dayEnd
      }).length
      chartData.push({ day: dayNames[d.getDay()], signups: count })
    }

    const recentWithReferrers = await Promise.all(
      recentUsers.map(async (u) => {
        let referredByName = null
        if (u.referredBy) {
          const referrer = await db.user.findUnique({ where: { id: u.referredBy }, select: { name: true, phone: true } })
          referredByName = referrer?.name || referrer?.phone || null
        }
        return { id: u.id, name: u.name || u.phone, phone: u.phone, status: u.status, date: u.createdAt.toISOString().split("T")[0], referredBy: referredByName }
      }),
    )

    return NextResponse.json({
      stats: {
        totalUsers,
        activeUsers,
        pendingUsers,
        suspendedUsers,
        activeRate: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 1000) / 10 : 0,
        pendingPayouts: pendingPayoutsAgg._sum.amount || 0,
        pendingPayoutsCount,
        pendingPayments: pendingPaymentsAgg,
        totalRevenue: totalRevenue,
        revenuePerUser: totalUsers > 0 ? Math.round(totalRevenue / totalUsers) : 0,
      },
      chartData,
      recentSignups: recentWithReferrers,
    })
  } catch (error) {
    console.error("Admin overview error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
