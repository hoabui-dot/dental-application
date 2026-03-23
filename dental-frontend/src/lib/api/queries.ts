/**
 * API Query Functions
 *
 * High-level functions for fetching data from the CMS API.
 * Handles API communication and data transformation.
 */

import { apiClient } from "./client";
import { transformPage } from "./transformers";
import type {
  Page,
  StrapiPages,
  StrapiPage,
  Navigation,
  StrapiNavigation,
  Footer,
  StrapiFooter,
  Homepage,
  StrapiHomepage,
  HomepageVideoHeroComponent,
  HomepageHeroComponent,
  HomepageServicesComponent,
  HomepageAboutComponent,
  HomepageTestimonialsComponent,
  HomepageCTAComponent,
  HomepageTrustComponent,
  HomepageBeforeAfterComponent,
  HomepagePricingComponent,
  HomepageProcessComponent,
  HomepageDoctorComponent,
  HomepageFAQComponent,
  HomepageBlock,
} from "@/src/types/strapi";

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
      tags: ["pages", "page"], // Cache tags for revalidation
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
 * Only fetches published pages for production builds.
 *
 * @returns Array of page slugs
 */
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    // Only fetch slug field for performance
    // Only fetch published pages (not drafts) - Strapi v5 uses status=published
    const response = await apiClient<StrapiPages>("/api/pages", {
      params: {
        "fields[0]": "slug",
        status: "published", // Strapi v5: Only published pages for static generation
      },
      tags: ["pages"], // Cache tag for revalidation
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
      tags: ["pages"], // Cache tag for revalidation
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

/**
 * Get navigation menu
 *
 * Fetches navigation menu from CMS.
 * Navigation is a Single Type with repeatable nav items that support dropdown children.
 *
 * @returns Navigation object with items, logo, and CTA
 */
export async function getNavigation(): Promise<Navigation> {
  try {
    // Fetch navigation from Strapi with nested populate for children
    // Strapi v5 requires explicit populate syntax for nested components
    const response = await apiClient<StrapiNavigation>("/api/navigation", {
      params: {
        "populate[navigation][populate][children]": "true",
        "populate[logo]": "true",
      },
      tags: ["navigation"], // Cache tag for revalidation
    });

    console.log(
      "[getNavigation] Raw response:",
      JSON.stringify(response, null, 2),
    );

    // Handle missing or empty data
    if (!response.data || !response.data.navigation) {
      console.warn("[getNavigation] No navigation data found");
      return { navigation: [] };
    }

    console.log(
      "[getNavigation] Navigation items:",
      response.data.navigation.length,
    );

    // Normalize data: extract navigation items with children
    const navigation = response.data.navigation.map((item) => {
      console.log(
        `[getNavigation] Processing item: ${item.label}, children:`,
        item.children?.length || 0,
      );

      return {
        id: item.id,
        label: item.label || "",
        href: item.href || "#",
        isExternal: item.isExternal || false,
        icon: item.icon || null,
        children: item.children
          ? item.children.map((child) => ({
              id: child.id,
              label: child.label || "",
              href: child.href || "#",
              isExternal: child.isExternal || false,
              icon: child.icon || null,
            }))
          : undefined,
      };
    });

    const result = {
      navigation,
      logo: response.data.logo
        ? {
            url: getMediaUrl(response.data.logo),
            alt: getMediaAlt(response.data.logo, "Logo"),
            width: 0,
            height: 0,
          }
        : undefined,
      ctaText: response.data.ctaText || undefined,
      ctaLink: response.data.ctaLink || undefined,
    };

    console.log(
      "[getNavigation] Final result:",
      JSON.stringify(result, null, 2),
    );

    return result;
  } catch (error) {
    console.error("[getNavigation] Error fetching navigation:", error);
    // Return empty navigation on error (graceful degradation)
    return { navigation: [] };
  }
}

/**
 * Get footer content
 *
 * Fetches footer content from CMS.
 * Footer is a Single Type with contact info, links, and social links.
 *
 * @returns Footer object with all footer data
 */
export async function getFooter(): Promise<Footer> {
  try {
    // Fetch footer from Strapi
    const response = await apiClient<StrapiFooter>("/api/footer", {
      params: {
        "populate[contact_info]": "true",
        "populate[footer_links]": "true",
        "populate[social_links][populate][icon]": "true",
      },
      tags: ["footer"], // Cache tag for revalidation
    });

    // Handle missing data
    if (!response.data) {
      console.warn("[getFooter] No footer data found");
      return {
        description: "",
        contactInfo: { id: 0, address: "", phone: "", email: "" },
        links: [],
        socialLinks: [],
      };
    }

    // Normalize data
    const footer: Footer = {
      description: response.data.description || "",
      contactInfo: response.data.contact_info || {
        id: 0,
        address: "",
        phone: "",
        email: "",
      },
      links: response.data.footer_links || [],
      socialLinks: (response.data.social_links || []).map((social) => ({
        id: social.id,
        platform: social.platform,
        url: social.url,
        icon: social.icon
          ? {
              url: getMediaUrl(social.icon),
              alt: getMediaAlt(social.icon, social.platform),
              width: 0,
              height: 0,
            }
          : undefined,
      })),
    };

    return footer;
  } catch (error) {
    console.error("[getFooter] Error fetching footer:", error);
    // Return empty footer on error (graceful degradation)
    return {
      description: "",
      contactInfo: { id: 0, address: "", phone: "", email: "" },
      links: [],
      socialLinks: [],
    };
  }
}

/**
 * Get homepage content
 *
 * Fetches homepage with dynamic layout blocks from CMS.
 * Homepage is a Single Type with a Dynamic Zone for flexible layouts.
 *
 * @returns Homepage object with normalized blocks
 */
export async function getHomepage(): Promise<Homepage> {
  try {
    // Fetch homepage from Strapi with deep nested populate for Dynamic Zone
    // Strapi v5: Must use [on] for each component type to ensure all are populated
    const response = await apiClient<StrapiHomepage>("/api/homepage", {
      params: {
        // Populate all components in layout (base level)
        "populate[layout][populate]": "*",
        // Explicitly populate each component type with [on] syntax
        "populate[layout][on][homepage.video-hero][populate]": "*",
        "populate[layout][on][homepage.hero][populate]": "*",
        "populate[layout][on][homepage.about][populate]": "*",
        "populate[layout][on][homepage.cta][populate]": "*",
        // Deep populate for components with nested repeatables
        "populate[layout][on][homepage.before-after][populate][cases][populate]":
          "*",
        "populate[layout][on][homepage.doctor][populate][doctors][populate]":
          "*",
        "populate[layout][on][homepage.services][populate][items][populate]":
          "*",
        "populate[layout][on][homepage.pricing][populate][plans][populate]":
          "*",
        "populate[layout][on][homepage.process][populate][steps][populate]":
          "*",
        "populate[layout][on][homepage.faq][populate][questions][populate]":
          "*",
        "populate[layout][on][homepage.trust][populate][stats][populate]": "*",
        "populate[layout][on][homepage.trust][populate][certifications][populate]":
          "*",
        "populate[layout][on][homepage.testimonials][populate][items][populate]":
          "*",
      },
      tags: ["homepage"], // Cache tag for revalidation
    });

    // Handle missing data
    if (!response.data) {
      console.warn("[getHomepage] No homepage data found");
      return {
        title: "Homepage",
        blocks: [],
      };
    }

    // Normalize blocks: convert __component to blockType
    const blocks = (response.data.layout || [])
      .map((block) => {
        const componentType = block.__component.split(".")[1];

        switch (componentType) {
          case "video-hero":
            return {
              blockType: "video-hero" as const,
              id: block.id,
              title: (block as HomepageVideoHeroComponent).title,
              subtitle: (block as HomepageVideoHeroComponent).subtitle,
              ctaText: (block as HomepageVideoHeroComponent).ctaText,
              ctaLink: (block as HomepageVideoHeroComponent).ctaLink,
              videoUrl: (block as HomepageVideoHeroComponent).videoUrl,
              posterImage: (block as HomepageVideoHeroComponent).posterImage
                ? {
                    url: getMediaUrl(
                      (block as HomepageVideoHeroComponent).posterImage,
                    ),
                    alt: getMediaAlt(
                      (block as HomepageVideoHeroComponent).posterImage,
                      (block as HomepageVideoHeroComponent).title,
                    ),
                    width: 0,
                    height: 0,
                  }
                : undefined,
              overlayOpacity: (block as HomepageVideoHeroComponent)
                .overlayOpacity,
              isActive: (block as HomepageVideoHeroComponent).isActive,
            };

          case "hero":
            return {
              blockType: "hero" as const,
              id: block.id,
              heading: (block as HomepageHeroComponent).heading,
              subheading: (block as HomepageHeroComponent).subheading,
              image: (block as HomepageHeroComponent).image
                ? {
                    url: getMediaUrl((block as HomepageHeroComponent).image),
                    alt: getMediaAlt(
                      (block as HomepageHeroComponent).image,
                      (block as HomepageHeroComponent).heading,
                    ),
                    width: 0,
                    height: 0,
                  }
                : undefined,
              ctaLabel: (block as HomepageHeroComponent).cta_label,
              ctaLink: (block as HomepageHeroComponent).cta_link,
            };

          case "services":
            return {
              blockType: "services" as const,
              id: block.id,
              title: (block as HomepageServicesComponent).title,
              description: (block as HomepageServicesComponent).description,
              items: (block as HomepageServicesComponent).items.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image
                  ? {
                      url: getMediaUrl(item.image),
                      alt: getMediaAlt(item.image, item.title),
                      width: 0,
                      height: 0,
                    }
                  : undefined,
              })),
            };

          case "about":
            return {
              blockType: "about" as const,
              id: block.id,
              title: (block as HomepageAboutComponent).title,
              content: (block as HomepageAboutComponent).content,
              image: (block as HomepageAboutComponent).image
                ? {
                    url: getMediaUrl((block as HomepageAboutComponent).image),
                    alt: getMediaAlt(
                      (block as HomepageAboutComponent).image,
                      (block as HomepageAboutComponent).title,
                    ),
                    width: 0,
                    height: 0,
                  }
                : undefined,
            };

          case "testimonials":
            return {
              blockType: "testimonials" as const,
              id: block.id,
              title: (block as HomepageTestimonialsComponent).title,
              items: (block as HomepageTestimonialsComponent).items.map(
                (item) => ({
                  id: item.id,
                  name: item.name,
                  content: item.content,
                  rating: item.rating,
                }),
              ),
            };

          case "cta":
            return {
              blockType: "cta" as const,
              id: block.id,
              text: (block as HomepageCTAComponent).text,
              buttonLabel: (block as HomepageCTAComponent).button_label,
              buttonLink: (block as HomepageCTAComponent).button_link,
            };

          case "trust":
            return {
              blockType: "trust" as const,
              id: block.id,
              title: (block as HomepageTrustComponent).title,
              subtitle: (block as HomepageTrustComponent).subtitle,
              stats: (block as HomepageTrustComponent).stats || [],
              certifications: (
                block as HomepageTrustComponent
              ).certifications.map((cert) => ({
                id: cert.id,
                name: cert.name,
                image: cert.image
                  ? {
                      url: getMediaUrl(cert.image),
                      alt: getMediaAlt(cert.image, cert.name),
                      width: 0,
                      height: 0,
                    }
                  : undefined,
              })),
            };

          case "before-after":
            return {
              blockType: "before-after" as const,
              id: block.id,
              title: (block as HomepageBeforeAfterComponent).title,
              subtitle: (block as HomepageBeforeAfterComponent).subtitle,
              cases: (block as HomepageBeforeAfterComponent).cases.map((c) => ({
                id: c.id,
                title: c.title,
                description: c.description,
                beforeImage: c.before_image
                  ? {
                      url: getMediaUrl(c.before_image),
                      alt: getMediaAlt(c.before_image, `${c.title} - Before`),
                      width: 0,
                      height: 0,
                    }
                  : undefined,
                afterImage: c.after_image
                  ? {
                      url: getMediaUrl(c.after_image),
                      alt: getMediaAlt(c.after_image, `${c.title} - After`),
                      width: 0,
                      height: 0,
                    }
                  : undefined,
                treatment: c.treatment,
              })),
            };

          case "pricing":
            return {
              blockType: "pricing" as const,
              id: block.id,
              title: (block as HomepagePricingComponent).title,
              subtitle: (block as HomepagePricingComponent).subtitle,
              plans: (block as HomepagePricingComponent).plans.map((plan) => ({
                id: plan.id,
                name: plan.name,
                price: plan.price,
                period: plan.period,
                description: plan.description,
                features: plan.features || [],
                isPopular: plan.is_popular,
                ctaLabel: plan.cta_label,
                ctaLink: plan.cta_link,
              })),
            };

          case "process":
            return {
              blockType: "process" as const,
              id: block.id,
              title: (block as HomepageProcessComponent).title,
              subtitle: (block as HomepageProcessComponent).subtitle,
              steps: (block as HomepageProcessComponent).steps || [],
            };

          case "doctor":
            return {
              blockType: "doctor" as const,
              id: block.id,
              title: (block as HomepageDoctorComponent).title,
              subtitle: (block as HomepageDoctorComponent).subtitle,
              doctors: (block as HomepageDoctorComponent).doctors.map(
                (doc) => ({
                  id: doc.id,
                  name: doc.name,
                  title: doc.title,
                  specialization: doc.specialization,
                  bio: doc.bio,
                  image: doc.image
                    ? {
                        url: getMediaUrl(doc.image),
                        alt: getMediaAlt(doc.image, doc.name),
                        width: 0,
                        height: 0,
                      }
                    : undefined,
                  experienceYears: doc.experience_years,
                }),
              ),
            };

          case "faq":
            return {
              blockType: "faq" as const,
              id: block.id,
              title: (block as HomepageFAQComponent).title,
              subtitle: (block as HomepageFAQComponent).subtitle,
              questions: (block as HomepageFAQComponent).questions || [],
            };

          default:
            console.warn(`[getHomepage] Unknown block type: ${componentType}`);
            return null;
        }
      })
      .filter((block) => block !== null) as HomepageBlock[];

    return {
      title: response.data.title,
      blocks,
    };
  } catch (error) {
    console.error("[getHomepage] Error fetching homepage:", error);
    // Return empty homepage on error (graceful degradation)
    return {
      title: "Homepage",
      blocks: [],
    };
  }
}
