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
      if (payout.status !== "pending") {
        return NextResponse.json({ error: `Payout already ${payout.status}` }, { status: 400 })
      }

      // Re-validate available balance at approve time to avoid overdraw
      const pendingAgg = await db.commission.aggregate({
        where: { userId: payout.userId, status: "pending" },
        _sum: { amount: true },
      })
      const availableAtApprove = pendingAgg._sum.amount || 0
      if (payout.amount > availableAtApprove + 0.001) {
        return NextResponse.json(
          { error: `Insufficient balance. Available KES ${availableAtApprove.toFixed(2)}, requested KES ${payout.amount.toFixed(2)}` },
          { status: 400 }
        )
      }

      const updated = await db.$transaction(async (tx) => {
        let remaining = payout.amount
        const pendingCommissions = await tx.commission.findMany({
          where: { userId: payout.userId, status: "pending" },
          orderBy: { createdAt: "asc" },
        })

        for (const c of pendingCommissions) {
          if (remaining <= 0.001) break
          if (c.amount <= remaining + 0.001) {
            await tx.commission.update({
              where: { id: c.id },
              data: { status: "paid" },
            })
            remaining -= c.amount
          } else {
            // Split commission: keep remainder as pending, create paid slice
            await tx.commission.update({
              where: { id: c.id },
              data: { amount: c.amount - remaining },
            })
            await tx.commission.create({
              data: {
                userId: c.userId,
                referralId: c.referralId,
                amount: remaining,
                type: c.type,
                status: "paid",
                description: `${c.description} (partial payout KES ${remaining.toFixed(2)})`,
              },
            })
            remaining = 0
            break
          }
        }

        if (remaining > 0.01) {
          throw new Error("Insufficient commissions to cover payout")
        }

        const upd = await tx.payout.update({
          where: { id: payoutId },
          data: {
            status: "approved",
            approvedBy: approvedBy || "admin",
            approvedAt: new Date(),
          },
        })

        await tx.transaction.create({
          data: {
            userId: payout.userId,
            type: "payout",
            amount: payout.amount,
            status: "completed",
            reference: `POUT-${payout.id}`,
            description: `Payout approved - KES ${payout.amount.toFixed(2)} to ${payout.phone}`,
          },
        })

        return upd
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
