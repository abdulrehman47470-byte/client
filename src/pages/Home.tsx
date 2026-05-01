import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import StatsTicker from '@/sections/StatsTicker';
import ServicesSection from '@/sections/ServicesSection';
import AboutSection from '@/sections/AboutSection';
import ProjectsSection from '@/sections/ProjectsSection';
import PricingSection from '@/sections/PricingSection';
import QuoteCTA from '@/sections/QuoteCTA';
import TestimonialsSection from '@/sections/TestimonialsSection';
import BlogSection from '@/sections/BlogSection';

export default function Home() {
  return (
    <div className="bg-[#060606]">
      <Navbar />
      <main>
        <HeroSection />
        <StatsTicker />
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <PricingSection />
        <QuoteCTA />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
