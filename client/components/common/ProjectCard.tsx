import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

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
      className="group relative block overflow-hidden rounded-[28px] shadow-[0_28px_60px_rgba(14,14,14,0.25)] transition-transform hover:-translate-y-2 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD700]"
    >
      <div className="relative isolate aspect-[4/3] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/75 via-[#0E0E0E]/20 to-transparent transition-opacity group-hover:from-[#0E0E0E]/65" />
        <div className="absolute right-5 top-5 flex items-center gap-3">
          {badge}
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f21b29] text-xl text-white shadow-[0_12px_24px_rgba(242,27,41,0.32)] transition-transform group-hover:-translate-y-1">
            ↗
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-6 pb-6 text-[#FFD700]">
          <p className="text-lg font-semibold">{title}</p>
          <div className="text-xs uppercase tracking-[0.25em] text-[#FFD700]/70">
            Completion: {completion}
          </div>
          <div className="text-sm text-[#FFD700]/85">{location}</div>
        </div>
      </div>
    </Link>
  );
}

