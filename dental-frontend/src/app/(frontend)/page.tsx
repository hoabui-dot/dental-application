import Link from 'next/link'
import { getAllPages } from '@/src/lib/strapi/queries'

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Welcome to Dental CMS
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Your professional dental landing page management system powered by Strapi CMS.
            Create, manage, and publish beautiful landing pages with ease.
          </p>
        </div>

        {/* Available Pages */}
        {pages.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Landing Pages
              </h2>
              <span className="text-gray-600 dark:text-gray-400">
                {pages.length} {pages.length === 1 ? 'page' : 'pages'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page) => (
                <Link
                  key={page.id}
                  href={`/${page.slug}`}
                  className="group block p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-800"
                >
                  {/* Page Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {page.title}
                  </h3>
                  
                  {/* Page Description */}
                  {page.seo?.metaDescription && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-4">
                      {page.seo.metaDescription}
                    </p>
                  )}

                  {/* Page Slug */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-500 font-mono">
                      /{page.slug}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                      View →
                    </span>
                  </div>

                  {/* Block Count */}
                  {page.layout && page.layout.length > 0 && (
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                      {page.layout.length} content {page.layout.length === 1 ? 'block' : 'blocks'}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-2xl mx-auto text-center space-y-8 p-12 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
            <div className="text-6xl">📄</div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                No Pages Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Get started by creating your first landing page in the Strapi admin panel.
                You can add hero sections, service cards, and call-to-action blocks.
              </p>
            </div>
            <a
              href="http://localhost:1337/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Open Strapi Admin →
            </a>
          </div>
        )}

        {/* Admin Panel Link */}
        {pages.length > 0 && (
          <div className="max-w-6xl mx-auto text-center mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Manage your content in the Strapi admin panel
              </p>
              <a
                href="http://localhost:1337/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Go to Admin Panel →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Revalidate every 60 seconds
export const revalidate = 60
