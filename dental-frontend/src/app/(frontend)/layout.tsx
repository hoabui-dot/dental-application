import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/**
 * Frontend Layout
 * 
 * This layout wraps all public-facing pages (landing pages).
 * It's separate from the admin panel layout to prevent style conflicts.
 */

export const metadata: Metadata = {
  title: {
    template: '%s | Dental Practice',
    default: 'Dental Practice - Professional Dental Care',
  },
  description: 'Professional dental services including implants, whitening, and braces',
}

interface FrontendLayoutProps {
  children: React.ReactNode
}

const FrontendLayout = ({ children }: FrontendLayoutProps) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}

export default FrontendLayout
