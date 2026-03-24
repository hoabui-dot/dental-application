import { motion } from 'motion/react';
import { Calendar, Phone } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-sky-500 via-sky-600 to-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
            Sẵn sàng cải thiện nụ cười của bạn?
          </h2>
          
          <p className="text-xl text-sky-50 max-w-2xl mx-auto">
            Đặt lịch tư vấn miễn phí với đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm của chúng tôi
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-sky-600 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-shadow"
            >
              <Calendar className="w-5 h-5" />
              Đặt lịch ngay
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-700 text-white rounded-2xl font-semibold shadow-lg hover:bg-sky-800 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Gọi tư vấn: 0901 123 456
            </motion.button>
          </div>

          <div className="pt-6 text-sky-100 text-sm">
            ⭐ Được tin tưởng bởi hơn 10,000+ khách hàng
          </div>
        </motion.div>
      </div>
    </section>
  );
}
