"use client"

import { useEffect, useState } from "react"
import { Users, UserCheck, Clock, DollarSign, TrendingUp, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

interface AdminData {
  stats: { totalUsers: number; activeUsers: number; activeRate: number; pendingPayouts: number; pendingPayoutsCount: number; totalRevenue: number; revenuePerUser: number }
  chartData: { day: string; signups: number }[]
  recentSignups: { id: string; name: string; phone: string; date: string; referredBy: string | null }[]
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/overview")
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-lux-gold" /></div>
  }

  if (!data) {
    return <div className="text-center text-lux-text-light py-20">Failed to load admin data.</div>
  }

  const { stats, chartData, recentSignups } = data

  const statCards = [
    { label: "Total Users", value: String(stats.totalUsers), icon: Users, change: `${stats.activeRate}% active rate`, color: "text-lux-gold", bg: "bg-lux-gold/10" },
    { label: "Active", value: String(stats.activeUsers), icon: UserCheck, change: `${stats.activeRate}% active rate`, color: "text-green-600", bg: "bg-green-100" },
    { label: "Pending Payouts", value: `KES ${stats.pendingPayouts.toLocaleString()}`, icon: Clock, change: `${stats.pendingPayoutsCount} requests`, color: "text-lux-gold-dark", bg: "bg-lux-gold/10" },
    { label: "Revenue", value: `KES ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, change: `KES ${stats.revenuePerUser.toLocaleString()} per user`, color: "text-lux-navy", bg: "bg-lux-navy/10" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">Admin Dashboard</h1>
        <p className="text-lux-text-light mt-1">Platform overview and recent activity.</p>
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
                  <span className={cn("text-xs font-medium", s.color)}>{s.change}</span>
                </div>
                <p className="text-2xl font-heading font-bold text-lux-text">{s.value}</p>
                <p className="text-xs text-lux-text-light mt-1">{s.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-lux-gold/10 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg text-lux-navy flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-lux-gold" />
              Signups (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E0D6", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} labelStyle={{ fontWeight: 600, color: "#0F2847" }} />
                  <Bar dataKey="signups" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-lux-gold/10 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg text-lux-navy">Recent Signups</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-lux-navy/5">
                  <TableHead className="text-lux-text font-semibold">Name</TableHead>
                  <TableHead className="text-lux-text font-semibold">Phone</TableHead>
                  <TableHead className="text-lux-text font-semibold">Date</TableHead>
                  <TableHead className="text-lux-text font-semibold">Referred By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSignups.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center text-lux-text-light py-6">No signups yet</TableCell></TableRow>
                ) : (
                  recentSignups.map((s) => (
                    <TableRow key={s.id} className="table-row-hover">
                      <TableCell className="text-sm font-medium text-lux-text">{s.name}</TableCell>
                      <TableCell className="text-xs text-lux-text">{s.phone}</TableCell>
                      <TableCell className="text-xs text-lux-text">{s.date}</TableCell>
                      <TableCell className="text-xs text-lux-text">{s.referredBy || "Direct"}</TableCell>
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
