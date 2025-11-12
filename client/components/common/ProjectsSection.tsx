"use client";
import { useRef, useState, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";

const projects = [
  {
    href: "/projects/skyline-towers",
    imageSrc: "/showcase.jpg",
    imageAlt: "Skyline towers project",
    title: `"Skyline Towers"`,
    completion: "June 2023",
    location: "Riverside District",
  },
  {
    href: "/projects/riverfront-residences",
    imageSrc: "/yashrajhero.jpg",
    imageAlt: "Riverfront residences project",
    title: `"Riverfront Residences"`,
    completion: "August 2022",
    location: "Downtown Metropolis",
  },
  {
    href: "/projects/modular-megacity",
    imageSrc: "/yashrajhero1.jpg",
    imageAlt: "Modular megacity project",
    title: `"Modular Megacity"`,
    completion: "December 2023",
    location: "Urban Core",
  },
  {
    href: "/projects/coastal-horizon",
    imageSrc: "/showcase.jpg",
    imageAlt: "Coastal horizon project",
    title: `"Coastal Horizon"`,
    completion: "March 2024",
    location: "Seaside Boulevard",
  },
  {
    href: "/projects/tech-campus",
    imageSrc: "/yashrajhero.jpg",
    imageAlt: "Tech campus project",
    title: `"Tech Campus"`,
    completion: "January 2024",
    location: "Innovation District",
  },
  {
    href: "/projects/green-towers",
    imageSrc: "/yashrajhero1.jpg",
    imageAlt: "Green towers project",
    title: `"Green Towers"`,
    completion: "May 2023",
    location: "Eco Park",
  },
];

export function ProjectsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const updateScrollButtons = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        setCanScrollPrev(container.scrollLeft > 0);
        setCanScrollNext(
          container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
      }
    };

    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
        window.removeEventListener("resize", updateScrollButtons);
      };
    }
  }, []);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollPrev(container.scrollLeft > 0);
      setCanScrollNext(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scroll = (direction: "prev" | "next") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstCardElement = container.firstElementChild as HTMLElement;
    
    if (!firstCardElement) return;

    const cardWidth = firstCardElement.offsetWidth;
    const gap = 32; // gap-8 = 32px
    const scrollAmount = cardWidth + gap;

    const newScrollLeft =
      direction === "next"
        ? container.scrollLeft + scrollAmount
        : container.scrollLeft - scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    // Update button states after scroll
    setTimeout(() => {
      updateScrollButtons();
    }, 350);
  };

  return (
    <section className="relative isolate mt-16 overflow-hidden bg-[#f21b29] text-[#FFD700]">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-white" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 lg:px-10 xl:px-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <SectionHeader
            eyebrow="Our Projects"
            title="Building Tomorrow's Landmarks with Expert Precision."
          />
          <div className="flex max-w-xl flex-col gap-6 text-[#FFD700]/85 lg:items-end lg:text-right">
            <p className="text-base leading-relaxed">
              The types of construction projects our company specializes in include
              residential, commercial, industrial, and renovation projects – each
              delivered with meticulous planning and craftsmanship.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("prev")}
                disabled={!canScrollPrev}
                className="inline-flex items-center gap-3 rounded-full bg-[#FFD700] px-5 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0E0E0E] shadow-[0_12px_28px_rgba(14,14,14,0.22)] transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <span className="text-xl">←</span>
                Previous
              </button>
              <button
                onClick={() => scroll("next")}
                disabled={!canScrollNext}
                className="inline-flex items-center gap-3 rounded-full bg-[#FFD700] px-5 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0E0E0E] shadow-[0_12px_28px_rgba(14,14,14,0.22)] transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                Next
                <span className="text-xl">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative -mx-6 lg:-mx-10 xl:-mx-14">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 pl-6 lg:pl-10 xl:pl-14 pr-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onScroll={updateScrollButtons}
          >
            {projects.map((project) => (
              <div
                key={project.href}
                className="flex-shrink-0"
                style={{
                  width: "calc((100vw - 48px - 64px) / 2.5)",
                  minWidth: "calc((100vw - 48px - 64px) / 2.5)",
                }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

