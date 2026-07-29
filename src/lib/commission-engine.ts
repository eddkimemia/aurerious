import { db } from "@/lib/db"

const REFERRAL_FEE = 1000
const DIRECT_COMMISSION_RATE = 0.35
const UPLINE_COMMISSION_RATE = 0.15

export async function processReferralCommission(refereeId: string) {
  try {
    const referee = await db.user.findUnique({ where: { id: refereeId } })
    if (!referee) return

    const referral = await db.referral.findFirst({
      where: { refereeId, status: "completed" },
      include: {
        referrer: true,
      },
    })

    if (!referral) return

    const directAmount = REFERRAL_FEE * DIRECT_COMMISSION_RATE

    const directCommission = await db.commission.create({
      data: {
        userId: referral.referrerId,
        referralId: referral.id,
        amount: directAmount,
        type: "direct",
        status: "pending",
        description: `Direct commission for referring ${referee.name || referee.phone}`,
      },
    })

    await db.transaction.create({
      data: {
        userId: referral.referrerId,
        type: "commission",
        amount: directAmount,
        status: "pending",
        reference: `DIR-${directCommission.id}`,
        description: `Direct referral commission - KES ${directAmount.toFixed(2)}`,
      },
    })

    const uplineReferral = await db.referral.findFirst({
      where: { refereeId: referral.referrerId, status: "completed" },
      include: {
        referrer: true,
      },
    })

    if (uplineReferral) {
      const overrideAmount = REFERRAL_FEE * UPLINE_COMMISSION_RATE

      const overrideCommission = await db.commission.create({
        data: {
          userId: uplineReferral.referrerId,
          referralId: referral.id,
          amount: overrideAmount,
          type: "override",
          status: "pending",
          description: `Override commission for level 2 referral of ${referee.name || referee.phone}`,
        },
      })

      await db.transaction.create({
        data: {
          userId: uplineReferral.referrerId,
          type: "commission",
          amount: overrideAmount,
          status: "pending",
          reference: `OVR-${overrideCommission.id}`,
          description: `Override commission - KES ${overrideAmount.toFixed(2)}`,
        },
      })
    }
  } catch (error) {
    console.error("Commission processing error:", error)
  }
}
