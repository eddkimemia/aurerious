import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-helpers"

export async function GET() {
  const forbidden = await requireAdmin()
  if (forbidden) return forbidden

  try {
    const settings = await db.setting.findMany({
      orderBy: { key: "asc" },
    })

    const settingsMap: Record<string, string> = {}
    for (const s of settings) {
      settingsMap[s.key] = s.value
    }

    return NextResponse.json({ settings: settingsMap })
  } catch (error) {
    console.error("Admin settings error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const forbidden = await requireAdmin()
  if (forbidden) return forbidden

  try {
    const body = await request.json()
    const { settings } = body

    if (!settings || typeof settings !== "object") {
      return NextResponse.json(
        { error: "Settings object is required" },
        { status: 400 }
      )
    }

    const entries = Object.entries(settings) as [string, string][]

    for (const [key, value] of entries) {
      await db.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    }

    const updatedSettings = await db.setting.findMany({
      orderBy: { key: "asc" },
    })

    const settingsMap: Record<string, string> = {}
    for (const s of updatedSettings) {
      settingsMap[s.key] = s.value
    }

    return NextResponse.json({ settings: settingsMap })
  } catch (error) {
    console.error("Admin settings update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
