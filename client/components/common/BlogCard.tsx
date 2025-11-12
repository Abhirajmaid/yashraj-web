import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  href: string;
  title: string;
  date: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  tag?: string;
};

export function BlogCard({
  href,
  title,
  date,
  excerpt,
  imageSrc,
  imageAlt,
  tag = "Feature blog",
}: BlogCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[28px] border border-[#FFD700]/30 bg-white/80 p-4 text-[#0E0E0E] shadow-[0_18px_45px_rgba(14,14,14,0.12)] backdrop-blur transition hover:-translate-y-2 hover:shadow-[0_24px_65px_rgba(14,14,14,0.16)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-[#0E0E0E] backdrop-blur">
          {tag}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <time className="text-xs uppercase tracking-[0.25em] text-[#0E0E0E]/60">
          {date}
        </time>
        <h3 className="text-lg font-semibold leading-snug">{title}</h3>
        <p className="text-sm leading-relaxed text-[#0E0E0E]/70">{excerpt}</p>
      </div>
      <Link
        href={href}
        className="mt-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#f21b29] transition hover:gap-3"
      >
        Read more
        <span className="text-sm">↗</span>
      </Link>
    </article>
  );
}

