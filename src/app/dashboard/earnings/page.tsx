"use client"

import { useEffect, useState } from "react"
import { DollarSign, Clock, CheckCircle, ArrowUpRight, Filter, Calendar, Loader2, Gift, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface EarningsData {
  totalEarned: number
  pending: number
  paidOut: number
  locked: number
  signupBonus: { amount: number; status: string; type: string } | null
  referralCount: number
  requiredForBonus: number
  thisPeriod: number
  period: string
  recentCommissions: { id: string; amount: number; type: string; status: string; description: string; createdAt: string }[]
}

export default function EarningsPage() {
  const [data, setData] = useState<EarningsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState("")
  const [phone, setPhone] = useState("")

  const fetchEarnings = () => {
    setLoading(true)
    fetch("/api/earnings")
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchEarnings() }, [])

  const handlePayout = (e: React.FormEvent) => {
    e.preventDefault()
    fetch("/api/payout/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseFloat(amount), phone }),
    }).then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); return d }).then((d) => {
      if (d.message) alert(d.message)
      setAmount("")
      setPhone("")
      fetchEarnings()
    }).catch((e) => alert(e.message || "Payout request failed"))
  }

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: "bg-green-100 text-green-700 border-green-200",
      pending: "bg-lux-gold/15 text-lux-gold-dark border-lux-gold/20",
      locked: "bg-orange-100 text-orange-700 border-orange-200",
      failed: "bg-red-100 text-red-700 border-red-200",
      completed: "bg-green-100 text-green-700 border-green-200",
    }
    const label = status === "locked" ? "locked" : status
    return <Badge variant="outline" className={cn("font-medium capitalize", styles[status] || "bg-gray-100 text-gray-600")}>{label}</Badge>
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-lux-gold" /></div>
  }

  const summaryCards = [
    { label: "Total Earned", value: `KES ${(data?.totalEarned || 0).toLocaleString()}`, icon: DollarSign, change: `+KES ${(data?.thisPeriod || 0).toLocaleString()} this ${data?.period || "period"}`, color: "text-lux-gold", bg: "bg-lux-gold/10" },
    { label: "Withdrawable", value: `KES ${(data?.pending || 0).toLocaleString()}`, icon: Clock, change: data?.locked ? `KES ${data.locked.toLocaleString()} locked` : "Available for payout", color: "text-lux-gold-dark", bg: "bg-lux-gold/10" },
    { label: "Paid Out", value: `KES ${(data?.paidOut || 0).toLocaleString()}`, icon: CheckCircle, change: `Last payout: ${data?.recentCommissions?.find(c => c.status === "paid") ? new Date(data.recentCommissions.find(c => c.status === "paid")!.createdAt).toLocaleDateString() : "N/A"}`, color: "text-green-600", bg: "bg-green-100" },
  ]

  const transactions = data?.recentCommissions || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">Earnings</h1>
        <p className="text-lux-text-light mt-1">Track your commissions and request payouts.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border-lux-gold/10 shadow-sm card-lift">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", s.bg)}>
                    <Icon className={cn("h-5 w-5", s.color)} />
                  </div>
                </div>
                <p className="text-2xl font-heading font-bold text-lux-text">{s.value}</p>
                <p className="text-xs text-lux-text-light mt-1">{s.label}</p>
                <p className={cn("text-xs font-medium mt-0.5", s.color)}>{s.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {data?.signupBonus && (
        <Card className={`border-2 shadow-sm ${data.signupBonus.status === "locked" ? "border-orange-200 bg-orange-50/50" : "border-green-200 bg-green-50/50"}`}>
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${data.signupBonus.status === "locked" ? "bg-orange-100" : "bg-green-100"}`}>
                {data.signupBonus.status === "locked" ? <Lock className="h-6 w-6 text-orange-600" /> : <Gift className="h-6 w-6 text-green-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading font-bold text-lux-navy">KES 500 Signup Airtime Bonus</h3>
                  {statusBadge(data.signupBonus.status)}
                </div>
                {data.signupBonus.status === "locked" ? (
                  <>
                    <p className="text-sm text-lux-text-light mt-1">Refer {data.requiredForBonus} more {data.requiredForBonus === 1 ? "person" : "people"} to unlock your bonus for withdrawal.</p>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-lux-text-light mb-1">
                        <span>{data.referralCount} / 5 referrals</span>
                        <span>{Math.round((data.referralCount / 5) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-lux-gold transition-all" style={{ width: `${Math.min(100, (data.referralCount / 5) * 100)}%` }} />
                      </div>
                    </div>
                    <p className="text-xs text-orange-700 mt-2 font-medium">Bonus is locked until you achieve 5 successful referrals. Keep sharing your link!</p>
                  </>
                ) : (
                  <p className="text-sm text-green-700 mt-1 font-medium">🎉 Bonus unlocked! KES 500 is now available for withdrawal. It’s included in your withdrawable balance.</p>
                )}
              </div>
              <div className="text-right">
                <p className="font-heading font-bold text-xl text-lux-navy">KES {data.signupBonus.amount.toLocaleString()}</p>
                <p className="text-xs text-lux-text-light">{data.signupBonus.status === "locked" ? "Locked" : "Available"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-lux-gold/10 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading text-lg text-lux-navy">Transaction History</CardTitle>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32 h-9 text-xs">
                  <Filter className="h-3 w-3 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="direct">Direct Referral</SelectItem>
                  <SelectItem value="override">Override</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-9 text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                Date Range
              </Button>
            </div>
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
                {transactions.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center text-lux-text-light py-6">No commissions yet</TableCell></TableRow>
                ) : (
                  transactions.map((tx) => (
                    <TableRow key={tx.id} className="table-row-hover">
                      <TableCell className="text-xs text-lux-text">{new Date(tx.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-sm text-lux-text capitalize">{tx.type}</TableCell>
                      <TableCell className="text-sm font-heading font-semibold text-lux-navy text-right">KES {tx.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{statusBadge(tx.status)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-lux-gold/10 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg text-lux-navy">Request Payout</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayout} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-lux-text">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-lux-text-light">KES</span>
                  <Input id="amount" type="number" placeholder="0" className="pl-12 input-glow" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <p className="text-xs text-lux-text-light">Minimum withdraw KES 1,000</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payout-phone" className="text-lux-text">M-Pesa Phone Number</Label>
                <Input id="payout-phone" type="tel" placeholder="0753728292" className="input-glow" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <Button type="submit" className="w-full bg-lux-gold hover:bg-lux-gold-dark text-lux-navy font-heading font-bold">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Request Payout
              </Button>
              <p className="text-xs text-lux-text-light text-center">Minimum KES 1,000 • Payouts processed within 24 hours</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
