'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import type { NavChild } from '@/src/types/strapi';

/**
 * NavDropdown Component
 * 
 * Navigation dropdown menu with hover support.
 * Client Component for interactive dropdown behavior.
 * 
 * Features:
 * - Hover to open dropdown
 * - Smooth animations
 * - Active state highlighting
 * - Sky Blue theme
 */

interface NavDropdownProps {
  label: string;
  href: string;
  children: NavChild[];
}

export function NavDropdown({ label, href, children }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = pathname === href || children.some(child => pathname === child.href);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Parent Link */}
      <Link
        href={href}
        className={`
          text-sm font-medium transition-colors flex items-center space-x-1
          ${isActive 
            ? 'text-sky-500 font-semibold' 
            : 'text-gray-700 hover:text-sky-500'
          }
        `.trim()}
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Link>

      {/* Dropdown Menu */}
      {isOpen && children.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {children.map((child) => {
            const isChildActive = pathname === child.href;
            
            return (
              <Link
                key={child.id}
                href={child.href}
                className={`
                  block px-4 py-2.5 text-sm transition-colors
                  ${isChildActive
                    ? 'text-sky-500 bg-sky-50 font-medium'
                    : 'text-gray-700 hover:text-sky-500 hover:bg-gray-50'
                  }
                `.trim()}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
