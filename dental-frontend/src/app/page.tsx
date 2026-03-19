import Link from 'next/link'
import { getAllPages } from '@/src/lib/api/queries'
import { Button } from '@/src/components/ui/button'

/**
 * Homepage
 * 
 * Displays a list of available landing pages from the CMS.
 * Shows page cards with title, description, and navigation links.
 */

export default async function Home() {
  // Fetch all pages to display
  const pages = await getAllPages(20)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Welcome to Dental CMS
          </h1>
          <p className="text-xl text-foreground-secondary leading-relaxed">
            Your professional dental landing page management system powered by Strapi CMS.
            Create, manage, and publish beautiful landing pages with ease.
          </p>
        </div>

        {/* Available Pages */}
        {pages.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Landing Pages
              </h2>
              <span className="text-foreground-secondary">
                {pages.length} {pages.length === 1 ? 'page' : 'pages'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page) => (
                <Link
                  key={page.id}
                  href={`/${page.slug}`}
                  className="group block p-6 bg-background-secondary rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border"
                >
                  {/* Page Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary-600 transition-colors">
                    {page.title}
                  </h3>
                  
                  {/* Page Description */}
                  {page.seo?.metaDescription && (
                    <p className="text-foreground-secondary leading-relaxed line-clamp-3 mb-4">
                      {page.seo.metaDescription}
                    </p>
                  )}

                  {/* Page Slug */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="text-sm text-foreground-muted font-mono">
                      /{page.slug}
                    </span>
                    <span className="text-primary-600 font-semibold group-hover:translate-x-1 transition-transform">
                      View →
                    </span>
                  </div>

                  {/* Block Count */}
                  {page.layout && page.layout.length > 0 && (
                    <div className="mt-3 text-xs text-foreground-muted">
                      {page.layout.length} content {page.layout.length === 1 ? 'block' : 'blocks'}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-2xl mx-auto text-center space-y-8 p-12 bg-background-secondary rounded-2xl shadow-lg border border-border">
            <div className="text-6xl">📄</div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                No Pages Yet
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Get started by creating your first landing page in the CMS.
                You can add hero sections, service cards, and call-to-action blocks.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Revalidate every 60 seconds
export const revalidate = 60
