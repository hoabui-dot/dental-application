/**
 * Empty State Component
 * 
 * Displays when no content is available.
 */

interface EmptyStateProps {
  title?: string
  description?: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({
  title = 'No content available',
  description = 'This page doesn\'t have any content yet.',
  action,
}: EmptyStateProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="text-6xl">📄</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
        {action && (
          <a
            href={action.href}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {action.label}
          </a>
        )}
      </div>
    </div>
  )
}
