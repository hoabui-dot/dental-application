'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { HomepageAboutBlock } from '@/src/types/strapi'

/**
 * About Block Component
 * 
 * Renders an about section with title, content, and optional image.
 * Perfect for company introduction, mission statement, or team info.
 * 
 * Design System:
 * - Uses container, padding, and spacing from design system
 * - Typography: text-3xl/4xl for title, text-base for content
 * - Colors: foreground, foreground-secondary
 * - Layout: Grid with image on right (desktop)
 */

interface AboutBlockProps {
  data: HomepageAboutBlock
}

export function AboutBlock({ data }: AboutBlockProps) {
  return (
    <section className="about-block w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {data.title}
            </h2>
            
            <div className="text-base md:text-lg text-foreground-secondary leading-relaxed whitespace-pre-line">
              {data.content}
            </div>
          </motion.div>

          {/* Image */}
          {data.image && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={data.image.url}
                alt={data.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
