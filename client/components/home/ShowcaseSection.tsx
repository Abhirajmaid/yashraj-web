import Image from "next/image";
import { resolveImageSrc } from "@/lib/getImageSrc";
import Button from "@/components/common/Button";
import { StatsGrid } from "./StatsGrid";

const stats = [
  { id: "projects-complete", value: "200+", label: "Projects" },
  { id: "expert-teams", value: "100+", label: "Expert teams" },
];

export function ShowcaseSection() {
  return (
    <section className="relative w-full min-h-screen text-neutral-900">
      {/* Full viewport height, no y padding */}
      <div className="relative flex min-h-screen w-full items-center justify-center">
        <Image
          src={resolveImageSrc("/images/about.jpg")}
          alt="Yashraj architectural showcase"
          fill
          className="object-cover"
          priority
        />

        {/* Content: full-height flex center, no vertical padding; responsive spacing */}
        <div className="relative z-20 flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:py-0">
          <div className="mx-auto w-full max-w-3xl">
            <p className="mb-2 text-center text-xs font-medium tracking-widest text-white/75 uppercase sm:mb-4 sm:text-sm md:text-center">
              Our Projects
            </p>
            <h1 className="text-center text-2xl font-extrabold leading-tight text-black sm:text-3xl md:text-4xl lg:text-5xl">
              Building beyond horizons infrastructure that lasts, connects, and
              inspires
            </h1>
            <p className="mt-2 text-center text-sm text-black/60 sm:mt-4 sm:text-base md:text-center">
              Yashraj Infrastructure, based in Navi Mumbai, delivers innovative,
              large-scale infrastructure projects across Maharashtra, supplying
              complete solutions since 2008.
            </p>
            <div className="mt-4 flex justify-center sm:mt-6">
              <Button
                link="/services"
                type="primary"
                size="sm"
                className="gap-3 pl-3 text-sm shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
              >
                Learn more
              </Button>
            </div>

            {/* Stats: full width, equal columns, centered */}
            <div className="relative z-10 mx-auto mt-4 w-full max-w-7xl px-0 sm:mt-6 lg:px-10 xl:px-14">
              <StatsGrid stats={stats} className="gap-y-4 sm:gap-y-6 lg:gap-y-8" />
            </div>
          </div>
        </div>

        {/* subtle overlay to darken image for legibility */}
        <div className="absolute inset-0 bg-white pointer-events-none" />
      </div>
    </section>
  );
}
