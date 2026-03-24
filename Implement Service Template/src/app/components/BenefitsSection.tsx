import { motion } from 'motion/react';
import { Smile, Clock, Star, Heart, CheckCircle, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ưu điểm vượt trội
          </h2>
          <p className="text-lg text-gray-600">
            Những lợi ích tuyệt vời mà dịch vụ mang lại cho bạn
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
                <benefit.icon className="w-7 h-7 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Default benefits for dental implants
export const defaultBenefits: Benefit[] = [
  {
    icon: Smile,
    title: 'Bền vững',
    description: 'Tuổi thọ 20-30 năm hoặc trọn đời với chăm sóc đúng cách'
  },
  {
    icon: Star,
    title: 'Thẩm mỹ tự nhiên',
    description: 'Màu sắc giống răng thật, hình dáng tự nhiên'
  },
  {
    icon: Heart,
    title: 'Chức năng hoàn hảo',
    description: 'Ăn nhai tốt như răng thật, không lung lay'
  },
  {
    icon: CheckCircle,
    title: 'Không ảnh hưởng răng bên cạnh',
    description: 'Không cần mài răng khác như làm cầu'
  },
  {
    icon: Clock,
    title: 'Không cần tháo lắp',
    description: 'Chăm sóc như răng thật, vệ sinh đơn giản'
  },
  {
    icon: Sparkles,
    title: 'Bảo vệ xương hàm',
    description: 'Ngăn chặn tình trạng tiêu xương hàm'
  }
];
