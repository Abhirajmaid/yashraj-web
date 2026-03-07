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

  // Include primary, lifestyle/city (secondary), and gallery so all dashboard images appear
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
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-black/5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/80 px-4 py-4 sm:px-6">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-brand-primary"
            aria-label="Back to projects"
          >
            <Icon icon="mdi:arrow-left" className="text-lg" />
            Back to projects
          </Link>
        ) : (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-brand-primary"
            aria-label="Back to projects"
          >
            <Icon icon="mdi:arrow-left" className="text-lg" />
            Back to projects
          </button>
        )}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
            {project.category || "Project"}
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Contact
            <Icon icon="mdi:arrow-right" className="text-lg" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <section className="border-b border-gray-100 p-4 sm:p-6 lg:border-b-0 lg:border-r">
          {current ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 sm:aspect-[16/10]">
              <Image
                src={resolveImageSrc(current.src)}
                alt={current.alt ?? project.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 66vw, 100vw"
              />
            </div>
          ) : (
            <div className="flex h-72 items-center justify-center rounded-2xl bg-gray-50 text-sm text-gray-500">
              No images available
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIndex((i) => clampIndex(i - 1))}
                className="rounded-full border border-gray-200 p-2 shadow-sm transition hover:bg-gray-50"
                aria-label="Previous image"
              >
                <Icon icon="mdi:chevron-left" />
              </button>
              <button
                onClick={() => setIndex((i) => clampIndex(i + 1))}
                className="rounded-full border border-gray-200 p-2 shadow-sm transition hover:bg-gray-50"
                aria-label="Next image"
              >
                <Icon icon="mdi:chevron-right" />
              </button>
              <span className="text-sm font-medium text-gray-500">
                {clampIndex(index) + 1} / {Math.max(1, images.length)}
              </span>
            </div>
          </div>

          {images.length > 0 && (
            <div className="mt-4">
              <div className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setIndex(idx)}
                    className={`relative h-20 min-w-20 overflow-hidden rounded-xl border-2 transition sm:h-24 sm:min-w-24 lg:min-w-0 ${
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
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <aside className="p-4 sm:p-6">
          <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            {project.title}
          </h1>
          {project.location ? (
            <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              <Icon icon="solar:map-point-bold" className="text-sm" />
              {project.location}
            </p>
          ) : null}

          <div className="mt-5 space-y-3 text-sm leading-relaxed text-gray-700 sm:text-base">
            {project.description.map((d, idx) => (
              <p key={idx}>{d}</p>
            ))}
          </div>

          {project.essentials && project.essentials.length > 0 && (
            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
                Key Highlights
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {project.essentials.map((ess, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Icon
                      icon="mdi:check-circle-outline"
                      className="mt-0.5 shrink-0 text-brand-primary"
                    />
                    <span>{ess}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
