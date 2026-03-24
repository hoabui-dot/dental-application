import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Câu hỏi thường gặp
          </h2>
          <p className="text-lg text-gray-600">
            Giải đáp những thắc mắc phổ biến của bệnh nhân
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Default FAQs for dental implants
export const defaultFAQs: FAQ[] = [
  {
    question: 'Cấy ghép Implant có đau không?',
    answer: 'Trong quá trình cấy ghép, bạn sẽ được gây tê tại chỗ nên không cảm thấy đau. Sau khi hết thuốc tê, có thể có chút khó chịu nhẹ trong 2-3 ngày, nhưng hoàn toàn kiểm soát được bằng thuốc giảm đau thông thường.'
  },
  {
    question: 'Implant có bền không? Tuổi thọ bao lâu?',
    answer: 'Với chăm sóc đúng cách, Implant có thể tồn tại 20-30 năm hoặc thậm chí suốt đời. Điều quan trọng là vệ sinh răng miệng tốt và đi kiểm tra nha khoa định kỳ 6 tháng/lần.'
  },
  {
    question: 'Ai có thể cấy ghép Implant?',
    answer: 'Hầu hết người trưởng thành mất răng đều có thể cấy ghép Implant. Tuy nhiên, cần đánh giá tình trạng xương hàm, sức khỏe tổng quát. Một số trường hợp cần ghép xương trước khi cấy Implant.'
  },
  {
    question: 'Chi phí cấy ghép Implant là bao nhiêu?',
    answer: 'Chi phí dao động từ 15-50 triệu đồng/răng tùy vào loại Implant (Hàn Quốc, Mỹ, Đức, Thụy Sĩ), tình trạng xương hàm, và nhu cầu ghép xương. Chúng tôi sẽ tư vấn chi tiết sau khi khám.'
  },
  {
    question: 'Quá trình cấy ghép Implant mất bao lâu?',
    answer: 'Toàn bộ quá trình thường mất 3-6 tháng, bao gồm: cấy trụ Implant (1-2 giờ), chờ liền xương (3-6 tháng), và gắn răng sứ (1-2 tuần). Một số trường hợp có thể gắn răng tạm ngay.'
  },
  {
    question: 'Sau khi cấy Implant có cần chế độ ăn uống đặc biệt?',
    answer: 'Trong 1-2 tuần đầu, nên ăn thức ăn mềm, tránh nhai ở vị trí mới cấy. Sau khi Implant liền xương hoàn toàn, bạn có thể ăn uống bình thường như răng thật.'
  }
];
