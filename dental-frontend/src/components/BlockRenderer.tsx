import type { Page, HomepageBlock } from '@/src/types/strapi'
import { VideoHero } from './blocks/VideoHero'
import { HeroBlock } from './blocks/HeroBlock'
import { ServicesBlock } from './blocks/ServicesBlock'
import { CTABlock } from './blocks/CTABlock'
import { AboutBlock } from './blocks/AboutBlock'
import { TestimonialsBlock } from './blocks/TestimonialsBlock'
import { TrustSection } from './blocks/TrustSection'
import { BeforeAfterSection } from './blocks/BeforeAfterSection'
import { PricingSection } from './blocks/PricingSection'
import { ProcessSection } from './blocks/ProcessSection'
import { DoctorSection } from './blocks/DoctorSection'
import { FAQSection } from './blocks/FAQSection'
import BlogCollectionSection from './blocks/BlogCollectionSection'
import { EmptyState } from './EmptyState'

/**
 * Block Renderer Component
 * 
 * This is the core component that renders the block-based layout system.
 * It takes an array of blocks from Strapi CMS and renders the appropriate
 * component for each block type.
 * 
 * How it works:
 * 1. Receives layout array from CMS
 * 2. Maps over each block
 * 3. Switches on blockType
 * 4. Renders corresponding component
 * 5. Handles unknown blocks gracefully
 * 
 * Adding new blocks:
 * 1. Create new block component in /components/blocks/
 * 2. Import it here
 * 3. Add case to switch statement
 */

interface BlockRendererProps {
  layout: Page['layout'] | HomepageBlock[]
}

export function BlockRenderer({ layout }: BlockRendererProps) {
  // Handle empty or undefined layout
  if (!layout || layout.length === 0) {
    return (
      <EmptyState
        title="No content blocks"
        description="This page doesn't have any content blocks yet. Add some blocks in the CMS."
      />
    )
  }

  return (
    <>
      {layout.map((block, index) => {
        // Safety check for block
        if (!block || !block.blockType) {
          console.warn(`Invalid block at index ${index}:`, block)
          return null
        }

        // Render appropriate component based on blockType
        try {
          // Generate unique key - use id if available (Homepage blocks), otherwise use index
          const blockId = 'id' in block ? block.id : index;
          
          switch (block.blockType) {
            case 'video-hero':
              return <VideoHero key={`video-hero-${blockId}`} data={block as any} />

            case 'hero':
              return <HeroBlock key={`hero-${blockId}`} data={block as any} />

            case 'services':
              return <ServicesBlock key={`services-${blockId}`} data={block as any} />

            case 'cta':
              return <CTABlock key={`cta-${blockId}`} data={block as any} />

            case 'about':
              return <AboutBlock key={`about-${blockId}`} data={block as any} />

            case 'testimonials':
              return <TestimonialsBlock key={`testimonials-${blockId}`} data={block as any} />

            case 'trust':
              return <TrustSection key={`trust-${blockId}`} data={block as any} />

            case 'before-after':
              return <BeforeAfterSection key={`before-after-${blockId}`} data={block as any} />

            case 'pricing':
              return <PricingSection key={`pricing-${blockId}`} data={block as any} />

            case 'process':
              return <ProcessSection key={`process-${blockId}`} data={block as any} />

            case 'doctor':
              return <DoctorSection key={`doctor-${blockId}`} data={block as any} />

            case 'faq':
              return <FAQSection key={`faq-${blockId}`} data={block as any} />

            case 'blog-collection-section':
              return <BlogCollectionSection key={`blog-${blockId}`} {...(block as any)} />

            default:
              // Handle unknown block types gracefully
              const unknownBlock = block as any;
              console.warn(`Unknown block type: ${unknownBlock.blockType}`)
              return (
                <div key={index} className="py-8 bg-yellow-50 dark:bg-yellow-900/20">
                  <div className="container mx-auto px-4 text-center">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      Unknown block type: {unknownBlock.blockType}
                    </p>
                  </div>
                </div>
              )
          }
        } catch (error) {
          console.error(`Error rendering block ${index}:`, error)
          return (
            <div key={index} className="py-8 bg-red-50 dark:bg-red-900/20">
              <div className="container mx-auto px-4 text-center">
                <p className="text-red-800 dark:text-red-200">
                  Error rendering block
                </p>
              </div>
            </div>
          )
        }
      })}
    </>
  )
}
