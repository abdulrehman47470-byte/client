import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Award, Users, Clock, CheckCircle2, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We operate with complete transparency and honesty in every project we undertake.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Our commitment to quality craftsmanship sets the industry standard.',
  },
  {
    icon: Users,
    title: 'Teamwork',
    description: 'Collaborative approach ensures every project benefits from collective expertise.',
  },
  {
    icon: Clock,
    title: 'Reliability',
    description: 'On-time delivery and consistent communication throughout your project.',
  },
];

const milestones = [
  { year: '2004', event: 'Rooftex founded in Portland, OR' },
  { year: '2008', event: 'Expanded to commercial roofing services' },
  { year: '2012', event: 'Opened second location in Phoenix, AZ' },
  { year: '2016', event: 'Achieved $10M in annual revenue' },
  { year: '2020', event: 'Launched 24/7 emergency response division' },
  { year: '2024', event: 'Completed 2,400th roofing project' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from(section.querySelectorAll('.animate-in'), {
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
            <img src="/images/project-roof.jpg" alt="About Rooftex" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#060606]/70 to-[#060606]" />
          </div>
          <div className="relative z-10 w-full px-6 lg:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
              <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">About Us</span>
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Our Story</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Two decades of excellence in roofing, serving residential and commercial clients across the nation.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section ref={sectionRef} className="w-full px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            <div className="animate-in">
              <img src="/images/service-install.jpg" alt="Our team" className="w-full h-[500px] object-cover" />
            </div>
            <div className="animate-in">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Building Trust, One Roof at a Time
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                Founded in 2004, Rooftex began as a small family operation with a simple mission: 
                deliver exceptional roofing services that stand the test of time. Today, we are one of 
                the most trusted names in the industry, having completed over 2,400 projects across the country.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Our team of 120+ certified professionals brings expertise in every aspect of roofing, 
                from traditional shingle installations to cutting-edge waterproofing systems. We believe 
                in using only premium materials and never cutting corners.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d91d1d]" />
                  <span className="text-white/80">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d91d1d]" />
                  <span className="text-white/80">50-Year Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d91d1d]" />
                  <span className="text-white/80">Free Inspections</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#d91d1d]" />
                  <span className="text-white/80">24/7 Emergency</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="w-full px-6 lg:px-12 py-20 bg-[#171717]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                The principles that guide every decision we make and every roof we install.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="bg-[#060606] p-8 border border-white/5 hover:border-[#d91d1d]/30 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-[#d91d1d] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="w-full px-6 lg:px-12 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Our Journey</h2>
              <p className="text-white/50 text-lg">Key milestones in our two-decade history.</p>
            </div>
            <div className="space-y-8">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="flex items-center gap-8 group">
                  <div className="font-display text-3xl md:text-4xl font-bold text-[#d91d1d] w-24 text-right shrink-0">
                    {milestone.year}
                  </div>
                  <div className="w-4 h-4 bg-[#d91d1d] rotate-45 shrink-0 group-hover:scale-125 transition-transform" />
                  <div className="flex-1 bg-[#171717] p-6 border border-white/5 group-hover:border-[#d91d1d]/30 transition-all">
                    <p className="text-white/80">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full px-6 lg:px-12 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Contact us today for a free consultation and estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/quote" className="inline-flex items-center justify-center gap-2 bg-[#d91d1d] hover:bg-[#b81818] text-white px-8 py-4 font-display text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105">
                GET FREE ESTIMATE
              </a>
              <a href="tel:+18005551234" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/5 px-8 py-4 font-display text-sm font-bold tracking-wide transition-all duration-300">
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
