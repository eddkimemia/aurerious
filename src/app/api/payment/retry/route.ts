import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { stkPush } from "@/services/mpesa"

function formatMpesaPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-]/g, "")
  if (cleaned.startsWith("07")) return "254" + cleaned.slice(1)
  if (cleaned.startsWith("254")) return cleaned
  return "254" + cleaned
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { login } = body

    if (!login) {
      return NextResponse.json(
        { error: "Email or phone is required" },
        { status: 400 }
      )
    }

    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: login },
          { phone: login },
        ],
      },
      select: {
        id: true,
        status: true,
        phone: true,
        mpesaNumber: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    if (user.status !== "pending") {
      return NextResponse.json(
        { error: "Account is not pending payment" },
        { status: 400 }
      )
    }

    const mpesaPhone = formatMpesaPhone(user.mpesaNumber || user.phone)
    const reference = `AUR${Date.now()}${Math.random().toString(36).substring(2, 7).toUpperCase()}`

    const stkResult = await stkPush(mpesaPhone, 10, reference)

    if (!stkResult.success) {
      return NextResponse.json(
        { error: stkResult.error || "Payment initiation failed" },
        { status: 500 }
      )
    }

    await db.mpesaTransaction.create({
      data: {
        userId: user.id,
        phone: mpesaPhone,
        amount: 10,
        reference,
        checkoutRequestId: stkResult.checkoutRequestId,
        merchantRequestId: `MR${Date.now()}`,
        status: "pending",
        type: "registration",
      },
    })

    return NextResponse.json(
      {
        message: "Check your phone for the M-Pesa payment prompt",
        checkoutRequestId: stkResult.checkoutRequestId,
        phone: mpesaPhone,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Payment retry error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
