import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    const [user, earningsAgg, pendingAgg, lockedAgg, bonusAgg, directAgg, overrideAgg, referrals, recentCommissions] = await Promise.all([
      db.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, phone: true, referralCode: true, mpesaNumber: true, createdAt: true },
      }),
      db.commission.aggregate({ where: { userId }, _sum: { amount: true } }),
      db.commission.aggregate({ where: { userId, status: "pending" }, _sum: { amount: true } }),
      db.commission.aggregate({ where: { userId, status: "locked" }, _sum: { amount: true } }),
      db.commission.findFirst({ where: { userId, type: "signup_bonus" } }),
      db.commission.aggregate({ where: { userId, type: "direct" }, _sum: { amount: true } }),
      db.commission.aggregate({ where: { userId, type: "override" }, _sum: { amount: true } }),
      db.referral.findMany({ where: { referrerId: userId }, include: { referee: { select: { id: true, name: true, phone: true, createdAt: true } } }, orderBy: { createdAt: "desc" } }),
      db.commission.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 }),
    ])

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const activeReferrals = referrals.filter((r) => r.status === "completed")
    const teamMemberIds = activeReferrals.map((r) => r.refereeId)
    const downlineCount = teamMemberIds.length

    let teamSize = downlineCount
    if (teamMemberIds.length > 0) {
      const secondLevel = await db.referral.count({ where: { referrerId: { in: teamMemberIds }, status: "completed" } })
      teamSize += secondLevel
    }

    if (!user.referralCode) {
      return NextResponse.json({ error: "No referral code assigned" }, { status: 400 })
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      (request.headers.get("x-forwarded-host") ? `https://${request.headers.get("x-forwarded-host")}` : null) ||
      "https://zuriweb.vercel.app"
    const referralLink = `${baseUrl}/ref/${user.referralCode}`

    // Auto-unlock bonus if eligible (safety net)
    if (bonusAgg?.status === "locked" && activeReferrals.length >= 5) {
      const { checkAndUnlockSignupBonus } = await import("@/lib/commission-engine")
      await checkAndUnlockSignupBonus(userId)
    }

    return NextResponse.json({
      user: { name: user.name, email: user.email, phone: user.phone, referralCode: user.referralCode, mpesaNumber: user.mpesaNumber },
      stats: {
        totalEarnings: earningsAgg._sum.amount || 0,
        pendingCommissions: pendingAgg._sum.amount || 0,
        lockedBonus: lockedAgg._sum.amount || 0,
        signupBonus: bonusAgg ? { amount: bonusAgg.amount, status: bonusAgg.status } : null,
        activeReferrals: activeReferrals.length,
        teamSize,
        referralsNeededForBonus: Math.max(0, 5 - activeReferrals.length),
      },
      earningsBreakdown: {
        direct: directAgg._sum.amount || 0,
        override: overrideAgg._sum.amount || 0,
        bonus: bonusAgg?.amount || 0,
      },
      referralLink,
      recentCommissions,
    })
  } catch (error) {
    console.error("Dashboard overview error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
