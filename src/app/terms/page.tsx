import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          Terms &amp; Conditions
        </h1>

        <p className="text-sm text-lux-text-light mb-8">
          Last updated: July 28, 2026
        </p>

        <div className="space-y-8 text-lux-text leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Zuri Agency (&quot;the Platform&quot;), you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use the Platform. These terms apply to all visitors, members, and users of Zuri Agency.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">2. Membership &amp; Fees</h2>
            <p>
              Membership to Zuri Agency requires a one-time non-refundable fee of KES 1,000. This fee grants you access to a unique referral link, a member dashboard, and the ability to earn commissions. There are no recurring or monthly fees associated with membership.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">3. Commission Structure</h2>
            <p>
              Members earn a commission of KES 350 (35% of KES 1,000) for each direct referral who joins through their unique link. Additionally, members earn an override commission of KES 150 (15% of KES 1,000) for referrals made by their direct downline members. Commissions are paid via M-Pesa and are subject to verification.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">3.1 Signup Bonus</h2>
            <p>
              Every new member receives a <strong>KES 500 airtime bonus</strong> credited instantly upon successful payment of the KES 1,000 membership fee. This bonus is displayed as &quot;locked&quot; in your dashboard and becomes withdrawable only after you achieve <strong>5 successful direct referrals</strong> (completed status). The bonus is then automatically unlocked and added to your withdrawable balance. The signup bonus is a one-time reward per account and cannot be transferred.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">4. Prohibited Activities</h2>
            <p>
              Members may not engage in spam, fraudulent activities, misrepresentation, or any form of coercion to recruit new members. Any violation may result in immediate suspension of account and forfeiture of commissions. Users must not create multiple accounts or use automated systems to generate referrals.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">5. Limitation of Liability</h2>
            <p>
              Zuri Agency is provided on an &ldquo;as is&rdquo; basis. We make no guarantees regarding earnings or continued availability of the platform. We are not liable for any indirect, incidental, or consequential damages arising from your use of the Platform. The maximum liability shall not exceed the membership fee paid.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-lux-navy mb-3">6. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Members will be notified of material changes via email or platform announcement. Continued use of the Platform after changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
