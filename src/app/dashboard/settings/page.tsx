"use client"

import { useEffect, useState } from "react"
import { User, Mail, Phone, Smartphone, Lock, Save, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [mpesa, setMpesa] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [profileMsg, setProfileMsg] = useState("")
  const [profileError, setProfileError] = useState("")
  const [passwordMsg, setPasswordMsg] = useState("")
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    fetch("/api/profile")
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); return d })
      .then((d) => {
        if (d.user) {
          setName(d.user.name || "")
          setEmail(d.user.email || "")
          setPhone(d.user.phone || "")
          setMpesa(d.user.mpesaNumber || "")
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileMsg("")
    setProfileError("")
    setSaving(true)
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, mpesaNumber: mpesa }),
      })
      const data = await res.json()
      if (!res.ok) { setProfileError(data.error || "Failed to update") }
      else { setProfileMsg("Profile updated successfully") }
    } catch { setProfileError("Network error") }
    finally { setSaving(false) }
  }

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMsg("")
    setPasswordError("")

    if (!currentPassword) { setPasswordError("Current password is required"); return }
    if (!newPassword) { setPasswordError("New password is required"); return }
    if (newPassword.length < 6) { setPasswordError("Password must be at least 6 characters"); return }
    if (newPassword !== confirmPassword) { setPasswordError("Passwords do not match"); return }

    setSaving(true)
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) { setPasswordError(data.error || "Failed to update password") }
      else { setPasswordMsg("Password updated successfully"); setCurrentPassword(""); setNewPassword(""); setConfirmPassword("") }
    } catch { setPasswordError("Network error") }
    finally { setSaving(false) }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-lux-gold" /></div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">Settings</h1>
        <p className="text-lux-text-light mt-1">Manage your account details and preferences.</p>
      </div>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg text-lux-navy flex items-center gap-2">
            <User className="h-5 w-5 text-lux-gold" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
            {profileMsg && <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700"><CheckCircle2 className="h-4 w-4 flex-shrink-0" />{profileMsg}</div>}
            {profileError && <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-4 w-4 flex-shrink-0" />{profileError}</div>}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lux-text">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lux-text-light" />
                <Input id="name" className="pl-10 input-glow" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lux-text">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lux-text-light" />
                <Input id="email" type="email" className="pl-10 input-glow" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-lux-text">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lux-text-light" />
                <Input id="phone" type="tel" className="pl-10 input-glow" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <Button type="submit" disabled={saving} className="bg-lux-gold hover:bg-lux-gold-dark text-lux-navy font-heading font-bold">
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg text-lux-navy flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-lux-gold" />
            M-Pesa Payout Number
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
            <div className="space-y-2">
              <Label htmlFor="mpesa" className="text-lux-text">Payout Phone Number</Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lux-text-light" />
                <Input id="mpesa" type="tel" placeholder="0753728292" className="pl-10 input-glow" value={mpesa} onChange={(e) => setMpesa(e.target.value)} />
              </div>
              <p className="text-xs text-lux-text-light">All commission payouts will be sent to this M-Pesa number.</p>
            </div>
            <Button type="submit" disabled={saving} className="bg-lux-gold hover:bg-lux-gold-dark text-lux-navy font-heading font-bold">
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Payout Number
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg text-lux-navy flex items-center gap-2">
            <Lock className="h-5 w-5 text-lux-gold" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSave} className="space-y-4 max-w-lg">
            {passwordMsg && <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700"><CheckCircle2 className="h-4 w-4 flex-shrink-0" />{passwordMsg}</div>}
            {passwordError && <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-4 w-4 flex-shrink-0" />{passwordError}</div>}
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-lux-text">Current Password</Label>
              <Input id="current-password" type="password" className="input-glow" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <Separator className="bg-lux-gold/10" />
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-lux-text">New Password</Label>
              <Input id="new-password" type="password" className="input-glow" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-lux-text">Confirm New Password</Label>
              <Input id="confirm-password" type="password" className="input-glow" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <Button type="submit" disabled={saving} className="bg-lux-gold hover:bg-lux-gold-dark text-lux-navy font-heading font-bold">
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
