/**
 * Strapi Query Functions
 * 
 * High-level functions for fetching data from Strapi CMS.
 * Handles API communication and data transformation.
 */

import { strapiClient } from './client'
import { transformStrapiPage } from './transformers'
import type { Page, StrapiPages, StrapiPage } from '@/src/types/strapi'

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'

/**
 * Get a page by slug
 * 
 * Fetches a single page from Strapi using slug filter.
 * Uses populate=deep to include all nested relations (layout blocks, images, etc.)
 * 
 * @param slug - Page slug (e.g., "dental-implants")
 * @returns Transformed page data or null if not found
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    // Query Strapi API with filters and populate
    // filters[slug][$eq]=slug - Filter by slug field
    // populate=deep - Include all nested relations
    const response = await strapiClient<StrapiPages>('/api/pages', {
      params: {
        'filters[slug][$eq]': slug,
        'populate': 'deep',
      },
    })

    // Strapi returns array even for single result
    if (!response.data || response.data.length === 0) {
      console.warn(`Page not found: ${slug}`)
      return null
    }

    // Transform first result from Strapi format to frontend format
    const strapiPage: StrapiPage = {
      data: response.data[0],
      meta: response.meta,
    }

    return transformStrapiPage(strapiPage)
  } catch (error) {
    console.error('Error fetching page by slug:', error)
    return null
  }
}

/**
 * Get all page slugs
 * 
 * Used for static generation (generateStaticParams).
 * Only fetches slug field for performance.
 * 
 * @returns Array of page slugs
 */
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    // Only fetch slug field (fields[0]=slug)
    // No need to populate relations for slug list
    const response = await strapiClient<StrapiPages>('/api/pages', {
      params: {
        'fields[0]': 'slug',
      },
    })

    if (!response.data || response.data.length === 0) {
      return []
    }

    // Extract slugs from response
    return response.data
      .map((page) => page.attributes.slug)
      .filter((slug): slug is string => Boolean(slug))
  } catch (error) {
    console.error('Error fetching page slugs:', error)
    return []
  }
}

/**
 * Get all pages
 * 
 * Fetches multiple pages with full data.
 * Used for homepage listing or sitemap generation.
 * 
 * @param limit - Maximum number of pages to return (default: 10)
 * @returns Array of transformed pages
 */
export async function getAllPages(limit: number = 10): Promise<Page[]> {
  try {
    // Fetch pages with pagination and populate
    const response = await strapiClient<StrapiPages>('/api/pages', {
      params: {
        'pagination[limit]': limit,
        'populate': 'deep',
        'sort': 'createdAt:desc', // Newest first
      },
    })

    if (!response.data || response.data.length === 0) {
      return []
    }

    // Transform all pages
    return response.data.map((page) => {
      const strapiPage: StrapiPage = {
        data: page,
        meta: response.meta,
      }
      return transformStrapiPage(strapiPage)
    })
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

/**
 * Get media URL
 * 
 * Extracts full URL from Strapi media object.
 * Handles both relative and absolute URLs.
 * 
 * @param media - Media object from Strapi
 * @param size - Image size (not used in Strapi, kept for compatibility)
 * @returns Full media URL or empty string
 */
export function getMediaUrl(media: any, size?: string): string {
  if (!media) return ''

  // Handle different media object structures
  let url = ''

  // Case 1: Direct media object with url
  if (media.url) {
    url = media.url
  }
  // Case 2: Nested in data.attributes (Strapi v4+ format)
  else if (media.data?.attributes?.url) {
    url = media.data.attributes.url
  }
  // Case 3: Array of media (take first)
  else if (Array.isArray(media) && media[0]?.url) {
    url = media[0].url
  }

  if (!url) return ''

  // If URL is relative, prepend Strapi URL
  if (url.startsWith('/')) {
    return `${STRAPI_URL}${url}`
  }

  // Already absolute URL
  return url
}

/**
 * Get media alt text
 * 
 * Extracts alt text from Strapi media object.
 * Falls back to provided fallback text.
 * 
 * @param media - Media object from Strapi
 * @param fallback - Fallback text if alt is not available
 * @returns Alt text or fallback
 */
export function getMediaAlt(media: any, fallback: string = ''): string {
  if (!media) return fallback

  // Handle different media object structures
  let alt = ''

  // Case 1: Direct media object with alternativeText
  if (media.alternativeText) {
    alt = media.alternativeText
  }
  // Case 2: Nested in data.attributes
  else if (media.data?.attributes?.alternativeText) {
    alt = media.data.attributes.alternativeText
  }
  // Case 3: Array of media (take first)
  else if (Array.isArray(media) && media[0]?.alternativeText) {
    alt = media[0].alternativeText
  }

  return alt || fallback
}
