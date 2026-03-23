import type { HomepageServicesBlock } from '@/src/types/strapi'

interface ServicesBlockProps {
  data: HomepageServicesBlock
}

const serviceIcons = [
  {
    name: 'sparkles',
    svg: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    name: 'smile',
    svg: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'crown',
    svg: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    name: 'shield',
    svg: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: 'zap',
    svg: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'scissors',
    svg: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
  },
]

export function ServicesBlock({ data }: ServicesBlockProps) {
  if (!data.items || data.items.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.items.map((service, index) => {
            const icon = serviceIcons[index % serviceIcons.length]
            
            return (
              <div
                key={service.id}
                className="group bg-linear-to-br from-white to-sky-50 rounded-3xl p-8 border border-sky-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 bg-linear-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {icon.svg}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <button className="text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more
                  <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 text-lg rounded-full font-semibold transition-colors">
            Show all services
          </button>
        </div>
      </div>
    </section>
  )
}
