"use client"

import { useEffect, useState } from "react"
import { Users, UserCheck, Clock, DollarSign, TrendingUp, Loader2, Ban, Hourglass } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

interface AdminData {
  stats: {
    totalUsers: number
    activeUsers: number
    pendingUsers: number
    suspendedUsers: number
    activeRate: number
    pendingPayouts: number
    pendingPayoutsCount: number
    pendingPayments: number
    totalRevenue: number
    revenuePerUser: number
  }
  chartData: { day: string; signups: number }[]
  recentSignups: { id: string; name: string; phone: string; status: string; date: string; referredBy: string | null }[]
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
    { label: "Total Users", value: String(stats.totalUsers), icon: Users, change: `${stats.activeRate}% active`, color: "text-lux-gold", bg: "bg-lux-gold/10" },
    { label: "Active", value: String(stats.activeUsers), icon: UserCheck, change: `${stats.activeUsers} members`, color: "text-green-600", bg: "bg-green-100" },
    { label: "Pending", value: String(stats.pendingUsers), icon: Hourglass, change: "awaiting payment", color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Suspended", value: String(stats.suspendedUsers), icon: Ban, change: `${stats.suspendedUsers} users`, color: "text-red-600", bg: "bg-red-100" },
    { label: "Pending Payments", value: String(stats.pendingPayments), icon: DollarSign, change: "pending M-Pesa", color: "text-lux-gold-dark", bg: "bg-lux-gold/10" },
    { label: "Pending Payouts", value: `KES ${stats.pendingPayouts.toLocaleString()}`, icon: Clock, change: `${stats.pendingPayoutsCount} requests`, color: "text-lux-navy", bg: "bg-lux-navy/10" },
    { label: "Revenue", value: `KES ${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, change: `KES ${stats.revenuePerUser.toLocaleString()}/user`, color: "text-green-700", bg: "bg-green-100" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">Admin Dashboard</h1>
        <p className="text-lux-text-light mt-1">Platform overview and recent activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {statCards.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border-lux-gold/10 shadow-sm card-lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", s.bg)}>
                    <Icon className={cn("h-4 w-4", s.color)} />
                  </div>
                </div>
                <p className="text-xl font-heading font-bold text-lux-text">{s.value}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-lux-text-light">{s.label}</p>
                  <span className={cn("text-[10px] font-medium", s.color)}>{s.change}</span>
                </div>
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
                  <TableHead className="text-lux-text font-semibold">Status</TableHead>
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
                      <TableCell>
                        <Badge variant="outline" className={cn("font-medium capitalize text-xs",
                          s.status === "active" ? "bg-green-100 text-green-700 border-green-200" :
                          s.status === "pending" ? "bg-amber-100 text-amber-700 border-amber-200" :
                          "bg-red-100 text-red-700 border-red-200"
                        )}>
                          {s.status}
                        </Badge>
                      </TableCell>
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
