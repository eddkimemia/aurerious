import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { amount, phone } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      )
    }

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      )
    }

    const minPayoutSetting = await db.setting.findUnique({
      where: { key: "minimum_payout" },
    })

    const minPayout = minPayoutSetting ? parseFloat(minPayoutSetting.value) : 1000

    if (amount < minPayout) {
      return NextResponse.json(
        { error: `Minimum payout amount is KES ${minPayout.toFixed(2)}` },
        { status: 400 }
      )
    }

    const [pendingCommissions, lockedBonus] = await Promise.all([
      db.commission.aggregate({
        where: { userId: session.user.id, status: "pending" },
        _sum: { amount: true },
      }),
      db.commission.aggregate({
        where: { userId: session.user.id, status: "locked" },
        _sum: { amount: true },
      }),
    ])

    const availableBalance = pendingCommissions._sum.amount || 0
    const lockedBalance = lockedBonus._sum.amount || 0

    if (amount > availableBalance) {
      const hint = lockedBalance > 0
        ? ` You have KES ${lockedBalance.toFixed(2)} locked (signup bonus requires 5 referrals to unlock).`
        : ""
      return NextResponse.json(
        {
          error: `Insufficient withdrawable balance.${hint}`,
          available: availableBalance,
          locked: lockedBalance,
        },
        { status: 400 }
      )
    }

    const payout = await db.payout.create({
      data: {
        userId: session.user.id,
        amount,
        status: "pending",
        method: "mpesa",
        phone,
      },
    })

    return NextResponse.json(
      {
        message: "Payout request submitted",
        payout: {
          id: payout.id,
          amount: payout.amount,
          status: payout.status,
          phone: payout.phone,
          createdAt: payout.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Payout request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
