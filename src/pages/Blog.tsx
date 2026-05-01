import { useState } from 'react';
import { Link } from 'react-router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

const posts = [
  {
    title: 'How to Choose the Right Roofing Material for Your Climate',
    slug: 'choose-right-roofing-material-climate',
    excerpt: 'Different climates demand different roofing solutions. Learn which materials perform best in hot, cold, wet, and coastal environments. From asphalt shingles to metal roofing, we break down the pros and cons.',
    image: '/images/service-install.jpg',
    category: 'Guide',
    date: 'Dec 15, 2024',
    author: 'Mike Johnson',
    featured: true,
  },
  {
    title: 'The Complete Guide to Flat Roof Maintenance',
    slug: 'complete-guide-flat-roof-maintenance',
    excerpt: 'Regular maintenance can extend your flat roof lifespan by 10-15 years. Here is what you need to know about inspections, cleaning, and preventative care.',
    image: '/images/service-flat.jpg',
    category: 'Maintenance',
    date: 'Dec 10, 2024',
    author: 'Sarah Chen',
    featured: false,
  },
  {
    title: 'Understanding TPO vs EPDM Roofing Systems',
    slug: 'tpo-vs-epdm-roofing-systems',
    excerpt: 'Two of the most popular commercial roofing systems compared. Which is right for your building? We analyze cost, durability, and installation requirements.',
    image: '/images/service-waterproof.jpg',
    category: 'Comparison',
    date: 'Dec 5, 2024',
    author: 'Robert Mitchell',
    featured: false,
  },
  {
    title: '5 Signs Your Roof Needs Immediate Attention',
    slug: 'signs-roof-needs-attention',
    excerpt: 'Do not wait for a leak. Learn the warning signs that indicate your roof needs professional repair or replacement before major damage occurs.',
    image: '/images/project-clay.jpg',
    category: 'Tips',
    date: 'Nov 28, 2024',
    author: 'Mike Johnson',
    featured: false,
  },
  {
    title: 'Metal Roofing: The Long-Term Investment',
    slug: 'metal-roofing-long-term-investment',
    excerpt: 'Why more homeowners are choosing metal roofing. Explore the benefits of durability, energy efficiency, and modern aesthetics.',
    image: '/images/project-commercial.jpg',
    category: 'Guide',
    date: 'Nov 20, 2024',
    author: 'Sarah Chen',
    featured: false,
  },
  {
    title: 'Commercial Roofing: Planning Your 2025 Budget',
    slug: 'commercial-roofing-budget-2025',
    excerpt: 'A comprehensive guide to budgeting for commercial roof maintenance, repairs, and replacement in the coming year.',
    image: '/images/project-copper.jpg',
    category: 'Commercial',
    date: 'Nov 15, 2024',
    author: 'Robert Mitchell',
    featured: false,
  },
];

const categories = ['All', 'Guide', 'Maintenance', 'Comparison', 'Tips', 'Commercial'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = posts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = posts.find((p) => p.featured);

  return (
    <div className="bg-[#060606] min-h-screen">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative w-full pt-32 pb-20">
          <div className="absolute inset-0">
            <img src="/images/service-waterproof.jpg" alt="Blog" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#060606]/70 to-[#060606]" />
          </div>
          <div className="relative z-10 w-full px-6 lg:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
              <span className="text-[#d91d1d] font-display text-sm font-bold tracking-[0.3em] uppercase">Our Blog</span>
              <div className="w-12 h-[2px] bg-[#d91d1d]" />
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Latest Insights</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Expert advice, industry news, and tips from our roofing professionals.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {featured && (
          <section className="w-full px-6 lg:px-12 pb-12">
            <div className="max-w-7xl mx-auto">
              <Link to={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#171717] border border-white/5 overflow-hidden hover:border-[#d91d1d]/30 transition-all">
                <div className="h-[300px] lg:h-[400px] overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="bg-[#d91d1d] inline-block px-4 py-1.5 mb-4 w-fit">
                    <span className="text-white text-xs font-bold tracking-wider uppercase">Featured</span>
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-[#d91d1d] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-white/50 leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-white/40 text-sm">
                    <span className="flex items-center gap-2"><User className="w-4 h-4" />{featured.author}</span>
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{featured.date}</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Filter + Search */}
        <section className="w-full px-6 lg:px-12 py-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 font-display text-sm font-bold tracking-wide transition-all ${
                    activeCategory === cat
                      ? 'bg-[#d91d1d] text-white'
                      : 'bg-[#171717] text-white/60 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#171717] border border-white/10 text-white pl-12 pr-4 py-3 focus:border-[#d91d1d] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="w-full px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <article key={post.slug} className="group cursor-pointer">
                <div className="relative h-[220px] overflow-hidden mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/50 to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#d91d1d] px-3 py-1">
                    <span className="text-white text-xs font-bold uppercase">{post.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-3 text-white/40 text-xs">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#d91d1d] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-[#d91d1d] font-display text-xs font-bold tracking-wide group-hover:gap-3 transition-all">
                  READ MORE <ArrowRight className="w-3 h-3" />
                </span>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
