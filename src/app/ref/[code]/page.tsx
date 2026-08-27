"use client"

import Link from "next/link"
import { ArrowRight, Copy, Check, DollarSign, CreditCard, Infinity, Shield, RefreshCw, Users, Sparkles, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"

export default function RefLanding({ params }: { params: Promise<{ code: string }> }) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [referrerName, setReferrerName] = useState("Zuri Agency")
  const [referrerInitials, setReferrerInitials] = useState("AN")
  const [totalMembers, setTotalMembers] = useState(0)
  const [joinedToday, setJoinedToday] = useState(0)

  const { code: referralCode } = use(params)

  useEffect(() => {
    if (!referralCode || referralCode === "undefined" || referralCode === "null") {
      router.push("/register")
      return
    }
    localStorage.setItem("ref", referralCode)
  }, [referralCode, router])

  useEffect(() => {
    if (referralCode && referralCode !== "ADMIN") {
      fetch("/api/referral/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referralCode }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.referrer?.name) {
            setReferrerName(data.referrer.name)
            const initials = data.referrer.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
            setReferrerInitials(initials)
          }
        })
        .catch(() => {})
    }

    fetch("/api/stats/public")
      .then((res) => res.json())
      .then((data) => {
        setTotalMembers(data.totalMembers || 0)
        setJoinedToday(data.joinedToday || 0)
      })
      .catch(() => {})
  }, [referralCode])

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zuriagency.co.ke"

  const copyRef = () => {
    navigator.clipboard?.writeText(`${baseUrl}/ref/${referralCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const benefits = [
    { icon: Gift, text: "Get KES 500 airtime bonus instantly" },
    { icon: DollarSign, text: "Earn KES 350 for every person you refer" },
    { icon: CreditCard, text: "One-time fee of KES 1,000 — no hidden costs" },
    { icon: Infinity, text: "No monthly charges. Keep everything you earn." },
  ]

  const trustBadges = [
    { icon: Shield, text: "M-Pesa Secure" },
    { icon: RefreshCw, text: "7-Day Guarantee" },
    { icon: Users, text: `${totalMembers.toLocaleString()}+ Members` },
  ]

  return (
    <div className="min-h-screen bg-lux-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lux-navy/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lux-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lux-navy shadow-sm">
          <span className="font-heading font-bold text-white text-sm">A</span>
        </div>
        <span className="font-heading font-bold text-lg text-lux-navy">
          Zuri<span className="text-lux-gold">Agency</span>
        </span>
      </div>

      {joinedToday > 0 && (
        <div className="flex items-center gap-2 bg-lux-gold-pale border border-lux-gold/20 rounded-full px-4 py-1.5 mb-6 animate-in-up">
          <Sparkles className="h-3.5 w-3.5 text-lux-gold" />
          <span className="text-xs font-medium text-lux-navy">
            {joinedToday} people joined today
          </span>
        </div>
      )}

      <Card className="w-full max-w-lg border-lux-gold/20 shadow-2xl glass">
        <CardContent className="p-8 sm:p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <Avatar className="h-16 w-16 ring-4 ring-lux-gold/20 mb-4">
              <AvatarFallback className="bg-lux-navy text-white text-lg font-bold">{referrerInitials}</AvatarFallback>
            </Avatar>
            <p className="text-sm text-lux-text-light mb-1">
              <span className="font-semibold text-lux-navy">{referrerName}</span> invites you to join
            </p>
            <h1 className="font-heading font-bold text-3xl text-lux-navy mt-1">
              Start Earning <span className="text-lux-gold">KES 350</span> Per Referral
            </h1>
            <p className="text-lux-text-light mt-3 leading-relaxed max-w-sm">
              Join Kenya&apos;s fastest-growing referral network. Share your link, refer friends, and earn real cash commissions instantly.
            </p>
          </div>

          <div className="w-full bg-gradient-to-r from-lux-gold to-lux-gold-dark rounded-xl p-4 mb-6 flex items-center gap-3 shadow-md border border-lux-gold/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-heading font-bold text-white text-sm">KES 500 Signup Bonus Included</p>
              <p className="text-xs text-white/90">Get KES 500 airtime bonus instantly after payment</p>
            </div>
            <Sparkles className="h-5 w-5 text-white ml-auto animate-pulse" />
          </div>

          <div className="space-y-3 mb-8">
            {benefits.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.text} className="flex items-center gap-3 rounded-xl bg-lux-gold-pale/60 border border-lux-gold/10 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lux-gold/15">
                    <Icon className="h-4 w-4 text-lux-gold" />
                  </div>
                  <span className="text-sm text-lux-text">{b.text}</span>
                </div>
              )
            })}
          </div>

          <div className="rounded-xl bg-lux-navy/5 border border-lux-navy/10 p-4 mb-8">
            <div className="flex items-center justify-center gap-2 text-sm text-lux-text-light mb-2">
              Your referral code:
            </div>
            <div className="flex items-center gap-2 justify-center">
              <code className="bg-white px-4 py-2 rounded-lg border border-lux-navy/10 font-mono text-sm text-lux-navy font-semibold">
                {referralCode}
              </code>
              <button
                onClick={copyRef}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-lux-gold text-white hover:bg-lux-gold-dark transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Link href={`/register?ref=${referralCode}`}>
            <Button className="w-full bg-lux-gold hover:bg-lux-gold-dark text-white font-heading font-bold h-12 rounded-lg shadow-lg shadow-lux-gold/25 hover:shadow-xl transition-all btn-shine text-base">
              Join Now - KES 1,000
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6">
            {trustBadges.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.text} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-lux-gold" />
                  <span className="text-xs text-lux-text-light">{b.text}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
