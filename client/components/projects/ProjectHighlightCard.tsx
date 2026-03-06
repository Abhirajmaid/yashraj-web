"use client";

import Image from "next/image";
import { resolveImageSrc } from "@/lib/getImageSrc";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Project } from "@/data/projects";
import { useEnquiryModal } from "@/contexts/EnquiryModalContext";
import BlurGradient from "@/components/common/BlurGradient";

type ProjectHighlightCardProps = {
  project: Project;
};

export function ProjectHighlightCard({ project }: ProjectHighlightCardProps) {
  const { openModal } = useEnquiryModal();

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl">
      <div className="relative h-80 sm:h-96 md:h-[520px] w-full">
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

        <BlurGradient position="bottom" height="50%" blur={0} />

        <div className="absolute left-6 right-6 bottom-6 z-20 text-white">
          <p className="mb-2 text-xs font-medium tracking-widest uppercase text-white/80">
            Project Highlight
          </p>
          <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-white/90 line-clamp-2">
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
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            >
              <Icon icon="mdi:email-outline" />
              Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
