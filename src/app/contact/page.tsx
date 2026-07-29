import type { Metadata } from "next"
import ContactPageContent from "./contact-content"

export const metadata: Metadata = {
  title: "Contact Us - Aureus Network",
  description:
    "Get in touch with Aureus Network. We're here to help via WhatsApp, email, or phone.",
}

export default function ContactPage() {
  return <ContactPageContent />
}
