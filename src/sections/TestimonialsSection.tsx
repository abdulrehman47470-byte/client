import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Mark Wood',
    role: 'Property Developer',
    company: 'Buildwell Inc.',
    content: 'Rooftex delivered exceptional quality on our multi-unit residential project. Their attention to detail and use of premium materials set them apart. The team was professional, punctual, and the final result exceeded our expectations.',
    rating: 5,
    avatar: '/images/testimonial-1.jpg',
  },
  {
    name: 'Sarah Chen',
    role: 'Architect',
    company: 'Chen Design Studio',
    content: 'As an architect, I have high standards for construction partners. Rooftex consistently delivers precision installations that match my specifications perfectly. Their expertise in complex roof geometries is unmatched.',
    rating: 5,
    avatar: '/images/testimonial-2.jpg',
  },
  {
    name: 'Robert Mitchell',
    role: 'CEO',
    company: 'Mitchell Properties',
    content: 'We have used Rooftex for over a dozen commercial projects. Their waterproofing expertise saved us significant costs on maintenance. Truly a partner that understands the long-term value of quality workmanship.',
    rating: 5,
    avatar: '/images/testimonial-3.jpg',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} className="w-full py-24 lg:py-32 bg-[#f8f7f5]">
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-[#d91d1d]" />
            <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">
              Testimonials
            </span>
            <div className="w-12 h-[2px] bg-[#d91d1d]" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#0b0b0b] leading-tight">
            Trusted by World Leading Companies
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-8 left-0 lg:-left-8">
              <Quote className="w-16 h-16 text-[#d91d1d]/20" />
            </div>

            {/* Testimonial Content */}
            <div className="bg-white p-8 lg:p-12 shadow-xl">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    className="w-24 h-24 lg:w-32 lg:h-32 object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Stars */}
                  <div className="flex items-center justify-center lg:justify-start gap-1 mb-4">
                    {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#bf953f] text-[#bf953f]" />
                    ))}
                  </div>

                  <p className="text-[#0b0b0b]/70 text-lg lg:text-xl leading-relaxed mb-6">
                    "{testimonials[activeIndex].content}"
                  </p>

                  <div>
                    <div className="font-display text-xl font-bold text-[#0b0b0b]">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-[#0b0b0b]/50 text-sm">
                      {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 border border-[#0b0b0b]/20 flex items-center justify-center hover:bg-[#d91d1d] hover:border-[#d91d1d] hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 transition-all duration-300 ${
                    i === activeIndex
                      ? 'bg-[#d91d1d] w-8'
                      : 'bg-[#0b0b0b]/20 hover:bg-[#0b0b0b]/40'
                  }`}
                />
              ))}
              <button
                onClick={next}
                className="w-12 h-12 border border-[#0b0b0b]/20 flex items-center justify-center hover:bg-[#d91d1d] hover:border-[#d91d1d] hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
