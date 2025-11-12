type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const alignment =
    align === "center"
      ? "items-center text-center"
      : align === "right"
        ? "items-end text-right"
        : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className ?? ""}`}>
      {eyebrow ? (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.35em] text-[#FFD700]/75 ${eyebrowClassName ?? ""}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-4xl font-semibold leading-tight text-[#0E0E0E] sm:text-[2.75rem] ${titleClassName ?? ""}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-xl text-base leading-relaxed text-[#0E0E0E]/70 ${descriptionClassName ?? ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

