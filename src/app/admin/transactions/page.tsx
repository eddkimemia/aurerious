"use client"

import { useEffect, useState } from "react"
import { Calendar, Filter, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface AdminTransaction {
  id: string
  type: string
  amount: number
  status: string
  reference: string | null
  createdAt: string
  user: { id: string; name: string | null; phone: string }
}

export default function AdminTransactionsPage() {
  const [txns, setTxns] = useState<AdminTransaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/transactions")
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); setTxns(d.transactions || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: "bg-green-100 text-green-700 border-green-200",
      pending: "bg-lux-gold/15 text-lux-gold-dark border-lux-gold/20",
      failed: "bg-red-100 text-red-700 border-red-200",
      paid: "bg-green-100 text-green-700 border-green-200",
      commission: "bg-blue-100 text-blue-700 border-blue-200",
    }
    return <Badge variant="outline" className={cn("font-medium capitalize", styles[status] || "bg-gray-100 text-gray-600")}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">Transactions</h1>
        <p className="text-lux-text-light mt-1">View all commission transactions across the platform.</p>
      </div>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <CardTitle className="font-heading text-lg text-lux-navy">All Transactions</CardTitle>
            <div className="flex items-center gap-2 ml-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-32 h-9 text-xs"><Filter className="h-3 w-3 mr-1" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-9 text-xs"><Calendar className="h-3 w-3 mr-1" />Date Range</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-lux-gold" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-lux-navy/5">
                  <TableHead className="text-lux-text font-semibold">User</TableHead>
                  <TableHead className="text-lux-text font-semibold">Type</TableHead>
                  <TableHead className="text-lux-text font-semibold text-right">Amount</TableHead>
                  <TableHead className="text-lux-text font-semibold">Status</TableHead>
                  <TableHead className="text-lux-text font-semibold">Date</TableHead>
                  <TableHead className="text-lux-text font-semibold">Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {txns.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center text-lux-text-light py-6">No transactions yet</TableCell></TableRow>
                ) : (
                  txns.map((tx) => (
                    <TableRow key={tx.id} className="table-row-hover">
                      <TableCell className="text-sm font-medium text-lux-text">{tx.user.name || tx.user.phone}</TableCell>
                      <TableCell className="text-xs text-lux-text capitalize">{tx.type}</TableCell>
                      <TableCell className="text-sm font-heading font-semibold text-lux-navy text-right">KES {tx.amount.toLocaleString()}</TableCell>
                      <TableCell>{statusBadge(tx.status)}</TableCell>
                      <TableCell className="text-xs text-lux-text">{new Date(tx.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-xs text-lux-text font-mono">{tx.reference || "—"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
