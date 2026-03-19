import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPageBySlug, getAllPageSlugs } from '@/src/lib/strapi/queries'
import { BlockRenderer } from '@/src/components/BlockRenderer'
import { Suspense } from 'react'
import { PageSkeleton } from '@/src/components/LoadingSkeleton'

/**
 * Dynamic Landing Page Route
 * 
 * This route handles all dynamic landing pages from Strapi CMS.
 * 
 * Flow:
 * 1. Next.js matches URL to [slug] parameter
 * 2. generateMetadata() fetches page data for SEO
 * 3. Page component fetches same data (cached by Next.js)
 * 4. BlockRenderer renders the layout blocks
 * 5. Page is served to user
 * 
 * Performance:
 * - Uses ISR (revalidate: 60) for optimal performance
 * - Data is fetched once and cached
 * - Static generation for known slugs
 */

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Generate Static Params
 * 
 * Pre-generates pages at build time for all existing slugs.
 * This enables static generation for better performance.
 */
export async function generateStaticParams() {
  try {
    const slugs = await getAllPageSlugs()
    
    return slugs.map((slug) => ({
      slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

/**
 * Generate Metadata (SEO)
 * 
 * Generates page metadata for SEO optimization.
 * Maps CMS SEO fields to Next.js metadata.
 * 
 * Note: This function is cached by Next.js and shares cache with page component.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const page = await getPageBySlug(slug)

    if (!page) {
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.',
      }
    }

    // Use SEO fields from CMS, fallback to page title
    const title = page.seo?.metaTitle || page.title
    const description = page.seo?.metaDescription || `Learn more about ${page.title}`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${page.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error',
      description: 'An error occurred while loading this page.',
    }
  }
}

/**
 * Page Component
 * 
 * Main component that renders the dynamic landing page.
 */
export default async function LandingPage({ params }: PageProps) {
  try {
    // Fetch page data from CMS
    const { slug } = await params
    const page = await getPageBySlug(slug)

    // Handle page not found
    if (!page) {
      notFound()
    }

    // Validate page data
    if (!page.layout || page.layout.length === 0) {
      console.warn(`Page ${slug} has no layout blocks`)
    }

    return (
      <main className="min-h-screen">
        <Suspense fallback={<PageSkeleton />}>
          {/* Render all blocks from CMS */}
          <BlockRenderer layout={page.layout} />
        </Suspense>
      </main>
    )
  } catch (error) {
    console.error('Error rendering page:', error)
    
    // Return error UI instead of crashing
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="max-w-md w-full text-center space-y-4 px-4">
          <div className="text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Error Loading Page
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We encountered an error while loading this page. Please try again later.
          </p>
        </div>
      </main>
    )
  }
}

/**
 * Revalidation Configuration
 * 
 * ISR (Incremental Static Regeneration):
 * - Pages are statically generated at build time
 * - Revalidated every 60 seconds
 * - Stale content served while revalidating in background
 * - Perfect balance between performance and freshness
 */
export const revalidate = 60 // Revalidate every 60 seconds

/**
 * Dynamic Params Configuration
 * 
 * Allow dynamic params that weren't pre-generated.
 * New pages created in CMS will work immediately.
 */
export const dynamicParams = true
