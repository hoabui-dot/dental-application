import { Scan, UserCheck, FileText, Sofa } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function WhyChooseUsSection() {
  const features = [
    {
      icon: Scan,
      title: 'Advanced 3D Scanning & CAD/CAM Technology',
      description: 'Precision diagnostics and treatment planning with cutting-edge digital tools'
    },
    {
      icon: UserCheck,
      title: 'Experienced Specialists',
      description: 'Our team of highly qualified dentists with international training'
    },
    {
      icon: FileText,
      title: 'Transparent Treatment Plans',
      description: 'Clear communication and detailed cost breakdowns before treatment'
    },
    {
      icon: Sofa,
      title: 'Comfortable Modern Environment',
      description: 'Relaxing atmosphere designed to reduce dental anxiety'
    }
  ];

  return (
    <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Content Side */}
        <div className="space-y-8">
          <div>
            <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
              <span className="text-sky-600 font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
              Why Patients Choose Us
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our clinic is equipped with state-of-the-art facilities and a team of highly skilled 
              dentists committed to delivering personalized care.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100"
                >
                  <div className="bg-sky-100 p-3 rounded-xl w-fit mb-4">
                    <Icon className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="text-lg text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Image Collage Side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1770321119305-f191c09c5801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBlcXVpcG1lbnQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3NDI2MDgxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Dental technology"
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1684607632313-ededff0c700e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcGF0aWVudCUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3NzQyNjY2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Patient care"
                className="w-full h-40 object-cover"
              />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBzbWlsaW5nfGVufDF8fHx8MTc3NDM0MDcwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Happy patient"
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1720180244267-67c2eb52f3a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQyNzU2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Clinic interior"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
