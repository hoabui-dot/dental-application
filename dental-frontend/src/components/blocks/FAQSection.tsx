'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { HomepageFAQBlock } from '@/src/types/strapi'

interface FAQSectionProps {
  data: HomepageFAQBlock
}

export function FAQSection({ data }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-xl text-gray-600">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {data.questions.map((item, index) => (
            <div
              key={item.id}
              className="bg-linear-to-br from-white to-sky-50 border border-sky-200 rounded-2xl px-6 overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 text-left hover:no-underline"
              >
                <div className="flex items-start gap-4 pr-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-4">
                    <span className="font-semibold text-gray-900 text-lg">
                      {item.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 shrink-0 mt-1 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="text-gray-600 pl-14 pr-4 pb-6 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-sky-50 rounded-2xl p-8">
          <p className="text-gray-700 mb-4">
            Vẫn còn thắc mắc? Chúng tôi sẵn sàng hỗ trợ!
          </p>
          <Link
            href="/contact"
            className="text-sky-600 font-semibold hover:text-sky-700 transition-colors"
          >
            Liên hệ với chúng tôi →
          </Link>
        </div>
      </div>
    </section>
  )
}
