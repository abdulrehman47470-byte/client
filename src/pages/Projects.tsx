import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Calendar, ArrowRight, X } from 'lucide-react';
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
    description: 'Complete roof installation featuring architectural shingles with a 50-year warranty. Custom ridge vents and seamless gutter integration.',
    size: '4,200 sq ft',
    duration: '3 weeks',
  },
  {
    title: 'Clay Tile Heritage Home',
    image: '/images/project-clay.jpg',
    category: 'Residential',
    location: 'San Diego, CA',
    year: '2024',
    description: 'Restoration of a historic property with premium terracotta clay tiles. Careful removal, restoration, and reinstallation of original materials.',
    size: '3,800 sq ft',
    duration: '6 weeks',
  },
  {
    title: 'Commercial Metal Complex',
    image: '/images/project-commercial.jpg',
    category: 'Commercial',
    location: 'Phoenix, AZ',
    year: '2023',
    description: 'Standing seam metal roof installation for a 45,000 sq ft commercial facility. Energy-efficient cool roof coating applied.',
    size: '45,000 sq ft',
    duration: '8 weeks',
  },
  {
    title: 'Copper Accent Estate',
    image: '/images/project-copper.jpg',
    category: 'Luxury',
    location: 'Aspen, CO',
    year: '2023',
    description: 'Luxury copper roofing installation with custom standing seam panels. Natural patina development monitored over 18-month period.',
    size: '8,500 sq ft',
    duration: '10 weeks',
  },
];

const categories = ['All', 'Residential', 'Commercial', 'Luxury'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from(section.querySelectorAll('.project-card'), {
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
  }, [activeCategory]);

  return (
    <div className="bg-[#060606] min-h-screen">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative w-full pt-32 pb-20">
          <div className="absolute inset-0">
            <img src="/images/project-clay.jpg" alt="Projects" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#060606]/70 to-[#060606]" />
          </div>
          <div className="relative z-10 w-full px-6 lg:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
              <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">Portfolio</span>
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Our Projects</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Explore our portfolio of completed roofing projects across residential, commercial, and luxury sectors.
            </p>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="w-full px-6 lg:px-12 py-20">
          <div className="max-w-7xl mx-auto">
            {/* Category Filter */}
            <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 font-display text-sm font-bold tracking-wide transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#d91d1d] text-white'
                      : 'bg-[#171717] text-white/60 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((project) => (
                <div
                  key={project.title}
                  className="project-card group relative overflow-hidden cursor-pointer bg-[#171717]"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-[400px] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/20 to-transparent" />
                  </div>

                  <div className="absolute top-6 left-6 bg-[#d91d1d] px-4 py-1.5">
                    <span className="text-white text-xs font-bold tracking-wider uppercase">{project.category}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#d91d1d] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/50 text-sm">
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />{project.location}</span>
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{project.year}</span>
                    </div>
                  </div>

                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/0 group-hover:bg-[#d91d1d] flex items-center justify-center transition-all">
                    <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setSelectedProject(null)}>
          <div className="bg-[#171717] max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[300px]">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#060606] flex items-center justify-center hover:bg-[#d91d1d] transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-8">
              <div className="bg-[#d91d1d] inline-block px-4 py-1.5 mb-4">
                <span className="text-white text-xs font-bold tracking-wider uppercase">{selectedProject.category}</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
              <p className="text-white/60 leading-relaxed mb-6">{selectedProject.description}</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#060606] p-4 text-center">
                  <div className="text-white/50 text-xs uppercase mb-1">Location</div>
                  <div className="text-white font-display font-bold">{selectedProject.location}</div>
                </div>
                <div className="bg-[#060606] p-4 text-center">
                  <div className="text-white/50 text-xs uppercase mb-1">Size</div>
                  <div className="text-white font-display font-bold">{selectedProject.size}</div>
                </div>
                <div className="bg-[#060606] p-4 text-center">
                  <div className="text-white/50 text-xs uppercase mb-1">Duration</div>
                  <div className="text-white font-display font-bold">{selectedProject.duration}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
