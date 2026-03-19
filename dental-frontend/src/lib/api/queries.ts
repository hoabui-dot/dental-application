/**
 * API Query Functions
 *
 * High-level functions for fetching data from the CMS API.
 * Handles API communication and data transformation.
 */

import { apiClient } from "./client";
import { transformPage } from "./transformers";
import type { Page, StrapiPages, StrapiPage } from "@/src/types/strapi";

const API_URL = process.env.STRAPI_URL || "http://localhost:1337";

/**
 * Get a page by slug
 *
 * Fetches a single page from the CMS using slug filter.
 * Uses populate=* to include all first-level relations
 *
 * @param slug - Page slug (e.g., "dental-implants")
 * @param isDraftMode - Whether to fetch draft content (for preview)
 * @returns Transformed page data or null if not found
 */
export async function getPageBySlug(
  slug: string,
  isDraftMode: boolean = false,
): Promise<Page | null> {
  try {
    // Query API with filters and populate
    const response = await apiClient<StrapiPages>("/api/pages", {
      params: {
        "filters[slug][$eq]": slug,
        populate: "*",
      },
      isDraftMode,
    });

    // API returns array even for single result
    if (!response.data || response.data.length === 0) {
      console.warn(`Page not found: ${slug}`);
      return null;
    }

    // Transform first result from API format to frontend format
    const strapiPage: StrapiPage = {
      data: response.data[0],
      meta: response.meta,
    };

    return transformPage(strapiPage);
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    return null;
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
    // Only fetch slug field for performance
    const response = await apiClient<StrapiPages>("/api/pages", {
      params: {
        "fields[0]": "slug",
      },
    });

    if (!response.data || response.data.length === 0) {
      return [];
    }

    // Extract slugs from response
    // Handle both Strapi v4 (page.attributes.slug) and v5 (page.slug)
    return response.data
      .map((page) => {
        // Type assertion for v5 flat structure
        const pageData = page as any;
        return page.attributes?.slug || pageData.slug;
      })
      .filter((slug): slug is string => Boolean(slug));
  } catch (error) {
    console.error("Error fetching page slugs:", error);
    return [];
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
    const response = await apiClient<StrapiPages>("/api/pages", {
      params: {
        "pagination[limit]": limit,
        populate: "*",
        sort: "createdAt:desc", // Newest first
      },
    });

    if (!response.data || response.data.length === 0) {
      return [];
    }

    // Transform all pages
    return response.data.map((page) => {
      const strapiPage: StrapiPage = {
        data: page,
        meta: response.meta,
      };
      return transformPage(strapiPage);
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

/**
 * Get media URL
 *
 * Extracts full URL from CMS media object.
 * Handles both relative and absolute URLs.
 *
 * @param media - Media object from CMS
 * @param size - Image size (optional, for compatibility)
 * @returns Full media URL or empty string
 */
export function getMediaUrl(media: any, size?: string): string {
  if (!media) return "";

  // Handle different media object structures
  let url = "";

  // Case 1: Direct media object with url
  if (media.url) {
    url = media.url;
  }
  // Case 2: Nested in data.attributes
  else if (media.data?.attributes?.url) {
    url = media.data.attributes.url;
  }
  // Case 3: Array of media (take first)
  else if (Array.isArray(media) && media[0]?.url) {
    url = media[0].url;
  }

  if (!url) return "";

  // If URL is relative, prepend API URL
  if (url.startsWith("/")) {
    return `${API_URL}${url}`;
  }

  // Already absolute URL
  return url;
}

/**
 * Get media alt text
 *
 * Extracts alt text from CMS media object.
 * Falls back to provided fallback text.
 *
 * @param media - Media object from CMS
 * @param fallback - Fallback text if alt is not available
 * @returns Alt text or fallback
 */
export function getMediaAlt(media: any, fallback: string = ""): string {
  if (!media) return fallback;

  // Handle different media object structures
  let alt = "";

  // Case 1: Direct media object with alternativeText
  if (media.alternativeText) {
    alt = media.alternativeText;
  }
  // Case 2: Nested in data.attributes
  else if (media.data?.attributes?.alternativeText) {
    alt = media.data.attributes.alternativeText;
  }
  // Case 3: Array of media (take first)
  else if (Array.isArray(media) && media[0]?.alternativeText) {
    alt = media[0].alternativeText;
  }

  return alt || fallback;
}
