"use client"

import Link from "next/link"
import {
  Mail, Phone, ArrowRight, Shield, Zap, Headphones, Lock, MessageCircle,
  Clock, MapPin, HelpCircle, ChevronRight, CheckCircle2, Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FadeIn, FadeInScale, WhatsAppIcon } from "@/components/landing/shared"

const channels = [
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    detail: "Chat with us instantly",
    description: "This is the fastest way to reach us. Typical response time is under 5 minutes during business hours. Send us a message and we will get back to you before you know it. Best for quick questions, registration help, and urgent support.",
    href: "https://wa.me/254753728292?text=Hello%20Zuri%20Agency%2C%20I%20need%20help%20please",
    color: "#25D366",
    bg: "bg-[#25D366]/10",
    cta: "Chat on WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "info@zuriagency.co.ke",
    description: "Prefer to write everything out? Send us an email and we will respond within 24 hours — usually much faster. Email is best for detailed inquiries, account issues, or when you need to attach documents or screenshots.",
    href: "mailto:info@zuriagency.co.ke",
    color: "#D4AF37",
    bg: "bg-lux-gold-pale",
    cta: "Send Email",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "Mon-Fri, 8am-6pm",
    description: "Speak directly with a real person. Our phone lines are open Monday to Friday, 8:00 AM to 6:00 PM. For urgent matters, we recommend WhatsApp as it is monitored more closely and typically gets the fastest response.",
    href: "tel:+254753728292",
    color: "#0F2847",
    bg: "bg-lux-navy/10",
    cta: "Call Us",
  },
]

const quickAnswers = [
  {
    q: "How do I reset my password?",
    a: "Go to the login page and click 'Forgot Password'. Enter your registered email or phone number and we will send you a reset link. If you do not receive it within 5 minutes, check your spam folder or contact us via WhatsApp for manual assistance.",
  },
  {
    q: "How do I update my M-Pesa number?",
    a: "Send us a message on WhatsApp or email with your full name, registered phone number, and the new M-Pesa number you want to use. Our support team will update it for you within a few hours. You can continue earning on your old number while the update is being processed.",
  },
  {
    q: "When will I receive my payout?",
    a: "Payouts are instant. As soon as someone joins through your referral link and completes their KES 1,000 membership, your KES 350 commission is sent directly to your registered M-Pesa. If you have not received your payment within 10 minutes, check that your M-Pesa number is correct in your profile, then contact us for assistance.",
  },
  {
    q: "How do I get my referral link?",
    a: "Your unique referral link is available in your member dashboard immediately after registration. Log in to your account, go to the 'My Link' section, and you will see your personalised link ready to copy and share. If you cannot find it, our support team can resend it to you via WhatsApp.",
  },
]

const trustBadges = [
  { icon: Shield, text: "Trusted by 5,000+ Kenyans" },
  { icon: Zap, text: "Instant M-Pesa Payments" },
  { icon: Headphones, text: "24/7 Support" },
  { icon: Lock, text: "No Hidden Fees" },
]

export default function ContactPageContent() {
  return (
    <div className="min-h-screen bg-lux-cream overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lux-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lux-navy/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #0F2847 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Badge className="mb-6 px-4 py-2 bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20 font-medium text-sm">
              Get In Touch
            </Badge>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-lux-navy heading-underline leading-tight">
              Contact Us
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg sm:text-xl text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              We are real people behind Zuri Agency, and we take your questions seriously. Whether you are ready to join, curious about how it works, or need help with your account, we are here for you. You are not just a number to us — every person who reaches out matters, and we treat every conversation with the respect and attention it deserves.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="mt-4 text-base text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              Do not hesitate to reach out. Whether your question is big or small, we would rather answer it than have you stay unsure. That is the kind of platform we are building — one where every member feels supported, valued, and confident.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {channels.map((channel, i) => (
              <FadeInScale key={channel.title} delay={i * 100}>
                <a href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined} className="block h-full">
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full card-lift overflow-hidden group cursor-pointer">
                    <CardContent className="p-8 text-center flex flex-col items-center">
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${channel.bg} mb-5 group-hover:scale-110 transition-transform duration-300`} style={{ color: channel.color }}>
                        <channel.icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-lux-navy mb-1">{channel.title}</h3>
                      <p className="text-sm font-medium text-lux-gold-dark mb-3">{channel.detail}</p>
                      <p className="text-lux-text-light leading-relaxed text-sm mb-5">{channel.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-lux-gold-dark group-hover:gap-2.5 transition-all">
                        {channel.cta} <ChevronRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </a>
              </FadeInScale>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Answers */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">
              Quick Help
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">
              Frequently Asked Before Contacting
            </h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              You might find your answer here instantly, saving you the wait. If not, we are just a message away.
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {quickAnswers.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`qa-${i}`}
                  className="border border-lux-gold/10 rounded-xl overflow-hidden bg-lux-cream shadow-sm hover:shadow-md transition-shadow data-[state=open]:border-lux-gold data-[state=open]:bg-lux-gold-pale/30"
                >
                  <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-lux-gold-pale/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-lux-gold-dark flex-shrink-0 mt-0.5" />
                      <span className="font-heading font-semibold text-lux-navy text-base sm:text-lg">{item.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0">
                    <div className="pl-8">
                      <p className="text-lux-text-light leading-relaxed">{item.a}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Office Location & Business Hours */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Office Location */}
            <FadeInScale>
              <Card className="border-0 shadow-md hover:shadow-xl transition-all h-full">
                <CardContent className="p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lux-gold-pale text-lux-gold-dark">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-lux-navy">Office Location</h3>
                      <p className="text-sm text-lux-gold-dark font-medium">Visit Us</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-lux-text-light leading-relaxed">
                    <p>
                      Zuri Agency is proudly headquartered in Nairobi, Kenya. We are a Kenyan company serving Kenyan members, and we believe in being accessible to the people who make our platform what it is.
                    </p>
                    <div className="bg-lux-cream rounded-xl p-5 border border-lux-gold/10">
                      <p className="font-heading font-semibold text-lux-navy">Physical Address</p>
                      <p className="mt-1">Zuri Agency Limited</p>
                      <p>Nairobi, Kenya</p>
                      <p className="mt-2 text-sm">PO Box 12345-00100</p>
                      <p className="text-sm">Nairobi, Kenya</p>
                    </div>
                    <p className="text-sm italic">
                      Please note that our office is primarily for administrative operations. For the fastest response, we recommend reaching out via WhatsApp or email before visiting.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeInScale>

            {/* Business Hours */}
            <FadeInScale delay={100}>
              <Card className="border-0 shadow-md hover:shadow-xl transition-all h-full">
                <CardContent className="p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lux-gold-pale text-lux-gold-dark">
                      <Clock className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-lux-navy">Business Hours</h3>
                      <p className="text-sm text-lux-gold-dark font-medium">When to Reach Us</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-lux-cream rounded-xl p-5 border border-lux-gold/10">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-lux-navy">Monday - Friday</span>
                          <span className="text-lux-text-light">8:00 AM - 6:00 PM</span>
                        </div>
                        <div className="border-t border-lux-gold/10" />
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-lux-navy">Saturday</span>
                          <span className="text-lux-text-light">9:00 AM - 1:00 PM</span>
                        </div>
                        <div className="border-t border-lux-gold/10" />
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-lux-navy">Sunday</span>
                          <span className="text-lux-text-light">Closed</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-lux-gold-pale rounded-xl p-4 border border-lux-gold/20">
                      <div className="flex items-start gap-3">
                        <MessageCircle className="h-5 w-5 text-lux-gold-dark flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-heading font-semibold text-lux-navy text-sm">WhatsApp Bot Available 24/7</p>
                          <p className="text-xs text-lux-text-light mt-1">
                            Even when our team is offline, our automated WhatsApp assistant can help with basic questions, account checks, and registration guidance. A human team member will follow up during business hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInScale>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-lux-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-lux-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-lux-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <Badge className="mb-6 px-4 py-2 bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20 font-medium text-sm inline-flex items-center gap-2">
              <Star className="h-4 w-4" /> Ready to Join?
            </Badge>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Stop Searching. Start Earning.
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              You have done your research. You have seen that we are real, we are responsive, and we are committed to helping you succeed. The next step is simple. For just KES 1,000 — a one-time payment — you can unlock lifetime earning potential. No monthly fees, no hidden costs, no risk.
            </p>
            <p className="mt-4 text-base text-gray-400 max-w-xl mx-auto">
              If you still have questions after reading everything here, message us on WhatsApp. We will answer honestly and give you the information you need to make the right decision for yourself and your family.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-lux-cta hover:bg-lux-cta-hover text-white font-heading font-bold text-lg px-10 h-16 rounded-full shadow-2xl shadow-lux-gold/30 transition-all hover:shadow-lux-gold/40 hover:scale-105 group relative overflow-hidden glow-cta btn-shine">
                  <span className="relative z-10">Join Now - KES 1,000</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </Button>
              </Link>
              <a
                href="https://wa.me/254753728292?text=Hello%20Zuri%20Agency%2C%20I%20need%20help%20please"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-heading font-semibold text-lg px-10 h-16 rounded-full transition-all hover:border-white/50">
                  <WhatsAppIcon className="h-5 w-5 mr-2" />
                  Ask Us on WhatsApp
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {trustBadges.map((item) => (
              <FadeIn key={item.text} delay={100}>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-lux-gold-pale/50 transition-colors">
                  <item.icon className="h-5 w-5 text-lux-gold-dark flex-shrink-0" />
                  <span className="text-sm font-medium text-lux-text">{item.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
