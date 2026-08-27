import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NavWrapper } from "@/components/landing/nav-wrapper";
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
  title: {
    default: "Zuri Agency - Refer. Earn. Grow. | Premium Referral Platform",
    template: "%s | Zuri Agency",
  },
  description:
    "A premium referral-based income platform where members earn KES 350 commissions by bringing others into the opportunity. Join for KES 1,000 one-time.",
  keywords: [
    "Zuri Agency", "referral income", "Kenya", "M-Pesa",
    "earn money online", "referral commission", "KES", "passive income",
  ],
  authors: [{ name: "Zuri Agency" }],
  icons: { icon: "/images/logo.svg" },
  openGraph: {
    title: "Zuri Agency - Turn Your Network Into Monthly Income",
    description: "Earn 35% commission on every person you refer. No products to sell. Join for KES 1,000.",
    url: "https://zuriagency.co.ke",
    siteName: "Zuri Agency",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuri Agency - Turn Your Network Into Monthly Income",
    description: "Earn KES 350 per referral. Join thousands of Kenyans building referral income.",
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
