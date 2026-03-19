import type { Page } from '@/src/types/strapi'
import { HeroBlock } from './blocks/HeroBlock'
import { ServicesBlock } from './blocks/ServicesBlock'
import { CTABlock } from './blocks/CTABlock'
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
  layout: Page['layout']
}

export function BlockRenderer({ layout }: BlockRendererProps) {
  // Handle empty or undefined layout
  if (!layout || layout.length === 0) {
    return (
      <EmptyState
        title="No content blocks"
        description="This page doesn't have any content blocks yet. Add some blocks in the Strapi admin panel."
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
          switch (block.blockType) {
            case 'hero':
              return <HeroBlock key={index} data={block} />

            case 'services':
              return <ServicesBlock key={index} data={block} />

            case 'cta':
              return <CTABlock key={index} data={block} />

            default:
              // Handle unknown block types gracefully
              console.warn(`Unknown block type: ${block.blockType}`)
              return (
                <div key={index} className="py-8 bg-yellow-50 dark:bg-yellow-900/20">
                  <div className="container mx-auto px-4 text-center">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      Unknown block type: {block.blockType}
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
