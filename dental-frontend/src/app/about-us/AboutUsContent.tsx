'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useMemo, useCallback } from 'react'
import {
    Award, TrendingUp, Users, Scan, UserCheck, FileText, Sofa,
    Lightbulb, Shield, Heart, Smile, Star, Sprout, Calendar, ArrowRight
} from 'lucide-react'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://pediatric-expired-through-casinos.trycloudflare.com'

interface AboutUsContentProps {
    content: any
    page: any
}

const iconMap: Record<string, any> = {
    Award, TrendingUp, Users, Scan, UserCheck, FileText, Sofa,
    Lightbulb, Shield, Heart, Smile, Star, Sprout
}

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

// Add global styles for hiding scrollbar
if (typeof document !== 'undefined') {
    const style = document.createElement('style')
    style.textContent = `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `
    document.head.appendChild(style)
}

export function AboutUsContent({ content, page }: AboutUsContentProps) {
    const [currentCommitmentIndex, setCurrentCommitmentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    
    // Extract commitment data early for hooks
    const commitment = content?.commitment
    
    // Safe commitment data handling with memoization - moved before early return
    const commitmentItems = useMemo(() => commitment?.commitments || [], [commitment])
    const itemsPerSlide = 3
    const totalItems = commitmentItems.length
    const totalSlides = totalItems > 0 ? Math.ceil(totalItems / itemsPerSlide) : 0
    
    // Memoize current slide items to prevent recalculation
    const currentSlideItems = useMemo(() => {
        if (totalItems === 0 || totalSlides === 0) return []
        
        // Ensure index is always valid
        const validIndex = Math.max(0, Math.min(currentCommitmentIndex, totalSlides - 1))
        const startIndex = validIndex * itemsPerSlide
        const endIndex = Math.min(startIndex + itemsPerSlide, totalItems)
        
        return commitmentItems.slice(startIndex, endIndex)
    }, [commitmentItems, currentCommitmentIndex, totalItems, totalSlides, itemsPerSlide])
    
    // Navigation handlers with debounce
    const handlePrevSlide = useCallback(() => {
        if (totalSlides <= 1 || isTransitioning) return
        setIsTransitioning(true)
        setCurrentCommitmentIndex((prev) => {
            const newIndex = (prev - 1 + totalSlides) % totalSlides
            return newIndex
        })
        setTimeout(() => setIsTransitioning(false), 300)
    }, [totalSlides, isTransitioning])
    
    const handleNextSlide = useCallback(() => {
        if (totalSlides <= 1 || isTransitioning) return
        setIsTransitioning(true)
        setCurrentCommitmentIndex((prev) => {
            const newIndex = (prev + 1) % totalSlides
            return newIndex
        })
        setTimeout(() => setIsTransitioning(false), 300)
    }, [totalSlides, isTransitioning])
    
    const handleGoToSlide = useCallback((index: number) => {
        if (totalSlides > 0 && index >= 0 && index < totalSlides && !isTransitioning) {
            setIsTransitioning(true)
            setCurrentCommitmentIndex(index)
            setTimeout(() => setIsTransitioning(false), 300)
        }
    }, [totalSlides, isTransitioning])
    
    // Early return after all hooks
    if (!content) {
        return (
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{page?.title || 'About Us'}</h1>
                <p className="text-lg text-slate-600">{page?.description}</p>
            </div>
        )
    }

    const { hero, achievements, whyChooseUs, philosophy, coreValues, cta } = content

    return (
        <div className="w-full bg-white">
            {/* 1. HERO SECTION */}
            {hero && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-16 md:py-24 max-w-7xl mx-auto"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="space-y-6"
                            variants={staggerContainer}
                        >
                            {hero.badge && (
                                <motion.div variants={fadeIn} className="inline-block px-4 py-2 bg-sky-100 rounded-full">
                                    <span className="text-sky-600 font-medium">{hero.badge}</span>
                                </motion.div>
                            )}

                            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
                                {hero.title}
                            </motion.h1>

                            {hero.subtitle && (
                                <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-sky-600 font-medium">
                                    {hero.subtitle}
                                </motion.p>
                            )}

                            {hero.description && (
                                <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
                                    {hero.description}
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            variants={staggerContainer}
                        >
                            <div className="space-y-4">
                                <motion.div variants={scaleIn} className="rounded-3xl overflow-hidden shadow-lg relative h-64">
                                    <Image
                                        src={`${STRAPI_URL}/uploads/dental_team_db6d3d4f6f.jpg`}
                                        alt="Dental clinic team"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <motion.div variants={scaleIn} className="rounded-3xl overflow-hidden shadow-lg relative h-48">
                                    <Image
                                        src={`${STRAPI_URL}/uploads/patient_consultation_dcf1a32d50.jpg`}
                                        alt="Patient consultation"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <motion.div variants={scaleIn} className="rounded-3xl overflow-hidden shadow-lg relative h-48">
                                    <Image
                                        src={`${STRAPI_URL}/uploads/clinic_interior_205c275757.jpg`}
                                        alt="Modern clinic interior"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <motion.div variants={scaleIn} className="rounded-3xl overflow-hidden shadow-lg relative h-64">
                                    <Image
                                        src={`${STRAPI_URL}/uploads/happy_patient_3d6d7753d6.jpg`}
                                        alt="Happy patient"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            )}

            {/* 2. ACHIEVEMENTS SECTION */}
            {achievements && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div variants={fadeInUp} className="relative">
                                <div className="rounded-3xl overflow-hidden shadow-2xl relative h-96">
                                    <Image
                                        src={`${STRAPI_URL}/uploads/achievements_0a8d515d49.jpg`}
                                        alt="Achievements and certifications"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <motion.div
                                    variants={scaleIn}
                                    className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-sky-100 p-3 rounded-xl">
                                            <Award className="w-8 h-8 text-sky-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-slate-900">2026</p>
                                            <p className="text-sm text-slate-600">Excellence Award</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <motion.div className="space-y-8" variants={staggerContainer}>
                                <div>
                                    {achievements.badge && (
                                        <motion.div variants={fadeIn} className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                                            <span className="text-sky-600 font-medium">{achievements.badge}</span>
                                        </motion.div>
                                    )}
                                    <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                        {achievements.title}
                                    </motion.h2>
                                    {achievements.description && (
                                        <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
                                            {achievements.description}
                                        </motion.p>
                                    )}
                                </div>

                                {achievements.features && (
                                    <motion.div className="grid grid-cols-1 gap-6" variants={staggerContainer}>
                                        {achievements.features.map((feature: any, index: number) => {
                                            const Icon = iconMap[feature.icon] || Award
                                            return (
                                                <motion.div
                                                    key={index}
                                                    variants={fadeInUp}
                                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                                    className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                                                >
                                                    <div className="bg-sky-100 p-3 rounded-xl flex-shrink-0">
                                                        <Icon className="w-6 h-6 text-sky-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-slate-900 mb-1">{feature.title}</h3>
                                                        <p className="text-slate-600">{feature.description}</p>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            )}

            {/* 3. WHY CHOOSE US SECTION */}
            {whyChooseUs && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-16 md:py-24 max-w-7xl mx-auto"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div className="space-y-8" variants={staggerContainer}>
                            <div>
                                {whyChooseUs.badge && (
                                    <motion.div variants={fadeIn} className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                                        <span className="text-sky-600 font-medium">{whyChooseUs.badge}</span>
                                    </motion.div>
                                )}
                                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                    {whyChooseUs.title}
                                </motion.h2>
                                {whyChooseUs.description && (
                                    <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
                                        {whyChooseUs.description}
                                    </motion.p>
                                )}
                            </div>

                            {whyChooseUs.features && (
                                <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6" variants={staggerContainer}>
                                    {whyChooseUs.features.map((feature: any, index: number) => {
                                        const Icon = iconMap[feature.icon] || Scan
                                        return (
                                            <motion.div
                                                key={index}
                                                variants={scaleIn}
                                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-100"
                                            >
                                                <div className="bg-sky-100 p-3 rounded-xl w-fit mb-4">
                                                    <Icon className="w-6 h-6 text-sky-600" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                                <p className="text-sm text-slate-600">{feature.description}</p>
                                            </motion.div>
                                        )
                                    })}
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            variants={staggerContainer}
                        >
                            <div className="space-y-4">
                                <motion.div variants={scaleIn} className="rounded-3xl overflow-hidden shadow-lg relative h-56">
                                    <Image
                                        src={`${STRAPI_URL}/uploads/dental_technology_127ddfeaa3.jpg`}
                                        alt="Dental technology"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <motion.div variants={scaleIn} className="rounded-3xl overflow-hidden shadow-lg relative h-40">
                                    <Image
                                        src={`${STRAPI_URL}/uploads/patient_consultation_9a28199a36.jpg`}
                                        alt="Patient care"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <motion.div variants={scaleIn} className="rounded-3xl overflow-hidden shadow-lg relative h-40">
                                    <Image
                                        src={`${STRAPI_URL}/uploads/happy_patient_afecb1a4d6.jpg`}
                                        alt="Happy patient"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <motion.div variants={scaleIn} className="rounded-3xl overflow-hidden shadow-lg relative h-56">
                                    <Image
                                        src={`${STRAPI_URL}/uploads/clinic_interior_446d260b23.jpg`}
                                        alt="Clinic interior"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            )}

            {/* 4. PHILOSOPHY SECTION */}
            {philosophy && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-16 md:py-24 bg-gradient-to-b from-white to-sky-50"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div variants={fadeInUp} className="order-2 md:order-1">
                                <div className="relative">
                                    <div className="rounded-3xl overflow-hidden shadow-2xl relative h-96">
                                        <Image
                                            src={`${STRAPI_URL}/uploads/dental_consultation_d555f4a87c.jpg`}
                                            alt="Dental philosophy"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute -top-6 -left-6 bg-sky-500 w-32 h-32 rounded-full"
                                    ></motion.div>
                                    <motion.div
                                        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                                        className="absolute -bottom-6 -right-6 bg-sky-500 w-24 h-24 rounded-full"
                                    ></motion.div>
                                </div>
                            </motion.div>

                            <motion.div className="space-y-6 order-1 md:order-2" variants={staggerContainer}>
                                {philosophy.badge && (
                                    <motion.div variants={fadeIn} className="inline-block px-4 py-2 bg-sky-100 rounded-full">
                                        <span className="text-sky-600 font-medium">{philosophy.badge}</span>
                                    </motion.div>
                                )}

                                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900">
                                    {philosophy.title}
                                </motion.h2>

                                {philosophy.quote && (
                                    <motion.div variants={scaleIn} className="flex items-center gap-3 p-6 bg-sky-50 rounded-2xl border-l-4 border-sky-500">
                                        <Sprout className="w-8 h-8 text-sky-600 flex-shrink-0" />
                                        <p className="text-xl md:text-2xl font-serif italic text-sky-700">
                                            "{philosophy.quote}"
                                        </p>
                                    </motion.div>
                                )}

                                {philosophy.description && (
                                    <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
                                        {philosophy.description}
                                    </motion.p>
                                )}

                                {philosophy.pillars && (
                                    <motion.div className="grid grid-cols-3 gap-4 pt-4" variants={staggerContainer}>
                                        {philosophy.pillars.map((pillar: any, index: number) => (
                                            <motion.div
                                                key={index}
                                                variants={scaleIn}
                                                whileHover={{ scale: 1.05 }}
                                                className="text-center p-4 bg-white rounded-xl shadow-md"
                                            >
                                                <p className="text-2xl md:text-3xl font-bold text-sky-600 mb-2">
                                                    {pillar.title}
                                                </p>
                                                <p className="text-sm text-slate-600">{pillar.subtitle}</p>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            )}

            {/* 5. CORE VALUES SECTION - CLEAN GRID LAYOUT (2026 REDESIGN) */}
            {coreValues && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-24 md:py-32 max-w-7xl mx-auto relative overflow-hidden"
                >
                    {/* Subtle background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50/30 to-white pointer-events-none"></div>
                    <motion.div
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.03, 0.06, 0.03]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400 rounded-full blur-3xl pointer-events-none"
                    ></motion.div>

                    <div className="relative z-10">
                        {/* Header with badge */}
                        <motion.div className="text-center mb-16" variants={staggerContainer}>
                            {/* Small badge above title */}
                            <motion.div 
                                variants={fadeIn} 
                                className="inline-block px-5 py-2 bg-gradient-to-r from-sky-100 to-blue-100 rounded-full mb-6 border border-sky-200/50"
                            >
                                <span className="text-sky-700 font-semibold text-sm uppercase tracking-wider">
                                    {coreValues.badge || 'Core Values'}
                                </span>
                            </motion.div>

                            <motion.h2 
                                variants={fadeInUp} 
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
                            >
                                {coreValues.title}
                            </motion.h2>
                            
                            {coreValues.description && (
                                <motion.p 
                                    variants={fadeInUp} 
                                    className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                                >
                                    {coreValues.description}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Clean Grid Layout - 3 Cards */}
                        {coreValues.values && (
                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                                variants={staggerContainer}
                            >
                                {coreValues.values.map((value: any, index: number) => {
                                    const Icon = iconMap[value.icon] || Heart
                                    return (
                                        <motion.div
                                            key={index}
                                            variants={scaleIn}
                                            whileHover={{ 
                                                y: -12, 
                                                transition: { duration: 0.3, ease: "easeOut" }
                                            }}
                                            className="group"
                                        >
                                            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-sky-200 relative overflow-hidden h-full flex flex-col">
                                                {/* Hover gradient background */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                
                                                {/* Content */}
                                                <div className="relative z-10 flex flex-col items-center text-center flex-grow">
                                                    {/* Icon */}
                                                    <motion.div 
                                                        className="w-20 h-20 bg-gradient-to-br from-sky-100 to-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300"
                                                        whileHover={{ 
                                                            scale: 1.1,
                                                            rotate: [0, -5, 5, 0],
                                                            transition: { duration: 0.5 }
                                                        }}
                                                    >
                                                        <Icon className="w-10 h-10 text-sky-600" />
                                                    </motion.div>
                                                    
                                                    {/* Title */}
                                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                                                        {value.title}
                                                    </h3>
                                                    
                                                    {/* Description */}
                                                    <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                                        {value.description}
                                                    </p>
                                                </div>

                                                {/* Decorative corner accent */}
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sky-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        )}
                    </div>
                </motion.section>
            )}

            {/* 6. COMMITMENT SECTION */}
            {commitment && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white"
                >
                    <div className="max-w-7xl mx-auto">
                        <motion.div className="text-center mb-16" variants={staggerContainer}>
                            {commitment.badge && (
                                <motion.div variants={fadeIn} className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                                    <span className="text-sky-600 font-medium">{commitment.badge}</span>
                                </motion.div>
                            )}
                            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                                {commitment.title}
                            </motion.h2>
                            {commitment.description && (
                                <motion.p variants={fadeInUp} className="text-xl text-slate-600 max-w-3xl mx-auto">
                                    {commitment.description}
                                </motion.p>
                            )}
                        </motion.div>

                        {commitmentItems.length > 0 && (
                            <div className="max-w-4xl mx-auto">
                                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 min-h-[300px]">
                                    {currentSlideItems.length > 0 ? (
                                        <motion.div 
                                            className={`grid gap-0 ${
                                                currentSlideItems.length === 1 
                                                    ? 'grid-cols-1' 
                                                    : currentSlideItems.length === 2 
                                                    ? 'grid-cols-1 md:grid-cols-2' 
                                                    : 'grid-cols-1 md:grid-cols-3'
                                            }`}
                                            key={currentCommitmentIndex}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {currentSlideItems.map((item: any, index: number) => {
                                                const Icon = iconMap[item.icon] || Star
                                                const itemsInSlide = currentSlideItems.length
                                                return (
                                                    <div
                                                        key={`${currentCommitmentIndex}-${index}`}
                                                        className={`p-8 ${index < itemsInSlide - 1 ? 'md:border-r border-slate-200' : ''}`}
                                                    >
                                                        <div className="flex flex-col items-center text-center">
                                                            <motion.div
                                                                whileHover={{ scale: 1.1, rotate: 360 }}
                                                                transition={{ duration: 0.6 }}
                                                                className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center shadow-lg mb-4"
                                                            >
                                                                <Icon className="w-8 h-8 text-white" />
                                                            </motion.div>
                                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                                            {item.subtitle && (
                                                                <p className="text-sm text-sky-600 uppercase tracking-wider mb-3 font-semibold">
                                                                    {item.subtitle}
                                                                </p>
                                                            )}
                                                            <p className="text-slate-600 leading-relaxed text-sm">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </motion.div>
                                    ) : (
                                        <div className="flex items-center justify-center h-[300px]">
                                            <p className="text-slate-400">Loading...</p>
                                        </div>
                                    )}
                                </div>

                                {totalSlides > 1 && (
                                    <div className="flex items-center justify-center gap-4">
                                        <button
                                            onClick={handlePrevSlide}
                                            disabled={isTransitioning}
                                            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            aria-label="Previous slide"
                                            type="button"
                                        >
                                            <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        
                                        <div className="flex gap-2">
                                            {Array.from({ length: totalSlides }).map((_, index: number) => (
                                                <button
                                                    key={`dot-${index}`}
                                                    onClick={() => handleGoToSlide(index)}
                                                    disabled={isTransitioning}
                                                    type="button"
                                                    className={`h-2 rounded-full transition-all disabled:cursor-not-allowed ${
                                                        index === currentCommitmentIndex ? 'bg-sky-600 w-8' : 'bg-gray-300 w-2'
                                                    }`}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            onClick={handleNextSlide}
                                            disabled={isTransitioning}
                                            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            aria-label="Next slide"
                                            type="button"
                                        >
                                            <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.section>
            )}

            {/* 7. CTA SECTION - PREMIUM 2026 REDESIGN */}
            {cta && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-24 md:py-32 relative overflow-hidden"
                >
                    {/* Soft gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100"></div>
                    
                    {/* Animated background blobs */}
                    <motion.div
                        animate={{ 
                            scale: [1, 1.2, 1],
                            x: [0, 30, 0],
                            y: [0, -20, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl"
                    ></motion.div>
                    <motion.div
                        animate={{ 
                            scale: [1, 1.3, 1],
                            x: [0, -40, 0],
                            y: [0, 30, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                        className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
                    ></motion.div>
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Content Side */}
                            <motion.div
                                className="space-y-8"
                                variants={staggerContainer}
                            >
                                {cta.badge && (
                                    <motion.div 
                                        variants={fadeIn} 
                                        className="inline-block px-5 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-sky-100"
                                    >
                                        <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">{cta.badge}</span>
                                    </motion.div>
                                )}

                                <motion.h2 
                                    variants={fadeInUp} 
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
                                >
                                    {cta.title || "Ready to transform your smile?"}
                                </motion.h2>

                                {cta.description && (
                                    <motion.p 
                                        variants={fadeInUp} 
                                        className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl"
                                    >
                                        {cta.description}
                                    </motion.p>
                                )}

                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 pt-4"
                                    variants={staggerContainer}
                                >
                                    {cta.primaryButtonText && (
                                        <motion.div 
                                            variants={scaleIn} 
                                            whileHover={{ scale: 1.05, y: -4 }} 
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Link
                                                href={cta.primaryButtonLink || '#'}
                                                className="group relative px-8 py-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 font-bold text-lg overflow-hidden"
                                            >
                                                {/* Button glow effect */}
                                                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                                                
                                                <Calendar className="w-6 h-6 relative z-10" />
                                                <span className="relative z-10">{cta.primaryButtonText}</span>
                                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                                            </Link>
                                        </motion.div>
                                    )}

                                    {cta.secondaryButtonText && (
                                        <motion.div 
                                            variants={scaleIn} 
                                            whileHover={{ scale: 1.05 }} 
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Link
                                                href={cta.secondaryButtonLink || '#'}
                                                className="px-8 py-5 bg-white/80 backdrop-blur-md text-slate-900 border-2 border-slate-200 rounded-full hover:bg-white hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold text-lg"
                                            >
                                                <span>{cta.secondaryButtonText}</span>
                                            </Link>
                                        </motion.div>
                                    )}
                                </motion.div>

                                {cta.contactInfo && cta.contactInfo.length > 0 && (
                                    <motion.div 
                                        variants={fadeIn} 
                                        className="pt-8 flex flex-wrap gap-6 text-slate-600"
                                    >
                                        {cta.contactInfo.map((info: any, index: number) => (
                                            <motion.div
                                                key={index}
                                                whileHover={{ scale: 1.05 }}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="text-base">{info.text}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Image Side */}
                            <motion.div
                                variants={scaleIn}
                                className="relative"
                            >
                                {/* Glassmorphism card with image */}
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                    {/* Placeholder for dental clinic image */}
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
                                    
                                    {/* Floating badge */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center">
                                                <Star className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-slate-900">4.9/5</p>
                                                <p className="text-sm text-slate-600">Patient Rating</p>
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
                </motion.section>
            )}
        </div>
    )
}
