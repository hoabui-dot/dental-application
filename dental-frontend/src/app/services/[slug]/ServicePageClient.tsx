'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Clock, TrendingUp, DollarSign, Award, Zap, Shield, Calendar,
  Smile, Star, Heart, CheckCircle, Sparkles,
  FileSearch, Wrench, Check, ChevronDown,
  GraduationCap, Users, Phone, ArrowLeft, ArrowRight
} from 'lucide-react';

interface ServicePageClientProps {
  service: any;
  serviceData: any;
}

const iconMap: Record<string, any> = {
  Smile, Star, Heart, CheckCircle, Clock, Sparkles,
  FileSearch, Wrench, Award, Zap, Shield, Calendar,
  GraduationCap, Users
};

export default function ServicePageClient({ service, serviceData }: ServicePageClientProps) {
  const hero = serviceData?.hero || {};
  const intro = serviceData?.intro || {};
  const benefits = serviceData?.benefits || [];
  const process = serviceData?.process || [];
  const pricing = serviceData?.pricing || [];
  const doctor = serviceData?.doctor || {};
  const faqs = serviceData?.faqs || [];

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-sky-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-sky-500 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section with Animations */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                Dental Services
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                {hero.serviceName || service.title}
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                {hero.description || service.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {hero.duration && (
                  <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm">
                    <Clock className="w-5 h-5 text-sky-500" />
                    <div>
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="font-semibold text-gray-900">{hero.duration}</div>
                    </div>
                  </div>
                )}
                
                {hero.recoveryTime && (
                  <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm">
                    <TrendingUp className="w-5 h-5 text-sky-500" />
                    <div>
                      <div className="text-xs text-gray-500">Recovery</div>
                      <div className="font-semibold text-gray-900">{hero.recoveryTime}</div>
                    </div>
                  </div>
                )}

                {hero.priceRange && (
                  <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm">
                    <DollarSign className="w-5 h-5 text-sky-500" />
                    <div>
                      <div className="text-xs text-gray-500">Price</div>
                      <div className="font-semibold text-gray-900">{hero.priceRange}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/booking"
                    className="inline-block px-8 py-4 bg-sky-500 text-white rounded-2xl font-semibold shadow-lg shadow-sky-500/30 hover:bg-sky-600 transition-colors"
                  >
                Book Consultation
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="inline-block px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-shadow"
                  >
                    View Details
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {hero.heroImage && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image 
                    src={hero.heroImage} 
                    alt={hero.serviceName || service.title}
                    width={600}
                    height={500}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Specialist Doctors', description: 'Experienced team' },
              { icon: Zap, title: 'Advanced Technology', description: 'Modern equipment' },
              { icon: Shield, title: 'Absolute Safety', description: 'International standards' },
              { icon: Calendar, title: 'Long-term Warranty', description: 'Quality commitment' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-sky-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section with Animations */}
      {intro.title && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {intro.image && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <Image 
                      src={intro.image} 
                      alt={intro.title}
                      width={600}
                      height={400}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {intro.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {intro.content}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section with Staggered Animations */}
      {benefits.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-sky-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Outstanding Advantages
              </h2>
              <p className="text-lg text-gray-600">
                Great benefits that our service brings to you
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit: any, index: number) => {
                const IconComponent = iconMap[benefit.icon] || Smile;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
                      <IconComponent className="w-7 h-7 text-sky-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Process Timeline with Animated Progress Line */}
      {process.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Treatment Process
              </h2>
              <p className="text-lg text-gray-600">
                Professional and safe step-by-step implementation
              </p>
            </motion.div>

            <div className="relative">
              <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-sky-200">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-sky-500 origin-left"
                />
              </div>

              <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
                {process.map((step: any, index: number) => {
                  const IconComponent = iconMap[step.icon] || FileSearch;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      className="relative"
                    >
                      <div className="absolute lg:static top-6 left-6 lg:left-auto w-4 h-4 lg:w-8 lg:h-8 bg-sky-500 rounded-full lg:mx-auto lg:mb-8 z-10 border-4 border-white shadow-lg" />
                      
                      {index < process.length - 1 && (
                        <div className="lg:hidden absolute top-10 left-[1.875rem] w-0.5 h-full bg-sky-200" />
                      )}

                      <div className="ml-16 lg:ml-0 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
                          <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0 lg:mb-4">
                            <IconComponent className="w-7 h-7 text-sky-600" />
                          </div>
                          
                          <div className="lg:text-center">
                            <div className="text-sm font-semibold text-sky-600 mb-2">
                              Step {index + 1}
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">
                              {step.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {step.description}
                            </p>
                            {step.duration && (
                              <div className="mt-3 inline-block px-3 py-1 bg-sky-50 text-sky-700 text-xs font-medium rounded-full">
                                {step.duration}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section with Animations */}
      {pricing.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Pricing
              </h2>
              <p className="text-lg text-gray-600">
                Service packages suitable for your needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricing.map((option: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow ${
                    option.popular ? 'ring-2 ring-sky-500' : ''
                  }`}
                >
                  {option.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {option.name}
                    </h3>
                    <div className="text-sm text-gray-600 mb-4">
                      Origin: {option.origin}
                    </div>
                    <div className="text-3xl font-bold text-sky-600">
                      {option.price}
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Warranty: {option.warranty}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {option.features?.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/booking"
                    className={`block w-full py-3 rounded-2xl font-semibold text-center transition-colors ${
                      option.popular
                        ? 'bg-sky-500 text-white hover:bg-sky-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Choose this package
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Doctor Section with Animations */}
      {doctor.name && (
        <section className="py-20 bg-gradient-to-b from-white to-sky-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Expert Team
              </h2>
              <p className="text-lg text-gray-600">
                Experienced doctors, dedicated to each patient
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                {doctor.image && (
                  <div className="relative h-[500px] lg:h-full">
                    <Image 
                      src={doctor.image} 
                      alt={doctor.name}
                      width={600}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent" />
                  </div>
                )}

                <div className="p-8 lg:p-12">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    {doctor.name}
                  </h3>

                  <div className="space-y-6 mb-8">
                    {doctor.credentials?.map((credential: string, index: number) => {
                      const icons = [GraduationCap, Award, Users, Users];
                      const titles = ['Education', 'Experience', 'Certifications', 'Achievements'];
                      const IconComponent = icons[index] || Award;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-sky-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{titles[index]}</h4>
                            <p className="text-gray-600">{credential}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-gray-600 italic leading-relaxed">
                      "Our mission is to bring confident smiles and the best oral health to every patient through advanced technology and dedication."
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section with Animations */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Answers to common patient questions
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq: any, index: number) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden group"
                >
                  <summary className="px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-gray-900 pr-8">
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Premium 2026 Redesign */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Soft Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-400"></div>
        
        {/* Animated Background Blobs */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-block px-5 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-sky-200"
              >
                <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">
                  ✨ Special Offer
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Ready to improve your smile?
              </motion.h2>

              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl"
              >
                Schedule a free consultation with our experienced specialist team
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                {/* Primary Button */}
                <motion.div 
                  whileHover={{ scale: 1.05, y: -4 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/booking"
                    className="group relative px-8 py-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg overflow-hidden"
                  >
                    {/* Button glow effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                    
                    <Calendar className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">Book Now</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  </Link>
                </motion.div>

                {/* Secondary Button */}
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/contact"
                    className="px-8 py-5 bg-white/80 backdrop-blur-md text-gray-900 border-2 border-gray-200 rounded-full hover:bg-white hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-lg"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call for Consultation</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust Badge */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="pt-6 flex flex-wrap gap-6 text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-sm font-medium">10,000+ satisfied customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9/5 rating</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Glassmorphism Card with Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Placeholder for smiling patient image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-sky-100 to-blue-100 relative">
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent"></div>
                  
                  {/* Placeholder content - replace with actual image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <Smile className="w-24 h-24 text-sky-400 mx-auto opacity-50" />
                      <p className="text-slate-500 text-sm">
                        Replace with smiling patient image
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Stats Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-white fill-current" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                      <p className="text-sm text-gray-600">Customer rating</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-sky-200/50 rounded-full blur-xl"
              ></motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200/50 rounded-full blur-xl"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back to Services */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Xem tất cả dịch vụ
          </Link>
        </div>
      </div>
    </main>
  );
}
