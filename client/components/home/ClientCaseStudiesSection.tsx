"use client";
import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ClientCaseStudyCard } from "./ClientCaseStudyCard";

const caseStudies = [
  {
    clientLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
    clientLogoAlt: "TechCorp Logo",
    clientName: "TechCorp Industries",
    projectTitle: "Corporate Headquarters",
    description:
      "Delivered a state-of-the-art corporate headquarters featuring modern architecture, sustainable design, and cutting-edge infrastructure. The project included 15 floors of office space, parking facilities, and recreational areas.",
    projectLocation: "Business District, Mumbai",
    images: [
      {
        src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
        alt: "TechCorp headquarters building",
      },
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        alt: "Modern office interior",
      },
      {
        src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80",
        alt: "Building facade",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        alt: "Architectural details",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        alt: "Building exterior",
      },
    ],
  },
  {
    clientLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
    clientLogoAlt: "Urban Development Logo",
    clientName: "Urban Development Group",
    projectTitle: "Residential Complex",
    description:
      "Constructed a premium residential complex with 200+ units, featuring modern amenities, landscaped gardens, and sustainable building practices. The project was completed ahead of schedule with zero safety incidents.",
    projectLocation: "Suburban Area, Delhi",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        alt: "Residential complex exterior",
      },
      {
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        alt: "Apartment building",
      },
      {
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        alt: "Residential units",
      },
      {
        src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        alt: "Building structure",
      },
    ],
  },
  {
    clientLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
    clientLogoAlt: "Infra Solutions Logo",
    clientName: "Infra Solutions Ltd",
    projectTitle: "Highway Infrastructure",
    description:
      "Executed a major highway construction project spanning 50 kilometers, including bridges, tunnels, and modern road infrastructure. The project improved connectivity and reduced travel time by 40%.",
    projectLocation: "National Highway, Bangalore",
    images: [
      {
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        alt: "Highway construction",
      },
      {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
        alt: "Road infrastructure",
      },
      {
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
        alt: "Bridge construction",
      },
      {
        src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        alt: "Completed highway",
      },
    ],
  },
  {
    clientLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
    clientLogoAlt: "GreenBuild Logo",
    clientName: "GreenBuild Constructions",
    projectTitle: "Sustainable Office Park",
    description:
      "Developed an eco-friendly office park with LEED certification, featuring solar panels, rainwater harvesting, and green building materials. The project sets new standards for sustainable construction in the region.",
    projectLocation: "Eco Park, Pune",
    images: [
      {
        src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80",
        alt: "Sustainable building",
      },
      {
        src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        alt: "Green architecture",
      },
      {
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        alt: "Eco-friendly design",
      },
    ],
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
    <section className="relative isolate overflow-hidden bg-white text-brand-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 xl:px-14">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16">
          <SectionHeader
            eyebrow="CLIENT CASE STUDIES"
            title="Success Stories from Our Clients"
            description="Discover how we've helped leading companies achieve their construction and infrastructure goals through innovative solutions and exceptional execution."
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
                <div className="w-full h-full px-4 sm:px-6" style={{ minHeight: "400px" }}>
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

