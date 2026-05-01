import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const services = [
  { name: 'Roof Installation' },
  { name: 'Waterproofing' },
  { name: 'Flat Roof Systems' },
  { name: 'Commercial Roofing' },
  { name: 'Residential Roofing' },
  { name: 'Industrial Grade' },
];

export default function StatsTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for a split second to ensure fonts are loaded and widths are real
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady || !scrollRef.current) return;

    const element = scrollRef.current;
    const innerContent = element.innerHTML;
    
    // Triple the content to ensure there is never a "gap" in the loop
    element.innerHTML = innerContent + innerContent + innerContent;

    const totalWidth = element.scrollWidth / 3;

    const tl = gsap.to(element, {
      x: -totalWidth,
      duration: 15, // Speed set to 15
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, [isReady]);

  return (
    <section className="w-full py-5 bg-[#060606] border-y border-white/5 overflow-hidden">
      {/* This is the "Train" track. 
          The gap-32 ensures words STAY APART. 
      */}
      <div 
        ref={scrollRef} 
        className="flex items-center whitespace-nowrap will-change-transform gap-32 px-16"
      >
        {services.map((service, i) => (
          <div key={i} className="flex items-center gap-32 shrink-0">
            <span className="font-display text-sm font-bold text-white uppercase tracking-[0.3em]">
              {service.name}
            </span>
            {/* The Divider */}
            <div className="w-px h-4 bg-[#d91d1d] shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
}