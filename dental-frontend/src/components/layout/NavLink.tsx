'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * NavLink Component
 * 
 * Navigation link with active state highlighting.
 * Client Component to access current pathname.
 */

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function NavLink({ href, label, className = '' }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        text-sm font-medium transition-colors
        ${isActive 
          ? 'text-sky-500 font-semibold' 
          : 'text-gray-700 hover:text-sky-500'
        }
        ${className}
      `.trim()}
    >
      {label}
    </Link>
  );
}
