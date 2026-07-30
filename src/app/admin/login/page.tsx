"use client"

import { useState, FormEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LogIn, ShieldCheck, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { getSession } from "next-auth/react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user?.role === "admin") {
        router.push("/admin")
      } else if (session?.user) {
        router.push("/dashboard")
      } else {
        setLoading(false)
      }
    })
  }, [router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!login || !password) {
      setError("Email/phone and password are required")
      return
    }

    setLoading(true)
    try {
      const result = await signIn("credentials", {
        login,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error === "CredentialsSignin" ? "Invalid credentials" : result.error)
        setLoading(false)
        return
      }

      if (result?.ok) {
        const session = await getSession()
        if (session?.user?.role === "admin") {
          router.push("/admin")
        } else {
          setError("Access denied. Admin privileges required.")
          setLoading(false)
          await signIn("credentials", { login, password, redirect: false })
        }
      }
    } catch {
      setError("Network error. Please try again.")
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-lux-cream flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-lux-gold" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lux-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-lux-navy/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-lux-gold/15 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md border-lux-gold/20 shadow-2xl glass card-lift">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lux-navy shadow-lg shadow-lux-navy/30">
              <ShieldCheck className="h-8 w-8 text-lux-gold" />
            </div>
          </div>
          <CardTitle className="font-heading text-2xl text-lux-navy">Admin Login</CardTitle>
          <CardDescription className="text-lux-text-light">
            Sign in with your administrator credentials
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
                placeholder="admin@aureusnetwork.co.ke"
                className="border-lux-gold/20 focus-visible:border-lux-gold input-glow"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-lux-text">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
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

            <Button type="submit" disabled={loading} className="w-full bg-lux-navy hover:bg-lux-navy-light text-white font-heading font-bold h-11 rounded-lg shadow-lg transition-all">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              {loading ? "Authenticating..." : "Sign In as Admin"}
            </Button>
          </form>

          <p className="text-center text-sm text-lux-text-light">
            <a href="/login" className="text-lux-gold hover:text-lux-gold-dark font-semibold transition-colors">
              Member login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
