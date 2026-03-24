'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { HomepageTestimonialsBlock } from '@/src/types/strapi'

interface TestimonialsBlockProps {
  data: HomepageTestimonialsBlock
}

export function TestimonialsBlock({ data }: TestimonialsBlockProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const testimonialsPerPage = 3
  const totalPages = Math.ceil(data.items.length / testimonialsPerPage)

  if (!data.items || data.items.length === 0) {
    return null
  }

  const currentTestimonials = data.items.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  )

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const avatarColors = ['bg-pink-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200', 'bg-red-200']

  return (
    <section className="py-20 bg-linear-to-b from-sky-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Authentic stories from patients whose smiles—and confidence—have been transformed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.content}</p>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${avatarColors[(currentPage * testimonialsPerPage + index) % avatarColors.length]} rounded-full flex items-center justify-center`}>
                  <span className="text-xl font-semibold text-gray-700">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevPage}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-50 transition-colors"
            aria-label="Previous testimonials"
          >
            <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentPage ? 'bg-sky-600 w-8' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextPage}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-50 transition-colors"
            aria-label="Next testimonials"
          >
            <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
