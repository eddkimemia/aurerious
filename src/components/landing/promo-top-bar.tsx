"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Flame, Clock } from "lucide-react"

function CountdownInline() {
  const [t, setT] = useState(14 * 3600 + 27 * 60 + 43)
  useEffect(() => {
    const i = setInterval(() => setT(s => (s <= 1 ? 14 * 3600 + 27 * 60 + 43 : s - 1)), 1000)
    return () => clearInterval(i)
  }, [])
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = t % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return (
    <span className="font-mono font-extrabold tracking-widest bg-white/15 px-2 py-0.5 rounded-md border border-white/20">
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  )
}

export function PromoTopBar() {
  const pathname = usePathname()
  const [spots] = useState(37)
  const [mounted, setMounted] = useState(false)
  const [ref, setRef] = useState("")

  useEffect(() => {
    setMounted(true)
    try {
      const p = new URLSearchParams(window.location.search)
      const r = p.get("ref") || p.get("r") || localStorage.getItem("ref") || ""
      if (r) setRef(r)
    } catch {}
  }, [])

  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/admin")
  const isLandingPage = pathname.startsWith("/offer") || pathname.startsWith("/go") || pathname.startsWith("/lp")
  const isAuth = pathname.startsWith("/login") || pathname.startsWith("/register")

  if (isDashboard || isLandingPage || isAuth) return null

  const offerHref = ref ? `/offer?ref=${encodeURIComponent(ref)}` : "/offer"

  return (
    <Link
      href={offerHref}
      className="fixed top-0 left-0 right-0 z-[60] block w-full bg-[#0F2847] text-white hover:bg-[#0F2847]/95 transition-colors group"
      aria-label="Claim KES 500 bonus - go to offer page"
    >
      {/* subtle gold accent line at very top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-lux-gold via-lux-gold-light to-lux-gold" />
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center sm:justify-between gap-2 sm:gap-4 py-2 sm:py-2.5 text-xs sm:text-sm">
          {/* left / center */}
          <div className="flex items-center gap-2 sm:gap-3 text-center flex-wrap justify-center">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-red-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
              <span className="h-1.5 w-1.5 bg-white rounded-full animate-pulse" /> LIVE
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold">
              <Flame className="h-3.5 w-3.5 text-lux-gold hidden sm:inline" />
              <span className="hidden sm:inline">LIMITED:</span> KES 500 Bonus Instantly
            </span>
            <span className="hidden md:inline opacity-60">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-lux-gold-light hidden sm:inline" />
              Ends in {mounted ? <CountdownInline /> : <span className="font-mono font-extrabold bg-white/15 px-2 py-0.5 rounded-md border border-white/20">14:27:43</span>}
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-lux-gold-light font-bold">
              • Only {spots} left today
            </span>
          </div>

          {/* CTA button - visible on sm+ */}
          <div className="hidden sm:inline-flex items-center gap-2 bg-lux-gold group-hover:bg-lux-gold-light text-white font-extrabold px-4 py-1.5 rounded-full text-xs sm:text-sm shadow-md shadow-lux-gold/20 group-hover:shadow-lg transition-all group-hover:scale-105 whitespace-nowrap">
            Claim Now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
          {/* mobile arrow */}
          <ArrowRight className="sm:hidden h-4 w-4 text-lux-gold flex-shrink-0 animate-pulse" />
        </div>
      </div>
      {/* shimmer effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[shimmer_3s_ease-in-out_infinite]" />
      </div>
    </Link>
  )
}
