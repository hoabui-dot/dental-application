import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutPageClient from './AboutPageClient';

interface AboutPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  content?: any;
  publishedAt: string;
}

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await fetch(
      `${STRAPI_URL}/api/pages?filters[slug][$eq]=about-us&populate=*`,
      {
        headers,
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch about page:', response.statusText);
      return null;
    }

    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();

  if (!page) {
    return {
      title: 'About Us',
    };
  }

  return {
    title: page.title,
    description: page.description || 'Learn about our mission, values, and team',
  };
}

export default async function AboutPage() {
  const page = await getAboutPage();

  if (!page) {
    notFound();
  }

  // Parse content
  let pageData = page.content;
  if (typeof pageData === 'string') {
    try {
      pageData = JSON.parse(pageData);
    } catch (e) {
      pageData = {};
    }
  }

  return <AboutPageClient page={page} pageData={pageData} />;
}
