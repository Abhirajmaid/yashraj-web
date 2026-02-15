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
      {/* Fullscreen hero image */}
      <div className="relative h-screen w-full">
        <Image
          src={resolveImageSrc("/images/about.jpg")}
          alt="Yashraj architectural showcase"
          fill
          className="object-cover"
          priority
        />

        {/* Centered content overlay */}
        <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-medium tracking-widest text-white/75 uppercase">
              Our Projects
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl md:text-5xl">
              Building beyond horizons infrastructure that lasts, connects, and
              inspires
            </h1>
            <p className="mt-4 text-base text-black/60">
              Yashraj Infrastructure, based in Navi Mumbai, delivers innovative,
              large-scale infrastructure projects across Maharashtra, supplying
              complete solutions since 2008.
            </p>
            <div className="mt-6 flex justify-center">
              <Button
                link="/services"
                type="primary"
                size="sm"
                className="gap-3 pl-3 text-sm shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
              >
                Learn more
              </Button>
            </div>

            {/* Stats below the hero */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-10 xl:px-14">
              <StatsGrid stats={stats} className="gap-y-12" />
            </div>
          </div>
        </div>

        {/* subtle overlay to darken image for legibility */}
        <div className="absolute inset-0 bg-white pointer-events-none" />
      </div>
    </section>
  );
}
