"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Earnings", href: "/earnings" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

export function NavWrapper() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/admin")
  const isLandingPage = pathname.startsWith("/offer") || pathname.startsWith("/go") || pathname.startsWith("/lp")

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  if (isDashboard || isLandingPage) return null

  return (
    <>
      <header className={`fixed top-[34px] sm:top-[38px] left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" : "bg-white"}`}>
        <div className="h-1 w-full bg-gradient-to-r from-lux-navy-dark via-lux-gold to-lux-navy" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lux-navy font-heading font-bold text-white text-lg shadow-md shadow-lux-navy/20 group-hover:shadow-lg group-hover:shadow-lux-navy/30 transition-all group-hover:scale-105">A</div>
              <span className="font-heading font-bold text-lg tracking-tight text-lux-navy">
                Zuri<span className="text-lux-gold">Agency</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-lux-gold relative group py-1 ${isActive ? "text-lux-gold" : "text-lux-text"}`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-lux-gold to-lux-gold-light transition-all rounded-full ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                )
              })}
              <Link href="/register">
                <Button className="bg-lux-cta hover:bg-lux-cta-hover text-white font-heading font-bold text-sm px-6 h-10 rounded-full shadow-lg shadow-lux-gold/25 transition-all hover:shadow-xl hover:scale-105">
                  Join Now - KES 1,000
                </Button>
              </Link>
            </nav>

            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-[500px] opacity-100 bg-white border-t border-gray-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${pathname === item.href ? "text-lux-gold bg-lux-gold-pale" : "text-lux-text hover:bg-lux-gold-pale hover:text-lux-gold"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-lux-cta hover:bg-lux-cta-hover text-white font-heading font-bold rounded-full shadow-lg mt-3">
                Join Now - KES 1,000
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
