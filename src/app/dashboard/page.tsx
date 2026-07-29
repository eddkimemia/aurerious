"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, DollarSign, Clock, Copy, Check, ArrowUpRight, Loader2 } from "lucide-react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface OverviewData {
  user: { name: string; referralCode: string }
  stats: { totalEarnings: number; pendingCommissions: number; activeReferrals: number; teamSize: number }
  earningsBreakdown: { direct: number; override: number }
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
