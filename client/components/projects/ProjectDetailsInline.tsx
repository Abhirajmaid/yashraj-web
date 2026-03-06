"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Project } from "@/data/projects";
import { resolveImageSrc } from "@/lib/getImageSrc";
import Link from "next/link";

type Props = {
  project: Project;
  onBack: () => void;
};

export function ProjectDetailsInline({ project, onBack }: Props) {
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
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/80">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary transition"
          aria-label="Back to projects"
        >
          <Icon icon="mdi:arrow-left" className="text-lg" />
          Back to projects
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        >
          CONTACT
          <Icon icon="mdi:arrow-right" className="text-lg" />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 w-full p-4 lg:p-6">
          {current ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image
                src={resolveImageSrc(current.src)}
                alt={current.alt ?? project.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-500">
              No images available
            </div>
          )}

          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIndex((i) => clampIndex(i - 1))}
                className="rounded-full border border-gray-200 p-2 shadow-sm hover:bg-gray-50"
                aria-label="Previous image"
              >
                <Icon icon="mdi:chevron-left" />
              </button>
              <button
                onClick={() => setIndex((i) => clampIndex(i + 1))}
                className="rounded-full border border-gray-200 p-2 shadow-sm hover:bg-gray-50"
                aria-label="Next image"
              >
                <Icon icon="mdi:chevron-right" />
              </button>
              <span className="text-sm text-gray-500">
                {clampIndex(index) + 1} / {Math.max(1, images.length)}
              </span>
            </div>
          </div>
        </div>

        <aside className="lg:w-1/3 w-full border-t lg:border-t lg:border-l border-gray-100 p-4 lg:p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{project.title}</h2>
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

          {images.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-900">Gallery</h4>
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setIndex(idx)}
                    className={`relative h-20 w-full overflow-hidden rounded-lg border-2 transition ${
                      clampIndex(index) === idx ? "border-brand-primary ring-1 ring-brand-primary" : "border-gray-200 hover:border-gray-300"
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
        </aside>
      </div>
    </div>
  );
}
