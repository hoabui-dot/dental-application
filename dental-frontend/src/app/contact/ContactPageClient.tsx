'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Sparkles, Phone, Mail, Clock, MessageCircle, MapPin,
  ExternalLink, Calendar, Send
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://pediatric-expired-through-casinos.trycloudflare.com';

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

interface ContactPageContent {
  hero?: {
    icon: string;
    title: string;
    subtitle: string;
  };
  quickContact?: {
    cards: Array<{
      icon: string;
      title: string;
      content: string;
      subtitle: string;
    }>;
  };
  contactForm?: {
    title: string;
    description: string;
    imageId?: number;
    imageUrl?: string;
    badge?: {
      title: string;
      subtitle: string;
    };
    fields: Array<{
      name: string;
      label: string;
      type: string;
      required: boolean;
      placeholder: string;
      options?: Array<{ value: string; label: string }>;
      rows?: number;
    }>;
  };
  clinicLocations?: {
    title: string;
    subtitle: string;
    locations: Array<{
      name: string;
      address: string;
      phone: string;
      imageId?: number;
      imageUrl?: string;
      mapUrl: string;
    }>;
  };
  mapSection?: {
    enabled: boolean;
    title: string;
    description: string;
    note: string;
    markers: Array<{ name: string; address: string }>;
  };
  cta?: {
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    stats?: Array<{ value: string; label: string }>;
  };
}

interface ContactPageClientProps {
  content: ContactPageContent;
}

const iconMap: Record<string, any> = {
  Sparkles, Phone, Mail, Clock, MessageCircle, MapPin, ExternalLink, Calendar, Send
};

export default function ContactPageClient({ content }: ContactPageClientProps) {
  // Initialize hooks BEFORE any conditional returns
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Safety check for content AFTER hooks
  if (!content || typeof content !== 'object') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Error</h1>
          <p className="text-gray-600">
            The contact page content is not available.
          </p>
        </div>
      </div>
    );
  }

  const { hero, quickContact, contactForm, clinicLocations, mapSection, cta } = content;
  const contactCards = quickContact?.cards;
  const form = contactForm;
  const locations = clinicLocations?.locations;
  const map = mapSection;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Thank you! Your message has been sent successfully.');
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Contact Hero */}
      {hero && (
        <motion.div
          className="relative bg-gradient-to-b from-sky-50 to-white py-20 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {hero.icon && iconMap[hero.icon] && (
                (() => {
                  const Icon = iconMap[hero.icon];
                  return <Icon className="w-8 h-8 text-sky-500" />;
                })()
              )}
            </motion.div>
            <motion.h1
              className="text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {hero.title}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {hero.subtitle}
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Quick Contact Info */}
      {contactCards && contactCards.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {contactCards.map((card, index) => {
              const Icon = iconMap[card.icon] || Phone;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-sky-100 rounded-2xl mb-4">
                    <Icon className="w-7 h-7 text-sky-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-900 font-medium mb-1">{card.content}</p>
                  <p className="text-sm text-gray-500">{card.subtitle}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* Contact Form */}
      {form && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {/* Form Section */}
            <motion.div
              className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {form.title}
              </h2>
              <p className="text-gray-600 mb-8">
                {form.description}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {form.fields?.map((field: any, index: number) => {
                  if (field.type === 'select') {
                    return (
                      <div key={index}>
                        <Label htmlFor={field.name} className="text-gray-700 mb-2 block">
                          {field.label} {field.required && '*'}
                        </Label>
                        <Select
                          onValueChange={(value) => setValue(field.name as keyof FormData, value as any)}
                        >
                          <SelectTrigger className="rounded-xl border-gray-200 focus:border-sky-400 focus:ring-sky-400">
                            <SelectValue placeholder={field.placeholder || 'Select a service'} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option: any, optIndex: number) => (
                              <SelectItem key={optIndex} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors[field.name as keyof FormData] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[field.name as keyof FormData]?.message}
                          </p>
                        )}
                      </div>
                    );
                  }

                  if (field.type === 'textarea') {
                    return (
                      <div key={index}>
                        <Label htmlFor={field.name} className="text-gray-700 mb-2 block">
                          {field.label} {field.required && '*'}
                        </Label>
                        <Textarea
                          id={field.name}
                          placeholder={field.placeholder}
                          rows={field.rows || 4}
                          {...register(field.name as keyof FormData, {
                            required: field.required ? `${field.label} is required` : false
                          })}
                          className="rounded-xl border-gray-200 focus:border-sky-400 focus:ring-sky-400 transition-all resize-none"
                        />
                        {errors[field.name as keyof FormData] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[field.name as keyof FormData]?.message}
                          </p>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={index}>
                      <Label htmlFor={field.name} className="text-gray-700 mb-2 block">
                        {field.label} {field.required && '*'}
                      </Label>
                      <Input
                        id={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name as keyof FormData, {
                          required: field.required ? `${field.label} is required` : false,
                          ...(field.type === 'email' && {
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            }
                          })
                        })}
                        className="rounded-xl border-gray-200 focus:border-sky-400 focus:ring-sky-400 transition-all"
                      />
                      {errors[field.name as keyof FormData] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[field.name as keyof FormData]?.message}
                        </p>
                      )}
                    </div>
                  );
                })}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-xl py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Image Section */}
            <motion.div
              className="relative"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[600px]">
                <Image
                  src={form.imageUrl || `${STRAPI_URL}/uploads/dental_consultation_d555f4a87c.jpg`}
                  alt="Dental consultation"
                  fill
                  className="object-cover"
                />
              </div>
              {form.badge && (
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-sky-500 text-white rounded-3xl p-8 shadow-2xl max-w-xs"
                  initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-lg font-semibold mb-2">{form.badge.title}</p>
                  <p className="text-sky-100">{form.badge.subtitle}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Clinic Locations */}
      {locations && locations.length > 0 && (
        <div className="bg-gray-50 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Clinic Locations
              </h2>
              <p className="text-xl text-gray-600">
                Visit us at any of our convenient locations
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <div className="h-64 overflow-hidden relative">
                    <Image
                      src={location.imageUrl || `${STRAPI_URL}/uploads/clinic_interior_d7_81acf81d4a.jpg`}
                      alt={location.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {location.name}
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-sky-500 mt-1 flex-shrink-0" />
                        <p className="text-gray-600">{location.address}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-sky-500 flex-shrink-0" />
                        <p className="text-gray-900 font-semibold">{location.phone}</p>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-xl py-6 font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      <a
                        href={location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        View on Google Maps
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* Map Section */}
      {map && map.enabled && (
        <motion.div
          className="w-full h-[500px] bg-gray-200 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Map Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-50">
            <motion.div
              className="text-center p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {map.title}
              </h3>
              <p className="text-gray-600 max-w-md">
                {map.description}
                <br />
                <span className="text-sm text-gray-500 mt-2 block">
                  {map.note}
                </span>
              </p>
            </motion.div>
          </div>

          {/* Location Markers Overlay */}
          {map.markers?.map((marker: any, index: number) => (
            <div
              key={index}
              className={`absolute bg-white rounded-2xl shadow-lg p-4 max-w-xs animate-pulse ${index === 0 ? 'top-1/4 left-1/4' : 'bottom-1/3 right-1/4'
                }`}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <p className="font-semibold text-gray-900">{marker.name}</p>
              <p className="text-sm text-gray-600">{marker.address}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* CTA Section - Premium 2026 Redesign */}
      {cta && (
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
                    ✨ Contact Now
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
                  {cta.title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl"
                >
                  {cta.description}
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
                    <Button className="group relative px-8 py-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 font-bold text-lg overflow-hidden">
                      {/* Button glow effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                      
                      <Calendar className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">{cta.primaryButtonText}</span>
                      <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                    </Button>
                  </motion.div>

                  {/* Secondary Button */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="px-8 py-6 bg-white/80 backdrop-blur-md text-gray-900 border-2 border-gray-200 rounded-full hover:bg-white hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold text-lg"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{cta.secondaryButtonText}</span>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Stats */}
                {cta.stats && cta.stats.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="pt-6 flex flex-wrap gap-8"
                  >
                    {cta.stats.map((stat: any, index: number) => (
                      <div key={index} className="text-center">
                        <p className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
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
                  {/* Placeholder for contact/clinic image */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-sky-100 to-blue-100 relative">
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent"></div>
                    
                    {/* Placeholder content - replace with actual image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4 p-8">
                        <MessageCircle className="w-24 h-24 text-sky-400 mx-auto opacity-50" />
                        <p className="text-slate-500 text-sm">
                          Replace with clinic/contact image
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Contact Badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Hotline 24/7</p>
                        <p className="text-xl font-bold text-gray-900">1900 8059</p>
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
      )}
    </div>
  );
}
