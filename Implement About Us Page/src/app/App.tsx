import { Header } from './components/about/Header';
import { HeroSection } from './components/about/HeroSection';
import { AchievementsSection } from './components/about/AchievementsSection';
import { WhyChooseUsSection } from './components/about/WhyChooseUsSection';
import { PhilosophySection } from './components/about/PhilosophySection';
import { CoreValuesSection } from './components/about/CoreValuesSection';
import { CommitmentSection } from './components/about/CommitmentSection';
import { CTASection } from './components/about/CTASection';
import { Footer } from './components/about/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AchievementsSection />
        <WhyChooseUsSection />
        <PhilosophySection />
        <CoreValuesSection />
        <CommitmentSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
