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
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100">
      {/* Animated floating blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-sky-300/30 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 shadow-lg"
            >
              <motion.span
                className="w-2.5 h-2.5 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sky-700 text-sm font-semibold">Available Today</span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              {data.text}
            </h2>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Join thousands of satisfied patients. Book your free consultation today and discover your perfect smile with our expert team.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <Button 
                  asChild 
                  className="relative bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all overflow-hidden"
                >
                  {isExternal ? (
                    <a
                      href={data.buttonLink}
                      target={data.buttonLink.startsWith('http') ? '_blank' : undefined}
                      rel={data.buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <Calendar className="w-5 h-5 mr-2 relative z-10" />
                      <span className="relative z-10">{data.buttonLabel}</span>
                    </a>
                  ) : (
                    <Link href={data.buttonLink}>
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <Calendar className="w-5 h-5 mr-2 relative z-10" />
                      <span className="relative z-10">{data.buttonLabel}</span>
                    </Link>
                  )}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm border-2 border-sky-300 text-sky-700 hover:bg-white hover:border-sky-400 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <a href="tel:0901123456">
                    <Phone className="w-5 h-5 mr-2" />
                    Call: 0901 123 456
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-slate-600">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-sky-600" />
                <span className="text-sm font-medium">Free Consultation</span>
              </div>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">No Obligation</span>
              </div>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Insurance Accepted</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Glassmorphism card with patient image placeholder */}
            <div className="relative">
              {/* Decorative blur circles */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-sky-400/40 rounded-full blur-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/40 rounded-full blur-2xl"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              {/* Main card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
              >
                {/* Patient image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-slate-700 font-semibold text-lg">Your Perfect Smile</p>
                    <p className="text-slate-500 text-sm mt-2">Starts with a consultation</p>
                  </div>
                </div>

                {/* Floating badge with rating */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-gradient-to-br from-sky-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-yellow-300" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-bold">4.9/5</span>
                  </div>
                  <p className="text-xs mt-1 opacity-90">2,500+ Happy Smiles</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
