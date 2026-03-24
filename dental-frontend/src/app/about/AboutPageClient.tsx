'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart, Eye, Award, Lightbulb, Shield, Calendar, Users, UserCheck,
  TrendingUp, Scan, Monitor, Zap, ArrowRight
} from 'lucide-react';

interface AboutPageClientProps {
  page: any;
  pageData: any;
}

const iconMap: Record<string, any> = {
  Heart, Eye, Award, Lightbulb, Shield, Calendar, Users, UserCheck,
  TrendingUp, Scan, Monitor, Zap
};

export default function AboutPageClient({ page, pageData }: AboutPageClientProps) {
  const hero = pageData?.hero || {};
  const mission = pageData?.mission || {};
  const vision = pageData?.vision || {};
  const values = pageData?.values || [];
  const stats = pageData?.stats || [];
  const team = pageData?.team || [];
  const facilities = pageData?.facilities || {};
  const cta = pageData?.cta || {};

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                About Us
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                {hero.title}
              </h1>
              
              <p className="text-xl text-sky-600 font-semibold">
                {hero.subtitle}
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                {hero.description}
              </p>
            </motion.div>

            {hero.image && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                  <Image 
                    src={hero.image} 
                    alt={hero.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-8 lg:p-12"
            >
              <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mb-6">
                {mission.icon && iconMap[mission.icon] && (
                  <Heart className="w-8 h-8 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {mission.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {mission.content}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-3xl p-8 lg:p-12"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                {vision.icon && iconMap[vision.icon] && (
                  <Eye className="w-8 h-8 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {vision.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {vision.content}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      {stats.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-sky-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat: any, index: number) => {
                const IconComponent = iconMap[stat.icon] || TrendingUp;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-sky-600" />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-sky-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Core Values */}
      {values.length > 0 && (
        <section className="py-20 bg-sky-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value: any, index: number) => {
                const IconComponent = iconMap[value.icon] || Award;
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
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {team.length > 0 && (
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
                Meet Our Expert Team
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Experienced professionals dedicated to your dental health
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-80">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sky-600 font-semibold mb-2">
                      {member.title}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {member.specialization}
                    </p>
                    <ul className="space-y-2">
                      {member.credentials?.map((credential: string, credIndex: number) => (
                        <li key={credIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <Award className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                          <span>{credential}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facilities */}
      {facilities.features && facilities.features.length > 0 && (
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
                {facilities.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {facilities.description}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {facilities.features.map((feature: any, index: number) => {
                const IconComponent = iconMap[feature.icon] || Monitor;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-4">
                      <IconComponent className="w-7 h-7 text-sky-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta.title && (
        <section className="py-20 bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {cta.title}
              </h2>
              
              <p className="text-xl text-sky-50 mb-8 max-w-2xl mx-auto">
                {cta.description}
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={cta.buttonLink}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-600 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all"
                >
                  {cta.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
