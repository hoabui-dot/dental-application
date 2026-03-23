import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPageBySlug, getAllPageSlugs } from '@/src/lib/api/queries'
import { BlockRenderer } from '@/src/components/BlockRenderer'
import { PreviewBanner } from '@/src/components/PreviewBanner'
import { MarkdownContent } from '@/src/components/MarkdownContent'
import { Suspense } from 'react'
import { PageSkeleton } from '@/src/components/LoadingSkeleton'

/**
 * Dynamic Landing Page Route
 * 
 * This route handles all dynamic landing pages from Strapi CMS.
 * Supports preview mode for draft content.
 * 
 * Flow:
 * 1. Next.js matches URL to [slug] parameter
 * 2. Check if draft mode is enabled
 * 3. generateMetadata() fetches page data for SEO
 * 4. Page component fetches same data (cached by Next.js)
 * 5. BlockRenderer renders the layout blocks
 * 6. Page is served to user
 * 
 * Performance:
 * - Uses ISR (revalidate: 60) for optimal performance
 * - Data is fetched once and cached
 * - Static generation for known slugs
 * - No cache in preview mode
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
    const { isEnabled: isDraftMode } = await draftMode()
    const page = await getPageBySlug(slug, isDraftMode)

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
      title: isDraftMode ? `[PREVIEW] ${title}` : title,
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
 * Supports preview mode for draft content.
 */
export default async function LandingPage({ params }: PageProps) {
  try {
    // Check if draft mode is enabled
    const { isEnabled: isDraftMode } = await draftMode()
    
    // Log draft mode status for debugging
    console.log(`[Page] Draft mode: ${isDraftMode}`)
    
    // Fetch page data from CMS
    const { slug } = await params
    const page = await getPageBySlug(slug, isDraftMode)

    // Log page data for debugging
    console.log(`[Page] Fetched page: ${page?.title || 'null'}`)
    if (isDraftMode && page) {
      console.log(`[Page] Preview content - Title: ${page.title}`)
      console.log(`[Page] Preview content - Description: ${page.description?.substring(0, 50) || 'none'}`)
    }

    // Handle page not found
    if (!page) {
      notFound()
    }

    // Validate page data
    if (!page.layout || page.layout.length === 0) {
      console.warn(`Page ${slug} has no layout blocks`)
    }

    return (
      <>
        {/* Preview Mode Banner */}
        {isDraftMode && <PreviewBanner />}
        
        <main className={isDraftMode ? "min-h-screen bg-background pt-20" : "min-h-screen bg-background"}>
          {page.layout && page.layout.length > 0 ? (
            <Suspense fallback={<PageSkeleton />}>
              {/* Render all blocks from CMS */}
              <BlockRenderer layout={page.layout} />
            </Suspense>
          ) : (
            /* Fallback: Show content field if no blocks */
            <div className="container mx-auto px-4 py-16 max-w-4xl">
              {/* Cover Image */}
              {page.cover && (
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl mb-8">
                  <img
                    src={page.cover.url}
                    alt={page.cover.alt || page.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Title */}
              <h1 className="text-4xl font-bold text-foreground mb-4">{page.title}</h1>
              
              {/* Publish Date */}
              {page.publishDate && (
                <p className="text-sm text-foreground-muted mb-6">
                  Published: {new Date(page.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
              
              {/* Description */}
              {page.description && (
                <p className="text-lg text-foreground-secondary mb-8 leading-relaxed">
                  {page.description}
                </p>
              )}
              
              {/* Content */}
              {page.content && (
                <MarkdownContent 
                  content={page.content}
                  className="text-foreground-secondary"
                />
              )}
            </div>
          )}
        </main>
      </>
    )
  } catch (error) {
    console.error('Error rendering page:', error)
    
    // Return error UI instead of crashing
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full text-center space-y-4 px-4">
          <div className="text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground">
            Error Loading Page
          </h1>
          <p className="text-foreground-secondary">
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
 * On-Demand Revalidation:
 * - No time-based revalidation (revalidate = false)
 * - Cache invalidated via Strapi webhooks
 * - Real-time content updates
 * - Enterprise-grade cache management
 * 
 * Cache tags are used for granular revalidation:
 * - 'pages' tag: Revalidates all page queries
 * - 'page' tag: Revalidates specific page queries
 * 
 * Webhook triggers revalidation immediately when content changes.
 */
export const revalidate = false // Disable time-based, use webhook-based revalidation

/**
 * Dynamic Params Configuration
 * 
 * Allow dynamic params that weren't pre-generated.
 * New pages created in CMS will work immediately.
 */
export const dynamicParams = true
