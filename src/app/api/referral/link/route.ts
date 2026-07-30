import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { generateReferralCode } from "@/lib/utils"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        referrals: {
          include: {
            referee: {
              select: { id: true, name: true, phone: true, createdAt: true },
            },
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (!user.referralCode) {
      return NextResponse.json({ error: "No referral code assigned" }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const referralLink = `${baseUrl}/ref/${user.referralCode}`

    const signups = user.referrals.filter((r) => r.status === "completed").length

    return NextResponse.json({
      referralCode: user.referralCode,
      referralLink,
      stats: {
        totalClicks: 0,
        signups,
        earnings: 0,
      },
      referrals: user.referrals,
    })
  } catch (error) {
    console.error("Referral link error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let newCode = generateReferralCode()
    while (await db.user.findUnique({ where: { referralCode: newCode } })) {
      newCode = generateReferralCode()
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { referralCode: newCode },
    })

    return NextResponse.json({ referralCode: newCode })
  } catch (error) {
    console.error("Generate referral code error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
