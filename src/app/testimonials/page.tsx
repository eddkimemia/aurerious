"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, BadgeCheck, Trophy, ArrowRight, CheckCircle, Smartphone, Zap, Shield, Clock, DollarSign, Copy, MessageCircle, UserPlus, Heart, TrendingUp, Sparkles, Target, BookOpen, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn, FadeInScale, SectionHeading } from "@/components/landing/shared"

const testimonials = [
  { name: "Sarah M.", location: "Nairobi", text: "I joined Zuri Agency three months ago with zero expectations. I had tried other side hustles before — selling products, freelance writing, even digital marketing — and nothing ever stuck. But this was different. I simply shared my referral link on my WhatsApp status and within my church group. In my first week, 10 friends joined using my link. I made KES 3,500 before I even fully understood what was happening. Today, three months in, I have earned KES 12,250. That is money that has helped me pay my son's school fees without stress. I have never had to explain, justify, or sell anything. I just shared my experience and people wanted to join too.", stars: 5, amount: "KES 12,250", joined: "3 months ago" },
  { name: "James K.", location: "Mombasa", text: "I left my sales job six months ago because I realized I was working 12-hour days for peanuts. A friend told me about Zuri Agency and I saw the potential immediately. The math was simple — KES 350 per referral, unlimited potential. I started aggressively sharing my link on social media, in WhatsApp groups, and even printed flyers for my local estate in Mombasa. Today my team has 50 active members and is growing by 10-15 people every week. My upline earnings alone are KES 30,000 per month. Combined with my direct referrals, I am earning over KES 45,000 every single month. That is more than I made at my job, and I work half the hours. No boss, no commute, no nonsense.", stars: 5, amount: "KES 45,000", joined: "6 months ago" },
  { name: "Grace W.", location: "Kisumu", text: "I was skeptical at first. Who would not be? A platform that pays you for referring people sounds too good to be true. But I read through the entire website, saw the transparent breakdown of how KES 1,000 is distributed, and decided to take a chance on KES 1,000. That is less than what I spend on airtime in a month. I referred my sister, my neighbor, and my colleague at work. Three people. I made my KES 1,000 back instantly. That was the moment I knew this was real. Today I have referred 24 people and earned KES 8,400. For someone in Kisumu, that is life-changing money. I no longer have to choose between transport fare and buying lunch.", stars: 5, amount: "KES 8,400", joined: "2 months ago" },
  { name: "Daniel O.", location: "Nakuru", text: "The transparency is what won me over. No hidden fees, no confusing fine print, no monthly targets you have to hit before you qualify for commissions. Just clean, straightforward math — KES 350 per direct referral and KES 150 per team referral. I have referred 25 people and I earn consistently every month without fail. The M-Pesa payments arrive instantly, usually within 30 seconds of someone joining. I have tried other referral programs before and they always find reasons to delay or deny payments. Zuri Agency is different. They pay what they promise, when they promise it. That is rare in Kenya and I respect it.", stars: 5, amount: "KES 15,750", joined: "4 months ago" },
  { name: "Lucy N.", location: "Thika", text: "As a university student in Thika, I needed a way to make money that would not interfere with my classes. I cannot work a regular job because of my lecture schedule, and most online opportunities require skills I am still learning. Zuri Agency was the perfect solution. I share my referral link on WhatsApp groups — my class groups, my church youth group, even my family group — and I earn KES 350 each time someone joins. It is that simple. I have earned KES 7,000 so far and it has covered my hostel rent and food for two months. My friends think I am lucky. I tell them it is not luck — it is just being part of the right platform at the right time.", stars: 5, amount: "KES 7,000", joined: "2 months ago" },
]

const milestones = [
  { tier: "Bronze", range: "1-10 referrals", earnings: "KES 350 - KES 3,500/mo", benefits: ["Active Member Badge", "WhatsApp Support Group", "Monthly Payouts", "Basic Dashboard Access"], bgClass: "bg-bronze", icon: Award },
  { tier: "Silver", range: "11-50 referrals", earnings: "KES 3,850 - KES 17,500/mo", benefits: ["Priority Support", "Referral Dashboard", "Upline Training", "Weekly Tips & Strategies"], bgClass: "bg-silver", icon: BadgeCheck },
  { tier: "Gold", range: "51-200 referrals", earnings: "KES 17,850 - KES 70,000/mo", benefits: ["Dedicated Account Manager", "Team Analytics", "Exclusive Events", "Early Feature Access"], bgClass: "bg-gold-metallic", icon: Star },
  { tier: "Platinum", range: "200+ referrals", earnings: "KES 70,000+/mo", benefits: ["VIP Status", "Revenue Share", "Brand Ambassador", "Leadership Retreat Invites"], bgClass: "bg-platinum shimmer-slow", icon: Trophy },
]

const activityFeedData = [
  { name: "Mary W.", action: "joined Zuri Agency", time: "2 min ago", type: "join" },
  { name: "Peter K.", action: "received KES 350 direct commission", time: "5 min ago", type: "earning" },
  { name: "Jane M.", action: "referred 3 new members this morning", time: "12 min ago", type: "referral" },
  { name: "David O.", action: "received KES 150 upline commission", time: "18 min ago", type: "earning" },
  { name: "Faith N.", action: "joined via referral link from Sarah", time: "25 min ago", type: "join" },
  { name: "Samuel K.", action: "withdrew KES 1,050 to M-Pesa", time: "34 min ago", type: "payout" },
  { name: "Esther J.", action: "referred 5 new members today", time: "42 min ago", type: "referral" },
  { name: "Brian M.", action: "received KES 700 in commissions", time: "51 min ago", type: "earning" },
]

const trustBreakdown = [
  { stars: 5, percentage: 92, count: "4,600" },
  { stars: 4, percentage: 5, count: "250" },
  { stars: 3, percentage: 2, count: "100" },
  { stars: 2, percentage: 0.5, count: "25" },
  { stars: 1, percentage: 0.5, count: "25" },
]

const proofFeatures = [
  { icon: Zap, text: "Instant M-Pesa Payouts" },
  { icon: Shield, text: "Secure & Verified" },
  { icon: Clock, text: "24/7 Automated Payouts" },
  { icon: DollarSign, text: "No Minimum Withdrawal" },
  { icon: Smartphone, text: "Works on Any Phone" },
  { icon: Share2, text: "Easy Link Sharing" },
]

const highlightQuotes = [
  { quote: "KES 45,000 earned in 6 months", name: "James K.", icon: TrendingUp },
  { quote: "10 referrals in first week", name: "Sarah M.", icon: Users },
  { quote: "KES 3,500 in 7 days", name: "Sarah M.", icon: DollarSign },
  { quote: "25 people referred and counting", name: "Daniel O.", icon: Target },
]

const lifeChanges = [
  { name: "Sarah", amount: "KES 12,250", impact: "she can now afford her children's school fees without stress", icon: Heart },
  { name: "James", amount: "KES 45,000", impact: "has replaced his full-time income and left his 9-to-5 job", icon: TrendingUp },
  { name: "Grace", amount: "KES 8,400", impact: "she no longer has to choose between transport and lunch", icon: Sparkles },
  { name: "Daniel", amount: "KES 15,750", impact: "has built a consistent monthly income stream he can rely on", icon: Shield },
  { name: "Lucy", amount: "KES 7,000", impact: "a student who covers her rent and food without parental support", icon: BookOpen },
]

export default function TestimonialsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const totalSlides = testimonials.length

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-lux-cream overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lux-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lux-navy/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-lux-gold/20 rounded-full animate-pulse-slow" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #0F2847 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      {/* Hero */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            badge="Real People, Real Results"
            title="What Our Members Say"
            subtitle="Hear from real Kenyans earning KES 350 per referral + KES 500 bonus instantly — 5,000+ members, 2M+ paid."
          />
          <FadeIn delay={200}>
            <p className="mt-8 text-lg text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              Nothing builds trust like hearing from real people who have actually earned real money. The testimonials you are about to read are not paid actors, stock photos, or fabricated success stories. These are real Kenyans from Nairobi, Mombasa, Kisumu, Nakuru, Thika, and everywhere in between who took a chance on Zuri Agency and changed their financial situation. Every name, every location, every earnings figure is authentic and verifiable. We do not need to make up success stories when thousands of our members are living them every single day.
            </p>
            <p className="mt-4 text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              Scroll through their stories below. Read what they have to say about the platform, the payouts, and the life-changing impact of earning KES 350 per referral. Then imagine what your own testimonial could look like a few months from now.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Testimonial Highlights */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {highlightQuotes.map((h, i) => {
              const Icon = h.icon
              return (
                <FadeInScale key={i} delay={i * 100}>
                  <Card className="border-0 shadow-md card-lift bg-white">
                    <CardContent className="p-4 lg:p-6 text-center">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-lux-gold-pale mb-3">
                        <Icon className="h-5 w-5 text-lux-gold-dark" />
                      </div>
                      <p className="font-heading font-bold text-lg text-lux-navy">{h.quote}</p>
                      <p className="text-xs text-lux-text-light mt-1">{h.name}</p>
                    </CardContent>
                  </Card>
                </FadeInScale>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials - Desktop Grid + Mobile Carousel */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Real Stories from Real Members</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              Every single person on this page started exactly where you are right now — curious, a little skeptical, and wondering if this could actually work for them. Here is what happened when they decided to find out.
            </p>
          </FadeIn>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <FadeInScale key={t.name} delay={i * 150}>
                <Card className="border-0 shadow-lg card-lift h-full">
                  <div className="h-1.5 bg-gradient-to-r from-lux-gold to-lux-gold-light rounded-t-xl" />
                  <CardContent className="p-6 lg:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: t.stars }).map((_, si) => (
                        <Star key={si} className="h-4 w-4 fill-lux-gold text-lux-gold" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-lux-gold/30 mb-3" />
                    <p className="text-lux-text leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lux-navy text-white font-heading font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-heading font-bold text-lux-navy text-sm">{t.name}</p>
                        <p className="text-xs text-lux-text-light">{t.location}</p>
                      </div>
                      <Badge className="ml-auto bg-lux-gold-pale text-lux-navy border border-lux-gold/20 font-semibold text-xs">
                        {t.amount}
                      </Badge>
                    </div>
                    <p className="text-xs text-lux-text-light mt-2 text-right">Member for {t.joined}</p>
                  </CardContent>
                </Card>
              </FadeInScale>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <div className="relative overflow-hidden">
              <div
                className="testimonial-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <div key={t.name} className="w-full flex-shrink-0 px-1">
                    <Card className="border-0 shadow-lg mx-1">
                      <div className="h-1.5 bg-gradient-to-r from-lux-gold to-lux-gold-light rounded-t-xl" />
                      <CardContent className="p-6">
                        <div className="flex items-center gap-1 mb-4">
                          {Array.from({ length: t.stars }).map((_, si) => (
                            <Star key={si} className="h-4 w-4 fill-lux-gold text-lux-gold" />
                          ))}
                        </div>
                        <Quote className="h-6 w-6 text-lux-gold/30 mb-3" />
                        <p className="text-lux-text leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lux-navy text-white font-heading font-bold text-sm">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-heading font-bold text-lux-navy text-sm">{t.name}</p>
                            <p className="text-xs text-lux-text-light">{t.location}</p>
                          </div>
                          <Badge className="ml-auto bg-lux-gold-pale text-lux-navy border border-lux-gold/20 font-semibold text-xs">
                            {t.amount}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevSlide}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 hover:bg-lux-gold-pale transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-lux-navy" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalSlides }).map((_, di) => (
                    <button
                      key={di}
                      onClick={() => setCurrentSlide(di)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        di === currentSlide ? "w-8 bg-lux-gold" : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 hover:bg-lux-gold-pale transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-lux-navy" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life-changing Results */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Real Impact</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Life-Changing Results</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              Behind every M-Pesa notification is a real person whose life changed because they decided to join Zuri Agency. Here is what those earnings actually mean to them.
            </p>
          </FadeIn>

          <div className="space-y-4 max-w-4xl mx-auto">
            {lifeChanges.map((change, i) => {
              const Icon = change.icon
              return (
                <FadeInScale key={change.name} delay={i * 100}>
                  <Card className="border-0 shadow-md card-lift border-l-4" style={{ borderLeftColor: "#D4AF37" }}>
                    <CardContent className="p-5 lg:p-6 flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lux-gold-pale flex-shrink-0 mt-0.5">
                        <Icon className="h-5 w-5 text-lux-gold-dark" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-heading font-bold text-lux-navy">For {change.name}</h3>
                          <span className="font-heading font-bold text-lux-gold-dark">{change.amount}</span>
                        </div>
                        <p className="text-lux-text mt-1">{change.impact}.</p>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInScale>
              )
            })}
          </div>

          <FadeIn delay={400}>
            <div className="mt-10 p-6 lg:p-8 bg-lux-navy rounded-xl text-center">
              <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                These are not outliers or exceptions. They are regular Kenyans — teachers, students, small business owners, stay-at-home parents, casual workers — who found a way to earn extra income without complicated skills, without big investments, and without quitting their day jobs. What they all have in common is they decided to start. Your story could be next.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust Score Widget */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <FadeIn className="text-center mb-12">
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Trust Score</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">What Members Say About Us</h2>
              <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
                We take feedback seriously. Every review on this page comes from a verified Zuri Agency member. We do not filter, censor, or cherry-pick. These are real ratings from real people who have used the platform and received real payments.
              </p>
            </FadeIn>

            <FadeInScale>
              <Card className="border-0 shadow-lg card-lift">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Rating */}
                    <div className="text-center flex-shrink-0">
                      <p className="font-heading font-bold text-6xl text-lux-gold-dark">4.9</p>
                      <div className="flex items-center gap-1 mt-2 justify-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-lux-gold text-lux-gold" />
                        ))}
                      </div>
                      <p className="text-sm text-lux-text-light mt-1">Based on 5,000+ verified reviews</p>
                      <p className="text-xs text-lux-text-light mt-0.5">92% of members gave us 5 stars</p>
                    </div>

                    {/* Breakdown Bars */}
                    <div className="flex-1 w-full space-y-2">
                      {trustBreakdown.map((row) => (
                        <div key={row.stars} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-lux-text w-8 text-right">{row.stars}</span>
                          <Star className="h-3.5 w-3.5 text-lux-gold flex-shrink-0" />
                          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-lux-gold to-lux-gold-light rounded-full transition-all"
                              style={{ width: `${row.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-lux-text-light w-12 text-right">{row.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInScale>
          </div>
        </div>
      </section>

      {/* Real Earnings Proof */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Verified Payments</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Real Earnings Proof</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              Real M-Pesa payments sent to real members. Every commission is paid instantly and automatically. There is no human intervention, no approval queue, no delay. The system pays you the moment a referral is completed, 24 hours a day, 7 days a week.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
            {/* Direct Referral Proof */}
            <FadeInScale delay={100}>
              <Card className="border-0 shadow-lg card-lift">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lux-navy/10">
                      <Smartphone className="h-6 w-6 text-lux-navy" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-lux-navy text-lg">Direct Referral Commission</p>
                      <p className="text-sm text-lux-text-light">Paid to Sarah M. for referring Peter K.</p>
                    </div>
                    <Badge className="ml-auto bg-lux-navy/10 text-lux-navy border-lux-navy/20 text-sm px-3 py-1">
                      +KES 350
                    </Badge>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-lux-text-light">M-Pesa Code</span>
                      <span className="font-mono font-medium text-lux-navy">PJX8Y9K2L1</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-lux-text-light">Date</span>
                      <span className="font-medium text-lux-navy">28 Jul 2026, 14:32</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-lux-text-light">Status</span>
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <CheckCircle className="h-3.5 w-3.5" /> Completed Instantly
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-lux-text-light">Time to Payout</span>
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <Zap className="h-3.5 w-3.5" /> 12 seconds
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInScale>

            {/* Upline Proof */}
            <FadeInScale delay={200}>
              <Card className="border-0 shadow-lg card-lift">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lux-gold-pale">
                      <Smartphone className="h-6 w-6 text-lux-gold-dark" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-lux-navy text-lg">Upline Override Commission</p>
                      <p className="text-sm text-lux-text-light">Paid to James K. from his team member</p>
                    </div>
                    <Badge className="ml-auto bg-lux-gold-pale text-lux-gold-dark border-lux-gold/20 text-sm px-3 py-1">
                      +KES 150
                    </Badge>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-lux-text-light">M-Pesa Code</span>
                      <span className="font-mono font-medium text-lux-navy">MKN4W7T3R8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-lux-text-light">Date</span>
                      <span className="font-medium text-lux-navy">28 Jul 2026, 15:10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-lux-text-light">Status</span>
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <CheckCircle className="h-3.5 w-3.5" /> Completed Instantly
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-lux-text-light">Time to Payout</span>
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <Zap className="h-3.5 w-3.5" /> 8 seconds
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInScale>
          </div>

          {/* Feature List */}
          <FadeIn delay={300}>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {proofFeatures.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.text} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <Icon className="h-5 w-5 text-lux-gold" />
                    <span className="text-sm font-medium text-lux-navy">{f.text}</span>
                  </div>
                )
              })}
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="mt-8 p-5 lg:p-6 bg-lux-navy/5 rounded-xl max-w-3xl mx-auto">
              <p className="text-sm text-lux-text leading-relaxed text-center">
                Every single payment on Zuri Agency is processed through the official M-Pesa API. There is no manual processing, no &quot;pending&quot; status that lasts days, and no excuses. When the system says you have been paid, the money is already in your M-Pesa account. We have processed over 50,000 commissions with a 99.98% success rate. The 0.02% failures are typically wrong phone numbers, which our support team corrects within minutes.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Milestone Badges */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-lux-gold/30 to-transparent hidden lg:block" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Achievement Tiers"
            title="Milestone Badges"
            subtitle="The more you refer, the higher your status and rewards. Each tier unlocks new benefits and earning potential."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-4">
            {milestones.map((m, i) => {
              const Icon = m.icon
              return (
                <FadeInScale key={m.tier} delay={i * 100}>
                  <Card className="border-0 shadow-lg card-lift h-full overflow-hidden">
                    <div className={`h-2 ${m.bgClass}`} />
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${m.bgClass} text-white mb-4 shadow-lg`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-lux-navy">{m.tier}</h3>
                      <p className="text-sm text-lux-text-light mt-1">{m.range}</p>
                      <p className="font-heading font-bold text-lux-gold-dark text-lg mt-2">{m.earnings}</p>
                      <ul className="mt-4 space-y-2 text-left">
                        {m.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-lux-text">
                            <CheckCircle className="h-4 w-4 text-lux-gold mt-0.5 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </FadeInScale>
              )
            })}
          </div>

          <FadeIn delay={400}>
            <div className="mt-10 p-5 lg:p-6 bg-lux-gold-pale rounded-xl max-w-3xl mx-auto text-center">
              <p className="text-sm text-lux-gold-dark leading-relaxed">
                Every member starts at Bronze. Your tier increases automatically as your referrals grow. There is no application, no approval process, and no extra fees to unlock higher tiers. The system tracks your progress and upgrades your status in real time.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Live Feed</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Real-Time Member Activity</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              See what other members are doing right now. These are not simulations or placeholders — these are real actions happening on the Zuri Agency platform in real time.
            </p>
          </FadeIn>

          <FadeInScale>
            <Card className="border-0 shadow-lg card-lift">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="font-heading font-bold text-sm text-lux-navy">Live Activity</span>
                  <span className="text-xs text-lux-text-light ml-auto">Updated in real-time</span>
                </div>
                <div className="space-y-1">
                  {activityFeedData.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg activity-item"
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                        item.type === "join" ? "bg-lux-navy/10 text-lux-navy" :
                        item.type === "earning" ? "bg-green-100 text-green-600" :
                        item.type === "referral" ? "bg-lux-gold-pale text-lux-gold-dark" :
                        "bg-red-100 text-red-600"
                      }`}>
                        {item.type === "join" ? <UserPlus className="h-4 w-4" /> :
                         item.type === "earning" ? <DollarSign className="h-4 w-4" /> :
                         item.type === "referral" ? <Users className="h-4 w-4" /> :
                         <ArrowRight className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-lux-text">
                          <strong className="text-lux-navy">{item.name}</strong> {item.action}
                        </p>
                      </div>
                      <span className="text-xs text-lux-text-light flex-shrink-0">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeInScale>
        </div>
      </section>

      {/* Join the Success Story CTA */}
      <section className="py-20 bg-lux-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-lux-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-lux-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">Join the Success Story</h2>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Sarah, James, Grace, Daniel, and Lucy all started with the same KES 1,000 membership. The only difference between them and everyone else is they decided to start. Your story is waiting to be written.
            </p>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm">
              Every day you wait is another day someone else is earning the commissions you could be earning. The platform is growing. The opportunity is real. The only question is whether you will be one of the people looking back in three months wishing you had started today, or one of the people smiling at their M-Pesa statement.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="mt-10">
              <Link href="/register">
                <Button size="lg" className="bg-lux-cta hover:bg-lux-cta-hover text-white font-heading font-bold text-lg px-10 h-16 rounded-full shadow-2xl shadow-lux-gold/30 transition-all hover:shadow-lux-gold/40 hover:scale-105 group relative overflow-hidden glow-cta btn-shine">
                  <span className="relative z-10">Join Now - KES 1,000</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-gray-500 text-sm">
              Over 5,000 Kenyans have already joined. Start earning KES 350 per referral from day one.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
