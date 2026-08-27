"use client"

import { useState, FormEvent, useEffect, useRef, Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, UserPlus, Smartphone, Info, AlertCircle, CheckCircle2, Loader2, Phone, ArrowRight, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showPaystackInfo, setShowPaystackInfo] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", referral: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [refParam, setRefParam] = useState("")
  const [step, setStep] = useState<"form" | "payment" | "success">("form")
  const [reference, setReference] = useState("")
  const [authorizationUrl, setAuthorizationUrl] = useState("")
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get("ref") || localStorage.getItem("ref")
    if (ref) {
      setRefParam(ref)
      localStorage.setItem("ref", ref)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [])

  const referralCode = refParam || form.referral

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
          referralCode: referralCode || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Registration failed")
        return
      }
      setReference(data.reference)
      setAuthorizationUrl(data.authorizationUrl)
      setStep("payment")
      // Redirect to Paystack checkout (if not mock, user will complete payment there)
      if (data.authorizationUrl) {
        // For mock URLs, we keep polling; for real Paystack, redirect
        if (!data.authorizationUrl.includes("paystack.mock")) {
          window.location.href = data.authorizationUrl
        }
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (step !== "payment" || !reference) return

    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/paystack/verify?reference=${reference}`)
        const data = await res.json()
        if (data.status === "completed") {
          if (pollingRef.current) clearInterval(pollingRef.current)
          setStep("success")
          setTimeout(() => router.push("/login?verified=true"), 2000)
        } else if (data.status === "failed") {
          if (pollingRef.current) clearInterval(pollingRef.current)
          setError("Payment failed. Please try again.")
          setStep("form")
        }
      } catch {
        // ignore polling errors
      }
    }, 3000)

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [step, reference, router])

  if (step === "payment") {
    return (
      <div className="min-h-screen bg-lux-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lux-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lux-navy/5 rounded-full blur-3xl" />
        </div>

        <Card className="w-full max-w-lg border-lux-gold/20 shadow-2xl glass">
          <CardContent className="p-8 sm:p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lux-gold/10 mb-6">
              <CreditCard className="h-8 w-8 text-lux-gold" />
            </div>
            <CardTitle className="font-heading text-2xl text-lux-navy mb-2">Complete Payment</CardTitle>
            <CardDescription className="text-lux-text-light text-base leading-relaxed">
              You will be redirected to <strong className="text-lux-navy">Paystack</strong> secure checkout to complete the KES 1,000 membership payment for <strong className="text-lux-navy">{form.phone}</strong>.
            </CardDescription>

            <div className="mt-8 space-y-4">
              {authorizationUrl && !authorizationUrl.includes("paystack.mock") ? (
                <Button onClick={() => (window.location.href = authorizationUrl)} className="w-full bg-lux-gold hover:bg-lux-gold-dark text-white font-heading font-bold h-11 rounded-lg shadow-lg">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay KES 1,000 via Paystack
                </Button>
              ) : (
                <div className="flex items-center gap-3 rounded-xl bg-lux-gold-pale/60 border border-lux-gold/10 px-4 py-3">
                  <Loader2 className="h-5 w-5 text-lux-gold animate-spin flex-shrink-0" />
                  <span className="text-sm text-lux-text">Waiting for payment confirmation...</span>
                </div>
              )}

              <p className="text-xs text-lux-text-light leading-relaxed">
                Secure payment via Paystack. Supports M-Pesa, Card, and Bank. You will be redirected back after payment.
              </p>
              <p className="text-xs text-lux-text-light">Reference: <span className="font-mono text-lux-navy">{reference}</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-lux-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lux-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lux-navy/5 rounded-full blur-3xl" />
        </div>

        <Card className="w-full max-w-lg border-lux-gold/20 shadow-2xl glass">
          <CardContent className="p-8 sm:p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="font-heading text-2xl text-lux-navy mb-2">Payment Successful!</CardTitle>
            <CardDescription className="text-lux-text-light text-base leading-relaxed">
              Your account is now active. Redirecting you to login...
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    )
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
          Zuri<span className="text-lux-gold">Agency</span>
        </span>
      </div>

      <Card className="w-full max-w-lg border-lux-gold/20 shadow-2xl glass card-lift">
        <CardHeader className="text-center pb-2">
          <CardTitle className="font-heading text-2xl text-lux-navy">Create Your Account</CardTitle>
          <CardDescription className="text-lux-text-light">
            Join Zuri Agency and start earning referral commissions
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
              <Label htmlFor="referral" className="text-lux-text">Referral Code {refParam ? "" : <span className="text-lux-text-light font-normal">(optional)</span>}</Label>
              {refParam ? (
                <div className="flex items-center gap-2 rounded-lg border border-lux-gold/20 bg-lux-gold-pale/50 px-4 py-2.5 text-sm text-lux-navy font-medium">
                  <CheckCircle2 className="h-4 w-4 text-lux-gold flex-shrink-0" />
                  {refParam}
                </div>
              ) : (
                <Input id="referral" placeholder="Enter referrer's code" className="border-lux-gold/20 input-glow" value={form.referral} onChange={(e) => setForm((p) => ({ ...p, referral: e.target.value }))} />
              )}
            </div>

            <div className="rounded-xl bg-lux-gold-pale border border-lux-gold/20 p-4">
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-lux-gold mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold text-sm text-lux-navy">One-Time Membership Fee</p>
                  <p className="text-sm text-lux-text-light mt-1">
                    Pay <strong className="text-lux-navy">KES 1,000</strong> via Paystack to activate your account and start earning. Get <strong className="text-lux-gold">KES 500 airtime bonus</strong> instantly.
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-lux-gold hover:bg-lux-gold-dark text-white font-heading font-bold h-11 rounded-lg shadow-lg shadow-lux-gold/25 hover:shadow-xl transition-all btn-shine">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
              {loading ? "Initiating Payment..." : "Pay KES 1,000 via Paystack"}
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

      <Dialog open={showPaystackInfo} onOpenChange={setShowPaystackInfo}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-lux-navy">Paystack Payment</DialogTitle>
            <DialogDescription>
              Complete your registration by paying the one-time membership fee
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-xl bg-lux-gold-pale border border-lux-gold/20 p-4 text-center">
              <p className="font-heading font-bold text-2xl text-lux-navy">KES 1,000</p>
              <p className="text-sm text-lux-text-light">One-time membership fee</p>
              <p className="text-xs text-lux-gold font-semibold mt-2">+ KES 500 signup bonus after payment!</p>
            </div>
            <p className="text-sm text-lux-text text-center">
              You will be redirected to Paystack secure checkout after submitting the form.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-lux-cream flex items-center justify-center">
        <div className="text-lux-navy font-heading">Loading...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}
