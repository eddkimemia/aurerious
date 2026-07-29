"use client"

import { useEffect, useState } from "react"
import { Link2, Copy, Check, Share2, TrendingUp, Users, Percent, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface ReferralData {
  referralCode: string
  referralLink: string
  stats: { totalClicks: number; signups: number; earnings: number }
  referrals: { id: string; referee: { id: string; name: string; phone: string; createdAt: string }; status: string; createdAt: string }[]
}

export default function ReferralsPage() {
  const [data, setData] = useState<ReferralData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch("/api/referral/link").then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); return d }),
      fetch("/api/earnings").then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); return d }),
    ]).then(([linkData, earningsData]) => {
      setData({ ...linkData, stats: { ...linkData.stats, earnings: earningsData.totalEarned || 0 } })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const copyLink = () => {
    if (!data) return
    navigator.clipboard?.writeText(data.referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-lux-gold" /></div>
  }

  const convRate = data?.stats?.totalClicks && data.stats.totalClicks > 0
    ? ((data.stats.signups / data.stats.totalClicks) * 100).toFixed(1)
    : "0.0"

  const statCards = [
    { label: "Link Clicks", value: String(data?.stats?.totalClicks || 0), icon: TrendingUp, change: "Tracked via referral links", color: "text-lux-gold", bg: "bg-lux-gold/10" },
    { label: "Signups", value: String(data?.stats?.signups || 0), icon: Users, change: "Total registered members", color: "text-lux-navy", bg: "bg-lux-navy/10" },
    { label: "Conversion Rate", value: `${convRate}%`, icon: Percent, change: "Clicks to signups", color: "text-green-600", bg: "bg-green-100" },
  ]

  const recentReferrals = data?.referrals?.slice(0, 10) || []
  const referralLink = data?.referralLink || ""
  const shareLinks = [
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`Join Aureus Network and start earning KES 350 per referral! ${referralLink}`)}`, color: "bg-[#25D366] hover:bg-[#1DA851]" },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(`Join Aureus Network and start earning KES 350 per referral!`)}&u=${encodeURIComponent(referralLink)}`, color: "bg-[#1877F2] hover:bg-[#166FE5]" },
    { name: "Twitter", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Join Aureus Network and start earning KES 350 per referral!`)}&url=${encodeURIComponent(referralLink)}`, color: "bg-[#1DA1F2] hover:bg-[#1A91DA]" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">Referrals</h1>
        <p className="text-lux-text-light mt-1">Share your referral link and earn KES 350 per signup.</p>
      </div>

      <Card className="border-lux-gold/10 shadow-sm bg-gradient-to-r from-lux-navy to-lux-navy-dark">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0 w-full">
              <p className="text-sm font-semibold text-lux-gold mb-2">Your Referral Link</p>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg border border-lux-gold/20 px-4 py-3">
                <Link2 className="h-4 w-4 text-lux-gold flex-shrink-0" />
                <code className="flex-1 text-sm text-white font-mono truncate">{referralLink}</code>
                <button onClick={copyLink} className="flex h-8 w-8 items-center justify-center rounded-lg bg-lux-gold text-lux-navy hover:bg-lux-gold-dark transition-colors flex-shrink-0">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              {copied && <p className="text-xs text-lux-gold mt-1 animate-in-up"><Check className="h-3 w-3 inline mr-1" />Copied to clipboard!</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border-lux-gold/10 shadow-sm card-lift">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", s.bg)}>
                    <Icon className={cn("h-5 w-5", s.color)} />
                  </div>
                  <span className={cn("text-xs font-medium", s.color)}>{s.change}</span>
                </div>
                <p className="text-2xl font-heading font-bold text-lux-text">{s.value}</p>
                <p className="text-xs text-lux-text-light mt-1">{s.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardContent className="p-5">
          <p className="text-sm font-semibold text-lux-text mb-3">Share via</p>
          <div className="flex flex-wrap gap-3">
            {shareLinks.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
                <Button className={cn("text-white font-medium", s.color)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  {s.name}
                </Button>
              </a>
            ))}
            <Button variant="outline" className="border-lux-gold/20 text-lux-gold hover:bg-lux-gold-pale" onClick={copyLink}>
              <Link2 className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg text-lux-navy">Recent Referrals</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-lux-navy/5">
                <TableHead className="text-lux-text font-semibold">Name</TableHead>
                <TableHead className="text-lux-text font-semibold">Date Joined</TableHead>
                <TableHead className="text-lux-text font-semibold">Status</TableHead>
                <TableHead className="text-lux-text font-semibold text-right">Commission</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReferrals.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center text-lux-text-light py-6">No referrals yet. Share your link!</TableCell></TableRow>
              ) : (
                recentReferrals.map((r) => (
                  <TableRow key={r.id} className="table-row-hover">
                    <TableCell className="text-sm font-medium text-lux-text">{r.referee.name || r.referee.phone}</TableCell>
                    <TableCell className="text-xs text-lux-text">{new Date(r.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("font-medium", r.status === "completed" ? "bg-green-100 text-green-700 border-green-200" : "bg-lux-gold/15 text-lux-gold-dark border-lux-gold/20")}>
                        {r.status === "completed" ? "Active" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-heading font-semibold text-lux-navy text-right">{r.status === "completed" ? "KES 350" : "--"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
