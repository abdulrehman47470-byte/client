import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Calendar, User } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    title: 'How to Choose the Right Roofing Material for Your Climate',
    excerpt: 'Different climates demand different roofing solutions. Learn which materials perform best.',
    image: '/images/service-install.jpg',
    category: 'Guide',
    date: 'Dec 15, 2024',
    author: 'Mike Johnson',
  },
  {
    title: 'The Complete Guide to Flat Roof Maintenance',
    excerpt: 'Regular maintenance can extend your flat roof lifespan by 10-15 years.',
    image: '/images/service-flat.jpg',
    category: 'Maintenance',
    date: 'Dec 10, 2024',
    author: 'Sarah Chen',
  },
  {
    title: 'Understanding TPO vs EPDM Roofing Systems',
    excerpt: 'Two of the most popular commercial roofing systems compared side by side.',
    image: '/images/service-waterproof.jpg',
    category: 'Comparison',
    date: 'Dec 5, 2024',
    author: 'Robert Mitchell',
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

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
        <div className="section-header flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
              <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">
                From The Blog
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
              Check Latest Blog Post<br />From Blog List
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#d91d1d] font-display text-sm font-bold tracking-wide mt-6 lg:mt-0 hover:gap-4 transition-all duration-300"
          >
            VIEW ALL POSTS
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article
              key={post.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[250px] overflow-hidden mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/50 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#d91d1d] px-4 py-1.5">
                  <span className="text-white text-xs font-bold tracking-wider uppercase">
                    {post.category}
                  </span>
                </div>
                {/* Date Circle */}
                <div className="absolute bottom-4 right-4 w-14 h-14 bg-white flex flex-col items-center justify-center">
                  <span className="font-display text-lg font-bold text-[#0b0b0b] leading-none">
                    {post.date.split(' ')[1].replace(',', '')}
                  </span>
                  <span className="text-[#0b0b0b]/60 text-[10px] uppercase">
                    {post.date.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-4 mb-3 text-white/40 text-sm">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#d91d1d] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
