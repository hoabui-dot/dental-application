/**
 * Strapi Data Transformers
 *
 * Transforms Strapi API responses to frontend-friendly format.
 * Handles Strapi's nested data structure and converts it to a flat format.
 *
 * Key transformations:
 * 1. Flatten data.attributes structure
 * 2. Convert __component to blockType
 * 3. Extract media URLs from nested objects
 * 4. Map SEO fields
 */

import type { StrapiPage, Page, Block, Media } from "@/src/types/strapi";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

/**
 * Transform Strapi page response to frontend format
 *
 * Strapi wraps data in { data: { id, attributes: {...} } }
 * We need to flatten this for easier use in components.
 *
 * @param strapiPage - Raw Strapi API response
 * @returns Transformed page data
 */
export function transformStrapiPage(strapiPage: StrapiPage): Page {
  const { id, attributes } = strapiPage.data;

  return {
    id,
    title: attributes.title,
    slug: attributes.slug,
    seo: {
      metaTitle: attributes.metaTitle || attributes.title,
      metaDescription: attributes.metaDescription || "",
    },
    layout: attributes.layout?.map(transformBlock) || [],
  };
}

/**
 * Transform Strapi block to frontend format
 *
 * Changes __component to blockType for consistency with existing code.
 * Handles different block types and their specific data structures.
 *
 * @param block - Strapi block from dynamic zone
 * @returns Transformed block
 */
function transformBlock(block: any): Block {
  // Extract block type from __component (e.g., 'blocks.hero' -> 'hero')
  const componentName = block.__component.split(".")[1];

  // Base block structure
  const baseBlock = {
    blockType: componentName,
  };

  // Transform based on block type
  switch (componentName) {
    case "hero":
      return {
        ...baseBlock,
        blockType: "hero",
        heading: block.heading || "",
        subheading: block.subheading || undefined,
        image: block.image ? transformMedia(block.image) : undefined,
      } as Block;

    case "services":
      return {
        ...baseBlock,
        blockType: "services",
        heading: block.heading || "",
        items:
          block.items?.map((item: any) => ({
            title: item.title || "",
            description: item.description || "",
            image: item.image ? transformMedia(item.image) : undefined,
          })) || [],
      } as Block;

    case "cta":
      return {
        ...baseBlock,
        blockType: "cta",
        text: block.text || "",
        buttonLabel: block.buttonLabel || "",
        link: block.link || "",
      } as Block;

    default:
      // Unknown block type - return as-is with blockType
      console.warn(`Unknown block type: ${componentName}`);
      return {
        ...baseBlock,
        ...block,
      } as Block;
  }
}

/**
 * Transform Strapi media object
 *
 * Extracts URL and alt text from Strapi media format.
 * Handles both relative and absolute URLs.
 *
 * @param media - Strapi media object
 * @returns Transformed media object or undefined
 */
function transformMedia(media: any): Media | undefined {
  if (!media) return undefined;

  // Handle different media structures
  let attributes = media;

  // If media is wrapped in data.attributes
  if (media.data?.attributes) {
    attributes = media.data.attributes;
  }
  // If media is an array, take first item
  else if (Array.isArray(media) && media[0]) {
    attributes = media[0].data?.attributes || media[0];
  }

  if (!attributes.url) return undefined;

  // Build full URL
  let url = attributes.url;
  if (url.startsWith("/")) {
    url = `${STRAPI_URL}${url}`;
  }

  return {
    url,
    alt: attributes.alternativeText || attributes.alt || "",
    width: attributes.width || 0,
    height: attributes.height || 0,
  };
}
