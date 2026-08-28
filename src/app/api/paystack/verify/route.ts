import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyTransaction } from "@/services/paystack"

export async function GET(request: NextRequest) {
  try {
    const reference = request.nextUrl.searchParams.get("reference")
    if (!reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 })
    }

    const tx = await db.paystackTransaction.findUnique({ where: { reference } })
    if (!tx) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    // If already completed, return success
    if (tx.status === "completed") {
      return NextResponse.json({ status: "completed", reference, gatewayResponse: tx.gatewayResponse })
    }
    if (tx.status === "failed") {
      return NextResponse.json({ status: "failed", reference })
    }

    // Verify with Paystack (or mock)
    const result = await verifyTransaction(reference)

    if (result.success) {
      // Update DB as in callback
      await db.paystackTransaction.update({
        where: { reference },
        data: {
          status: "completed",
          gatewayResponse: result.gatewayResponse || "Successful",
          paidAt: result.paidAt ? new Date(result.paidAt) : new Date(),
          channel: result.channel,
        },
      })
      if (tx.userId) {
        await db.user.update({ where: { id: tx.userId }, data: { status: "active" } })
        const existingPayment = await db.transaction.findFirst({
          where: { userId: tx.userId, reference },
        })
        if (!existingPayment) {
          const { createSignupBonus, processReferralCommission } = await import("@/lib/commission-engine")
          await db.transaction.create({
            data: {
              userId: tx.userId,
              type: "payment",
              amount: tx.amount,
              status: "completed",
              reference,
              description: `Paystack payment of KES ${tx.amount.toFixed(2)} - ${result.channel || "card"}`,
            },
          })
          await createSignupBonus(tx.userId)
          await processReferralCommission(tx.userId)
        }
      }
      return NextResponse.json({ status: "completed", reference })
    } else {
      return NextResponse.json({ status: "pending", reference })
    }
  } catch (error) {
    console.error("Paystack verify error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
