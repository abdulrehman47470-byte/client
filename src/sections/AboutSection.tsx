import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Licensed & Insured Professionals',
  'Premium Quality Materials Only',
  '50-Year Warranty on Installations',
  'Free Comprehensive Inspections',
  'Transparent Fixed Pricing',
  'Emergency Response 24/7',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from(section.querySelector('.about-image'), {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
    });

    gsap.from(section.querySelector('.about-content'), {
      x: 80,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
    });

    gsap.from(section.querySelectorAll('.feature-item'), {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 lg:py-32 bg-[#060606]">
      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="about-image relative">
            <div className="relative overflow-hidden">
              <img
                src="/images/project-roof.jpg"
                alt="Modern roofing project"
                className="w-full h-[400px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#060606]/50 to-transparent" />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-[#d91d1d] p-8">
              <div className="font-display text-5xl font-bold text-white">20+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Years</div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
              <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">
                About Rooftex
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              We Are Committed to Provide Quality Roofing
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-8">
              For over two decades, Rooftex has been the trusted name in premium roofing solutions. 
              Our team of certified professionals brings unmatched expertise to every project, 
              from residential installations to large-scale commercial developments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="feature-item flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d91d1d] flex-shrink-0" />
                  <span className="text-white/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 bg-[#d91d1d] hover:bg-[#b81818] text-white px-8 py-4 font-display text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105"
            >
              ABOUT OUR COMPANY
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
