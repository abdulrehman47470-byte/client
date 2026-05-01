import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Hammer, Droplets, Building2, Wrench, Home, AlertTriangle,
  ArrowRight, CheckCircle2, Phone
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Hammer,
    title: 'Roof Installation',
    description: 'Complete roof installation services for residential and commercial properties. We work with slate, shingles, metal, tile, and flat roof systems using only premium materials backed by manufacturer warranties.',
    image: '/images/service-install.jpg',
    features: ['Architectural shingles', 'Metal roofing systems', 'Slate & tile installation', 'Flat roof solutions'],
  },
  {
    icon: Droplets,
    title: 'Waterproofing',
    description: 'Advanced waterproofing solutions to protect your structure from moisture damage. Our torch-applied membranes, liquid coatings, and built-up systems ensure complete water protection.',
    image: '/images/service-waterproof.jpg',
    features: ['Torch-applied membranes', 'Liquid waterproofing', 'Built-up roofing', 'Foundation waterproofing'],
  },
  {
    icon: Building2,
    title: 'Flat Roof Systems',
    description: 'Specialized flat roof expertise including TPO, EPDM, and modified bitumen systems. Ideal for commercial buildings requiring durable, low-maintenance roofing solutions.',
    image: '/images/service-flat.jpg',
    features: ['TPO single-ply', 'EPDM rubber roofing', 'Modified bitumen', 'Green roof systems'],
  },
  {
    icon: Wrench,
    title: 'Roof Repair',
    description: 'Expert repair services for all roof types. From minor leak fixes to major storm damage restoration, our rapid response team handles everything with precision.',
    image: '/images/project-commercial.jpg',
    features: ['Leak detection', 'Storm damage repair', 'Structural repairs', 'Emergency patching'],
  },
  {
    icon: Home,
    title: 'Gutter Systems',
    description: 'Professional gutter installation, repair, and maintenance. Custom seamless gutters designed to protect your foundation and landscaping from water damage.',
    image: '/images/project-copper.jpg',
    features: ['Seamless gutters', 'Gutter guards', 'Downspout installation', 'Drainage solutions'],
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Services',
    description: '24/7 emergency roofing services for storm damage, fallen trees, and sudden leaks. Our rapid response team is ready to protect your property around the clock.',
    image: '/images/project-clay.jpg',
    features: ['24/7 availability', 'Temporary tarping', 'Debris removal', 'Insurance claims'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from(section.querySelectorAll('.service-card'), {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-[#060606] min-h-screen">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative w-full pt-32 pb-20">
          <div className="absolute inset-0">
            <img src="/images/service-install.jpg" alt="Services" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#060606]/70 to-[#060606]" />
          </div>
          <div className="relative z-10 w-full px-6 lg:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
              <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">Our Services</span>
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">What We Offer</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Comprehensive roofing solutions tailored to your property needs, delivered with precision and care.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section ref={sectionRef} className="w-full px-6 lg:px-12 py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="service-card bg-[#171717] border border-white/5 overflow-hidden group hover:border-[#d91d1d]/30 transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-[250px] md:h-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8">
                    <div className="w-12 h-12 bg-[#d91d1d] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-white/60 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#d91d1d]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/quote"
                      className="inline-flex items-center gap-2 text-[#d91d1d] font-display text-sm font-bold tracking-wide hover:gap-4 transition-all"
                    >
                      GET QUOTE
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="w-full px-6 lg:px-12 py-20 bg-[#d91d1d]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Not Sure What You Need?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Our experts will assess your property and recommend the best solution for your budget and needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#d91d1d] px-8 py-4 font-display text-sm font-bold tracking-wide hover:bg-white/90 transition-all"
              >
                FREE CONSULTATION
              </Link>
              <a
                href="tel:+18005551234"
                className="inline-flex items-center justify-center gap-2 border border-white/50 text-white hover:bg-white/10 px-8 py-4 font-display text-sm font-bold tracking-wide transition-all"
              >
                <Phone className="w-4 h-4" />
                1-800-555-1234
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
