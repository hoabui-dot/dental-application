import { motion } from 'motion/react';
import { FileSearch, Wrench, Heart, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
  duration?: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Quy trình cấy ghép
          </h2>
          <p className="text-lg text-gray-600">
            Từng bước thực hiện chuyên nghiệp và an toàn
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-sky-200">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-sky-500 origin-left"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute lg:static top-6 left-6 lg:left-auto w-4 h-4 lg:w-8 lg:h-8 bg-sky-500 rounded-full lg:mx-auto lg:mb-8 z-10 border-4 border-white shadow-lg" />
                
                {/* Vertical Line - Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute top-10 left-[1.875rem] w-0.5 h-full bg-sky-200" />
                )}

                {/* Content Card */}
                <div className="ml-16 lg:ml-0 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
                    <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0 lg:mb-4">
                      <step.icon className="w-7 h-7 text-sky-600" />
                    </div>
                    
                    <div className="lg:text-center">
                      <div className="text-sm font-semibold text-sky-600 mb-2">
                        Bước {index + 1}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                      {step.duration && (
                        <div className="mt-3 inline-block px-3 py-1 bg-sky-50 text-sky-700 text-xs font-medium rounded-full">
                          {step.duration}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Default process steps for dental implants
export const defaultProcessSteps: ProcessStep[] = [
  {
    icon: FileSearch,
    title: 'Khám và chẩn đoán',
    description: 'Đánh giá xương hàm, chụp phim CT 3D để lập kế hoạch chi tiết',
    duration: '30-45 phút'
  },
  {
    icon: Wrench,
    title: 'Cấy trụ Implant',
    description: 'Phẫu thuật nhỏ, gây tê tại chỗ để đặt trụ Implant vào xương hàm',
    duration: '1-2 giờ'
  },
  {
    icon: Heart,
    title: 'Chờ liền xương',
    description: 'Trụ Implant hòa nhập với xương hàm, tạo nền tảng vững chắc',
    duration: '3-6 tháng'
  },
  {
    icon: Sparkles,
    title: 'Gắn răng sứ',
    description: 'Hoàn thiện răng mới với mão sứ cao cấp, thẩm mỹ tự nhiên',
    duration: '1-2 tuần'
  }
];
