import { Lightbulb, Shield, Heart } from 'lucide-react';

export function CoreValuesSection() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously adopt advanced technologies to improve treatment outcomes.',
      position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-12'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We prioritize honesty, transparency, and patient trust.',
      position: 'bottom-0 left-0 translate-y-12'
    },
    {
      icon: Heart,
      title: 'Care',
      description: 'We treat every patient with compassion and personalized attention.',
      position: 'bottom-0 right-0 translate-y-12'
    }
  ];

  return (
    <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
          <span className="text-sky-600 font-medium">Core Values</span>
        </div>
        <h2 className="text-3xl md:text-4xl text-slate-900">
          Our Core Values
        </h2>
      </div>

      {/* Desktop View - Circular Layout */}
      <div className="hidden md:block">
        <div className="relative max-w-4xl mx-auto h-96">
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full shadow-2xl flex items-center justify-center z-10">
            <div className="text-center text-white">
              <p className="text-4xl mb-2">3</p>
              <p className="text-sm uppercase tracking-wider">Core Values</p>
            </div>
          </div>

          {/* Value Cards */}
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index}
                className={`absolute ${value.position} w-72`}
              >
                <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100">
                  <div className="bg-sky-100 p-4 rounded-2xl w-fit mb-4 mx-auto">
                    <Icon className="w-8 h-8 text-sky-600" />
                  </div>
                  <h3 className="text-2xl text-slate-900 mb-3 text-center">{value.title}</h3>
                  <p className="text-slate-600 text-center leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View - Stacked Layout */}
      <div className="md:hidden space-y-6">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <div 
              key={index}
              className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
            >
              <div className="bg-sky-100 p-4 rounded-2xl w-fit mb-4 mx-auto">
                <Icon className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-2xl text-slate-900 mb-3 text-center">{value.title}</h3>
              <p className="text-slate-600 text-center leading-relaxed">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
