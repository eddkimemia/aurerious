"use client"

import { usePathname } from "next/navigation"

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/admin")

  return (
    <div className={isDashboard ? "" : "pt-16"}>
      {children}
    </div>
  )
}
