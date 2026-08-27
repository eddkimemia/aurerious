import { db } from "@/lib/db"

const REFERRAL_FEE = 1000
const DIRECT_COMMISSION_RATE = 0.35
const UPLINE_COMMISSION_RATE = 0.15
export const SIGNUP_BONUS_AMOUNT = 500
export const SIGNUP_BONUS_REQUIRED_REFERRALS = 5

export async function createSignupBonus(userId: string) {
  try {
    const existing = await db.commission.findFirst({
      where: { userId, type: "signup_bonus" },
    })
    if (existing) return existing

    const bonus = await db.commission.create({
      data: {
        userId,
        amount: SIGNUP_BONUS_AMOUNT,
        type: "signup_bonus",
        status: "locked",
        description: `Signup airtime bonus - KES ${SIGNUP_BONUS_AMOUNT} (unlock after ${SIGNUP_BONUS_REQUIRED_REFERRALS} referrals)`,
      },
    })

    await db.transaction.create({
      data: {
        userId,
        type: "bonus",
        amount: SIGNUP_BONUS_AMOUNT,
        status: "locked",
        reference: `BONUS-${bonus.id}`,
        description: `Signup bonus KES ${SIGNUP_BONUS_AMOUNT} - locked until ${SIGNUP_BONUS_REQUIRED_REFERRALS} referrals`,
      },
    })

    return bonus
  } catch (error) {
    console.error("Signup bonus creation error:", error)
  }
}

export async function checkAndUnlockSignupBonus(userId: string) {
  try {
    const lockedBonus = await db.commission.findFirst({
      where: { userId, type: "signup_bonus", status: "locked" },
    })
    if (!lockedBonus) return

    const referralCount = await db.referral.count({
      where: { referrerId: userId, status: "completed" },
    })

    if (referralCount >= SIGNUP_BONUS_REQUIRED_REFERRALS) {
      await db.commission.update({
        where: { id: lockedBonus.id },
        data: { status: "pending", description: `Signup airtime bonus - KES ${SIGNUP_BONUS_AMOUNT} (unlocked after ${referralCount} referrals)` },
      })

      await db.transaction.updateMany({
        where: { userId, type: "bonus", status: "locked" },
        data: { status: "pending", description: `Signup bonus KES ${SIGNUP_BONUS_AMOUNT} - unlocked! Available for withdrawal` },
      })
    }
  } catch (error) {
    console.error("Bonus unlock check error:", error)
  }
}

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

    // Check if referrer's signup bonus can be unlocked after this referral
    await checkAndUnlockSignupBonus(referral.referrerId)

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
