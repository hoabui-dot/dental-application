/**
 * Preview Mode API Route
 *
 * Enables draft content preview from Strapi CMS.
 * Called when editors click "Preview" button in Strapi admin.
 *
 * URL Format: /api/preview?slug={slug}&secret={secret}
 *
 * Security:
 * - Validates secret token to prevent unauthorized access
 * - Only enables preview for authenticated requests
 */

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// Disable caching for this route
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  console.log("[Preview API] Request received:", { slug, hasSecret: !!secret });

  // Validate secret token
  if (!secret || secret !== process.env.NEXT_PREVIEW_SECRET) {
    console.error("[Preview API] Invalid secret token");
    return new Response("Invalid token", { status: 401 });
  }

  // Validate slug parameter
  if (!slug) {
    console.error("[Preview API] Missing slug parameter");
    return new Response("Missing slug parameter", { status: 400 });
  }

  // Enable draft mode
  const draft = await draftMode();
  draft.enable();

  console.log("[Preview API] Draft mode enabled, redirecting to:", `/${slug}`);

  // Redirect to the page being previewed with cache-busting timestamp
  redirect(`/${slug}?preview=true&_t=${Date.now()}`);
}
