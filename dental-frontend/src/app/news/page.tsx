import { NewsPageClient } from './NewsPageClient';
import { apiClient } from '@/src/lib/api/client';

interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  coverImage?: {
    url: string;
    alternativeText?: string;
  } | null;
  publishedAt: string;
}

interface NewsPageContent {
  hero: {
    title: string;
    description: string;
    searchPlaceholder: string;
  };
  categories: Array<{
    id: string;
    label: string;
  }>;
  sidebar: {
    popularPostsTitle: string;
    tagsTitle: string;
    tags: string[];
    cta: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
  };
  emptyState: {
    message: string;
  };
  readMoreText: string;
  readNowText: string;
}

interface StrapiBlogsResponse {
  data: BlogPost[];
  meta?: any;
}

interface StrapiPageResponse {
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

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    const response = await apiClient<StrapiBlogsResponse>('/api/blogs', {
      params: {
        populate: '*',
        sort: 'publishedAt:desc',
        'pagination[limit]': 50,
      },
      isDraftMode: false,
      tags: ['blogs'], // Cache tags for webhook revalidation
    });

    return response.data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

async function fetchNewsPageContent(): Promise<NewsPageContent | null> {
  try {
    const response = await apiClient<StrapiPageResponse>('/api/pages', {
      params: {
        'filters[slug][$eq]': 'news-listing',
        populate: '*',
      },
      isDraftMode: false,
      tags: ['pages', 'page-news-listing'], // Cache tags for webhook revalidation
    });

    if (response.data && response.data.length > 0) {
      const pageData = response.data[0];
      return JSON.parse(pageData.content);
    }

    return null;
  } catch (error) {
    console.error('Error fetching news page content:', error);
    return null;
  }
}

export default async function NewsPage() {
  const blogs = await fetchBlogs();
  const pageContent = await fetchNewsPageContent();

  // If page content is not found, show error
  if (!pageContent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">News Page Configuration Missing</h1>
          <p className="text-foreground-secondary mb-4">
            The news page content is not configured in the CMS.
          </p>
          <p className="text-sm text-foreground-muted">
            Please run the migration script: <code className="bg-gray-100 px-2 py-1 rounded">node migration_scripts/016-create-news-page.js</code>
          </p>
        </div>
      </div>
    );
  }

  const featuredBlog = blogs[0];
  const popularBlogs = blogs.slice(0, 3);

  return (
    <NewsPageClient
      initialBlogs={blogs}
      featuredBlog={featuredBlog}
      popularBlogs={popularBlogs}
      strapiUrl={STRAPI_URL}
      pageContent={pageContent}
    />
  );
}

export const revalidate = false; // Webhook-based revalidation
export const dynamicParams = true;
