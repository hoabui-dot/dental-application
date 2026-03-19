/**
 * API Client
 *
 * Provides a wrapper around fetch for making requests to the CMS API.
 * Handles authentication, error handling, and response parsing.
 * Supports draft mode for preview functionality.
 */

const API_URL = process.env.STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Debug: Log token status (only first/last 10 chars for security)
if (API_TOKEN) {
  console.log(
    `[API Client] Token loaded: ${API_TOKEN.substring(0, 10)}...${API_TOKEN.substring(API_TOKEN.length - 10)}`,
  );
} else {
  console.warn(
    "[API Client] WARNING: No API token found! Set STRAPI_API_TOKEN in .env",
  );
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  isDraftMode?: boolean;
}

/**
 * Fetch data from CMS API
 *
 * @param endpoint - API endpoint (e.g., '/api/pages')
 * @param options - Fetch options including params and draft mode
 * @returns Parsed JSON response
 */
export async function apiClient<T = unknown>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { params, isDraftMode, ...fetchOptions } = options;

  // Build URL with query parameters
  const url = new URL(endpoint, API_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  // Add draft mode parameter for Strapi
  if (isDraftMode) {
    url.searchParams.append("publicationState", "preview");
    // Add timestamp to bust cache
    url.searchParams.append("_t", Date.now().toString());
  }

  // Set default headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add authentication token if available
  if (API_TOKEN) {
    headers["Authorization"] = `Bearer ${API_TOKEN}`;
  } else {
    console.warn("[API Client] Making request without authentication token");
  }

  // Merge with custom headers
  if (fetchOptions.headers) {
    Object.assign(headers, fetchOptions.headers);
  }

  // Debug log
  console.log(
    `[API Client] ${isDraftMode ? "DRAFT" : "PUBLISHED"} request to: ${url.toString()}`,
  );

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
      cache: isDraftMode ? "no-store" : "default", // Disable cache in draft mode
      next: {
        revalidate: isDraftMode ? 0 : 60, // No revalidation in draft mode
        ...fetchOptions.next,
      },
    });

    if (!response.ok) {
      console.error(
        `[API Client] Error ${response.status}: ${response.statusText}`,
      );
      console.error(`[API Client] URL: ${url.toString()}`);
      console.error(`[API Client] Has token: ${!!API_TOKEN}`);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Debug: Log response data
    console.log(
      `[API Client] Response data:`,
      JSON.stringify(data).substring(0, 300),
    );

    return data;
  } catch (error) {
    console.error("API client error:", error);
    throw error;
  }
}
