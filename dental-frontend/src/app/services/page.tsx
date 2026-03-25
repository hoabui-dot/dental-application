import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { apiClient } from '@/src/lib/api/client';

interface ServiceCard {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  color: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ServicesListingData {
  hero: {
    title: string;
    description: string;
  };
  services: ServiceCard[];
  cta: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
  features: Feature[];
}

interface StrapiResponse {
  data: Array<{
    id: number;
    documentId: string;
    title: string;
    slug: string;
    content?: any;
    publishedAt: string;
  }>;
  meta?: any;
}

async function getServicesListingData(): Promise<ServicesListingData | null> {
  try {
    const response = await apiClient<StrapiResponse>('/api/pages', {
      params: {
        'filters[slug][$eq]': 'services-listing',
      },
      isDraftMode: false,
      tags: ['pages', 'page-services-listing'], // Cache tags for webhook revalidation
    });

    if (!response.data || response.data.length === 0) {
      return null;
    }

    const pageData = response.data[0];

    // Parse content JSON
    if (pageData.content && typeof pageData.content === 'string') {
      return JSON.parse(pageData.content);
    } else if (pageData.content && typeof pageData.content === 'object') {
      return pageData.content;
    }

    return null;
  } catch (error) {
    console.error('Error fetching services listing:', error);
    return null;
  }
}

export const metadata = {
  title: 'Dental Services | Saigon International Dental Clinic',
  description: 'Professional dental services: Dental Implants, Invisalign Braces, Porcelain Veneers, Teeth Whitening',
};

export default async function ServicesPage() {
  const listingData = await getServicesListingData();

  // Fallback data if API fails
  const hero = listingData?.hero || {
    title: 'Professional Dental Services',
    description: 'We provide a wide range of dental services with modern technology and experienced doctors'
  };

  const services = listingData?.services || [];
  const cta = listingData?.cta;
  const features = listingData?.features || [];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Matching Service Template Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
              Dental Services
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {hero.title}
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Matching Service Template Card Design */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className="text-6xl mb-6">{service.icon}</div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-sky-500 transition-colors">
                  {service.title}
                </h2>

                {/* English Title */}
                <p className="text-sm text-gray-500 mb-4">
                  {service.titleEn}
                </p>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* CTA */}
                <div className="inline-flex items-center gap-2 text-sky-500 font-medium group-hover:gap-4 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section - Matching Service Template Design */}
      {cta && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {cta.title}
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={cta.primaryButton.link}
                className="px-8 py-4 bg-white text-sky-600 rounded-2xl font-semibold hover:shadow-xl transition-all"
              >
                {cta.primaryButton.text}
              </Link>
              <Link
                href={cta.secondaryButton.link}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-2xl font-semibold hover:bg-white/20 transition-all"
              >
                {cta.secondaryButton.text}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section - Matching Service Template Design */}
      {features.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-white to-sky-50">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export const revalidate = false; // Webhook-based revalidation
export const dynamicParams = true;
