"use client";

import Link from "next/link";
import { useState } from "react";
import { BlogCarouselCard } from "./BlogCarouselCard";
import { ConnectMarquee } from "./ConnectMarquee";
import { Icon } from "@iconify/react";

const blogPosts = [
  {
    id: 1,
    href: "/blogs/1",
    title: "The Green Space Revolution: Is the 'Living Building' the Future of Cities?",
    date: "October 4, 2024",
    imageSrc: "/showcase.jpg",
    imageAlt: "Modern building with curved roofline",
  },
  {
    id: 2,
    href: "/blogs/2",
    title: "Sustainable Architecture: Building for Tomorrow",
    date: "October 4, 2024",
    imageSrc: "/yashrajhero.jpg",
    imageAlt: "Sustainable architecture building",
  },
  {
    id: 3,
    href: "/blogs/3",
    title: "Innovation in Construction: The Future of Urban Development",
    date: "October 4, 2024",
    imageSrc: "/yashrajhero1.jpg",
    imageAlt: "Modern urban development",
  },
];

export function BlogsHeroSection() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? blogPosts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === blogPosts.length - 1 ? 0 : prev + 1));
  };

  const getVisiblePosts = () => {
    const posts = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + blogPosts.length) % blogPosts.length;
      posts.push({ ...blogPosts[index], isActive: i === 0 });
    }
    return posts;
  };

  return (
    <section
      id="blogs"
      data-hero-root
      className="relative isolate min-h-screen overflow-hidden bg-[#0E0E0E] text-white"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E0E] via-[#0E0E0E] to-[#0E0E0E]/95" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-16 pt-[15vh]">
        <div className="mx-auto w-full max-w-7xl">
          {/* Hero Content */}
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl">
              News and updates for you
            </h1>
            <Link
              href="#get-started"
              className="inline-block rounded-full bg-[#0E0E0E] px-8 py-4 text-base font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_24px_rgba(14,14,14,0.18)] transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0E0E0E] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700]"
            >
              Get started
            </Link>
          </div>

          {/* Carousel */}
          <div className="relative mb-12 overflow-hidden">
            <div className="relative flex items-center justify-between">
              {getVisiblePosts().map((post, idx) => (
                <div
                  key={post.id}
                  className={`flex-shrink-0 transition-all duration-500 ease-in-out ${
                    idx === 0
                      ? "w-[30%] opacity-70 z-0"
                      : idx === 1
                      ? "w-[40%] z-10"
                      : idx === 2
                      ? "w-[30%] opacity-70 z-0"
                      : ""
                  }`}
                >
                  <BlogCarouselCard
                    href={post.href}
                    title={post.title}
                    date={post.date}
                    imageSrc={post.imageSrc}
                    imageAlt={post.imageAlt}
                    isActive={post.isActive}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevious}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700]"
              aria-label="Previous blog post"
            >
              <Icon icon="solar:alt-arrow-left-bold" className="text-2xl" />
            </button>
            <button
              onClick={handleNext}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700]"
              aria-label="Next blog post"
            >
              <Icon icon="solar:alt-arrow-right-bold" className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Connect Marquee */}
      <div className="relative z-10">
        <ConnectMarquee />
      </div>
    </section>
  );
}

