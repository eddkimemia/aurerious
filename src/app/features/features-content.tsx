"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Gift, Zap, Link2, Users, DollarSign, Lock, Globe, Headphones,
  Check, Copy, Send, Share2, ArrowRight, CheckCircle2, X, Minus,
  ShoppingBag, TrendingUp, Briefcase, HelpCircle, ListChecks, Star,
  Shield, BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn, FadeInScale, WhatsAppIcon } from "@/components/landing/shared"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Gift,
    title: "KES 500 Bonus Instantly",
    short: "Get KES 500 back the second you pay KES 1,000 — 50% instant return",
    long: "No other platform pays you to join. We do. Pay KES 1,000, get KES 500 bonus instantly credited. You’re already halfway to profit before you even share your link. Refer 3 people (KES 1,050) and you’re KES 550 profit. That’s not a promise — that’s math. And it’s why 5,000+ Kenyans chose us over every other hustle.",
  },
  {
    icon: Zap,
    title: "Instant Payments",
    short: "Get paid directly to M-Pesa as soon as someone joins",
    long: "The moment your referral completes their KES 1,000 membership, your KES 350 commission hits your M-Pesa. No waiting for approvals, no monthly payout cycles, no minimum thresholds. You earn in real time. If you refer someone at 2 PM, you have the money in your pocket before 2:05 PM. That is the kind of immediacy that makes a real difference when you need income fast.",
  },
  {
    icon: Link2,
    title: "Your Referral Link",
    short: "Get a unique link to share anywhere — WhatsApp, SMS, social",
    long: "Your personal referral link is your digital earning tool. Share it on WhatsApp groups, Facebook, Instagram, TikTok, Twitter, SMS, or even print it on a business card. The link tracks every person who joins through you, so you never miss a commission. No technical skills needed. If you can copy and paste, you can earn.",
  },
  {
    icon: Users,
    title: "Team Override Bonus",
    short: "Earn KES 150 override from your referrals' referrals",
    long: "When someone you refer goes on to refer another person, you earn KES 150 on top of their KES 350. This means your income compounds as your team grows. Imagine referring just 5 people who each refer 5 more. That is 5 direct commissions (KES 1,750) plus 25 override commissions (KES 3,750) = KES 5,500 total. Your network works for you even when you are sleeping.",
  },
  {
    icon: DollarSign,
    title: "Low One-Time Entry",
    short: "Only KES 1,000 one-time to start earning forever",
    long: "Compare KES 1,000 to the cost of starting a business — a shop needs rent and stock, a salon needs equipment, even a phone repair business needs tools. KES 1,000 is less than what many Kenyans spend on airtime in a month. And it is a one-time payment. No monthly subscriptions, no recurring deductions. Pay once, earn forever.",
  },
  {
    icon: Lock,
    title: "No Monthly Fees",
    short: "Pay once, earn forever — no recurring charges",
    long: "This is one of the biggest concerns people have. Many platforms lure you in with a low joining fee then hit you with monthly charges. Not Zuri Agency. Your KES 1,000 covers you for life. You can refer one person today, take a break for six months, come back, and refer someone else. No penalties, no reactivation fees, no expiry.",
  },
  {
    icon: Globe,
    title: "100% Kenyan",
    short: "Built for Kenyans, by Kenyans, with M-Pesa integration",
    long: "We understand the Kenyan market because we live in it. M-Pesa is not an afterthought — it is the backbone of our payment system. Our support team speaks your language. Our platform works on smartphones and basic phones alike. We are registered in Kenya and compliant with local regulations. You are not sending your money to some foreign company.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    short: "Reach us anytime via WhatsApp, email, or phone",
    long: "Whether you are stuck on registration, wondering why your commission has not arrived, or just need guidance on how to refer more people, we are here. Our WhatsApp support typically responds within minutes during business hours. Email inquiries get answered within 24 hours. You are never alone in this journey.",
  },
]

const comparisonData = [
  { aspect: "Monthly Fees", aureus: "None", networkMarketing: "Yes, monthly", freelance: "Platform fees", employment: "None" },
  { aspect: "Products to Sell", aureus: "None", networkMarketing: "Yes, inventory", freelance: "Your services", employment: "None" },
  { aspect: "Income Cap", aureus: "Unlimited", networkMarketing: "Tier-based", freelance: "Your capacity", employment: "Fixed salary" },
  { aspect: "Startup Cost", aureus: "KES 1,000", networkMarketing: "KES 5,000+", freelance: "Equipment + skills", employment: "None (time)" },
  { aspect: "Payment Speed", aureus: "Instant", networkMarketing: "Weekly/monthly", freelance: "Per project", employment: "Monthly" },
  { aspect: "Work Location", aureus: "Anywhere", networkMarketing: "Anywhere", freelance: "Anywhere", employment: "Office" },
  { aspect: "Flexible Hours", aureus: "Yes", networkMarketing: "Yes", freelance: "Yes", employment: "No" },
  { aspect: "M-Pesa Payouts", aureus: "Yes", networkMarketing: "Varies", freelance: "Varies", employment: "Bank account" },
]

const concerns = [
  {
    q: "Is this really free after the joining fee?",
    a: "Yes, absolutely. That is the whole point. KES 1,000 is your one and only payment. There are no monthly fees, no annual subscriptions, no maintenance charges, no hidden deductions. You could refer 100 people over the next five years and never pay another shilling. Many people do not believe this at first because they have been burned by other platforms, but we operate on transparency. If we charged monthly fees, we would tell you upfront. We do not, because we believe your earnings should be yours to keep.",
  },
  {
    q: "Do I need followers or influence to earn?",
    a: "Not at all. You do not need to be an influencer, a celebrity, or even active on social media. Some of our highest earners are everyday Kenyans — teachers, boda boda riders, salon operators, stay-at-home parents — who simply share their link with people they already know. Your personal network is more valuable than you think. Think about everyone you interact with: family members, friends, neighbours, church members, former classmates. Every single one of them is a potential referral. You do not need thousands of followers; you just need to start with the people who already trust you.",
  },
  {
    q: "Is it too late to join?",
    a: "No, and here is why: Kenya is still in the early adoption phase of referral-based income platforms. While a few thousand people have joined, millions of Kenyans have not even heard of this opportunity yet. The market is wide open. Those who join now have the advantage of building their network early, before the concept becomes mainstream. Think of it like M-Pesa in its early days — those who signed up early and referred others built something lasting. The same principle applies here. The best time to join was yesterday. The second best time is now.",
  },
  {
    q: "What if I am not good at convincing people?",
    a: "You do not need to convince anyone. You simply share your link and let the platform speak for itself. Most people who join do so because they see others earning, not because of aggressive sales tactics. We provide you with ready-made messages, images, and resources that you can share directly. You do not need to be a salesperson. You just need to be willing to share an opportunity with people who might benefit from it. The rest takes care of itself.",
  },
]

const sharingChannels = [
  { icon: WhatsAppIcon, name: "WhatsApp", desc: "Share in groups, status, or direct messages. Highest conversion rate.", color: "#25D366", tip: "Share with a personal message for 3x better results" },
  { icon: Send, name: "SMS", desc: "Send your link via SMS to contacts. Simple and effective.", color: "#0F2847", tip: "Best for warm contacts who trust you" },
  { icon: Share2, name: "Social Media", desc: "Post on Facebook, Twitter, Instagram, TikTok with your link.", color: "#D4AF37", tip: "Use trending hashtags like #SideHustleKE" },
  { icon: Link2, name: "Direct Link", desc: "Copy your unique referral link and share it anywhere.", color: "#1A3660", tip: "Customize your message for each platform" },
]

const checklist = [
  { step: 1, title: "Register & Pay", desc: "Complete your KES 1,000 one-time membership via M-Pesa. The process takes less than 5 minutes." },
  { step: 2, title: "Get Your Link", desc: "Your unique referral link is generated instantly. Copy it and save it somewhere handy." },
  { step: 3, title: "Share With 5 People", desc: "Start with 5 people you know personally. Family, friends, colleagues. Share your link with a simple message." },
  { step: 4, title: "Earn Instantly", desc: "When someone joins through your link, KES 350 hits your M-Pesa immediately. Watch your income grow." },
  { step: 5, title: "Build & Repeat", desc: "Encourage your referrals to share their own links. Earn KES 150 override on every person they refer." },
]

const referralLink = "https://zuriagency.co.ke/ref/YOURNAME123"

export default function FeaturesPageContent() {
  const [copied, setCopied] = useState(false)

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
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lux-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lux-navy/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #0F2847 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-lux-gold to-lux-gold-light text-white border-0 font-bold shadow-md">
              🎁 KES 500 Bonus Instantly • 50% Payout • No Monthly Fees
            </Badge>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-lux-navy leading-tight">
              Features That <span className="text-gradient">Pay You, Not Us.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg sm:text-xl text-lux-navy max-w-3xl mx-auto leading-relaxed font-semibold">
              Pay <strong>KES 1,000 once</strong> → Get <span className="bg-lux-gold text-white px-2 py-1 rounded-full text-sm">KES 500 Bonus Instantly</span> + <strong>KES 350</strong> per referral + <strong>KES 150</strong> team override forever. No products. No monthly fees. Just the highest payout in Kenya.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="mt-4 text-base text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              While others charge monthly, sell you stock, or pay 20%, we pay <strong className="text-lux-gold-dark">50% back to you</strong>. 5,000+ Kenyans, 2M+ paid, Paystack & M-Pesa instant. Built by Kenyans, for Kenyans — and it shows in your M-Pesa.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <FadeInScale key={feature.title} delay={i * 60}>
                <Card className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full card-lift overflow-hidden relative">
                  <div className="h-1 bg-gradient-to-r from-lux-gold to-lux-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 lg:p-8">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-lux-gold-pale text-lux-gold-dark mb-5 group-hover:bg-lux-gold group-hover:text-white transition-all duration-300">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-lux-navy mb-2">{feature.title}</h3>
                    <p className="text-lux-text-light leading-relaxed mb-3">{feature.short}</p>
                    <div className="border-t border-lux-gold/10 pt-3 mt-3">
                      <p className="text-sm text-lux-text leading-relaxed">{feature.long}</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeInScale>
            ))}
          </div>
        </div>
      </section>

      {/* How It Compares */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">
              Side by Side
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">
              How It Compares
            </h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              See how Zuri Agency stacks up against traditional income options. The difference is clear.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="overflow-x-auto rounded-2xl shadow-lg border border-lux-gold/10">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-lux-navy text-white">
                    <th className="px-6 py-4 font-heading font-bold text-sm sm:text-base">Feature</th>
                    <th className="px-6 py-4 font-heading font-bold text-sm sm:text-base text-lux-gold">Zuri Agency</th>
                    <th className="px-6 py-4 font-heading font-bold text-sm sm:text-base text-gray-400">Network Marketing</th>
                    <th className="px-6 py-4 font-heading font-bold text-sm sm:text-base text-gray-400">Freelance</th>
                    <th className="px-6 py-4 font-heading font-bold text-sm sm:text-base text-gray-400">Employment</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={row.aspect} className={cn("border-t border-gray-100", i % 2 === 0 ? "bg-white" : "bg-lux-cream")}>
                      <td className="px-6 py-4 font-medium text-lux-navy text-sm sm:text-base">{row.aspect}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-green-600">
                          <Check className="h-4 w-4" /> {row.aureus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm sm:text-base text-lux-text-light">
                        {row.networkMarketing === "None" ? (
                          <span className="inline-flex items-center gap-1.5 text-green-600"><Check className="h-4 w-4" /> None</span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-red-500"><X className="h-4 w-4" /> {row.networkMarketing}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm sm:text-base text-lux-text-light">
                        {row.freelance === "None" ? (
                          <span className="inline-flex items-center gap-1.5 text-green-600"><Check className="h-4 w-4" /> None</span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-red-500"><X className="h-4 w-4" /> {row.freelance}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm sm:text-base text-lux-text-light">
                        {row.employment === "None" ? (
                          <span className="inline-flex items-center gap-1.5 text-green-600"><Check className="h-4 w-4" /> None</span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-amber-500"><Minus className="h-4 w-4" /> {row.employment}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-8 text-center text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              The verdict is clear. Zuri Agency offers the lowest barrier to entry, the fastest payments, the most flexibility, and no ongoing costs. Whether you compare it to network marketing, freelancing, or traditional employment, the advantages are undeniable. You are not just choosing a platform — you are choosing a better way to earn.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Common Concerns */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">
              We Know What You Are Thinking
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">
              Common Concerns Addressed
            </h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              We hear these questions every single day. Here is the honest truth behind each one.
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-6">
            {concerns.map((item, i) => (
              <FadeInScale key={item.q} delay={i * 80}>
                <Card className="border border-lux-gold/10 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lux-gold-pale text-lux-gold-dark">
                        <HelpCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-lux-navy mb-3">{item.q}</h3>
                        <p className="text-lux-text leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInScale>
            ))}
          </div>
        </div>
      </section>

      {/* Maximize Your Referrals */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">
              Share & Earn
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">
              Maximize Your Referrals
            </h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              Your unique referral link is your key to earning. Share it everywhere. The more people see it, the more you earn.
            </p>
          </FadeIn>

          {/* Referral Link Preview */}
          <FadeIn>
            <div className="max-w-2xl mx-auto mb-16">
              <div className="glass rounded-2xl p-6 shadow-lg border border-lux-gold/10">
                <label className="block text-sm font-medium text-lux-navy mb-2">Your Referral Link</label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center px-4 py-3 rounded-xl bg-lux-cream border border-lux-gold/20 text-lux-text font-mono text-sm truncate">
                    {referralLink}
                  </div>
                  <Button onClick={handleCopy} className={cn(
                    "h-12 px-5 rounded-xl font-medium transition-all flex-shrink-0",
                    copied
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-lux-gold hover:bg-lux-gold-dark text-white"
                  )}>
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
                {copied && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Copied to clipboard!
                  </p>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Sharing Channels */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {sharingChannels.map((channel, i) => (
              <FadeInScale key={channel.name} delay={i * 80}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full card-lift overflow-hidden">
                  <CardContent className="p-6 lg:p-8 text-center">
                    <div
                      className="inline-flex h-14 w-14 items-center justify-center rounded-full mb-5 mx-auto"
                      style={{ backgroundColor: `${channel.color}15`, color: channel.color }}
                    >
                      <channel.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-lux-navy mb-2">{channel.name}</h3>
                    <p className="text-lux-text-light leading-relaxed mb-4">{channel.desc}</p>
                    <div className="bg-lux-gold-pale rounded-xl p-3 text-sm text-lux-gold-dark">
                      <span className="font-semibold">Pro Tip: </span>
                      {channel.tip}
                    </div>
                  </CardContent>
                </Card>
              </FadeInScale>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Checklist */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">
              Your Roadmap
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">
              Getting Started Checklist
            </h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              Follow these five simple steps and you will be earning in no time. Most people complete everything in under 30 minutes.
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-6">
            {checklist.map((item, i) => (
              <FadeInScale key={item.step} delay={i * 80}>
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lux-gold text-white font-heading font-bold text-lg shadow-lg shadow-lux-gold/30">
                    {item.step}
                  </div>
                  <Card className="flex-1 border border-lux-gold/10 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-5 lg:p-6">
                      <h3 className="font-heading font-bold text-lg text-lux-navy mb-1">{item.title}</h3>
                      <p className="text-lux-text-light leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              </FadeInScale>
            ))}
          </div>

          <FadeIn delay={400}>
            <p className="mt-10 text-center text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              That is it. No complicated training modules, no waiting periods, no approvals. Most of our members go from registration to their first commission in under an hour. The only thing standing between you and your first KES 350 is taking the first step.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-lux-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-lux-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-lux-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <Badge className="mb-6 px-4 py-2 bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20 font-medium text-sm inline-flex items-center gap-2">
              <Star className="h-4 w-4" /> Start Your Journey Today
            </Badge>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              You Have Seen the Features. Now See the Results.
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Thousands of Kenyans have already discovered how simple earning referral income can be. No products, no monthly fees, no complicated systems. Just a straightforward opportunity that works. The only question left is: will you be one of them?
            </p>
            <p className="mt-4 text-base text-gray-400 max-w-xl mx-auto">
              KES 1,000 is all it takes to unlock lifetime earning potential. That is less than the cost of a monthly data bundle, and it pays for itself with your very first referral.
            </p>
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
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-heading font-semibold text-lg px-10 h-16 rounded-full transition-all hover:border-white/50">
                  See How It Works
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
