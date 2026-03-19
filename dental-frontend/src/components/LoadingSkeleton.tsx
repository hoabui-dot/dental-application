/**
 * Loading Skeleton Components
 * 
 * Displays placeholder UI while content is loading.
 * Improves perceived performance.
 */

export function PageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
            </div>
            <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Services Skeleton */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-[250px] bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function BlockSkeleton() {
  return (
    <div className="py-8 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
      </div>
    </div>
  )
}
