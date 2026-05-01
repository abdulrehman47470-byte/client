import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Residential Plan',
    price: '$55',
    period: '/sq ft',
    description: 'Perfect for homeowners seeking quality roof installation.',
    features: [
      'Free Initial Inspection',
      'Premium Shingle Options',
      '10-Year Workmanship Warranty',
      'Gutter Cleaning Included',
      'Annual Maintenance Check',
    ],
    highlighted: false,
  },
  {
    name: 'Commercial Plan',
    price: '$79',
    period: '/sq ft',
    description: 'Comprehensive solution for commercial properties.',
    features: [
      'Full Project Management',
      'TPO/EPDM Membrane Systems',
      '25-Year Material Warranty',
      'Priority Emergency Response',
      'Quarterly Inspections',
      'Energy Efficiency Report',
    ],
    highlighted: true,
  },
  {
    name: 'Premium Plan',
    price: '$129',
    period: '/sq ft',
    description: 'Luxury materials with white-glove service.',
    features: [
      'Custom Material Selection',
      '50-Year Transferable Warranty',
      'Dedicated Project Manager',
      '24/7 Emergency Hotline',
      'Bi-Annual Inspections',
      'Priority Scheduling',
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 lg:py-32 bg-[#060606]">
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-[#d91d1d]" />
            <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">
              Pricing Plans
            </span>
            <div className="w-12 h-[2px] bg-[#d91d1d]" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Our Rooftex Pricing Plans
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Choose the plan that fits your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`relative p-8 lg:p-10 transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? 'bg-[#d91d1d] text-white'
                  : 'bg-[#171717] text-white border border-white/5 hover:border-[#d91d1d]/30'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#d91d1d] px-6 py-1.5 text-xs font-bold tracking-wider uppercase">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-white/50'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span className="font-display text-5xl font-bold">{plan.price}</span>
                <span className={plan.highlighted ? 'text-white/70' : 'text-white/40'}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 flex items-center justify-center ${
                      plan.highlighted ? 'bg-white/20' : 'bg-[#d91d1d]/20'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlighted ? 'text-white' : 'text-[#d91d1d]'}`} />
                    </div>
                    <span className={`text-sm ${plan.highlighted ? 'text-white/90' : 'text-white/60'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/quote"
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display text-sm font-bold tracking-wide transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-white text-[#d91d1d] hover:bg-white/90'
                    : 'bg-[#d91d1d] text-white hover:bg-[#b81818]'
                }`}
              >
                GET STARTED
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
