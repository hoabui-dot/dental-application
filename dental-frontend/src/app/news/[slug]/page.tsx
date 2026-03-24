import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MarkdownContent } from '@/src/components/MarkdownContent';

interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: {
    url: string;
    alternativeText?: string;
  } | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await fetch(
      `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
      {
        headers,
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch blog:', response.statusText);
      return null;
    }

    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await fetch(
      `${STRAPI_URL}/api/blogs?fields[0]=slug`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.data?.map((blog: any) => blog.slug) || [];
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Bài viết không tìm thấy',
    };
  }

  return {
    title: `${blog.title} | Nha Khoa Quốc Tế Sài Gòn`,
    description: blog.excerpt || blog.title,
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const imageUrl = blog.coverImage?.url
    ? blog.coverImage.url.startsWith('http')
      ? blog.coverImage.url
      : `${STRAPI_URL}${blog.coverImage.url}`
    : null;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary-50 to-background py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-foreground-muted">
              <li>
                <Link href="/" className="hover:text-primary-600 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/news" className="hover:text-primary-600 transition-colors">
                  Tin tức
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{blog.title}</li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-foreground-secondary mb-8">
            <time dateTime={blog.publishedAt}>
              {new Date(blog.publishedAt).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-xl text-foreground-secondary leading-relaxed">
              {blog.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Cover Image */}
      {imageUrl && (
        <div className="max-w-5xl mx-auto px-4 -mt-8 mb-12">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={imageUrl}
              alt={blog.coverImage?.alternativeText || blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 pb-20">
        <div className="prose prose-lg max-w-none">
          {blog.content ? (
            <MarkdownContent content={blog.content} />
          ) : (
            <p className="text-foreground-secondary">Nội dung đang được cập nhật...</p>
          )}
        </div>

        {/* Back to News */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay lại tin tức
          </Link>
        </div>
      </article>
    </main>
  );
}
