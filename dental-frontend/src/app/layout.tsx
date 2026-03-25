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
    template: '%s | Saigon International Dental Clinic',
    default: 'Saigon International Dental Clinic - Professional Dental Services',
  },
  description: 'Professional dental services including dental implants, teeth whitening, and braces',
  icons: {
    icon: 'https://pediatric-expired-through-casinos.trycloudflare.com/uploads/logo_37125485af.png',
    shortcut: 'https://pediatric-expired-through-casinos.trycloudflare.com/uploads/logo_37125485af.png',
    apple: 'https://pediatric-expired-through-casinos.trycloudflare.com/uploads/logo_37125485af.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Fetch navigation data for header
  const navigation = await getNavigation();

  return (
    <html lang="vi">
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
