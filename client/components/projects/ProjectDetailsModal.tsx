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
    return () => window.removeEventListener("keydown", onKey);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 mx-4 max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
          >
            <Icon icon="mdi:close" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 w-full p-4">
            {current ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded">
                <Image
                  src={resolveImageSrc(current.src)}
                  alt={current.alt ?? project.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center bg-gray-50 text-sm text-gray-500">
                No images available
              </div>
            )}

            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIndex((i) => clampIndex(i - 1))}
                  className="rounded-full border p-2 shadow-sm"
                >
                  <Icon icon="mdi:chevron-left" />
                </button>
                <button
                  onClick={() => setIndex((i) => clampIndex(i + 1))}
                  className="rounded-full border p-2 shadow-sm"
                >
                  <Icon icon="mdi:chevron-right" />
                </button>
                <span className="text-sm text-gray-500">
                  {clampIndex(index) + 1} / {Math.max(1, images.length)}
                </span>
              </div>
            </div>
          </div>

          <aside className="lg:w-1/3 w-full border-l lg:border-l p-4 lg:p-6">
            <div className="mb-4 text-sm text-gray-700">
              {project.description.map((d, idx) => (
                <p key={idx} className="mb-2">
                  {d}
                </p>
              ))}
            </div>

            {project.essentials && project.essentials.length > 0 && (
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-semibold">Essentials</h4>
                <ul className="text-sm text-gray-600">
                  {project.essentials.map((ess, idx) => (
                    <li key={idx} className="mb-1">• {ess}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="mb-2 text-sm font-semibold">Gallery</h4>
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setIndex(idx)}
                    className={`relative h-20 w-full overflow-hidden rounded border ${clampIndex(index) === idx ? "ring-2 ring-brand-primary" : ""}`}
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
  );
}

