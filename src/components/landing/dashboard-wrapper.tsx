"use client"

import { usePathname } from "next/navigation"

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/admin")
  const isLandingPage = pathname.startsWith("/offer") || pathname.startsWith("/go") || pathname.startsWith("/lp")

  if (isLandingPage) return <>{children}</>

  return (
    <div className={isDashboard ? "" : "pt-16"}>
      {children}
    </div>
  )
}
