"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Project } from "@/data/projects";
import { useEnquiryModal } from "@/contexts/EnquiryModalContext";

type ProjectHighlightCardProps = {
  project: Project;
};

export function ProjectHighlightCard({ project }: ProjectHighlightCardProps) {
  const { openModal } = useEnquiryModal();

  return (
    <>
      <div className="space-y-8 sm:space-y-12">
        {/* Intro copy */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="max-w-xl space-y-4 text-left">
            <p className="text-xs sm:text-sm uppercase tracking-wide text-[#0E0E0E]/45">
              Project Highlight
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E0E0E]">
              {project.title}
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-1 mt-6 lg:mt-12 text-left lg:text-right text-sm sm:text-base text-[#0E0E0E]/70">
            {project.description.map((desc, index) => (
              <span key={index}>{desc}</span>
            ))}
          </div>
        </div>

        {/* Gallery + details */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_36px_80px_rgba(14,14,14,0.22)] lg:flex-[0_0_620px] lg:max-w-[620px]">
            <div className="relative aspect-square w-full">
              {project.mainImage ? (
                <Image
                  src={project.mainImage}
                  alt={project.mainImageAlt ?? project.title}
                  fill
                  className="object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#0E0E0E]/5 text-sm font-semibold text-[#0E0E0E]/60">
                  Primary image coming soon
                </div>
              )}
            </div>
          </div>

          <div className="flex h-full flex-col gap-4 sm:gap-6 lg:flex-1">
            <div className="flex w-full flex-row sm:flex-row items-start justify-start lg:justify-end gap-3 sm:gap-4">
              {(project.secondaryImages ?? []).length > 0 ? (
                (project.secondaryImages ?? []).map((img, index) => (
                  <div
                    key={index}
                    className="group relative w-full sm:w-auto overflow-hidden rounded-xl sm:rounded-2xl shadow-[0_20px_55px_rgba(14,14,14,0.18)]"
                    style={{
                      width: "100%",
                      maxWidth: index === 0 ? "250px" : "330px",
                      height: "180px",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                ))
              ) : (
                <div className="flex h-[180px] w-full items-center justify-center rounded-xl border border-dashed border-[#0E0E0E]/20 text-xs font-semibold uppercase tracking-wide text-[#0E0E0E]/30">
                  Secondary images coming soon
                </div>
              )}
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-[#0E0E0E]/12 bg-white/90 p-4 sm:p-6 text-left shadow-[0_30px_70px_rgba(14,14,14,0.18)] lg:mt-auto">
              <h3 className="text-base sm:text-lg font-semibold text-[#0E0E0E]">
                Project Essentials
              </h3>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#0E0E0E]/75">
                {project.essentials.map((essential, index) => (
                  <li key={index}>• {essential}</li>
                ))}
              </ul>
              {/* Action Buttons */}
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white transition hover:bg-brand-primary/90"
                >
                 
                  <span>Learn more</span>
                </Link>
                <button
                  onClick={openModal}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[#0E0E0E] bg-transparent px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#0E0E0E] transition hover:bg-[#0E0E0E] hover:text-white"
                >
                  <Icon
                    icon="mdi:email-outline"
                    className="text-base sm:text-lg"
                  />
                  <span>Enquire</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
