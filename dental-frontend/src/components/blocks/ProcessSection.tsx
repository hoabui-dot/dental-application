import type { HomepageProcessBlock } from '@/src/types/strapi'

interface ProcessSectionProps {
  data: HomepageProcessBlock
}

const stepIcons = [
  (
    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  (
    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
]

export function ProcessSection({ data }: ProcessSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-linear-to-r from-sky-200 via-sky-400 to-sky-600"></div>

          <div className="grid md:grid-cols-4 gap-8">
            {data.steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-linear-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center mx-auto shadow-lg z-10 relative">
                    {stepIcons[index % stepIcons.length]}
                  </div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-20" style={{ transform: 'translateX(calc(-50% + 2rem))' }}>
                    {index + 1}
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {index < data.steps.length - 1 && (
                  <div className="md:hidden w-1 h-12 bg-linear-to-b from-sky-400 to-sky-600 mx-auto my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
