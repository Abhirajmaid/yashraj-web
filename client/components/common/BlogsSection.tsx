import { BlogCard } from "./BlogCard";
import { SectionHeader } from "./SectionHeader";
import { blogs } from "@/data/blogs";

export function BlogsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 text-[#0E0E0E]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,14,14,0.08),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
        <div className="mb-12">
          <SectionHeader
            eyebrow="BLOG AND ARTICLE"
            title="Blogs"
            description="Check our last articles"
            eyebrowClassName="text-[#0E0E0E]/50"
            descriptionClassName="text-[#0E0E0E]/60"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog.href} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

