import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Jessica Thompson',
    role: 'Marketing Executive',
    rating: 5,
    text: "I was terrified of dentists until I came here. The team's compassion and expertise completely changed my perspective. My smile has never looked better, and I actually look forward to my appointments now!",
    avatar: 'bg-pink-200',
  },
  {
    id: 2,
    name: 'Robert Kim',
    role: 'Entrepreneur',
    rating: 5,
    text: 'As someone with a busy schedule, I appreciate their efficiency without compromising quality. The smile makeover exceeded my expectations. Best investment I\'ve made in myself!',
    avatar: 'bg-blue-200',
  },
  {
    id: 3,
    name: 'Amanda Foster',
    role: 'Teacher',
    rating: 5,
    text: 'My entire family comes here now. The pediatric care for my kids is exceptional - they actually enjoy going to the dentist! The staff treats us like family, not just patients.',
    avatar: 'bg-green-200',
  },
  {
    id: 4,
    name: 'David Martinez',
    role: 'Software Engineer',
    rating: 5,
    text: 'State-of-the-art technology and genuine care. They explained every procedure clearly and made sure I was comfortable throughout. Highly recommend!',
    avatar: 'bg-yellow-200',
  },
  {
    id: 5,
    name: 'Lisa Chen',
    role: 'Architect',
    rating: 5,
    text: 'The cosmetic work they did transformed not just my smile, but my confidence. Professional, friendly, and absolutely worth it. I smile in every photo now!',
    avatar: 'bg-purple-200',
  },
  {
    id: 6,
    name: 'Michael Brown',
    role: 'Fitness Coach',
    rating: 5,
    text: 'Emergency dental work handled with care and precision. They got me in same day and the results were perfect. This is my dental home for life.',
    avatar: 'bg-red-200',
  },
];

export function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real patients who transformed their smiles
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {currentTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-sky-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${testimonial.avatar} rounded-full flex items-center justify-center`}>
                  <span className="text-xl font-semibold text-gray-700">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevPage}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-50 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6 text-sky-600" />
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPage ? 'bg-sky-600 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-50 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6 text-sky-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
