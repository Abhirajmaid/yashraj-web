"use client";
import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProjectRecord } from "@/types/project";
import { listenToProjects } from "@/lib/projectsRepository";

const projects = [
  {
    href: "/projects/skyline-towers",
    imageSrc: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Skyline towers project",
    title: `"Skyline Towers"`,
    completion: "June 2023",
    location: "Riverside District",
  },
  {
    href: "/projects/riverfront-residences",
    imageSrc: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Riverfront residences project",
    title: `"Riverfront Residences"`,
    completion: "August 2022",
    location: "Downtown Metropolis",
  },
  {
    href: "/projects/modular-megacity",
    imageSrc: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modular megacity project",
    title: `"Modular Megacity"`,
    completion: "December 2023",
    location: "Urban Core",
  },
  {
    href: "/projects/coastal-horizon",
    imageSrc: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Coastal horizon project",
    title: `"Coastal Horizon"`,
    completion: "March 2024",
    location: "Seaside Boulevard",
  },
  {
    href: "/projects/tech-campus",
    imageSrc: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Tech campus project",
    title: `"Tech Campus"`,
    completion: "January 2024",
    location: "Innovation District",
  },
  {
    href: "/projects/green-towers",
    imageSrc: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Green towers project",
    title: `"Green Towers"`,
    completion: "May 2023",
    location: "Eco Park",
  },
  {
    href: "/projects/platinum-heights",
    imageSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Platinum heights project",
    title: `"Platinum Heights"`,
    completion: "September 2023",
    location: "Business District",
  },
  {
    href: "/projects/ocean-view-villas",
    imageSrc: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Ocean view villas project",
    title: `"Ocean View Villas"`,
    completion: "November 2023",
    location: "Coastal Area",
  },
  {
    href: "/projects/urban-nexus",
    imageSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Urban nexus project",
    title: `"Urban Nexus"`,
    completion: "April 2024",
    location: "City Center",
  },
  {
    href: "/projects/elite-residences",
    imageSrc: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Elite residences project",
    title: `"Elite Residences"`,
    completion: "February 2024",
    location: "Premium Zone",
  },
  {
    href: "/projects/sky-bridge-complex",
    imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sky bridge complex project",
    title: `"Sky Bridge Complex"`,
    completion: "July 2023",
    location: "Metropolitan Area",
  },
];

export function ProjectsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from Firebase
  useEffect(() => {
    const unsubscribe = listenToProjects(
      (records) => {
        setProjects(records);
        setIsLoading(false);
        setError(null);
      },
      (firebaseError) => {
        setError(firebaseError.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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
        const gap = 16; // gap-4 = 16px
        const scrollPosition = container.scrollLeft;
        const cardWithGap = cardWidth + gap;
        const newActiveIndex = Math.round(scrollPosition / cardWithGap);
        const clampedIndex = Math.max(
          0,
          Math.min(newActiveIndex, projects.length - 1)
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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let intervalId: NodeJS.Timeout | null = null;

    const autoScroll = () => {
      const firstCard = container.firstElementChild as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = 16; // gap-4 = 16px
      const scrollAmount = cardWidth + gap;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        // Reset to start when reaching the end
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        // Update active index after reset
        setTimeout(() => updateScrollState(), 100);
      } else {
        // Scroll to next card
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
        // Update active index after scroll
        setTimeout(() => updateScrollState(), 100);
      }
    };

    const startAutoScroll = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(autoScroll, 4000);
    };

    const stopAutoScroll = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // Start auto-scroll
    startAutoScroll();

    // Pause on hover
    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll);

    return () => {
      stopAutoScroll();
      container.removeEventListener("mouseenter", stopAutoScroll);
      container.removeEventListener("mouseleave", startAutoScroll);
    };
  }, []);

  const scroll = (direction: "prev" | "next") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstCardElement = container.firstElementChild as HTMLElement;

    if (!firstCardElement) return;

    const cardWidth = firstCardElement.offsetWidth;
    const gap = 24; // gap-6 = 24px
    const scrollAmount = cardWidth + gap;

    const newScrollLeft =
      direction === "next"
        ? container.scrollLeft + scrollAmount
        : container.scrollLeft - scrollAmount;

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
    <section className="relative isolate overflow-hidden bg-white text-dark">
      {/* Top left gradient with primary color */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10 xl:px-14">
        {/* Header Section */}
        <div className="mb-16 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 max-w-2xl">
            <SectionHeader
              eyebrow="Our Projects"
              title="Building Tomorrow's Landmarks with Expert Precision."
              eyebrowClassName="text-primary"
              titleClassName="text-dark"
            />
          </div>

          <div className="flex flex-col gap-6 lg:max-w-md lg:items-end lg:text-right">
            <p className="hidden text-base leading-relaxed text-dark/80 md:block">
              The types of construction projects our company specializes in
              include residential, commercial, industrial, and renovation
              projects each delivered with meticulous planning and
              craftsmanship.
            </p>
          </div>
        </div>

        {/* Projects Auto Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("prev")}
            disabled={!canScrollPrev}
            aria-label="Previous project"
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-4 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 lg:-translate-x-6 lg:p-4"
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
            aria-label="Next project"
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-4 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 lg:translate-x-6 lg:p-4"
          >
            <Icon
              icon="mdi:chevron-right"
              className="text-2xl text-brand-primary lg:text-3xl"
            />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-8"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onScroll={updateScrollState}
          >
            {isLoading ? (
              <div className="flex w-full items-center justify-center py-20">
                <p className="text-lg text-dark/60">Loading projects...</p>
              </div>
            ) : error ? (
              <div className="flex w-full items-center justify-center py-20">
                <p className="text-lg text-red-600">Error: {error}</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex w-full items-center justify-center py-20">
                <p className="text-lg text-dark/60">No projects available yet.</p>
              </div>
            ) : (
              projects
                .filter((project) => project.featureImages?.primary && project.featureImages.primary.trim() !== "")
                .map((project, index) => (
                  <div
                    key={project.id}
                    className="shrink-0 project-card-wrapper"
                    data-project-index={index}
                  >
                    <div className="mx-auto w-full" style={{ maxWidth: "700px" }}>
                      <ProjectCard
                        href={`/projects/${project.id}`}
                        imageSrc={project.featureImages.primary}
                        imageAlt={project.name || "Project"}
                        title={`"${project.name || "Untitled Project"}"`}
                        completion={project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
                        location={project.overview ? (project.overview.substring(0, 50) + (project.overview.length > 50 ? '...' : '')) : 'Location not specified'}
                      />
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Scroll indicator */}
          {!isLoading && !error && projects.length > 0 && (
            <div className="mt-8 flex justify-center gap-2">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all ${index === activeIndex
                      ? "w-12 bg-brand-primary"
                      : "w-8 bg-brand-primary/30 hover:bg-brand-primary/50"
                    }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .project-card-wrapper {
          width: calc((100vw - 3rem) / 1.2);
          min-width: calc((100vw - 3rem) / 1.2);
        }
        
        @media (min-width: 640px) {
          .project-card-wrapper {
            width: calc((100vw - 6rem) / 1.5);
            min-width: calc((100vw - 6rem) / 1.5);
          }
        }
        
        @media (min-width: 1024px) {
          .project-card-wrapper {
            width: calc((100vw - 12rem) / 2.5);
            min-width: calc((100vw - 12rem) / 2.5);
          }
        }
        
        @media (min-width: 1280px) {
          .project-card-wrapper {
            width: calc((100vw - 12rem) / 3);
            min-width: calc((100vw - 12rem) / 3);
          }
        }
      `}</style>
    </section>
  );
}
