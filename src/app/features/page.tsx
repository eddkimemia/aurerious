import type { Metadata } from "next"
import FeaturesPageContent from "./features-content"

export const metadata: Metadata = {
  title: "Why Choose Zuri Agency - Features",
  description:
    "Discover why thousands of Kenyans choose Zuri Agency for referral income. Instant M-Pesa payments, no products to sell, and 24/7 support.",
}

export default function FeaturesPage() {
  return <FeaturesPageContent />
}
