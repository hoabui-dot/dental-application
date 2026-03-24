import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterSectionProps {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSection({ beforeImage, afterImage }: BeforeAfterSectionProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Kết quả trước & sau
          </h2>
          <p className="text-lg text-gray-600">
            Sự thay đổi rõ rệt sau khi điều trị
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/10]">
            {/* Before Image */}
            <div className="absolute inset-0">
              <img 
                src={beforeImage} 
                alt="Before treatment"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-xl font-semibold">
                Trước
              </div>
            </div>

            {/* After Image with clip-path */}
            <div 
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src={afterImage} 
                alt="After treatment"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl font-semibold">
                Sau
              </div>
            </div>

            {/* Slider Control */}
            <div 
              className="absolute inset-y-0 cursor-ew-resize group"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={(e) => {
                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                  if (rect) {
                    const x = moveEvent.clientX - rect.left;
                    const percentage = (x / rect.width) * 100;
                    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
                  }
                };

                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
              onTouchStart={(e) => {
                const handleTouchMove = (moveEvent: TouchEvent) => {
                  const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                  if (rect) {
                    const x = moveEvent.touches[0].clientX - rect.left;
                    const percentage = (x / rect.width) * 100;
                    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
                  }
                };

                const handleTouchEnd = () => {
                  document.removeEventListener('touchmove', handleTouchMove);
                  document.removeEventListener('touchend', handleTouchEnd);
                };

                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', handleTouchEnd);
              }}
            >
              <div className="absolute inset-y-0 w-1 bg-white shadow-lg -ml-0.5" />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ChevronLeft className="w-5 h-5 text-gray-600 absolute left-1" />
                <ChevronRight className="w-5 h-5 text-gray-600 absolute right-1" />
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Kéo thanh trượt để xem sự khác biệt
          </div>
        </motion.div>
      </div>
    </section>
  );
}
