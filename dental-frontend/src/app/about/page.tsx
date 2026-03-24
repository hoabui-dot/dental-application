import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutPageClient from './AboutPageClient';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function getAboutPageData() {
  try {
    console.log('[About Page] Fetching data from:', `${STRAPI_URL}/api/pages?filters[slug][$eq]=about-us&populate=*&status=published`);
    
    const res = await fetch(
      `${STRAPI_URL}/api/pages?filters[slug][$eq]=about-us&populate=*&status=published`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
        },
        next: { revalidate: 60 },
        cache: 'no-store' // Force fresh data
      }
    );

    if (!res.ok) {
      console.error('[About Page] Failed to fetch:', res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    console.log('[About Page] API response data length:', data.data?.length || 0);
    
    if (!data.data || data.data.length === 0) {
      console.error('[About Page] No data found');
      return null;
    }

    const page = data.data[0];
    console.log('[About Page] Found page:', page.title, 'Published:', page.publishedAt);
    
    // Parse the content JSON
    let content = {};
    if (page.content) {
      try {
        // Check if content is already an object or a string
        if (typeof page.content === 'string') {
          content = JSON.parse(page.content);
        } else {
          content = page.content;
        }
        console.log('[About Page] Content sections:', Object.keys(content));
      } catch (e) {
        console.error('[About Page] Failed to parse content:', e);
      }
    }

    return content;
  } catch (error) {
    console.error('[About Page] Error fetching data:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Us - Saigon International Dental Clinic',
    description: 'Learn about our mission, values, and the team behind Saigon International Dental Clinic'
  };
}

export default async function AboutPage() {
  const content = await getAboutPageData();

  if (!content) {
    notFound();
  }

  return <AboutPageClient content={content} />;
}
