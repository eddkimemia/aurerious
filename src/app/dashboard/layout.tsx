"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, DollarSign, Users, Link2, Settings, LogOut, Menu,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { getSession, signOut } from "next-auth/react"

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/earnings", label: "Earnings", icon: DollarSign },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/referrals", label: "Referrals", icon: Link2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userName, setUserName] = useState("Member")
  const [userInitials, setUserInitials] = useState("ME")

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user) {
        const name = session.user.name || session.user.email || session.user.phone || "Member"
        setUserName(name)
        const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || name.slice(0, 2).toUpperCase()
        setUserInitials(initials)
      }
    })
  }, [])

  const initials = userInitials

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-lux-gold/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lux-gold shadow-md">
          <span className="font-heading font-bold text-lux-navy text-lg">A</span>
        </div>
        <div>
          <span className="font-heading font-bold text-base text-white block leading-tight">
            Aureus<span className="text-lux-gold">Network</span>
          </span>
          <span className="text-[10px] text-lux-gold/70 uppercase tracking-wider font-medium">Member Dashboard</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-lux-gold/15 text-lux-gold shadow-sm border border-lux-gold/10"
                  : "text-white/60 hover:text-white hover:bg-white/5",
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-lux-gold/10">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all w-full text-left"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-lux-cream flex">
      <aside className="hidden lg:flex lg:w-64 lg:flex-col bg-lux-navy-dark fixed left-0 top-0 bottom-0 z-30">
        <NavContent />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button className="lg:hidden fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl bg-lux-navy text-white shadow-lg">
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-lux-navy-dark border-r border-lux-gold/10">
          <NavContent />
        </SheetContent>
      </Sheet>

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="flex items-center justify-end gap-4 px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-lux-text">{userName}</p>
                <p className="text-xs text-lux-text-light">Premium Member</p>
              </div>
              <Avatar className="h-9 w-9 ring-2 ring-lux-gold/20">
                <AvatarFallback className="bg-lux-navy text-white text-sm font-bold">{initials}</AvatarFallback>
              </Avatar>
              <button onClick={() => signOut({ callbackUrl: "/login" })} className="hidden sm:inline-flex items-center gap-1 text-sm text-lux-text-light hover:text-red-500 transition-colors">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
