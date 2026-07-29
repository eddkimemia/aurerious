import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { referralCode } = body

    if (!referralCode) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      )
    }

    const referrer = await db.user.findUnique({
      where: { referralCode },
      select: {
        id: true,
        name: true,
        referralCode: true,
      },
    })

    if (!referrer) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      referrer: {
        id: referrer.id,
        name: referrer.name || "A member",
        referralCode: referrer.referralCode,
      },
    })
  } catch (error) {
    console.error("Referral track error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
