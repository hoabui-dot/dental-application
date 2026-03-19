/**
 * Strapi TypeScript Types
 * 
 * Type definitions for Strapi API responses and frontend data structures.
 */

// ============================================================================
// Strapi API Response Types (Raw)
// ============================================================================

export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiEntity<T> {
  id: number
  attributes: T
}

export interface StrapiMedia {
  data: {
    id: number
    attributes: {
      name: string
      alternativeText: string | null
      caption: string | null
      width: number
      height: number
      formats: any
      hash: string
      ext: string
      mime: string
      size: number
      url: string
      previewUrl: string | null
      provider: string
      createdAt: string
      updatedAt: string
    }
  } | null
}

// ============================================================================
// Strapi Content Type Attributes
// ============================================================================

export interface PageAttributes {
  title: string
  slug: string
  metaTitle: string | null
  metaDescription: string | null
  layout: BlockComponent[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type BlockComponent = HeroComponent | ServicesComponent | CTAComponent

export interface HeroComponent {
  __component: 'blocks.hero'
  id: number
  heading: string
  subheading: string | null
  image: StrapiMedia
}

export interface ServicesComponent {
  __component: 'blocks.services'
  id: number
  heading: string
  items: ServiceItem[]
}

export interface ServiceItem {
  id: number
  title: string
  description: string
  image: StrapiMedia
}

export interface CTAComponent {
  __component: 'blocks.cta'
  id: number
  text: string
  buttonLabel: string
  link: string
}

// ============================================================================
// Strapi API Response Types (Typed)
// ============================================================================

export type StrapiPage = StrapiResponse<StrapiEntity<PageAttributes>>
export type StrapiPages = StrapiResponse<StrapiEntity<PageAttributes>[]>

// ============================================================================
// Frontend Types (Transformed)
// ============================================================================

export interface Page {
  id: number
  title: string
  slug: string
  seo: {
    metaTitle: string
    metaDescription: string
  }
  layout: Block[]
}

export type Block = HeroBlock | ServicesBlock | CTABlock

export interface HeroBlock {
  blockType: 'hero'
  heading: string
  subheading?: string
  image?: Media
}

export interface ServicesBlock {
  blockType: 'services'
  heading: string
  items: {
    title: string
    description: string
    image?: Media
  }[]
}

export interface CTABlock {
  blockType: 'cta'
  text: string
  buttonLabel: string
  link: string
}

export interface Media {
  url: string
  alt: string
  width: number
  height: number
}
