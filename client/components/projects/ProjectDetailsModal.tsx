 "use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Project } from "@/data/projects";
import { resolveImageSrc } from "@/lib/getImageSrc";

type Props = {
  open: boolean;
  project?: Project | null;
  onClose: () => void;
};

export default function ProjectDetailsModal({ open, project, onClose }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    setIndex(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => i + 1);
      if (e.key === "ArrowLeft") setIndex((i) => i - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !project) return null;

  // Include primary, secondary (lifestyle/city), and gallery so all dashboard images appear
  const seen = new Set<string>();
  const images = [
    ...(project.mainImage ? [{ src: project.mainImage, alt: project.mainImageAlt ?? project.title }] : []),
    ...(project.secondaryImages ?? []),
    ...(project.gallery ?? []),
  ]
    .map((img) => (typeof img === "string" ? { src: img, alt: project.title } : img))
    .filter((img) => {
      if (seen.has(img.src)) return false;
      seen.add(img.src);
      return true;
    });

  const clampIndex = (i: number) => {
    if (images.length === 0) return 0;
    if (i < 0) return images.length - 1;
    if (i >= images.length) return 0;
    return i;
  };

  const current = images[clampIndex(index)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal: full-screen on mobile, centered box on desktop */}
      <div
        className="relative z-10 flex flex-col w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-6xl sm:mx-4 sm:rounded-2xl bg-white shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        {/* Sticky header - always visible on scroll */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-6 sm:py-4 bg-white">
          <h2 id="project-modal-title" className="text-base sm:text-lg font-semibold text-gray-900 pr-2 truncate">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full p-2.5 text-gray-600 hover:bg-gray-100 active:bg-gray-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Icon icon="mdi:close" className="text-xl" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 w-full p-4 sm:p-6 lg:p-6">
              {current ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg sm:rounded-xl">
                  <Image
                    src={resolveImageSrc(current.src)}
                    alt={current.alt ?? project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-48 sm:h-64 items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-500">
                  No images available
                </div>
              )}

              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIndex((i) => clampIndex(i - 1))}
                    className="rounded-full border border-gray-200 p-2.5 shadow-sm hover:bg-gray-50 active:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Previous image"
                  >
                    <Icon icon="mdi:chevron-left" className="text-xl" />
                  </button>
                  <button
                    onClick={() => setIndex((i) => clampIndex(i + 1))}
                    className="rounded-full border border-gray-200 p-2.5 shadow-sm hover:bg-gray-50 active:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Next image"
                  >
                    <Icon icon="mdi:chevron-right" className="text-xl" />
                  </button>
                  <span className="text-sm text-gray-500">
                    {clampIndex(index) + 1} / {Math.max(1, images.length)}
                  </span>
                </div>
              </div>
            </div>

            <aside className="lg:w-1/3 w-full border-t lg:border-t-0 lg:border-l border-gray-100 p-4 sm:p-6 lg:p-6">
              <div className="mb-4 text-sm text-gray-700">
                {project.description.map((d, idx) => (
                  <p key={idx} className="mb-2">
                    {d}
                  </p>
                ))}
              </div>

              {project.essentials && project.essentials.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-gray-900">Essentials</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {project.essentials.map((ess, idx) => (
                      <li key={idx}>• {ess}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="mb-2 text-sm font-semibold text-gray-900">Gallery</h4>
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setIndex(idx)}
                      className={`relative h-16 sm:h-20 w-full overflow-hidden rounded-lg border-2 transition min-h-[44px] sm:min-h-0 ${
                        clampIndex(index) === idx
                          ? "border-brand-primary ring-2 ring-brand-primary"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={resolveImageSrc(img.src)}
                        alt={img.alt ?? project.title}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

