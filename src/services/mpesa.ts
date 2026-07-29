const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || ""
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET || ""
const PASSKEY = process.env.MPESA_PASSKEY || ""
const BUSINESS_SHORTCODE = process.env.MPESA_BUSINESS_SHORTCODE || "174379"
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL || "https://example.com/api/mpesa/callback"

export async function getAccessToken(): Promise<string> {
  console.log("[M-Pesa] Getting access token...")
  return "mock-access-token-simulated"
}

export async function stkPush(
  phone: string,
  amount: number,
  accountRef: string
): Promise<{
  success: boolean
  checkoutRequestId?: string
  responseDescription?: string
  error?: string
}> {
  console.log("[M-Pesa] STK Push initiated:", { phone, amount, accountRef })

  const checkoutRequestId = `wsr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

  return {
    success: true,
    checkoutRequestId,
    responseDescription: "Success. Request accepted for processing",
  }
}

export async function queryStatus(
  checkoutRequestId: string
): Promise<{
  success: boolean
  resultCode?: string
  resultDesc?: string
}> {
  console.log("[M-Pesa] Querying status:", { checkoutRequestId })

  return {
    success: true,
    resultCode: "0",
    resultDesc: "The service request is processed successfully.",
  }
}

export async function processCallback(body: any): Promise<{
  success: boolean
  resultCode?: string
  resultDesc?: string
  amount?: number
  mpesaReceiptNumber?: string
  phone?: string
  transactionDate?: string
}> {
  console.log("[M-Pesa] Processing callback...")

  const stkCallback = body?.Body?.stkCallback
  if (!stkCallback) {
    console.log("[M-Pesa] Invalid callback body")
    return { success: false }
  }

  const { ResultCode, ResultDesc, CallbackMetadata } = stkCallback

  if (ResultCode !== 0) {
    console.log("[M-Pesa] Transaction failed:", ResultDesc)
    return { success: false, resultCode: String(ResultCode), resultDesc: ResultDesc }
  }

  let amount = 0
  let mpesaReceiptNumber = ""
  let phone = ""
  let transactionDate = ""

  if (CallbackMetadata?.Item) {
    for (const item of CallbackMetadata.Item) {
      switch (item.Name) {
        case "Amount":
          amount = item.Value || 0
          break
        case "MpesaReceiptNumber":
          mpesaReceiptNumber = item.Value || ""
          break
        case "PhoneNumber":
          phone = String(item.Value || "")
          break
        case "TransactionDate":
          transactionDate = String(item.Value || "")
          break
      }
    }
  }

  return {
    success: true,
    resultCode: "0",
    resultDesc: ResultDesc,
    amount,
    mpesaReceiptNumber,
    phone,
    transactionDate,
  }
}
