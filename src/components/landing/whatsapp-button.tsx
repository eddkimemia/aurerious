"use client"

import { WhatsAppIcon } from "@/components/landing/shared"

export function WhatsAppButton() {
  return (
    <a href="https://wa.me/254753728292?text=Hello%20Zuri%20Agency%2C%20I%27m%20interested%20in%20joining%20-%20please%20help%20me%20get%20started" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group pulse-ring" aria-label="Chat on WhatsApp - +254753728292">
      <WhatsAppIcon className="h-7 w-7" />
      <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Chat on WhatsApp</span>
    </a>
  )
}
