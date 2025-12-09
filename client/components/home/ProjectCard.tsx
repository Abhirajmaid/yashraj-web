import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Icon } from "@iconify/react";

type ProjectCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  completion: string;
  location: string;
  badge?: ReactNode;
};

export function ProjectCard({
  href,
  imageSrc,
  imageAlt,
  title,
  completion,
  location,
  badge,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-3xl bg-white transition-all duration-300 focus:outline-none focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
    >
      {/* Image Container */}
      <div className="relative isolate aspect-4/3 w-full overflow-hidden">
        {imageSrc && imageSrc.trim() !== "" ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-gray-light/20">
            <Icon icon="solar:gallery-bold" className="text-4xl text-brand-gray" />
          </div>
        )}

        {/* Gradient Overlay - Dark only at bottom */}
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark/70 via-transparent to-transparent" />

        {/* Top Badge and Icon */}
        <div className="absolute right-5 top-5 flex items-center gap-3 z-10">
          {badge}
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-primary text-white shadow-[0_8px_20px_rgba(var(--color-primary-rgb),0.4)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-[0_12px_30px_rgba(var(--color-primary-rgb),0.5)]">
            <Icon icon="solar:arrow-right-up-linear" className="text-xl" />
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-6 pb-6 text-white">
          <p className="text-xl font-bold leading-tight transition-transform duration-300 group-hover:translate-y-[-2px]">
            {title}
          </p>
          <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex items-center gap-2 text-white/90">
              <Icon icon="solar:map-point-bold" className="text-base" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
