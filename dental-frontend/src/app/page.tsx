import { getHomepage } from '@/src/lib/api/queries'
import { BlockRenderer } from '@/src/components/BlockRenderer'
import { EmptyState } from '@/src/components/EmptyState'

/**
 * Homepage
 * 
 * Dynamic homepage driven by Strapi CMS.
 * Renders flexible layout blocks from the homepage Single Type.
 * 
 * Features:
 * - Fully CMS-driven content
 * - Dynamic block rendering
 * - Cached with on-demand revalidation
 * - Graceful error handling
 */

export default async function Home() {
  // Fetch homepage data from CMS
  const homepage = await getHomepage()

  // Handle empty homepage
  if (!homepage.blocks || homepage.blocks.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <EmptyState
          title="Homepage not configured"
          description="The homepage hasn't been set up yet. Please configure it in the CMS."
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <BlockRenderer layout={homepage.blocks} />
    </div>
  )
}

// Metadata
export const metadata = {
  title: 'Saigon International Dental Clinic - Perfect Smile',
  description: 'Professional dental care with modern technology and experienced doctors.',
}

// On-demand revalidation via webhooks (no time-based revalidation)
export const revalidate = false
