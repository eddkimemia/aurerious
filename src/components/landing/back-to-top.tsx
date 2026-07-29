"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 600)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) return null

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-lux-navy-dark/80 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-lux-navy-dark hover:scale-110 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
