import Hero from '@/components/landing/Hero';
import Challenge from '@/components/landing/Challenge';
import Solution from '@/components/landing/Solution';
import Benefits from '@/components/landing/Benefits';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import ScrollProgress from '@/components/landing/ScrollProgress';
import SectionSeparator from '@/components/landing/SectionSeparator';
import PopupModal from '@/components/landing/PopupModal';

export const metadata = {
  title: 'التدريب على الذكاء الاصطناعي للمعلمين | AI Teacher Training',
  description: 'برنامج تدريبي متكامل للمعلمين على استخدام الذكاء الاصطناعي في التعليم',
  keywords: 'الذكاء الاصطناعي, تدريب المعلمين, AI, تعليم, edutech',
  openGraph: {
    title: 'التدريب على الذكاء الاصطناعي للمعلمين',
    description: 'برنامج تدريبي متكامل للمعلمين على استخدام الذكاء الاصطناعي في التعليم',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <PopupModal />
      <Hero />
      <Challenge />
      <Solution />
      <Benefits />
      <SectionSeparator label="سجل الآن" />
      <ContactSection />
      <Footer />
    </div>
  );
}
