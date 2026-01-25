"use client";
import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProjectRecord } from "@/types/project";
import { listenToProjects } from "@/lib/projectsRepository";

export function ProjectsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // All projects, newest first (Firebase already orders by createdAt desc)
  const topProjects = projects;

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

  const CAROUSEL_GAP = 16; // gap-4

  const updateScrollState = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    setCanScrollPrev(container.scrollLeft > 0);
    setCanScrollNext(
      container.scrollLeft <
      container.scrollWidth - container.clientWidth - 10
    );

    const firstCard = container.firstElementChild as HTMLElement;
    if (
      !firstCard ||
      firstCard.offsetWidth < 1 ||
      topProjects.length === 0
    ) return;

    const cardWidth = firstCard.offsetWidth;
    const cardWithGap = cardWidth + CAROUSEL_GAP;
    const newActiveIndex = Math.round(container.scrollLeft / cardWithGap);
    const clampedIndex = Math.max(
      0,
      Math.min(newActiveIndex, topProjects.length - 1)
    );
    setActiveIndex(clampedIndex);
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
  }, [topProjects.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let intervalId: NodeJS.Timeout | null = null;

    const autoScroll = () => {
      if (topProjects.length === 0) return;
      const firstCard = container.firstElementChild as HTMLElement;
      if (!firstCard || firstCard.offsetWidth < 1) return;

      const cardWidth = firstCard.offsetWidth;
      const scrollAmount = cardWidth + CAROUSEL_GAP;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
      setTimeout(updateScrollState, 450);
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

    startAutoScroll();
    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll);

    return () => {
      stopAutoScroll();
      container.removeEventListener("mouseenter", stopAutoScroll);
      container.removeEventListener("mouseleave", startAutoScroll);
    };
  }, [topProjects.length]);

  const scroll = (direction: "prev" | "next") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstCardElement = container.firstElementChild as HTMLElement;

    if (!firstCardElement) return;

    const cardWidth = firstCardElement.offsetWidth;
    const scrollAmount = cardWidth + CAROUSEL_GAP;

    const newScrollLeft =
      direction === "next"
        ? container.scrollLeft + scrollAmount
        : container.scrollLeft - scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    setTimeout(updateScrollState, 450);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current || topProjects.length === 0) return;
    const container = scrollContainerRef.current;
    const firstCard = container.firstElementChild as HTMLElement;
    if (!firstCard) return;
    const targetLeft = index * (firstCard.offsetWidth + CAROUSEL_GAP);
    container.scrollTo({ left: targetLeft, behavior: "smooth" });
    setActiveIndex(index);
    setTimeout(updateScrollState, 450);
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
              topProjects.map((project, index) => {
                const imageSrc =
                  project.featureImages?.primary?.trim() ||
                  project.gallery?.[0]?.trim() ||
                  project.featureImages?.lifestyle?.trim() ||
                  project.featureImages?.city?.trim() ||
                  "";
                return (
                  <div
                    key={project.id}
                    className="shrink-0 project-card-wrapper"
                    data-project-index={index}
                  >
                    <div className="mx-auto w-full" style={{ maxWidth: "700px" }}>
                      <ProjectCard
                        href={`/projects/${project.id}`}
                        imageSrc={imageSrc}
                        imageAlt={project.name || "Project"}
                        title={`"${project.name || "Untitled Project"}"`}
                        completion={project.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
                        location={project.overview ? (project.overview.substring(0, 50) + (project.overview.length > 50 ? '...' : '')) : 'Location not specified'}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Scroll indicator */}
          {!isLoading && !error && topProjects.length > 0 && (
            <div className="mt-8 flex justify-center gap-2">
              {topProjects.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`cursor-pointer h-1 rounded-full transition-all ${index === activeIndex
                      ? "w-12 bg-brand-primary"
                      : "w-8 bg-brand-primary/30 hover:bg-brand-primary/50"
                    }`}
                  aria-label={`Go to project ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
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
