"use client"

import Link from "next/link"
import { MessageCircle, Mail, Phone, HelpCircle, ArrowRight, ThumbsUp, XCircle, CheckCircle2, Lightbulb, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FadeIn, FadeInScale, WhatsAppIcon } from "@/components/landing/shared"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "How much does it cost to join?",
    a: "A one-time membership fee of KES 1,000 — and you get KES 500 bonus instantly credited. That’s 50% back on day one. No recurring charges, no hidden fees, no monthly subscriptions, no annual renewals, no maintenance costs — just a single payment that gives you lifetime access to the referral platform. You pay once and earn forever. Many people ask if there are any other costs down the line, and the answer is always no. Whether you refer one person or one thousand, you never pay another shilling. This is what makes Zuri Agency different from every other opportunity out there. When you see platforms charging monthly fees or requiring minimum purchases, you know they are not built for your success. We are different because we only win when you win.",
  },
  {
    q: "How do I earn?",
    a: "You earn KES 350 for every person who joins through your referral link. That is a 35% commission on the KES 1,000 membership fee, which is one of the highest commission rates you will find anywhere. But it does not stop there. You also earn a KES 150 override every time one of your referrals refers someone else. This second-tier commission means your income can grow exponentially as your team expands. There is no limit to how many people you can refer or how much you can earn. Some of our top members earn KES 10,000+ per month simply by sharing their link consistently. A few dedicated members earn KES 50,000 or more. Your income is directly tied to your effort, and there is no ceiling holding you back.",
  },
  {
    q: "Do I need to sell anything?",
    a: "No. This is a pure referral platform. There are no products to sell, no inventory to manage, no minimum purchase targets to hit, no sales quotas to meet, and no monthly volume requirements. You are simply sharing an opportunity with people who might be interested in earning extra income themselves. Think of it like recommending a good restaurant to a friend — you are not selling anything, you are just sharing something valuable that has worked for you. The platform handles everything else. When someone joins through your link, they become a member with the same benefits you enjoy. They do not buy a product; they join a community.",
  },
  {
    q: "How do I get paid?",
    a: "Payments are sent directly to your M-Pesa immediately when someone joins using your referral link. There is no minimum payout threshold, no waiting for end of month, no processing delays, no approval queues, and no manual verification steps. The money hits your phone instantly. If you refer someone at 3 PM, you will see the M-Pesa message before 3:05 PM. You can use the money immediately — withdraw it at an agent, send it to family, buy airtime, pay for goods, or transfer it to your bank. It is your money, and you get it right away. This instant payment system is one of the most appreciated features of our platform because it gives you immediate financial feedback.",
  },
  {
    q: "Is this a pyramid scheme?",
    a: "No. Absolutely not. Zuri Agency is a legitimate referral-based income platform that is fully compliant with Kenyan regulations. Pyramid schemes are illegal because they require payment for the right to recruit others and they promise returns that come primarily from recruiting, not from any underlying product or service. Our model is completely different. You earn commissions when real people choose to join a real platform that provides real value — the ability to earn referral income themselves. There are no recruitment targets, no penalties for inactivity, no complex compensation plans designed to confuse you. We are transparent about how everything works, and we welcome scrutiny from regulators, journalists, or anyone who wants to understand our model.",
  },
  {
    q: "Can I join from anywhere in Kenya?",
    a: "Yes. As long as you have M-Pesa and some form of internet access — even basic mobile data on a feature phone — you can join and start earning from anywhere in the country. Whether you are in Nairobi's CBD, Kisumu's lakeside, Mombasa's coast, Nakuru's town centre, Eldoret, Nyeri, Machakos, or a rural village in Baringo, Turkana, or Taita Taveta, the platform works exactly the same way. You do not need a smartphone, though it makes things easier. A basic phone with internet capability is enough to register and share your link. Location has never been a barrier to earning with Zuri Agency, and we are proud that our members come from every corner of Kenya.",
  },
  {
    q: "What happens if I stop referring?",
    a: "If you stop referring, you simply stop earning new commissions. That is it. Any commissions you have already earned and that have been processed remain yours permanently — we never claw back paid commissions. There are no penalties for inactivity, no account closure due to dormancy, no reactivation fees, and no loss of your team. Your account stays active indefinitely. You can take a break for six months, travel, focus on other priorities, come back, and pick up right where you left off. This flexibility is especially valuable for students during exam periods, parents during busy seasons like December, or anyone whose life circumstances change. With Zuri Agency, you are always in control.",
  },
  {
    q: "How quickly do I get paid?",
    a: "Instantly. The moment someone joins through your link and completes their KES 1,000 membership payment, your KES 350 commission is triggered and sent to your M-Pesa automatically. There are absolutely no delays, no processing queues, no manual approval steps, no waiting for a payout run at the end of the week. The entire system is fully automated and works in real time. Many of our members report receiving their M-Pesa notification within 60 seconds of their referral completing registration. This instant payment system is one of the main reasons people love and trust Zuri Agency — because you see the results of your effort immediately, not after a long waiting period.",
  },
  {
    q: "Is Zuri Agency registered in Kenya?",
    a: "Yes, Zuri Agency is fully registered and compliant with all relevant Kenyan business regulations. We operate transparently under Kenyan law and follow all applicable rules governing digital platforms and referral-based income models in Kenya. Our headquarters are based in Nairobi, and we work exclusively with local payment providers to ensure seamless M-Pesa integration. You can be completely confident that you are joining a legitimate, professionally run organisation that is here for the long term. We are not some foreign company trying to extract money from Kenyans — we are Kenyans, building for Kenyans, and we are committed to operating with integrity and transparency at every level.",
  },
  {
    q: "What if I don't know anyone to refer?",
    a: "You know more people than you realise. Most of us interact with dozens of people every single day without thinking about it. Start with your immediate circle: family members, close friends, neighbours, church members, former classmates from primary and secondary school, colleagues from previous jobs, people in your WhatsApp groups, parents at your children's school, your boda boda rider, your regular shopkeeper. Most people have 50 to 100 people in their natural network without even realising it. We also provide training materials, pre-written messages, graphics, and sharing tips to help you expand your reach and communicate effectively. Many of our most successful members started with just five close contacts and grew from there. You do not need a big network — you just need to start with the people who already know and trust you.",
  },
  {
    q: "Can I use my wife's or husband's M-Pesa to receive payments?",
    a: "Yes, absolutely. You can use any M-Pesa number that you have access to, whether it is your own, your spouse's, your parent's, your sibling's, or even a trusted friend's. Many of our members use a family member's M-Pesa line if they do not have their own line or if their own line is registered in someone else's name. The important thing is that the number you register with is one where you can reliably receive money. You can also update your M-Pesa number later if needed by simply contacting our support team. We understand that not every Kenyan has their own personal M-Pesa line, especially younger members or those in rural areas, and we have designed the platform to be flexible enough to accommodate everyone.",
  },
  {
    q: "How long does it take to see results?",
    a: "This varies from person to person, but many of our members earn their first commission within hours of joining simply by sharing their link with a few close contacts. For most people, it takes between a few days and a week to get their first referral. The key factors are consistency and activity — share your link daily in different places, talk to people about the opportunity naturally, and follow up with those who show interest. Unlike traditional employment where you work an entire month before seeing a salary, referral income can start flowing from the very first day. Your first KES 350 could be in your M-Pesa today if you share your link with the right person. Some of our most committed members earn their first KES 1,000 within their first week.",
  },
]

const myths = [
  {
    myth: "It is a pyramid scheme",
    reality: "Pyramid schemes are illegal because they inevitably collapse when recruitment slows down, leaving most participants with losses. Zuri Agency is fundamentally different. We are a sustainable referral-based platform that provides ongoing value to every member regardless of whether they recruit others. The platform does not depend on endless recruitment to survive. Members earn commissions for introducing new people to a legitimate service, and the platform continues operating normally regardless of growth rate. There are no recruitment fees beyond the one-time KES 1,000 membership, no pressure to recruit a minimum number of people, and the business model is transparent and simple. We welcome any scrutiny because we have nothing to hide. Our model is legal, ethical, and built to last.",
    icon: XCircle,
  },
  {
    myth: "You need to recruit many people to earn anything meaningful",
    reality: "Even a single referral earns you KES 350 instantly — that is real money you can use immediately for airtime, food, transport, or anything else. You do not need a large team to see value from Zuri Agency. Many of our members are perfectly happy earning an extra KES 1,000 to KES 3,000 per month by referring just a handful of people. That extra income can make a real difference — covering your daily transport, buying data bundles, or treating your family on the weekend. The override bonus for building a team is an additional benefit that you can choose to pursue or ignore. You earn at your own pace, at your own comfort level, with no pressure from anyone.",
    icon: XCircle,
  },
  {
    myth: "Only people in Nairobi can earn good money",
    reality: "This could not be further from the truth. Some of our most successful and highest-earning members are based in rural areas and smaller towns far from Nairobi. Since the entire platform operates through M-Pesa and mobile internet, your physical location is completely irrelevant to your earning potential. A member in Busia County can earn just as much as a member in Kilimani, Nairobi. In fact, members in less saturated areas often find it easier to grow their network quickly because the concept of referral-based income is newer and more exciting to people in their community. When everyone in Nairobi is already being bombarded with opportunities, being the first person in your rural town to introduce this concept gives you a massive advantage.",
    icon: XCircle,
  },
  {
    myth: "You need special skills, experience, or a large social media following",
    reality: "If you can share a link, you can earn. There is absolutely no training course required, no technical expertise needed, no sales experience necessary, and no social media following required. The platform handles everything automatically — tracking referrals, processing payments, managing accounts. Your only job is to let people know that the opportunity exists. We provide ready-made messages, graphics, and promotional resources so you do not even need to write your own content or design your own materials. If you can use WhatsApp to send a message to a friend, you already have all the skills you need to succeed with Zuri Agency. It really is that simple.",
    icon: XCircle,
  },
]

export default function FaqPageContent() {
  return (
    <div className="min-h-screen bg-lux-cream overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lux-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lux-navy/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #0F2847 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Badge className="mb-6 px-4 py-2 bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20 font-medium text-sm">
              FAQ
            </Badge>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-lux-navy heading-underline leading-tight">
              Frequently Asked Questions
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg sm:text-xl text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              We understand you have questions. In fact, the more questions you ask, the more serious you are about changing your financial situation. Here are the answers we give every day to people just like you — people who want a genuine opportunity but need clarity before taking that first step. We believe that an informed decision is the best decision, which is why we have been as thorough and transparent as possible in every answer below.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="mt-4 text-base text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              If you do not find your question answered here, please do not hesitate to contact us directly. We would rather answer your questions than have you walk away unsure. Every question you ask brings you one step closer to making a decision that could change your financial future.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="mt-4 text-sm text-lux-text-light max-w-xl mx-auto leading-relaxed italic">
              Quick tip: If you are in a hurry, scroll through the questions below first. We have organised them from the most commonly asked to the more specific ones. Chances are, your question is already answered here.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="pb-8 lg:pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
            {[
              { number: "KES 1,000", label: "One-Time Fee", sub: "No monthly charges ever" },
              { number: "KES 350", label: "Per Direct Referral", sub: "Paid instantly to M-Pesa" },
              { number: "KES 150", label: "Team Override", sub: "Earn from your team's referrals" },
              { number: "24/7", label: "Support Available", sub: "WhatsApp, email & phone" },
            ].map((stat, i) => (
              <FadeInScale key={stat.label} delay={i * 60}>
                <Card className="border-0 shadow-sm text-center bg-white hover:shadow-md transition-all duration-300">
                  <CardContent className="p-5 lg:p-6">
                    <p className="font-heading font-bold text-xl sm:text-2xl text-lux-gold-dark">{stat.number}</p>
                    <p className="font-heading font-semibold text-sm text-lux-navy mt-1">{stat.label}</p>
                    <p className="text-xs text-lux-text-light mt-0.5">{stat.sub}</p>
                  </CardContent>
                </Card>
              </FadeInScale>
            ))}
          </div>
          <FadeIn>
            <p className="mt-8 text-center text-sm text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              These numbers represent the core of how Zuri Agency works. No complicated calculations, no confusing tiers, no fine print. Just straightforward earnings that you can count on. Every figure above is fixed and transparent — what you see is exactly what you get.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lux-gold/30 to-transparent" />
              <span className="text-sm font-medium text-lux-gold-dark flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" /> 12 Most Common Questions
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lux-gold/30 to-transparent" />
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-lux-gold/10 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow data-[state=open]:border-lux-gold data-[state=open]:bg-lux-gold-pale/30"
                >
                  <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-lux-gold-pale/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-lux-gold-dark flex-shrink-0 mt-0.5" />
                      <span className="font-heading font-semibold text-lux-navy text-base sm:text-lg">{faq.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-0">
                    <div className="pl-8">
                      <p className="text-lux-text-light leading-relaxed">{faq.a}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-10 text-center text-sm text-lux-text-light max-w-lg mx-auto">
              Still have questions after reading these answers? That is completely normal. Every person's situation is unique, and some concerns need a personal conversation. Scroll down to reach out to us directly.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Common Myths Debunked */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">
              Separating Fact from Fiction
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">
              Common Myths Debunked
            </h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              There is a lot of misinformation out there — some from competitors, some from people who do not fully understand the model, and some from simple scepticism. Let us set the record straight with facts, not fear.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {myths.map((item, i) => (
              <FadeInScale key={item.myth} delay={i * 80}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-red-500">Myth</span>
                        <p className="font-heading font-bold text-lg text-lux-navy mt-1">{item.myth}</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-500">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-green-600">Reality</span>
                          <p className="text-lux-text mt-1 leading-relaxed">{item.reality}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInScale>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time Guarantee */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-lux-gold-pale text-lux-gold-dark border border-lux-gold/20">
              We Are Here for You
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-lux-navy heading-underline">
              Our Commitment to You
            </h2>
            <p className="mt-6 text-lg text-lux-text-light max-w-2xl mx-auto leading-relaxed">
              When you reach out to Zuri Agency, you are not talking to a chatbot or an outsourced call centre. You are talking to real people who genuinely care about helping you succeed. Here is what you can expect from us.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <FadeInScale delay={0}>
              <Card className="border-0 shadow-md h-full text-center">
                <CardContent className="p-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] mb-5">
                    <MessageCircle className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-lux-navy mb-3">WhatsApp Response</h3>
                  <p className="text-3xl font-heading font-extrabold text-lux-gold-dark mb-2">&lt; 5 Minutes</p>
                  <p className="text-sm text-lux-text-light leading-relaxed">
                    During business hours, we typically respond within minutes. Our team monitors WhatsApp closely because we know that when you have a question, you want an answer immediately, not tomorrow.
                  </p>
                </CardContent>
              </Card>
            </FadeInScale>
            <FadeInScale delay={80}>
              <Card className="border-0 shadow-md h-full text-center">
                <CardContent className="p-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-lux-gold-pale text-lux-gold-dark mb-5">
                    <Mail className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-lux-navy mb-3">Email Response</h3>
                  <p className="text-3xl font-heading font-extrabold text-lux-gold-dark mb-2">&lt; 24 Hours</p>
                  <p className="text-sm text-lux-text-light leading-relaxed">
                    Most emails are answered within a few hours, but we guarantee a response within 24 hours at the latest. If you need faster help, WhatsApp is always the better option for urgent matters.
                  </p>
                </CardContent>
              </Card>
            </FadeInScale>
            <FadeInScale delay={160}>
              <Card className="border-0 shadow-md h-full text-center">
                <CardContent className="p-8">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-lux-navy/10 text-lux-navy mb-5">
                    <Phone className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-lux-navy mb-3">Phone Support</h3>
                  <p className="text-3xl font-heading font-extrabold text-lux-gold-dark mb-2">Mon-Fri, 8-6</p>
                  <p className="text-sm text-lux-text-light leading-relaxed">
                    Speak directly with a team member during business hours. For quick questions, WhatsApp is faster. For detailed discussions or account issues, a phone call might be more effective.
                  </p>
                </CardContent>
              </Card>
            </FadeInScale>
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="pb-20 lg:pb-28">
        <FadeIn>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mb-10 text-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lux-gold/30 to-transparent" />
              <span className="text-sm font-medium text-lux-gold-dark flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> Need Personal Help?
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lux-gold/30 to-transparent" />
            </div>
            <p className="text-lux-text-light text-sm max-w-xl mx-auto leading-relaxed">
              Not everyone finds their answer in a FAQ page, and that is okay. Some questions need a conversation, not a paragraph. If you are still unsure about anything — cost, process, timing, or whether this is right for you — please talk to us. We have helped thousands of Kenyans make this decision, and we would be honoured to help you too.
            </p>
          </div>
        </FadeIn>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-lux-navy to-lux-navy-light text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-80 h-80 bg-lux-gold/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-lux-gold/5 rounded-full blur-3xl" />
              <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-lux-gold/8 rounded-full blur-2xl" />
              <CardContent className="p-8 sm:p-12 text-center relative z-10">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-lux-gold" />
                <h3 className="font-heading font-bold text-2xl sm:text-3xl mb-3">Still Have Questions?</h3>
                <p className="text-gray-300 mb-2 max-w-md mx-auto leading-relaxed">
                  We understand that every person's situation is different. Maybe your specific concern was not covered above, or maybe you need a more personal conversation to feel completely confident before joining. That is completely understandable, and we welcome it. In fact, we prefer that you ask every question you have rather than join with doubts.
                </p>
                <p className="text-gray-300 mb-2 max-w-md mx-auto leading-relaxed">
                  Reach out to us directly on any of the channels below. We will give you the honest answer you deserve — no pressure, no sales pitch, no high-pressure tactics, no automated responses. Just a real person having a real conversation with you. That is how we treat every single person who reaches out to us.
                </p>
                <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed text-sm">
                  We respond to WhatsApp messages within minutes during business hours, and emails within 24 hours (usually much faster). You are never ignored when you reach out to Zuri Agency. Every message gets a response from a real human being who genuinely wants to help you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <a
                    href="https://wa.me/254753728292"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold transition-all hover:scale-105"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    WhatsApp Us
                  </a>
                  <a
                    href="mailto:info@zuriagency.co.ke"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all hover:scale-105 border border-white/20"
                  >
                    <Mail className="h-5 w-5" />
                    Send Email
                  </a>
                  <a
                    href="tel:+254753728292"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all hover:scale-105 border border-white/20"
                  >
                    <Phone className="h-5 w-5" />
                    Call Us
                  </a>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-heading font-semibold rounded-full px-8">
                    Visit Full Contact Page <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
