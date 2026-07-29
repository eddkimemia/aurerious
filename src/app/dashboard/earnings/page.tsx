"use client"

import { useEffect, useState } from "react"
import { DollarSign, Clock, CheckCircle, ArrowUpRight, Filter, Calendar, Loader2 } from "lucide-react"
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
      failed: "bg-red-100 text-red-700 border-red-200",
      completed: "bg-green-100 text-green-700 border-green-200",
    }
    return <Badge variant="outline" className={cn("font-medium capitalize", styles[status] || "bg-gray-100 text-gray-600")}>{status}</Badge>
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-lux-gold" /></div>
  }

  const summaryCards = [
    { label: "Total Earned", value: `KES ${(data?.totalEarned || 0).toLocaleString()}`, icon: DollarSign, change: `+KES ${(data?.thisPeriod || 0).toLocaleString()} this ${data?.period || "period"}`, color: "text-lux-gold", bg: "bg-lux-gold/10" },
    { label: "Pending", value: `KES ${(data?.pending || 0).toLocaleString()}`, icon: Clock, change: "Awaiting confirmation", color: "text-lux-gold-dark", bg: "bg-lux-gold/10" },
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="payout-phone" className="text-lux-text">M-Pesa Phone Number</Label>
                <Input id="payout-phone" type="tel" placeholder="0753728292" className="input-glow" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <Button type="submit" className="w-full bg-lux-gold hover:bg-lux-gold-dark text-lux-navy font-heading font-bold">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Request Payout
              </Button>
              <p className="text-xs text-lux-text-light text-center">Payouts are processed within 24 hours</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
