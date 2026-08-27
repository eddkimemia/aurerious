"use client"

import { useState, FormEvent, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LogIn, AlertCircle, Loader2, Smartphone, CheckCircle2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn, getSession } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [needsPayment, setNeedsPayment] = useState(false)
  const [paymentState, setPaymentState] = useState<"idle" | "initiating" | "polling" | "success">("idle")
  const [payCheckoutRequestId, setPayCheckoutRequestId] = useState("")
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const passwordRef = useRef("")

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [])

  useEffect(() => {
    if (paymentState !== "polling" || !payCheckoutRequestId) return

    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/mpesa/status?checkoutRequestId=${payCheckoutRequestId}`)
        const data = await res.json()
        if (data.status === "completed") {
          if (pollingRef.current) clearInterval(pollingRef.current)
          setPaymentState("success")
          setTimeout(async () => {
            const result = await signIn("credentials", {
              login,
              password: passwordRef.current,
              redirect: false,
            })
            if (result?.ok) {
              const session = await getSession()
              if (session?.user?.role === "admin") {
                router.push("/admin")
              } else {
                router.push("/dashboard")
              }
              router.refresh()
            } else {
              router.push("/login")
            }
          }, 1500)
        } else if (data.status === "failed") {
          if (pollingRef.current) clearInterval(pollingRef.current)
          setError("Payment failed. Please try again.")
          setPaymentState("idle")
        }
      } catch {
        // ignore polling errors
      }
    }, 3000)

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [paymentState, payCheckoutRequestId, login, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setNeedsPayment(false)
    setPaymentState("idle")

    if (!login || !password) {
      setError("Email/phone and password are required")
      return
    }

    passwordRef.current = password

    setLoading(true)
    try {
      const result = await signIn("credentials", {
        login,
        password,
        redirect: false,
      })

      if (result?.error) {
        if (result.error === "PENDING_PAYMENT") {
          setError("You haven't completed your registration payment. Please pay the KES 1,000 membership fee to activate your account.")
          setNeedsPayment(true)
          return
        }
        setError(result.error === "CredentialsSignin" ? "Invalid email/phone or password" : result.error)
        return
      }

      if (result?.ok) {
        const session = await getSession()
        if (session?.user?.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
        router.refresh()
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleRetryPayment = async () => {
    setError("")
    setPaymentState("initiating")
    try {
      const res = await fetch("/api/payment/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Payment initiation failed")
        setPaymentState("idle")
        return
      }
      setPayCheckoutRequestId(data.checkoutRequestId)
      setPaymentState("polling")
    } catch {
      setError("Network error. Please try again.")
      setPaymentState("idle")
    }
  }

  if (paymentState === "polling") {
    return (
      <div className="min-h-screen bg-lux-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lux-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lux-navy/5 rounded-full blur-3xl" />
        </div>

        <Card className="w-full max-w-lg border-lux-gold/20 shadow-2xl glass">
          <CardContent className="p-8 sm:p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lux-gold/10 mb-6">
              <Smartphone className="h-8 w-8 text-lux-gold" />
            </div>
            <CardTitle className="font-heading text-2xl text-lux-navy mb-2">Check Your Phone</CardTitle>
            <CardDescription className="text-lux-text-light text-base leading-relaxed">
              An M-Pesa payment prompt has been sent. Enter your M-Pesa PIN to complete the KES 1,000 membership payment.
            </CardDescription>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 rounded-xl bg-lux-gold-pale/60 border border-lux-gold/10 px-4 py-3">
                <Loader2 className="h-5 w-5 text-lux-gold animate-spin flex-shrink-0" />
                <span className="text-sm text-lux-text">Waiting for payment confirmation...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (paymentState === "success") {
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
              Your account is now active. Redirecting you to your dashboard...
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lux-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lux-navy/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lux-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lux-navy shadow-lg shadow-lux-navy/20">
          <span className="font-heading font-bold text-white text-xl">A</span>
        </div>
        <span className="font-heading font-bold text-2xl text-lux-navy">
          Zuri<span className="text-lux-gold">Agency</span>
        </span>
      </div>

      <Card className="w-full max-w-md border-lux-gold/20 shadow-2xl glass card-lift">
        <CardHeader className="text-center pb-2">
          <CardTitle className="font-heading text-2xl text-lux-navy">Welcome Back</CardTitle>
          <CardDescription className="text-lux-text-light">
            Sign in to your Zuri Agency account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-lux-text">Email or Phone</Label>
              <Input
                id="email"
                type="text"
                placeholder="you@example.com or 0712345678"
                className="border-lux-gold/20 focus-visible:border-lux-gold input-glow"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-lux-text">Password</Label>
                <button type="button" className="text-xs text-lux-gold hover:text-lux-gold-dark font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="border-lux-gold/20 focus-visible:border-lux-gold input-glow pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lux-text-light hover:text-lux-navy transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading || paymentState === "initiating"} className="w-full bg-lux-gold hover:bg-lux-gold-dark text-white font-heading font-bold h-11 rounded-lg shadow-lg shadow-lux-gold/25 hover:shadow-xl transition-all btn-shine">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {needsPayment && (
            <div className="space-y-3 pt-2 border-t border-lux-gold/10">
              <Button
                type="button"
                disabled={paymentState === "initiating"}
                onClick={handleRetryPayment}
                className="w-full bg-lux-navy hover:bg-lux-navy/90 text-white font-heading font-bold h-11 rounded-lg shadow-lg transition-all"
              >
                {paymentState === "initiating" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Phone className="h-4 w-4" />
                )}
                {paymentState === "initiating" ? "Initiating Payment..." : "Pay KES 1,000 via M-Pesa"}
              </Button>
            </div>
          )}

          <p className="text-center text-sm text-lux-text-light">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-lux-gold hover:text-lux-gold-dark font-semibold transition-colors">
              Register here
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  )
}
