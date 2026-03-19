import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/**
 * Root Layout
 * 
 * This layout wraps all pages in the application.
 * Provides global fonts and styling configuration.
 */

export const metadata: Metadata = {
  title: {
    template: '%s | Dental Practice',
    default: 'Dental Practice - Professional Dental Care',
  },
  description: 'Professional dental services including implants, whitening, and braces',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
