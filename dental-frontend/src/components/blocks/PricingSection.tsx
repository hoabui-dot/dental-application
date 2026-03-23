import Link from 'next/link'
import type { HomepagePricingBlock } from '@/src/types/strapi'

interface PricingSectionProps {
  data: HomepagePricingBlock
}

export function PricingSection({ data }: PricingSectionProps) {
  return (
    <section className="py-20 bg-white" id="pricing">
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

        <div className="grid md:grid-cols-3 gap-8">
          {data.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 transition-all duration-300 ${
                plan.isPopular
                  ? 'outline-2 outline-sky-500 shadow-2xl scale-105'
                  : 'outline-2 outline-sky-100 hover:border-sky-200 hover:shadow-xl'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-linear-to-r from-sky-500 to-sky-600 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                {plan.description && (
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                )}
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                </div>
                {plan.period && (
                  <p className="text-gray-600">{plan.period}</p>
                )}
              </div>

              {plan.features && plan.features.length > 0 && (
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.id} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {plan.ctaLabel && plan.ctaLink && (
                <Link
                  href={plan.ctaLink}
                  className={`block w-full py-4 rounded-full text-lg text-center font-semibold transition-colors ${
                    plan.isPopular
                      ? 'bg-sky-600 hover:bg-sky-700 text-white'
                      : 'bg-sky-50 hover:bg-sky-100 text-sky-600'
                  }`}
                >
                  {plan.ctaLabel}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All plans include consultation and personalized care. Insurance accepted.
          </p>
          <Link href="/pricing" className="text-sky-600 font-semibold hover:text-sky-700">
            Compare All Plans →
          </Link>
        </div>
      </div>
    </section>
  )
}
