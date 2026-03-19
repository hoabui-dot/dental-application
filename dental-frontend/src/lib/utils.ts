/**
 * Utility Functions
 *
 * Helper functions for className merging and other utilities.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 *
 * Combines clsx for conditional classes and tailwind-merge
 * to handle Tailwind class conflicts properly.
 *
 * @param inputs - Class values to merge
 * @returns Merged className string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format phone number
 *
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

/**
 * Validate email format
 *
 * @param email - Email string
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
