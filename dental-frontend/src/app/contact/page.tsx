import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContactPageClient from './ContactPageClient';
import { apiClient } from '@/src/lib/api/client';

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

async function getContactPageData() {
  try {
    const response = await apiClient<StrapiResponse>('/api/pages', {
      params: {
        'filters[slug][$eq]': 'contact',
      },
      isDraftMode: false,
      tags: ['pages', 'page-contact'], // Cache tags for webhook revalidation
    });

    if (!response.data || response.data.length === 0) {
      console.error('[Contact Page] No data found');
      return null;
    }

    const page = response.data[0];

    // Parse the content JSON
    let content = {};
    if (page.content) {
      try {
        // Check if content is already an object or a string
        if (typeof page.content === 'string') {
          content = JSON.parse(page.content);
        } else if (typeof page.content === 'object') {
          content = page.content;
        }
        
        // Validate that content has expected structure
        if (!content || typeof content !== 'object') {
          console.error('[Contact Page] Invalid content structure');
          return null;
        }
        
      } catch (e) {
        console.error('[Contact Page] Error parsing content:', e);
        return null;
      }
    } else {
      console.error('[Contact Page] No content field found');
      return null;
    }

    return content;
  } catch (error) {
    console.error('[Contact Page] Error fetching data:', error);
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

  // Validate content structure
  if (typeof content !== 'object' || content === null) {
    console.error('[Contact Page] Invalid content type:', typeof content);
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Contact Page Error</h1>
          <p className="text-gray-600 mb-4">
            The contact page content is not properly configured.
          </p>
          <p className="text-sm text-gray-500">
            Please check the CMS configuration or contact support.
          </p>
        </div>
      </div>
    );
  }

  // Ensure we're passing a proper object to the client component
  try {
    return <ContactPageClient content={content} />;
  } catch (error) {
    console.error('[Contact Page] Error rendering client component:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Rendering Error</h1>
          <p className="text-gray-600">
            Unable to render the contact page. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}

export const revalidate = false; // Webhook-based revalidation
export const dynamicParams = true;
