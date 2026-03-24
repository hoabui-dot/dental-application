import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContactPageClient from './ContactPageClient';

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

async function getContactPageData() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/pages?filters[slug][$eq]=contact`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`
        },
        cache: 'no-store'
      }
    );

    if (!res.ok) {
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
        return null;
      }
    }

    return content;
  } catch (error) {
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

export const revalidate = false; // Webhook-based revalidation
export const dynamicParams = true;
