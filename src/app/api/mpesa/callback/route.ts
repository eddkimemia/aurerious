import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { processCallback } from "@/services/mpesa"
import { createSignupBonus, processReferralCommission } from "@/lib/commission-engine"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[M-Pesa Callback] Received:", JSON.stringify(body))

    const result = await processCallback(body)

    if (!result.success) {
      if (body?.Body?.stkCallback?.CheckoutRequestID) {
        await db.mpesaTransaction.updateMany({
          where: {
            checkoutRequestId: body.Body.stkCallback.CheckoutRequestID,
          },
          data: {
            status: "failed",
            resultCode: result.resultCode || "1",
            resultDesc: result.resultDesc || "Transaction failed",
          },
        })
      }

      return NextResponse.json({ message: "Callback processed", success: false })
    }

    const checkoutRequestId = body?.Body?.stkCallback?.CheckoutRequestID

    if (!checkoutRequestId) {
      return NextResponse.json(
        { error: "Missing checkout request ID" },
        { status: 400 }
      )
    }

    const existingTransaction = await db.mpesaTransaction.findFirst({
      where: { checkoutRequestId },
    })

    if (existingTransaction) {
      await db.mpesaTransaction.update({
        where: { id: existingTransaction.id },
        data: {
          status: "completed",
          resultCode: result.resultCode || "0",
          resultDesc: result.resultDesc || "Success",
        },
      })

      if (existingTransaction.userId) {
        await db.user.update({
          where: { id: existingTransaction.userId },
          data: { status: "active" },
        })

        const transaction = await db.transaction.create({
          data: {
            userId: existingTransaction.userId,
            type: "payment",
            amount: existingTransaction.amount,
            status: "completed",
            reference: result.mpesaReceiptNumber || existingTransaction.reference,
            description: `M-Pesa payment of KES ${existingTransaction.amount.toFixed(2)}`,
          },
        })

        if (existingTransaction.type === "registration") {
          // Credit KES 500 signup airtime bonus immediately (locked until 5 referrals)
          await createSignupBonus(existingTransaction.userId)
          await processReferralCommission(existingTransaction.userId)
        }

        return NextResponse.json({
          message: "Payment confirmed",
          transactionId: transaction.id,
          mpesaReceiptNumber: result.mpesaReceiptNumber,
          success: true,
        })
      }
    }

    return NextResponse.json({ message: "Callback processed", success: true })
  } catch (error) {
    console.error("M-Pesa callback error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
