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
  model: string;
  entry?: {
    id: number;
    slug?: string;
    [key: string]: unknown;
  };
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

    console.log("[Revalidate API] Webhook received:", {
      event: payload.event,
      model: payload.model,
      entryId: payload.entry?.id,
      slug: payload.entry?.slug,
      timestamp: new Date().toISOString(),
    });

    // 3. Validate payload
    if (!payload.model) {
      console.error("[Revalidate API] Invalid payload - missing model");
      return NextResponse.json(
        { error: "Invalid payload - model is required" },
        { status: 400 },
      );
    }

    // 4. Revalidate cache tags
    const tags = MODEL_TAG_MAP[payload.model] || [payload.model];
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

    // 5. Revalidate specific paths
    const paths = MODEL_PATH_MAP[payload.model] || [];
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

    // 6. Revalidate entry-specific path (if slug exists)
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

    // 7. Calculate execution time
    const executionTime = Date.now() - startTime;

    // 8. Return success response
    const response = {
      revalidated: true,
      tags: revalidatedTags,
      paths: revalidatedPaths,
      model: payload.model,
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
