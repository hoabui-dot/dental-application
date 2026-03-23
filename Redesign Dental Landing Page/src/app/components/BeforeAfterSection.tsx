import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const results = [
  {
    id: 1,
    title: 'Teeth Whitening Transformation',
    description: 'Professional whitening treatment - 3 sessions',
    image: 'https://images.unsplash.com/photo-1655807946138-811bb2340d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWV0aCUyMHdoaXRlbmluZyUyMGJlZm9yZSUyMGFmdGVyfGVufDF8fHx8MTc3NDA4MzUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Smile Makeover',
    description: 'Complete smile transformation with veneers',
    image: 'https://images.unsplash.com/photo-1684607632041-32d729cdee35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRlbnRhbCUyMHBhdGllbnQlMjBzbWlsaW5nfGVufDF8fHx8MTc3NDAwNzU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Dental Implants',
    description: 'Natural-looking implant restoration',
    image: 'https://images.unsplash.com/photo-1770321119162-05c18fbcfdb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZW50aXN0JTIwcGF0aWVudCUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3NzQxMDc1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function BeforeAfterSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % results.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + results.length) % results.length);
  };

  const currentResult = results[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Real Results, Real Smiles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the transformations we've achieved for our patients
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Before/After Comparison */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
            <div className="relative aspect-[16/9]">
              {/* Image Container */}
              <div className="relative w-full h-full">
                <ImageWithFallback
                  src={currentResult.image}
                  alt={currentResult.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Slider Overlay */}
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-900/60 to-transparent"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="font-semibold text-gray-900">Before</span>
                  </div>
                </div>

                {/* After Label */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-semibold text-gray-900">After</span>
                </div>

                {/* Slider Handle */}
                <div 
                  className="absolute inset-y-0 w-1 bg-white cursor-ew-resize"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="flex gap-1">
                      <ChevronLeft className="w-4 h-4 text-sky-600" />
                      <ChevronRight className="w-4 h-4 text-sky-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
              />
            </div>

            {/* Info */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentResult.title}</h3>
              <p className="text-gray-600">{currentResult.description}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-sky-600" />
            </button>
            
            <div className="flex gap-2">
              {results.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-sky-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-sky-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
