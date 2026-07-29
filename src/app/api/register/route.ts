// requires: npm install bcryptjs @types/bcryptjs
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { processReferralCommission } from "@/lib/commission-engine"

const PHONE_REGEX = /^07\d{8}$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password, referralCode } = body

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
    if (referralCode) {
      referrer = await db.user.findUnique({
        where: { referralCode },
      })
      if (!referrer) {
        return NextResponse.json(
          { error: "Invalid referral code" },
          { status: 400 }
        )
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.user.create({
      data: {
        name: name || null,
        email: email || null,
        phone,
        password: hashedPassword,
        referredBy: referrer?.id || null,
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

      await processReferralCommission(user.id)
    }

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          referralCode: user.referralCode,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
