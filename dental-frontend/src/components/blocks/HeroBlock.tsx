'use client';

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/src/components/ui/button'
import type { HomepageHeroBlock } from '@/src/types/strapi'

/**
 * Hero Block Component
 * 
 * Renders a hero section with heading, subheading, CTA button, and image.
 * Used at the top of landing pages for maximum impact.
 * 
 * Design System:
 * - Uses container, padding, and spacing from design system
 * - Typography: text-4xl/5xl/6xl for heading, text-lg/xl for subheading
 * - Colors: foreground, foreground-secondary
 * - Button: Primary variant from design system
 * - Layout: Grid with image on right (desktop)
 */

interface HeroBlockProps {
  data: HomepageHeroBlock
}

export function HeroBlock({ data }: HeroBlockProps) {
  return (
    <section className="hero-block relative w-full bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {data.heading}
            </h1>
            
            {data.subheading && (
              <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
                {data.subheading}
              </p>
            )}

            {/* CTA Button */}
            {data.ctaLabel && data.ctaLink && (
              <div className="pt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button asChild size="lg" variant="primary">
                    <Link href={data.ctaLink}>
                      {data.ctaLabel}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Hero Image */}
          {data.image && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={data.image.url}
                alt={data.image.alt}
                fill
                priority
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
