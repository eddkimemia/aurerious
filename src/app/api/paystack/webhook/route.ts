import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyWebhookSignature, verifyTransaction } from "@/services/paystack"
import { createSignupBonus, processReferralCommission } from "@/lib/commission-engine"

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get("x-paystack-signature")

    // Verify signature if secret configured
    if (process.env.PAYSTACK_SECRET_KEY && signature) {
      const isValid = verifyWebhookSignature(rawBody, signature)
      if (!isValid) {
        console.warn("[Paystack webhook] Invalid signature")
        // Still proceed for now, but log
      }
    }

    const body = JSON.parse(rawBody)
    console.log("[Paystack webhook] Received:", body.event, body.data?.reference)

    if (body.event === "charge.success") {
      const data = body.data
      const reference: string = data.reference
      const status: string = data.status

      if (status === "success" && reference) {
        const tx = await db.paystackTransaction.findUnique({ where: { reference } })
        if (tx && tx.status !== "completed") {
          // Verify with Paystack to be safe
          const verify = await verifyTransaction(reference)
          if (verify.success) {
            await db.paystackTransaction.update({
              where: { reference },
              data: {
                status: "completed",
                gatewayResponse: verify.gatewayResponse || data.gateway_response,
                paidAt: verify.paidAt ? new Date(verify.paidAt) : new Date(),
                channel: verify.channel || data.channel,
              },
            })
            if (tx.userId) {
              await db.user.update({ where: { id: tx.userId }, data: { status: "active" } })
              const existingPayment = await db.transaction.findFirst({
                where: { userId: tx.userId, reference },
              })
              if (!existingPayment) {
                await db.transaction.create({
                  data: {
                    userId: tx.userId,
                    type: "payment",
                    amount: tx.amount,
                    status: "completed",
                    reference,
                    description: `Paystack payment of KES ${tx.amount.toFixed(2)} - ${data.channel || "card"}`,
                  },
                })
                await createSignupBonus(tx.userId)
                await processReferralCommission(tx.userId)
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Paystack webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
