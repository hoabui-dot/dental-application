import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-semibold text-xl">DentalCare</span>
            </div>
            <p className="text-gray-400 mb-6">
              Premium dental care with a personal touch. Your smile is our priority.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#doctors" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-sky-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#cosmetic" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Cosmetic Dentistry
                </a>
              </li>
              <li>
                <a href="#general" className="text-gray-400 hover:text-sky-400 transition-colors">
                  General Dentistry
                </a>
              </li>
              <li>
                <a href="#advanced" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Advanced Treatment
                </a>
              </li>
              <li>
                <a href="#emergency" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Emergency Care
                </a>
              </li>
              <li>
                <a href="#pediatric" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Pediatric Dentistry
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Dental Street
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-sky-400 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <a href="mailto:info@dentalcare.com" className="text-gray-400 hover:text-sky-400 transition-colors">
                  info@dentalcare.com
                </a>
              </li>
            </ul>
            <div className="mt-6 bg-sky-900/30 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-2">Office Hours</p>
              <p className="text-sm text-white">Mon-Fri: 8:00 AM - 6:00 PM</p>
              <p className="text-sm text-white">Sat: 9:00 AM - 3:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 DentalCare. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-sky-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-sky-400 transition-colors">
                Terms of Service
              </a>
              <a href="#hipaa" className="text-gray-400 hover:text-sky-400 transition-colors">
                HIPAA Compliance
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
