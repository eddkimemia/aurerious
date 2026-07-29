import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { stkPush } from "@/services/mpesa"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, amount, userId } = body

    if (!phone || !amount) {
      return NextResponse.json(
        { error: "Phone and amount are required" },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than 0" },
        { status: 400 }
      )
    }

    const reference = `AUR${Date.now()}${Math.random().toString(36).substring(2, 7).toUpperCase()}`

    const result = await stkPush(phone, amount, reference)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "STK push failed" },
        { status: 500 }
      )
    }

    const mpesaTransaction = await db.mpesaTransaction.create({
      data: {
        userId: userId || null,
        phone,
        amount,
        reference,
        checkoutRequestId: result.checkoutRequestId,
        merchantRequestId: `MR${Date.now()}`,
        status: "pending",
        type: "registration",
      },
    })

    return NextResponse.json(
      {
        message: "STK push initiated",
        checkoutRequestId: result.checkoutRequestId,
        reference,
        transactionId: mpesaTransaction.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("STK push error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
