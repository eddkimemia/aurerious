import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyTransaction } from "@/services/paystack"
import { createSignupBonus, processReferralCommission } from "@/lib/commission-engine"

export async function GET(request: NextRequest) {
  try {
    const reference = request.nextUrl.searchParams.get("reference") || request.nextUrl.searchParams.get("trxref")
    if (!reference) {
      return NextResponse.redirect(new URL("/login?error=missing_reference", request.url))
    }

    const paystackTx = await db.paystackTransaction.findUnique({ where: { reference } })
    if (!paystackTx) {
      // Try to verify even if not in DB (maybe direct Paystack reference)
      const verify = await verifyTransaction(reference)
      if (!verify.success) {
        return NextResponse.redirect(new URL(`/login?error=verification_failed`, request.url))
      }
    }

    // Verify with Paystack
    const result = await verifyTransaction(reference)

    if (!result.success) {
      if (paystackTx) {
        await db.paystackTransaction.update({
          where: { reference },
          data: { status: "failed", gatewayResponse: result.error || "Failed" },
        })
      }
      return NextResponse.redirect(new URL("/login?error=payment_failed", request.url))
    }

    // Update transaction as completed
    const existing = await db.paystackTransaction.findUnique({ where: { reference } })
    if (existing) {
      await db.paystackTransaction.update({
        where: { reference },
        data: {
          status: "completed",
          gatewayResponse: result.gatewayResponse || "Successful",
          paidAt: result.paidAt ? new Date(result.paidAt) : new Date(),
          channel: result.channel,
        },
      })

      if (existing.userId) {
        // Activate user
        await db.user.update({ where: { id: existing.userId }, data: { status: "active" } })

        // Create payment transaction
        const existingPayment = await db.transaction.findFirst({
          where: { userId: existing.userId, reference: reference },
        })
        if (!existingPayment) {
          await db.transaction.create({
            data: {
              userId: existing.userId,
              type: "payment",
              amount: existing.amount,
              status: "completed",
              reference,
              description: `Paystack payment of KES ${existing.amount.toFixed(2)} - ${result.channel || "card"}`,
            },
          })
          // Credit signup bonus and process referral commission
          await createSignupBonus(existing.userId)
          await processReferralCommission(existing.userId)
        }
      }
    }

    // Redirect to login with success
    return NextResponse.redirect(new URL("/login?verified=true", request.url))
  } catch (error) {
    console.error("Paystack callback error:", error)
    return NextResponse.redirect(new URL("/login?error=internal_error", request.url))
  }
}

export async function POST(request: NextRequest) {
  // Allow POST as well (Paystack may POST)
  return GET(request)
}
