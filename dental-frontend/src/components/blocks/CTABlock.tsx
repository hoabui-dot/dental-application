'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Phone, ArrowRight, Star, Smile } from 'lucide-react'
import type { HomepageCTABlock } from '@/src/types/strapi'

/**
 * CTA (Call-to-Action) Block Component - Premium 2026 Design
 * 
 * Modern, high-conversion CTA section with:
 * - Soft gradient backgrounds (no harsh colors)
 * - Animated floating blobs for depth
 * - Glassmorphism elements
 * - Premium button designs with glow effects
 * - Two-column layout with visual element
 * - Floating badge with patient rating
 * - Smooth animations and micro-interactions
 */

interface CTABlockProps {
  data: HomepageCTABlock
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

export function CTABlock({ data }: CTABlockProps) {
  // Determine if link is external or internal
  const isExternal = data.buttonLink.startsWith('http') || data.buttonLink.startsWith('mailto:') || data.buttonLink.startsWith('tel:')

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Soft gradient background - no harsh colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100"></div>
      
      {/* Animated background blobs for depth */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl"
      ></motion.div>
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
      ></motion.div>
      
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Content Side */}
          <div className="space-y-8">
            {/* Glassmorphism badge */}
            <motion.div 
              variants={fadeInUp}
              className="inline-block px-5 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-sky-100"
            >
              <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Limited Time Offer</span>
            </motion.div>

            {/* Large, bold headline */}
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
            >
              {data.text}
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl"
            >
              Join thousands of satisfied patients. Book your free consultation today and start your journey to the perfect smile.
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {/* Primary Button - Premium with glow effect */}
              <motion.div 
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -4 }} 
                whileTap={{ scale: 0.98 }}
              >
                {isExternal ? (
                  <a
                    href={data.buttonLink}
                    target={data.buttonLink.startsWith('http') ? '_blank' : undefined}
                    rel={data.buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group relative px-8 py-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 font-bold text-lg overflow-hidden"
                  >
                    {/* Shimmer glow effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                    
                    <Calendar className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">{data.buttonLabel}</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  </a>
                ) : (
                  <Link
                    href={data.buttonLink}
                    className="group relative px-8 py-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 font-bold text-lg overflow-hidden"
                  >
                    {/* Shimmer glow effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                    
                    <Calendar className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">{data.buttonLabel}</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  </Link>
                )}
              </motion.div>

              {/* Secondary Button - Glassmorphism style */}
              <motion.div 
                variants={scaleIn}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="tel:0901123456"
                  className="px-8 py-5 bg-white/80 backdrop-blur-md text-slate-900 border-2 border-slate-200 rounded-full hover:bg-white hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold text-lg"
                >
                  <Phone className="w-6 h-6" />
                  <span>Call: 0901 123 456</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              variants={fadeInUp}
              className="pt-6 flex flex-wrap gap-6 text-slate-600"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-base">Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-base">No Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-base">Insurance Accepted</span>
              </div>
            </motion.div>
          </div>

          {/* Visual Side - Image placeholder with glassmorphism */}
          <motion.div
            variants={scaleIn}
            className="relative"
          >
            {/* Main visual card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder for dental clinic image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-sky-100 to-blue-100 relative">
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent"></div>
                
                {/* Placeholder content - replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <Smile className="w-24 h-24 text-sky-400 mx-auto opacity-50" />
                    <p className="text-slate-500 text-sm">
                      Replace with smiling patient image
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating badge with patient rating */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">4.9/5</p>
                    <p className="text-sm text-slate-600">Patient Rating</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative rotating blur circles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-sky-200/50 rounded-full blur-xl"
            ></motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200/50 rounded-full blur-xl"
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
