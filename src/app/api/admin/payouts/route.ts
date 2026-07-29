import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-helpers"

export async function GET(request: NextRequest) {
  const forbidden = await requireAdmin()
  if (forbidden) return forbidden

  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")))
    const status = searchParams.get("status")

    const where: any = {}
    if (status) where.status = status

    const skip = (page - 1) * limit

    const [payouts, total] = await Promise.all([
      db.payout.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, name: true, phone: true },
          },
        },
      }),
      db.payout.count({ where }),
    ])

    return NextResponse.json({
      payouts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Admin payouts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const forbidden = await requireAdmin()
  if (forbidden) return forbidden

  try {
    const body = await request.json()
    const { payoutId, action, approvedBy } = body

    if (!payoutId || !action) {
      return NextResponse.json(
        { error: "Payout ID and action are required" },
        { status: 400 }
      )
    }

    const payout = await db.payout.findUnique({
      where: { id: payoutId },
      include: { user: true },
    })

    if (!payout) {
      return NextResponse.json({ error: "Payout not found" }, { status: 404 })
    }

    if (action === "approve") {
      const updated = await db.payout.update({
        where: { id: payoutId },
        data: {
          status: "approved",
          approvedBy: approvedBy || "admin",
          approvedAt: new Date(),
        },
      })

      await db.transaction.create({
        data: {
          userId: payout.userId,
          type: "payout",
          amount: payout.amount,
          status: "completed",
          reference: `POUT-${payout.id}`,
          description: `Payout approved - KES ${payout.amount.toFixed(2)} to ${payout.phone}`,
        },
      })

      await db.commission.updateMany({
        where: { userId: payout.userId, status: "pending" },
        data: { status: "paid" },
      })

      return NextResponse.json({ payout: updated })
    } else if (action === "reject") {
      const updated = await db.payout.update({
        where: { id: payoutId },
        data: {
          status: "rejected",
          approvedBy: approvedBy || "admin",
          approvedAt: new Date(),
        },
      })

      return NextResponse.json({ payout: updated })
    } else {
      return NextResponse.json(
        { error: "Action must be 'approve' or 'reject'" },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Admin payout action error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
