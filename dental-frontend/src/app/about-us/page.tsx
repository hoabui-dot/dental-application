import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPageBySlug } from '@/src/lib/api/queries'
import { PreviewBanner } from '@/src/components/PreviewBanner'
import { AboutUsContent } from './AboutUsContent'

/**
 * About Us Page
 * 
 * Dedicated page for the About Us content with custom rendering
 * for the comprehensive JSON structure stored in Strapi.
 */

export async function generateMetadata(): Promise<Metadata> {
    try {
        const { isEnabled: isDraftMode } = await draftMode()
        const page = await getPageBySlug('about-us', isDraftMode)

        if (!page) {
            return {
                title: 'About Us - Page Not Found',
                description: 'The About Us page could not be found.',
            }
        }

        const title = page.seo?.metaTitle || page.title || 'About Us - Saigon International Dental Clinic'
        const description = page.seo?.metaDescription || page.description || 'Learn about our mission, values, and the team behind Saigon International Dental Clinic'

        return {
            title: isDraftMode ? `[PREVIEW] ${title}` : title,
            description,
            openGraph: {
                title,
                description,
                type: 'website',
                url: `${process.env.NEXT_PUBLIC_SERVER_URL}/about-us`,
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
            },
        }
    } catch (error) {
        console.error('Error generating metadata:', error)
        return {
            title: 'About Us',
            description: 'Learn about Saigon International Dental Clinic',
        }
    }
}

export default async function AboutUsPage() {
    try {
        const { isEnabled: isDraftMode } = await draftMode()
        const page = await getPageBySlug('about-us', isDraftMode)

        if (!page) {
            notFound()
        }

        // Parse JSON content if it exists
        let parsedContent = null
        if (page.content && typeof page.content === 'string') {
            try {
                parsedContent = JSON.parse(page.content)
            } catch (e) {
                console.error('Error parsing about-us content:', e)
            }
        } else if (page.content && typeof page.content === 'object') {
            parsedContent = page.content
        }

        return (
            <>
                {isDraftMode && <PreviewBanner />}

                <main className={isDraftMode ? "min-h-screen bg-background pt-20" : "min-h-screen bg-background"}>
                    <AboutUsContent content={parsedContent} page={page} />
                </main>
            </>
        )
    } catch (error) {
        console.error('Error rendering about-us page:', error)

        return (
            <main className="min-h-screen flex items-center justify-center bg-background">
                <div className="max-w-md w-full text-center space-y-4 px-4">
                    <div className="text-6xl">⚠️</div>
                    <h1 className="text-2xl font-bold text-foreground">
                        Error Loading Page
                    </h1>
                    <p className="text-foreground-secondary">
                        We encountered an error while loading the About Us page. Please try again later.
                    </p>
                </div>
            </main>
        )
    }
}

export const revalidate = false // Webhook-based revalidation
export const dynamicParams = true
