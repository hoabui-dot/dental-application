import { motion } from 'motion/react';
import { GraduationCap, Award, Users } from 'lucide-react';

interface DoctorSectionProps {
  doctorImage: string;
  doctorName?: string;
  credentials?: string[];
}

export function DoctorSection({ 
  doctorImage, 
  doctorName = "BS. Nguyễn Văn A",
  credentials = [
    "Bác sĩ Răng Hàm Mặt",
    "15+ năm kinh nghiệm",
    "Chứng chỉ Implant quốc tế",
    "5000+ ca điều trị thành công"
  ]
}: DoctorSectionProps) {
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
            Đội ngũ chuyên gia
          </h2>
          <p className="text-lg text-gray-600">
            Bác sĩ giàu kinh nghiệm, tận tâm với từng bệnh nhân
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-xl overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] lg:h-full"
            >
              <img 
                src={doctorImage} 
                alt="Doctor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 lg:p-12"
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                {doctorName}
              </h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Học vấn</h4>
                    <p className="text-gray-600">{credentials[0]}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Kinh nghiệm</h4>
                    <p className="text-gray-600">{credentials[1]}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Thành tích</h4>
                    <p className="text-gray-600">{credentials[3]}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-gray-600 italic leading-relaxed">
                  "Sứ mệnh của chúng tôi là mang lại nụ cười tự tin và sức khỏe răng miệng tốt nhất cho mọi bệnh nhân bằng công nghệ tiên tiến và sự tận tâm."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
