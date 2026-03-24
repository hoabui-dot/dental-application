'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, ArrowRight, TrendingUp, Tag } from 'lucide-react';

interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  coverImage?: {
    url: string;
    alternativeText?: string;
  } | null;
  publishedAt: string;
}

interface NewsPageContent {
  hero: {
    title: string;
    description: string;
    searchPlaceholder: string;
  };
  categories: Array<{
    id: string;
    label: string;
  }>;
  sidebar: {
    popularPostsTitle: string;
    tagsTitle: string;
    tags: string[];
    cta: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
  };
  emptyState: {
    message: string;
  };
  readMoreText: string;
  readNowText: string;
}

interface NewsPageClientProps {
  initialBlogs: BlogPost[];
  featuredBlog?: BlogPost;
  popularBlogs: BlogPost[];
  strapiUrl: string;
  pageContent: NewsPageContent;
}

export function NewsPageClient({ 
  initialBlogs, 
  featuredBlog: initialFeaturedBlog,
  popularBlogs,
  strapiUrl,
  pageContent
}: NewsPageClientProps) {
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(initialBlogs);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    filterBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, searchQuery]);

  function filterBlogs() {
    let filtered = [...initialBlogs];

    // Filter by category
    if (activeCategory !== 'all') {
      const categoryLabel = pageContent.categories.find(c => c.id === activeCategory)?.label;
      filtered = filtered.filter(blog => 
        blog.category === categoryLabel
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  }

  const featuredBlog = filteredBlogs[0] || initialFeaturedBlog;
  const regularBlogs = filteredBlogs.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-b from-white via-primary-50 to-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {pageContent.hero.title}
            </h1>
            <p className="text-foreground-secondary text-lg md:text-xl mb-8">
              {pageContent.hero.description}
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted w-5 h-5" />
              <input
                type="text"
                placeholder={pageContent.hero.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background-secondary border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-background-secondary border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {pageContent.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-6 py-2.5 rounded-full whitespace-nowrap transition-all font-medium
                  ${
                    activeCategory === category.id
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                      : 'bg-neutral-100 text-foreground hover:bg-neutral-200'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-foreground-secondary">{pageContent.emptyState.message}</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredBlog && (
              <div className="mb-16">
                <FeaturedArticle blog={featuredBlog} strapiUrl={strapiUrl} readNowText={pageContent.readNowText} />
              </div>
            )}
            
            {/* Blog Grid with Sidebar */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Blog Grid */}
              <div className="lg:col-span-2">
                <div className="grid sm:grid-cols-2 gap-6">
                  {regularBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} strapiUrl={strapiUrl} readMoreText={pageContent.readMoreText} />
                  ))}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Sidebar popularBlogs={popularBlogs} sidebarContent={pageContent.sidebar} />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function FeaturedArticle({ blog, strapiUrl, readNowText }: { blog: BlogPost; strapiUrl: string; readNowText: string }) {
  const imageUrl = blog.coverImage?.url
    ? blog.coverImage.url.startsWith('http')
      ? blog.coverImage.url
      : `${strapiUrl}${blog.coverImage.url}`
    : 'https://images.unsplash.com/photo-1762625570087-6d98fca29531?w=1080';

  return (
    <article className="group relative bg-background-secondary rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      <Link href={`/news/${blog.slug}`}>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-64 md:h-full overflow-hidden">
            <div className="w-full h-full transition-transform duration-600 group-hover:scale-105">
              <Image
                src={imageUrl}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            
            {/* Category Badge */}
            {blog.category && (
              <div className="absolute top-6 left-6">
                <span className="inline-block px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium">
                  {blog.category}
                </span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-foreground-muted text-sm mb-4">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(blog.publishedAt).toLocaleDateString('vi-VN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-primary-600 transition-colors">
              {blog.title}
            </h2>
            
            {blog.excerpt && (
              <p className="text-foreground-secondary text-lg mb-6 line-clamp-3">
                {blog.excerpt}
              </p>
            )}
            
            <div className="inline-flex items-center gap-2 text-primary-600 group-hover:gap-4 transition-all">
              <span className="text-lg font-medium">{readNowText}</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function BlogCard({ blog, strapiUrl, readMoreText }: { blog: BlogPost; strapiUrl: string; readMoreText: string }) {
  const imageUrl = blog.coverImage?.url
    ? blog.coverImage.url.startsWith('http')
      ? blog.coverImage.url
      : `${strapiUrl}${blog.coverImage.url}`
    : 'https://images.unsplash.com/photo-1762625570087-6d98fca29531?w=1080';

  return (
    <article className="group bg-background-secondary rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <Link href={`/news/${blog.slug}`}>
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <div className="w-full h-full transition-transform duration-600 group-hover:scale-110">
            <Image
              src={imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Category Badge */}
          {blog.category && (
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1.5 bg-primary-500 text-white rounded-full text-xs font-medium">
                {blog.category}
              </span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-foreground-muted text-sm mb-3">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(blog.publishedAt).toLocaleDateString('vi-VN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {blog.title}
          </h3>
          
          {blog.excerpt && (
            <p className="text-foreground-secondary mb-4 line-clamp-3">
              {blog.excerpt}
            </p>
          )}
          
          <div className="inline-flex items-center gap-2 text-primary-600 group-hover:gap-3 transition-all">
            <span className="font-medium">{readMoreText}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </article>
  );
}

function Sidebar({ popularBlogs, sidebarContent }: { 
  popularBlogs: BlogPost[];
  sidebarContent: {
    popularPostsTitle: string;
    tagsTitle: string;
    tags: string[];
    cta: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
  };
}) {
  return (
    <aside className="space-y-6">
      {/* Popular Posts */}
      <div className="bg-background-secondary rounded-2xl p-6 shadow-md border border-border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <h3 className="text-xl font-bold text-foreground">{sidebarContent.popularPostsTitle}</h3>
        </div>
        <div className="space-y-4">
          {popularBlogs.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="block group"
            >
              <h4 className="text-sm font-medium text-foreground mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-1 text-xs text-foreground-muted">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Tags */}
      <div className="bg-background-secondary rounded-2xl p-6 shadow-md border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-primary-600" />
          <h3 className="text-xl font-bold text-foreground">{sidebarContent.tagsTitle}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {sidebarContent.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1.5 bg-neutral-100 hover:bg-primary-500 hover:text-white rounded-full text-sm transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* CTA Banner */}
      <div className="bg-linear-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="text-2xl font-bold mb-3">
          {sidebarContent.cta.title}
        </h3>
        <p className="mb-4 text-white/90">
          {sidebarContent.cta.description}
        </p>
        <Link
          href={sidebarContent.cta.buttonLink}
          className="block w-full bg-white text-primary-600 py-3 rounded-full hover:shadow-xl transition-all text-center font-medium"
        >
          {sidebarContent.cta.buttonText}
        </Link>
      </div>
    </aside>
  );
}
