import Image from "next/image";
import { Icon } from "@iconify/react";

import { BlogCard } from "./BlogCard";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { Footer } from "@/components/common/Footer";
import Button from "@/components/common/Button";

import type { BlogDetail } from "@/data/blogDetails";
import type { BlogPost } from "@/data/blogs";

type BlogDetailTemplateProps = {
  blog: BlogDetail;
  relatedBlogs: BlogPost[];
};

export function BlogDetailTemplate({ blog, relatedBlogs }: BlogDetailTemplateProps) {
  return (
    <main className="bg-[#0E0E0E] text-white">
      <section className="relative isolate overflow-hidden" data-hero-root>
        <div className="absolute inset-0">
          <Image
            src={blog.imageSrc}
            alt={blog.imageAlt}
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#0E0E0E]/90 to-[#0E0E0E]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            {blog.heroKicker}
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {blog.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80">
            {blog.summary}
          </p>
          <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8 text-sm uppercase tracking-[0.2em] text-white/70">
            <div>
              <p className="text-[0.65rem] text-white/50">Published</p>
              <p className="mt-2 text-base font-semibold text-white/90 normal-case tracking-normal">
                {blog.date}
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] text-white/50">Reading time</p>
              <p className="mt-2 text-base font-semibold text-white/90 normal-case tracking-normal">
                {blog.readingTime}
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] text-white/50">Category</p>
              <p className="mt-2 text-base font-semibold text-white/90 normal-case tracking-normal">
                {blog.category}
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] text-white/50">Author</p>
              <p className="mt-2 text-base font-semibold text-white/90 normal-case tracking-normal">
                {blog.author.name}
              </p>
              <p className="text-xs text-white/60 normal-case tracking-normal">
                {blog.author.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-[#0E0E0E] sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <article className="space-y-12">
              {blog.sections.map((section) => (
                <div key={section.heading} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0E0E0E]/50">
                      {blog.category}
                    </p>
                    <h2 className="text-3xl font-semibold text-[#0E0E0E]">
                      {section.heading}
                    </h2>
                  </div>
                  {section.image ? (
                    <figure className="overflow-hidden rounded-[32px] border border-[#0E0E0E]/5 bg-[#F7F7F7]">
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={section.image.src}
                          alt={section.image.alt}
                          fill
                          sizes="(min-width: 1024px) 66vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      {section.image.caption ? (
                        <figcaption className="px-6 py-4 text-sm text-[#0E0E0E]/70">
                          {section.image.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ) : null}
                  <div className="space-y-4 text-base leading-relaxed text-[#0E0E0E]/80">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.insight ? (
                    <div className="rounded-[24px] border border-[#0E0E0E]/10 bg-[#FFE08F]/15 p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0E0E0E]/60">
                        {section.insight.label}
                      </p>
                      <p className="mt-3 text-base font-medium text-[#0E0E0E]">
                        {section.insight.content}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}

              <figure className="rounded-[32px] border border-[#0E0E0E]/10 bg-[#0E0E0E]/5 p-8">
                <Icon icon="mdi:format-quote-close" className="text-4xl text-[#FFE08F]" />
                <blockquote className="mt-6 text-2xl font-semibold text-[#0E0E0E]">
                  "{blog.quote.text}"
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#0E0E0E]/60">
                  {blog.quote.author} - {blog.quote.role}
                </figcaption>
              </figure>
            </article>

            <aside className="flex flex-col gap-8">
              <div className="rounded-[32px] border border-[#0E0E0E]/10 bg-[#F9F9F9] p-8 shadow-[0_18px_45px_rgba(14,14,14,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0E0E0E]/60">
                  Key takeaways
                </p>
                <ul className="mt-6 space-y-4 text-base leading-relaxed text-[#0E0E0E]/80">
                  {blog.keyPoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#BF1A1A]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[32px] border border-[#0E0E0E]/10 bg-white/60 p-8 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0E0E0E]/60">
                  Impact metrics
                </p>
                <div className="mt-6 grid gap-6">
                  {blog.highlightStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="border-b border-dashed border-[#0E0E0E]/15 pb-4 last:border-b-0 last:pb-0"
                    >
                      <p className="text-sm text-[#0E0E0E]/60">{stat.label}</p>
                      <p className="mt-2 text-3xl font-semibold text-[#0E0E0E]">
                        {stat.value}
                      </p>
                      <p className="text-sm text-[#0E0E0E]/70">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-[#0E0E0E]/10 bg-[#0E0E0E] p-8 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                  Ready to collaborate?
                </p>
                <p className="mt-4 text-2xl font-semibold">
                  Schedule a design sprint with the team that crafted this insight.
                </p>
                <Button
                  link="/contact"
                  type="secondary"
                  className="mt-6"
                >
                  Start a project
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#0E0E0E] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            eyebrow="Browse more"
            title="Continue exploring our perspectives"
            description="Stay aligned with the latest thinking across city-making, technology, and craft."
            titleClassName="text-white"
            descriptionClassName="text-white/70"
            eyebrowClassName="text-white/60"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedBlogs.map((related) => (
              <BlogCard
                key={related.slug}
                href={related.href}
                title={related.title}
                date={related.date}
                excerpt={related.excerpt}
                imageSrc={related.imageSrc}
                imageAlt={related.imageAlt}
                tag={related.tag}
              />
            ))}
          </div>
        </div>
      </section>

      <ConnectMarquee />
      <ServiceCTASection />
      <Footer />
    </main>
  );
}


