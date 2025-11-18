import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

type BlogCarouselCardProps = {
  href: string;
  title: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  isActive?: boolean;
};

export function BlogCarouselCard({
  href,
  title,
  date,
  imageSrc,
  imageAlt,
  isActive = false,
}: BlogCarouselCardProps) {
  return (
    <Link
      href={href}
      className={`group relative block h-full w-full overflow-hidden rounded-2xl transition-all duration-500 ${
        isActive
          ? "scale-100 opacity-100 shadow-2xl"
          : "scale-95 opacity-70 hover:opacity-90"
      }`}
    >
      <div className="relative h-full w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-white">
          <time className="text-xs uppercase tracking-[0.12em] text-white/70">
            {date}
          </time>
          <h3
            className={`font-semibold leading-tight text-white transition-all duration-300 ${
              isActive
                ? "text-xl sm:text-2xl"
                : "text-base sm:text-lg group-hover:text-xl"
            }`}
          >
            {title}
          </h3>
          
          {/* Read More Indicator */}
          {isActive && (
            <div className="mt-2 flex items-center gap-2 text-sm font-medium text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span>Read more</span>
              <Icon
                icon="solar:arrow-right-up-bold"
                className="text-sm"
                style={{ transform: "rotate(45deg)" }}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

