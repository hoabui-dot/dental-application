import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Nha Khoa Quốc Tế</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-sky-600 transition-colors">
              Home page
            </a>
            <button className="flex items-center gap-1 text-sky-600 hover:text-sky-700 transition-colors">
              Services
              <ChevronDown className="w-4 h-4" />
            </button>
            <a href="#" className="text-gray-700 hover:text-sky-600 transition-colors">
              News
            </a>
            <a href="#" className="text-gray-700 hover:text-sky-600 transition-colors">
              About us
            </a>
            <a href="#" className="text-gray-700 hover:text-sky-600 transition-colors">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-sky-500 text-white rounded-xl font-semibold shadow-md hover:bg-sky-600 transition-colors"
          >
            Booking now
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
