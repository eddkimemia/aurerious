import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RefundPage() {
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
          Refund Policy
        </h1>

        <p className="text-sm text-lux-text-light mb-8">
          Last updated: July 28, 2026
        </p>

        <div className="space-y-8 text-lux-text leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">1. Membership Fees Are Non-Refundable</h2>
            <p>
              The one-time membership fee of KES 1,000 is non-refundable. By joining Zuri Agency, you acknowledge that this fee grants you immediate access to the platform, including your referral link, member dashboard, and the ability to earn commissions. Once paid, the fee cannot be refunded.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">2. No Cooling-Off Period</h2>
            <p>
              As a digital service providing immediate access to membership features and earning potential, there is no statutory cooling-off period or right of withdrawal once payment has been made. We encourage you to fully review our platform and FAQ before making payment.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">3. Exceptions</h2>
            <p>
              Refunds may be considered in the following exceptional circumstances at our sole discretion: duplicate payment made in error, technical malfunction that prevents account activation despite multiple attempts, or as otherwise required by applicable law. Refund requests must be submitted within 7 days of payment.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">4. Commission Reversals</h2>
            <p>
              Commissions paid may be reversed if it is determined that a referral was obtained through fraudulent means, the referring member violated our Terms &amp; Conditions, or if the referred member&apos;s membership is canceled due to policy violations. We reserve the right to deduct reversed commissions from future payouts.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">5. How to Request a Refund</h2>
            <p>
              To request a refund under the exceptional circumstances listed above, please contact us at info@zuriagency.co.ke with your full name, phone number, M-Pesa transaction code, and a detailed explanation. We will review your request and respond within 5-7 business days.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">6. Contact Us</h2>
            <p>
              For any questions regarding this refund policy, please reach out to us at info@zuriagency.co.ke or via WhatsApp at 0753728292.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
