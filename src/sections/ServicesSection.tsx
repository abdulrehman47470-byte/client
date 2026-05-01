import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Hammer, Droplets, Building2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Roof Installation',
    description: 'Complete roof installation services for residential and commercial properties using premium materials.',
    image: '/images/service-install.jpg',
    icon: Hammer,
  },
  {
    title: 'Waterproofing',
    description: 'Advanced waterproofing solutions using torch-applied membranes and liquid coatings.',
    image: '/images/service-waterproof.jpg',
    icon: Droplets,
  },
  {
    title: 'Flat Roof Systems',
    description: 'Specialized flat roof installation including TPO, EPDM, and modified bitumen systems.',
    image: '/images/service-flat.jpg',
    icon: Building2,
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entrance animation
    gsap.from(section.querySelector('.section-header'), {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });

    // Card animations with stagger
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 lg:py-32 bg-white">
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="section-header flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
              <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">
                What We Do
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-[#0b0b0b] leading-tight">
              Our Services
            </h2>
          </div>
          <p className="text-[#0b0b0b]/60 text-lg max-w-md mt-4 lg:mt-0">
            Comprehensive roofing solutions tailored to your property needs, 
            delivered with precision and care.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative h-[500px] lg:h-[600px] overflow-hidden bg-[#1a1a1a] cursor-pointer"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY;
                const rotateY = (centerX - x) / centerX;
                const bg = e.currentTarget.querySelector('.card-bg') as HTMLElement;

                gsap.to(e.currentTarget, {
                  rotateX: -rotateX * 5,
                  rotateY: rotateY * 5,
                  duration: 0.5,
                  ease: 'power2.out',
                });
                if (bg) {
                  gsap.to(bg, {
                    x: rotateY * 15,
                    y: -rotateX * 15,
                    duration: 0.5,
                    ease: 'power2.out',
                  });
                }
              }}
              onMouseLeave={(e) => {
                const bg = e.currentTarget.querySelector('.card-bg') as HTMLElement;
                gsap.to(e.currentTarget, {
                  rotateX: 0,
                  rotateY: 0,
                  duration: 0.5,
                  ease: 'power2.out',
                });
                if (bg) {
                  gsap.to(bg, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
                }
              }}
              style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
            >
              {/* Background Image */}
              <div
                className="card-bg absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center transition-transform duration-500"
                style={{ backgroundImage: `url(${service.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                <div className="w-14 h-14 bg-[#d91d1d] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-[#d91d1d] font-display text-sm font-bold tracking-wide group-hover:gap-4 transition-all duration-300"
                >
                  LEARN MORE
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 bg-[#0b0b0b] hover:bg-[#d91d1d] text-white px-10 py-4 font-display text-sm font-bold tracking-wide transition-all duration-300"
          >
            VIEW ALL SERVICES
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
