import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Earnings & Calculator",
  description: "See our transparent commission structure and calculate your potential earnings with the Aureus Network interactive calculator.",
}

export default function EarningsLayout({ children }: { children: React.ReactNode }) {
  return children
}
