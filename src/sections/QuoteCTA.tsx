import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Phone, Mail, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from(section.querySelector('.cta-content'), {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/project-commercial.jpg"
          alt="Roofing work"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#060606]/85" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="cta-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
              <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">
                Get In Touch
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Professional And Expert Roofing Solution
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Ready to start your roofing project? Our team is standing by to provide 
              you with a comprehensive assessment and competitive quote. No obligation, 
              no pressure - just expert advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 bg-[#d91d1d] hover:bg-[#b81818] text-white px-8 py-4 font-display text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105"
              >
                REQUEST A QUOTE
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+18005551234"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/5 px-8 py-4 font-display text-sm font-bold tracking-wide transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                CALL NOW
              </a>
            </div>
          </div>

          {/* Right - Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-[#171717] border border-white/5 p-8 group hover:border-[#d91d1d]/30 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-[#d91d1d] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">Call Us Anytime</h3>
                  <p className="text-white/50 text-sm mb-2">Emergency? We are available 24/7</p>
                  <a href="tel:+18005551234" className="text-[#d91d1d] font-display text-xl font-bold hover:text-white transition-colors">
                    1-800-555-1234
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#171717] border border-white/5 p-8 group hover:border-[#d91d1d]/30 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-[#d91d1d] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">Email Us</h3>
                  <p className="text-white/50 text-sm mb-2">We respond within 24 hours</p>
                  <a href="mailto:info@rooftex.com" className="text-[#d91d1d] font-display text-xl font-bold hover:text-white transition-colors">
                    info@rooftex.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#171717] border border-white/5 p-8 group hover:border-[#d91d1d]/30 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-[#d91d1d] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">Working Hours</h3>
                  <p className="text-white/50 text-sm mb-2">Monday - Saturday</p>
                  <p className="text-white font-display text-lg font-bold">
                    7:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
