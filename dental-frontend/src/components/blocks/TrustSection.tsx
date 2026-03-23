import Image from 'next/image'
import type { HomepageTrustBlock } from '@/src/types/strapi'

/**
 * Trust Section Component
 * 
 * Displays trust indicators with statistics and certifications.
 * Builds credibility and social proof.
 * 
 * Design System:
 * - Background: background-secondary
 * - Stats: Large numbers with labels
 * - Certifications: Logo grid
 * - Colors: primary-500 for numbers
 */

interface TrustSectionProps {
  data: HomepageTrustBlock
}

export function TrustSection({ data }: TrustSectionProps) {
  return (
    <section className="trust-section w-full bg-background-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg text-foreground-secondary">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Statistics Grid */}
        {data.stats && data.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {data.stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-6 bg-background rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">
                  {stat.number}
                  {stat.suffix && (
                    <span className="text-3xl md:text-4xl">{stat.suffix}</span>
                  )}
                </div>
                <div className="text-sm md:text-base text-foreground-secondary font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-8">
              {data.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-center p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {cert.image ? (
                    <div className="relative w-24 h-24">
                      <Image
                        src={cert.image.url}
                        alt={cert.image.alt}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </div>
                  ) : (
                    <div className="text-center px-4">
                      <p className="text-sm font-semibold text-foreground">
                        {cert.name}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
