import { db } from "@/lib/db"

const REFERRAL_FEE = 1000
const LEVEL_RATES: Record<number, number> = {
  1: 0.35,
  2: 0.15,
}

export function calculateCommission(amount: number, level: number): number {
  const rate = LEVEL_RATES[level] || 0
  return amount * rate
}

export async function distributeCommissions(
  referralId: string,
  refereeId: string
): Promise<void> {
  const referral = await db.referral.findUnique({
    where: { id: referralId },
  })
  if (!referral) return

  const level1Amount = calculateCommission(REFERRAL_FEE, 1)
  const level1Commission = await db.commission.create({
    data: {
      userId: referral.referrerId,
      referralId,
      amount: level1Amount,
      type: "direct",
      status: "pending",
      description: `Level 1 commission - KES ${level1Amount.toFixed(2)}`,
    },
  })

  await db.transaction.create({
    data: {
      userId: referral.referrerId,
      type: "commission",
      amount: level1Amount,
      status: "pending",
      reference: `L1-${level1Commission.id}`,
      description: `Level 1 referral commission`,
    },
  })

  const uplineReferral = await db.referral.findFirst({
    where: { refereeId: referral.referrerId, status: "completed" },
  })

  if (uplineReferral) {
    const level2Amount = calculateCommission(REFERRAL_FEE, 2)
    const level2Commission = await db.commission.create({
      data: {
        userId: uplineReferral.referrerId,
        referralId,
        amount: level2Amount,
        type: "override",
        status: "pending",
        description: `Level 2 override commission - KES ${level2Amount.toFixed(2)}`,
      },
    })

    await db.transaction.create({
      data: {
        userId: uplineReferral.referrerId,
        type: "commission",
        amount: level2Amount,
        status: "pending",
        reference: `L2-${level2Commission.id}`,
        description: `Level 2 override commission`,
      },
    })
  }
}

export async function processPayout(
  userId: string,
  amount: number
): Promise<{ success: boolean; reference?: string }> {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error("User not found")

  const pendingCommissions = await db.commission.aggregate({
    where: { userId, status: "pending" },
    _sum: { amount: true },
  })

  const availableBalance = pendingCommissions._sum.amount || 0

  if (amount > availableBalance) {
    throw new Error("Insufficient balance")
  }

  const payout = await db.payout.create({
    data: {
      userId,
      amount,
      status: "pending",
      method: "mpesa",
      phone: user.mpesaNumber || user.phone,
    },
  })

  return {
    success: true,
    reference: payout.id,
  }
}
