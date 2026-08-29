"use client"

import { useEffect, useState, useCallback } from "react"
import { Search, Shield, ShieldOff, Loader2, Trash2, CheckCircle, XCircle, Eye, ChevronLeft, ChevronRight, KeyRound, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface AdminUser {
  id: string
  name: string | null
  email: string | null
  phone: string
  role: string
  status: string
  referralCode: string
  referredBy: string | null
  createdAt: string
  updatedAt: string
  _count: { referrals: number; transactions: number; commissions: number }
}

interface UserDetail {
  id: string
  name: string | null
  email: string | null
  phone: string
  status: string
  referralCode: string
  referredBy: string | null
  createdAt: string
  referrer: { name: string | null; phone: string } | null
  _count: { referrals: number; commissions: number }
  referrals: { id: string; status: string; createdAt: string; referee: { id: string; name: string | null; phone: string; status: string } }[]
  commissions: { id: string; amount: number; type: string; status: string; description: string; createdAt: string }[]
  transactions: { id: string; type: string; amount: number; status: string; description: string; createdAt: string }[]
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusTab, setStatusTab] = useState<string>("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [detailUser, setDetailUser] = useState<UserDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [resetPassword, setResetPassword] = useState("")
  const [resetConfirm, setResetConfirm] = useState("")
  const [resetError, setResetError] = useState("")
  const [resetMsg, setResetMsg] = useState("")
  const [resetSaving, setResetSaving] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editPhone, setEditPhone] = useState("")

  const fetchUsers = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (statusTab) params.set("status", statusTab)
    params.set("page", String(page))
    params.set("limit", "20")
    fetch(`/api/admin/users?${params}`)
      .then(async (r) => {
        const d = await r.json()
        if (!r.ok) throw new Error(d.error)
        setUsers(d.users || [])
        setTotalPages(d.pagination?.totalPages || 1)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [search, statusTab, page])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const toggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "suspended" : currentStatus === "pending" ? "active" : "active"
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, status: newStatus }),
    })
    fetchUsers()
    if (detailUser?.id === userId) fetchUserDetail(userId)
  }

  const deleteUser = async (userId: string) => {
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
    setDeleteConfirm(null)
    setDetailUser(null)
    fetchUsers()
  }

  const fetchUserDetail = async (userId: string) => {
    setDetailLoading(true)
    setResetError("")
    setResetMsg("")
    setResetPassword("")
    setResetConfirm("")
    setEditMode(false)
    try {
      const res = await fetch(`/api/admin/users/${userId}`)
      if (res.ok) { const d = await res.json(); setDetailUser(d); setEditName(d.name || ""); setEditEmail(d.email || ""); setEditPhone(d.phone || "") }
    } finally { setDetailLoading(false) }
  }

  const handleResetPassword = async () => {
    setResetError(""); setResetMsg("")
    if (!detailUser) return
    if (!resetPassword || resetPassword.length < 6) { setResetError("Password must be at least 6 characters"); return }
    if (resetPassword !== resetConfirm) { setResetError("Passwords do not match"); return }
    setResetSaving(true)
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: detailUser.id, password: resetPassword }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.error || "Failed")
      setResetMsg("Password reset successfully")
      setResetPassword(""); setResetConfirm("")
    } catch (e: any) { setResetError(e.message || "Failed to reset") }
    finally { setResetSaving(false) }
  }

  const handleEditSave = async () => {
    if (!detailUser) return
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: detailUser.id, name: editName, email: editEmail || null, phone: editPhone }),
    })
    const d = await res.json()
    if (res.ok) { fetchUserDetail(detailUser.id); fetchUsers(); setEditMode(false) }
    else alert(d.error || "Failed to update")
  }

  const tabs = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Active", value: "active" },
    { label: "Suspended", value: "suspended" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">Users</h1>
          <p className="text-lux-text-light mt-1">Manage all registered users.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
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
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lux-text-light" />
          <Input placeholder="Search..." className="pl-10 input-glow" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
        </div>
      </div>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardHeader className="py-3 px-4 sm:px-6">
          <CardTitle className="font-heading text-sm text-lux-text-light font-normal">
            {loading ? "Loading..." : `${users.length} user${users.length !== 1 ? "s" : ""}`}
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
                      <TableHead className="text-lux-text font-semibold whitespace-nowrap">Name</TableHead>
                      <TableHead className="text-lux-text font-semibold whitespace-nowrap">Phone</TableHead>
                      <TableHead className="text-lux-text font-semibold whitespace-nowrap hidden md:table-cell">Email</TableHead>
                      <TableHead className="text-lux-text font-semibold whitespace-nowrap">Status</TableHead>
                      <TableHead className="text-lux-text font-semibold text-center whitespace-nowrap">Refs</TableHead>
                      <TableHead className="text-lux-text font-semibold whitespace-nowrap hidden sm:table-cell">Joined</TableHead>
                      <TableHead className="text-lux-text font-semibold text-right whitespace-nowrap">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow><TableCell colSpan={7} className="text-center text-lux-text-light py-6">No users found</TableCell></TableRow>
                    ) : (
                      users.map((u) => (
                        <TableRow key={u.id} className="table-row-hover">
                          <TableCell className="text-sm font-medium text-lux-text">
                            <button className="hover:text-lux-gold transition-colors text-left"
                              onClick={() => { fetchUserDetail(u.id); setDetailUser(null) }}>
                              {u.name || u.phone}
                            </button>
                          </TableCell>
                          <TableCell className="text-xs text-lux-text">{u.phone}</TableCell>
                          <TableCell className="text-xs text-lux-text hidden md:table-cell">{u.email || "\u2014"}</TableCell>
                          <TableCell>
                            <StatusBadge status={u.status} />
                          </TableCell>
                          <TableCell className="text-sm text-center font-semibold text-lux-text">{u._count.referrals}</TableCell>
                          <TableCell className="text-xs text-lux-text whitespace-nowrap hidden sm:table-cell">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm"
                                onClick={() => { fetchUserDetail(u.id); setDetailUser(null) }}
                                className="text-xs text-lux-text-light hover:text-lux-navy">
                                <Eye className="h-3.5 w-3.5" />
                              </Button>
                              {u.status === "pending" ? (
                                <Button variant="ghost" size="sm"
                                  onClick={() => toggleStatus(u.id, u.status)}
                                  className="text-xs text-green-600 hover:text-green-800 hover:bg-green-50">
                                  <CheckCircle className="h-3.5 w-3.5" />
                                </Button>
                              ) : (
                                <Button variant="ghost" size="sm"
                                  onClick={() => toggleStatus(u.id, u.status)}
                                  className={cn("text-xs",
                                    u.status === "active"
                                      ? "text-red-500 hover:text-red-700 hover:bg-red-50"
                                      : "text-green-600 hover:text-green-800 hover:bg-green-50"
                                  )}>
                                  {u.status === "active"
                                    ? <ShieldOff className="h-3.5 w-3.5" />
                                    : <Shield className="h-3.5 w-3.5" />}
                                </Button>
                              )}
                              <Button variant="ghost" size="sm"
                                onClick={() => setDeleteConfirm(u.id)}
                                className="text-xs text-red-400 hover:text-red-600 hover:bg-red-50">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
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

      <Dialog open={!!detailUser || detailLoading} onOpenChange={(o) => { if (!o) setDetailUser(null) }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {detailLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-lux-gold" /></div>
          ) : detailUser && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-lux-navy flex items-center gap-2">
                  {detailUser.name || detailUser.phone}
                  <StatusBadge status={detailUser.status} />
                </DialogTitle>
                <DialogDescription>
                  {detailUser.email || "\u2014"} &middot; {detailUser.phone}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-lux-text-light">Referral Code</span>
                  <p className="font-mono font-medium text-lux-navy">{detailUser.referralCode}</p>
                </div>
                <div>
                  <span className="text-lux-text-light">Referred By</span>
                  <p className="font-medium text-lux-navy">{detailUser.referrer ? (detailUser.referrer.name || detailUser.referrer.phone) : "\u2014"}</p>
                </div>
                <div>
                  <span className="text-lux-text-light">Joined</span>
                  <p className="font-medium text-lux-navy">{new Date(detailUser.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-lux-text-light">Total Referrals</span>
                  <p className="font-medium text-lux-navy">{detailUser._count.referrals}</p>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-lux-navy">Actions</h4>
                <div className="flex flex-wrap gap-2">
                  {detailUser.status === "pending" && (
                    <Button size="sm" onClick={() => toggleStatus(detailUser.id, detailUser.status)}
                      className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="h-4 w-4 mr-1" /> Activate User
                    </Button>
                  )}
                  {detailUser.status === "active" && (
                    <Button size="sm" variant="outline" onClick={() => toggleStatus(detailUser.id, detailUser.status)}
                      className="text-red-600 border-red-200 hover:bg-red-50">
                      <ShieldOff className="h-4 w-4 mr-1" /> Suspend
                    </Button>
                  )}
                  {detailUser.status === "suspended" && (
                    <Button size="sm" onClick={() => toggleStatus(detailUser.id, detailUser.status)}
                      className="bg-green-600 hover:bg-green-700 text-white">
                      <Shield className="h-4 w-4 mr-1" /> Unsuspend
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => setDeleteConfirm(detailUser.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-1" /> Delete User
                  </Button>
                </div>
              </div>

              <div className="space-y-3 border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-lux-navy flex items-center gap-2"><KeyRound className="h-4 w-4 text-lux-gold" /> Edit Profile</h4>
                  {!editMode ? <Button size="sm" variant="ghost" onClick={() => setEditMode(true)} className="text-xs">Edit</Button> : <Button size="sm" variant="ghost" onClick={() => setEditMode(false)} className="text-xs">Cancel</Button>}
                </div>
                {editMode ? (
                  <div className="space-y-3">
                    <Input placeholder="Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <Input placeholder="Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                    <Input placeholder="Phone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                    <Button size="sm" onClick={handleEditSave} className="bg-lux-gold hover:bg-lux-gold-dark text-lux-navy"><Save className="h-4 w-4 mr-1" /> Save Changes</Button>
                  </div>
                ) : (
                  <div className="text-sm text-lux-text-light">
                    <p>Name: <span className="font-medium text-lux-navy">{detailUser.name || "—"}</span></p>
                    <p>Email: <span className="font-medium text-lux-navy">{detailUser.email || "—"}</span></p>
                    <p>Phone: <span className="font-medium text-lux-navy">{detailUser.phone}</span></p>
                  </div>
                )}
              </div>

              <div className="space-y-3 border rounded-lg p-4 bg-amber-50/50 border-amber-200">
                <h4 className="font-semibold text-sm text-lux-navy flex items-center gap-2"><KeyRound className="h-4 w-4 text-amber-600" /> Reset User Password</h4>
                {resetMsg && <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">{resetMsg}</div>}
                {resetError && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{resetError}</div>}
                <Input type="password" placeholder="New password (min 6 chars)" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} />
                <Input type="password" placeholder="Confirm new password" value={resetConfirm} onChange={(e) => setResetConfirm(e.target.value)} />
                <Button size="sm" onClick={handleResetPassword} disabled={resetSaving} className="bg-amber-600 hover:bg-amber-700 text-white">
                  {resetSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <KeyRound className="h-4 w-4 mr-1" />} Set New Password
                </Button>
                <p className="text-xs text-lux-text-light">Admin can set any user password without knowing old password.</p>
              </div>

              {detailUser.referrals.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-lux-navy mb-2">Referrals ({detailUser.referrals.length})</h4>
                  <div className="space-y-1">
                    {detailUser.referrals.map((r) => (
                      <div key={r.id} className="flex items-center justify-between text-sm bg-lux-navy/5 rounded px-3 py-1.5">
                        <span className="font-medium text-lux-text">{r.referee.name || r.referee.phone}</span>
                        <StatusBadge status={r.referee.status} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {detailUser.commissions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-lux-navy mb-2">Commissions ({detailUser.commissions.length})</h4>
                  <div className="space-y-1">
                    {detailUser.commissions.map((c) => (
                      <div key={c.id} className="flex items-center justify-between text-sm bg-lux-navy/5 rounded px-3 py-1.5">
                        <div>
                          <span className="font-medium text-lux-text">KES {c.amount.toFixed(2)}</span>
                          <span className="text-lux-text-light ml-2 text-xs">{c.type}</span>
                        </div>
                        <Badge variant="outline" className={cn("text-xs", c.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>
                          {c.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {detailUser.transactions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm text-lux-navy mb-2">Transactions ({detailUser.transactions.length})</h4>
                  <div className="space-y-1">
                    {detailUser.transactions.map((t) => (
                      <div key={t.id} className="flex items-center justify-between text-sm bg-lux-navy/5 rounded px-3 py-1.5">
                        <div>
                          <span className="font-medium text-lux-text">KES {t.amount.toFixed(2)}</span>
                          <span className="text-lux-text-light ml-2 text-xs">{t.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-lux-text-light">{new Date(t.createdAt).toLocaleDateString()}</span>
                          <Badge variant="outline" className={cn("text-xs",
                            t.status === "completed" ? "bg-green-100 text-green-700" :
                            t.status === "pending" ? "bg-amber-100 text-amber-700" :
                            "bg-red-100 text-red-700"
                          )}>
                            {t.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={(o) => { if (!o) setDeleteConfirm(null) }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg text-lux-navy">Delete User</DialogTitle>
            <DialogDescription>This action is permanent. All user data including referrals, commissions, and transactions will be removed.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteUser(deleteConfirm!)}>
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    suspended: "bg-red-100 text-red-700 border-red-200",
  }
  return (
    <Badge variant="outline" className={cn("font-medium capitalize", styles[status] || "bg-gray-100 text-gray-700")}>
      {status}
    </Badge>
  )
}
