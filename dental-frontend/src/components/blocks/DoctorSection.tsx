import Image from 'next/image'
import type { HomepageDoctorBlock } from '@/src/types/strapi'

/**
 * Doctor Section Component
 * 
 * Displays doctor team profiles with credentials.
 * Builds trust by showcasing expertise and experience.
 * 
 * Design System:
 * - Background: background-secondary
 * - Cards: shadow-lg with hover effects
 * - Images: Rounded with border
 */

interface DoctorSectionProps {
  data: HomepageDoctorBlock
}

export function DoctorSection({ data }: DoctorSectionProps) {
  return (
    <section className="doctor-section w-full bg-background-secondary py-16 md:py-24">
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

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {data.doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Doctor Image */}
              {doctor.image ? (
                <div className="relative w-full h-64 bg-neutral-100">
                  <Image
                    src={doctor.image.url}
                    alt={doctor.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {doctor.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-2">
                  {doctor.title}
                </p>
                {doctor.specialization && (
                  <p className="text-sm text-foreground-secondary mb-3">
                    {doctor.specialization}
                  </p>
                )}
                {doctor.bio && (
                  <p className="text-sm text-foreground-secondary leading-relaxed mb-3">
                    {doctor.bio}
                  </p>
                )}
                {doctor.experienceYears && (
                  <div className="flex items-center gap-2 text-sm text-primary-600 font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    <span>{doctor.experienceYears}+ năm kinh nghiệm</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
