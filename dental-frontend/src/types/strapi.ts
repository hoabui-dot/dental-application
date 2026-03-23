/**
 * Strapi TypeScript Types
 *
 * Type definitions for Strapi API responses and frontend data structures.
 */

// ============================================================================
// Strapi API Response Types (Raw)
// ============================================================================

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: any;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
}

// ============================================================================
// Strapi Content Type Attributes
// ============================================================================

export interface PageAttributes {
  title: string;
  slug: string;
  content?: string; // Rich text content field
  cover?: StrapiMedia; // Cover image
  description?: string; // Text description
  publishDate?: string; // Publish date
  metaTitle?: string | null;
  metaDescription?: string | null;
  layout?: BlockComponent[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export type BlockComponent = HeroComponent | ServicesComponent | CTAComponent;

export interface HeroComponent {
  __component: "blocks.hero";
  id: number;
  heading: string;
  subheading: string | null;
  image: StrapiMedia;
}

export interface ServicesComponent {
  __component: "blocks.services";
  id: number;
  heading: string;
  items: ServiceItem[];
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: StrapiMedia;
}

export interface CTAComponent {
  __component: "blocks.cta";
  id: number;
  text: string;
  buttonLabel: string;
  link: string;
}

// ============================================================================
// Strapi API Response Types (Typed)
// ============================================================================

export type StrapiPage = StrapiResponse<StrapiEntity<PageAttributes>>;
export type StrapiPages = StrapiResponse<StrapiEntity<PageAttributes>[]>;

// ============================================================================
// Frontend Types (Transformed)
// ============================================================================

export interface Page {
  id: number;
  title: string;
  slug: string;
  content?: string; // Rich text content field
  cover?: Media; // Cover image
  description?: string; // Text description
  publishDate?: string; // Publish date
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  layout: Block[];
}

export type Block = HeroBlock | ServicesBlock | CTABlock;

export interface HeroBlock {
  blockType: "hero";
  heading: string;
  subheading?: string;
  image?: Media;
}

export interface ServicesBlock {
  blockType: "services";
  heading: string;
  items: {
    title: string;
    description: string;
    image?: Media;
  }[];
}

export interface CTABlock {
  blockType: "cta";
  text: string;
  buttonLabel: string;
  link: string;
}

export interface Media {
  url: string;
  alt: string;
  width: number;
  height: number;
}

// ============================================================================
// Navigation Types
// ============================================================================

export interface StrapiNavigation {
  data: {
    id: number;
    documentId: string;
    navigation: NavItem[];
    logo?: any;
    ctaText?: string;
    ctaLink?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  meta: Record<string, unknown>;
}

export interface NavChild {
  id: number;
  label: string;
  href: string;
  isExternal?: boolean;
  icon?: string | null;
}

export interface NavItem {
  id: number;
  label: string;
  href: string;
  isExternal?: boolean;
  icon?: string | null;
  children?: NavChild[];
}

export interface Navigation {
  navigation: NavItem[];
  logo?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  ctaText?: string;
  ctaLink?: string;
}

// ============================================================================
// Footer Types
// ============================================================================

export interface StrapiFooter {
  data: {
    id: number;
    documentId: string;
    description: string;
    contact_info: ContactInfo;
    footer_links: FooterLink[];
    social_links: SocialLink[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  meta: Record<string, unknown>;
}

export interface ContactInfo {
  id: number;
  address: string;
  phone: string;
  email: string;
}

export interface FooterLink {
  id: number;
  label: string;
  href: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon?: Media;
}

export interface Footer {
  description: string;
  contactInfo: ContactInfo;
  links: FooterLink[];
  socialLinks: SocialLink[];
}

// ============================================================================
// Homepage Types
// ============================================================================

export interface StrapiHomepage {
  data: {
    id: number;
    documentId: string;
    title: string;
    layout: HomepageBlockComponent[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  meta: Record<string, unknown>;
}

export type HomepageBlockComponent =
  | HomepageVideoHeroComponent
  | HomepageHeroComponent
  | HomepageTrustComponent
  | HomepageServicesComponent
  | HomepageBeforeAfterComponent
  | HomepagePricingComponent
  | HomepageProcessComponent
  | HomepageDoctorComponent
  | HomepageAboutComponent
  | HomepageTestimonialsComponent
  | HomepageFAQComponent
  | HomepageCTAComponent;

export interface HomepageVideoHeroComponent {
  __component: "homepage.video-hero";
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  videoUrl: string;
  posterImage?: any;
  overlayOpacity: number;
  isActive: boolean;
}

export interface HomepageHeroComponent {
  __component: "homepage.hero";
  id: number;
  heading: string;
  subheading?: string;
  image?: any;
  cta_label?: string;
  cta_link?: string;
}

export interface HomepageServicesComponent {
  __component: "homepage.services";
  id: number;
  title: string;
  description?: string;
  items: HomepageServiceItem[];
}

export interface HomepageServiceItem {
  id: number;
  title: string;
  description: string;
  image?: any;
}

export interface HomepageAboutComponent {
  __component: "homepage.about";
  id: number;
  title: string;
  content: string;
  image?: any;
}

export interface HomepageTestimonialsComponent {
  __component: "homepage.testimonials";
  id: number;
  title: string;
  items: HomepageTestimonialItem[];
}

export interface HomepageTestimonialItem {
  id: number;
  name: string;
  content: string;
  rating: number;
}

export interface HomepageCTAComponent {
  __component: "homepage.cta";
  id: number;
  text: string;
  button_label: string;
  button_link: string;
}

export interface HomepageTrustComponent {
  __component: "homepage.trust";
  id: number;
  title: string;
  subtitle?: string;
  stats: Array<{
    id: number;
    number: string;
    label: string;
    suffix?: string;
  }>;
  certifications: Array<{
    id: number;
    name: string;
    image?: any;
  }>;
}

export interface HomepageBeforeAfterComponent {
  __component: "homepage.before-after";
  id: number;
  title: string;
  subtitle?: string;
  cases: Array<{
    id: number;
    title: string;
    description?: string;
    before_image: any;
    after_image: any;
    treatment?: string;
  }>;
}

export interface HomepagePricingComponent {
  __component: "homepage.pricing";
  id: number;
  title: string;
  subtitle?: string;
  plans: Array<{
    id: number;
    name: string;
    price: string;
    period?: string;
    description?: string;
    features: Array<{
      id: number;
      text: string;
      included: boolean;
    }>;
    is_popular: boolean;
    cta_label?: string;
    cta_link?: string;
  }>;
}

export interface HomepageProcessComponent {
  __component: "homepage.process";
  id: number;
  title: string;
  subtitle?: string;
  steps: Array<{
    id: number;
    title: string;
    description: string;
    icon?: string;
  }>;
}

export interface HomepageDoctorComponent {
  __component: "homepage.doctor";
  id: number;
  title: string;
  subtitle?: string;
  doctors: Array<{
    id: number;
    name: string;
    title: string;
    specialization?: string;
    bio?: string;
    image?: any;
    experience_years?: number;
  }>;
}

export interface HomepageFAQComponent {
  __component: "homepage.faq";
  id: number;
  title: string;
  subtitle?: string;
  questions: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}

// Frontend Homepage Types (Normalized)

export interface Homepage {
  title: string;
  blocks: HomepageBlock[];
}

export type HomepageBlock =
  | HomepageVideoHeroBlock
  | HomepageHeroBlock
  | HomepageTrustBlock
  | HomepageServicesBlock
  | HomepageBeforeAfterBlock
  | HomepagePricingBlock
  | HomepageProcessBlock
  | HomepageDoctorBlock
  | HomepageAboutBlock
  | HomepageTestimonialsBlock
  | HomepageFAQBlock
  | HomepageCTABlock;

export interface HomepageVideoHeroBlock {
  blockType: "video-hero";
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  videoUrl: string;
  posterImage?: Media;
  overlayOpacity: number;
  isActive: boolean;
}

export interface HomepageHeroBlock {
  blockType: "hero";
  id: number;
  heading: string;
  subheading?: string;
  image?: Media;
  ctaLabel?: string;
  ctaLink?: string;
}

export interface HomepageServicesBlock {
  blockType: "services";
  id: number;
  title: string;
  description?: string;
  items: {
    id: number;
    title: string;
    description: string;
    image?: Media;
  }[];
}

export interface HomepageAboutBlock {
  blockType: "about";
  id: number;
  title: string;
  content: string;
  image?: Media;
}

export interface HomepageTestimonialsBlock {
  blockType: "testimonials";
  id: number;
  title: string;
  items: {
    id: number;
    name: string;
    content: string;
    rating: number;
  }[];
}

export interface HomepageCTABlock {
  blockType: "cta";
  id: number;
  text: string;
  buttonLabel: string;
  buttonLink: string;
}

export interface HomepageTrustBlock {
  blockType: "trust";
  id: number;
  title: string;
  subtitle?: string;
  stats: Array<{
    id: number;
    number: string;
    label: string;
    suffix?: string;
  }>;
  certifications: Array<{
    id: number;
    name: string;
    image?: Media;
  }>;
}

export interface HomepageBeforeAfterBlock {
  blockType: "before-after";
  id: number;
  title: string;
  subtitle?: string;
  cases: Array<{
    id: number;
    title: string;
    description?: string;
    beforeImage?: Media;
    afterImage?: Media;
    treatment?: string;
  }>;
}

export interface HomepagePricingBlock {
  blockType: "pricing";
  id: number;
  title: string;
  subtitle?: string;
  plans: Array<{
    id: number;
    name: string;
    price: string;
    period?: string;
    description?: string;
    features: Array<{
      id: number;
      text: string;
      included: boolean;
    }>;
    isPopular: boolean;
    ctaLabel?: string;
    ctaLink?: string;
  }>;
}

export interface HomepageProcessBlock {
  blockType: "process";
  id: number;
  title: string;
  subtitle?: string;
  steps: Array<{
    id: number;
    title: string;
    description: string;
    icon?: string;
  }>;
}

export interface HomepageDoctorBlock {
  blockType: "doctor";
  id: number;
  title: string;
  subtitle?: string;
  doctors: Array<{
    id: number;
    name: string;
    title: string;
    specialization?: string;
    bio?: string;
    image?: Media;
    experienceYears?: number;
  }>;
}

export interface HomepageFAQBlock {
  blockType: "faq";
  id: number;
  title: string;
  subtitle?: string;
  questions: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}
