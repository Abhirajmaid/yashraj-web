type AboutIntroSectionProps = {
  title: string;
  highlightedText?: string;
};

export function AboutIntroSection({
  title,
  highlightedText,
}: AboutIntroSectionProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          {highlightedText ? (
            <>
              <span className="text-gray-400">{title} </span>
              <span className="text-gray-900 font-bold">{highlightedText}</span>
            </>
          ) : (
            title
          )}
        </h2>
      </div>
    </section>
  );
}

