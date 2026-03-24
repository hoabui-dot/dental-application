'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
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

export function AboutUsContent({ content, page }: AboutUsContentProps) {
    if (!content) {
        return (
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{page?.title || 'About Us'}</h1>
                <p className="text-lg text-slate-600">{page?.description}</p>
            </div>
        )
    }

    const { hero, achievements, whyChooseUs, philosophy, coreValues, commitment, cta } = content

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

            {/* 5. CORE VALUES SECTION */}
            {coreValues && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-24 md:py-32 max-w-7xl mx-auto"
                >
                    <motion.div className="text-center mb-16" variants={staggerContainer}>
                        {coreValues.badge && (
                            <motion.div variants={fadeIn} className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                                <span className="text-sky-600 font-medium">{coreValues.badge}</span>
                            </motion.div>
                        )}
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            {coreValues.title}
                        </motion.h2>
                        {coreValues.description && (
                            <motion.p variants={fadeInUp} className="text-lg text-slate-600 max-w-2xl mx-auto">
                                {coreValues.description}
                            </motion.p>
                        )}
                    </motion.div>

                    {coreValues.values && (
                        <>
                            <div className="hidden md:block">
                                <div className="relative max-w-4xl mx-auto h-[600px]">
                                    <motion.div
                                        variants={scaleIn}
                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full shadow-2xl flex items-center justify-center z-10"
                                    >
                                        <div className="text-center text-white">
                                            <p className="text-4xl font-bold mb-2">{coreValues.values.length}</p>
                                            <p className="text-sm uppercase tracking-wider">Core Values</p>
                                        </div>
                                    </motion.div>

                                    {coreValues.values.map((value: any, index: number) => {
                                        const Icon = iconMap[value.icon] || Heart
                                        const positions = [
                                            'top-0 left-1/2 -translate-x-1/2 -translate-y-0',
                                            'bottom-0 left-0 translate-y-0',
                                            'bottom-0 right-0 translate-y-0'
                                        ]
                                        return (
                                            <motion.div
                                                key={index}
                                                variants={fadeInUp}
                                                custom={index}
                                                whileHover={{ y: -8, scale: 1.02 }}
                                                className={`absolute ${positions[index] || positions[0]} w-72`}
                                            >
                                                <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-slate-100">
                                                    <div className="bg-sky-100 p-4 rounded-2xl w-fit mb-4 mx-auto">
                                                        <Icon className="w-8 h-8 text-sky-600" />
                                                    </div>
                                                    <h3 className="text-2xl font-semibold text-slate-900 mb-3 text-center">{value.title}</h3>
                                                    <p className="text-slate-600 text-center leading-relaxed">
                                                        {value.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </div>

                            <motion.div className="md:hidden space-y-6" variants={staggerContainer}>
                                {coreValues.values.map((value: any, index: number) => {
                                    const Icon = iconMap[value.icon] || Heart
                                    return (
                                        <motion.div
                                            key={index}
                                            variants={scaleIn}
                                            className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
                                        >
                                            <div className="bg-sky-100 p-4 rounded-2xl w-fit mb-4 mx-auto">
                                                <Icon className="w-8 h-8 text-sky-600" />
                                            </div>
                                            <h3 className="text-2xl font-semibold text-slate-900 mb-3 text-center">{value.title}</h3>
                                            <p className="text-slate-600 text-center leading-relaxed">
                                                {value.description}
                                            </p>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        </>
                    )}
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
                            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                {commitment.title}
                            </motion.h2>
                            {commitment.description && (
                                <motion.p variants={fadeInUp} className="text-lg text-slate-600 max-w-2xl mx-auto">
                                    {commitment.description}
                                </motion.p>
                            )}
                        </motion.div>

                        {commitment.commitments && (
                            <>
                                <div className="hidden md:block relative">
                                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-sky-200 -translate-x-1/2"></div>

                                    <motion.div className="space-y-16" variants={staggerContainer}>
                                        {commitment.commitments.map((item: any, index: number) => {
                                            const Icon = iconMap[item.icon] || Star
                                            const isEven = index % 2 === 0

                                            return (
                                                <motion.div key={index} variants={fadeInUp} className="relative">
                                                    <motion.div
                                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                                        transition={{ duration: 0.5 }}
                                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center shadow-lg z-10"
                                                    >
                                                        <span className="text-2xl font-bold text-white">{item.number}</span>
                                                    </motion.div>

                                                    <div className={`grid grid-cols-2 gap-8 ${isEven ? '' : 'text-right'}`}>
                                                        <div className={isEven ? 'pr-12' : 'col-start-2 pl-12'}>
                                                            <motion.div
                                                                whileHover={{ y: -4, x: isEven ? 4 : -4 }}
                                                                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-slate-100"
                                                            >
                                                                <div className={`bg-sky-100 p-4 rounded-2xl w-fit mb-4 ${isEven ? '' : 'ml-auto'}`}>
                                                                    <Icon className="w-8 h-8 text-sky-600" />
                                                                </div>
                                                                <h3 className="text-2xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                                                                {item.subtitle && (
                                                                    <p className="text-sm text-sky-600 uppercase tracking-wider mb-3">
                                                                        {item.subtitle}
                                                                    </p>
                                                                )}
                                                                <p className="text-slate-600 leading-relaxed">
                                                                    {item.description}
                                                                </p>
                                                            </motion.div>
                                                        </div>
                                                        <div className={isEven ? 'col-start-2' : 'col-start-1'}></div>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </motion.div>
                                </div>

                                <motion.div className="md:hidden space-y-8" variants={staggerContainer}>
                                    {commitment.commitments.map((item: any, index: number) => {
                                        const Icon = iconMap[item.icon] || Star

                                        return (
                                            <motion.div key={index} variants={scaleIn} className="relative">
                                                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <motion.div
                                                            whileHover={{ rotate: 360 }}
                                                            transition={{ duration: 0.5 }}
                                                            className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                                                        >
                                                            <span className="text-xl font-bold text-white">{item.number}</span>
                                                        </motion.div>
                                                        <div className="bg-sky-100 p-3 rounded-xl">
                                                            <Icon className="w-6 h-6 text-sky-600" />
                                                        </div>
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                                                    {item.subtitle && (
                                                        <p className="text-sm text-sky-600 uppercase tracking-wider mb-3">
                                                            {item.subtitle}
                                                        </p>
                                                    )}
                                                    <p className="text-slate-600 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </motion.div>
                            </>
                        )}
                    </div>
                </motion.section>
            )}

            {/* 7. CTA SECTION */}
            {cta && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="px-6 py-16 md:py-24"
                >
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            variants={scaleIn}
                            className="relative overflow-hidden bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 rounded-3xl shadow-2xl"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"
                            ></motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                                className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"
                            ></motion.div>

                            <motion.div
                                className="relative px-8 py-16 md:px-16 md:py-20 text-center"
                                variants={staggerContainer}
                            >
                                {cta.badge && (
                                    <motion.div variants={fadeIn} className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                                        <span className="text-white font-medium">{cta.badge}</span>
                                    </motion.div>
                                )}

                                <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    {cta.title}
                                </motion.h2>

                                {cta.description && (
                                    <motion.p variants={fadeInUp} className="text-xl text-sky-50 mb-10 max-w-2xl mx-auto">
                                        {cta.description}
                                    </motion.p>
                                )}

                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                                    variants={staggerContainer}
                                >
                                    {cta.primaryButtonText && (
                                        <motion.div variants={scaleIn} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                                            <Link
                                                href={cta.primaryButtonLink || '#'}
                                                className="group px-8 py-4 bg-white text-sky-600 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 font-semibold"
                                            >
                                                <Calendar className="w-5 h-5" />
                                                <span className="text-lg">{cta.primaryButtonText}</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </motion.div>
                                    )}

                                    {cta.secondaryButtonText && (
                                        <motion.div variants={scaleIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Link
                                                href={cta.secondaryButtonLink || '#'}
                                                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full hover:bg-white/10 transition-all flex items-center gap-2 font-semibold"
                                            >
                                                <span className="text-lg">{cta.secondaryButtonText}</span>
                                            </Link>
                                        </motion.div>
                                    )}
                                </motion.div>

                                {cta.contactInfo && cta.contactInfo.length > 0 && (
                                    <motion.div variants={fadeIn} className="mt-12 pt-8 border-t border-white/20">
                                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-white/90">
                                            {cta.contactInfo.map((info: any, index: number) => (
                                                <motion.div
                                                    key={index}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    {index > 0 && <div className="hidden md:block w-px h-6 bg-white/20 mr-6"></div>}
                                                    <span>{info.text}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>
            )}
        </div>
    )
}
