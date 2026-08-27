"use client"

import { useState } from "react"
import Link from "next/link"
import { DollarSign, TrendingUp, Users, ArrowRight, CheckCircle, XCircle, Clock, Zap, Shield, Headphones, Lock, HelpCircle, BarChart3, Target, Sparkles, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { FadeIn, FadeInScale, SectionHeading } from "@/components/landing/shared"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

const breakdownData = [
  { name: "Direct Referral Commission (35%)", value: 350, color: "#0F2847", label: "KES 350" },
  { name: "Upline Override Commission (15%)", value: 150, color: "#D4AF37", label: "KES 150" },
]

const earningRoles = [
  { title: "Direct Referrer", amount: "KES 350", desc: "You earn 35% commission on every person you directly refer to Zuri Agency. When you share your referral link and someone joins using it, KES 350 is instantly paid to your M-Pesa account. No delays, no minimum thresholds, no hidden conditions.", color: "text-lux-navy", bg: "bg-lux-navy/10", icon: Users },
  { title: "Upline", amount: "KES 150", desc: "You earn 15% override commission on every referral made by someone in your team. If you refer Grace, and Grace refers Peter, you earn KES 150 from Peter's membership too. This is how passive, recurring income is built over time.", color: "text-lux-gold-dark", bg: "bg-lux-gold-pale", icon: TrendingUp },
]

const quickRefData = [
  { referrals: 1, direct: "KES 350", upline: "KES 0", total: "KES 350" },
  { referrals: 5, direct: "KES 1,750", upline: "KES 750", total: "KES 2,500" },
  { referrals: 10, direct: "KES 3,500", upline: "KES 1,500", total: "KES 5,000" },
  { referrals: 20, direct: "KES 7,000", upline: "KES 3,000", total: "KES 10,000" },
  { referrals: 50, direct: "KES 17,500", upline: "KES 7,500", total: "KES 25,000" },
]

const comparisonRows = [
  { label: "Startup Cost", zuri: "KES 1,000 (one-time)", side: "KES 2,000 - 10,000", emp: "KES 0 (time)" },
  { label: "Income Potential", zuri: "Unlimited (no cap)", side: "Limited by product", emp: "Fixed salary" },
  { label: "Time Commitment", zuri: "Flexible (few hrs/wk)", side: "Hours per day", emp: "40+ hrs/week" },
  { label: "Risk Level", zuri: "Low (one-time fee)", side: "Medium (stock/invest)", emp: "Low (stable)" },
  { label: "Earning Potential", zuri: "KES 350 - 70,000+/mo", side: "KES 500 - 30,000/mo", emp: "KES 15,000 - 100,000/mo" },
  { label: "Flexibility", zuri: "100% remote & mobile", side: "Varies", emp: "On-site" },
  { label: "Payment Speed", zuri: "Instant M-Pesa", side: "Weekly/monthly", emp: "Monthly" },
  { label: "Skills Required", zuri: "None (just sharing)", side: "Sales/marketing", emp: "Qualifications" },
  { label: "Growth Potential", zuri: "Exponential (team builds)", side: "Linear (your effort)", emp: "Promotion-based" },
  { label: "Passive Income", zuri: "Yes (upline override)", side: "Rarely", emp: "No" },
]

const faqData = [
  {
    q: "When do I get paid?",
    a: "Instantly. The moment someone uses your referral link to join Zuri Agency, KES 350 is sent directly to your registered M-Pesa number. There is no waiting period, no monthly payout cycle, and no minimum balance requirement. Your upline commission of KES 150 is also triggered instantly. Both payments happen simultaneously within seconds of the new member completing their registration. This instant payout model is one of the reasons our members trust Zuri Agency — you see the results of your effort immediately, not at the end of the month.",
  },
  {
    q: "Is there a limit to how much I can earn?",
    a: "There is absolutely no earning cap at Zuri Agency. You can earn KES 350 per direct referral and KES 150 per team referral, and there is no upper limit on how many people you can refer or how many team members you can have. Some of our top earners are making over KES 70,000 per month because their teams continue to grow and generate override commissions even while they sleep. Whether you refer 5 people or 5,000 people, the commission structure remains the same. Your earning potential is directly tied to your effort and your team's growth — nothing else.",
  },
  {
    q: "Can my earnings grow over time without referring more people myself?",
    a: "Yes, and this is where the real power of the Zuri Agency model reveals itself. Once you refer someone, they become part of your team. When they refer others, you earn KES 150 per referral without doing any additional work. This creates a passive income stream that grows as your team expands. For example, if you refer 10 people, and each of them refers just 5 people, you earn KES 350 x 10 = KES 3,500 from your direct referrals plus KES 150 x 50 = KES 7,500 from your team referrals, totalling KES 11,000. Your earnings compound as your team builds their own teams.",
  },
  {
    q: "How do I withdraw my earnings?",
    a: "Withdrawals are fully automatic. Every commission you earn is sent directly to your M-Pesa account the moment the referral is completed. There is no separate withdrawal step, no request form, no minimum payout threshold, and no processing delay. The money simply arrives as an M-Pesa notification on your phone. This seamless payout system means you never have to worry about forgotten withdrawals or lost earnings. Your M-Pesa statement becomes your earnings record, and every transaction is traceable and verifiable.",
  },
]

const earningsTiers = [
  { name: "Part-Time", referrals: "5 - 10/mo", monthly: "KES 1,750 - KES 3,500", annual: "KES 21,000 - KES 42,000", desc: "Perfect for students, employees, or anyone looking to supplement their income. Share your link with friends and family during your free time. Just 5-10 referrals per month can cover your daily transport, lunch, or even your rent in some areas.", icon: Clock, color: "from-blue-400 to-blue-600" },
  { name: "Full-Time", referrals: "20 - 50/mo", monthly: "KES 7,000 - KES 17,500", annual: "KES 84,000 - KES 210,000", desc: "Treat Zuri Agency like a part-time job and watch your earnings rival traditional employment. At this level, you are actively sharing your link on social media, WhatsApp groups, and within your community. Many of our full-time earners have replaced their day jobs.", icon: Target, color: "from-lux-gold to-lux-gold-dark" },
  { name: "Team Leader", referrals: "50+/mo", monthly: "KES 17,500+", annual: "KES 210,000+", desc: "At this tier, your team is generating substantial override commissions. Your focus shifts from individual referrals to team building, training, and leadership. Your monthly earnings can easily exceed KES 70,000 when your team scales. This is where Zuri Agency becomes life-changing income.", icon: BarChart3, color: "from-lux-navy to-blue-800" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg p-3 shadow-xl border border-lux-gold/20">
        <p className="font-heading font-bold text-sm text-lux-navy">{payload[0].name}</p>
        <p className="text-lg font-bold text-lux-gold-dark">{payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export default function EarningsPage() {
  const [directReferrals, setDirectReferrals] = useState(10)
  const [uplineReferrals, setUplineReferrals] = useState(5)

  const directEarnings = directReferrals * 350
  const uplineEarnings = uplineReferrals * 150
  const totalMonthly = directEarnings + uplineEarnings
  const annualProjection = totalMonthly * 12

  return (
    <div className="min-h-screen bg-lux-cream overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lux-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lux-navy/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #0F2847 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      {/* Hero */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            badge="Transparent Earnings"
            title="Your Earning Structure"
            subtitle="Every KES 1,000 membership is distributed fairly. Here is exactly how it breaks down and how you benefit."
          />
          <FadeIn delay={200}>
            <p className="mt-8 text-lg text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              At Zuri Agency, we believe in radical transparency. Unlike other platforms that hide their commission structures in fine print, we show you exactly where every single shilling goes. When someone pays KES 1,000 to join, KES 500 is yours to earn — that is a 50% payout ratio, among the highest in the referral industry worldwide. KES 350 goes directly to you as the person who referred them, and KES 150 goes to the person who referred you. The remaining KES 500 covers platform operations, M-Pesa transaction fees, customer support, and continuous development. No hidden fees, no surprise deductions, no fine print.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Pie Chart + Earning Roles */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInScale>
              <Card className="border-0 shadow-lg card-lift">
                <CardContent className="p-6 lg:p-8">
                  <h3 className="font-heading font-bold text-xl text-lux-navy mb-2">KES 500 of KES 1,000 Goes to Members</h3>
                  <p className="text-sm text-lux-text-light mb-6">50% of every membership fee is paid directly to members as commissions</p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={breakdownData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={110}
                          paddingAngle={3}
                          dataKey="value"
                          stroke="none"
                        >
                          {breakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          verticalAlign="bottom"
                          height={60}
                          formatter={(value: string) => (
                            <span className="text-sm text-lux-text font-medium">{value}</span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-center text-sm text-lux-text-light mt-4">
                    <span className="font-bold text-lux-navy">Total member earnings: KES 500</span> out of KES 1,000 (50% payout ratio)
                  </p>
                </CardContent>
              </Card>
            </FadeInScale>

            <div className="space-y-6">
              {earningRoles.map((role, i) => {
                const Icon = role.icon
                return (
                  <FadeIn key={role.title} delay={i * 100}>
                    <Card className="border-0 shadow-md card-lift border-l-4" style={{ borderLeftColor: i === 0 ? "#0F2847" : "#D4AF37" }}>
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${role.bg} flex-shrink-0`}>
                          <Icon className={`h-5 w-5 ${role.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-heading font-bold text-lux-navy">{role.title}</h4>
                            <span className={`font-heading font-bold text-lg ${role.color}`}>{role.amount}</span>
                          </div>
                          <p className="text-sm text-lux-text-light mt-1">{role.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Commission Calculator Explanation */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-12">
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Commission Calculator</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">How Your Earnings Add Up</h2>
              <p className="mt-6 text-lg text-lux-text-light max-w-3xl mx-auto leading-relaxed">
                Understanding the math behind your commissions is the first step to building a sustainable income with Zuri Agency. Here is exactly how every referral translates into real money in your pocket.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <FadeInScale delay={100}>
                <Card className="border-0 shadow-lg card-lift h-full">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lux-navy/10">
                        <Users className="h-5 w-5 text-lux-navy" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-lux-navy">Direct Referral</h3>
                    </div>
                    <p className="text-lux-text leading-relaxed">
                      When you share your unique referral link and someone clicks it and completes their KES 1,000 membership, you earn KES 350 immediately. This is your direct referral commission, and it represents 35% of the membership fee. Think of it as your reward for introducing a new person to the Zuri Agency community. The payment lands in your M-Pesa account within seconds of their registration — no forms, no delays, no minimum thresholds.
                    </p>
                    <div className="mt-4 p-3 bg-lux-navy/5 rounded-lg">
                      <p className="text-sm font-medium text-lux-navy">Example: 10 direct referrals = KES 3,500 in your pocket</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeInScale>

              <FadeInScale delay={200}>
                <Card className="border-0 shadow-lg card-lift h-full">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lux-gold-pale">
                        <TrendingUp className="h-5 w-5 text-lux-gold-dark" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-lux-navy">Upline Override</h3>
                    </div>
                    <p className="text-lux-text leading-relaxed">
                      This is where things get interesting. When someone you referred goes on to refer their own network, you earn KES 150 for every person they bring in. This is called the upline override commission, and it is the engine of passive income in Zuri Agency. You do not need to be involved in those referrals — your team members do the work, and you earn 15% override on every membership generated in your downline.
                    </p>
                    <div className="mt-4 p-3 bg-lux-gold-pale rounded-lg">
                      <p className="text-sm font-medium text-lux-gold-dark">Example: 10 team members each refer 5 people = 50 × KES 150 = KES 7,500</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeInScale>
            </div>

            <FadeIn delay={300}>
              <div className="bg-lux-navy rounded-xl p-6 lg:p-8 text-center">
                <h3 className="font-heading font-bold text-2xl text-white mb-3">The Total Opportunity</h3>
                <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  When someone pays KES 1,000 to join Zuri Agency, KES 500 is yours to earn. KES 350 goes directly to you as the person who referred them, and KES 150 goes to the person who referred you. This 50% payout ratio is among the highest in the industry. Most referral platforms pay 20-30% at best. We pay 50% because we believe that the people building the community deserve the largest share of the value they create. The remaining KES 500 keeps the platform running — servers, support, M-Pesa integration fees, security, and continuous improvement.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Calculate Your Earnings"
            title="Earnings Calculator"
            subtitle="See exactly how much you could earn based on your referrals."
          />

          <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto mt-8">
            <div className="lg:col-span-3">
              <FadeInScale delay={200}>
                <Card className="border-0 shadow-lg card-lift">
                  <CardContent className="p-6 lg:p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Sliders */}
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className="font-heading font-semibold text-lux-navy">Direct Referrals</label>
                            <span className="font-heading font-bold text-2xl text-lux-gold-dark">{directReferrals}</span>
                          </div>
                          <Slider
                            value={[directReferrals]}
                            onValueChange={([v]) => setDirectReferrals(v)}
                            min={1}
                            max={100}
                            step={1}
                            className="[&_[data-slot=slider-range]]:bg-lux-gold [&_[data-slot=slider-thumb]]:border-lux-gold"
                          />
                          <div className="flex justify-between mt-1 text-xs text-lux-text-light">
                            <span>1</span>
                            <span>50</span>
                            <span>100</span>
                          </div>
                          <p className="text-sm text-lux-text-light mt-2">
                            Direct earnings: <strong className="text-lux-navy">KES {directEarnings.toLocaleString()}/mo</strong>
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className="font-heading font-semibold text-lux-navy">Upline Referrals (team)</label>
                            <span className="font-heading font-bold text-2xl text-lux-gold-dark">{uplineReferrals}</span>
                          </div>
                          <Slider
                            value={[uplineReferrals]}
                            onValueChange={([v]) => setUplineReferrals(v)}
                            min={0}
                            max={200}
                            step={1}
                            className="[&_[data-slot=slider-range]]:bg-lux-gold [&_[data-slot=slider-thumb]]:border-lux-gold"
                          />
                          <div className="flex justify-between mt-1 text-xs text-lux-text-light">
                            <span>0</span>
                            <span>100</span>
                            <span>200</span>
                          </div>
                          <p className="text-sm text-lux-text-light mt-2">
                            Upline earnings: <strong className="text-lux-gold-dark">KES {uplineEarnings.toLocaleString()}/mo</strong>
                          </p>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="bg-lux-navy rounded-xl p-6 flex flex-col justify-center">
                        <p className="text-gray-400 text-sm font-medium">Your Monthly Earnings</p>
                        <p className="font-heading font-bold text-4xl lg:text-5xl text-lux-gold mt-2">
                          KES {totalMonthly.toLocaleString()}
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Annual Projection</span>
                            <span className="font-heading font-bold text-white">KES {annualProjection.toLocaleString()}/year</span>
                          </div>
                          <div className="flex justify-between text-sm mt-2">
                            <span className="text-gray-400">Direct ({directReferrals} x KES 350)</span>
                            <span className="text-lux-gold">KES {directEarnings.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-400">Upline ({uplineReferrals} x KES 150)</span>
                            <span className="text-lux-gold/80">KES {uplineEarnings.toLocaleString()}</span>
                          </div>
                        </div>
                        <Link href="/register" className="mt-6">
                          <Button className="w-full bg-lux-gold hover:bg-lux-gold-dark text-lux-navy font-heading font-bold h-12 rounded-lg shadow-lg shadow-lux-gold/25 btn-shine">
                            Start Earning Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInScale>
            </div>

            {/* Why This Matters */}
            <div className="lg:col-span-2">
              <FadeInScale delay={300}>
                <Card className="border-0 shadow-lg card-lift h-full bg-lux-gold-pale/30">
                  <CardContent className="p-6 lg:p-8">
                    <h3 className="font-heading font-bold text-xl text-lux-navy mb-4">Why These Numbers Matter</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lux-gold/20 flex-shrink-0 mt-0.5">
                          <Sparkles className="h-4 w-4 text-lux-gold-dark" />
                        </div>
                        <div>
                          <p className="font-semibold text-lux-navy text-sm">Low Entry, High Return</p>
                          <p className="text-sm text-lux-text-light mt-0.5">Your total investment is KES 1,000. One referral covers 35% of that. Three referrals and you are in profit.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lux-gold/20 flex-shrink-0 mt-0.5">
                          <TrendingUp className="h-4 w-4 text-lux-gold-dark" />
                        </div>
                        <div>
                          <p className="font-semibold text-lux-navy text-sm">Compound Growth</p>
                          <p className="text-sm text-lux-text-light mt-0.5">Every person you refer becomes a potential income source through upline override. Your earnings compound as your team grows.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lux-gold/20 flex-shrink-0 mt-0.5">
                          <DollarSign className="h-4 w-4 text-lux-gold-dark" />
                        </div>
                        <div>
                          <p className="font-semibold text-lux-navy text-sm">Instant Liquidity</p>
                          <p className="text-sm text-lux-text-light mt-0.5">No waiting for end of month. No minimum withdrawal. Every commission hits your M-Pesa instantly. Real money, real fast.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lux-gold/20 flex-shrink-0 mt-0.5">
                          <BarChart3 className="h-4 w-4 text-lux-gold-dark" />
                        </div>
                        <div>
                          <p className="font-semibold text-lux-navy text-sm">Scalable Income</p>
                          <p className="text-sm text-lux-text-light mt-0.5">Whether you want KES 3,500 or KES 70,000 per month, the math works the same. Your earnings scale with your effort.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInScale>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Potential Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Earnings Potential</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">What You Can Realistically Earn</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-3xl mx-auto leading-relaxed">
              Your income with Zuri Agency depends entirely on how much time and energy you invest. Here are realistic projections based on how our current members are performing. These are not hypotheticals — these are actual earning ranges our community members achieve every single month.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {earningsTiers.map((tier, i) => {
              const Icon = tier.icon
              return (
                <FadeInScale key={tier.name} delay={i * 100}>
                  <Card className="border-0 shadow-lg card-lift h-full overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${tier.color}`} />
                    <CardContent className="p-6 lg:p-8 text-center">
                      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${tier.color} text-white mb-4 shadow-lg`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-heading font-bold text-2xl text-lux-navy">{tier.name}</h3>
                      <p className="text-sm text-lux-text-light mt-1">{tier.referrals}</p>
                      <p className="font-heading font-bold text-lux-gold-dark text-2xl mt-3">{tier.monthly}</p>
                      <p className="text-sm text-lux-text mt-1">per month</p>
                      <div className="mt-3 p-2 bg-lux-navy/5 rounded-lg">
                        <p className="text-sm font-semibold text-lux-navy">{tier.annual} / year</p>
                      </div>
                      <p className="text-sm text-lux-text-light mt-4 leading-relaxed text-left">{tier.desc}</p>
                    </CardContent>
                  </Card>
                </FadeInScale>
              )
            })}
          </div>

          <FadeIn delay={300}>
            <div className="mt-12 p-6 lg:p-8 bg-lux-navy rounded-xl text-center">
              <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                These figures assume only direct referral commissions. Add upline override commissions from your growing team, and your actual earnings could be significantly higher. The members earning KES 70,000+ per month are not doing anything you cannot do — they simply started sooner and stayed consistent.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quick Reference Table */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Quick Reference</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Earnings at a Glance</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              See how your earnings grow as you refer more people. Each row shows your total income from direct and upline commissions combined.
            </p>
          </FadeIn>

          <FadeInScale delay={200}>
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-lux-navy">
                    <th className="py-4 px-4 font-heading font-bold text-white text-lg">Referrals</th>
                    <th className="py-4 px-4 font-heading font-bold text-lux-gold text-lg">Direct Earnings</th>
                    <th className="py-4 px-4 font-heading font-bold text-lux-gold text-lg">Upline Earnings</th>
                    <th className="py-4 px-4 font-heading font-bold text-lux-gold text-lg">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quickRefData.map((row) => (
                    <tr key={row.referrals} className="border-b border-gray-100 hover:bg-lux-gold-pale/50 transition-colors">
                      <td className="py-4 px-4 font-heading font-bold text-xl text-lux-navy">{row.referrals}</td>
                      <td className="py-4 px-4 text-lux-text">{row.direct}</td>
                      <td className="py-4 px-4 text-lux-text">{row.upline}</td>
                      <td className="py-4 px-4 font-heading font-bold text-lux-gold-dark text-lg">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-lux-text-light mt-4">
              * These figures assume each referral is a direct referral with full upline override applied.
            </p>
          </FadeInScale>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">Why Choose Zuri Agency</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Zuri Agency vs Other Options</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              Before you commit your time and money anywhere, compare what Zuri Agency offers versus traditional side hustles and employment. The differences speak for themselves.
            </p>
          </FadeIn>

          <FadeInScale delay={200}>
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-lux-navy">
                    <th className="py-4 px-4 font-heading font-bold text-white">Factor</th>
                    <th className="py-4 px-4 font-heading font-bold text-lux-gold">ZuriAgency</th>
                    <th className="py-4 px-4 font-heading font-bold text-lux-gold/60">Side Hustles</th>
                    <th className="py-4 px-4 font-heading font-bold text-lux-gold/60">Employment</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.label} className={`border-b border-gray-100 hover:bg-lux-gold-pale/50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                      <td className="py-3 px-4 font-semibold text-lux-navy">{row.label}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {row.zuri}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-lux-text-light">{row.side}</td>
                      <td className="py-3 px-4 text-sm text-lux-text-light">{row.emp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInScale>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">FAQ</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">Frequently Asked Earnings Questions</h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              We have compiled the most common questions about our earning structure so you can make an informed decision. If you have a question not answered here, our support team is available 24/7.
            </p>
          </FadeIn>

          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <FadeInScale key={i} delay={i * 100}>
                <Card className="border-0 shadow-md card-lift">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lux-gold-pale flex-shrink-0 mt-0.5">
                        <HelpCircle className="h-4 w-4 text-lux-gold-dark" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-lux-navy mb-2">{faq.q}</h3>
                        <p className="text-lux-text leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInScale>
            ))}
          </div>
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
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">Start Building Your Income Today</h2>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Join for KES 1,000 and start earning KES 350 per referral immediately. Three referrals and you are in profit. Everything after that is pure earnings.
            </p>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm">
              Over 5,000 Kenyans have already joined. Your first commission is waiting. The only question is whether you will take the first step today or keep wondering what if.
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
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
