import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/src/components/layout/Header'
import { Footer } from '@/src/components/layout/Footer'
import { getNavigation } from '@/src/lib/api/queries'

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
 * Provides global fonts, styling configuration, header navigation, and footer.
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

export default async function RootLayout({ children }: RootLayoutProps) {
  // Fetch navigation data for header
  const navigation = await getNavigation();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Header navigation={navigation} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
