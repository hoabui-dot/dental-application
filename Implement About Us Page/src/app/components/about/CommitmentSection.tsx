import { Smile, Star, Shield, Heart, Users } from 'lucide-react';

export function CommitmentSection() {
  const commitments = [
    {
      icon: Smile,
      number: '1',
      title: 'Patient Experience',
      subtitle: 'Customer Experience',
      description: 'We ensure a comfortable and stress-free journey from the moment you walk in.'
    },
    {
      icon: Star,
      number: '2',
      title: 'Service Quality',
      subtitle: 'Customer Service',
      description: 'Delivering consistent, high-quality dental care that exceeds expectations.'
    },
    {
      icon: Shield,
      number: '3',
      title: 'Safety & Hygiene',
      subtitle: 'Cleanliness & Safety',
      description: 'Strict sterilization protocols and international safety standards at all times.'
    },
    {
      icon: Heart,
      number: '4',
      title: 'Compassionate Care',
      subtitle: 'Compassion & Care',
      description: 'Understanding and supporting every patient with empathy and personalized attention.'
    },
    {
      icon: Users,
      number: '5',
      title: 'Community Responsibility',
      subtitle: 'Community Commitment',
      description: 'Contributing to better oral health awareness and accessible dental care for all.'
    }
  ];

  return (
    <section className="px-6 py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
            <span className="text-sky-600 font-medium">Our Commitment</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
            Our Commitment to Excellence
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Five pillars that define our dedication to providing exceptional dental care
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden md:block relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-sky-200 -translate-x-1/2"></div>

          <div className="space-y-16">
            {commitments.map((commitment, index) => {
              const Icon = commitment.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative">
                  {/* Center number badge */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center shadow-lg z-10">
                    <span className="text-2xl text-white">{commitment.number}</span>
                  </div>

                  <div className={`grid grid-cols-2 gap-8 ${isEven ? '' : 'text-right'}`}>
                    {/* Content */}
                    <div className={isEven ? 'pr-12' : 'col-start-2 pl-12'}>
                      <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-slate-100">
                        <div className={`bg-sky-100 p-4 rounded-2xl w-fit mb-4 ${isEven ? '' : 'ml-auto'}`}>
                          <Icon className="w-8 h-8 text-sky-600" />
                        </div>
                        <h3 className="text-2xl text-slate-900 mb-2">{commitment.title}</h3>
                        <p className="text-sm text-sky-600 uppercase tracking-wider mb-3">
                          {commitment.subtitle}
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          {commitment.description}
                        </p>
                      </div>
                    </div>

                    {/* Empty space on the other side */}
                    <div className={isEven ? 'col-start-2' : 'col-start-1'}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-8">
          {commitments.map((commitment, index) => {
            const Icon = commitment.icon;
            
            return (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-xl text-white">{commitment.number}</span>
                    </div>
                    <div className="bg-sky-100 p-3 rounded-xl">
                      <Icon className="w-6 h-6 text-sky-600" />
                    </div>
                  </div>
                  <h3 className="text-xl text-slate-900 mb-2">{commitment.title}</h3>
                  <p className="text-sm text-sky-600 uppercase tracking-wider mb-3">
                    {commitment.subtitle}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {commitment.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
