'use client'

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  } | null;
  publishedAt: string;
}

interface BlogCollectionSectionProps {
  title: string;
  subtitle?: string;
  posts: BlogPost[];
  layout?: 'grid_2' | 'grid_3' | 'grid_4';
  showFeatured?: boolean;
  isActive?: boolean;
}

export default function BlogCollectionSection({
  title,
  subtitle,
  posts,
  layout = 'grid_3',
  isActive = true,
}: BlogCollectionSectionProps) {
  if (!isActive || !posts || posts.length === 0) {
    return null;
  }

  const gridCols = {
    grid_2: 'md:grid-cols-2',
    grid_3: 'md:grid-cols-3',
    grid_4: 'md:grid-cols-4',
  };

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary-50 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Blog Grid */}
        <div className={`grid grid-cols-1 ${gridCols[layout]} gap-8`}>
          {posts.map((post, index) => {
            const imageUrl = post.coverImage?.data?.attributes?.url;
            const imageAlt = post.coverImage?.data?.attributes?.alternativeText || post.title;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Link
                  href={`/news/${post.slug}`}
                  className="block group bg-background-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary-300 h-full"
                >
                  {/* Image Container */}
                  <div className="relative h-56 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl.startsWith('http') ? imageUrl : `${strapiUrl}${imageUrl}`}
                        alt={imageAlt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-20 h-20 text-primary-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                          />
                        </svg>
                      </div>
                    )}
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-foreground-secondary line-clamp-3 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <time 
                        dateTime={post.publishedAt}
                        className="text-sm text-foreground-muted"
                      >
                        {new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Đọc thêm
                        <svg 
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
