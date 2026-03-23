import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Star, Award, Users } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16" id="home">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQwNzk3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Modern Dental Clinic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-800/80 to-sky-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-sky-300" />
              <span className="text-sm">20+ Years of Excellence</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Smile,
              <br />
              <span className="text-sky-300">Our Priority</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-sky-50 mb-8 leading-relaxed">
              Experience world-class dental care with cutting-edge technology and compassionate professionals. 
              Transform your smile today.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all">
                Book Appointment
              </Button>
              <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full">
                View Services
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <p className="text-sm text-sky-100">Google Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-sky-300 mr-1" />
                  <span className="text-2xl font-bold">50K+</span>
                </div>
                <p className="text-sm text-sky-100">Happy Patients</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">98%</div>
                <p className="text-sm text-sky-100">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Hero Image (Desktop) */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-400/20 rounded-3xl blur-3xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1770321119162-05c18fbcfdb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZW50aXN0JTIwcGF0aWVudCUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3NzQxMDc1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional Dentist Consultation"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
