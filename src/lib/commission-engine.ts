import { db } from "@/lib/db"

const DEFAULT_REFERRAL_FEE = 1000
const DEFAULT_DIRECT_RATE = 0.35
const DEFAULT_UPLINE_RATE = 0.15
export const SIGNUP_BONUS_AMOUNT = 500
export const SIGNUP_BONUS_REQUIRED_REFERRALS = 5

async function getCommissionSettings() {
  try {
    const settings = await db.setting.findMany({
      where: { key: { in: ["membership_fee", "direct_commission", "upline_override", "signup_bonus", "signup_bonus_required", "bonus_required_referrals"] } },
    })
    const map: Record<string, string> = {}
    for (const s of settings) map[s.key] = s.value
    const referralFee = map.membership_fee ? parseFloat(map.membership_fee) : DEFAULT_REFERRAL_FEE
    const directRate = map.direct_commission ? parseFloat(map.direct_commission) / 100 : DEFAULT_DIRECT_RATE
    const uplineRate = map.upline_override ? parseFloat(map.upline_override) / 100 : DEFAULT_UPLINE_RATE
    const signupBonus = map.signup_bonus ? parseFloat(map.signup_bonus) : SIGNUP_BONUS_AMOUNT
    const bonusRequiredRaw = map.signup_bonus_required || map.bonus_required_referrals
    const bonusRequired = bonusRequiredRaw ? parseInt(bonusRequiredRaw) : SIGNUP_BONUS_REQUIRED_REFERRALS
    return {
      referralFee: isNaN(referralFee) ? DEFAULT_REFERRAL_FEE : referralFee,
      directRate: isNaN(directRate) ? DEFAULT_DIRECT_RATE : directRate,
      uplineRate: isNaN(uplineRate) ? DEFAULT_UPLINE_RATE : uplineRate,
      signupBonus: isNaN(signupBonus) ? SIGNUP_BONUS_AMOUNT : signupBonus,
      bonusRequired: isNaN(bonusRequired) ? SIGNUP_BONUS_REQUIRED_REFERRALS : bonusRequired,
    }
  } catch {
    return {
      referralFee: DEFAULT_REFERRAL_FEE,
      directRate: DEFAULT_DIRECT_RATE,
      uplineRate: DEFAULT_UPLINE_RATE,
      signupBonus: SIGNUP_BONUS_AMOUNT,
      bonusRequired: SIGNUP_BONUS_REQUIRED_REFERRALS,
    }
  }
}

export async function createSignupBonus(userId: string) {
  try {
    const existing = await db.commission.findFirst({
      where: { userId, type: "signup_bonus" },
    })
    if (existing) return existing

    const { signupBonus, bonusRequired } = await getCommissionSettings()

    const bonus = await db.commission.create({
      data: {
        userId,
        amount: signupBonus,
        type: "signup_bonus",
        status: "locked",
        description: `Signup airtime bonus - KES ${signupBonus} (unlock after ${bonusRequired} referrals)`,
      },
    })

    await db.transaction.create({
      data: {
        userId,
        type: "bonus",
        amount: signupBonus,
        status: "locked",
        reference: `BONUS-${bonus.id}`,
        description: `Signup bonus KES ${signupBonus} - locked until ${bonusRequired} referrals`,
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

    const { signupBonus, bonusRequired } = await getCommissionSettings()
    if (referralCount >= bonusRequired) {
      await db.commission.update({
        where: { id: lockedBonus.id },
        data: { status: "pending", description: `Signup airtime bonus - KES ${signupBonus} (unlocked after ${referralCount} referrals)` },
      })

      await db.transaction.updateMany({
        where: { userId, type: "bonus", status: "locked" },
        data: { status: "pending", description: `Signup bonus KES ${signupBonus} - unlocked! Available for withdrawal` },
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

    const settings = await getCommissionSettings()
    const directAmount = settings.referralFee * settings.directRate

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
      const overrideAmount = settings.referralFee * settings.uplineRate

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
