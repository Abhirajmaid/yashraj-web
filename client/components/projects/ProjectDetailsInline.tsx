"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Project } from "@/data/projects";
import { resolveImageSrc } from "@/lib/getImageSrc";
import Link from "next/link";

type Props = {
  project: Project;
  onBack?: () => void;
  /** When set, "Back to projects" is a link to this href (e.g. "/projects") instead of a button. */
  backHref?: string;
};

export function ProjectDetailsInline({ project, onBack, backHref }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [project.id]);

  // Use allImages from backend (no primary/lifestyle/city distinction). Fallback to legacy list if missing.
  const images =
    project.allImages && project.allImages.length > 0
      ? project.allImages
      : (() => {
          const seen = new Set<string>();
          return [
            ...(project.mainImage
              ? [{ src: project.mainImage, alt: project.mainImageAlt ?? project.title }]
              : []),
            ...(project.secondaryImages ?? []),
            ...(project.gallery ?? []),
          ]
            .map((img) =>
              typeof img === "string" ? { src: img, alt: project.title } : img
            )
            .filter((img) => {
              if (seen.has(img.src)) return false;
              seen.add(img.src);
              return true;
            });
        })();

  const clampIndex = (i: number) => {
    if (images.length === 0) return 0;
    if (i < 0) return images.length - 1;
    if (i >= images.length) return 0;
    return i;
  };

  const current = images[clampIndex(index)];

  // Same dark bottom gradient as project cards for consistent look
  const imageGradient =
    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 100%)";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-6 bg-gray-50/80">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary transition"
            aria-label="Back to projects"
          >
            <Icon icon="mdi:arrow-left" className="text-lg shrink-0" />
            <span className="hidden sm:inline">Back to projects</span>
            <span className="sm:hidden">Back</span>
          </Link>
        ) : (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary transition"
            aria-label="Back to projects"
          >
            <Icon icon="mdi:arrow-left" className="text-lg" />
            Back to projects
          </button>
        )}
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        >
          CONTACT
          <Icon icon="mdi:arrow-right" className="text-lg" />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 w-full p-4 sm:p-6">
          {current ? (
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={resolveImageSrc(current.src)}
                alt={current.alt ?? project.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {/* Dark gradient from bottom (like home/project cards) so head & controls show nicely */}
              <div
                className="pointer-events-none absolute left-0 right-0 bottom-0 h-[58%] rounded-b-xl"
                style={{
                  background: imageGradient,
                }}
                aria-hidden
              />
            </div>
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-500">
              No images available
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIndex((i) => clampIndex(i - 1))}
                className="rounded-full border border-gray-200 p-2.5 shadow-sm hover:bg-gray-50 transition"
                aria-label="Previous image"
              >
                <Icon icon="mdi:chevron-left" className="text-xl" />
              </button>
              <button
                onClick={() => setIndex((i) => clampIndex(i + 1))}
                className="rounded-full border border-gray-200 p-2.5 shadow-sm hover:bg-gray-50 transition"
                aria-label="Next image"
              >
                <Icon icon="mdi:chevron-right" className="text-xl" />
              </button>
              <span className="text-sm text-gray-500 min-w-[4rem]">
                {clampIndex(index) + 1} / {Math.max(1, images.length)}
              </span>
            </div>
          </div>
        </div>

        <aside className="lg:w-1/3 w-full border-t lg:border-t-0 lg:border-l border-gray-100 p-4 sm:p-6 bg-white">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            {project.title}
          </h1>
          <div className="mb-4 text-sm text-gray-700 space-y-2">
            {project.description.map((d, idx) => (
              <p key={idx}>{d}</p>
            ))}
          </div>

          {project.essentials && project.essentials.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-900">
                Essentials
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {project.essentials.map((ess, idx) => (
                  <li key={idx}>• {ess}</li>
                ))}
              </ul>
            </div>
          )}

          {images.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-900">
                All images ({images.length})
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setIndex(idx)}
                    className={`relative aspect-square w-full overflow-hidden rounded-lg border-2 transition ${
                      clampIndex(index) === idx
                        ? "border-brand-primary ring-1 ring-brand-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={resolveImageSrc(img.src)}
                      alt={img.alt ?? project.title}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
