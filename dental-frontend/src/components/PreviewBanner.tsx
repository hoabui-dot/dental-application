/**
 * Preview Mode Banner
 * 
 * Displays a banner when preview mode is active.
 * Allows users to exit preview mode and return to published content.
 */

import Link from 'next/link'

export function PreviewBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black px-4 py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👁️</span>
          <div>
            <p className="font-bold">Preview Mode Enabled</p>
            <p className="text-sm">You are viewing draft content</p>
          </div>
        </div>
        <Link
          href="/api/exit-preview"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
        >
          Exit Preview
        </Link>
      </div>
    </div>
  )
}
