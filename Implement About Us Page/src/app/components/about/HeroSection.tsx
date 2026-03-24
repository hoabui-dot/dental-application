import { ImageWithFallback } from '../figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Text Content */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 bg-sky-100 rounded-full">
            <span className="text-sky-600 font-medium">About Us</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-slate-900">
            About Saigon International Dental Clinic
          </h1>
          
          <p className="text-xl md:text-2xl text-sky-600">
            Your lifelong partner in oral health and confident smiles.
          </p>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            Saigon International Dental Clinic is a leading provider of advanced dental care in Vietnam. 
            We combine modern technology, international standards, and a highly experienced team to deliver 
            safe, effective, and aesthetic dental solutions.
          </p>
        </div>

        {/* Right - Image Collage */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjB0ZWFtfGVufDF8fHx8MTc3NDM0MDY5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Dental clinic team"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1684607632313-ededff0c700e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcGF0aWVudCUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3NzQyNjY2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Patient consultation"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1720180244267-67c2eb52f3a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQyNzU2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern clinic interior"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBzbWlsaW5nfGVufDF8fHx8MTc3NDM0MDcwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Happy patient"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
