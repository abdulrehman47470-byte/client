import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trpc } from '@/providers/trpc';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '1-800-555-1234', href: 'tel:+18005551234' },
  { icon: Mail, label: 'Email', value: 'info@rooftex.com', href: 'mailto:info@rooftex.com' },
  { icon: MapPin, label: 'Address', value: '1234 Industrial Blvd, Portland, OR 97201', href: '#' },
  { icon: Clock, label: 'Hours', value: 'Mon-Sat: 7:00 AM - 6:00 PM', href: '#' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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
    if (!formData.name || !formData.email || !formData.message) return;
    contactMutation.mutate(formData);
  };

  return (
    <div className="bg-[#060606] min-h-screen">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative w-full pt-32 pb-20">
          <div className="absolute inset-0">
            <img src="/images/service-flat.jpg" alt="Contact" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#060606]/70 to-[#060606]" />
          </div>
          <div className="relative z-10 w-full px-6 lg:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
              <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">Contact Us</span>
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Get In Touch</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Have questions about our services? We are here to help. Reach out and our team will respond within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={sectionRef} className="w-full px-6 lg:px-12 py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-in">
              <h2 className="font-display text-3xl font-bold text-white mb-6">Contact Information</h2>
              <p className="text-white/60 mb-10">
                Ready to start your roofing project? Contact us through any of the channels below 
                or fill out the form and we will get back to you promptly.
              </p>

              <div className="space-y-6 mb-10">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-14 h-14 bg-[#d91d1d] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white/50 text-sm mb-1">{item.label}</div>
                      <div className="text-white font-display font-bold group-hover:text-[#d91d1d] transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="w-full h-[250px] bg-[#171717] border border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#d91d1d] mx-auto mb-2" />
                  <p className="text-white/50 text-sm">1234 Industrial Blvd</p>
                  <p className="text-white/50 text-sm">Portland, OR 97201</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-in">
              <div className="bg-[#171717] p-8 lg:p-10 border border-white/5">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/60">We will get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-[#d91d1d] font-display text-sm font-bold tracking-wide hover:underline"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-2xl font-bold text-white mb-6">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Your Name *</label>
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
                          <label className="text-white/60 text-sm mb-2 block">Phone Number</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#060606] border border-white/10 text-white px-4 py-3 focus:border-[#d91d1d] focus:outline-none transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Subject</label>
                          <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full bg-[#060606] border border-white/10 text-white px-4 py-3 focus:border-[#d91d1d] focus:outline-none transition-colors"
                            placeholder="Project Inquiry"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-2 block">Message *</label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-[#060606] border border-white/10 text-white px-4 py-3 focus:border-[#d91d1d] focus:outline-none transition-colors resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#d91d1d] hover:bg-[#b81818] text-white px-8 py-4 font-display text-sm font-bold tracking-wide transition-all duration-300 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        {contactMutation.isPending ? 'SENDING...' : 'SEND MESSAGE'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
