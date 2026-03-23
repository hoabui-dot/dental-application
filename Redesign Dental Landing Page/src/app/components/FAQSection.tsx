import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { HelpCircle, CreditCard, Clock, Shield, Phone } from 'lucide-react';

const faqs = [
  {
    icon: HelpCircle,
    question: 'What should I expect during my first visit?',
    answer:
      'Your first visit includes a comprehensive examination, digital X-rays, oral cancer screening, and a personalized treatment plan discussion. We\'ll take time to understand your dental history and goals. The appointment typically lasts 60-90 minutes.',
  },
  {
    icon: CreditCard,
    question: 'Do you accept insurance?',
    answer:
      'Yes! We accept most major dental insurance plans. Our billing team will verify your coverage and maximize your benefits. We also offer flexible payment plans and financing options for treatments not fully covered by insurance.',
  },
  {
    icon: Clock,
    question: 'What are your office hours?',
    answer:
      'We\'re open Monday-Friday: 8:00 AM - 6:00 PM, and Saturday: 9:00 AM - 3:00 PM. We also offer emergency dental services 24/7 for urgent cases. Early morning and evening appointments are available for your convenience.',
  },
  {
    icon: Shield,
    question: 'Is teeth whitening safe?',
    answer:
      'Yes, professional teeth whitening is completely safe when performed by our trained specialists. We use clinically proven methods that protect your enamel while achieving dramatic results. Treatment is customized to your sensitivity level.',
  },
  {
    icon: Phone,
    question: 'Do you handle dental emergencies?',
    answer:
      'Absolutely! We provide 24/7 emergency dental care. Call our emergency line anytime for toothaches, broken teeth, or any urgent dental issues. We\'ll get you in as quickly as possible, often same-day.',
  },
  {
    icon: HelpCircle,
    question: 'How often should I visit the dentist?',
    answer:
      'We recommend visiting every 6 months for routine cleanings and checkups. However, your specific needs may vary based on your oral health. Some patients benefit from more frequent visits, which we\'ll discuss during your consultation.',
  },
];

export function FAQSection() {
  return (
    <section className="py-20 bg-white" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our services
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gradient-to-br from-white to-sky-50 border-2 border-sky-100 rounded-2xl px-6 overflow-hidden"
            >
              <AccordionTrigger className="hover:no-underline py-6 text-left">
                <div className="flex items-start gap-4 pr-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <faq.icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <span className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-14 pr-4 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center bg-sky-50 rounded-2xl p-8">
          <p className="text-gray-700 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="#contact"
            className="text-sky-600 font-semibold hover:text-sky-700 transition-colors"
          >
            Contact Our Team →
          </a>
        </div>
      </div>
    </section>
  );
}
