"use client"

import { usePathname } from "next/navigation"

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/admin")
  const isLandingPage = pathname.startsWith("/offer") || pathname.startsWith("/go") || pathname.startsWith("/lp")

  if (isLandingPage) return <>{children}</>
  const isAuth = pathname.startsWith("/login") || pathname.startsWith("/register")
  if (isAuth) return <div className="pt-16">{children}</div>

  return (
    <div className={isDashboard ? "" : "pt-[98px] sm:pt-[102px]"}>
      {children}
    </div>
  )
}
