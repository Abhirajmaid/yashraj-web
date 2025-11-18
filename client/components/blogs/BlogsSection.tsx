import { BlogCard } from "./BlogCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { blogs } from "@/data/blogs";

export function BlogsSection() {
  return (
    <section
      id="blogs-grid"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-16 lg:py-20 text-brand-dark"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <SectionHeader
            eyebrow="BLOG AND ARTICLE"
            title="Latest Articles"
            description="Explore our insights on architecture, construction, and infrastructure development"
            eyebrowClassName="text-brand-primary"
            titleClassName="text-brand-dark"
            descriptionClassName="text-brand-dark/70"
          />
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug || blog.href} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

