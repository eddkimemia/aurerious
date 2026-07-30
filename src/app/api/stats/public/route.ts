import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)

    const [totalMembers, joinedToday] = await Promise.all([
      db.user.count({ where: { status: "active" } }),
      db.user.count({ where: { status: "active", createdAt: { gte: yesterday } } }),
    ])

    return NextResponse.json({ totalMembers, joinedToday })
  } catch {
    return NextResponse.json({ totalMembers: 0, joinedToday: 0 })
  }
}
