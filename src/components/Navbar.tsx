import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#060606]/90 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link to="/" className="flex items-center group">
              <img 
                src="/images/logo.png" 
                alt="Forbes Roofing LTD" 
                className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                    location.pathname === link.href
                      ? 'text-[#d91d1d]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                to="/quote"
                className="hidden md:flex items-center gap-2 bg-[#d91d1d] hover:bg-[#b81818] text-white px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                GET ESTIMATE
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white p-2"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#060606]/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-display text-3xl font-bold text-white hover:text-[#d91d1d] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/quote"
            className="mt-4 bg-[#d91d1d] text-white px-8 py-4 font-display text-lg font-bold tracking-wide hover:bg-[#b81818] transition-colors"
          >
            GET FREE ESTIMATE
          </Link>
        </div>
      </div>
    </>
  );
}