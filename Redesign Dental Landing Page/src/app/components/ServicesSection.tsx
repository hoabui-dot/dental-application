import { Sparkles, Smile, Zap, Shield, Crown, Scissors } from 'lucide-react';
import { Button } from './ui/button';

const services = [
  {
    category: 'Cosmetic',
    items: [
      {
        icon: Sparkles,
        title: 'Teeth Whitening',
        description: 'Professional whitening for a brighter, more confident smile',
        color: 'sky',
      },
      {
        icon: Crown,
        title: 'Veneers & Crowns',
        description: 'Custom-crafted restorations for perfect aesthetics',
        color: 'sky',
      },
      {
        icon: Smile,
        title: 'Smile Makeover',
        description: 'Complete transformation with comprehensive treatment',
        color: 'sky',
      },
    ],
  },
  {
    category: 'General',
    items: [
      {
        icon: Shield,
        title: 'Preventive Care',
        description: 'Regular checkups and cleanings to maintain oral health',
        color: 'blue',
      },
      {
        icon: Zap,
        title: 'Emergency Care',
        description: '24/7 urgent dental care when you need it most',
        color: 'blue',
      },
      {
        icon: Scissors,
        title: 'Periodontics',
        description: 'Expert gum disease treatment and prevention',
        color: 'blue',
      },
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Dental Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From preventive care to advanced cosmetic treatments, we offer everything you need for optimal oral health
          </p>
        </div>

        <div className="space-y-16">
          {services.map((category) => (
            <div key={category.category}>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">{category.category} Dentistry</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {category.items.map((service) => (
                  <div
                    key={service.title}
                    className="group bg-gradient-to-br from-white to-sky-50 rounded-3xl p-8 border border-sky-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <Button 
                      variant="ghost" 
                      className="text-sky-600 hover:text-sky-700 p-0 h-auto font-semibold group-hover:gap-2 transition-all"
                    >
                      Learn More
                      <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-6 text-lg rounded-full">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
