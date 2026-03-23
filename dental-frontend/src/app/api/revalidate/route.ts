/**
 * On-Demand Revalidation API Route
 *
 * Handles webhook requests from Strapi CMS to invalidate Next.js cache.
 * Triggered when content is created, updated, published, or deleted.
 *
 * Security:
 * - Validates webhook secret from Strapi
 * - Rejects unauthorized requests
 * - Logs all revalidation attempts
 *
 * Flow:
 * 1. Strapi content changes
 * 2. Strapi sends webhook to this endpoint
 * 3. Validate secret
 * 4. Revalidate cache tags/paths
 * 5. Return success response
 */

import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Webhook secret from environment
const WEBHOOK_SECRET = process.env.STRAPI_WEBHOOK_SECRET;

// Model to tag mapping
const MODEL_TAG_MAP: Record<string, string[]> = {
  page: ["pages", "page"],
  article: ["articles", "article"],
  "bai-viet": ["articles", "bai-viet"],
  category: ["categories", "category"],
  navigation: ["navigation"], // Navigation menu
  footer: ["footer"], // Footer content
  homepage: ["homepage"], // Homepage content
};

// Model to path mapping for specific revalidation
const MODEL_PATH_MAP: Record<string, string[]> = {
  page: ["/"],
  article: ["/"],
  "bai-viet": ["/"],
};

interface WebhookPayload {
  event: string;
  model?: string;
  entry?: {
    id: number;
    slug?: string;
    [key: string]: unknown;
  };
  // Strapi v4 payload structure
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

/**
 * Extract model name from Strapi webhook payload
 * Strapi sends model in format: "api::page.page" or just "page"
 */
function extractModelName(payload: WebhookPayload): string | null {
  // Try direct model field
  if (payload.model) {
    // Extract from "api::page.page" format
    const match = payload.model.match(/api::([^.]+)\./);
    return match ? match[1] : payload.model;
  }

  // Try to extract from event name (e.g., "entry.create")
  if (payload.event) {
    const eventParts = payload.event.split(".");
    if (eventParts.length > 0) {
      return eventParts[0];
    }
  }

  // Check if entry has __type or similar field
  if (payload.entry && typeof payload.entry === "object") {
    const entry = payload.entry as Record<string, unknown>;
    if (entry.__type) {
      return String(entry.__type);
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Validate webhook secret
    const secret = request.headers.get("x-strapi-secret");

    if (!secret || secret !== WEBHOOK_SECRET) {
      console.error("[Revalidate API] Unauthorized webhook attempt", {
        hasSecret: !!secret,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse webhook payload
    const payload: WebhookPayload = await request.json();

    // Log the full payload for debugging
    console.log(
      "[Revalidate API] Full webhook payload:",
      JSON.stringify(payload, null, 2),
    );

    // 3. Extract model name
    const modelName = extractModelName(payload);

    console.log("[Revalidate API] Webhook received:", {
      event: payload.event,
      model: payload.model,
      extractedModel: modelName,
      entryId: payload.entry?.id,
      slug: payload.entry?.slug,
      timestamp: new Date().toISOString(),
    });

    // 4. If we can't determine the model, revalidate everything
    if (!modelName) {
      console.warn(
        "[Revalidate API] Could not determine model, revalidating all",
      );

      // Revalidate common paths
      const commonPaths = ["/"];
      for (const path of commonPaths) {
        try {
          revalidatePath(path);
          console.log(`[Revalidate API] Revalidated path: ${path}`);
        } catch (error) {
          console.error(
            `[Revalidate API] Error revalidating path ${path}:`,
            error,
          );
        }
      }

      return NextResponse.json({
        revalidated: true,
        paths: commonPaths,
        note: "Model could not be determined, revalidated common paths",
        timestamp: new Date().toISOString(),
      });
    }

    // 5. Revalidate cache tags
    const tags = MODEL_TAG_MAP[modelName] || [modelName];
    const revalidatedTags: string[] = [];

    for (const tag of tags) {
      try {
        revalidateTag(tag);
        revalidatedTags.push(tag);
        console.log(`[Revalidate API] Revalidated tag: ${tag}`);
      } catch (error) {
        console.error(`[Revalidate API] Error revalidating tag ${tag}:`, error);
      }
    }

    // 6. Revalidate specific paths
    const paths = MODEL_PATH_MAP[modelName] || [];
    const revalidatedPaths: string[] = [];

    // Revalidate model-specific paths
    for (const path of paths) {
      try {
        revalidatePath(path);
        revalidatedPaths.push(path);
        console.log(`[Revalidate API] Revalidated path: ${path}`);
      } catch (error) {
        console.error(
          `[Revalidate API] Error revalidating path ${path}:`,
          error,
        );
      }
    }

    // 7. Revalidate entry-specific path (if slug exists)
    if (payload.entry?.slug) {
      const entryPath = `/${payload.entry.slug}`;
      try {
        revalidatePath(entryPath);
        revalidatedPaths.push(entryPath);
        console.log(`[Revalidate API] Revalidated entry path: ${entryPath}`);
      } catch (error) {
        console.error(
          `[Revalidate API] Error revalidating entry path ${entryPath}:`,
          error,
        );
      }
    }

    // 8. Calculate execution time
    const executionTime = Date.now() - startTime;

    // 9. Return success response
    const response = {
      revalidated: true,
      tags: revalidatedTags,
      paths: revalidatedPaths,
      model: modelName,
      event: payload.event,
      entryId: payload.entry?.id,
      slug: payload.entry?.slug,
      executionTime: `${executionTime}ms`,
      timestamp: new Date().toISOString(),
    };

    console.log("[Revalidate API] Revalidation completed:", response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[Revalidate API] Error processing webhook:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Disable caching for this route
export const dynamic = "force-dynamic";
export const revalidate = 0;
