import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-lux-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-lux-text-light hover:text-lux-gold transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-lux-navy heading-underline mb-8">
          Privacy Policy
        </h1>

        <p className="text-sm text-lux-text-light mb-8">
          Last updated: July 28, 2026
        </p>

        <div className="space-y-8 text-lux-text leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">1. Information We Collect</h2>
            <p>
              We collect personal information you voluntarily provide when registering for Zuri Agency, including your full name, phone number, email address, and M-Pesa transaction details. We also collect referral data, commission earnings, and usage analytics to improve our service.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">2. How We Use Your Information</h2>
            <p>
              Your information is used to process membership, track referrals, calculate and disburse commissions via M-Pesa, provide customer support, and communicate platform updates. We may use aggregated data for analytics and platform improvements.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">3. M-Pesa Data Handling</h2>
            <p>
              Your M-Pesa phone number is used exclusively for sending commission payouts. We do not store M-Pesa PINs or full transaction credentials. All M-Pesa transactions are processed through Safaricom&apos;s secure API. We retain transaction records for reconciliation and audit purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">4. Data Protection (DPA Compliance)</h2>
            <p>
              Zuri Agency complies with the Kenya Data Protection Act, 2019. You have the right to access, correct, or delete your personal data. You may request a copy of your data or withdraw consent at any time by contacting us. We implement appropriate technical and organizational measures to protect your data.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">5. Cookies</h2>
            <p>
              We use essential cookies for platform functionality and analytics cookies to improve user experience. You may control cookie preferences through your browser settings. By continuing to use the Platform, you consent to our use of cookies as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">6. Contact</h2>
            <p>
              For any privacy-related inquiries, data requests, or concerns, please contact us at info@zuriagency.co.ke or via WhatsApp at <a href="https://wa.me/254753728292" className="text-lux-gold font-semibold hover:underline">+254 753 728292</a>. We aim to respond within 48 hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
