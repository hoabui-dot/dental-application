import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import type { Page } from '@/src/types/strapi'

/**
 * CTA (Call-to-Action) Block Component
 * 
 * Renders a prominent call-to-action section with text and button.
 * Used to drive conversions (e.g., "Book Appointment", "Contact Us").
 */

// Extract CTA block type from Page layout
type CTABlock = Extract<Page['layout'][number], { blockType: 'cta' }>

interface CTABlockProps {
  data: CTABlock
}

export function CTABlock({ data }: CTABlockProps) {
  // Determine if link is external or internal
  const isExternal = data.link.startsWith('http') || data.link.startsWith('mailto:') || data.link.startsWith('tel:')

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
                href={data.link}
                target={data.link.startsWith('http') ? '_blank' : undefined}
                rel={data.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {data.buttonLabel}
              </a>
            ) : (
              <Link href={data.link}>
                {data.buttonLabel}
              </Link>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
