import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white text-lg">Saigon Dental</h3>
                <p className="text-xs text-slate-400">Nha Khoa Quốc Tế</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Leading provider of advanced dental care in Vietnam, combining modern technology 
              with international standards.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-lg mb-4">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-sky-400 transition-colors">General Dentistry</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Orthodontics</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Dental Implants</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Cosmetic Dentistry</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Teeth Whitening</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Emergency Care</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-sky-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Gallery</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>123 Nguyen Hue Street, District 1, Ho Chi Minh City, Vietnam</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <a href="tel:19008089" className="hover:text-sky-400 transition-colors">
                  Hotline: 1900 8089
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <a href="mailto:info@saigondental.com" className="hover:text-sky-400 transition-colors">
                  info@saigondental.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-slate-800 rounded-lg">
              <p className="text-xs text-slate-400 mb-2">Opening Hours</p>
              <p className="text-sm text-white">Mon - Sat: 8:00 AM - 8:00 PM</p>
              <p className="text-sm text-white">Sunday: 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2026 Saigon International Dental Clinic. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
