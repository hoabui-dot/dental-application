import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import type { HomepageCTABlock } from '@/src/types/strapi'

/**
 * CTA (Call-to-Action) Block Component
 * 
 * Renders a prominent call-to-action section with text and button.
 * Used to drive conversions (e.g., "Book Appointment", "Contact Us").
 * 
 * Design System:
 * - Background: primary-600 (sky blue)
 * - Text: white
 * - Button: white background with primary text
 * - Typography: text-3xl/4xl/5xl for heading
 * - Spacing: py-16/20 for vertical padding
 */

interface CTABlockProps {
  data: HomepageCTABlock
}

export function CTABlock({ data }: CTABlockProps) {
  // Determine if link is external or internal
  const isExternal = data.buttonLink.startsWith('http') || data.buttonLink.startsWith('mailto:') || data.buttonLink.startsWith('tel:')

  return (
    <section className="cta-block w-full bg-primary-600 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* CTA Text */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {data.text}
          </h2>

          {/* CTA Button */}
          <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-neutral-50 font-semibold text-lg shadow-lg hover:shadow-xl">
            {isExternal ? (
              <a
                href={data.buttonLink}
                target={data.buttonLink.startsWith('http') ? '_blank' : undefined}
                rel={data.buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {data.buttonLabel}
              </a>
            ) : (
              <Link href={data.buttonLink}>
                {data.buttonLabel}
              </Link>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
