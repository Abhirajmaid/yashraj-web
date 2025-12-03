import Image from "next/image";
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

export function AboutHeroSection({
  title,
  upperImage,
  lowerImage,
  description,
  buttonText = "Our services",
  buttonLink = "/services",
}: AboutHeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden text-white pt-12 sm:pt-14"
      data-hero-root
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/red bridge.jpeg')" }}
        />
        {/* Red theme overlay + subtle dark gradient for readability */}
        <div className="absolute inset-0 bg-brand-primary/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/90 via-[#050816]/40 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 lg:flex-row lg:items-end lg:gap-16">
          {/* Left: Story */}
          <div className="flex-1 space-y-6 max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Who we are
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-white/85">
              {description}
            </p>
            <Button
              link={buttonLink}
              type="secondary"
              size="lg"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#031B4E] uppercase tracking-wide"
            >
              {buttonText}
            </Button>
          </div>

          {/* Right: Quick facts */}
          <div className="flex-1">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md">
                <p className="text-3xl sm:text-4xl font-semibold text-white">25+</p>
                <p className="mt-1 text-xs sm:text-sm text-white/80">
                  Years of combined engineering and construction experience.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md">
                <p className="text-3xl sm:text-4xl font-semibold text-white">60+</p>
                <p className="mt-1 text-xs sm:text-sm text-white/80">
                  Large and mid‑scale projects delivered across bridges, roads and urban infrastructure.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md">
                <p className="text-3xl sm:text-4xl font-semibold text-white">10+</p>
                <p className="mt-1 text-xs sm:text-sm text-white/80">
                  Cities and regions served with on‑ground project teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

