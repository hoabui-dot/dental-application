'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useMemo, useCallback } from 'react'
import {
    Award, Clock, Globe, Shield, Plane, CreditCard, Star, Heart, Smile,
    Sparkles, Users, ThumbsUp, CheckCircle, ChevronDown, ChevronUp,
    ArrowRight, Quote, Phone, Mail
} from 'lucide-react'
import { Button } from '../../components/ui/button'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://pediatric-expired-through-casinos.trycloudflare.com'

interface CustomerContentProps {
    content: any
    page: any
}

const iconMap: Record<string, any> = {
    Award, Clock, Globe, Shield, Plane, CreditCard, Star, Heart, Smile,
    Sparkles, Users, ThumbsUp, CheckCircle, Phone, Mail, Quote
}

// Animation variants for blue sky theme
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
}

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

const slideInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
}

const slideInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
}

// Floating animation keyframes
const floatingAnimation = {
    animate: {
        y: [0, -15, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
}

export function CustomerContent({ content, page }: CustomerContentProps) {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

    // Early return after all hooks
    if (!content) {
        return (
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{page?.title || 'Our Customers'}</h1>
                <p className="text-lg text-slate-600">{page?.description}</p>
            </div>
        )
    }

    const { hero, successStories, customerBenefits, statistics, faq, cta } = content

    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index)
    }

    // Helper function to get image URL
    const getImageUrl = (image: any) => {
        if (!image) return null
        if (image.type === 'strapi' && image.path) {
            return `${STRAPI_URL}${image.path}`
        }
        return image.url || null
    }

    return (
        <div className="w-full bg-white overflow-hidden">
            {/* 1. HERO SECTION - Blue Sky Theme with Floating Elements */}
            {hero && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto overflow-hidden"
                >
                    {/* Animated Background Elements */}
                    <motion.div
                        className="absolute top-20 right-10 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-20 left-10 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="space-y-6"
                            variants={staggerContainer}
                        >
                            {hero.badge && (
                                <motion.div 
                                    variants={fadeIn} 
                                    className="inline-block px-5 py-2 bg-gradient-to-r from-sky-100 to-sky-200 rounded-full border border-sky-300/50"
                                >
                                    <span className="text-sky-700 font-semibold text-sm uppercase tracking-wider">{hero.badge}</span>
                                </motion.div>
                            )}

                            <motion.h1 
                                variants={fadeInUp} 
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
                            >
                                {hero.title}
                            </motion.h1>

                            {hero.subtitle && (
                                <motion.p 
                                    variants={fadeInUp} 
                                    className="text-xl md:text-2xl text-sky-600 font-medium"
                                >
                                    {hero.subtitle}
                                </motion.p>
                            )}

                            {hero.description && (
                                <motion.p 
                                    variants={fadeInUp} 
                                    className="text-lg text-slate-600 leading-relaxed max-w-xl"
                                >
                                    {hero.description}
                                </motion.p>
                            )}

                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                                <Button
                                    asChild
                                    className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                >
                                    <Link href="/contact">
                                        Get Started
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-2 border-sky-300 text-sky-700 hover:bg-sky-50 px-8 py-6 rounded-xl text-lg font-semibold transition-all"
                                >
                                    <Link href="/services">
                                        View Services
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Hero Images Grid with Floating Animation */}
                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            variants={staggerContainer}
                        >
                            <div className="space-y-4">
                                <motion.div 
                                    variants={scaleIn}
                                    {...floatingAnimation}
                                    className="rounded-3xl overflow-hidden shadow-xl relative h-64 border-4 border-white"
                                >
                                    <Image
                                        src={getImageUrl(hero.images?.[0]) || `${STRAPI_URL}/uploads/happy_patient_3d6d7753d6.jpg`}
                                        alt={hero.images?.[0]?.alt || "Happy dental patients"}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <motion.div 
                                    variants={scaleIn}
                                    animate={{
                                        y: [0, -10, 0],
                                        transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                    }}
                                    className="rounded-3xl overflow-hidden shadow-xl relative h-48 border-4 border-white"
                                >
                                    <Image
                                        src={getImageUrl(hero.images?.[1]) || `${STRAPI_URL}/uploads/patient_consultation_dcf1a32d50.jpg`}
                                        alt={hero.images?.[1]?.alt || "Patient consultation"}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <motion.div 
                                    variants={scaleIn}
                                    animate={{
                                        y: [0, -12, 0],
                                        transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                                    }}
                                    className="rounded-3xl overflow-hidden shadow-xl relative h-48 border-4 border-white"
                                >
                                    <Image
                                        src={getImageUrl(hero.images?.[2]) || `${STRAPI_URL}/uploads/clinic_interior_205c275757.jpg`}
                                        alt={hero.images?.[2]?.alt || "Family dental care"}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <motion.div 
                                    variants={scaleIn}
                                    animate={{
                                        y: [0, -8, 0],
                                        transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                                    }}
                                    className="rounded-3xl overflow-hidden shadow-xl relative h-64 border-4 border-white"
                                >
                                    <Image
                                        src={getImageUrl(hero.images?.[3]) || `${STRAPI_URL}/uploads/dental_team_db6d3d4f6f.jpg`}
                                        alt={hero.images?.[3]?.alt || "Patient consultation"}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            )}

            {/* 2. SUCCESS STORIES / TESTIMONIALS SECTION */}
            {successStories && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-20 md:py-32 bg-gradient-to-b from-sky-50 via-white to-white relative overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
                    
                    <div className="max-w-7xl mx-auto">
                        <motion.div className="text-center mb-16" variants={staggerContainer}>
                            {successStories.badge && (
                                <motion.div 
                                    variants={fadeIn} 
                                    className="inline-block px-5 py-2 bg-gradient-to-r from-sky-100 to-sky-200 rounded-full mb-6 border border-sky-300/50"
                                >
                                    <span className="text-sky-700 font-semibold text-sm uppercase tracking-wider">
                                        {successStories.badge}
                                    </span>
                                </motion.div>
                            )}
                            <motion.h2 
                                variants={fadeInUp} 
                                className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
                            >
                                {successStories.title}
                            </motion.h2>
                            {successStories.description && (
                                <motion.p 
                                    variants={fadeInUp} 
                                    className="text-xl text-slate-600 max-w-3xl mx-auto"
                                >
                                    {successStories.description}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Stories Grid */}
                        {successStories.stories && (
                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                variants={staggerContainer}
                            >
                                {successStories.stories.map((story: any, index: number) => {
                                    const Icon = iconMap[story.icon] || Star
                                    return (
                                        <motion.div
                                            key={index}
                                            variants={index % 2 === 0 ? slideInLeft : slideInRight}
                                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                            className="group"
                                        >
                                            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-sky-200 relative overflow-hidden h-full">
                                                {/* Gradient accent */}
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-sky-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                                
                                                {/* Quote icon */}
                                                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                                    <Quote className="w-16 h-16 text-sky-500" />
                                                </div>

                                                <div className="relative z-10">
                                                    {/* Rating stars */}
                                                    <div className="flex gap-1 mb-4">
                                                        {Array.from({ length: story.rating || 5 }).map((_, i) => (
                                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                        ))}
                                                    </div>

                                                    {/* Quote */}
                                                    <p className="text-lg text-slate-700 mb-6 leading-relaxed italic">
                                                        &quot;{story.quote}&quot;
                                                    </p>

                                                    {/* Customer info */}
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center shadow-lg">
                                                            <Icon className="w-7 h-7 text-white" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900">{story.name}</h4>
                                                            <p className="text-sm text-slate-500">{story.location}</p>
                                                            <p className="text-sm text-sky-600 font-medium">{story.treatment}</p>
                                                        </div>
                                                    </div>

                                                    {/* Before/After badge */}
                                                    {story.beforeAfter && (
                                                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-sky-100 rounded-full">
                                                            <CheckCircle className="w-4 h-4 text-sky-600" />
                                                            <span className="text-sm text-sky-700 font-medium">Before & After Available</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        )}
                    </div>
                </motion.section>
            )}

            {/* 3. CUSTOMER BENEFITS SECTION */}
            {customerBenefits && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-20 md:py-32 max-w-7xl mx-auto"
                >
                    <motion.div className="text-center mb-16" variants={staggerContainer}>
                        {customerBenefits.badge && (
                            <motion.div 
                                variants={fadeIn} 
                                className="inline-block px-5 py-2 bg-gradient-to-r from-sky-100 to-sky-200 rounded-full mb-6 border border-sky-300/50"
                            >
                                <span className="text-sky-700 font-semibold text-sm uppercase tracking-wider">
                                    {customerBenefits.badge}
                                </span>
                            </motion.div>
                        )}
                        <motion.h2 
                            variants={fadeInUp} 
                            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
                        >
                            {customerBenefits.title}
                        </motion.h2>
                        {customerBenefits.description && (
                            <motion.p 
                                variants={fadeInUp} 
                                className="text-xl text-slate-600 max-w-3xl mx-auto"
                            >
                                {customerBenefits.description}
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Benefits Grid */}
                    {customerBenefits.benefits && (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={staggerContainer}
                        >
                            {customerBenefits.benefits.map((benefit: any, index: number) => {
                                const Icon = iconMap[benefit.icon] || Award
                                return (
                                    <motion.div
                                        key={index}
                                        variants={scaleIn}
                                        whileHover={{ 
                                            y: -12, 
                                            scale: 1.02,
                                            transition: { duration: 0.3 }
                                        }}
                                        className="group"
                                    >
                                        <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-sky-200 relative overflow-hidden h-full">
                                            {/* Hover gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-transparent to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            
                                            <div className="relative z-10 text-center">
                                                {/* Icon */}
                                                <motion.div 
                                                    className="w-20 h-20 mx-auto bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-shadow"
                                                    whileHover={{ 
                                                        scale: 1.1, 
                                                        rotate: [0, -5, 5, 0],
                                                        transition: { duration: 0.5 }
                                                    }}
                                                >
                                                    <Icon className="w-10 h-10 text-sky-600" />
                                                </motion.div>
                                                
                                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                                    {benefit.title}
                                                </h3>
                                                <p className="text-slate-600 leading-relaxed">
                                                    {benefit.description}
                                                </p>
                                            </div>

                                            {/* Corner accent */}
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-sky-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    )}
                </motion.section>
            )}

            {/* 4. STATISTICS SECTION */}
            {statistics && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-20 md:py-28 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 relative overflow-hidden"
                >
                    {/* Animated background patterns */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.div className="text-center mb-12" variants={staggerContainer}>
                            {statistics.badge && (
                                <motion.div 
                                    variants={fadeIn} 
                                    className="inline-block px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30"
                                >
                                    <span className="text-white font-semibold text-sm uppercase tracking-wider">
                                        {statistics.badge}
                                    </span>
                                </motion.div>
                            )}
                            <motion.h2 
                                variants={fadeInUp} 
                                className="text-4xl md:text-5xl font-bold text-white mb-4"
                            >
                                {statistics.title}
                            </motion.h2>
                        </motion.div>

                        {/* Stats Grid */}
                        {statistics.stats && (
                            <motion.div 
                                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                                variants={staggerContainer}
                            >
                                {statistics.stats.map((stat: any, index: number) => {
                                    const Icon = iconMap[stat.icon] || Users
                                    return (
                                        <motion.div
                                            key={index}
                                            variants={scaleIn}
                                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                            className="text-center"
                                        >
                                            <motion.div 
                                                className="w-16 h-16 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 border border-white/30"
                                                whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                                            >
                                                <Icon className="w-8 h-8 text-white" />
                                            </motion.div>
                                            <motion.p 
                                                className="text-4xl md:text-5xl font-bold text-white mb-2"
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                            >
                                                {stat.number}
                                            </motion.p>
                                            <p className="text-sky-100 font-medium">{stat.label}</p>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        )}
                    </div>
                </motion.section>
            )}

            {/* 5. FAQ SECTION */}
            {faq && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-20 md:py-32 max-w-4xl mx-auto"
                >
                    <motion.div className="text-center mb-12" variants={staggerContainer}>
                        {faq.badge && (
                            <motion.div 
                                variants={fadeIn} 
                                className="inline-block px-5 py-2 bg-gradient-to-r from-sky-100 to-sky-200 rounded-full mb-6 border border-sky-300/50"
                            >
                                <span className="text-sky-700 font-semibold text-sm uppercase tracking-wider">
                                    {faq.badge}
                                </span>
                            </motion.div>
                        )}
                        <motion.h2 
                            variants={fadeInUp} 
                            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
                        >
                            {faq.title}
                        </motion.h2>
                        {faq.description && (
                            <motion.p 
                                variants={fadeInUp} 
                                className="text-xl text-slate-600"
                            >
                                {faq.description}
                            </motion.p>
                        )}
                    </motion.div>

                    {/* FAQ Accordion */}
                    {faq.questions && (
                        <motion.div className="space-y-4" variants={staggerContainer}>
                            {faq.questions.map((item: any, index: number) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-slate-100 overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-sky-50/50 transition-colors"
                                    >
                                        <span className="font-semibold text-slate-900 pr-4">{item.question}</span>
                                        <motion.div
                                            animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex-shrink-0"
                                        >
                                            <ChevronDown className="w-5 h-5 text-sky-500" />
                                        </motion.div>
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: expandedFaq === index ? "auto" : 0,
                                            opacity: expandedFaq === index ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.section>
            )}

            {/* 6. CTA SECTION */}
            {cta && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative px-6 py-24 md:py-32 overflow-hidden"
                >
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-sky-100 to-white" />
                    
                    {/* Animated Blobs */}
                    <motion.div
                        animate={{ 
                            scale: [1, 1.2, 1],
                            x: [0, 30, 0],
                            y: [0, -20, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-0 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ 
                            scale: [1.2, 1, 1.2],
                            x: [0, -30, 0],
                            y: [0, 20, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl"
                    />

                    <div className="max-w-4xl mx-auto relative z-10 text-center">
                        <motion.div variants={staggerContainer}>
                            {cta.badge && (
                                <motion.div 
                                    variants={fadeIn} 
                                    className="inline-block px-5 py-2 bg-sky-500 rounded-full mb-6"
                                >
                                    <span className="text-white font-semibold text-sm uppercase tracking-wider">
                                        {cta.badge}
                                    </span>
                                </motion.div>
                            )}
                            <motion.h2 
                                variants={fadeInUp} 
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
                            >
                                {cta.title}
                            </motion.h2>
                            {cta.description && (
                                <motion.p 
                                    variants={fadeInUp} 
                                    className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
                                >
                                    {cta.description}
                                </motion.p>
                            )}

                            <motion.div 
                                variants={fadeInUp} 
                                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                            >
                                <Button
                                    asChild
                                    className="bg-sky-500 hover:bg-sky-600 text-white px-10 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                >
                                    <Link href={cta.primaryButtonLink || "/contact"}>
                                        {cta.primaryButtonText}
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-2 border-sky-400 text-sky-700 hover:bg-sky-50 px-10 py-6 rounded-xl text-lg font-semibold transition-all"
                                >
                                    <Link href={cta.secondaryButtonLink || "/services"}>
                                        {cta.secondaryButtonText}
                                    </Link>
                                </Button>
                            </motion.div>

                            {/* Contact Info */}
                            {cta.contactInfo && (
                                <motion.div 
                                    variants={fadeIn} 
                                    className="flex flex-wrap justify-center gap-6 text-slate-600"
                                >
                                    {cta.contactInfo.map((info: any, index: number) => (
                                        <span key={index} className="flex items-center gap-2">
                                            {info.text.includes('Hotline') && <Phone className="w-4 h-4 text-sky-500" />}
                                            {info.text.includes('@') && <Mail className="w-4 h-4 text-sky-500" />}
                                            {info.text}
                                        </span>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </motion.section>
            )}
        </div>
    )
}
