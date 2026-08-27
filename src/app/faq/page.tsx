import type { Metadata } from "next"
import FaqPageContent from "./faq-content"

export const metadata: Metadata = {
  title: "FAQ - Zuri Agency",
  description:
    "Frequently asked questions about Zuri Agency referral platform. Learn about costs, earnings, payments, and more.",
}

export default function FaqPage() {
  return <FaqPageContent />
}
