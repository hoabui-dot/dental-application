import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export interface PricingOption {
  name: string;
  origin: string;
  price: string;
  warranty: string;
  features: string[];
  popular?: boolean;
}

interface PricingSectionProps {
  options: PricingOption[];
}

export function PricingSection({ options }: PricingSectionProps) {
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
            Chi phí
          </h2>
          <p className="text-lg text-gray-600">
            Các gói dịch vụ phù hợp với nhu cầu của bạn
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow ${
                option.popular ? 'ring-2 ring-sky-500' : ''
              }`}
            >
              {option.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Phổ biến nhất
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {option.name}
                </h3>
                <div className="text-sm text-gray-600 mb-4">
                  Xuất xứ: {option.origin}
                </div>
                <div className="text-3xl font-bold text-sky-600">
                  {option.price}
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Bảo hành: {option.warranty}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {option.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-2xl font-semibold transition-colors ${
                  option.popular
                    ? 'bg-sky-500 text-white hover:bg-sky-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Chọn gói này
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Default pricing options for dental implants
export const defaultPricingOptions: PricingOption[] = [
  {
    name: 'Implant Hàn Quốc',
    origin: 'Hàn Quốc',
    price: '15-20 triệu',
    warranty: '10 năm',
    features: [
      'Chất lượng tốt, giá cả hợp lý',
      'Phù hợp đa số khách hàng',
      'Tỷ lệ thành công cao',
      'Kiểm định FDA, CE'
    ]
  },
  {
    name: 'Implant Mỹ/Đức',
    origin: 'Mỹ / Đức',
    price: '25-35 triệu',
    warranty: 'Trọn đời',
    features: [
      'Cao cấp, uy tín hàng đầu thế giới',
      'Bề mặt công nghệ tiên tiến',
      'Liền xương nhanh hơn',
      'Nghiên cứu lâm sàng 30+ năm'
    ],
    popular: true
  },
  {
    name: 'Implant Cao cấp',
    origin: 'Thụy Sĩ',
    price: '35-50 triệu',
    warranty: 'Trọn đời',
    features: [
      'Thương hiệu số 1 thế giới',
      'Công nghệ SLA cao cấp',
      'Thẩm mỹ hoàn hảo',
      'Tỷ lệ thành công 99%'
    ]
  }
];
