'use client';

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
  contactCards?: Array<{
    icon: string;
    title: string;
    content: string;
    subtitle: string;
  }>;
  form?: any;
  locations?: Array<{
    name: string;
    address: string;
    phone: string;
    imageUrl: string;
    mapUrl: string;
  }>;
  map?: any;
  cta?: any;
}

interface ContactPageClientProps {
  content: ContactPageContent;
}

const iconMap: Record<string, any> = {
  Sparkles, Phone, Mail, Clock, MessageCircle, MapPin, ExternalLink, Calendar, Send
};

export default function ContactPageClient({ content }: ContactPageClientProps) {
  const { hero, contactCards, form, locations, map, cta } = content;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
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
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={form.imageUrl || 'https://images.unsplash.com/photo-1770321119162-05c18fbcfdb9?w=1080&q=80'}
                  alt="Dental consultation"
                  className="w-full h-full object-cover"
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
                  <div className="h-64 overflow-hidden">
                    <img
                      src={location.imageUrl}
                      alt={location.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
              className={`absolute bg-white rounded-2xl shadow-lg p-4 max-w-xs animate-pulse ${
                index === 0 ? 'top-1/4 left-1/4' : 'bottom-1/3 right-1/4'
              }`}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <p className="font-semibold text-gray-900">{marker.name}</p>
              <p className="text-sm text-gray-600">{marker.address}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* CTA Section */}
      {cta && (
        <motion.div 
          className="relative bg-gradient-to-r from-sky-500 to-sky-600 py-20 px-4 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-700 rounded-full opacity-20 blur-3xl" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {cta.title}
            </motion.h2>
            <motion.p 
              className="text-xl text-sky-50 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {cta.description}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button className="bg-white text-sky-600 hover:bg-gray-50 rounded-xl py-6 px-10 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <Calendar className="w-5 h-5 mr-2" />
                {cta.primaryButtonText}
              </Button>

              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-sky-600 rounded-xl py-6 px-10 text-lg font-semibold transition-all hover:scale-105"
              >
                {cta.secondaryButtonText}
              </Button>
            </motion.div>

            {cta.stats && (
              <motion.div 
                className="mt-12 flex flex-wrap justify-center gap-8 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {cta.stats.map((stat: any, index: number) => (
                  <div key={index}>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sky-100">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
