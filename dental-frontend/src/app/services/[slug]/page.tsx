import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';
import { apiClient } from '@/src/lib/api/client';

interface ServicePage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  content?: any;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface StrapiResponse {
  data: ServicePage[];
  meta?: any;
}

async function getServiceBySlug(slug: string): Promise<ServicePage | null> {
  try {
    const response = await apiClient<StrapiResponse>('/api/pages', {
      params: {
        'filters[slug][$eq]': slug,
        populate: '*',
      },
      isDraftMode: false,
      tags: ['pages', `page-${slug}`], // Cache tags for webhook revalidation
    });

    if (!response.data || response.data.length === 0) {
      return null;
    }

    return response.data[0];
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const response = await apiClient<StrapiResponse>('/api/pages', {
      params: {
        'filters[slug][$in]': 'implant,invisalign,veneer,whitening',
        'fields[0]': 'slug',
      },
      isDraftMode: false,
      tags: ['pages'], // Cache tags for webhook revalidation
    });

    return response.data?.map((page) => page.slug) || [];
  } catch (error) {
    console.error('Error fetching service slugs:', error);
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Saigon International Dental Clinic`,
    description: service.description || service.title,
  };
}

export default async function ServicePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Parse content
  let serviceData = service.content;
  if (typeof serviceData === 'string') {
    try {
      serviceData = JSON.parse(serviceData);
    } catch (e) {
      serviceData = {};
    }
  }

  return <ServicePageClient service={service} serviceData={serviceData} />;
}

export const revalidate = false; // Webhook-based revalidation
export const dynamicParams = true;
