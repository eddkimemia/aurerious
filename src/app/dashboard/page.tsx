"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, DollarSign, Clock, Copy, Check, ArrowUpRight, Loader2, Gift, Lock } from "lucide-react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface OverviewData {
  user: { name: string; referralCode: string }
  stats: { totalEarnings: number; pendingCommissions: number; lockedBonus: number; signupBonus: { amount: number; status: string } | null; activeReferrals: number; teamSize: number; referralsNeededForBonus: number }
  earningsBreakdown: { direct: number; override: number; bonus: number }
  referralLink: string
  recentCommissions: { id: string; amount: number; type: string; status: string; description: string; createdAt: string }[]
}

export default function DashboardOverview() {
  const [data, setData] = useState<OverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch("/api/dashboard/overview")
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const copyLink = () => {
    if (!data) return
    navigator.clipboard?.writeText(data.referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-lux-gold" />
      </div>
    )
  }

  if (!data) {
    return <div className="text-center text-lux-text-light py-20">Failed to load dashboard data.</div>
  }

  const { user, stats, earningsBreakdown, referralLink, recentCommissions } = data
  const formattedEarnings = `KES ${stats.totalEarnings.toLocaleString()}`
  const formattedPending = `KES ${stats.pendingCommissions.toLocaleString()}`

  const statCards = [
    { label: "Total Earnings", value: formattedEarnings, icon: DollarSign, change: `${earningsBreakdown.direct > 0 ? "+" : ""}KES ${earningsBreakdown.direct.toLocaleString()} direct`, color: "text-lux-gold", bg: "bg-lux-gold/10" },
    { label: "Active Referrals", value: String(stats.activeReferrals), icon: Users, change: `Team of ${stats.teamSize}`, color: "text-lux-navy", bg: "bg-lux-navy/10" },
    { label: "Team Size", value: String(stats.teamSize), icon: TrendingUp, change: `${stats.activeReferrals} direct referrals`, color: "text-lux-navy", bg: "bg-lux-navy/10" },
    { label: "Pending Commissions", value: formattedPending, icon: Clock, change: "Awaiting payout", color: "text-lux-gold", bg: "bg-lux-gold/10" },
  ]

  const pieData = [
    { name: "Direct Earnings", value: earningsBreakdown.direct || 1, color: "#0F2847" },
    { name: "Override Earnings", value: earningsBreakdown.override || 1, color: "#D4AF37" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">
          Welcome back, <span className="text-lux-gold">{user.name || "Member"}</span>
        </h1>
        <p className="text-lux-text-light mt-1">Here&apos;s your referral performance overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border-lux-gold/10 shadow-sm card-lift">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", s.bg)}>
                    <Icon className={cn("h-5 w-5", s.color)} />
                  </div>
                  <span className={cn("text-xs font-semibold", s.color)}>{s.change}</span>
                </div>
                <p className="text-2xl font-heading font-bold text-lux-text">{s.value}</p>
                <p className="text-xs text-lux-text-light mt-1">{s.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0 w-full">
            <p className="text-sm font-semibold text-lux-text mb-1">Your Referral Link</p>
            <div className="flex items-center gap-2 bg-lux-cream rounded-lg border border-lux-gold/20 px-4 py-2.5">
              <code className="flex-1 text-sm text-lux-navy font-mono truncate">{referralLink}</code>
              <button onClick={copyLink} className="flex h-8 w-8 items-center justify-center rounded-lg bg-lux-gold text-white hover:bg-lux-gold-dark transition-colors flex-shrink-0">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button className="bg-lux-navy hover:bg-lux-navy-light text-white font-heading font-semibold btn-shine flex-shrink-0">
            <ArrowUpRight className="h-4 w-4" />
            Share
          </Button>
        </CardContent>
      </Card>

      {data.stats.signupBonus && (
        <Card className={`border-2 shadow-sm ${data.stats.signupBonus.status === "locked" ? "border-orange-200 bg-orange-50/70" : "border-green-200 bg-green-50/70"}`}>
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 ${data.stats.signupBonus.status === "locked" ? "bg-orange-100" : "bg-green-100"}`}>
                {data.stats.signupBonus.status === "locked" ? <Lock className="h-6 w-6 text-orange-600" /> : <Gift className="h-6 w-6 text-green-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading font-bold text-lux-navy">KES 500 Airtime Bonus</h3>
                  <Badge variant="outline" className={data.stats.signupBonus.status === "locked" ? "bg-orange-100 text-orange-700 border-orange-200 capitalize" : "bg-green-100 text-green-700 border-green-200 capitalize"}>{data.stats.signupBonus.status}</Badge>
                </div>
                {data.stats.signupBonus.status === "locked" ? (
                  <>
                    <p className="text-sm text-lux-text-light mt-1">Credited instantly after membership — unlock by referring 5 people.</p>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-lux-text-light mb-1">
                        <span>{data.stats.activeReferrals} / 5 referrals</span>
                        <span>{Math.round((data.stats.activeReferrals / 5) * 100)}% — {data.stats.referralsNeededForBonus} left</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-lux-gold transition-all" style={{ width: `${Math.min(100, (data.stats.activeReferrals / 5) * 100)}%` }} />
                      </div>
                    </div>
                    <p className="text-xs text-orange-700 mt-2 font-medium">Complete {data.stats.referralsNeededForBonus} more referral{data.stats.referralsNeededForBonus !== 1 ? "s" : ""} to withdraw your bonus.</p>
                  </>
                ) : (
                  <p className="text-sm text-green-700 mt-1 font-medium">🎉 Congratulations! Your KES 500 bonus is now withdrawable and included in your pending balance.</p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-heading font-bold text-xl text-lux-navy">KES {data.stats.signupBonus.amount.toLocaleString()}</p>
                <p className="text-xs text-lux-text-light">{data.stats.signupBonus.status === "locked" ? "Locked" : "Available"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-lux-gold/10 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg text-lux-navy">Earnings Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" stroke="none">
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `KES ${v.toLocaleString()}`} />
                  <Legend verticalAlign="bottom" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-lux-gold/10 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg text-lux-navy">Recent Commissions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-lux-navy/5">
                  <TableHead className="text-lux-text font-semibold">Date</TableHead>
                  <TableHead className="text-lux-text font-semibold">Type</TableHead>
                  <TableHead className="text-lux-text font-semibold text-right">Amount</TableHead>
                  <TableHead className="text-lux-text font-semibold text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCommissions.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center text-lux-text-light py-6">No commissions yet</TableCell></TableRow>
                ) : (
                  recentCommissions.map((tx) => (
                    <TableRow key={tx.id} className="table-row-hover">
                      <TableCell className="text-xs text-lux-text">{new Date(tx.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-sm text-lux-text capitalize">{tx.type}</TableCell>
                      <TableCell className="text-sm font-heading font-semibold text-lux-navy text-right">KES {tx.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={tx.status === "paid" ? "default" : "secondary"} className={tx.status === "paid" ? "bg-lux-gold/15 text-lux-gold-dark border-lux-gold/20" : "bg-lux-navy/10 text-lux-navy border-lux-navy/20"}>
                          {tx.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
