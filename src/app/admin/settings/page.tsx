"use client"

import { useEffect, useState } from "react"
import { Save, Settings as SettingsIcon, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState("")
  const [error, setError] = useState("")
  const [membershipFee, setMembershipFee] = useState("1000")
  const [directCommission, setDirectCommission] = useState("35")
  const [uplineOverride, setUplineOverride] = useState("15")
  const [minPayout, setMinPayout] = useState("1000")

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); return d })
      .then((d) => {
        if (d.settings) {
          setMembershipFee(d.settings.membership_fee || "1000")
          setDirectCommission(d.settings.direct_commission || "35")
          setUplineOverride(d.settings.upline_override || "15")
          setMinPayout(d.settings.min_payout || "1000")
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg("")
    setError("")
    setSaving(true)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: {
            membership_fee: membershipFee,
            direct_commission: directCommission,
            upline_override: uplineOverride,
            min_payout: minPayout,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok) setError(data.error || "Failed to save")
      else setMsg("Settings saved successfully")
    } catch {
      setError("Network error")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-lux-gold" /></div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">Platform Settings</h1>
        <p className="text-lux-text-light mt-1">Configure platform fees, commissions, and payout rules.</p>
      </div>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg text-lux-navy flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-lux-gold" />
            Commission & Fee Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6 max-w-lg">
            {msg && <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700"><CheckCircle2 className="h-4 w-4 flex-shrink-0" />{msg}</div>}
            {error && <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-4 w-4 flex-shrink-0" />{error}</div>}

            <div className="space-y-2">
              <Label htmlFor="membership-fee" className="text-lux-text">Membership Fee (KES)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-lux-text-light">KES</span>
                <Input id="membership-fee" type="number" className="pl-12 input-glow" value={membershipFee} onChange={(e) => setMembershipFee(e.target.value)} />
              </div>
              <p className="text-xs text-lux-text-light">One-time fee new members pay to join.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="direct-commission" className="text-lux-text">Direct Commission (%)</Label>
              <div className="relative">
                <Input id="direct-commission" type="number" className="pr-10 input-glow" value={directCommission} onChange={(e) => setDirectCommission(e.target.value)} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-lux-text-light">%</span>
              </div>
              <p className="text-xs text-lux-text-light">Percentage the direct referrer earns per membership.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="upline-override" className="text-lux-text">Upline Override (%)</Label>
              <div className="relative">
                <Input id="upline-override" type="number" className="pr-10 input-glow" value={uplineOverride} onChange={(e) => setUplineOverride(e.target.value)} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-lux-text-light">%</span>
              </div>
              <p className="text-xs text-lux-text-light">Percentage earned by upline on their downline&apos;s referrals.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="min-payout" className="text-lux-text">Minimum Payout (KES)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-lux-text-light">KES</span>
                <Input id="min-payout" type="number" className="pl-12 input-glow" value={minPayout} onChange={(e) => setMinPayout(e.target.value)} />
              </div>
              <p className="text-xs text-lux-text-light">Minimum amount a member can request for payout.</p>
            </div>

            <Button type="submit" disabled={saving} className="bg-lux-gold hover:bg-lux-gold-dark text-lux-navy font-heading font-bold">
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
