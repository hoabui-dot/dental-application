import { motion } from 'motion/react';
import { Award, Zap, Shield, Calendar } from 'lucide-react';

const trustItems = [
  {
    icon: Award,
    title: 'Bác sĩ chuyên khoa',
    description: 'Đội ngũ giàu kinh nghiệm'
  },
  {
    icon: Zap,
    title: 'Công nghệ tiên tiến',
    description: 'Trang thiết bị hiện đại'
  },
  {
    icon: Shield,
    title: 'An toàn tuyệt đối',
    description: 'Quy trình chuẩn quốc tế'
  },
  {
    icon: Calendar,
    title: 'Bảo hành dài hạn',
    description: 'Cam kết chất lượng'
  }
];

export function TrustBar() {
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-2"
            >
              <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center">
                <item.icon className="w-7 h-7 text-sky-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
