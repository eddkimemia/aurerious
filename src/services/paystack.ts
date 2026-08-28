const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || ""
const PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY || ""
const CALLBACK_URL = process.env.PAYSTACK_CALLBACK_URL || `${process.env.NEXT_PUBLIC_APP_URL || "https://zuriweb.vercel.app"}/api/paystack/callback`

const BASE_URL = "https://api.paystack.co"

function isConfigured(): boolean {
  return !!SECRET_KEY
}

export async function initializeTransaction(params: {
  email: string
  amount: number // in KES, will be converted to kobo
  reference: string
  callbackUrl?: string
  metadata?: Record<string, any>
  phone?: string
}): Promise<{
  success: boolean
  reference?: string
  authorizationUrl?: string
  accessCode?: string
  error?: string
}> {
  if (!isConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error("[Paystack] Not configured in production - failing")
      return { success: false, error: "Payment gateway not configured. Contact support." }
    }
    console.log("[Paystack] Mock initialize (not configured):", params)
    const reference = params.reference
    return {
      success: true,
      reference,
      authorizationUrl: `https://paystack.mock/checkout/${reference}`,
      accessCode: `mock_${reference}`,
    }
  }

  try {
    const body = {
      email: params.email,
      amount: Math.round(params.amount * 100), // KES to kobo
      reference: params.reference,
      callback_url: params.callbackUrl || CALLBACK_URL,
      metadata: {
        phone: params.phone,
        ...params.metadata,
      },
    }

    const res = await fetch(`${BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok || !data.status) {
      console.error("[Paystack] initialize failed", data)
      return {
        success: false,
        error: data.message || "Paystack initialization failed - check API keys",
      }
    }

    return {
      success: true,
      reference: data.data.reference,
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
    }
  } catch (e: any) {
    console.error("[Paystack] initialize exception", e)
    return {
      success: false,
      error: e.message || "Paystack initialization error",
    }
  }
}

export async function verifyTransaction(reference: string): Promise<{
  success: boolean
  status?: string
  amount?: number
  gatewayResponse?: string
  paidAt?: string
  channel?: string
  customerEmail?: string
  metadata?: any
  error?: string
}> {
  if (!isConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error("[Paystack] Mock verify not allowed in production")
      return { success: false, status: "pending", error: "Not configured" }
    }
    console.log("[Paystack] Mock verify (not configured):", reference)
    return {
      success: true,
      status: "success",
      amount: 100000,
      gatewayResponse: "Successful",
      paidAt: new Date().toISOString(),
      channel: "card",
    }
  }

  try {
    const res = await fetch(`${BASE_URL}/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${SECRET_KEY}` },
    })
    const data = await res.json()
    if (!res.ok || !data.status) {
      return { success: false, error: data.message || "Verification failed" }
    }
    const tx = data.data
    return {
      success: tx.status === "success",
      status: tx.status,
      amount: tx.amount,
      gatewayResponse: tx.gateway_response,
      paidAt: tx.paid_at,
      channel: tx.channel,
      customerEmail: tx.customer?.email,
      metadata: tx.metadata,
    }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}

export function verifyWebhookSignature(payload: string, signature: string | null): boolean {
  if (!SECRET_KEY || !signature) return false
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const crypto = require("crypto")
    const hash = crypto.createHmac("sha512", SECRET_KEY).update(payload).digest("hex")
    return hash === signature
  } catch {
    return false
  }
}

export function getPublicKey(): string {
  return PUBLIC_KEY
}
