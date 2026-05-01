import { getDb } from "../api/queries/connection";
import { services, testimonials, projects, blogPosts } from "./schema";

async function seed() {
  const db = getDb();

  // Seed services
  await db.insert(services).values([
    {
      title: "Roof Installation",
      description: "Complete roof installation services for residential and commercial properties using premium materials including slate, shingles, and metal roofing systems.",
      image: "/images/service-install.jpg",
      icon: "Hammer",
      order: 1,
    },
    {
      title: "Waterproofing",
      description: "Advanced waterproofing solutions using torch-applied membranes, liquid coatings, and built-up systems to protect your structure from moisture damage.",
      image: "/images/service-waterproof.jpg",
      icon: "Droplets",
      order: 2,
    },
    {
      title: "Flat Roof Systems",
      description: "Specialized flat roof installation and maintenance including TPO, EPDM, and modified bitumen systems for commercial buildings.",
      image: "/images/service-flat.jpg",
      icon: "Building2",
      order: 3,
    },
    {
      title: "Roof Repair",
      description: "Expert repair services for all roof types. From minor leak fixes to major storm damage restoration, we handle it all with precision.",
      image: "/images/project-commercial.jpg",
      icon: "Wrench",
      order: 4,
    },
    {
      title: "Gutter Systems",
      description: "Professional gutter installation, repair, and maintenance. Custom seamless gutters designed to protect your foundation and landscaping.",
      image: "/images/project-copper.jpg",
      icon: "Home",
      order: 5,
    },
    {
      title: "Emergency Services",
      description: "24/7 emergency roofing services for storm damage, fallen trees, and sudden leaks. Rapid response team ready to protect your property.",
      image: "/images/project-clay.jpg",
      icon: "AlertTriangle",
      order: 6,
    },
  ]);

  // Seed testimonials
  await db.insert(testimonials).values([
    {
      name: "Mark Wood",
      role: "Property Developer",
      company: "Buildwell Inc.",
      content: "Rooftex delivered exceptional quality on our multi-unit residential project. Their attention to detail and use of premium materials set them apart. The team was professional, punctual, and the final result exceeded our expectations.",
      rating: 5,
      avatar: "/images/testimonial-1.jpg",
    },
    {
      name: "Sarah Chen",
      role: "Architect",
      company: "Chen Design Studio",
      content: "As an architect, I have high standards for construction partners. Rooftex consistently delivers precision installations that match my specifications perfectly. Their expertise in complex roof geometries is unmatched in the industry.",
      rating: 5,
      avatar: "/images/testimonial-2.jpg",
    },
    {
      name: "Robert Mitchell",
      role: "CEO",
      company: "Mitchell Properties",
      content: "We have used Rooftex for over a dozen commercial projects. Their waterproofing expertise saved us significant costs on maintenance. Truly a partner that understands the long-term value of quality workmanship.",
      rating: 5,
      avatar: "/images/testimonial-3.jpg",
    },
  ]);

  // Seed projects
  await db.insert(projects).values([
    {
      title: "Modern Gable Residence",
      description: "Complete roof installation featuring architectural shingles with a 50-year warranty. Custom ridge vents and seamless gutter integration.",
      image: "/images/project-roof.jpg",
      category: "Residential",
      location: "Portland, OR",
      featured: true,
    },
    {
      title: "Clay Tile Heritage Home",
      description: "Restoration of a historic property with premium terracotta clay tiles. Careful removal, restoration, and reinstallation of original materials.",
      image: "/images/project-clay.jpg",
      category: "Residential",
      location: "San Diego, CA",
      featured: true,
    },
    {
      title: "Commercial Metal Complex",
      description: "Standing seam metal roof installation for a 45,000 sq ft commercial facility. Energy-efficient cool roof coating applied for maximum thermal performance.",
      image: "/images/project-commercial.jpg",
      category: "Commercial",
      location: "Phoenix, AZ",
      featured: true,
    },
    {
      title: "Copper Accent Estate",
      description: "Luxury copper roofing installation with custom standing seam panels. Natural patina development monitored over 18-month period.",
      image: "/images/project-copper.jpg",
      category: "Luxury",
      location: "Aspen, CO",
      featured: true,
    },
  ]);

  // Seed blog posts
  await db.insert(blogPosts).values([
    {
      title: "How to Choose the Right Roofing Material for Your Climate",
      slug: "choose-right-roofing-material-climate",
      excerpt: "Different climates demand different roofing solutions. Learn which materials perform best in hot, cold, wet, and coastal environments.",
      content: "Selecting the right roofing material is one of the most important decisions for your property...",
      image: "/images/service-install.jpg",
      category: "Guide",
      published: true,
    },
    {
      title: "The Complete Guide to Flat Roof Maintenance",
      slug: "complete-guide-flat-roof-maintenance",
      excerpt: "Regular maintenance can extend your flat roof's lifespan by 10-15 years. Here's what you need to know.",
      content: "Flat roofs require specialized maintenance to prevent water pooling and membrane damage...",
      image: "/images/service-flat.jpg",
      category: "Maintenance",
      published: true,
    },
    {
      title: "Understanding TPO vs EPDM Roofing Systems",
      slug: "tpo-vs-epdm-roofing-systems",
      excerpt: "Two of the most popular commercial roofing systems compared. Which is right for your building?",
      content: "TPO and EPDM are the leading single-ply membrane options for commercial flat roofs...",
      image: "/images/service-waterproof.jpg",
      category: "Comparison",
      published: true,
    },
  ]);

  console.log("Seed data inserted successfully!");
}

seed().catch(console.error);
