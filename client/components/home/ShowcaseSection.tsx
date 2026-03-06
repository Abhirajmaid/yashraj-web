import Image from "next/image";
import { resolveImageSrc } from "@/lib/getImageSrc";
import Button from "@/components/common/Button";
import { StatsGrid } from "./StatsGrid";

const stats = [
  { id: "projects-complete", value: "50+", label: "Project complete" },
  { id: "expert-teams", value: "100+", label: "Expert teams" },
  { id: "project-value-1", value: "₹3.5M", label: "Project value" },
  { id: "project-value-2", value: "₹3.5M", label: "Project value" },
];

export function ShowcaseSection() {
  return (
    <section className="relative w-full text-neutral-900">
      {/* On mobile: container grows with content to prevent overlap; min height so image shows. On md+: fixed min height. */}
      <div className="relative min-h-[45vh] w-full md:min-h-[70vh]">
        <Image
          src={resolveImageSrc("/images/about.jpg")}
          alt="Yashraj architectural showcase"
          fill
          className="object-cover"
          priority
        />

        {/* Content: on mobile relative (in flow) so section height fits content; on md+ absolute centered */}
        <div className="relative z-20 flex w-full max-w-7xl items-center justify-center px-4 py-8 md:absolute md:left-1/2 md:top-1/2 md:min-h-0 md:-translate-x-1/2 md:-translate-y-1/2 md:py-0 sm:px-6 sm:py-10">
          <div className="mx-auto w-full max-w-3xl">
            <p className="mb-2 text-xs font-medium tracking-widest text-white/75 uppercase sm:mb-4 sm:text-sm md:text-center">
              Our Projects
            </p>
            <h1 className="text-left text-2xl font-extrabold leading-tight text-black sm:text-3xl md:text-center md:text-4xl lg:text-5xl">
              Building beyond horizons infrastructure that lasts, connects, and
              inspires
            </h1>
            <p className="mt-2 text-left text-sm text-black/60 sm:mt-4 sm:text-base md:text-center">
              Yashraj Infrastructure, based in Navi Mumbai, delivers innovative,
              large-scale infrastructure projects across Maharashtra, supplying
              complete solutions since 2008.
            </p>
            <div className="mt-4 flex justify-start sm:mt-6 md:justify-center">
              <Button
                link="/services"
                type="primary"
                size="sm"
                className="gap-3 pl-3 text-sm shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
              >
                Learn more
              </Button>
            </div>

            {/* Stats below the hero — reduced gap on mobile */}
            <div className="relative z-10 mx-auto mt-6 w-full max-w-7xl px-0 py-4 sm:py-6 lg:px-10 xl:px-14 lg:py-8">
              <StatsGrid stats={stats} className="gap-y-6 sm:gap-y-8 lg:gap-y-12" />
            </div>
          </div>
        </div>

        {/* subtle overlay to darken image for legibility */}
        <div className="absolute inset-0 bg-white pointer-events-none" />
      </div>
    </section>
  );
}
