import Link from 'next/link';
import { getFooter } from '@/src/lib/api/queries';

/**
 * Footer Component - 2026 Modern Design
 * 
 * Premium footer with dark theme matching the example design.
 * Server Component that fetches footer data from Strapi CMS.
 * 
 * Features:
 * - Dark gray-900 background with white text
 * - 4-column grid layout (Brand, Quick Links, Services, Contact)
 * - Social media icons with hover effects
 * - Office hours card
 * - Bottom bar with legal links
 * - CMS-driven content
 * - Responsive design
 */

export async function Footer() {
  // Fetch footer from CMS
  const footer = await getFooter();

  return (
    <footer className="relative bg-[#DFF2FA] text-black -mt-16 pt-24">
      <div className="absolute top-0 left-0 right-0 h-24 bg-[#DFF2FA] rounded-t-[60px]"></div>
      <div className="relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-semibold text-xl">International Dental Clinic</span>
            </div>
            {footer.description ? (
              <p className="text-black mb-6">
                {footer.description}
              </p>
            ) : (
              <p className="text-black mb-6">
                Chăm sóc nha khoa cao cấp với sự chuyên nghiệp. Nụ cười của bạn là ưu tiên của chúng tôi.
              </p>
            )}
            <div className="flex gap-4">
              {footer.socialLinks.length > 0 ? (
                footer.socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                    aria-label={social.platform}
                  >
                    {social.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={social.icon.url} 
                        alt={social.icon.alt || social.platform}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-gray-700">{social.platform.charAt(0)}</span>
                    )}
                  </a>
                ))
              ) : (
                <>
                  <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-black hover:text-sky-600 transition-colors">
                  Home page
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-black hover:text-sky-600 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-black hover:text-sky-600 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-black hover:text-sky-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black hover:text-sky-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-xl mb-6">Services</h3>
            <ul className="space-y-3">
              {footer.links.length > 0 ? (
                footer.links.slice(0, 5).map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className="text-black hover:text-sky-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link href="/services/implant" className="text-black hover:text-sky-600 transition-colors">
                      Cấy ghép Implant
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/invisalign" className="text-black hover:text-sky-600 transition-colors">
                      Niềng răng Invisalign
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/veneer" className="text-black hover:text-sky-600 transition-colors">
                      Bọc răng sứ thẩm mỹ
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/whitening" className="text-black hover:text-sky-600 transition-colors">
                      Tẩy trắng răng
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/emergency" className="text-black hover:text-sky-600 transition-colors">
                      Cấp cứu nha khoa
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xl mb-6">Contact</h3>
            <ul className="space-y-4">
              {footer.contactInfo.address && (
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-sky-400 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-black">
                    {footer.contactInfo.address}
                  </span>
                </li>
              )}
              {footer.contactInfo.phone && (
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sky-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${footer.contactInfo.phone.replace(/\s/g, '')}`} className="text-black hover:text-sky-600 transition-colors">
                    {footer.contactInfo.phone}
                  </a>
                </li>
              )}
              {footer.contactInfo.email && (
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sky-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${footer.contactInfo.email}`} className="text-black hover:text-sky-600 transition-colors">
                    {footer.contactInfo.email}
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-6 bg-sky-100 rounded-xl p-4">
              <p className="text-sm text-black font-semibold mb-2">🕒 Working Hours</p>
              <p className="text-sm text-black">Monday – Friday: 8:00 - 18:00</p>
              <p className="text-sm text-black">Saturday: 9:00 - 15:00</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-black text-sm">
              © {new Date().getFullYear()} International Dental Clinic. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-black hover:text-sky-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-black hover:text-sky-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/hipaa" className="text-black hover:text-sky-600 transition-colors">
                HIPAA Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
