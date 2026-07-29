"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LogIn, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

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
        setError(result.error === "CredentialsSignin" ? "Invalid email/phone or password" : result.error)
        return
      }

      if (result?.ok) {
        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
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
          Aureus<span className="text-lux-gold">Network</span>
        </span>
      </div>

      <Card className="w-full max-w-md border-lux-gold/20 shadow-2xl glass card-lift">
        <CardHeader className="text-center pb-2">
          <CardTitle className="font-heading text-2xl text-lux-navy">Welcome Back</CardTitle>
          <CardDescription className="text-lux-text-light">
            Sign in to your Aureus Network account
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

            <Button type="submit" disabled={loading} className="w-full bg-lux-gold hover:bg-lux-gold-dark text-white font-heading font-bold h-11 rounded-lg shadow-lg shadow-lux-gold/25 hover:shadow-xl transition-all btn-shine">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

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
