import type { Metadata } from "next"
import FaqPageContent from "./faq-content"

export const metadata: Metadata = {
  title: "FAQ - Aureus Network",
  description:
    "Frequently asked questions about Aureus Network referral platform. Learn about costs, earnings, payments, and more.",
}

export default function FaqPage() {
  return <FaqPageContent />
}
