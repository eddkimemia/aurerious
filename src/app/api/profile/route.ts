import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, email: true, phone: true, mpesaNumber: true, referralCode: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, phone, mpesaNumber, currentPassword, newPassword } = body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (email !== undefined) updateData.email = email
    if (phone !== undefined) updateData.phone = phone
    if (mpesaNumber !== undefined) updateData.mpesaNumber = mpesaNumber

    if (currentPassword && newPassword) {
      const user = await db.user.findUnique({ where: { id: session.user.id } })
      if (!user || !user.password) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      const isValid = await bcrypt.compare(currentPassword, user.password)
      if (!isValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
      }
      if (newPassword.length < 6) {
        return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 })
      }
      updateData.password = await bcrypt.hash(newPassword, 10)
    }

    if (phone) {
      const existing = await db.user.findFirst({ where: { phone, NOT: { id: session.user.id } } })
      if (existing) {
        return NextResponse.json({ error: "Phone already in use" }, { status: 409 })
      }
    }
    if (email) {
      const existing = await db.user.findFirst({ where: { email, NOT: { id: session.user.id } } })
      if (existing) {
        return NextResponse.json({ error: "Email already in use" }, { status: 409 })
      }
    }

    const updated = await db.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: { id: true, name: true, email: true, phone: true, mpesaNumber: true, referralCode: true },
    })

    return NextResponse.json({ user: updated, message: "Profile updated successfully" })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
