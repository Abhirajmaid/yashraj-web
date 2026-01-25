"use client";
import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ClientCaseStudyCard } from "./ClientCaseStudyCard";

const caseStudies = [
  {
    clientName: "Navi Mumbai Municipal Corporation (NMMC)",
    projectTitle: "Airoli T-Junction",
    projectLocation: "Airoli, Navi Mumbai",
    challenge:
      "Severe traffic congestion and frequent water logging due to inadequate drainage and damaged pavement at a critical junction.",
    solution:
      "Upgradation of storm water drains and culvert, widening and concretisation of side shoulders, and replacement of damaged concrete pavement panels to improve traffic flow and drainage efficiency.",
    results:
      "Smooth and uninterrupted traffic movement with complete elimination of water logging at the junction.",
    images: [] as Array<{ src: string; alt: string }>,
  },
  {
    clientName: "S.M. Avtade Pvt. Ltd.",
    projectTitle: "Truck Lay-Byes at Mumbai–Pune Expressway",
    projectLocation: "Mumbai–Pune Expressway",
    challenge:
      "Frequent truck breakdowns and overheating during long journeys, leading to traffic congestion and safety risks on the expressway.",
    solution:
      "Construction of two dedicated truck lay-by bays to provide safe resting and emergency stopping zones for heavy vehicles.",
    results:
      "Significant reduction in vehicle breakdown incidents and smoother traffic flow with decreased congestion on the expressway.",
    images: [] as Array<{ src: string; alt: string }>,
  },
];

export function ClientCaseStudiesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollPrev(container.scrollLeft > 0);
      setCanScrollNext(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );

      // Calculate active index based on scroll position
      const firstCard = container.firstElementChild as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const scrollPosition = container.scrollLeft;
        const newActiveIndex = Math.round(scrollPosition / cardWidth);
        const clampedIndex = Math.max(
          0,
          Math.min(newActiveIndex, caseStudies.length - 1)
        );
        setActiveIndex(clampedIndex);
      }
    }
  };

  useEffect(() => {
    updateScrollState();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollState);
      window.addEventListener("resize", updateScrollState);
      return () => {
        container.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }
  }, []);

  const scroll = (direction: "prev" | "next") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstCardElement = container.firstElementChild as HTMLElement;

    if (!firstCardElement) return;

    // Scroll by full card width (100% of viewport)
    const cardWidth = firstCardElement.offsetWidth;

    const newScrollLeft =
      direction === "next"
        ? container.scrollLeft + cardWidth
        : container.scrollLeft - cardWidth;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    // Update button states and active index after scroll
    setTimeout(() => {
      updateScrollState();
    }, 350);
  };

  return (
    <section id="case-studies" className="relative isolate overflow-hidden bg-white text-brand-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 xl:px-14">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16">
          <SectionHeader
            eyebrow="CLIENT CASE STUDIES"
            title="Our Success Stories"
            description="Discover how we've helped government and private clients achieve their infrastructure goals through innovative solutions and exceptional execution."
            align="center"
            eyebrowClassName="text-primary"
            titleClassName="text-brand-dark"
            descriptionClassName="text-brand-dark/70 max-w-3xl mx-auto"
          />
        </div>

        {/* Case Studies Carousel */}
        <div className="relative -mx-6 sm:-mx-10 lg:-mx-14">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("prev")}
            disabled={!canScrollPrev}
            aria-label="Previous case study"
            className="absolute left-6 sm:left-10 lg:left-14 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 lg:p-4"
          >
            <Icon
              icon="mdi:chevron-left"
              className="text-2xl text-brand-primary lg:text-3xl"
            />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("next")}
            disabled={!canScrollNext}
            aria-label="Next case study"
            className="absolute right-6 sm:right-10 lg:right-14 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 lg:p-4"
          >
            <Icon
              icon="mdi:chevron-right"
              className="text-2xl text-brand-primary lg:text-3xl"
            />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-0 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onScroll={updateScrollState}
          >
            {caseStudies.map((caseStudy, index) => (
              <div
                key={index}
                className="shrink-0 w-full snap-start case-study-card-wrapper"
                data-case-index={index}
              >
                <div
                  className="w-full h-full px-4 sm:px-6"
                  style={{ minHeight: "400px" }}
                >
                  <ClientCaseStudyCard {...caseStudy} />
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {caseStudies.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-12 bg-brand-primary"
                    : "w-8 bg-brand-primary/30 hover:bg-brand-primary/50"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .case-study-card-wrapper {
          width: 100%;
          min-width: 100%;
        }
      `}</style>
    </section>
  );
}
