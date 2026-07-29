"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { UserPlus } from "lucide-react"

const proofData = [
  { name: "Akinyi O.", city: "Nakuru", time: "2 min ago" },
  { name: "David M.", city: "Eldoret", time: "5 min ago" },
  { name: "Faith W.", city: "Thika", time: "8 min ago" },
  { name: "Brian K.", city: "Nairobi", time: "12 min ago" },
  { name: "Lucy N.", city: "Kisumu", time: "15 min ago" },
  { name: "Samuel J.", city: "Mombasa", time: "18 min ago" },
  { name: "Esther G.", city: "Nyeri", time: "22 min ago" },
  { name: "Peter O.", city: "Machakos", time: "25 min ago" },
]

export function SocialProofToast() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) return
    let cancelled = false
    const cycle = () => {
      if (cancelled) return
      setVisible(true)
      timerRef.current = setTimeout(() => {
        if (cancelled) return
        setVisible(false)
        timerRef.current = setTimeout(() => {
          if (cancelled) return
          setCurrent((p) => (p + 1) % proofData.length)
          cycle()
        }, 6000 + Math.random() * 4000)
      }, 4000)
    }
    const init = setTimeout(cycle, 6000)
    return () => { cancelled = true; clearTimeout(init); if (timerRef.current) clearTimeout(timerRef.current) }
  }, [pathname])

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) return null

  const d = proofData[current]
  return (
    <div className={`fixed bottom-24 left-6 z-40 max-w-xs transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <div className="glass rounded-2xl shadow-2xl p-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lux-gold-pale flex-shrink-0">
          <UserPlus className="h-5 w-5 text-lux-gold-dark" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-lux-navy truncate">{d.name} <span className="font-normal text-lux-text-light">from {d.city}</span></p>
          <p className="text-xs text-lux-text-light">just joined Aureus Network &middot; {d.time}</p>
        </div>
      </div>
    </div>
  )
}
