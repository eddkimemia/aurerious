"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Users, DollarSign, Globe, Shield, Zap, Headphones, Lock, Award, BarChart3, Star, MessageCircle, ChevronRight, TrendingUp, Target, CheckCircle, Phone, Wallet, Clock, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn, FadeInScale, AnimatedCounter } from "@/components/landing/shared"

const sections = [
  { icon: BarChart3, title: "How It Works", desc: "Three simple steps to start earning referral income Kenya today. Join, share your link, and earn M-Pesa commissions directly.", href: "/how-it-works", color: "bg-lux-navy" },
  { icon: DollarSign, title: "Earnings", desc: "See our transparent commission structure and use our earnings calculator to see how much you can make money online Kenya.", href: "/earnings", color: "bg-lux-gold-dark" },
  { icon: Star, title: "Testimonials", desc: "Real stories from real Kenyans earning passive income Kenya every day through the Zuri Agency platform.", href: "/testimonials", color: "bg-lux-navy-light" },
  { icon: Award, title: "Why Choose Us", desc: "Everything you need to build a reliable side hustle Kenya income stream. Built by Kenyans, for Kenyans.", href: "/features", color: "bg-lux-gold-dark" },
  { icon: MessageCircle, title: "FAQ", desc: "Answers to the most common questions about earning M-Pesa commissions and building your referral income.", href: "/faq", color: "bg-lux-navy" },
  { icon: Globe, title: "Contact Us", desc: "Have questions about how to earn money online Kenya? We are here to help you get started today.", href: "/contact", color: "bg-lux-navy-light" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-lux-cream overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lux-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lux-navy/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-lux-gold/20 rounded-full animate-pulse-slow" />
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-lux-navy/15 rounded-full animate-pulse-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #0F2847 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <FadeIn>
                <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-lux-gold to-lux-gold-light text-white border-0 font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-lux-gold/20 animate-pulse-slow">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-lux-gold text-xs">🎁</span>
                  LIMITED: Get KES 500 Bonus Instantly + KES 350 Per Referral For Life
                </Badge>
              </FadeIn>

              <FadeIn delay={100}>
                <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-lux-navy">
                  Invest <span className="text-lux-gold">KES 1,000</span> Once. <span className="text-gradient">Earn KES 350 Forever.</span>
                </h1>
              </FadeIn>

              <FadeIn delay={200}>
                <p className="mt-6 text-lg sm:text-xl text-lux-navy leading-relaxed max-w-xl mx-auto lg:mx-0 font-semibold">
                  Pay once <span className="text-lux-gold-dark">KES 1,000</span> → Get <span className="bg-lux-gold text-white px-2 py-1 rounded-full text-sm">KES 500 Bonus Instantly</span> + Earn <strong>KES 350</strong> per direct referral + <strong>KES 150</strong> override forever. 50% payout. Instant Paystack & M-Pesa.
                </p>
              </FadeIn>

              <FadeIn delay={250}>
                <p className="mt-4 text-base text-lux-text-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                  <strong className="text-lux-navy">3 referrals = KES 1,050 profit.</strong> You’re already in the green. 10 referrals = <strong className="text-lux-gold-dark">KES 3,500 + KES 7,500 team overrides = KES 11,000</strong>. No products. No stock. No boss. Just share your link on WhatsApp and watch M-Pesa light up. <span className="bg-lux-gold-pale px-1.5 py-0.5 rounded text-lux-gold-dark font-bold">5,000+ Kenyans already earning. 2M+ paid out.</span>
                </p>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/register">
                    <Button size="lg" className="bg-lux-cta hover:bg-lux-cta-hover text-white font-heading font-bold text-lg px-8 h-14 rounded-full shadow-xl shadow-lux-gold/25 transition-all hover:shadow-2xl hover:scale-105 group relative overflow-hidden glow-cta btn-shine">
                      <span className="relative z-10">Join Now - KES 1,000</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                      <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button variant="outline" size="lg" className="border-2 border-lux-navy bg-lux-navy text-white hover:bg-transparent hover:text-lux-navy font-heading font-semibold text-lg px-8 h-14 rounded-full transition-all hover:border-lux-navy">
                      How It Works
                    </Button>
                  </Link>
                </div>
                <div className="mt-4 flex flex-col gap-2 justify-center lg:justify-start">
                  <p className="text-sm font-bold text-lux-navy flex items-center gap-2 justify-center lg:justify-start bg-lux-gold-pale border border-lux-gold/20 rounded-full px-4 py-2 w-fit">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lux-gold text-white text-xs">🎁</span>
                    KES 500 Bonus Instantly + 3 Referrals = KES 1,050 (Already Profitable!)
                  </p>
                  <p className="text-xs text-lux-text-light flex items-center gap-1.5 justify-center lg:justify-start">
                    <Clock className="h-3 w-3" /> Paystack & M-Pesa instant. No monthly fees. Cancel anytime.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={400}>
                <div className="mt-10 flex items-center gap-6 sm:gap-8 justify-center lg:justify-start">
                  {[
                    { value: 5000, suffix: "+", label: "Active Members", icon: Users },
                    { value: 350, prefix: "KES ", label: "Per Referral", icon: DollarSign },
                    { value: 100, suffix: "%", label: "Kenyan", icon: Globe },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-heading font-bold text-2xl text-lux-navy">
                        <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs text-lux-text-light mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={200} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="/images/heror.jpg" alt="Zuri Agency - Premium Referral Platform" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-lux-navy-dark/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 glass rounded-xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lux-gold-pale"><DollarSign className="h-5 w-5 text-lux-gold-dark" /></div>
                  <div>
                    <p className="text-xs text-lux-text-light">You Earned</p>
                    <p className="font-heading font-bold text-lux-navy text-shadow-gold">KES 3,500</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto block" preserveAspectRatio="none"><path d="M0 60V20C360 0 720 40 1080 20C1260 10 1380 15 1440 20V60H0Z" fill="#FBF9F6" /></svg>
        </div>
      </section>

      {/* Trust badges - hard marketing */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {[
              { icon: Gift, text: "KES 500 Bonus Instantly", color: "text-lux-gold-dark" },
              { icon: Zap, text: "Instant Paystack & M-Pesa", color: "text-lux-gold-dark" },
              { icon: TrendingUp, text: "50% Payout - Highest in Kenya", color: "text-lux-navy" },
              { icon: Shield, text: "Trusted by 5,000+ Kenyans", color: "text-lux-navy" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl hover:bg-lux-gold-pale/50 transition-colors">
                <item.icon className={`h-5 w-5 ${item.color} flex-shrink-0`} />
                <span className="text-sm font-medium text-lux-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Zuri Agency - HARD MARKETING */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-lux-gold to-lux-gold-light text-white border-0 shadow-md">Why 5,000+ Kenyans Quit Fake Hustles for Zuri Agency</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">We Don’t Just Pay. We <span className="text-lux-gold">Overpay.</span> 50% Back To You.</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-3xl mx-auto">One-time <strong className="text-lux-navy">KES 1,000</strong> → <strong className="text-lux-gold-dark">KES 500 bonus instantly</strong> + <strong className="text-lux-gold-dark">KES 350</strong> per direct + <strong className="text-lux-gold-dark">KES 150</strong> override forever. That’s <strong>50% payout</strong> — double the industry. No stock. No boss. No monthly fees.</p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <FadeIn>
                <div className="bg-lux-navy rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-lux-gold/20 rounded-full blur-2xl" />
                  <p className="font-heading font-bold text-lg mb-2 flex items-center gap-2"><Gift className="h-5 w-5 text-lux-gold" /> The Math That Makes You Rich</p>
                  <div className="grid grid-cols-3 gap-4 text-center mt-4">
                    <div className="bg-white/10 rounded-xl p-3"><p className="font-bold text-xl text-lux-gold">3</p><p className="text-xs text-white/80">Referrals</p><p className="font-bold text-sm">= KES 1,050</p><p className="text-[10px] text-lux-gold">PROFIT DAY 1</p></div>
                    <div className="bg-white/10 rounded-xl p-3 border-2 border-lux-gold"><p className="font-bold text-xl text-lux-gold">10</p><p className="text-xs text-white/80">Referrals</p><p className="font-bold text-sm">= KES 3,500</p><p className="text-[10px] text-white">+ KES 7,500 team</p></div>
                    <div className="bg-lux-gold rounded-xl p-3 text-lux-navy"><p className="font-bold text-xl">20</p><p className="text-xs">Referrals</p><p className="font-bold text-sm">= KES 7,000</p><p className="text-[10px]">+ KES 15k team</p></div>
                  </div>
                  <p className="text-xs text-white/70 mt-3 text-center">+ KES 500 bonus credited instantly. 5,000+ earning. 2M+ paid. Paystack & M-Pesa instant.</p>
                </div>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="text-lux-text leading-relaxed text-base lg:text-lg">
                  Tired of <strong>fake side hustles</strong> that need capital, stock, or 8 hours a day? Zuri Agency was built by Kenyans who were broke and built a system that <strong>actually pays</strong>: share your link on WhatsApp, Telegram, TikTok. When they pay <strong>KES 1,000</strong>, you get <strong className="text-lux-gold-dark">KES 350 instantly</strong>. When they refer, you get <strong className="text-lux-gold-dark">KES 150 more</strong> — forever. No products. No targets. No monthly fees. Just pure 50% payout.
                </p>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-lux-text leading-relaxed text-base lg:text-lg">
                  <strong className="text-lux-navy">Your risk? ZERO.</strong> You pay <strong>KES 1,000 once</strong> and get <strong className="text-lux-gold-dark">KES 500 bonus instantly</strong> — you’re already 50% back. Refer 3 and you’re <strong className="text-green-700">KES 50 profit</strong>. After that, every referral is pure profit. Students, mamas, boda riders, office workers — <strong>5,000+ Kenyans</strong> already turned their phone into an ATM. <strong className="text-lux-gold-dark">Will you?</strong>
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={150} className="space-y-4">
              <div className="glass rounded-2xl p-6 lg:p-8 border border-lux-gold/10">
                <h3 className="font-heading font-bold text-xl text-lux-navy mb-6 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-lux-gold-dark" />
                  Why Members Choose Us
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Gift, title: "KES 500 Bonus Instantly", desc: "Pay KES 1,000 → get KES 500 back instantly. You’re 50% recovered before you even start!" },
                    { icon: Wallet, title: "KES 350 + KES 150 Forever", desc: "50% payout: KES 350 direct + KES 150 override on every team referral — for life. Highest in Kenya." },
                    { icon: Zap, title: "Instant Paystack & M-Pesa", desc: "No waiting. No thresholds. KES 350 hits your phone in seconds. Withdraw anytime 24/7." },
                    { icon: Users, title: "5,000+ Already Earning", desc: "Join real Kenyans — students, mamas, riders — already cashing out. 2M+ paid, 99.9% success." },
                    { icon: Target, title: "Zero Skills Needed", desc: "If you can share a WhatsApp status, you can earn. We give you ready messages & graphics." },
                    { icon: Clock, title: "Earn In 15 Min/Day", desc: "No boss. No inventory. Share on WhatsApp, TikTok, Telegram — earn while you sleep." },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lux-gold-pale flex-shrink-0 mt-0.5">
                        <item.icon className="h-4 w-4 text-lux-gold-dark" />
                      </div>
                      <div>
                        <p className="font-semibold text-lux-navy text-sm">{item.title}</p>
                        <p className="text-xs text-lux-text-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What Makes Zuri Agency Different */}
      <section className="py-20 lg:py-28 bg-lux-cream border-t border-lux-gold/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">What Makes Us Different</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Why Thousands Choose Zuri Agency</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              There are many ways to make money online Kenya, but none combine simplicity, transparency, and real earning potential like Zuri Agency does.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Gift,
                title: "KES 500 Bonus On Entry — Instantly",
                desc: "Others make you wait. We pay you to join. Pay KES 1,000, get KES 500 back instantly. You start with house money. No other platform in Kenya does this. That’s how confident we are you’ll love it.",
              },
              {
                icon: TrendingUp,
                title: "50% Payout — Double The Industry",
                desc: "Most platforms pay 20-30%. We pay 50%: KES 350 direct + KES 150 override. That’s KES 500 of every KES 1,000 back to members. 2M+ already paid. Not promises. Proof.",
              },
              {
                icon: Zap,
                title: "Paystack & M-Pesa Instant — 60 Seconds",
                desc: "No weekly payouts. No minimum withdrawal stress. KES 350 hits your M-Pesa in 60 seconds. Paystack secure checkout. 24/7, even Sunday. Your money, your phone, instantly.",
              },
              {
                icon: Shield,
                title: "100% Kenyan. 100% Real. 100% Paid.",
                desc: "No offshore tricks. Kenyan founders, Kenyan support, KES payouts. 5,000+ members, 2M+ paid, 99.9% success. We’re not a foreign scheme — we’re your neighbor’s side hustle that actually works.",
              },
              {
                icon: Wallet,
                title: "KES 1,000 → KES 11,000 With 10 Referrals",
                desc: "3 referrals = KES 1,050 profit (you’re free). 10 referrals = KES 3,500 direct + KES 7,500 team = KES 11,000. 20 referrals = KES 22,000+. Show us one job that triples your money in a week.",
              },
              {
                icon: Clock,
                title: "15 Minutes A Day. Earn For Life.",
                desc: "No stock. No delivery. No boss. Share your link on WhatsApp status, TikTok, Telegram 15 mins a day. Your team keeps earning for you while you sleep. That’s passive income, not a second job.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 80}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full card-lift">
                  <div className="h-1.5 bg-gradient-to-r from-lux-gold to-lux-gold-light rounded-t-xl" />
                  <CardContent className="p-6 lg:p-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lux-navy text-white mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-lux-navy mb-3">{item.title}</h3>
                    <p className="text-lux-text-light leading-relaxed text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How Much Can You Earn? - RETURNS HEAVY */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-lux-gold to-lux-gold-light text-white border-0 shadow-md">Your ROI, Not Hype — Real Math</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">See Your Returns Before You Pay</h2>
            <p className="mt-6 text-lg text-lux-navy max-w-3xl mx-auto leading-relaxed font-medium">
              Pay <strong className="text-lux-gold-dark">KES 1,000 once</strong> → Get <strong className="bg-lux-gold text-white px-2 py-1 rounded-full text-sm">KES 500 Bonus Instantly</strong> + <strong className="text-lux-gold-dark">KES 350</strong> per referral + <strong className="text-lux-gold-dark">KES 150</strong> team override <strong>for life</strong>. No other hustle does this:
            </p>
          </FadeIn>

          <FadeInScale delay={100}>
            <div className="max-w-5xl mx-auto">
              <div className="grid sm:grid-cols-3 gap-4 lg:gap-6 mb-10">
                {[
                  { referrals: 5, earnings: "KES 2,250", sub: "1,750 + 500 bonus", badge: "STARTER - 3 = Profit", bg: "bg-white" },
                  { referrals: 10, earnings: "KES 4,000", sub: "3,500 + 500 bonus", badge: "🔥 MOST POPULAR", bg: "bg-white border-lux-gold/40 border-2 shadow-xl scale-105" },
                  { referrals: 20, earnings: "KES 7,500", sub: "7,000 + 500 bonus", badge: "BOSS - Team = 22k", bg: "bg-white" },
                ].map((tier) => (
                  <Card key={tier.badge} className={`border-0 shadow-md hover:shadow-xl transition-all duration-300 card-lift ${tier.bg}`}>
                    <div className="h-1.5 bg-gradient-to-r from-lux-gold to-lux-gold-light" />
                    <CardContent className="p-6 text-center">
                      <Badge className="mb-3 bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20 font-bold">{tier.badge}</Badge>
                      <p className="text-sm text-lux-text-light mb-1">{tier.referrals} Referrals</p>
                      <p className="font-heading font-bold text-3xl text-lux-navy">{tier.earnings}</p>
                      <p className="text-xs text-lux-gold-dark font-bold mt-1">{tier.sub}</p>
                      <p className="text-xs text-lux-text-light">first month (bonus + commissions)</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-gradient-to-br from-lux-navy to-lux-navy-dark rounded-2xl p-6 lg:p-8 text-center border border-lux-gold/20 shadow-2xl">
                <p className="text-lux-gold font-bold text-sm tracking-widest uppercase mb-2">The Real Power: Team Overrides</p>
                <p className="text-white font-heading font-bold text-2xl lg:text-3xl mb-4">
                  10 Direct = KES 3,500 → Team of 50 = <span className="text-lux-gold">KES 11,000/mo</span>
                </p>
                <p className="text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
                  Plus your <strong className="text-lux-gold">KES 500 bonus instantly</strong>. When your 10 each refer 5, you get <strong className="text-white">50 × KES 150 = KES 7,500</strong> without lifting a finger. That’s passive income. <Link href="/earnings" className="text-lux-gold font-bold underline underline-offset-2 hover:text-lux-gold-light transition-colors">Calculate your empire →</Link>
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  <div className="bg-white/10 rounded-lg px-4 py-2 text-white border border-white/10">
                    <span className="text-lux-gold font-bold">KES 350</span> direct × unlimited
                  </div>
                  <div className="bg-lux-gold text-lux-navy rounded-lg px-4 py-2 font-bold">
                    KES 500 Bonus Instantly
                  </div>
                  <div className="bg-white/10 rounded-lg px-4 py-2 text-white border border-white/10">
                    <span className="text-lux-gold font-bold">KES 150</span> team override forever
                  </div>
                </div>
              </div>
            </div>
          </FadeInScale>
        </div>
      </section>

      {/* Section Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Explore Zuri Agency</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Everything You Need to Know</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              Whether you are looking for a reliable side hustle Kenya, want to earn M-Pesa commissions from home, or are ready to build serious referral income Kenya — we have got you covered.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {sections.map((section, i) => (
              <FadeIn key={section.href} delay={i * 80}>
                <Link href={section.href} className="block h-full">
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full group card-lift overflow-hidden">
                    <div className={`h-1.5 ${section.color}`} />
                    <CardContent className="p-6 lg:p-8">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${section.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                        <section.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-lux-navy mb-2">{section.title}</h3>
                      <p className="text-lux-text-light leading-relaxed mb-4">{section.desc}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-lux-gold-dark group-hover:gap-2 transition-all">
                        Learn More <ChevronRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How to Start */}
      <section className="py-20 lg:py-28 bg-lux-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Quick Start Guide</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Get Started in 3 Simple Steps</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              You are just minutes away from earning your first M-Pesa commission. Here is exactly what you need to do:
            </p>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Pay KES 1,000",
                desc: "Click the Join Now button below and complete your one-time payment via M-Pesa. Your membership is activated instantly and you get immediate access to your personal dashboard and referral link.",
                color: "bg-lux-navy",
              },
              {
                step: "02",
                title: "Get Your Referral Link",
                desc: "Once inside your dashboard, you will find your unique referral link ready to share. Copy it, and you are ready to start earning. The dashboard also shows your real-time earnings and team activity.",
                color: "bg-lux-gold-dark",
              },
              {
                step: "03",
                title: "Share & Earn KES 350 Each",
                desc: "Send your link to family, friends, WhatsApp groups, and social media. Every person who joins through your link earns you KES 350 directly to M-Pesa. When they refer others, you earn KES 150 more per person. Your income grows automatically.",
                color: "bg-lux-navy-light",
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 100}>
                <div className="flex items-start gap-4 sm:gap-6 mb-8 last:mb-0">
                  <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${item.color} flex items-center justify-center shadow-lg`}>
                    <span className="font-heading font-bold text-xl sm:text-2xl text-white">{item.step}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-heading font-bold text-xl text-lux-navy mb-2">{item.title}</h3>
                    <p className="text-lux-text-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 bg-lux-gold-pale/50 border-y border-lux-gold/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                quote: "I was sceptical at first but after my first KES 1,750 hit M-Pesa, I knew this was real. I have now referred 12 people and earn over KES 5,000 every month without fail.",
                name: "Grace W.",
                location: "Nairobi",
                earn: "KES 5,200/mo",
              },
              {
                quote: "As a student, I needed a way to earn without interfering with my classes. Zuri Agency lets me share my link during breaks. I made KES 3,500 in my first two weeks.",
                name: "Kevin M.",
                location: "Kisumu",
                earn: "KES 3,500/mo",
              },
              {
                quote: "I have tried so many online money-making things but they were all scams. Zuri Agency is different. The M-Pesa payments are instant and the support team is always available. Finally, a real side hustle that works.",
                name: "Faith N.",
                location: "Mombasa",
                earn: "KES 7,000+/mo",
              },
            ].map((testimonial, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 card-lift border border-lux-gold/5">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-lux-gold text-lux-gold" />
                    ))}
                  </div>
                  <p className="text-lux-text leading-relaxed text-sm italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="font-semibold text-lux-navy text-sm">{testimonial.name}</p>
                      <p className="text-xs text-lux-text-light">{testimonial.location}</p>
                    </div>
                    <Badge className="bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">{testimonial.earn}</Badge>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Direct CTA */}
      <section className="py-20 bg-lux-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-lux-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-lux-gold/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lux-gold/3 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <Badge className="mb-6 px-4 py-2 bg-lux-gold/20 text-lux-gold-light border border-lux-gold/30 font-medium text-sm inline-flex items-center gap-2">
              Start Your Journey Today
            </Badge>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Ready to Start Earning Real Referral Income?
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every day you wait is another day of potential M-Pesa commissions you are leaving on the table. Thousands of Kenyans have already joined and are earning consistent money from their networks. Your KES 1,000 investment is the only barrier between you and a lifetime of referral income Kenya opportunities.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-lux-gold" /> No monthly fees</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-lux-gold" /> Instant M-Pesa</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-lux-gold" /> Cancel anytime</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-lux-gold" /> 5,000+ members</span>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-lux-cta hover:bg-lux-cta-hover text-white font-heading font-bold text-lg px-10 h-16 rounded-full shadow-2xl shadow-lux-gold/30 transition-all hover:shadow-lux-gold/40 hover:scale-105 group relative overflow-hidden glow-cta btn-shine">
                  <span className="relative z-10">Join Now - KES 1,000</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white bg-white text-lux-navy hover:bg-transparent hover:text-white font-heading font-semibold text-lg px-10 h-16 rounded-full transition-all hover:border-white/70">
                  Talk to Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
