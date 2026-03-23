import { Calendar, Clipboard, Stethoscope, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: 'Book Consultation',
    description: 'Schedule your free consultation online or by phone',
  },
  {
    icon: Clipboard,
    title: 'Personalized Plan',
    description: 'Get a customized treatment plan tailored to your needs',
  },
  {
    icon: Stethoscope,
    title: 'Expert Treatment',
    description: 'Receive care from our experienced dental professionals',
  },
  {
    icon: Sparkles,
    title: 'Transform Your Smile',
    description: 'Enjoy your beautiful, healthy smile with confidence',
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your journey to a perfect smile in four simple steps
          </p>
        </div>

        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-600"></div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number Circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center mx-auto shadow-lg z-10 relative">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-20 mx-auto left-0 right-0 transform translate-x-8">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Mobile Connector */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-1 h-12 bg-gradient-to-b from-sky-400 to-sky-600 mx-auto my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
