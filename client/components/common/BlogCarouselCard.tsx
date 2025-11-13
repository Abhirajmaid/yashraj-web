import Image from "next/image";
import Link from "next/link";

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
      className={`group relative block overflow-hidden rounded-[28px] bg-white shadow-[0_28px_60px_rgba(14,14,14,0.25)] transition-all duration-300 ${
        isActive
          ? "scale-100 opacity-100"
          : "scale-95 opacity-70 hover:scale-[0.97] hover:opacity-85"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={isActive}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/20 via-transparent to-transparent" />
      </div>
      <div className="p-6 text-[#0E0E0E]">
        <time className="text-sm text-[#0E0E0E]/60">{date}</time>
        <h3 className="mt-2 text-xl font-semibold leading-tight">{title}</h3>
      </div>
    </Link>
  );
}

