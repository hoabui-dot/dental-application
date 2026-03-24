'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
    Award, TrendingUp, Users, Scan, UserCheck, FileText, Sofa,
    Lightbulb, Shield, Heart, Smile, Star, Sprout, Calendar, ArrowRight
} from 'lucide-react'

/**
 * About Us Content Component
 * 
 * Matches the UI design from "Implement About Us Page" folder 100%
 * 
 * Design System:
 * - Primary color: Sky Blue (#38BDF8 / sky-500)
 * - Background: White / Light Blue gradient (sky-50)
 * - Rounded corners: 16-24px (rounded-2xl, rounded-3xl)
 * - Shadows: shadow-lg, shadow-xl, shadow-2xl
 * - Spacious layout with proper padding
 * - Text colors: slate-900 (headings), slate-600 (body), sky-600 (accents)
 */

interface AboutUsContentProps {
    content: any
    page: any
}

const iconMap: Record<string, any> = {
    Award, TrendingUp, Users, Scan, UserCheck, FileText, Sofa,
    Lightbulb, Shield, Heart, Smile, Star, Sprout
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
                <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left - Text Content */}
                        <div className="space-y-6">
                            {hero.badge && (
                                <div className="inline-block px-4 py-2 bg-sky-100 rounded-full">
                                    <span className="text-sky-600 font-medium">{hero.badge}</span>
                                </div>
                            )}

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
                                {hero.title}
                            </h1>

                            {hero.subtitle && (
                                <p className="text-xl md:text-2xl text-sky-600 font-medium">
                                    {hero.subtitle}
                                </p>
                            )}

                            {hero.description && (
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {hero.description}
                                </p>
                            )}
                        </div>

                        {/* Right - Image Collage (placeholder for now) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="rounded-3xl overflow-hidden shadow-lg bg-sky-100 h-64"></div>
                                <div className="rounded-3xl overflow-hidden shadow-lg bg-sky-50 h-48"></div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="rounded-3xl overflow-hidden shadow-lg bg-sky-50 h-48"></div>
                                <div className="rounded-3xl overflow-hidden shadow-lg bg-sky-100 h-64"></div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 2. ACHIEVEMENTS SECTION */}
            {achievements && (
                <section className="px-6 py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Image Side */}
                            <div className="relative">
                                <div className="rounded-3xl overflow-hidden shadow-2xl bg-sky-100 h-96"></div>
                                {/* Floating achievement badge */}
                                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-sky-100 p-3 rounded-xl">
                                            <Award className="w-8 h-8 text-sky-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-slate-900">2026</p>
                                            <p className="text-sm text-slate-600">Excellence Award</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="space-y-8">
                                <div>
                                    {achievements.badge && (
                                        <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                                            <span className="text-sky-600 font-medium">{achievements.badge}</span>
                                        </div>
                                    )}
                                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                        {achievements.title}
                                    </h2>
                                    {achievements.description && (
                                        <p className="text-lg text-slate-600 leading-relaxed">
                                            {achievements.description}
                                        </p>
                                    )}
                                </div>

                                {/* Achievement Stats */}
                                {achievements.features && (
                                    <div className="grid grid-cols-1 gap-6">
                                        {achievements.features.map((feature: any, index: number) => {
                                            const Icon = iconMap[feature.icon] || Award
                                            return (
                                                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                                    <div className="bg-sky-100 p-3 rounded-xl flex-shrink-0">
                                                        <Icon className="w-6 h-6 text-sky-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-slate-900 mb-1">{feature.title}</h3>
                                                        <p className="text-slate-600">{feature.description}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 3. WHY CHOOSE US SECTION */}
            {whyChooseUs && (
                <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Content Side */}
                        <div className="space-y-8">
                            <div>
                                {whyChooseUs.badge && (
                                    <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                                        <span className="text-sky-600 font-medium">{whyChooseUs.badge}</span>
                                    </div>
                                )}
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                    {whyChooseUs.title}
                                </h2>
                                {whyChooseUs.description && (
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {whyChooseUs.description}
                                    </p>
                                )}
                            </div>

                            {/* Features Grid */}
                            {whyChooseUs.features && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {whyChooseUs.features.map((feature: any, index: number) => {
                                        const Icon = iconMap[feature.icon] || Scan
                                        return (
                                            <div
                                                key={index}
                                                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100"
                                            >
                                                <div className="bg-sky-100 p-3 rounded-xl w-fit mb-4">
                                                    <Icon className="w-6 h-6 text-sky-600" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                                <p className="text-sm text-slate-600">{feature.description}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Image Collage Side */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="rounded-3xl overflow-hidden shadow-lg bg-sky-100 h-56"></div>
                                <div className="rounded-3xl overflow-hidden shadow-lg bg-sky-50 h-40"></div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="rounded-3xl overflow-hidden shadow-lg bg-sky-50 h-40"></div>
                                <div className="rounded-3xl overflow-hidden shadow-lg bg-sky-100 h-56"></div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 4. PHILOSOPHY SECTION */}
            {philosophy && (
                <section className="px-6 py-16 md:py-24 bg-gradient-to-b from-white to-sky-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Image Side */}
                            <div className="order-2 md:order-1">
                                <div className="relative">
                                    <div className="rounded-3xl overflow-hidden shadow-2xl bg-sky-100 h-96"></div>
                                    {/* Decorative elements */}
                                    <div className="absolute -top-6 -left-6 bg-sky-500 w-32 h-32 rounded-full opacity-10"></div>
                                    <div className="absolute -bottom-6 -right-6 bg-sky-500 w-24 h-24 rounded-full opacity-10"></div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="space-y-6 order-1 md:order-2">
                                {philosophy.badge && (
                                    <div className="inline-block px-4 py-2 bg-sky-100 rounded-full">
                                        <span className="text-sky-600 font-medium">{philosophy.badge}</span>
                                    </div>
                                )}

                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                                    {philosophy.title}
                                </h2>

                                {philosophy.quote && (
                                    <div className="flex items-center gap-3 p-6 bg-sky-50 rounded-2xl border-l-4 border-sky-500">
                                        <Sprout className="w-8 h-8 text-sky-600 flex-shrink-0" />
                                        <p className="text-xl md:text-2xl font-serif italic text-sky-700">
                                            "{philosophy.quote}"
                                        </p>
                                    </div>
                                )}

                                {philosophy.description && (
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {philosophy.description}
                                    </p>
                                )}

                                {/* Philosophy pillars */}
                                {philosophy.pillars && (
                                    <div className="grid grid-cols-3 gap-4 pt-4">
                                        {philosophy.pillars.map((pillar: any, index: number) => (
                                            <div key={index} className="text-center p-4 bg-white rounded-xl shadow-md">
                                                <p className="text-2xl md:text-3xl font-bold text-sky-600 mb-2">
                                                    {pillar.title}
                                                </p>
                                                <p className="text-sm text-slate-600">{pillar.subtitle}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 5. CORE VALUES SECTION */}
            {coreValues && (
                <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        {coreValues.badge && (
                            <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                                <span className="text-sky-600 font-medium">{coreValues.badge}</span>
                            </div>
                        )}
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            {coreValues.title}
                        </h2>
                        {coreValues.description && (
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                {coreValues.description}
                            </p>
                        )}
                    </div>

                    {/* Desktop View - Circular Layout */}
                    {coreValues.values && (
                        <>
                            <div className="hidden md:block">
                                <div className="relative max-w-4xl mx-auto h-96">
                                    {/* Center Circle */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full shadow-2xl flex items-center justify-center z-10">
                                        <div className="text-center text-white">
                                            <p className="text-4xl font-bold mb-2">{coreValues.values.length}</p>
                                            <p className="text-sm uppercase tracking-wider">Core Values</p>
                                        </div>
                                    </div>

                                    {/* Value Cards */}
                                    {coreValues.values.map((value: any, index: number) => {
                                        const Icon = iconMap[value.icon] || Heart
                                        const positions = [
                                            'top-0 left-1/2 -translate-x-1/2 -translate-y-12',
                                            'bottom-0 left-0 translate-y-12',
                                            'bottom-0 right-0 translate-y-12'
                                        ]
                                        return (
                                            <div
                                                key={index}
                                                className={`absolute ${positions[index] || positions[0]} w-72`}
                                            >
                                                <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100">
                                                    <div className="bg-sky-100 p-4 rounded-2xl w-fit mb-4 mx-auto">
                                                        <Icon className="w-8 h-8 text-sky-600" />
                                                    </div>
                                                    <h3 className="text-2xl font-semibold text-slate-900 mb-3 text-center">{value.title}</h3>
                                                    <p className="text-slate-600 text-center leading-relaxed">
                                                        {value.description}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Mobile View - Stacked Layout */}
                            <div className="md:hidden space-y-6">
                                {coreValues.values.map((value: any, index: number) => {
                                    const Icon = iconMap[value.icon] || Heart
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
                                        >
                                            <div className="bg-sky-100 p-4 rounded-2xl w-fit mb-4 mx-auto">
                                                <Icon className="w-8 h-8 text-sky-600" />
                                            </div>
                                            <h3 className="text-2xl font-semibold text-slate-900 mb-3 text-center">{value.title}</h3>
                                            <p className="text-slate-600 text-center leading-relaxed">
                                                {value.description}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}
                </section>
            )}

            {/* 6. COMMITMENT SECTION */}
            {commitment && (
                <section className="px-6 py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            {commitment.badge && (
                                <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                                    <span className="text-sky-600 font-medium">{commitment.badge}</span>
                                </div>
                            )}
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                {commitment.title}
                            </h2>
                            {commitment.description && (
                                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                    {commitment.description}
                                </p>
                            )}
                        </div>

                        {commitment.commitments && (
                            <>
                                {/* Timeline - Desktop */}
                                <div className="hidden md:block relative">
                                    {/* Vertical line */}
                                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-sky-200 -translate-x-1/2"></div>

                                    <div className="space-y-16">
                                        {commitment.commitments.map((item: any, index: number) => {
                                            const Icon = iconMap[item.icon] || Star
                                            const isEven = index % 2 === 0

                                            return (
                                                <div key={index} className="relative">
                                                    {/* Center number badge */}
                                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center shadow-lg z-10">
                                                        <span className="text-2xl font-bold text-white">{item.number}</span>
                                                    </div>

                                                    <div className={`grid grid-cols-2 gap-8 ${isEven ? '' : 'text-right'}`}>
                                                        {/* Content */}
                                                        <div className={isEven ? 'pr-12' : 'col-start-2 pl-12'}>
                                                            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-slate-100">
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
                                                            </div>
                                                        </div>

                                                        {/* Empty space on the other side */}
                                                        <div className={isEven ? 'col-start-2' : 'col-start-1'}></div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Mobile Layout */}
                                <div className="md:hidden space-y-8">
                                    {commitment.commitments.map((item: any, index: number) => {
                                        const Icon = iconMap[item.icon] || Star

                                        return (
                                            <div key={index} className="relative">
                                                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                                            <span className="text-xl font-bold text-white">{item.number}</span>
                                                        </div>
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
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </section>
            )}

            {/* 7. CTA SECTION */}
            {cta && (
                <section className="px-6 py-16 md:py-24">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative overflow-hidden bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 rounded-3xl shadow-2xl">
                            {/* Background decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
                                {cta.badge && (
                                    <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                                        <span className="text-white font-medium">{cta.badge}</span>
                                    </div>
                                )}

                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    {cta.title}
                                </h2>

                                {cta.description && (
                                    <p className="text-xl text-sky-50 mb-10 max-w-2xl mx-auto">
                                        {cta.description}
                                    </p>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    {cta.primaryButtonText && (
                                        <Link
                                            href={cta.primaryButtonLink || '#'}
                                            className="group px-8 py-4 bg-white text-sky-600 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-3 font-semibold"
                                        >
                                            <Calendar className="w-5 h-5" />
                                            <span className="text-lg">{cta.primaryButtonText}</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    )}

                                    {cta.secondaryButtonText && (
                                        <Link
                                            href={cta.secondaryButtonLink || '#'}
                                            className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full hover:bg-white/10 transition-all flex items-center gap-2 font-semibold"
                                        >
                                            <span className="text-lg">{cta.secondaryButtonText}</span>
                                        </Link>
                                    )}
                                </div>

                                {/* Contact info */}
                                {cta.contactInfo && cta.contactInfo.length > 0 && (
                                    <div className="mt-12 pt-8 border-t border-white/20">
                                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-white/90">
                                            {cta.contactInfo.map((info: any, index: number) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    {index > 0 && <div className="hidden md:block w-px h-6 bg-white/20 mr-6"></div>}
                                                    <span>{info.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}
