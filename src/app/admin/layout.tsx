"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Users, ArrowLeftRight, Banknote, Settings, LogOut, Menu, ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/admin/payouts", label: "Payouts", icon: Banknote },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

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
          <Badge className="mt-1 bg-lux-gold/15 text-lux-gold border-lux-gold/20 text-[10px] px-2 py-0 h-4">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Admin Panel
          </Badge>
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
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span>Logout</span>
        </Link>
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
              <Badge className="bg-lux-gold/15 text-lux-gold border-lux-gold/20 font-medium">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Admin
              </Badge>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-lux-text">Admin User</p>
                <p className="text-xs text-lux-text-light">Super Admin</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lux-navy text-white text-sm font-bold ring-2 ring-lux-gold/20">
                AU
              </div>
              <Button variant="ghost" size="sm" className="text-lux-text-light hover:text-red-500 hidden sm:inline-flex">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
