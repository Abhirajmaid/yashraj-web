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
      className="relative overflow-hidden bg-[#031B4E] text-white pt-12 sm:pt-14"
      data-hero-root
    >
      {/* Upper Block: Text Left, Image Right */}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-1">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </div>
        <div className="flex-1">
          <div className="relative overflow-hidden rounded-2xl aspect-video">
            <Image
              src={upperImage.src}
              alt={upperImage.alt}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Lower Block: Image Left, Text Right */}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-16 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-1">
          <div className="relative overflow-hidden rounded-2xl aspect-video">
            <Image
              src={lowerImage.src}
              alt={lowerImage.alt}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <p className="text-lg leading-relaxed text-white/90 lg:text-xl">
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
      </div>
    </section>
  );
}

