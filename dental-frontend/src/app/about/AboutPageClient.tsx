'use client';

import { motion } from 'framer-motion';
import { 
  Award, TrendingUp, Users, Scan, UserCheck, FileText, Sofa,
  Lightbulb, Shield, Heart, Smile, Star, Calendar, Sprout
} from 'lucide-react';
import { Button } from '../../components/ui/button';

interface AboutPageClientProps {
  content: any;
}

const iconMap: Record<string, any> = {
  Award, TrendingUp, Users, Scan, UserCheck, FileText, Sofa,
  Lightbulb, Shield, Heart, Smile, Star, Calendar, Sprout
};

export default function AboutPageClient({ content }: AboutPageClientProps) {
  const { hero, achievements, whyChooseUs, philosophy, coreValues, commitment, cta } = content;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      {hero && (
        <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {hero.badge && (
                <motion.div 
                  className="inline-block px-4 py-2 bg-sky-100 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-sky-600 font-medium">{hero.badge}</span>
                </motion.div>
              )}
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl text-slate-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {hero.title}
              </motion.h1>
              
              {hero.subtitle && (
                <motion.p 
                  className="text-xl md:text-2xl text-sky-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {hero.subtitle}
                </motion.p>
              )}
              
              {hero.description && (
                <motion.p 
                  className="text-lg text-slate-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {hero.description}
                </motion.p>
              )}
            </motion.div>

            {/* Right - Image Collage */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-400">Image 1</span>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-gray-400">Image 2</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-gray-400">Image 3</span>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-400">Image 4</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {achievements && (
        <motion.section 
          className="px-6 py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-200 h-96 flex items-center justify-center">
                  <span className="text-gray-400">Achievements Image</span>
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div>
                  {achievements.badge && (
                    <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                      <span className="text-sky-600 font-medium">{achievements.badge}</span>
                    </div>
                  )}
                  <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">{achievements.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">{achievements.description}</p>
                </div>

                {achievements.features && achievements.features.length > 0 && (
                  <div className="grid grid-cols-1 gap-6">
                    {achievements.features.map((feature: any, index: number) => {
                      const Icon = iconMap[feature.icon] || Award;
                      return (
                        <motion.div
                          key={index}
                          className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -4 }}
                        >
                          <div className="bg-sky-100 p-3 rounded-xl">
                            <Icon className="w-6 h-6 text-sky-600" />
                          </div>
                          <div>
                            <h3 className="text-lg text-slate-900 mb-1">{feature.title}</h3>
                            <p className="text-slate-600">{feature.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Why Choose Us Section */}
      {whyChooseUs && (
        <motion.section 
          className="px-6 py-16 md:py-24 max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                {whyChooseUs.badge && (
                  <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                    <span className="text-sky-600 font-medium">{whyChooseUs.badge}</span>
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">{whyChooseUs.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed">{whyChooseUs.description}</p>
              </div>

              {whyChooseUs.features && whyChooseUs.features.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {whyChooseUs.features.map((feature: any, index: number) => {
                    const Icon = iconMap[feature.icon] || Scan;
                    return (
                      <motion.div
                        key={index}
                        className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                      >
                        <div className="bg-sky-100 p-3 rounded-xl w-fit mb-4">
                          <Icon className="w-6 h-6 text-sky-600" />
                        </div>
                        <h3 className="text-lg text-slate-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-slate-600">{feature.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Image Collage Side */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-56 flex items-center justify-center">
                  <span className="text-gray-400">Image</span>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-40 flex items-center justify-center">
                  <span className="text-gray-400">Image</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-40 flex items-center justify-center">
                  <span className="text-gray-400">Image</span>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200 h-56 flex items-center justify-center">
                  <span className="text-gray-400">Image</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Philosophy Section */}
      {philosophy && (
        <motion.section 
          className="px-6 py-16 md:py-24 bg-gradient-to-b from-white to-sky-50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <motion.div 
                className="order-2 md:order-1 relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-200 h-96 flex items-center justify-center">
                  <span className="text-gray-400">Philosophy Image</span>
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div 
                className="space-y-6 order-1 md:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {philosophy.badge && (
                  <div className="inline-block px-4 py-2 bg-sky-100 rounded-full">
                    <span className="text-sky-600 font-medium">{philosophy.badge}</span>
                  </div>
                )}
                
                <h2 className="text-3xl md:text-4xl text-slate-900">{philosophy.title}</h2>
                
                {philosophy.quote && (
                  <motion.div 
                    className="flex items-center gap-3 p-6 bg-sky-50 rounded-2xl border-l-4 border-sky-500"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Sprout className="w-8 h-8 text-sky-600 shrink-0" />
                    <p className="text-xl md:text-2xl text-sky-700">
                      &ldquo;{philosophy.quote}&rdquo;
                    </p>
                  </motion.div>
                )}
                
                <p className="text-lg text-slate-600 leading-relaxed">{philosophy.description}</p>

                {philosophy.pillars && philosophy.pillars.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {philosophy.pillars.map((pillar: any, index: number) => (
                      <motion.div
                        key={index}
                        className="text-center p-4 bg-white rounded-xl shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                      >
                        <p className="text-3xl text-sky-600 mb-2">{pillar.title}</p>
                        <p className="text-sm text-slate-600">{pillar.subtitle}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Core Values Section */}
      {coreValues && (
        <motion.section 
          className="px-6 py-24 md:py-32 max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {coreValues.badge && (
              <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                <span className="text-sky-600 font-medium">{coreValues.badge}</span>
              </div>
            )}
            <h2 className="text-3xl md:text-4xl text-slate-900">{coreValues.title}</h2>
          </motion.div>

          {/* Desktop View - Circular Layout */}
          <div className="hidden md:block">
            <div className="relative max-w-4xl mx-auto h-96">
              {/* Center Circle */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full shadow-2xl flex items-center justify-center z-10"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <div className="text-center text-white">
                  <p className="text-4xl mb-2">{coreValues.values?.length || 3}</p>
                  <p className="text-sm uppercase tracking-wider">Core Values</p>
                </div>
              </motion.div>

              {/* Value Cards */}
              {coreValues.values && coreValues.values.map((value: any, index: number) => {
                const Icon = iconMap[value.icon] || Heart;
                const positions = [
                  'top-0 left-1/2 -translate-x-1/2 -translate-y-12',
                  'bottom-0 left-0 translate-y-12',
                  'bottom-0 right-0 translate-y-12'
                ];
                
                return (
                  <motion.div 
                    key={index}
                    className={`absolute ${positions[index]} w-72`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <motion.div 
                      className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
                      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                    >
                      <div className="bg-sky-100 p-4 rounded-2xl w-fit mb-4 mx-auto">
                        <Icon className="w-8 h-8 text-sky-600" />
                      </div>
                      <h3 className="text-2xl text-slate-900 mb-3 text-center">{value.title}</h3>
                      <p className="text-slate-600 text-center leading-relaxed">{value.description}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile View - Stacked Layout */}
          <div className="md:hidden space-y-6">
            {coreValues.values && coreValues.values.map((value: any, index: number) => {
              const Icon = iconMap[value.icon] || Heart;
              return (
                <motion.div 
                  key={index}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="bg-sky-100 p-4 rounded-2xl w-fit mb-4 mx-auto">
                    <Icon className="w-8 h-8 text-sky-600" />
                  </div>
                  <h3 className="text-2xl text-slate-900 mb-3 text-center">{value.title}</h3>
                  <p className="text-slate-600 text-center leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Commitment Section */}
      {commitment && (
        <motion.section 
          className="px-6 py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {commitment.badge && (
                <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                  <span className="text-sky-600 font-medium">{commitment.badge}</span>
                </div>
              )}
              <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">{commitment.title}</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">{commitment.description}</p>
            </motion.div>

            {/* Timeline - Desktop */}
            <div className="hidden md:block relative">
              {/* Vertical line */}
              <motion.div 
                className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-sky-200 -translate-x-1/2"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />

              <div className="space-y-16">
                {commitment.commitments && commitment.commitments.map((item: any, index: number) => {
                  const Icon = iconMap[item.icon] || Heart;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <motion.div 
                      key={index} 
                      className="relative"
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Center number badge */}
                      <motion.div 
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center shadow-lg z-10"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-2xl text-white">{item.number}</span>
                      </motion.div>

                      <div className={`grid grid-cols-2 gap-8 ${isEven ? '' : 'text-right'}`}>
                        {/* Content */}
                        <div className={isEven ? 'pr-12' : 'col-start-2 pl-12'}>
                          <motion.div 
                            className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
                            whileHover={{ y: -4, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                          >
                            <div className={`bg-sky-100 p-4 rounded-2xl w-fit mb-4 ${isEven ? '' : 'ml-auto'}`}>
                              <Icon className="w-8 h-8 text-sky-600" />
                            </div>
                            <h3 className="text-2xl text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-sky-600 uppercase tracking-wider mb-3">{item.subtitle}</p>
                            <p className="text-slate-600 leading-relaxed">{item.description}</p>
                          </motion.div>
                        </div>

                        {/* Empty space on the other side */}
                        <div className={isEven ? 'col-start-2' : 'col-start-1'}></div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-8">
              {commitment.commitments && commitment.commitments.map((item: any, index: number) => {
                const Icon = iconMap[item.icon] || Heart;
                
                return (
                  <motion.div 
                    key={index} 
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center shadow-lg shrink-0">
                          <span className="text-xl text-white">{item.number}</span>
                        </div>
                        <div className="bg-sky-100 p-3 rounded-xl">
                          <Icon className="w-6 h-6 text-sky-600" />
                        </div>
                      </div>
                      <h3 className="text-xl text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-sky-600 uppercase tracking-wider mb-3">{item.subtitle}</p>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      {cta && (
        <motion.section 
          className="px-6 py-16 md:py-24"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {cta.badge && (
              <motion.div 
                className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <span className="text-sky-600 font-medium">{cta.badge}</span>
              </motion.div>
            )}
            
            <motion.h2 
              className="text-3xl md:text-4xl text-slate-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {cta.title}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {cta.description}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl py-6 px-10 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {cta.primaryButtonText}
              </Button>

              <Button
                variant="outline"
                className="border-2 border-sky-500 text-sky-600 hover:bg-sky-50 rounded-xl py-6 px-10 text-lg font-semibold transition-all hover:scale-105"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                {cta.secondaryButtonText}
              </Button>
            </motion.div>

            {cta.contactInfo && cta.contactInfo.length > 0 && (
              <motion.div 
                className="mt-8 flex flex-wrap justify-center gap-6 text-slate-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {cta.contactInfo.map((info: any, index: number) => (
                  <p key={index}>{info.text}</p>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      )}
    </div>
  );
}
