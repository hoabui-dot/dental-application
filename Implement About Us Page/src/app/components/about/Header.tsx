import { Phone, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg md:text-xl text-slate-900">Saigon International Dental</h1>
              <p className="text-xs text-slate-500 hidden md:block">Nha Khoa Quốc Tế Sài Gòn</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-slate-600 hover:text-sky-600 transition-colors">Home</a>
            <a href="#" className="text-sky-600">About Us</a>
            <a href="#" className="text-slate-600 hover:text-sky-600 transition-colors">Services</a>
            <a href="#" className="text-slate-600 hover:text-sky-600 transition-colors">Team</a>
            <a href="#" className="text-slate-600 hover:text-sky-600 transition-colors">Contact</a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <a 
              href="tel:19008089" 
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>1900 8089</span>
            </a>
            <button className="lg:hidden p-2 text-slate-600 hover:text-sky-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
