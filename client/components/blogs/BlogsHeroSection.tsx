"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "@/components/common/Button";
import { BlogCarouselCard } from "./BlogCarouselCard";
import { blogs } from "@/data/blogs";

export function BlogsHeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get first 3 blogs for carousel
  const featuredBlogs = blogs.slice(0, 3);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredBlogs.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === featuredBlogs.length - 1 ? 0 : prev + 1
    );
  };

  const getVisiblePosts = () => {
    const posts = [];
    for (let i = -1; i <= 1; i++) {
      const index =
        (currentIndex + i + featuredBlogs.length) % featuredBlogs.length;
      posts.push({ ...featuredBlogs[index], isActive: i === 0 });
    }
    return posts;
  };

  return (
    <section
      id="blogs"
      data-hero-root
      className="relative isolate min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full z-0">
        <Image
          src="/images/blogsimage.jpg"
          alt="Blogs hero background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover h-full w-full object-center"
        />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Hero Content */}
        <div className="flex-1 flex items-center pt-12 sm:pt-16 lg:pt-24 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl sm:text-6xl lg:text-6xl xl:text-6xl text-center font-medium text-white leading-[1.1]">
                Insights & Updates
              </h1>
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Featured Articles Label - Hidden on mobile */}
            <div className="mb-4 sm:mb-6 text-center hidden sm:block">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/60">
                Featured Articles
              </p>
            </div>

            {/* Carousel */}
            <div className="relative mb-6 sm:mb-8 ">
              <div className="relative flex items-center justify-center gap-0 sm:gap-4 lg:gap-6">
                {getVisiblePosts().map((post, idx) => (
                  <div
                    key={post.slug}
                    className={`shrink-0 transition-all duration-500 ease-in-out ${
                      // Mobile: show only center card (idx === 1), hide side cards
                      // Desktop: show all three cards
                      idx === 0
                        ? "hidden sm:block w-[28%] lg:w-[30%] z-0 opacity-100"
                        : idx === 1
                        ? "w-full sm:w-[44%] lg:w-[40%] z-10"
                        : idx === 2
                        ? "hidden sm:block w-[28%] lg:w-[30%] z-0 opacity-100"
                        : ""
                    }`}
                  >
                    <div className="aspect-[4/3]">
                      <BlogCarouselCard
                        href={post.href}
                        title={post.title}
                        date={post.date}
                        imageSrc={post.imageSrc}
                        imageAlt={post.imageAlt}
                        isActive={post.isActive}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <Button
                onClick={handlePrevious}
                type="primary"
                size="md"
                hideArrow
                className="h-10 w-10 sm:h-12 sm:w-12 !p-0 bg-white/10 text-white hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
                aria-label="Previous blog post"
              >
                <Icon
                  icon="solar:alt-arrow-left-bold"
                  className="text-xl sm:text-2xl"
                />
              </Button>
              <Button
                onClick={handleNext}
                type="primary"
                size="md"
                hideArrow
                className="h-10 w-10 sm:h-12 sm:w-12 !p-0 bg-white/10 text-white hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
                aria-label="Next blog post"
              >
                <Icon
                  icon="solar:alt-arrow-right-bold"
                  className="text-xl sm:text-2xl"
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="relative z-10 pb-8 sm:pb-12 hidden sm:block">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex justify-center">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 py-2 shadow-lg">
                <div className="text-white/70 text-xs">
                  Scroll to explore articles
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
