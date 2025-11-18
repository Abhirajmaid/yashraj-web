"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

type GalleryImage = {
  src: string;
  alt: string;
};

type GalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  title: string;
  currentIndex?: number;
  onNavigate?: (index: number) => void;
};

export function GalleryModal({
  isOpen,
  onClose,
  images,
  title,
  currentIndex = 0,
  onNavigate,
}: GalleryModalProps) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !currentImage) return null;

  const handlePrevious = () => {
    if (onNavigate) {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      onNavigate(newIndex);
    }
  };

  const handleNext = () => {
    if (onNavigate) {
      const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      onNavigate(newIndex);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center mb-0 justify-center bg-black/60 backdrop-blur-sm px-4 pt-4 pb-0"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-6xl flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex w-full items-center justify-between text-white">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-white/70">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            <Icon
              icon="solar:close-circle-bold"
              className="text-2xl text-white"
            />
          </button>
        </div>

        {/* Main Image Container */}
        <div className="relative w-full">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          {/* Navigation Buttons - Positioned relative to image */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-full bg-black/50 backdrop-blur-sm transition hover:bg-black/70"
                aria-label="Previous image"
              >
                <Icon
                  icon="solar:arrow-left-linear"
                  className="text-2xl text-white"
                />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-full bg-black/50 backdrop-blur-sm transition hover:bg-black/70"
                aria-label="Next image"
              >
                <Icon
                  icon="solar:arrow-right-linear"
                  className="text-2xl text-white"
                />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="mt-6 flex w-full justify-center gap-3 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onNavigate?.(index)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  index === currentIndex
                    ? "border-white"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
