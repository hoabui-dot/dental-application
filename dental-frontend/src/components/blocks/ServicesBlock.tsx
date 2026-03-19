import Image from 'next/image'
import { getMediaUrl, getMediaAlt } from '@/src/lib/api/queries'
import type { Page } from '@/src/types/strapi'

/**
 * Services Block Component
 * 
 * Renders a grid of service cards with images and descriptions.
 * Perfect for showcasing dental services like implants, whitening, braces.
 */

// Extract Services block type from Page layout
type ServicesBlock = Extract<Page['layout'][number], { blockType: 'services' }>

interface ServicesBlockProps {
  data: ServicesBlock
}

export function ServicesBlock({ data }: ServicesBlockProps) {
  // Handle empty items array
  if (!data.items || data.items.length === 0) {
    return null
  }

  return (
    <section className="services-block w-full bg-background-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        {data.heading && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {data.heading}
            </h2>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((service, index) => {
            const imageUrl = getMediaUrl(service.image, 'card')
            const imageAlt = getMediaAlt(service.image, service.title)

            return (
              <div
                key={index}
                className="service-card group bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border"
              >
                {/* Service Image */}
                {imageUrl && (
                  <div className="relative w-full h-[250px] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Service Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  
                  <p className="text-foreground-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
