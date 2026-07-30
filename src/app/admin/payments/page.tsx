"use client"

import { useEffect, useState, useCallback } from "react"
import { Loader2, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface MpesaPayment {
  id: string
  userId: string | null
  phone: string
  amount: number
  reference: string
  resultCode: string | null
  resultDesc: string | null
  status: string
  type: string
  createdAt: string
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<MpesaPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [statusTab, setStatusTab] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchPayments = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (statusTab) params.set("status", statusTab)
    params.set("page", String(page))
    fetch(`/api/admin/payments?${params}`)
      .then(async (r) => {
        const d = await r.json()
        if (!r.ok) throw new Error(d.error)
        setPayments(d.payments || [])
        setTotalPages(d.pagination?.totalPages || 1)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [statusTab, page])

  useEffect(() => { fetchPayments() }, [fetchPayments])

  const tabs = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Failed", value: "failed" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">Payments</h1>
          <p className="text-lux-text-light mt-1">M-Pesa transaction history.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchPayments}>
          <RefreshCw className="h-4 w-4 mr-1" /> Refresh
        </Button>
      </div>

      <div className="flex gap-1 bg-lux-navy/5 rounded-lg p-1">
        {tabs.map((t) => (
          <button key={t.value} onClick={() => { setStatusTab(t.value); setPage(1) }}
            className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              statusTab === t.value ? "bg-white text-lux-navy shadow-sm" : "text-lux-text-light hover:text-lux-navy"
            )}>
            {t.label}
          </button>
        ))}
      </div>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardHeader className="py-3 px-4 sm:px-6">
          <CardTitle className="font-heading text-sm text-lux-text-light font-normal">
            {loading ? "Loading..." : `${payments.length} payment${payments.length !== 1 ? "s" : ""}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-lux-gold" /></div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-lux-navy/5">
                      <TableHead className="text-lux-text font-semibold">Phone</TableHead>
                      <TableHead className="text-lux-text font-semibold">Amount</TableHead>
                      <TableHead className="text-lux-text font-semibold">Reference</TableHead>
                      <TableHead className="text-lux-text font-semibold">Type</TableHead>
                      <TableHead className="text-lux-text font-semibold">Status</TableHead>
                      <TableHead className="text-lux-text font-semibold hidden sm:table-cell">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center text-lux-text-light py-6">No payments found</TableCell></TableRow>
                    ) : (
                      payments.map((p) => (
                        <TableRow key={p.id} className="table-row-hover">
                          <TableCell className="text-sm font-medium text-lux-text">{p.phone}</TableCell>
                          <TableCell className="text-sm font-semibold text-lux-text">KES {p.amount.toFixed(2)}</TableCell>
                          <TableCell className="text-xs font-mono text-lux-text">{p.reference}</TableCell>
                          <TableCell className="text-xs text-lux-text capitalize">{p.type}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("font-medium",
                              p.status === "completed" ? "bg-green-100 text-green-700 border-green-200" :
                              p.status === "pending" ? "bg-amber-100 text-amber-700 border-amber-200" :
                              "bg-red-100 text-red-700 border-red-200"
                            )}>
                              {p.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-lux-text whitespace-nowrap hidden sm:table-cell">
                            {new Date(p.createdAt).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t">
                  <span className="text-xs text-lux-text-light">Page {page} of {totalPages}</span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled={page <= 1}
                      onClick={() => setPage(p => Math.max(1, p - 1))}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" disabled={page >= totalPages}
                      onClick={() => setPage(p => p + 1)}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
