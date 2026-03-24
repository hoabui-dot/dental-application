import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContactPageClient from './ContactPageClient';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function getContactPageData() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/pages?filters[slug][$eq]=contact`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
        },
        next: { revalidate: 60 }
      }
    );

    if (!res.ok) {
      console.error('Failed to fetch contact page:', res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    
    if (!data.data || data.data.length === 0) {
      return null;
    }

    const page = data.data[0];
    
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
      } catch (e) {
        console.error('Failed to parse page content:', e);
      }
    }

    return content;
  } catch (error) {
    console.error('Error fetching contact page:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Us - Saigon International Dental Clinic',
    description: 'Get in touch with Saigon International Dental Clinic. Visit our locations, call us, or send us a message.'
  };
}

export default async function ContactPage() {
  const content = await getContactPageData();

  if (!content) {
    notFound();
  }

  return <ContactPageClient content={content} />;
}
