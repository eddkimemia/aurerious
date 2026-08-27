import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-helpers"
import { createSignupBonus, processReferralCommission } from "@/lib/commission-engine"

export async function GET(request: NextRequest) {
  const forbidden = await requireAdmin()
  if (forbidden) return forbidden

  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")))
    const search = searchParams.get("search") || ""
    const statusFilter = searchParams.get("status")

    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
      ]
    }
    if (statusFilter && ["active", "pending", "suspended"].includes(statusFilter)) {
      where.status = statusFilter
    }

    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          referralCode: true,
          status: true,
          referredBy: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              referrals: true,
              transactions: true,
              commissions: true,
            },
          },
        },
      }),
      db.user.count({ where }),
    ])

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Admin users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const forbidden = await requireAdmin()
  if (forbidden) return forbidden

  try {
    const body = await request.json()
    const { userId, status } = body

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    if (!status || !["active", "pending", "suspended"].includes(status)) {
      return NextResponse.json(
        { error: "Status must be 'active', 'pending', or 'suspended'" },
        { status: 400 }
      )
    }

    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const updated = await db.user.update({
      where: { id: userId },
      data: { status },
      select: {
        id: true,
        name: true,
        phone: true,
        status: true,
        referredBy: true,
      },
    })

    if (status === "active" && user.status === "pending") {
      await db.transaction.create({
        data: {
          userId,
          type: "payment",
          amount: 1000,
          status: "completed",
          reference: `ADMIN-ACTIVATE-${Date.now()}`,
          description: "Manual activation by admin",
        },
      })

      // Credit signup bonus for manually activated user
      await createSignupBonus(userId)

      if (user.referredBy) {
        await processReferralCommission(userId)
      }
    }

    return NextResponse.json({ user: updated })
  } catch (error) {
    console.error("Admin update user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const forbidden = await requireAdmin()
  if (forbidden) return forbidden

  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    await db.$transaction([
      db.commission.deleteMany({ where: { userId } }),
      db.transaction.deleteMany({ where: { userId } }),
      db.payout.deleteMany({ where: { userId } }),
      db.payoutMethod.deleteMany({ where: { userId } }),
      db.mpesaTransaction.deleteMany({ where: { userId } }),
      db.referral.deleteMany({ where: { referrerId: userId } }),
      db.referral.deleteMany({ where: { refereeId: userId } }),
      db.user.delete({ where: { id: userId } }),
    ])

    return NextResponse.json({ message: "User deleted" })
  } catch (error) {
    console.error("Admin delete user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
