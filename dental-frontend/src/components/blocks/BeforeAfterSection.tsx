'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { HomepageBeforeAfterBlock } from '@/src/types/strapi'

interface BeforeAfterSectionProps {
  data: HomepageBeforeAfterBlock
}

export function BeforeAfterSection({ data }: BeforeAfterSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)

  const validCases = data.cases.filter((c) => c.beforeImage && c.afterImage)

  if (validCases.length === 0) {
    return null
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % validCases.length)
    setSliderPosition(50)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + validCases.length) % validCases.length)
    setSliderPosition(50)
  }

  const currentCase = validCases[currentIndex]

  return (
    <section className="py-20 bg-linear-to-b from-sky-50 to-white">
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

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
            <div className="relative aspect-video">
              <div className="relative w-full h-full">
                {currentCase.afterImage && (
                  <Image
                    src={currentCase.afterImage.url}
                    alt={currentCase.afterImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                )}
                
                <div 
                  className="absolute inset-y-0 left-0 bg-linear-to-r from-sky-900/60 to-transparent overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  {currentCase.beforeImage && (
                    <Image
                      src={currentCase.beforeImage.url}
                      alt={currentCase.beforeImage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      style={{ clipPath: 'inset(0)' }}
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="font-semibold text-gray-900">Before</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-semibold text-gray-900">After</span>
                </div>

                <div 
                  className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-10"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="flex gap-1">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentCase.title}</h3>
              {currentCase.description && (
                <p className="text-gray-600">{currentCase.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-50 transition-colors"
              aria-label="Previous case"
            >
              <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex gap-2">
              {validCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setSliderPosition(50)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-sky-600 w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Go to case ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-50 transition-colors"
              aria-label="Next case"
            >
              <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
