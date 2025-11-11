import Link from "next/link";
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
];

export function ProjectsSection() {
  return (
    <section className="relative isolate mt-16 overflow-hidden bg-[#f21b29] text-[#D2FDFF]">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-white" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 lg:px-10 xl:px-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <SectionHeader
            eyebrow="Our Projects"
            title="Building Tomorrow's Landmarks with Expert Precision."
          />
          <div className="flex max-w-xl flex-col gap-6 text-[#D2FDFF]/85 lg:items-end lg:text-right">
            <p className="text-base leading-relaxed">
              The types of construction projects our company specializes in include
              residential, commercial, industrial, and renovation projects – each
              delivered with meticulous planning and craftsmanship.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="grid h-12 w-12 place-items-center rounded-full border border-[#D2FDFF]/40 text-lg text-[#D2FDFF] transition hover:-translate-y-0.5 hover:bg-[#D2FDFF]/10"
                aria-label="Previous project"
              >
                ←
              </button>
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 rounded-full bg-[#D2FDFF] px-5 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0E0E0E] shadow-[0_12px_28px_rgba(14,14,14,0.22)] transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2FDFF]"
              >
                Next
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.href} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

