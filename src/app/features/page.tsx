import type { Metadata } from "next"
import FeaturesPageContent from "./features-content"

export const metadata: Metadata = {
  title: "Why Choose Aureus Network - Features",
  description:
    "Discover why thousands of Kenyans choose Aureus Network for referral income. Instant M-Pesa payments, no products to sell, and 24/7 support.",
}

export default function FeaturesPage() {
  return <FeaturesPageContent />
}
