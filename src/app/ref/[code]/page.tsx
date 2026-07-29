"use client"

import Link from "next/link"
import { ArrowRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export default function RefLanding({ params }: { params: { code: string } }) {
  const [copied, setCopied] = useState(false)

  const referralCode = params.code
  const referrerName = referralCode === "ADMIN" ? "Aureus Network" : `Member ${referralCode}`

  const copyRef = () => {
    navigator.clipboard?.writeText(`https://aureusnetwork.co.ke/register?ref=${referralCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-lux-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lux-navy/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lux-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-lux-gold/30 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-lux-navy/20 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <Card className="w-full max-w-lg border-lux-gold/20 shadow-2xl glass text-center card-lift">
        <CardContent className="p-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-lux-navy shadow-lg shadow-lux-navy/20">
              <span className="font-heading font-bold text-white text-2xl">A</span>
            </div>
            <span className="font-heading font-bold text-3xl text-lux-navy">
              Aureus<span className="text-lux-gold">Network</span>
            </span>
          </div>

          <h1 className="font-heading font-bold text-3xl text-lux-navy mb-3">
            Join <span className="text-lux-gold">{referrerName}</span>&apos;s Team
          </h1>
          <p className="text-lux-text-light mb-8 leading-relaxed">
            You&apos;ve been invited to join a premium referral network. Start earning commissions by sharing your own referral link.
          </p>

          <div className="rounded-xl bg-lux-gold-pale border border-lux-gold/20 p-4 mb-8">
            <div className="flex items-center justify-center gap-2 text-sm text-lux-text-light mb-2">
              Your referral code:
            </div>
            <div className="flex items-center gap-2 justify-center">
              <code className="bg-white px-4 py-2 rounded-lg border border-lux-gold/20 font-mono text-sm text-lux-navy font-semibold">
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

          <p className="mt-6 text-xs text-lux-text-light">
            One-time membership fee. No monthly charges. Cancel anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}