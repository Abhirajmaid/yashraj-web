"use client";
import { useState, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProjectRecord } from "@/types/project";
import { listenToProjects } from "@/lib/projectsRepository";

export function ProjectsSection() {
  // removed unused activeIndex state
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
      },
    );

    return () => unsubscribe();
  }, []);

  // Marquee: continuous auto-scrolling. We'll duplicate items for seamless loop.

  return (
    <section className="relative isolate overflow-hidden bg-white text-dark">
      {/* Top left gradient with primary color */}
      {/* <div className="absolute inset-0 bg-linear-to-br from-brand-primary/10 via-transparent to-transparent" /> */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-0 lg:px-10 xl:px-14">
        {/* Header Section */}
        <div className="mb-6 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
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

        {/* Projects Marquee - full width, continuous scrolling */}
      </div>

      <div className="w-full overflow-hidden bg-white">
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
          // Marquee track: duplicate items for seamless infinite loop
          <div
            className="marquee relative"
            aria-hidden={false}
            // pause animation on hover via CSS
          >
            <div
              className="marquee-track flex items-stretch gap-4"
              // animation duration: longer if more items
              style={{
                animationDuration: `${Math.max(20, topProjects.length * 6)}s`,
              }}
            >
              {[...topProjects, ...topProjects].map((project, i) => {
                const imageSrc =
                  project.featureImages?.primary?.trim() ||
                  project.gallery?.[0]?.trim() ||
                  project.featureImages?.lifestyle?.trim() ||
                  project.featureImages?.city?.trim() ||
                  "";
                return (
                  <div
                    key={`${project.id}-${i}`}
                    className="shrink-0 project-card-wrapper"
                    data-project-index={i % topProjects.length}
                  >
                    <div
                      className="mx-auto w-full"
                      style={{ maxWidth: "700px" }}
                    >
                      <ProjectCard
                        href={`/projects/${project.id}`}
                        imageSrc={imageSrc}
                        imageAlt={project.name || "Project"}
                        title={`"${project.name || "Untitled Project"}"`}
                        category={project.category}
                        completion={
                          project.createdAt
                            ? new Date(project.createdAt).toLocaleDateString(
                                "en-US",
                                { month: "long", year: "numeric" },
                              )
                            : "Recently"
                        }
                        location={
                          project.overview
                            ? project.overview.substring(0, 50) +
                              (project.overview.length > 50 ? "..." : "")
                            : "Details coming soon"
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Project card sizing - larger on mobile for better visibility */
        .project-card-wrapper {
          /* nearly full-bleed on small devices with comfortable side padding */
          width: calc(100vw - 2rem);
          min-width: calc(100vw - 2rem);
          max-width: 720px;
        }

        @media (min-width: 640px) {
          .project-card-wrapper {
            /* slightly narrower on small tablets to allow part of next card to peek */
            width: calc((100vw - 4rem) / 1.1);
            min-width: calc((100vw - 4rem) / 1.1);
            max-width: 840px;
          }
        }

        @media (min-width: 1024px) {
          .project-card-wrapper {
            /* desktop: multiple cards visible */
            width: calc((100vw - 8rem) / 2.2);
            min-width: calc((100vw - 8rem) / 2.2);
          }
        }

        @media (min-width: 1280px) {
          .project-card-wrapper {
            width: calc((100vw - 12rem) / 3);
            min-width: calc((100vw - 12rem) / 3);
          }
        }

        /* Marquee styles */
        .marquee {
          width: 100%;
          overflow: hidden;
          padding: 2.5rem 1.5rem;
        }

        .marquee-track {
          display: flex;
          align-items: stretch;
          gap: 1rem;
          width: max-content;
          will-change: transform;
          /* We'll shift the whole track left by 50% (since items duplicated) */
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .marquee-track:hover,
        .marquee-track:focus-within {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
