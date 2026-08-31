"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mail, Phone, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WhatsAppIcon } from "@/components/landing/shared"

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/ZuriAgency", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { label: "Instagram", href: "https://instagram.com/ZuriAgency", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
  { label: "TikTok", href: "https://tiktok.com/@ZuriAgency", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88-.13 6.84 6.84 0 0 0 3.76-1.27V8.1a10.27 10.27 0 0 1-4.52 1.05A10.27 10.27 0 0 1 3.63 8.1V4.64a13.84 13.84 0 0 0 7.89 2.33V3.49a17.26 17.26 0 0 0-11.34 3.3V2h-3.45v13.67a6.34 6.34 0 0 0 10.86 4.48 6.34 6.34 0 0 0-5.08-6.22V6.69z"/></svg> },
  { label: "YouTube", href: "https://youtube.com/@ZuriAgency", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
]

const footerNav = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Earnings", href: "/earnings" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

export function SiteFooter() {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/admin")
  const isLandingPage = pathname.startsWith("/offer") || pathname.startsWith("/go") || pathname.startsWith("/lp")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  if (isDashboard || isLandingPage) return null

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => { setSubscribed(false); setEmail("") }, 3000)
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lux-navy font-heading font-bold text-white text-lg">A</div>
              <span className="font-heading font-bold text-lg text-white">Zuri<span className="text-lux-gold">Agency</span></span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">Refer. Earn. Grow. Your Network, Your Income. Built for Kenyans, by Kenyans.</p>
            <div className="flex gap-3">
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-400 hover:bg-lux-gold hover:text-white transition-all hover:scale-110 hover:shadow-lg hover:shadow-lux-gold/20" aria-label={item.label}>{item.svg}</a>
              ))}
            </div>
            <div className="mt-5">
              <p className="text-sm text-gray-400 mb-3">Get referral tips &amp; platform updates</p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm font-semibold text-lux-gold">
                  <Check className="h-4 w-4" /> Subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 rounded-lg bg-white/10 border-white/10 text-white placeholder:text-gray-500 text-sm flex-1 focus:ring-lux-gold focus:border-lux-gold"
                  />
                  <Button type="submit" className="bg-lux-gold hover:bg-lux-gold-dark text-white font-semibold text-sm h-10 px-4 rounded-lg flex-shrink-0 transition-colors">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-lux-gold transition-colors hover:translate-x-1 inline-block">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400"><Mail className="h-4 w-4 flex-shrink-0" /> info@zuriagency.co.ke</li>
              <li className="flex items-center gap-2 text-sm text-gray-400"><Phone className="h-4 w-4 flex-shrink-0" /> 0753728292</li>
              <li className="flex items-center gap-2 text-sm text-gray-400"><WhatsAppIcon className="h-4 w-4 flex-shrink-0" /> 0753728292</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-sm text-gray-400 hover:text-lux-gold transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-lux-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="text-sm text-gray-400 hover:text-lux-gold transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Zuri Agency. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-4 bg-lux-navy rounded-sm" />
            <div className="h-1.5 w-4 bg-lux-gold rounded-sm" />
            <div className="h-1.5 w-4 bg-lux-navy-dark rounded-sm" />
            <span className="text-xs text-gray-500 ml-1">100% Kenyan</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
