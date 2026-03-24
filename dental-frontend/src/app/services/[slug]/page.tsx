import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageClient from './ServicePageClient';

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

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function getServiceBySlug(slug: string): Promise<ServicePage | null> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await fetch(
      `${STRAPI_URL}/api/pages?filters[slug][$eq]=${slug}&populate=*`,
      {
        headers,
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch service:', response.statusText);
      return null;
    }

    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await fetch(
      `${STRAPI_URL}/api/pages?filters[slug][$in]=implant,invisalign,veneer,whitening&fields[0]=slug`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.data?.map((page: any) => page.slug) || [];
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
      title: 'Dịch vụ không tìm thấy',
    };
  }

  return {
    title: `${service.title} | Nha Khoa Quốc Tế Sài Gòn`,
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
