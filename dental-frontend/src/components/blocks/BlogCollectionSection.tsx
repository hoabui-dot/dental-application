import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  attributes: {
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
    };
    publishedAt: string;
  };
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
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`grid grid-cols-1 ${gridCols[layout]} gap-8`}>
          {posts.map((post) => {
            const imageUrl = post.attributes.coverImage?.data?.attributes?.url;
            const imageAlt = post.attributes.coverImage?.data?.attributes?.alternativeText || post.attributes.title;

            return (
              <Link
                key={post.id}
                href={`/blog/${post.attributes.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gray-200">
                  {imageUrl ? (
                    <Image
                      src={imageUrl.startsWith('http') ? imageUrl : `${strapiUrl}${imageUrl}`}
                      alt={imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                      <svg
                        className="w-16 h-16 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.attributes.title}
                  </h3>
                  {post.attributes.excerpt && (
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {post.attributes.excerpt}
                    </p>
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    <time dateTime={post.attributes.publishedAt}>
                      {new Date(post.attributes.publishedAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
