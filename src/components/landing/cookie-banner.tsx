"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Cookie } from "lucide-react"

export function CookieBanner() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) return
    const consent = localStorage.getItem("aureus-cookie-consent")
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(t)
    }
  }, [pathname])

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) return null

  const accept = () => { localStorage.setItem("aureus-cookie-consent", "accepted"); setVisible(false) }
  const decline = () => { localStorage.setItem("aureus-cookie-consent", "declined"); setVisible(false) }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-4 sm:p-6 cookie-slide-up">
      <div className="max-w-4xl mx-auto glass-dark rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <Cookie className="h-6 w-6 text-lux-gold flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white mb-1">We value your privacy</p>
          <p className="text-xs text-gray-300 leading-relaxed">We use cookies to improve your experience. By continuing, you agree to our cookie policy in accordance with Kenya&apos;s Data Protection Act.</p>
        </div>
        <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
          <button onClick={decline} className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors">Decline</button>
          <button onClick={accept} className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-lux-gold hover:bg-lux-gold-dark text-sm font-bold text-white shadow-lg shadow-lux-gold/30 transition-all hover:scale-105">Accept All</button>
        </div>
      </div>
    </div>
  )
}
