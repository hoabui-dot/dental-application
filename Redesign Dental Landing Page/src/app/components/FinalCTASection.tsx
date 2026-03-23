import { Button } from './ui/button';
import { Calendar, Phone, MessageCircle } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-white text-sm font-semibold">Limited Slots Available</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your Smile?
        </h2>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-sky-50 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join thousands of happy patients who trusted us with their smile. Book your free consultation today and take the first step towards the smile you deserve.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="bg-white text-sky-600 hover:bg-sky-50 px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all">
            <Calendar className="w-5 h-5 mr-2" />
            Book Free Consultation
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call (555) 123-4567
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span>Free Consultation</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
          <div className="flex items-center gap-2">
            <span>No Obligation</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
          <div className="flex items-center gap-2">
            <span>Insurance Accepted</span>
          </div>
        </div>
      </div>
    </section>
  );
}
