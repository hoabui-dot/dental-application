import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-sky-50 to-sky-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">International Dental Clinic</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Delivering world-class dental care with advanced technology and a dedicated team of specialists—committed to giving you a confident, healthy smile.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">Home page</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">About us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">Introduction</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-600">
                  123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <div className="text-gray-600">0901 123 456</div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <div className="text-gray-600">contact@nhakhoasaigon.vn</div>
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-sky-500" />
                  <span className="font-semibold text-gray-900">Working Hours</span>
                </div>
                <div className="text-sm text-gray-600 ml-7">
                  <div>Monday - Friday: 8:00 - 18:00</div>
                  <div>Saturday: 9:00 - 15:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sky-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div>© 2026 International Dental Clinic. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-sky-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sky-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-sky-600 transition-colors">HIPAA Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
