import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NavWrapper } from "@/components/landing/nav-wrapper";
import { PromoTopBar } from "@/components/landing/promo-top-bar";
import { SiteFooter } from "@/components/landing/footer-section";
import { CookieBanner } from "@/components/landing/cookie-banner";
import { SocialProofToast } from "@/components/landing/social-proof";
import { BackToTop } from "@/components/landing/back-to-top";
import { DashboardWrapper } from "@/components/landing/dashboard-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zuriagency.co.ke"),
  title: {
    default: "Zuri Agency - Refer. Earn. Grow. | Premium Referral Platform",
    template: "%s | Zuri Agency",
  },
  description:
    "A premium referral-based income platform where members earn KES 350 commissions by bringing others into the opportunity. Join for KES 1,000 one-time. Get KES 500 bonus instantly.",
  keywords: [
    "Zuri Agency", "referral income", "Kenya", "M-Pesa",
    "earn money online", "referral commission", "KES", "passive income",
  ],
  authors: [{ name: "Zuri Agency" }],
  icons: { icon: "/images/logo.svg" },
  openGraph: {
    title: "Zuri Agency - Turn Your Network Into Monthly Income",
    description: "Invest KES 1,000 once → Get KES 500 bonus instantly + Earn KES 350 per referral for life. 50% payout. 5,000+ Kenyans earning. Join now.",
    url: "https://zuriagency.co.ke",
    siteName: "Zuri Agency",
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: "/images/heror.jpg",
        width: 1200,
        height: 630,
        alt: "Zuri Agency - Premium Referral Platform - Earn KES 350 Per Referral + KES 500 Bonus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuri Agency - Turn Your Network Into Monthly Income",
    description: "Invest KES 1,000 → Get KES 500 bonus + Earn KES 350 per referral for life. 5,000+ earning. Instant Paystack & M-Pesa.",
    images: ["/images/heror.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex min-h-screen flex-col`}
      >
        <PromoTopBar />
        <NavWrapper />
        <DashboardWrapper>
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster />
          <SocialProofToast />
          <CookieBanner />
          <BackToTop />
        </DashboardWrapper>
      </body>
    </html>
  );
}
