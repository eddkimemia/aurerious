import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { generateReferralCode } from "@/lib/utils"
import { stkPush } from "@/services/mpesa"

const PHONE_REGEX = /^07\d{8}$/

function formatMpesaPhone(phone: string): string {
  return "254" + phone.slice(1)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password, referralCode: incomingReferralCode } = body

    if (!phone || !password) {
      return NextResponse.json(
        { error: "Phone and password are required" },
        { status: 400 }
      )
    }

    if (!PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: "Phone must be a valid Kenyan number (07XX...)" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    const existing = await db.user.findFirst({
      where: {
        OR: [
          { phone },
          ...(email ? [{ email }] : []),
        ],
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Phone or email already registered" },
        { status: 409 }
      )
    }

    let referrer: Awaited<ReturnType<typeof db.user.findUnique>> | null = null
    if (incomingReferralCode) {
      referrer = await db.user.findUnique({
        where: { referralCode: incomingReferralCode },
      })
      if (!referrer) {
        return NextResponse.json(
          { error: "Invalid referral code" },
          { status: 400 }
        )
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    let referralCode = generateReferralCode()
    while (await db.user.findUnique({ where: { referralCode } })) {
      referralCode = generateReferralCode()
    }

    const user = await db.user.create({
      data: {
        name: name || null,
        email: email || null,
        phone,
        password: hashedPassword,
        referralCode,
        referredBy: referrer?.id || null,
        status: "pending",
        mpesaNumber: phone,
      },
    })

    if (referrer) {
      await db.referral.create({
        data: {
          referrerId: referrer.id,
          refereeId: user.id,
          status: "completed",
          level: 1,
        },
      })
    }

    const mpesaPhone = formatMpesaPhone(phone)
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
        userId: user.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
