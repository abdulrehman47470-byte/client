import { Link } from 'react-router';
import { Shield, Phone, Mail, MapPin, ArrowRight, Clock } from 'lucide-react';

const footerLinks = {
  services: [
    'Roof Installation',
    'Roof Repair',
    'Waterproofing',
    'Flat Roof Systems',
    'Gutter Systems',
    'Emergency Services',
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-white/5">
      {/* CTA Banner */}
      <div className="w-full px-6 lg:px-12 py-20 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Protect Your Property?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Get a free, no-obligation estimate from our expert team. We respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-2 bg-[#d91d1d] hover:bg-[#b81818] text-white px-8 py-4 font-display text-lg font-bold tracking-wide transition-all duration-300 hover:scale-105"
            >
              GET FREE ESTIMATE
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+18005551234"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/5 px-8 py-4 font-display text-lg font-bold tracking-wide transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              1-800-555-1234
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="w-full px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-[#d91d1d]" />
              <span className="font-display text-2xl font-bold text-white">ROOFTEX</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Premium roofing solutions for residential and commercial properties. 
              Over 20 years of excellence in the industry.
            </p>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Clock className="w-4 h-4 text-[#d91d1d]" />
              Mon - Sat: 7:00 AM - 6:00 PM
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-white/50 text-sm hover:text-[#d91d1d] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/50 text-sm hover:text-[#d91d1d] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d91d1d] mt-0.5 flex-shrink-0" />
                <p className="text-white/50 text-sm">
                  1234 Industrial Blvd, Suite 500<br />
                  Portland, OR 97201
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#d91d1d] flex-shrink-0" />
                <a href="tel:+18005551234" className="text-white/50 text-sm hover:text-[#d91d1d] transition-colors">
                  1-800-555-1234
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#d91d1d] flex-shrink-0" />
                <a href="mailto:info@rooftex.com" className="text-white/50 text-sm hover:text-[#d91d1d] transition-colors">
                  info@rooftex.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 lg:px-12 py-6 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Rooftex. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
