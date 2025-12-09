"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/common/Button";

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  index: number;
  link?: string;
};

export function ServiceCard({
  title,
  description,
  image,
  imageAlt,
  index,
  link,
}: ServiceCardProps) {
  const isReversed = index % 2 === 1;
  const serviceNumber = String(index + 1).padStart(2, "0");

  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const baseTransform = isReversed ? "-translate-x-32" : "translate-x-32";

  return (
    <article
      ref={ref}
      className={`relative flex flex-col items-stretch gap-10 lg:flex-row ${
        isReversed ? "lg:flex-row-reverse" : ""
      } transition-transform duration-700 ease-out will-change-transform ${
        isInView ? "translate-x-0 opacity-100" : `${baseTransform} opacity-0`
      }`}
    >
      {/* Image side */}
      <div className="relative w-full overflow-hidden rounded-3xl bg-brand-dark/5 lg:w-[58%] h-[320px] sm:h-[380px] lg:h-[440px]">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-brand-primary/25" />
      </div>

      {/* Content side */}
      <div className="flex w-full flex-col gap-6 lg:w-[42%] p-6 sm:p-8 lg:p-10">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-gray">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-[0.7rem] text-white shadow-sm shadow-brand-primary/40">
              {serviceNumber}
            </span>
            Core Service
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-text-dark">{title}</h3>
          <p className="text-sm sm:text-base leading-relaxed text-brand-foreground/80">{description}</p>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-brand-gray">
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-gray-light/60 bg-white/80 px-3 py-1 uppercase tracking-[0.18em]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
            End‑to‑end delivery
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-gray-light/40 bg-white/70 px-3 py-1 uppercase tracking-[0.18em]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
            Quality & safety first
          </span>
        </div>

        {link && (
          <div className="mt-4">
            <Button
              link={link}
              type="primary"
              size="md"
              className="w-full sm:w-auto"
            >
              Learn More
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

