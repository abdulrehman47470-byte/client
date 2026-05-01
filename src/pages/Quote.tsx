import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Send, CheckCircle2, Phone, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trpc } from '@/providers/trpc';

gsap.registerPlugin(ScrollTrigger);

const serviceTypes = [
  'Roof Installation',
  'Roof Repair',
  'Waterproofing',
  'Flat Roof System',
  'Gutter Installation',
  'Emergency Service',
  'Inspection Only',
];

const roofSizes = [
  'Under 1,000 sq ft',
  '1,000 - 2,500 sq ft',
  '2,500 - 5,000 sq ft',
  '5,000 - 10,000 sq ft',
  'Over 10,000 sq ft',
  'Not Sure',
];

export default function Quote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    roofSize: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const quoteMutation = trpc.quote.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({
        name: '', email: '', phone: '', address: '',
        serviceType: '', roofSize: '', message: '',
      });
    },
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    quoteMutation.mutate({
      ...formData,
      serviceType: formData.serviceType || undefined,
      roofSize: formData.roofSize || undefined,
      address: formData.address || undefined,
      message: formData.message || undefined,
    });
  };

  return (
    <div className="bg-[#060606] min-h-screen">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative w-full pt-32 pb-20">
          <div className="absolute inset-0">
            <img src="/images/project-roof.jpg" alt="Quote" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#060606]/70 to-[#060606]" />
          </div>
          <div className="relative z-10 w-full px-6 lg:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
              <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">Free Estimate</span>
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Request A Quote</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Fill out the form below and our team will provide you with a detailed, no-obligation estimate within 24 hours.
            </p>
          </div>
        </section>

        {/* Quote Form */}
        <section ref={sectionRef} className="w-full px-6 lg:px-12 py-20">
          <div className="max-w-6xl mx-auto">
            {submitted ? (
              <div className="bg-[#171717] p-12 text-center border border-white/5 animate-in">
                <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h2 className="font-display text-4xl font-bold text-white mb-4">Quote Request Received!</h2>
                <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
                  Thank you for reaching out. Our team will review your request and contact you 
                  within 24 hours with a detailed estimate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center gap-2 bg-[#d91d1d] hover:bg-[#b81818] text-white px-8 py-4 font-display text-sm font-bold tracking-wide transition-all"
                  >
                    REQUEST ANOTHER QUOTE
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/5 px-8 py-4 font-display text-sm font-bold tracking-wide transition-all"
                  >
                    BACK TO HOME
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Form */}
                <div className="lg:col-span-2 animate-in">
                  <div className="bg-[#171717] p-8 lg:p-10 border border-white/5">
                    <h2 className="font-display text-2xl font-bold text-white mb-2">Project Details</h2>
                    <p className="text-white/50 text-sm mb-8">Fields marked with * are required</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#060606] border border-white/10 text-white px-4 py-3 focus:border-[#d91d1d] focus:outline-none transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#060606] border border-white/10 text-white px-4 py-3 focus:border-[#d91d1d] focus:outline-none transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#060606] border border-white/10 text-white px-4 py-3 focus:border-[#d91d1d] focus:outline-none transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Property Address</label>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full bg-[#060606] border border-white/10 text-white px-4 py-3 focus:border-[#d91d1d] focus:outline-none transition-colors"
                            placeholder="123 Main St, City, State"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Service Type</label>
                          <select
                            value={formData.serviceType}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                            className="w-full bg-[#060606] border border-white/10 text-white px-4 py-3 focus:border-[#d91d1d] focus:outline-none transition-colors appearance-none"
                          >
                            <option value="">Select a service</option>
                            {serviceTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Roof Size</label>
                          <select
                            value={formData.roofSize}
                            onChange={(e) => setFormData({ ...formData, roofSize: e.target.value })}
                            className="w-full bg-[#060606] border border-white/10 text-white px-4 py-3 focus:border-[#d91d1d] focus:outline-none transition-colors appearance-none"
                          >
                            <option value="">Select roof size</option>
                            {roofSizes.map((size) => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-white/60 text-sm mb-2 block">Additional Details</label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-[#060606] border border-white/10 text-white px-4 py-3 focus:border-[#d91d1d] focus:outline-none transition-colors resize-none"
                          placeholder="Tell us more about your project, preferred timeline, or any specific requirements..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={quoteMutation.isPending}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#d91d1d] hover:bg-[#b81818] text-white px-8 py-4 font-display text-sm font-bold tracking-wide transition-all duration-300 disabled:opacity-50 hover:scale-[1.02]"
                      >
                        <Send className="w-4 h-4" />
                        {quoteMutation.isPending ? 'SUBMITTING...' : 'REQUEST FREE ESTIMATE'}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="animate-in space-y-6">
                  <div className="bg-[#d91d1d] p-8">
                    <Shield className="w-10 h-10 text-white mb-4" />
                    <h3 className="font-display text-xl font-bold text-white mb-3">Why Choose Rooftex?</h3>
                    <ul className="space-y-3">
                      {[
                        'Free, no-obligation estimates',
                        'Licensed & insured professionals',
                        'Premium materials & warranties',
                        'Transparent, upfront pricing',
                        '24/7 emergency services',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-white/90 text-sm">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#171717] p-8 border border-white/5">
                    <Phone className="w-8 h-8 text-[#d91d1d] mb-4" />
                    <h3 className="font-display text-lg font-bold text-white mb-2">Need Immediate Help?</h3>
                    <p className="text-white/50 text-sm mb-4">
                      For emergencies or urgent inquiries, call us directly.
                    </p>
                    <a
                      href="tel:+18005551234"
                      className="font-display text-2xl font-bold text-[#d91d1d] hover:text-white transition-colors"
                    >
                      1-800-555-1234
                    </a>
                  </div>

                  <div className="bg-[#171717] p-8 border border-white/5">
                    <h3 className="font-display text-lg font-bold text-white mb-4">What Happens Next?</h3>
                    <div className="space-y-4">
                      {[
                        { step: '1', text: 'We review your request within 2 hours' },
                        { step: '2', text: 'Schedule a free on-site inspection' },
                        { step: '3', text: 'Receive detailed estimate within 24 hours' },
                        { step: '4', text: 'Project begins upon your approval' },
                      ].map((item) => (
                        <div key={item.step} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-[#d91d1d] flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">{item.step}</span>
                          </div>
                          <p className="text-white/60 text-sm">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
