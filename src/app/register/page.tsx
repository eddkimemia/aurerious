"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, UserPlus, Smartphone, Info, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showMpesaInfo, setShowMpesaInfo] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", referral: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!form.phone || !form.password) {
      setError("Phone and password are required")
      return
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    const phoneClean = form.phone.replace(/[\s\-]/g, "")
    if (!/^07\d{8}$/.test(phoneClean)) {
      setError("Phone must be a valid Kenyan number starting with 07 (e.g. 0712345678)")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name || undefined,
          email: form.email || undefined,
          phone: phoneClean,
          password: form.password,
          referralCode: form.referral || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Registration failed")
        return
      }
      setSuccess(`Account created! Welcome ${data.user.name || "to Aureus Network"}.`)
      setTimeout(() => router.push("/login"), 2000)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-lux-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-lux-navy/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-lux-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lux-navy shadow-lg shadow-lux-navy/20">
          <span className="font-heading font-bold text-white text-xl">A</span>
        </div>
        <span className="font-heading font-bold text-2xl text-lux-navy">
          Aureus<span className="text-lux-gold">Network</span>
        </span>
      </div>

      <Card className="w-full max-w-lg border-lux-gold/20 shadow-2xl glass card-lift">
        <CardHeader className="text-center pb-2">
          <CardTitle className="font-heading text-2xl text-lux-navy">Create Your Account</CardTitle>
          <CardDescription className="text-lux-text-light">
            Join Aureus Network and start earning referral commissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                {success}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lux-text">Full Name</Label>
                <Input id="name" placeholder="John Doe" className="border-lux-gold/20 input-glow" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-lux-text">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="0712345678" className="border-lux-gold/20 input-glow" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-lux-text">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="border-lux-gold/20 input-glow" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-lux-text">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="border-lux-gold/20 focus-visible:border-lux-gold input-glow pr-10"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-lux-text-light hover:text-lux-navy transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referral" className="text-lux-text">Referral Code <span className="text-lux-text-light font-normal">(optional)</span></Label>
              <Input id="referral" placeholder="Enter referrer's code" className="border-lux-gold/20 input-glow" value={form.referral} onChange={(e) => setForm((p) => ({ ...p, referral: e.target.value }))} />
            </div>

            <div className="rounded-xl bg-lux-gold-pale border border-lux-gold/20 p-4">
              <div className="flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-lux-gold mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold text-sm text-lux-navy">One-Time Membership Fee</p>
                  <p className="text-sm text-lux-text-light mt-1">
                    Pay <strong className="text-lux-navy">KES 1,000</strong> via M-Pesa to activate your account and start earning.
                  </p>
                  <button type="button" onClick={() => setShowMpesaInfo(true)} className="inline-flex items-center gap-1 text-xs text-lux-gold hover:text-lux-gold-dark font-medium mt-2 transition-colors">
                    <Info className="h-3 w-3" />
                    View M-Pesa payment details
                  </button>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-lux-gold hover:bg-lux-gold-dark text-white font-heading font-bold h-11 rounded-lg shadow-lg shadow-lux-gold/25 hover:shadow-xl transition-all btn-shine">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
              {loading ? "Creating Account..." : "Create Account - KES 1,000"}
            </Button>
          </form>

          <p className="text-center text-sm text-lux-text-light pt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-lux-gold hover:text-lux-gold-dark font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>

      <Dialog open={showMpesaInfo} onOpenChange={setShowMpesaInfo}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-lux-navy">M-Pesa Payment</DialogTitle>
            <DialogDescription>
              Complete your registration by paying the one-time membership fee
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-xl bg-lux-gold-pale border border-lux-gold/20 p-4 text-center">
              <p className="font-heading font-bold text-2xl text-lux-navy">KES 1,000</p>
              <p className="text-sm text-lux-text-light">One-time membership fee</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-lux-text-light">Paybill Number</span>
                <span className="font-heading font-semibold text-lux-navy">247 247</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-lux-text-light">Account Number</span>
                <span className="font-heading font-semibold text-lux-navy">[Your Phone Number]</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-lux-text-light">Amount</span>
                <span className="font-heading font-semibold text-lux-gold">KES 1,000</span>
              </div>
            </div>
            <p className="text-xs text-lux-text-light leading-relaxed">
              After payment, your account will be activated automatically. Your referral link and dashboard will be ready immediately.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
