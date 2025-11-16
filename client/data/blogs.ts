export type BlogPost = {
  slug: string;
  href: string;
  title: string;
  date: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  tag?: string;
};

export const blogs: BlogPost[] = [
  {
    slug: "green-space-revolution",
    href: "/blogs/green-space-revolution",
    title: "The Green Space Revolution: Is the 'Living Building' the Future of Cities?",
    date: "October 4, 2024",
    excerpt: "Explore how biophilic design is reshaping urban landscapes and redefining how people interact with the spaces around them.",
    imageSrc: "/showcase.jpg",
    imageAlt: "Modern building with curved roofline and green spaces",
    tag: "Feature blog",
  },
  {
    slug: "riverfront-hub",
    href: "/blogs/riverfront-hub",
    title: "Riverfront Hub: Designing multi-use spaces for tomorrow's communities.",
    date: "October 4, 2024",
    excerpt: "A deep dive into the collaborative process that turned a vacant waterfront into a vibrant cultural hub.",
    imageSrc: "/yashrajhero.jpg",
    imageAlt: "Modern building reflecting on water at dusk",
    tag: "Feature blog",
  },
  {
    slug: "modular-megacity",
    href: "/blogs/modular-megacity",
    title: "Modular Megacity: The rise of adaptable architecture for growing metros.",
    date: "October 4, 2024",
    excerpt: "Unpacking the benefits of modular construction for cities that need to expand sustainably and efficiently.",
    imageSrc: "/yashrajhero1.jpg",
    imageAlt: "Futuristic city skyline under blue sky",
    tag: "Feature blog",
  },
  {
    slug: "concept-to-creation",
    href: "/blogs/concept-to-creation",
    title: "From Concept to Creation: The Architectural Design Process Explained",
    date: "October 4, 2024",
    excerpt: "Understanding the journey from initial sketches to completed structures, and the collaborative effort behind every project.",
    imageSrc: "/showcase.jpg",
    imageAlt: "Architectural design process and blueprints",
    tag: "Feature blog",
  },
  {
    slug: "sustainable-construction",
    href: "/blogs/sustainable-construction",
    title: "Sustainable Construction: Building for a Better Tomorrow",
    date: "October 4, 2024",
    excerpt: "Discover how modern construction techniques are reducing environmental impact while creating beautiful, functional spaces.",
    imageSrc: "/yashrajhero.jpg",
    imageAlt: "Sustainable construction site with eco-friendly materials",
    tag: "Feature blog",
  },
  {
    slug: "urban-planning",
    href: "/blogs/urban-planning",
    title: "Urban Planning in the 21st Century: Balancing Growth and Sustainability",
    date: "October 4, 2024",
    excerpt: "Examining how cities are evolving to meet the challenges of population growth, climate change, and quality of life.",
    imageSrc: "/yashrajhero1.jpg",
    imageAlt: "Modern urban planning and city development",
    tag: "Feature blog",
  },
];

