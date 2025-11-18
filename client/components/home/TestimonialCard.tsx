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
      className={`flex h-full flex-col gap-4 sm:gap-6 rounded-2xl sm:rounded-[28px] border border-white/40 bg-white/70 p-6 sm:p-8 text-brand-dark backdrop-blur transition hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(var(--color-dark-rgb),0.16)] ${
        className ?? ""
      }`}
    >
      <div className="flex justify-start">
        <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-full border border-brand-primary/40 bg-brand-secondary shadow-[0_10px_20px_rgba(var(--color-dark-rgb),0.15)]">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>
      </div>
      <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-brand-dark/75">{quote}</p>
      <div className="mt-auto">
        <p className="text-sm font-semibold">{author}</p>
        {role ? (
          <p className="text-xs uppercase tracking-wide text-brand-dark/55">
            {role}
          </p>
        ) : null}
      </div>
    </article>
  );
}
