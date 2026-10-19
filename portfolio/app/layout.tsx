import type { Metadata } from "next"
import { Cormorant_Garamond, Manrope } from "next/font/google"
import { profile } from "@/lib/content"
import "./globals.css"

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: `${profile.name} — Photographer`,
  description:
    "Photographs of people, places, and the quiet moments in between. Explore selected work and enquire about a photography session.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
