"use client"

import { useEffect, useState } from "react"
import { Search, Shield, ShieldOff, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface AdminUser {
  id: string
  name: string | null
  email: string | null
  phone: string
  role: string
  status: string
  referralCode: string
  createdAt: string
  _count: { referrals: number; transactions: number }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const fetchUsers = () => {
    setLoading(true)
    const params = search ? `?search=${encodeURIComponent(search)}` : ""
    fetch(`/api/admin/users${params}`)
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); setUsers(d.users || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchUsers() }, [])

  const toggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active"
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, status: newStatus }),
    })
    if (res.ok) fetchUsers()
  }

  const filtered = users.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">Users</h1>
        <p className="text-lux-text-light mt-1">Manage all registered users.</p>
      </div>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-heading text-lg text-lux-navy">All Users ({filtered.length})</CardTitle>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lux-text-light" />
            <Input placeholder="Search by name, phone or email..." className="pl-10 input-glow" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-lux-gold" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-lux-navy/5">
                  <TableHead className="text-lux-text font-semibold">Name</TableHead>
                  <TableHead className="text-lux-text font-semibold">Phone</TableHead>
                  <TableHead className="text-lux-text font-semibold hidden md:table-cell">Email</TableHead>
                  <TableHead className="text-lux-text font-semibold">Status</TableHead>
                  <TableHead className="text-lux-text font-semibold text-center">Referrals</TableHead>
                  <TableHead className="text-lux-text font-semibold hidden sm:table-cell">Joined</TableHead>
                  <TableHead className="text-lux-text font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center text-lux-text-light py-6">No users found</TableCell></TableRow>
                ) : (
                  filtered.map((u) => (
                    <TableRow key={u.id} className="table-row-hover">
                      <TableCell className="text-sm font-medium text-lux-text">{u.name || u.phone}</TableCell>
                      <TableCell className="text-xs text-lux-text">{u.phone}</TableCell>
                      <TableCell className="text-xs text-lux-text hidden md:table-cell">{u.email || "—"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("font-medium", u.status === "active" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200")}>
                          {u.status === "active" ? "Active" : "Suspended"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-center font-semibold text-lux-text">{u._count.referrals}</TableCell>
                      <TableCell className="text-xs text-lux-text hidden sm:table-cell">{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => toggleStatus(u.id, u.status)} className={cn("text-xs font-medium", u.status === "active" ? "text-red-500 hover:text-red-700 hover:bg-red-50" : "text-green-600 hover:text-green-800 hover:bg-green-50")}>
                          {u.status === "active" ? <><ShieldOff className="h-3 w-3 mr-1" /> Suspend</> : <><Shield className="h-3 w-3 mr-1" /> Activate</>}
                        </Button>
                      </TableCell>
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
