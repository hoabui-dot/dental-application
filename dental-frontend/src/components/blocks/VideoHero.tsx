'use client';

import Link from 'next/link';
import type { HomepageVideoHeroBlock } from '@/src/types/strapi';

/**
 * Video Hero Component - 2026 Premium Landing Page Design
 * 
 * Design Philosophy:
 * - Background video as the HERO (not decoration)
 * - Minimal overlay, maximum emotional impact
 * - Apple/Stripe/luxury medical aesthetic
 * - Clean, trustworthy design
 * - Sky Blue (#38BDF8) as primary brand color
 * 
 * Architecture:
 * - Layer 1 (z-0): Fullscreen background video
 * - Layer 2 (z-10): Dark overlay (controlled opacity)
 * - Layer 3 (z-20): Content (left-aligned or centered)
 * 
 * Video Requirements:
 * - Dental/medical themed
 * - High quality, professional
 * - Optimized for web (compressed)
 * - MP4 format recommended
 * 
 * Performance:
 * - Autoplay, muted, loop
 * - Poster image fallback
 * - Object-fit: cover
 */

interface VideoHeroProps {
  data: HomepageVideoHeroBlock;
}

export function VideoHero({ data }: VideoHeroProps) {
  // Don't render if section is disabled
  if (!data.isActive) {
    return null;
  }

  // Use videoUrl if available, otherwise show fallback
  const hasVideo = data.videoUrl && data.videoUrl.trim() !== '';
  const overlayOpacity = data.overlayOpacity ?? 0.4;

  // Check if URL is YouTube
  const isYouTube = hasVideo && (
    data.videoUrl.includes('youtube.com') || 
    data.videoUrl.includes('youtu.be')
  );

  // Extract YouTube video ID
  const getYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const youtubeId = isYouTube ? getYouTubeId(data.videoUrl) : null;

  return (
    <section className="video-hero relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Layer 1: Fullscreen Background Video (z-0) */}
      {hasVideo ? (
        isYouTube && youtubeId ? (
          // YouTube iframe embed
          <div className="absolute inset-0 w-full h-full z-0">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                width: '100vw',
                height: '100vh',
                objectFit: 'cover',
                transform: 'scale(1.5)', // Scale to hide YouTube UI
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              frameBorder="0"
            />
          </div>
        ) : (
          // Direct video file (MP4, WebM, etc.)
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={data.posterImage?.url}
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={data.videoUrl} type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-blue-800 to-sky-700" />
          </video>
        )
      ) : (
        /* Fallback gradient if no video */
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-blue-800 to-sky-700 z-0" />
      )}

      {/* Layer 2: Dark Overlay for Text Readability (z-10) */}
      <div 
        className="absolute inset-0 z-10 bg-black pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Layer 3: Content (z-20) */}
      <div className="relative z-20 flex items-center h-full">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            {/* Trust Badge - Minimal */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg animate-fade-in">
              <span className="text-sm font-semibold text-white uppercase tracking-wide">
                🌍 INTERNATIONAL STANDARD
              </span>
            </div>

            {/* Main Title - Large, Bold, White */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight animate-fade-in-up drop-shadow-2xl">
              {data.title}
            </h1>

            {/* Subtitle - Clean, Readable */}
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.1s' }}>
              {data.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Primary CTA - Sky Blue */}
              <Link href={data.ctaLink}>
                <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white text-lg font-semibold rounded-xl shadow-lg shadow-sky-500/50 hover:shadow-xl hover:shadow-sky-500/60 transition-all duration-300 hover:scale-105 active:scale-95">
                  <span>{data.ctaText}</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>

              {/* Secondary CTA */}
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-lg font-semibold rounded-xl border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Learn more</span>
              </button>
            </div>

            {/* Trust Indicators - Minimal, Clean */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Advanced Technology</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Absolute Safety</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">International Quality Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Minimal, Modern */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-xs font-medium text-white uppercase tracking-wider drop-shadow-lg">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll" />
          </div>
        </div>
      </div>
    </section>
  );
}
