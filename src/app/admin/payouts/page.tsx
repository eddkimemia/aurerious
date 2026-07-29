"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Banknote, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface AdminPayout {
  id: string
  amount: number
  status: string
  phone: string
  createdAt: string
  user: { id: string; name: string | null; phone: string }
}

export default function AdminPayoutsPage() {
  const [requests, setRequests] = useState<AdminPayout[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPayouts = () => {
    setLoading(true)
    fetch("/api/admin/payouts")
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); setRequests(d.payouts || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchPayouts() }, [])

  const updateStatus = async (payoutId: string, action: string) => {
    const res = await fetch("/api/admin/payouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payoutId, action }),
    })
    if (res.ok) fetchPayouts()
  }

  const byStatus = (status: string) => requests.filter((r) => r.status === status)
  const pending = byStatus("pending")
  const approved = byStatus("approved")
  const rejected = byStatus("rejected")
  const paid = byStatus("paid")

  const statusStyles: Record<string, string> = {
    pending: "bg-lux-gold/15 text-lux-gold-dark border-lux-gold/20",
    approved: "bg-blue-100 text-blue-700 border-blue-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
    paid: "bg-green-100 text-green-700 border-green-200",
  }

  const renderTable = (data: AdminPayout[], showActions: boolean) => (
    <Table>
      <TableHeader>
        <TableRow className="bg-lux-navy/5">
          <TableHead className="text-lux-text font-semibold">User</TableHead>
          <TableHead className="text-lux-text font-semibold text-right">Amount</TableHead>
          <TableHead className="text-lux-text font-semibold">Phone</TableHead>
          <TableHead className="text-lux-text font-semibold">Date</TableHead>
          <TableHead className="text-lux-text font-semibold">Status</TableHead>
          {showActions && <TableHead className="text-lux-text font-semibold text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow><TableCell colSpan={showActions ? 6 : 5} className="text-center text-lux-text-light py-6">No payouts</TableCell></TableRow>
        ) : (
          data.map((r) => (
            <TableRow key={r.id} className="table-row-hover">
              <TableCell className="text-sm font-medium text-lux-text">{r.user.name || r.user.phone}</TableCell>
              <TableCell className="text-sm font-heading font-semibold text-lux-navy text-right">KES {r.amount.toLocaleString()}</TableCell>
              <TableCell className="text-xs text-lux-text">{r.phone}</TableCell>
              <TableCell className="text-xs text-lux-text">{new Date(r.createdAt).toLocaleDateString()}</TableCell>
              <TableCell><Badge variant="outline" className={cn("font-medium capitalize", statusStyles[r.status])}>{r.status}</Badge></TableCell>
              {showActions && (
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button size="sm" className="h-8 bg-green-100 text-green-700 hover:bg-green-200 border border-green-200" onClick={() => updateStatus(r.id, "approve")}>
                      <CheckCircle className="h-3 w-3 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => updateStatus(r.id, "reject")}>
                      <XCircle className="h-3 w-3 mr-1" /> Reject
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-lux-gold" /></div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">Payouts</h1>
        <p className="text-lux-text-light mt-1">Manage payout requests from members.</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="bg-white border border-lux-gold/10 p-1">
          <TabsTrigger value="pending" className="data-[state=active]:bg-lux-gold data-[state=active]:text-lux-navy">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-lux-gold data-[state=active]:text-lux-navy">Approved ({approved.length})</TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-lux-gold data-[state=active]:text-lux-navy">Rejected ({rejected.length})</TabsTrigger>
          <TabsTrigger value="paid" className="data-[state=active]:bg-lux-gold data-[state=active]:text-lux-navy">Paid ({paid.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending"><Card className="border-lux-gold/10 shadow-sm"><CardContent className="p-0">{renderTable(pending, true)}</CardContent></Card></TabsContent>
        <TabsContent value="approved"><Card className="border-lux-gold/10 shadow-sm"><CardContent className="p-0">{renderTable(approved, false)}</CardContent></Card></TabsContent>
        <TabsContent value="rejected"><Card className="border-lux-gold/10 shadow-sm"><CardContent className="p-0">{renderTable(rejected, false)}</CardContent></Card></TabsContent>
        <TabsContent value="paid">
          <Card className="border-lux-gold/10 shadow-sm">
            <CardHeader><CardTitle className="font-heading text-lg text-lux-navy flex items-center gap-2"><Banknote className="h-5 w-5 text-lux-gold" /> Paid History</CardTitle></CardHeader>
            <CardContent className="p-0">{renderTable(paid, false)}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
