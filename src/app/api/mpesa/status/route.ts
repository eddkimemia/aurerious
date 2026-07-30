import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const checkoutRequestId = request.nextUrl.searchParams.get("checkoutRequestId")
    if (!checkoutRequestId) {
      return NextResponse.json({ error: "Missing checkoutRequestId" }, { status: 400 })
    }

    const transaction = await db.mpesaTransaction.findFirst({
      where: { checkoutRequestId },
      select: { status: true, resultCode: true, resultDesc: true },
    })

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({
      status: transaction.status,
      resultCode: transaction.resultCode,
      resultDesc: transaction.resultDesc,
    })
  } catch (error) {
    console.error("M-Pesa status error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
