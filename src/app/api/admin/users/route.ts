import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-helpers"
import { createSignupBonus, processReferralCommission } from "@/lib/commission-engine"
import bcrypt from "bcryptjs"

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
    const { userId, status, password, name, email, phone, role } = body

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const updateData: any = {}

    if (status !== undefined) {
      if (!["active", "pending", "suspended"].includes(status)) {
        return NextResponse.json(
          { error: "Status must be 'active', 'pending', or 'suspended'" },
          { status: 400 }
        )
      }
      updateData.status = status
    }

    if (password !== undefined) {
      if (typeof password !== "string" || password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
      }
      updateData.password = await bcrypt.hash(password, 10)
    }

    if (name !== undefined) updateData.name = name
    if (email !== undefined) {
      if (email) {
        const existing = await db.user.findFirst({ where: { email, NOT: { id: userId } } })
        if (existing) return NextResponse.json({ error: "Email already in use" }, { status: 409 })
      }
      updateData.email = email || null
    }
    if (phone !== undefined) {
      if (phone) {
        const existing = await db.user.findFirst({ where: { phone, NOT: { id: userId } } })
        if (existing) return NextResponse.json({ error: "Phone already in use" }, { status: 409 })
      }
      updateData.phone = phone
    }
    if (role !== undefined) {
      if (!["member", "admin"].includes(role)) {
        return NextResponse.json({ error: "Role must be member or admin" }, { status: 400 })
      }
      updateData.role = role
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    const updated = await db.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        role: true,
        referralCode: true,
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
