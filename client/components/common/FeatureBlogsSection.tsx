import Link from "next/link";
import { Icon } from "@iconify/react";
import { BlogCard } from "./BlogCard";
import { SectionHeader } from "./SectionHeader";

const blogs = [
  {
    href: "/blog/green-space-revolution",
    title:
      "The Green Space Revolution: Is the ‘Living Building’ the Future of Cities?",
    date: "October 4, 2024",
    excerpt:
      "Explore how biophilic design is reshaping urban landscapes and redefining how people interact with the spaces around them.",
    imageSrc: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Organic architectural structure with glowing lights",
  },
  {
    href: "/blog/riverfront-hub",
    title:
      "Riverfront Hub: Designing multi-use spaces for tomorrow’s communities.",
    date: "October 4, 2024",
    excerpt:
      "A deep dive into the collaborative process that turned a vacant waterfront into a vibrant cultural hub.",
    imageSrc: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern building reflecting on water at dusk",
  },
  {
    href: "/blog/modular-megacity",
    title:
      "Modular Megacity: The rise of adaptable architecture for growing metros.",
    date: "October 4, 2024",
    excerpt:
      "Unpacking the benefits of modular construction for cities that need to expand sustainably and efficiently.",
    imageSrc: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Futuristic city skyline under blue sky",
  },
];

export function FeatureBlogsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 text-[#0E0E0E]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,14,14,0.08),transparent_60%)]" />
      <div className="relative z-10 flex flex-col gap-10 px-6 lg:px-10 xl:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeader
            eyebrow="Blog and Article"
            title="Feature blogs"
            description="Catch up on our latest articles"
            eyebrowClassName="text-[#0E0E0E]/50"
            descriptionClassName="text-[#0E0E0E]/60"
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 rounded-full bg-[#0E0E0E] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(14,14,14,0.2)] transition hover:-translate-y-1 hover:bg-[#1a1a1a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E0E0E]"
          >
            See more
            <Icon 
              icon="solar:arrow-right-up-bold" 
              className="text-base"
              style={{ transform: 'rotate(45deg)' }}
            />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.href} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
