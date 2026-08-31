"use client"

import { useState, useEffect, useRef, FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight, CheckCircle, Shield, Zap, Clock, Gift, Users, Star, Eye, Lock, TrendingUp,
  Wallet, Phone, MessageCircle, Award, Sparkles, ChevronDown, X, EyeOff, Eye as EyeIcon,
  CreditCard, Flame, Timer, Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// --- Live activity mock ---
const liveFeed = [
  { name: "Brian K.", city: "Nairobi", amount: "KES 350", time: "2 sec ago" },
  { name: "Grace W.", city: "Mombasa", amount: "KES 500", time: "14 sec ago" },
  { name: "Kevin O.", city: "Kisumu", amount: "KES 350", time: "31 sec ago" },
  { name: "Faith N.", city: "Nakuru", amount: "KES 700", time: "52 sec ago" },
  { name: "Dennis M.", city: "Eldoret", amount: "KES 350", time: "1 min ago" },
  { name: "Akinyi J.", city: "Thika", amount: "KES 1,050", time: "1 min ago" },
]

const testimonials = [
  { name: "Grace Wanjiku", loc: "Nairobi • Student", earn: "KES 23,800", quote: "I posted my link on my WhatsApp status. 7 friends joined in 3 days. KES 2,450 instantly. I cried. My HELB was delayed and this saved me.", refs: 18, stars: 5 },
  { name: "Kevin Mwangi", loc: "Kisumu • Boda Rider", earn: "KES 18,400", quote: "No more waiting for customers in the sun. I share my link between rides. My team is 34 people now. Every morning I wake to M-Pesa messages.", refs: 22, stars: 5 },
  { name: "Faith Njeri", loc: "Mombasa • Mama Mboga", earn: "KES 31,200", quote: "I thought it was a joke until my sister sent me KES 350 proof. I joined. In 2 weeks I made more than my stall makes in a month. It is real.", refs: 41, stars: 5 },
]

function Countdown({ onEnd }: { onEnd?: () => void }) {
  const [t, setT] = useState(14 * 3600 + 27 * 60 + 43)
  useEffect(() => {
    const i = setInterval(() => setT(s => {
      if (s <= 1) { onEnd?.(); return 15 * 60 }
      return s - 1
    }), 1000)
    return () => clearInterval(i)
  }, [onEnd])
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = t % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return (
    <span className="font-mono font-bold tracking-widest">
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  )
}

export default function OfferPage() {
  const router = useRouter()
  const formRef = useRef<HTMLDivElement>(null)
  const [viewers, setViewers] = useState(23)
  const [spots, setSpots] = useState(37)
  const [referrals, setReferrals] = useState(10)
  const [showExit, setShowExit] = useState(false)
  const [calcReferrals, setCalcReferrals] = useState(10)
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", referral: "" })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [refCode, setRefCode] = useState("")

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const r = p.get("ref") || p.get("r") || localStorage.getItem("ref") || ""
    if (r) {
      setRefCode(r)
      localStorage.setItem("ref", r)
    }
    // viewers jitter
    const iv = setInterval(() => setViewers(v => Math.max(14, Math.min(42, v + (Math.random() > 0.5 ? 1 : -1)))), 3000)
    // spots decrement slowly
    const is = setInterval(() => setSpots(s => Math.max(9, s - (Math.random() > 0.7 ? 1 : 0))), 7000)
    // exit intent
    let triggered = false
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5 && !triggered && !showExit) {
        triggered = true
        setShowExit(true)
      }
    }
    document.addEventListener("mouseleave", onMouseLeave)
    return () => {
      clearInterval(iv); clearInterval(is)
      document.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [showExit])

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    if (!form.name.trim()) { setError("Full name is required"); return }
    if (!form.email.trim()) { setError("Email is required"); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) { setError("Enter a valid email address"); return }
    const phoneClean = form.phone.replace(/[\s\-]/g, "")
    if (!phoneClean || !form.password) { setError("Phone and password are required"); return }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return }
    if (!/^07\d{8}$/.test(phoneClean)) { setError("Enter a valid 07... number (0712345678)"); return }
    setLoading(true)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: phoneClean,
          password: form.password,
          referralCode: refCode || form.referral || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Something went wrong. Try again."); return }
      if (data.authorizationUrl && !data.authorizationUrl.includes("paystack.mock")) {
        window.location.href = data.authorizationUrl
      } else if (data.authorizationUrl) {
        // mock -> poll simulation then success
        window.location.href = `/register?ref=${refCode || form.referral || ""}`
      } else {
        router.push("/login?verified=true")
      }
    } catch {
      setError("Network error. Check connection and try again.")
    } finally { setLoading(false) }
  }

  const calcDirect = calcReferrals * 350
  const calcTeam = calcReferrals * 5 * 150 // if each refers 5
  const calcTotal = calcDirect + 500 + calcTeam

  return (
    <div className="min-h-screen bg-[#FBF9F6] overflow-x-hidden">
      {/* TOP URGENCY BAR */}
      <div className="sticky top-0 z-[60] w-full">
        <div className="bg-[#0F2847] text-white text-center py-2.5 px-4 flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-bold">
            <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            BONUS ENDS IN <Countdown />
          </span>
          <span className="hidden sm:inline opacity-60">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5 text-lux-gold" /> <strong>{viewers} people</strong> viewing now
          </span>
          <span className="hidden sm:inline opacity-60">•</span>
          <span className="text-lux-gold font-bold">Only {spots} bonuses left today</span>
        </div>
      </div>

      {/* MINIMAL HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-[36px] z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#0F2847] flex items-center justify-center font-heading font-bold text-white">A</div>
            <span className="font-heading font-bold text-[#0F2847]">Zuri<span className="text-[#D4AF37]">Agency</span></span>
            <Badge className="hidden sm:inline-flex ml-2 bg-green-50 text-green-700 border border-green-200 gap-1 text-[11px]"><span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" /> LIVE PAYMENTS</Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-gray-500"><Shield className="h-3.5 w-3.5 text-green-600" /> Paystack Secured</span>
            <a href="https://wa.me/254753728292?text=Hello%20Zuri%20Agency%2C%20I%20saw%20your%20ad%20and%20want%20to%20join%20please%20help" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2847] hover:text-[#D4AF37]">
              <MessageCircle className="h-4 w-4" /> WhatsApp Help
            </a>
          </div>
        </div>
      </header>

      {/* HERO - 2 COL */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0F2847]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #0F2847 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-start">

            {/* LEFT COPY */}
            <div className="text-center lg:text-left pt-2">
              {/* badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-[#D4AF37]/20 shadow-sm rounded-full px-3 py-1.5 text-xs font-bold mb-4">
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
                <span className="text-[#0F2847]">5,284 Kenyans joined this month • KES 2.3M paid out</span>
              </div>

              <h1 className="font-heading font-extrabold text-[32px] sm:text-[42px] lg:text-[48px] leading-[0.95] tracking-tight text-[#0F2847]">
                Turn Your <span className="text-[#D4AF37]">WhatsApp</span> Status Into <span className="relative inline-block">KES 3,500 <span className="absolute -bottom-1 left-0 right-0 h-2 bg-[#D4AF37]/20 -rotate-1" /></span> This Week
              </h1>

              <p className="mt-4 text-[15px] sm:text-[17px] leading-relaxed text-gray-700 max-w-xl mx-auto lg:mx-0">
                Pay <strong className="text-[#0F2847]">KES 1,000 once</strong>. Get <span className="bg-[#D4AF37] text-white px-2.5 py-0.5 rounded-full font-bold">KES 500 BACK INSTANTLY</span>. Then earn <strong className="text-[#D4AF37]">KES 350</strong> for every friend who joins + <strong className="text-[#0F2847]">KES 150</strong> when they invite others. Forever.
              </p>

              {/* proof strip */}
              <div className="mt-4 flex flex-wrap items-center gap-2 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold"><CheckCircle className="h-3.5 w-3.5" /> No selling</span>
                <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold"><CheckCircle className="h-3.5 w-3.5" /> No monthly fee</span>
                <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold"><CheckCircle className="h-3.5 w-3.5" /> M-Pesa instant</span>
              </div>

              {/* mini math */}
              <div className="mt-5 bg-[#0F2847] rounded-2xl p-4 text-white relative overflow-hidden text-left max-w-xl mx-auto lg:mx-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-2xl" />
                <p className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5"><Flame className="h-3.5 w-3.5" /> THE MATH (NO LIES)</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
                    <p className="font-extrabold text-lg leading-none">3</p>
                    <p className="text-[11px] opacity-80">friends</p>
                    <p className="font-bold text-sm text-[#F0D060]">KES 1,050</p>
                    <p className="text-[10px] text-[#F0D060] font-bold">PROFIT DAY 1</p>
                  </div>
                  <div className="bg-[#D4AF37] rounded-xl p-2.5 text-[#0F2847] border-2 border-white/20 scale-105 shadow-lg">
                    <p className="font-extrabold text-lg leading-none">10</p>
                    <p className="text-[11px] opacity-70">friends</p>
                    <p className="font-extrabold text-sm">KES 4,000</p>
                    <p className="text-[10px] font-bold">THIS WEEK</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
                    <p className="font-extrabold text-lg leading-none">20</p>
                    <p className="text-[11px] opacity-80">friends</p>
                    <p className="font-bold text-sm text-[#F0D060]">KES 22k+</p>
                    <p className="text-[10px] opacity-80">/month w/ team</p>
                  </div>
                </div>
                <p className="text-[11px] text-white/60 mt-2.5 text-center">Includes KES 500 instant bonus. 5,000+ earning. Paystack + M-Pesa instant.</p>
              </div>

              {/* trust row */}
              <div className="mt-5 flex flex-wrap items-center gap-3 justify-center lg:justify-start text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" /> 4.9/5 (1,842 reviews)</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1"><Lock className="h-3 w-3" /> SSL Secured</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1"><Shield className="h-3 w-3 text-green-600" /> 99.9% payout success</span>
              </div>

              <p className="lg:hidden mt-4 text-xs font-bold text-[#D4AF37] animate-bounce">👇 Claim your bonus before timer ends</p>
            </div>

            {/* RIGHT FORM */}
            <div ref={formRef} className="relative lg:sticky lg:top-[110px]">
              <div className="bg-white rounded-[20px] shadow-2xl border border-gray-100 overflow-hidden">
                {/* form header */}
                <div className="bg-gradient-to-r from-[#0F2847] to-[#1A3660] p-5 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-2xl" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full"><Gift className="h-3 w-3" /> KES 500 BONUS TODAY ONLY</p>
                      <h3 className="font-heading font-bold text-xl mt-2 leading-tight">Claim Your Spot in 30 Seconds</h3>
                      <p className="text-sm text-white/70 mt-1">Pay KES 1,000 → Get KES 500 back instantly</p>
                    </div>
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                      <Wallet className="h-6 w-6 text-[#F0D060]" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/80"><strong className="text-white">{viewers} people</strong> filling this form now</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
                  {error && (
                    <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-red-700">
                      <X className="h-4 w-4 mt-0.5 flex-shrink-0" /> <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name" className="text-xs font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></Label>
                      <Input id="name" required placeholder="e.g. Brian Kamau" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="mt-1 h-11 rounded-xl border-gray-200 focus-visible:ring-[#D4AF37] focus-visible:border-[#D4AF37]" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></Label>
                      <Input id="email" required type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="mt-1 h-11 rounded-xl border-gray-200 focus-visible:ring-[#D4AF37] focus-visible:border-[#D4AF37]" />
                      <p className="text-[11px] text-gray-500 mt-1">For Paystack receipt & M-Pesa confirmation</p>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-xs font-semibold text-gray-700">M-Pesa Number <span className="text-red-500">*</span></Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input id="phone" type="tel" placeholder="0712345678" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="pl-10 h-11 rounded-xl border-gray-200 focus-visible:ring-[#D4AF37] focus-visible:border-[#D4AF37] font-medium" />
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">This is where we send your KES 350 commissions</p>
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-xs font-semibold text-gray-700">Create Password <span className="text-red-500">*</span></Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input id="password" type={showPw ? "text" : "password"} placeholder="At least 6 characters" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="pl-10 pr-10 h-11 rounded-xl border-gray-200 focus-visible:ring-[#D4AF37]" />
                        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0F2847]">
                          {showPw ? <EyeOff className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="referral" className="text-xs font-semibold text-gray-700">Referral Code <span className="font-normal text-gray-500">(optional)</span></Label>
                      {refCode ? (
                        <div className="mt-1 flex items-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-[#FDF6E3] px-3 h-11 text-sm font-bold text-[#0F2847]">
                          <CheckCircle className="h-4 w-4 text-[#D4AF37]" /> {refCode}
                        </div>
                      ) : (
                        <Input id="referral" placeholder="Have a code? Enter it" value={form.referral} onChange={e => setForm(p => ({ ...p, referral: e.target.value }))} className="mt-1 h-11 rounded-xl border-gray-200" />
                      )}
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full h-[56px] rounded-full bg-[#D4AF37] hover:bg-[#C4A030] text-white font-heading font-extrabold text-[17px] shadow-xl shadow-[#D4AF37]/25 hover:shadow-2xl hover:scale-[1.02] transition-all gap-2 btn-shine">
                    {loading ? (
                      <>
                        <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        Yes! Give Me KES 500 Bonus <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500">
                    <span className="inline-flex items-center gap-1"><Lock className="h-3 w-3" /> Paystack Secured</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1"><Shield className="h-3 w-3 text-green-600" /> 256-bit SSL</span>
                    <span>•</span>
                    <span>M-Pesa • Card • Bank</span>
                  </div>

                  <div className="rounded-xl bg-[#FDF6E3] border border-[#D4AF37]/20 p-3 flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 text-white"><Gift className="h-4 w-4" /></div>
                    <div className="text-xs leading-relaxed">
                      <p className="font-bold text-[#0F2847]">What happens after you pay KES 1,000?</p>
                      <p className="text-gray-600 mt-1">✓ <strong>KES 500</strong> credited instantly • ✓ Referral link activated in 5 sec • ✓ First <strong>KES 350</strong> lands in M-Pesa within minutes of your first invite.</p>
                    </div>
                  </div>

                  <p className="text-center text-[11px] text-gray-500 leading-relaxed">
                    By joining, you agree to <Link href="/terms" className="underline hover:text-[#0F2847]">Terms</Link> &amp; <Link href="/privacy" className="underline hover:text-[#0F2847]">Privacy</Link>. Need help? <a href="https://wa.me/254753728292?text=Hello%20Zuri%20Agency%2C%20I%20saw%20your%20ad%20and%20want%20to%20join%20please%20help" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold">WhatsApp us</a>
                  </p>
                </form>
              </div>

              {/* under-form social proof */}
              <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-3 flex items-center gap-3 shadow-sm">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                  ))}
                  <div className="h-8 w-8 rounded-full bg-[#0F2847] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">+5k</div>
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#0F2847] flex items-center gap-1"><Star className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" /> 4.9/5 from 1,842 verified members</p>
                  <p className="text-gray-500">“Pays faster than my employer” - Faith, Mombasa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-gray-100 bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-3">Trusted & Secured By</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-bold text-gray-600">
            <span className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full"><span className="h-2 w-2 bg-[#00C853] rounded-full" /> M-Pesa</span>
            <span className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full"><span className="h-2 w-2 bg-[#0b5cff] rounded-full" /> Paystack</span>
            <span className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full"><Shield className="h-3.5 w-3.5 text-green-600" /> Safaricom Secured</span>
            <span className="inline-flex items-center gap-2 bg-[#D4AF37] text-white px-3 py-1.5 rounded-full">5,000+ Active Members</span>
            <span className="inline-flex items-center gap-2 bg-[#0F2847] text-white px-3 py-1.5 rounded-full">KES 2.3M+ Paid</span>
          </div>
        </div>
      </section>

      {/* PAIN AGITATE */}
      <section className="py-10 lg:py-14 bg-[#FBF9F6]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="text-center max-w-2xl mx-auto">
              <Badge className="bg-red-50 text-red-600 border border-red-200">⚠️ REAL TALK</Badge>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F2847] mt-3 leading-tight">You Spend 4 Hours on TikTok & WhatsApp Daily. <span className="text-red-600">You Earn 0.</span></h2>
              <p className="text-gray-600 mt-3 leading-relaxed">Betting eats your bundle. Forex needs capital you don&apos;t have. Jobs say “tarmacking.” Meanwhile your bundles, your data, your time — all making Zuckerberg rich, not you.</p>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                { t: "Betting", d: "You lose 9/10. House always wins.", icon: "🎰" },
                { t: "Forex / Trading", d: "Needs 10k+ capital + months to learn. Then you still lose.", icon: "📉" },
                { t: "Tarmacking", d: "Print CVs, queue, “we’ll call you.” Months of silence.", icon: "📄" },
              ].map(c => (
                <div key={c.t} className="rounded-2xl bg-red-50 border border-red-100 p-4 text-center">
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <p className="font-bold text-[#0F2847]">{c.t}</p>
                  <p className="text-sm text-gray-600 mt-1">{c.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-[#0F2847] text-white p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent" />
              <div className="relative">
                <p className="inline-flex items-center gap-2 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-bold"><Sparkles className="h-3 w-3" /> THE FLIP</p>
                <p className="font-heading font-bold text-xl sm:text-2xl mt-3">What If Every “Hey, Check This” Paid You <span className="text-[#F0D060]">KES 350 INSTANTLY?</span></p>
                <p className="text-white/70 mt-2 max-w-2xl mx-auto">Same 15 minutes of sharing on WhatsApp Status, TikTok caption, Telegram group. Only now Safaricom buzzes <strong className="text-white">every time</strong> someone says yes. No product. No delivery. No boss.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="bg-[#FDF6E3] text-[#B8960C] border border-[#D4AF37]/20">⚡ 3 STEPS • 5 MINUTES</Badge>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F2847] mt-3">How You Start Earning Today</h2>
            <p className="text-gray-600 mt-3">No skills. No English needed. If you can send a WhatsApp, you can earn.</p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-[44px] left-[18%] right-[18%] h-0.5 bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-[#D4AF37] border-dashed" style={{ backgroundImage: "repeating-linear-gradient(90deg, #D4AF37 0 8px, transparent 8px 16px)" }} />
            {[
              { n: "01", title: "Pay KES 1,000 Once", desc: "Secure Paystack checkout. M-Pesa, Card, Bank. Takes 20 seconds. Your KES 500 bonus is credited instantly.", icon: CreditCard, color: "bg-[#0F2847]" },
              { n: "02", title: "Get Your Link Instantly", desc: "Dashboard opens immediately. Copy your personal link + get done-for-you WhatsApp/TikTok scripts & posters.", icon: Wallet, color: "bg-[#D4AF37]" },
              { n: "03", title: "Share & Get M-Pesa", desc: "Post on Status, groups, TikTok. Friend pays KES 1,000 → you get KES 350 in 60 seconds. They invite → you get KES 150 more. Forever.", icon: Zap, color: "bg-[#1A3660]" },
            ].map(s => (
              <div key={s.n} className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className={`mx-auto h-14 w-14 rounded-2xl ${s.color} flex items-center justify-center text-white shadow-lg`}>
                  <s.icon className="h-7 w-7" />
                </div>
                <span className="inline-flex mt-4 h-6 px-2 items-center justify-center rounded-full bg-gray-900 text-white text-[11px] font-bold">STEP {s.n}</span>
                <h3 className="font-heading font-bold text-lg text-[#0F2847] mt-3">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button onClick={scrollToForm} size="lg" className="rounded-full bg-[#0F2847] hover:bg-[#0F2847]/90 text-white font-bold h-12 px-8 shadow-lg gap-2">
              <Play className="h-4 w-4 fill-white" /> Show Me My Link <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="py-12 bg-[#FBF9F6]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-[#0F2847] text-white">💰 REAL MATH, NOT HYPE</Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F2847] mt-3 leading-tight">Slide It. See Your Money.</h2>
              <p className="text-gray-600 mt-3">Move the slider. Watch your month change. This is after your <strong>KES 500 bonus</strong> – pure profit.</p>

              <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#0F2847]">Friends you invite:</span>
                  <span className="bg-[#D4AF37] text-white font-extrabold px-3 py-1 rounded-full">{calcReferrals}</span>
                </div>
                <input type="range" min={1} max={50} value={calcReferrals} onChange={e => setCalcReferrals(Number(e.target.value))} className="w-full mt-4 accent-[#D4AF37] h-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span><span>25</span><span>50</span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Direct</p>
                    <p className="font-bold text-[#0F2847]">KES {calcDirect.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-500">{calcReferrals} × 350</p>
                  </div>
                  <div className="rounded-xl bg-[#FDF6E3] border border-[#D4AF37]/20 p-3">
                    <p className="text-xs text-[#B8960C] font-bold">Bonus</p>
                    <p className="font-bold text-[#D4AF37]">KES 500</p>
                    <p className="text-[10px] text-gray-500">instant</p>
                  </div>
                  <div className="rounded-xl bg-[#0F2847] text-white p-3">
                    <p className="text-xs text-white/70">Team (×5 each)</p>
                    <p className="font-bold text-[#F0D060]">KES {calcTeam.toLocaleString()}</p>
                    <p className="text-[10px] text-white/60">passive</p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F0D060] p-4 text-center text-[#0F2847]">
                  <p className="text-xs font-bold tracking-widest uppercase opacity-70">You Take Home</p>
                  <p className="font-heading font-extrabold text-3xl">KES {calcTotal.toLocaleString()}</p>
                  <p className="text-xs opacity-70">This month if each friend invites 5. No limits.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-[#0F2847] text-white p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-2xl" />
                <p className="text-xs font-bold tracking-widest text-[#F0D060] uppercase flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> PASSIVE INCOME EXPLAINED</p>
                <h3 className="font-heading font-bold text-xl mt-2">You Get Paid Even When You Sleep</h3>
                <p className="text-sm text-white/70 mt-2 leading-relaxed">
                  Invite 10 friends → <strong className="text-white">KES 3,500</strong> direct.<br />
                  They each invite 5 → 50 people × <strong className="text-[#F0D060]">KES 150 = KES 7,500</strong> for doing nothing.<br />
                  <strong className="text-white">Total = KES 11,000</strong> + KES 500 bonus. Month after month.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="bg-white/10 rounded-xl p-3"><p className="font-bold text-[#F0D060] text-lg">KES 350</p><p className="text-white/70">per direct</p><p className="text-white font-bold">For life</p></div>
                  <div className="bg-[#D4AF37] rounded-xl p-3 text-[#0F2847]"><p className="font-bold text-lg">KES 150</p><p className="text-[#0F2847]/70">per team</p><p className="font-bold">Forever</p></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="font-bold text-[#0F2847] flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Why This Works</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2"><span className="text-green-600">✓</span> Same people already buy bundles daily – your link just redirects that spend</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> 15 mins a day on Status/Telegram = 1-2 joins. That&apos;s KES 350-700 daily.</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> No targets. No demotion. Your team never expires.</li>
                </ul>
              </div>

              <Button onClick={scrollToForm} className="w-full h-12 rounded-full bg-[#D4AF37] hover:bg-[#C4A030] text-white font-bold shadow-lg gap-2">
                I Want This Calculator As Mine <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS + LIVE FEED */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="bg-green-50 text-green-700 border border-green-200">⭐ 4.9/5 • 1,842 VERIFIED</Badge>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0F2847] mt-3">Real Kenyans. Real M-Pesa.</h2>
            <p className="text-gray-600 mt-3">Not actors. Not Nairobi only. From Kisumu to Mombasa to Eldoret.</p>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <Card key={t.name} className="border-0 shadow-md hover:shadow-xl transition-all rounded-2xl overflow-hidden card-lift">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />)}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed italic">“{t.quote}”</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#0F2847] text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.loc} • {t.refs} refs</p>
                    </div>
                    <Badge className="bg-[#FDF6E3] text-[#B8960C] border border-[#D4AF37]/20">{t.earn}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* M-Pesa proof */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { name: "MPESA", code: "QGH7K9L2M", amt: "KES 1,050", phone: "0712•••678" },
              { name: "MPESA", code: "QGH7K2P8X", amt: "KES 350", phone: "0745•••321" },
              { name: "MPESA", code: "QGH7K5T1N", amt: "KES 2,100", phone: "0708•••904" },
            ].map(m => (
              <div key={m.code} className="bg-[#00A651] text-white rounded-2xl p-4 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <p className="text-[11px] font-bold tracking-widest opacity-80">M-PESA • CONFIRMED</p>
                <p className="font-mono text-xs mt-2 opacity-90">{m.code} Confirmed. {m.amt} sent to {m.phone} on 28/08/26 at 2:34 PM</p>
                <p className="text-[10px] opacity-70 mt-1">Transaction cost, KES 0.00. Account verified.</p>
                <p className="font-bold mt-2">{m.amt} Received</p>
              </div>
            ))}
          </div>

          {/* live feed */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-[#0F2847] rounded-2xl p-4">
              <p className="text-xs font-bold tracking-widest text-[#F0D060] uppercase flex items-center gap-2 justify-center">
                <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" /> LIVE EARNINGS FEED
              </p>
              <div className="mt-3 space-y-2 max-h-[220px] overflow-hidden">
                {liveFeed.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/10 rounded-xl px-3 py-2.5 text-sm">
                    <span className="text-white font-medium">{f.name} • {f.city}</span>
                    <span className="text-[#F0D060] font-bold">{f.amount}</span>
                    <span className="text-white/60 text-xs">{f.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-12 bg-[#FBF9F6]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading font-bold text-3xl text-[#0F2847]">Zuri vs Everything Else You&apos;ve Tried</h2>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0F2847] text-white">
                    <th className="text-left p-4 font-bold">Feature</th>
                    <th className="text-center p-4 font-bold bg-[#D4AF37] text-white">Zuri Agency ✓</th>
                    <th className="text-center p-4 text-white/70">Betting / Forex</th>
                    <th className="text-center p-4 text-white/70">Job</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["To start", "KES 1,000 once", "KES 5k-50k", "Months of tarmack"],
                    ["Instant bonus", "KES 500 BACK INSTANTLY", "No", "No"],
                    ["Pay per invite", "KES 350 + 150 passive", "Lose 90%", "KES 0"],
                    ["Payout speed", "60 seconds to M-Pesa", "Never / Delayed", "Month end"],
                    ["Time needed", "15 mins / day", "6 hrs / day", "8 hrs / day"],
                    ["Withdrawal", "Anytime 24/7", "Locked", "30 days"],
                  ].map(row => (
                    <tr key={row[0]} className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-[#0F2847]">{row[0]}</td>
                      <td className="p-4 text-center font-bold text-green-700 bg-[#FDF6E3]/50">{row[1]}</td>
                      <td className="p-4 text-center text-gray-500">{row[2]}</td>
                      <td className="p-4 text-center text-gray-500">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* STACK / WHAT YOU GET */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0F2847] to-[#1A3660] rounded-[20px] p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-[#D4AF37] text-white border-0">🎁 STACKED VALUE • KES 1,000 ONLY</Badge>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl mt-3 leading-tight">Everything You Get Instantly</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {[
                    "KES 500 cash bonus credited instantly (50% back on day 1)",
                    "Personal referral link activated in 5 seconds",
                    "Done-for-you WhatsApp & TikTok scripts (copy-paste)",
                    "Ready posters & videos for your Status",
                    "Team dashboard to track every shilling in real time",
                    "24/7 WhatsApp support (real human, not bot)",
                    "KES 350 per direct + KES 150 team override — forever",
                  ].map(it => (
                    <li key={it} className="flex gap-2"><CheckCircle className="h-4 w-4 text-[#F0D060] flex-shrink-0 mt-0.5" /> <span className="text-white/90">{it}</span></li>
                  ))}
                </ul>
                <p className="mt-4 inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-xs">
                  <Award className="h-3.5 w-3.5 text-[#F0D060]" /> No monthly fee • No targets • Cancel anytime
                </p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-[#0F2847]">
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">TODAY'S OFFER</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold">KES 1,000</span>
                  <span className="text-sm line-through text-gray-400">KES 2,500</span>
                  <Badge className="bg-red-500 text-white">SAVE 60%</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">One time. Lifetime access. Includes KES 500 instant cashback.</p>
                <div className="mt-4 rounded-xl border-2 border-[#D4AF37] bg-[#FDF6E3] p-3 flex items-center justify-between">
                  <span className="font-bold text-sm">You pay</span>
                  <span className="font-extrabold text-lg">KES 1,000</span>
                </div>
                <div className="mt-2 rounded-xl bg-green-50 border border-green-200 p-3 flex items-center justify-between">
                  <span className="font-bold text-sm text-green-700">You get instantly</span>
                  <span className="font-extrabold text-green-700">KES 500</span>
                </div>
                <p className="text-center text-xs font-bold text-[#D4AF37] mt-3">→ Real cost = KES 500. Earn it back with 2 invites.</p>
                <Button onClick={scrollToForm} className="w-full mt-4 h-12 rounded-full bg-[#D4AF37] hover:bg-[#C4A030] text-white font-bold">Claim Bonus Now <ArrowRight className="h-4 w-4 ml-1" /></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTIONS FAQ */}
      <section className="py-12 bg-[#FBF9F6]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading font-bold text-3xl text-[#0F2847]">You Have Questions. We Have M-Pesa Receipts.</h2>
          </div>
          <div className="mt-8 space-y-3">
            {[
              { q: "Is this a pyramid / scam? Will you disappear?", a: "We are Kenyan-owned, Paystack-verified, with 5,000+ members and KES 2.3M paid with instant M-Pesa. You get KES 500 back instantly – scammers don’t pay you to join. You can withdraw even KES 350 anytime, 24/7. We make money only when you do." },
              { q: "When do I get the KES 350? Do I wait weeks?", a: "60 seconds. Friend pays KES 1,000 via Paystack → our system auto-sends KES 350 to your M-Pesa. No manual approval. No minimum withdrawal. We show M-Pesa codes live above." },
              { q: "What if I have no followers / I’m not popular?", a: "You don’t need 10k followers. 80% of our members get their first 3 joins from family + 2 WhatsApp groups. We give you copy-paste scripts and posters. If you can forward a message, you can earn." },
              { q: "Do I need to sell products or recruit forever?", a: "No product. No stock. No delivery. You share a link. That’s it. And ‘forever’ is the best part – your team’s invites pay you KES 150 even when you’re offline. That’s why it’s passive." },
              { q: "What if I join and fail to get anyone?", a: "You still keep the KES 500 instant bonus. And we give you 30 days of support + scripts. Most who post 2x/day on Status get 2-3 joins in 72 hours. But if you truly get zero, you’ve only risked KES 500 net – less than 2 bundles." },
              { q: "Is KES 1,000 refundable?", a: "See Refund Policy – but more important: you’re instantly given KES 500 back. Your net risk is KES 500. 3 friends = KES 1,050 profit. After that you are free forever." },
            ].map((f, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm open:shadow-md transition-all">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-bold text-[#0F2847] pr-4">{f.q}</span>
                  <span className="h-8 w-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-open:rotate-180 transition-transform"><ChevronDown className="h-4 w-4" /></span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 bg-[#0F2847] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative text-center">
          <Badge className="bg-red-500 text-white border-0 animate-pulse gap-1.5"><Timer className="h-3.5 w-3.5" /> BONUS EXPIRES IN <Countdown /></Badge>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-4 leading-tight">Your KES 500 Is Waiting.<br />Will You Take It Or Leave It?</h2>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">5,284 members. 2.3M paid. 60-second M-Pesa. Every minute you think, someone else posts their link and takes your friend.</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-white/60">
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#F0D060]" /> No monthly fees</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#F0D060]" /> Instant M-Pesa</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#F0D060]" /> Paystack Secured</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#F0D060]" /> 24/7 Withdraw</span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={scrollToForm} size="lg" className="h-14 px-10 rounded-full bg-[#D4AF37] hover:bg-[#C4A030] text-white font-extrabold text-lg shadow-2xl shadow-[#D4AF37]/20 hover:scale-105 transition-all gap-2">
              Claim My KES 500 Bonus Now <ArrowRight className="h-5 w-5" />
            </Button>
            <a href="https://wa.me/254753728292?text=Hello%20Zuri%20Agency%2C%20I%20saw%20your%20ad%20and%20want%20to%20join%20please%20help" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/20 bg-white/5 text-white hover:bg-white hover:text-[#0F2847] font-bold w-full sm:w-auto gap-2">
                <MessageCircle className="h-5 w-5" /> Ask on WhatsApp
              </Button>
            </a>
          </div>

          <p className="mt-4 text-xs text-white/50">Secure checkout via Paystack • M-Pesa • Card • Bank • 256-bit SSL • Only {spots} bonuses left</p>

          <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-white/40">
            <Shield className="h-3 w-3" /> <span>Your data is encrypted. We never share your number.</span>
          </div>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-[#0F2847] flex items-center justify-center font-bold text-white text-xs">A</div>
              <span className="font-bold text-[#0F2847]">ZuriAgency.co.ke</span>
              <span>© {new Date().getFullYear()} All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-[#0F2847] underline">Terms</Link>
              <Link href="/privacy" className="hover:text-[#0F2847] underline">Privacy</Link>
              <Link href="/refund" className="hover:text-[#0F2847] underline">Refund</Link>
              <Link href="/contact" className="hover:text-[#0F2847] underline">Contact</Link>
              <a href="https://wa.me/254753728292?text=Hello%20Zuri%20Agency%2C%20I%20saw%20your%20ad%20and%20want%20to%20join%20please%20help" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#25D366] font-bold hover:underline"><MessageCircle className="h-3 w-3" /> WhatsApp</a>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-gray-400 leading-relaxed text-center max-w-3xl mx-auto">
            Disclaimer: Zuri Agency is a referral marketing platform. Earnings depend on your effort in sharing your link. Past earnings (KES 350 per direct + KES 150 team) are not a guarantee of future results. Pay KES 1,000 once, receive KES 500 bonus instantly. 18+ only.
          </p>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#0F2847] leading-none">Join Now - <span className="text-[#D4AF37]">KES 500 Bonus</span></p>
          <p className="text-[11px] text-gray-500 flex items-center gap-1"><Clock className="h-3 w-3" /> Ends in <Countdown /></p>
        </div>
        <Button onClick={scrollToForm} className="rounded-full bg-[#D4AF37] hover:bg-[#C4A030] text-white font-extrabold h-11 px-6 shadow-lg flex-shrink-0 gap-1">
          Claim <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="h-[72px] lg:hidden" />

      {/* EXIT INTENT MODAL */}
      {showExit && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#0F2847]/60 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] shadow-2xl max-w-md w-full overflow-hidden relative">
            <button onClick={() => setShowExit(false)} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><X className="h-4 w-4" /></button>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-5 text-white text-center">
              <p className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">WAIT! DON&apos;T LEAVE YOUR KES 500</p>
              <h3 className="font-heading font-extrabold text-2xl mt-2">You’re About To Miss KES 500 FREE</h3>
              <p className="text-sm text-white/90 mt-1">Close this tab and your bonus goes to the next person. {spots} left.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-xl bg-[#FDF6E3] border border-[#D4AF37]/20 p-4 flex items-center gap-3">
                <Gift className="h-8 w-8 text-[#D4AF37] flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-bold text-[#0F2847]">Pay KES 1,000 → Get KES 500 Instantly</p>
                  <p className="text-gray-600 text-xs">Plus KES 350 per friend. Forever.</p>
                </div>
              </div>
              <Button onClick={() => { setShowExit(false); scrollToForm() }} className="w-full h-12 rounded-full bg-[#D4AF37] hover:bg-[#C4A030] text-white font-bold">
                Yes, I Want My KES 500 <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <button onClick={() => setShowExit(false)} className="w-full text-xs text-gray-500 hover:text-gray-700">No, I’ll leave money on the table</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
