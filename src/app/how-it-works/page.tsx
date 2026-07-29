"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, Share2, DollarSign, Copy, Check, ArrowRight, Eye, ExternalLink, Target, Zap, Phone, BookOpen, Star, Smartphone, MessageCircle, TrendingUp, Heart, Clock, Shield, CheckCircle, ChevronRight, GraduationCap, Briefcase, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn, FadeInScale, SectionHeading } from "@/components/landing/shared"

const steps = [
  {
    num: "1",
    title: "Join",
    desc: "Pay a one-time membership of KES 1,000 to activate your referral link and dashboard.",
    icon: Users,
    detail: "KES 1,000",
  },
  {
    num: "2",
    title: "Share",
    desc: "Share your unique referral link via WhatsApp, social media, SMS, or word of mouth.",
    icon: Share2,
    detail: "Your Link",
  },
  {
    num: "3",
    title: "Earn",
    desc: "Earn KES 350 per direct referral + KES 150 per override from your team's referrals.",
    icon: DollarSign,
    detail: "KES 350+",
  },
]

const tips = [
  {
    icon: Heart,
    title: "Start with Your Warm Market",
    desc: "The easiest money is with people who already know and trust you. Start by sharing your referral link with family members, close friends, former classmates, church members, and work colleagues. These are people who already believe in you, so they are far more likely to join. Make a list of everyone you know \u2014 you will be surprised how long it gets. Studies show that warm referrals convert at 3-5x the rate of cold outreach.",
  },
  {
    icon: MessageCircle,
    title: "Share Your Why",
    desc: "People do not join opportunities \u2014 they join people. When you share your link, explain WHY you joined Aureus Network. Tell them about your goals: maybe you want to pay school fees, cover rent, start a side business, or just have some extra money for emergencies. When people see your genuine reason, they connect emotionally and are much more likely to join. A simple message like \u201cI joined because I need an extra KES 5,000 a month and this works\u201d is more powerful than any sales pitch.",
  },
  {
    icon: Phone,
    title: "Follow Up Personally",
    desc: "Do not just post your link once and hope for the best. Follow up with a personal WhatsApp message or a phone call. A quick \u201cHey, did you see the opportunity I shared? Let me explain how it works\u201d can double your conversion rate. Remember, people are busy and distracted. A gentle, friendly follow-up shows you care and gives them the nudge they need to take action.",
  },
  {
    icon: Users,
    title: "Build a Team, Not Just Referrals",
    desc: "The real power of Aureus Network is in building a team. Your direct referrals earn you KES 350 each, but when those people refer others, you earn KES 150 per override too. That is how KES 1,000 turns into KES 10,000+ per month. Encourage your team members to share their links actively. Help them succeed, and you succeed even more. A rising tide lifts all boats.",
  },
  {
    icon: Zap,
    title: "Be Consistent Every Day",
    desc: "Earning referral income Kenya is not a get-rich-quick scheme \u2014 it is a consistent effort that compounds over time. Spend just 15-30 minutes each day sharing your link, following up with leads, and supporting your team. Consistency beats intensity. Someone who shares their link daily for a month will always outperform someone who shares 50 links in one day and then disappears. Make it a daily habit and watch your M-Pesa commissions grow steadily.",
  },
]

const messages = [
  {
    channel: "WhatsApp",
    text: "Hey! I just joined Aureus Network and I am earning KES 350 for every person I refer. It is super simple \u2014 no products, no selling. Want me to show you how it works?",
  },
  {
    channel: "SMS",
    text: "Earn KES 350 per referral with Aureus Network. Join for KES 1,000 one-time. Get your link here: https://aureusnetwork.co.ke/ref/YOURCODE",
  },
  {
    channel: "Social Media",
    text: "Finally found a legit way to earn money online in Kenya! No scams, no products. Just share your link and earn M-Pesa commissions. Join me on Aureus Network!",
  },
]

export default function HowItWorksPage() {
  const [copied, setCopied] = useState(false)
  const referralLink = "https://aureusnetwork.co.ke/ref/YOURCODE"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement("textarea")
      ta.value = referralLink
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-lux-cream overflow-x-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lux-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lux-navy/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-lux-gold/20 rounded-full animate-pulse-slow" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #0F2847 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      {/* Hero */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Badge className="mb-6 px-4 py-2 bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20 font-medium text-sm inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-lux-gold-dark rounded-full animate-pulse" />
              Simple 3-Step Process
            </Badge>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-lux-navy heading-underline">
              How It Works
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-8 text-lg sm:text-xl text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              Three simple steps to start earning from your network.
            </p>
          </FadeIn>

          <FadeIn delay={250}>
            <p className="mt-4 text-base text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              Most people think making money online is complicated. They imagine you need technical skills, a big following, or lots of capital. The truth is far simpler. Aureus Network has broken down the entire process into three straightforward steps that anyone with a phone and an M-Pesa account can follow. There is no learning curve, no confusing dashboard, and no expensive courses to buy. Whether you are a student in a hostel, a mum at home, a boda boda rider between trips, or a professional in the office \u2014 you can start earning referral income Kenya within minutes of joining. We have simplified everything so that your focus stays on what matters most: sharing the opportunity and watching your M-Pesa commissions grow.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-24 relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div className="absolute inset-0 step-connector-animated opacity-40" />
          </div>

          <div className="space-y-12 lg:space-y-24 relative">
            {/* Step 1: Join */}
            <FadeInScale delay={0}>
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-lux-navy flex items-center justify-center shadow-xl shadow-lux-navy/20 pulse-ring z-10 relative">
                    <span className="font-heading font-bold text-3xl lg:text-4xl text-white">1</span>
                  </div>
                </div>
                <Card className="flex-1 w-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 card-lift lg:text-left">
                  <div className="h-1.5 bg-gradient-to-r from-lux-gold to-lux-gold-light rounded-t-xl" />
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Users className="h-6 w-6 text-lux-gold" />
                      <h3 className="font-heading font-bold text-2xl text-lux-navy">Step 1: Join Aureus Network</h3>
                    </div>
                    <p className="text-lux-text-light leading-relaxed mb-3">
                      Your journey starts with a simple, one-time payment of <strong className="text-lux-gold-dark">KES 1,000</strong>. Think of it not as a cost, but as an investment that pays for itself almost immediately \u2014 after just 3 referrals, you have already earned back your KES 1,000 and are KES 50 in profit. Everything after that is pure income flowing straight to your M-Pesa.
                    </p>
                    <p className="text-lux-text-light leading-relaxed mb-4">
                      Once you join, you get immediate access to your personal member dashboard where you will find your unique referral link, real-time earnings tracker, training materials, and a vibrant community of thousands of fellow Kenyans all earning referral income Kenya together. You also get access to ready-made WhatsApp and social media templates that make sharing your link as easy as copy-paste. The entire process takes less than 5 minutes from payment to having your link ready to share.
                    </p>
                    <Badge className="bg-lux-gold-pale text-lux-navy border border-lux-gold/20 font-semibold text-sm px-4 py-1.5">
                      KES 1,000 one-time
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </FadeInScale>

            {/* Step 2: Share */}
            <FadeInScale delay={150}>
              <div className="flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-12">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-lux-navy flex items-center justify-center shadow-xl shadow-lux-navy/20 pulse-ring z-10 relative">
                    <span className="font-heading font-bold text-3xl lg:text-4xl text-white">2</span>
                  </div>
                </div>
                <Card className="flex-1 w-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 card-lift lg:text-right">
                  <div className="h-1.5 bg-gradient-to-r from-lux-gold to-lux-gold-light rounded-t-xl" />
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-4 mb-4 lg:flex-row-reverse">
                      <Share2 className="h-6 w-6 text-lux-gold" />
                      <h3 className="font-heading font-bold text-2xl text-lux-navy">Step 2: Share Your Link</h3>
                    </div>
                    <p className="text-lux-text-light leading-relaxed mb-3 lg:text-right">
                      Your network is bigger than you think. Family members, friends, former classmates, church members, WhatsApp groups you are already in, social media followers, work colleagues, neighbours, gym buddies \u2014 these are all people who could benefit from earning extra income. Your unique referral link is your key to earning M-Pesa commissions from every single person who joins through you.
                    </p>
                    <p className="text-lux-text-light leading-relaxed mb-4 lg:text-right">
                      Do not overthink it. Send a friendly WhatsApp message, post your link on your status, share it in relevant Facebook and Telegram groups, or simply tell people about it when you meet them. We even provide ready-made message templates you can copy and paste. The goal is simple: get your link in front of as many people as possible. Every share is a potential KES 350 in your pocket.
                    </p>
                    <Badge className="bg-lux-gold-pale text-lux-navy border border-lux-gold/20 font-semibold text-sm px-4 py-1.5">
                      Your Unique Link
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </FadeInScale>

            {/* Sample Messages */}
            <FadeIn>
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-lux-gold/10">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="h-6 w-6 text-lux-gold-dark" />
                  <h3 className="font-heading font-bold text-xl text-lux-navy">Copy-Paste Messages to Share Today</h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {messages.map((msg, i) => (
                    <div key={i} className="bg-lux-cream rounded-xl p-4 border border-lux-gold/10">
                      <Badge className="mb-3 bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20 text-xs">{msg.channel}</Badge>
                      <p className="text-sm text-lux-text leading-relaxed">&ldquo;{msg.text}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Step 3: Earn */}
            <FadeInScale delay={300}>
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-lux-navy flex items-center justify-center shadow-xl shadow-lux-navy/20 pulse-ring z-10 relative">
                    <span className="font-heading font-bold text-3xl lg:text-4xl text-white">3</span>
                  </div>
                </div>
                <Card className="flex-1 w-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 card-lift lg:text-left">
                  <div className="h-1.5 bg-gradient-to-r from-lux-gold to-lux-gold-light rounded-t-xl" />
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <DollarSign className="h-6 w-6 text-lux-gold" />
                      <h3 className="font-heading font-bold text-2xl text-lux-navy">Step 3: Earn M-Pesa Commissions</h3>
                    </div>
                    <p className="text-lux-text-light leading-relaxed mb-3">
                      This is where the magic happens. Every time someone joins Aureus Network using your referral link, you earn <strong className="text-lux-gold-dark">KES 350</strong> directly to your M-Pesa account. But that is just the beginning. You also earn <strong className="text-lux-gold-dark">KES 150</strong> for every person referred by someone on your team \u2014 these are called override commissions.
                    </p>
                    <p className="text-lux-text-light leading-relaxed mb-4">
                      Here is how the compounding effect works in real life: Refer 10 people directly and earn <strong className="text-lux-gold-dark">KES 3,500</strong>. If each of those 10 people refers just 5 people each, that is 50 people in your extended network, earning you KES 150 each in override commissions \u2014 that is <strong className="text-lux-gold-dark">KES 7,500</strong> more. Your total is now <strong className="text-lux-gold-dark">KES 11,000</strong> from just 10 direct referrals. This is the power of team building. Your income grows exponentially as your network grows, creating true passive income Kenya that keeps paying you month after month.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-lux-gold-pale text-lux-navy border border-lux-gold/20 font-semibold text-sm px-4 py-1.5">
                        KES 350 direct
                      </Badge>
                      <Badge className="bg-lux-gold-pale text-lux-navy border border-lux-gold/20 font-semibold text-sm px-4 py-1.5">
                        KES 150 override
                      </Badge>
                      <Badge className="bg-lux-gold-pale text-lux-navy border border-lux-gold/20 font-semibold text-sm px-4 py-1.5">
                        Instant M-Pesa
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeInScale>
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Who Can Join</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Anyone With a Phone Can Earn</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              Aureus Network is built for every Kenyan. There are no barriers, no restrictions, and no special requirements.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="space-y-5 text-lux-text leading-relaxed">
                <p>
                  <strong className="text-lux-gold-dark">Students</strong> looking to earn pocket money without affecting their studies? Yes. <strong className="text-lux-gold-dark">Parents</strong> who need extra income while taking care of the family? Yes. <strong className="text-lux-gold-dark">Professionals</strong> who want a side hustle that does not conflict with their 9-to-5? Yes. <strong className="text-lux-gold-dark">Business owners</strong> who want to diversify their income streams? Yes. <strong className="text-lux-gold-dark">Retirees</strong> who need a simple way to supplement their pension? Absolutely yes.
                </p>
                <p>
                  Aureus Network is open to <strong className="text-lux-gold-dark">anyone aged 18 and above</strong> with a phone and an M-Pesa account. That is literally all you need. There are no education requirements, no previous experience needed, no interview process, and no approval waiting period. If you can send a WhatsApp message, you can earn referral income Kenya. If you can share a link, you can make money online Kenya. The platform was deliberately designed to be accessible to every Kenyan, regardless of their background, education level, or current employment status.
                </p>
                <p>
                  Whether you are a university student in Nairobi looking for a work from home Kenya opportunity between lectures, a mother in Kisumu who wants to contribute to household expenses while caring for her children, a boda boda rider in Mombasa looking for extra income during slow hours, or a salaried professional in Nakuru wanting to build a passive income Kenya stream \u2014 Aureus Network welcomes you. The only requirement is that you are ready to take action and share the opportunity with others.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Badge className="bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">No degree needed</Badge>
                  <Badge className="bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">No experience needed</Badge>
                  <Badge className="bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">No interview needed</Badge>
                  <Badge className="bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">No monthly fees</Badge>
                  <Badge className="bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Any phone works</Badge>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="bg-lux-navy rounded-2xl p-8 text-white">
                <h3 className="font-heading font-bold text-2xl mb-6 text-lux-gold">Who Thrives on Aureus Network?</h3>
                <div className="space-y-4">
                  {[
                    { icon: GraduationCap, label: "Students", desc: "Earn while you learn. No class conflicts." },
                    { icon: Briefcase, label: "Professionals", desc: "Build a second income without leaving your job." },
                    { icon: Heart, label: "Parents", desc: "Work from home on your own schedule." },
                    { icon: Store, label: "Entrepreneurs", desc: "Diversify your income streams easily." },
                    { icon: Users, label: "Retirees", desc: "Supplement your pension with minimal effort." },
                    { icon: Zap, label: "Anyone Motivated", desc: "If you want extra income, this is for you." },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lux-gold/20">
                        <item.icon className="h-5 w-5 text-lux-gold" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{item.label}</p>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Tips for Success */}
      <section className="py-20 lg:py-28 bg-lux-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Pro Tips</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Tips for Success</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              Follow these proven strategies to maximize your referral income Kenya and build a sustainable stream of M-Pesa commissions.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {tips.map((tip, i) => {
              const TipIcon = tip.icon
              return (
                <FadeIn key={tip.title} delay={i * 100}>
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full card-lift">
                    <div className="h-1.5 bg-gradient-to-r from-lux-gold to-lux-gold-light rounded-t-xl" />
                    <CardContent className="p-6 lg:p-8">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lux-gold-pale text-lux-gold-dark mb-4">
                        <TipIcon className="h-6 w-6" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-lux-navy mb-2">{tip.title}</h3>
                      <p className="text-sm text-lux-text-light leading-relaxed">{tip.desc}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Referral Link Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Your Unique Link</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Your Referral Link</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              After joining, you will get a unique referral link like this one to share everywhere. Every person who clicks and joins earns you KES 350 instantly.
            </p>
          </FadeIn>

          <FadeInScale delay={200}>
            <Card className="max-w-2xl mx-auto border-0 shadow-lg card-lift bg-gradient-to-br from-lux-navy to-lux-navy-dark">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lux-gold/20 flex-shrink-0">
                    <ExternalLink className="h-5 w-5 text-lux-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-white mb-2">Your Referral Link</p>
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 border border-white/10">
                      <code className="flex-1 text-sm text-lux-gold-light font-mono truncate">{referralLink}</code>
                      <button
                        onClick={handleCopy}
                        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-lux-gold hover:bg-lux-gold-dark text-lux-navy text-xs font-semibold transition-all"
                      >
                        {copied ? (
                          <><Check className="h-3.5 w-3.5" /> Copied</>
                        ) : (
                          <><Copy className="h-3.5 w-3.5" /> Copy</>
                        )}
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                      <Eye className="h-4 w-4" />
                      <span><strong className="text-lux-gold">127</strong> views today</span>
                      <span className="mx-2">·</span>
                      <span><strong className="text-lux-gold">12</strong> clicks</span>
                      <span className="mx-2">·</span>
                      <span><strong className="text-lux-gold">KES 4,200</strong> earned this week</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInScale>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-lux-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-lux-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-lux-gold/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lux-gold/3 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <Badge className="mb-6 px-4 py-2 bg-lux-gold/20 text-lux-gold-light border border-lux-gold/30 font-medium text-sm inline-flex items-center gap-2">
              Start Today
            </Badge>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              You Are Just Three Steps Away From Financial Freedom!
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join, share, and earn. It really is that simple. Thousands of Kenyans are already earning consistent M-Pesa commissions every single day using this exact three-step system. Your KES 1,000 one-time investment is the only barrier between you and a lifetime of referral income Kenya. Do not let another day pass wishing for extra income \u2014 take action now and start building your financial future today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-lux-gold" /> Step 1: Join for KES 1,000</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-lux-gold" /> Step 2: Share your link</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-lux-gold" /> Step 3: Earn KES 350 each</span>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="mt-10">
              <Link href="/register">
                <Button size="lg" className="bg-lux-cta hover:bg-lux-cta-hover text-white font-heading font-bold text-lg px-10 h-16 rounded-full shadow-2xl shadow-lux-gold/30 transition-all hover:shadow-lux-gold/40 hover:scale-105 group relative overflow-hidden glow-cta btn-shine">
                  <span className="relative z-10">Start Earning Now - KES 1,000</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
