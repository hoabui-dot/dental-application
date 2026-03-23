'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NavLink } from './NavLink';
import { NavDropdown } from './NavDropdown';
import type { Navigation } from '@/src/types/strapi';

/**
 * Header Component - 2026 Modern Design
 * 
 * Premium navigation header with dropdown support, logo, and CTA button.
 * Client Component with mobile menu toggle functionality.
 * 
 * Features:
 * - CMS-driven navigation with dropdown menus
 * - Logo image support
 * - Sky Blue (#38BDF8) theme
 * - Sticky header with scroll effects
 * - Responsive design with mobile menu toggle
 * - CTA button
 */

interface HeaderProps {
  navigation: Navigation;
}

export function Header({ navigation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md supports-backdrop-filter:bg-white/60 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-sky-500 transition-colors"
          >
            {navigation.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={navigation.logo.url} 
                alt={navigation.logo.alt}
                className="h-10 w-auto"
              />
            ) : (
              <span>International Dental Clinic</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.navigation.length > 0 ? (
              navigation.navigation.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                
                return hasChildren ? (
                  <NavDropdown
                    key={item.id}
                    label={item.label}
                    href={item.href}
                  >
                    {item.children!}
                  </NavDropdown>
                ) : (
                  <NavLink
                    key={item.id}
                    href={item.href}
                    label={item.label}
                  />
                );
              })
            ) : (
              <span className="text-sm text-gray-500">
                No menu items
              </span>
            )}
          </nav>

          {/* CTA Button */}
          {navigation.ctaText && navigation.ctaLink && (
            <Link
              href={navigation.ctaLink}
              className="hidden md:inline-flex items-center px-6 py-2.5 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/50 transition-all duration-300"
            >
              {navigation.ctaText}
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-700 hover:text-sky-500 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              // Close icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-gray-200 pt-4">
            {navigation.navigation.length > 0 ? (
              navigation.navigation.map((item) => (
                <div key={item.id}>
                  <div onClick={closeMobileMenu}>
                    <NavLink
                      href={item.href}
                      label={item.label}
                      className="block py-2 text-gray-700 hover:text-sky-500 transition-colors"
                    />
                  </div>
                  {item.children && item.children.length > 0 && (
                    <div className="pl-4 space-y-1 border-l-2 border-sky-200 ml-2">
                      {item.children.map((child) => (
                        <div key={child.id} onClick={closeMobileMenu}>
                          <NavLink
                            href={child.href}
                            label={child.label}
                            className="block py-1.5 text-sm text-gray-600 hover:text-sky-500 transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : null}
            
            {/* Mobile CTA */}
            {navigation.ctaText && navigation.ctaLink && (
              <Link
                href={navigation.ctaLink}
                onClick={closeMobileMenu}
                className="block w-full text-center px-6 py-2.5 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600 transition-colors mt-4"
              >
                {navigation.ctaText}
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
