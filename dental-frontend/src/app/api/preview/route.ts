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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // Validate secret token
  if (!secret || secret !== process.env.NEXT_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Validate slug parameter
  if (!slug) {
    return new Response("Missing slug parameter", { status: 400 });
  }

  // Enable draft mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the page being previewed with cache-busting timestamp
  redirect(`/${slug}?preview=true&_t=${Date.now()}`);
}
