import { Sprout } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function PhilosophySection() {
  return (
    <section className="px-6 py-16 md:py-24 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1684607632313-ededff0c700e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcGF0aWVudCUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3NzQyNjY2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Dental philosophy"
                  className="w-full h-96 object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -top-6 -left-6 bg-sky-500 w-32 h-32 rounded-full opacity-10"></div>
              <div className="absolute -bottom-6 -right-6 bg-sky-500 w-24 h-24 rounded-full opacity-10"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6 order-1 md:order-2">
            <div className="inline-block px-4 py-2 bg-sky-100 rounded-full">
              <span className="text-sky-600 font-medium">Our Philosophy</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl text-slate-900">
              Our Philosophy
            </h2>
            
            <div className="flex items-center gap-3 p-6 bg-sky-50 rounded-2xl border-l-4 border-sky-500">
              <Sprout className="w-8 h-8 text-sky-600 flex-shrink-0" />
              <p className="text-xl md:text-2xl text-sky-700">
                "Healthy smiles begin from the roots."
              </p>
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              We believe that long-term oral health starts with a strong foundation. 
              Our mission is to provide not only beautiful smiles but also sustainable 
              dental health for every patient.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed">
              By focusing on preventive care, patient education, and personalized treatment 
              plans, we ensure that your dental health is maintained for years to come. 
              Every smile we create is built on trust, expertise, and a commitment to excellence.
            </p>

            {/* Philosophy pillars */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <p className="text-3xl text-sky-600 mb-2">Prevention</p>
                <p className="text-sm text-slate-600">First</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <p className="text-3xl text-sky-600 mb-2">Education</p>
                <p className="text-sm text-slate-600">Always</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <p className="text-3xl text-sky-600 mb-2">Excellence</p>
                <p className="text-sm text-slate-600">Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
