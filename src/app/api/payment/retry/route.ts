import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { initializeTransaction } from "@/services/paystack"

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

    // Fetch user email for Paystack
    const fullUser = await db.user.findUnique({
      where: { id: user.id },
      select: { email: true, phone: true },
    })
    const email = fullUser?.email || `${fullUser?.phone}@zuriagency.local`
    const phone = fullUser?.phone || user.phone
    const reference = `ZUR${Date.now()}${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    const callbackUrl = process.env.PAYSTACK_CALLBACK_URL || `${process.env.NEXT_PUBLIC_APP_URL || "https://zuriweb.vercel.app"}/api/paystack/callback`

    const paystackResult = await initializeTransaction({
      email: email!,
      amount: 1000,
      reference,
      callbackUrl,
      phone,
      metadata: { userId: user.id, phone },
    })

    if (!paystackResult.success) {
      return NextResponse.json(
        { error: paystackResult.error || "Payment initialization failed" },
        { status: 500 }
      )
    }

    await db.paystackTransaction.create({
      data: {
        userId: user.id,
        email: email!,
        phone,
        amount: 1000,
        reference,
        accessCode: paystackResult.accessCode,
        authorizationUrl: paystackResult.authorizationUrl,
        status: "pending",
      },
    })

    return NextResponse.json(
      {
        message: "Redirect to Paystack for payment",
        authorizationUrl: paystackResult.authorizationUrl,
        reference,
        accessCode: paystackResult.accessCode,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Payment retry error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
