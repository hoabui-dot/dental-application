/**
 * Strapi API Client
 * 
 * Provides a wrapper around fetch for making requests to Strapi API.
 * Handles authentication, error handling, and response parsing.
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>
}

/**
 * Fetch data from Strapi API
 * 
 * @param endpoint - API endpoint (e.g., '/api/pages')
 * @param options - Fetch options including params
 * @returns Parsed JSON response
 */
export async function strapiClient<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options

  // Build URL with query parameters
  const url = new URL(endpoint, STRAPI_URL)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  // Set default headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  }

  // Add authentication token if available
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
  }

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
      next: {
        revalidate: 60, // Cache for 60 seconds
        ...fetchOptions.next,
      },
    })

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Strapi client error:', error)
    throw error
  }
}
