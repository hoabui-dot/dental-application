import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-sky-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-semibold text-xl text-gray-900">DentalCare</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-sky-600 transition-colors">
              Home
            </a>
            <div className="relative">
              <button 
                className="flex items-center gap-1 text-gray-700 hover:text-sky-600 transition-colors"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              {servicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-sky-100 py-2"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <a href="#cosmetic" className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                    Cosmetic Dentistry
                  </a>
                  <a href="#general" className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                    General Dentistry
                  </a>
                  <a href="#advanced" className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                    Advanced Treatment
                  </a>
                </div>
              )}
            </div>
            <a href="#doctors" className="text-gray-700 hover:text-sky-600 transition-colors">
              Doctors
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-sky-600 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-gray-700 hover:text-sky-600 transition-colors">
              FAQ
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-sky-100">
            <div className="flex flex-col gap-4">
              <a href="#home" className="text-gray-700 hover:text-sky-600 transition-colors">
                Home
              </a>
              <a href="#services" className="text-gray-700 hover:text-sky-600 transition-colors">
                Services
              </a>
              <a href="#doctors" className="text-gray-700 hover:text-sky-600 transition-colors">
                Doctors
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-sky-600 transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-gray-700 hover:text-sky-600 transition-colors">
                FAQ
              </a>
              <Button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full w-full">
                Book Now
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
