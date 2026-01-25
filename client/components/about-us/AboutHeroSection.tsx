import Button from "@/components/common/Button";

type AboutHeroSectionProps = {
  title: string;
  upperImage: {
    src: string;
    alt: string;
  };
  lowerImage: {
    src: string;
    alt: string;
  };
  description: string;
  buttonText?: string;
  buttonLink?: string;
};

const STAT_CARDS = [
  {
    value: "25+",
    label: "Years of combined engineering and construction experience.",
  },
  {
    value: "60+",
    label: "Large and mid‑scale projects delivered across bridges, roads and urban infrastructure.",
  },
  {
    value: "10+",
    label: "Cities and regions served with on‑ground project teams.",
  },
];

export function AboutHeroSection({
  title,
  upperImage,
  description,
  buttonText = "Our services",
  buttonLink = "/services",
}: AboutHeroSectionProps) {
  const bgImage = upperImage?.src || "/images/red bridge.jpeg";

  return (
    <section
      className="relative min-h-[85vh] overflow-hidden text-white pt-16 sm:pt-20"
      data-hero-root
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        <div className="absolute inset-0 bg-brand-primary/50" />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/35 to-transparent" />
      </div>

      {/* Content - full width container */}
      <div className="relative z-10 flex min-h-[85vh] flex-col justify-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-24 xl:px-14">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
            {/* Left: headline and CTA */}
            <div className="flex-1 space-y-6 lg:max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Who we are
              </p>
              <h1 className="text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-5xl xl:text-6xl">
                {title}
              </h1>
              <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                {description}
              </p>
              <Button
                link={buttonLink}
                type="secondary"
                size="lg"
                className="w-fit border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-dark uppercase tracking-wide"
              >
                {buttonText}
              </Button>
            </div>

            {/* Right: stat cards */}
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {STAT_CARDS.map((card) => (
                  <div
                    key={card.value}
                    className="rounded-2xl border border-white/25 bg-white/10 px-5 py-5 backdrop-blur-lg transition hover:bg-white/15 sm:px-6 sm:py-6"
                  >
                    <p className="text-3xl font-semibold text-white sm:text-4xl">
                      {card.value}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-white/85 sm:text-sm">
                      {card.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

