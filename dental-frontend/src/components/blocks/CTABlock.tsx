'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import type { HomepageCTABlock } from '@/src/types/strapi'

/**
 * CTA (Call-to-Action) Block Component
 * 
 * Enhanced CTA section with gradient background, trust indicators, and multiple action buttons.
 * Designed to maximize conversions with clear value proposition and urgency.
 * 
 * Design Features:
 * - Gradient background with animated blur effects
 * - Badge with pulse animation for urgency
 * - Large, bold headline
 * - Multiple CTA options (primary + secondary)
 * - Trust indicators at bottom
 * - Fully animated with Framer Motion
 */

interface CTABlockProps {
  data: HomepageCTABlock
}

export function CTABlock({ data }: CTABlockProps) {
  // Determine if link is external or internal
  const isExternal = data.buttonLink.startsWith('http') || data.buttonLink.startsWith('mailto:') || data.buttonLink.startsWith('tel:')

  return (
    <section className="py-20 bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white text-sm font-semibold">Book Today</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {data.text}
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-sky-50 mb-12 max-w-3xl mx-auto leading-relaxed">
            Thousands of patients have trusted us. Book your free consultation today and start your journey to the perfect smile.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                asChild 
                className="bg-white text-sky-600 hover:bg-sky-50 px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all"
              >
                {isExternal ? (
                  <a
                    href={data.buttonLink}
                    target={data.buttonLink.startsWith('http') ? '_blank' : undefined}
                    rel={data.buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    {data.buttonLabel}
                  </a>
                ) : (
                  <Link href={data.buttonLink}>
                    <Calendar className="w-5 h-5 mr-2" />
                    {data.buttonLabel}
                  </Link>
                )}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
              >
                <a href="tel:0901123456">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: 0901 123 456
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span>Free Consultation</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span>No Obligation</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span>Insurance Accepted</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
