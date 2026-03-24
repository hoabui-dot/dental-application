import { motion } from 'motion/react';
import { Clock, TrendingUp, DollarSign } from 'lucide-react';

interface ServiceHeroProps {
  serviceName: string;
  description: string;
  duration: string;
  recoveryTime: string;
  priceRange?: string;
  heroImage: string;
}

export function ServiceHero({ 
  serviceName, 
  description, 
  duration, 
  recoveryTime, 
  priceRange,
  heroImage 
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
              Dịch vụ nha khoa
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              {serviceName}
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm">
                <Clock className="w-5 h-5 text-sky-500" />
                <div>
                  <div className="text-xs text-gray-500">Thời gian</div>
                  <div className="font-semibold text-gray-900">{duration}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm">
                <TrendingUp className="w-5 h-5 text-sky-500" />
                <div>
                  <div className="text-xs text-gray-500">Hồi phục</div>
                  <div className="font-semibold text-gray-900">{recoveryTime}</div>
                </div>
              </div>

              {priceRange && (
                <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm">
                  <DollarSign className="w-5 h-5 text-sky-500" />
                  <div>
                    <div className="text-xs text-gray-500">Giá</div>
                    <div className="font-semibold text-gray-900">{priceRange}</div>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-sky-500 text-white rounded-2xl font-semibold shadow-lg shadow-sky-500/30 hover:bg-sky-600 transition-colors"
              >
                Đặt lịch tư vấn
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-shadow"
              >
                Xem chi tiết
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt={serviceName}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
