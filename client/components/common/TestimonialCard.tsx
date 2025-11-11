import Image from "next/image";

type TestimonialCardProps = {
  author: string;
  role?: string;
  quote: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

export function TestimonialCard({
  author,
  role,
  quote,
  title,
  imageSrc,
  imageAlt,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={`flex h-full flex-col gap-6 rounded-[28px] border border-white/40 bg-white/70 p-8 text-[#0E0E0E] shadow-[0_20px_45px_rgba(14,14,14,0.12)] backdrop-blur transition hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(14,14,14,0.16)] ${className ?? ""}`}
    >
      <div className="flex justify-start">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#f21b29]/40 bg-[#D2FDFF] shadow-[0_10px_20px_rgba(14,14,14,0.15)]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-[#0E0E0E]/75">{quote}</p>
      <div className="mt-auto">
        <p className="text-sm font-semibold">{author}</p>
        {role ? (
          <p className="text-xs uppercase tracking-[0.3em] text-[#0E0E0E]/55">
            {role}
          </p>
        ) : null}
      </div>
    </article>
  );
}

