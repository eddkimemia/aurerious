import type { Metadata } from "next"
import ContactPageContent from "./contact-content"

export const metadata: Metadata = {
  title: "Contact Us - Zuri Agency",
  description:
    "Get in touch with Zuri Agency. We're here to help via WhatsApp, email, or phone.",
}

export default function ContactPage() {
  return <ContactPageContent />
}
