import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Modern Gable Residence',
    image: '/images/project-roof.jpg',
    category: 'Residential',
    location: 'Portland, OR',
    year: '2024',
  },
  {
    title: 'Clay Tile Heritage Home',
    image: '/images/project-clay.jpg',
    category: 'Residential',
    location: 'San Diego, CA',
    year: '2024',
  },
  {
    title: 'Commercial Metal Complex',
    image: '/images/project-commercial.jpg',
    category: 'Commercial',
    location: 'Phoenix, AZ',
    year: '2023',
  },
  {
    title: 'Copper Accent Estate',
    image: '/images/project-copper.jpg',
    category: 'Luxury',
    location: 'Aspen, CO',
    year: '2023',
  },
];

export default function ProjectsSection() {
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
    <section ref={sectionRef} className="w-full py-24 lg:py-32 bg-[#f8f7f5]">
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="section-header flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
              <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">
                Our Portfolio
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-[#0b0b0b] leading-tight">
              Explore Our Recently<br />Completed Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#d91d1d] font-display text-sm font-bold tracking-wide mt-6 lg:mt-0 hover:gap-4 transition-all duration-300"
          >
            VIEW ALL PROJECTS
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="relative h-[350px] lg:h-[450px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/90 via-[#0b0b0b]/20 to-transparent" />
              </div>

              {/* Category Badge */}
              <div className="absolute top-6 left-6 bg-[#d91d1d] px-4 py-1.5">
                <span className="text-white text-xs font-bold tracking-wider uppercase">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-[#d91d1d] transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-6 text-white/60 text-sm">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/0 group-hover:bg-[#d91d1d] flex items-center justify-center transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
