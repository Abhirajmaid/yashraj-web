import Button from "@/components/common/Button";
import { BlogCard } from "@/components/blogs/BlogCard";
import { SectionHeader } from "@/components/common/SectionHeader";

const blogs = [
  {
    href: "/blogs/green-space-revolution",
    title:
      "The Green Space Revolution: Is the 'Living Building' the Future of Cities?",
    date: "October 4, 2024",
    excerpt:
      "Explore how biophilic design is reshaping urban landscapes and redefining how people interact with the spaces around them.",
    imageSrc:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Organic architectural structure with glowing lights",
  },
  {
    href: "/blogs/riverfront-hub",
    title:
      "Riverfront Hub: Designing multi-use spaces for tomorrow's communities.",
    date: "October 4, 2024",
    excerpt:
      "A deep dive into the collaborative process that turned a vacant waterfront into a vibrant cultural hub.",
    imageSrc:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern building reflecting on water at dusk",
  },
  {
    href: "/blogs/modular-megacity",
    title:
      "Modular Megacity: The rise of adaptable architecture for growing metros.",
    date: "October 4, 2024",
    excerpt:
      "Unpacking the benefits of modular construction for cities that need to expand sustainably and efficiently.",
    imageSrc:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Futuristic city skyline under blue sky",
  },
];

export function FeatureBlogsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 text-brand-dark">
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col gap-8 px-6 lg:px-10 xl:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeader
            eyebrow="Blog and Article"
            title="Feature blogs"
            description="Catch up on our latest articles"
            eyebrowClassName="text-primary"
            descriptionClassName="text-brand-dark/60"
          />
          <Button link="/blogs" type="primary" size="lg">
            See more
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.href} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
