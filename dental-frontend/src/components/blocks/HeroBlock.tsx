import Image from 'next/image'
import { getMediaUrl, getMediaAlt } from '@/src/lib/api/queries'
import type { Page } from '@/src/types/strapi'

/**
 * Hero Block Component
 * 
 * Renders a hero section with heading, subheading, and image.
 * Used at the top of landing pages for maximum impact.
 */

// Extract Hero block type from Page layout
type HeroBlock = Extract<Page['layout'][number], { blockType: 'hero' }>

interface HeroBlockProps {
  data: HeroBlock
}

export function HeroBlock({ data }: HeroBlockProps) {
  // Extract media URL and alt text
  const imageUrl = getMediaUrl(data.image, 'desktop')
  const imageAlt = getMediaAlt(data.image, data.heading)

  return (
    <section className="hero-block relative w-full bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {data.heading}
            </h1>
            
            {data.subheading && (
              <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
                {data.subheading}
              </p>
            )}
          </div>

          {/* Hero Image */}
          {imageUrl && (
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
