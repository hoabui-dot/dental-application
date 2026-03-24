import { Navigation } from './components/Navigation';
import { Breadcrumb } from './components/Breadcrumb';
import { ServiceHero } from './components/ServiceHero';
import { TrustBar } from './components/TrustBar';
import { IntroSection } from './components/IntroSection';
import { BenefitsSection, defaultBenefits } from './components/BenefitsSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { ProcessTimeline, defaultProcessSteps } from './components/ProcessTimeline';
import { PricingSection, defaultPricingOptions } from './components/PricingSection';
import { DoctorSection } from './components/DoctorSection';
import { FAQSection, defaultFAQs } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

// Import the hero image from figma
import heroImage from 'figma:asset/ea2cc8d739450aaad1cf6fdc15d7176842b9f0cd.png';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <Breadcrumb 
        items={[
          { label: 'Trang chủ', href: '#' },
          { label: 'Dịch vụ', href: '#' },
          { label: 'Cấy ghép Implant' }
        ]}
      />

      <ServiceHero 
        serviceName="Cấy ghép Implant"
        description="Giải pháp phục hồi răng mất vĩnh viễn với công nghệ cấy ghép Implant hiện đại"
        duration="5 phút đọc"
        recoveryTime="3-6 tháng"
        priceRange="15-50 triệu"
        heroImage={heroImage}
      />

      <TrustBar />

      <IntroSection 
        title="Implant là gì?"
        content="Implant là trụ titan được cấy vào xương hàm để thay thế rễ răng đã mất, sau đó gắn răng sứ lên trên để tạo thành răng hoàn chỉnh. Đây là giải pháp phục hồi răng mất vĩnh viễn, an toàn và hiệu quả nhất hiện nay, giúp bạn có lại nụ cười tự tin và chức năng ăn nhai hoàn hảo."
        image="https://images.unsplash.com/photo-1771442873035-474765b40ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBpbXBsYW50JTIwcHJvY2VkdXJlfGVufDF8fHx8MTc3NDMyNTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <BenefitsSection benefits={defaultBenefits} />

      <BeforeAfterSection 
        beforeImage="https://images.unsplash.com/photo-1655807946138-811bb2340d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWZvcmUlMjBhZnRlciUyMGRlbnRhbCUyMHNtaWxlfGVufDF8fHx8MTc3NDMyNTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        afterImage="https://images.unsplash.com/photo-1655807946138-811bb2340d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWZvcmUlMjBhZnRlciUyMGRlbnRhbCUyMHNtaWxlfGVufDF8fHx8MTc3NDMyNTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <ProcessTimeline steps={defaultProcessSteps} />

      <PricingSection options={defaultPricingOptions} />

      <DoctorSection 
        doctorImage="https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGRlbnRpc3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc0MjMzMTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        doctorName="BS. Nguyễn Minh Tâm"
        credentials={[
          "Bác sĩ Răng Hàm Mặt",
          "15+ năm kinh nghiệm",
          "Chứng chỉ Implant quốc tế (ITI, ICOI)",
          "5000+ ca cấy ghép thành công"
        ]}
      />

      <FAQSection faqs={defaultFAQs} />

      <CTASection />

      <Footer />
    </div>
  );
}
