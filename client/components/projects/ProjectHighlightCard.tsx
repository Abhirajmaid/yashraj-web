"use client";

import Image from "next/image";
import { resolveImageSrc } from "@/lib/getImageSrc";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Project } from "@/data/projects";
import BlurGradient from "@/components/common/BlurGradient";

type ProjectHighlightCardProps = {
  project: Project;
};

const CARD_GRADIENT =
  "linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.92) 18%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%)";

export function ProjectHighlightCard({ project }: ProjectHighlightCardProps) {
  const categoryLabel = project.category?.trim() || "Project";

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl">
      <div className="relative h-[28rem] min-h-[420px] sm:h-[30rem] md:h-[560px] lg:h-[600px] w-full">
        {project.mainImage ? (
          <Image
            src={resolveImageSrc(project.mainImage)}
            alt={project.mainImageAlt ?? project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-brand-gray-light/30 flex items-center justify-center text-sm font-semibold text-brand-foreground/60">
            Primary image coming soon
          </div>
        )}

        <BlurGradient position="bottom" height="62%" blur={0} gradientCSS={CARD_GRADIENT} />

        <div className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-6 sm:bottom-6 z-20 text-white">
          <span className="inline-block mb-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-dark shadow-sm">
            {categoryLabel}
          </span>
          <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-white/90 line-clamp-2 hidden sm:block">
            {project.description.join(" ")}
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-dark shadow-sm transition hover:shadow-md"
            >
              Learn More
              <Icon icon="solar:arrow-right-bold" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <Icon icon="mdi:email-outline" />
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
