"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Users, DollarSign, Globe, Shield, Zap, Headphones, Lock, Award, BarChart3, Star, MessageCircle, ChevronRight, TrendingUp, Target, CheckCircle, Phone, Wallet, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn, FadeInScale, AnimatedCounter } from "@/components/landing/shared"

const sections = [
  { icon: BarChart3, title: "How It Works", desc: "Three simple steps to start earning referral income Kenya today. Join, share your link, and earn M-Pesa commissions directly.", href: "/how-it-works", color: "bg-lux-navy" },
  { icon: DollarSign, title: "Earnings", desc: "See our transparent commission structure and use our earnings calculator to see how much you can make money online Kenya.", href: "/earnings", color: "bg-lux-gold-dark" },
  { icon: Star, title: "Testimonials", desc: "Real stories from real Kenyans earning passive income Kenya every day through the Aureus Network platform.", href: "/testimonials", color: "bg-lux-navy-light" },
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
                <Badge className="mb-6 px-4 py-2 bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20 font-medium text-sm inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-lux-gold-dark rounded-full animate-pulse live-dot" />
                  Premium Referral Platform | Instant M-Pesa Commissions
                </Badge>
              </FadeIn>

              <FadeIn delay={100}>
                <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-lux-navy">
                  Turn Your Network Into <span className="text-gradient">Monthly Income</span>
                </h1>
              </FadeIn>

              <FadeIn delay={200}>
                <p className="mt-6 text-lg sm:text-xl text-lux-text-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Earn <strong className="text-lux-gold-dark">35% commission</strong> on every person you refer. No products to sell. No inventory. Just pure referral income.
                </p>
              </FadeIn>

              <FadeIn delay={250}>
                <p className="mt-4 text-base text-lux-text-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                 Struggling to make ends meet? Aureus Network helps you earn real referral income by simply sharing with people you know. No products to sell, no special skills, and no complicated work. Whether you're a student, parent, or professional, you can turn your network into a steady stream of M-Pesa commissions and build a reliable side hustle from anywhere in Kenya.
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
                    <Button variant="outline" size="lg" className="border-2 border-lux-gold/30 text-lux-gold-dark hover:bg-lux-gold-pale font-heading font-semibold text-lg px-8 h-14 rounded-full transition-all hover:border-lux-gold/50">
                      How It Works
                    </Button>
                  </Link>
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
                <img src="/images/heror.jpg" alt="Aureus Network - Premium Referral Platform" className="w-full h-auto object-cover" />
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

      {/* Trust badges */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {[
              { icon: Shield, text: "Trusted by 5,000+ Kenyans", color: "text-lux-navy" },
              { icon: Zap, text: "Instant M-Pesa Payments", color: "text-lux-gold-dark" },
              { icon: Headphones, text: "24/7 Customer Support", color: "text-lux-navy" },
              { icon: Lock, text: "No Hidden Fees", color: "text-lux-gold-dark" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl hover:bg-lux-gold-pale/50 transition-colors">
                <item.icon className={`h-5 w-5 ${item.color} flex-shrink-0`} />
                <span className="text-sm font-medium text-lux-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Aureus Network */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Why Aureus Network</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Kenyans Are Earning Real Money Every Day</h2>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <FadeIn>
                <p className="text-lux-text leading-relaxed text-base lg:text-lg">
                  Kenyans are struggling with rising costs like never before. The price of unga, cooking oil, transport, and rent keeps going up while salaries stay the same. The average family needs an extra <strong className="text-lux-gold-dark">KES 5,000 to KES 10,000 per month</strong> just to keep up with basic living expenses. But finding a legitimate side hustle Kenya option that actually pays — without requiring a degree, startup capital, or endless hours — feels impossible. That is exactly why Aureus Network was built.
                </p>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="text-lux-text leading-relaxed text-base lg:text-lg">
                  Aureus Network was created by Kenyans, for Kenyans, to solve one simple problem: how to earn money online Kenya without getting scammed, without selling products to your friends and family, and without needing any special skills or experience. Our platform connects people through a simple referral system that rewards you for sharing an opportunity that actually works. With a <strong className="text-lux-gold-dark">one-time membership of just KES 1,000</strong>, you gain immediate access to your personal referral dashboard, training materials, and a supportive community of thousands of active members already earning every day.
                </p>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-lux-text leading-relaxed text-base lg:text-lg">
                  And here is the best part — your KES 1,000 investment pays for itself almost immediately. Refer just <strong className="text-lux-gold-dark">3 people</strong> and you earn KES 1,050, which means you are already in profit. Everything after that is pure passive income Kenya flowing directly to your M-Pesa account. We have already paid out over <strong className="text-lux-gold-dark">KES 2 million</strong> to our members, with more than <strong className="text-lux-gold-dark">5,000 active members</strong> across the country building their referral income Kenya streams every single day. No other platform makes earning M-Pesa commissions this simple, this transparent, and this accessible.
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
                    { icon: Wallet, title: "KES 1,000 Only", desc: "No monthly fees, no hidden charges. You pay once and earn forever." },
                    { icon: Phone, title: "Instant M-Pesa", desc: "Commissions sent directly to your M-Pesa. No bank accounts needed." },
                    { icon: Users, title: "Real Community", desc: "Join 5,000+ active Kenyans already earning referral income every day." },
                    { icon: TrendingUp, title: "Daily Earnings", desc: "Withdraw any time. Your earnings never expire and keep growing." },
                    { icon: Target, title: "Simple System", desc: "No products. No inventory. No experience needed. Just share your link." },
                    { icon: Clock, title: "Work Anywhere", desc: "Earn from your phone. At home, at work, or even while commuting." },
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

      {/* What Makes Aureus Different */}
      <section className="py-20 lg:py-28 bg-lux-cream border-t border-lux-gold/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">What Makes Us Different</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Why Thousands Choose Aureus Network</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              There are many ways to make money online Kenya, but none combine simplicity, transparency, and real earning potential like Aureus Network does.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Shield,
                title: "100% Kenyan, 100% Trusted",
                desc: "We are registered and operating right here in Kenya. Our leadership team is Kenyan, our support team speaks your language, and every commission is paid in KES directly to your M-Pesa. No offshore companies, no international wire transfers, no currency conversion losses. We understand the Kenyan market because we live in it every day.",
              },
              {
                icon: TrendingUp,
                title: "Realistic Earnings, Real Payouts",
                desc: "We do not promise you a brand new car in one month or overnight millions. What we do promise is a steady, reliable stream of M-Pesa commissions that grows month after month as your network expands. KES 350 per referral, KES 150 per override, paid instantly. Our members have already received over KES 2 million in real payouts.",
              },
              {
                icon: Users,
                title: "Community, Not Competition",
                desc: "When you join Aureus Network, you join a family. Our active WhatsApp community shares tips, celebrates wins, and supports each other. Top earners share their strategies freely because they know that helping you succeed makes the entire network stronger. You are never alone on this journey.",
              },
              {
                icon: Zap,
                title: "Zero Complexity, Zero Hassle",
                desc: "No products to stock, no inventory to manage, no customer service to handle, no delivery logistics, no refunds to process. You simply share your referral link and earn commissions. It is the purest form of referral income Kenya available today. If you can send a WhatsApp message, you can earn money with Aureus Network.",
              },
              {
                icon: Wallet,
                title: "Minimal Investment, Maximum Return",
                desc: "KES 1,000 one-time. That is the price of a few sodas, a single haircut, or a half-kilo of meat. But that KES 1,000 unlocks a lifetime earning opportunity. Refer just 3 people and you have already doubled your money. Refer 10 people and you are earning KES 3,500 every single month. Show us another side hustle Kenya opportunity that offers this return on investment.",
              },
              {
                icon: Clock,
                title: "Earn on Your Schedule, Your Terms",
                desc: "Are you a night owl? Early bird? Weekend warrior? It does not matter. Aureus Network works around your schedule. Share your link during your lunch break, while commuting, or while watching TV in the evening. There is no boss, no clock-in, no minimum hours. You earn based on your effort, not your time.",
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

      {/* How Much Can You Earn? */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Earnings Preview</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">How Much Can You Earn?</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              Your income grows with your network. Every person you refer earns you <strong className="text-lux-gold-dark">KES 350</strong>, and you also earn overrides from your team. Here is what your monthly income could look like:
            </p>
          </FadeIn>

          <FadeInScale delay={100}>
            <div className="max-w-4xl mx-auto">
              <div className="grid sm:grid-cols-3 gap-4 lg:gap-6 mb-10">
                {[
                  { referrals: 5, earnings: "KES 1,750", badge: "Starter", bg: "bg-white" },
                  { referrals: 10, earnings: "KES 3,500", badge: "Consistent", bg: "bg-white border-lux-gold/30 border-2" },
                  { referrals: 20, earnings: "KES 7,000", badge: "Committed", bg: "bg-white" },
                ].map((tier) => (
                  <Card key={tier.badge} className={`border-0 shadow-md hover:shadow-xl transition-all duration-300 card-lift ${tier.bg}`}>
                    <div className="h-1.5 bg-gradient-to-r from-lux-gold to-lux-gold-light" />
                    <CardContent className="p-6 text-center">
                      <Badge className="mb-3 bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">{tier.badge}</Badge>
                      <p className="text-sm text-lux-text-light mb-1">{tier.referrals} Referrals</p>
                      <p className="font-heading font-bold text-3xl text-lux-navy">{tier.earnings}</p>
                      <p className="text-xs text-lux-text-light mt-2">per month</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-lux-navy rounded-2xl p-6 lg:p-8 text-center">
                <p className="text-white font-heading font-bold text-2xl lg:text-3xl mb-4">
                  Refer 10 People = KES 3,500/mo
                </p>
                <p className="text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
                  But it does not stop there. When those 10 people each refer 5 more, your team override commissions push your earnings even higher. Use our full <Link href="/earnings" className="text-lux-gold font-semibold underline underline-offset-2 hover:text-lux-gold-light transition-colors">Earnings Calculator</Link> to see your real potential.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  <div className="bg-white/10 rounded-lg px-4 py-2 text-white">
                    <span className="text-lux-gold font-bold">KES 350</span> per direct referral
                  </div>
                  <div className="bg-white/10 rounded-lg px-4 py-2 text-white">
                    <span className="text-lux-gold font-bold">KES 150</span> per team override
                  </div>
                  <div className="bg-white/10 rounded-lg px-4 py-2 text-white">
                    <span className="text-lux-gold font-bold">KES 2M+</span> paid out to members
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
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Explore Aureus Network</span>
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
                quote: "As a student, I needed a way to earn without interfering with my classes. Aureus Network lets me share my link during breaks. I made KES 3,500 in my first two weeks.",
                name: "Kevin M.",
                location: "Kisumu",
                earn: "KES 3,500/mo",
              },
              {
                quote: "I have tried so many online money-making things but they were all scams. Aureus is different. The M-Pesa payments are instant and the support team is always available. Finally, a real side hustle that works.",
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
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-heading font-semibold text-lg px-10 h-16 rounded-full transition-all hover:border-white/50">
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
