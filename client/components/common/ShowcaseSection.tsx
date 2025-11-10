import Image from "next/image";
import { IconBadge } from "./IconBadge";
import { PrimaryButton } from "./PrimaryButton";
import { StatsGrid } from "./StatsGrid";

const stats = [
  { id: "projects-complete", value: "50+", label: "Project complete" },
  { id: "expert-teams", value: "100+", label: "Expert teams" },
  { id: "project-value-1", value: "$3.5M", label: "Project value" },
  { id: "project-value-2", value: "$3.5M", label: "Project value" },
];

export function ShowcaseSection() {
  return (
    <section className="relative -mt-20 bg-white pb-24 pt-28 text-neutral-900 sm:pb-28 sm:pt-32">
      <div className="absolute inset-x-0 top-0 h-20 rounded-t-[48px] bg-white" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:px-10 xl:px-14">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr),minmax(0,0.95fr)] lg:items-center">
          <div className="space-y-8">
            <header className="space-y-6">
              <p className="text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl">
                Experience innovative architecture that transforms your vision
                into reality
              </p>
              <p className="max-w-xl text-base leading-relaxed text-neutral-500">
                We craft inspiring spaces that blend cutting-edge design with
                enduring functionality, turning your vision into reality.
              </p>
            </header>
            <PrimaryButton href="#learn-more" variant="dark">
              Learn more
            </PrimaryButton>
          </div>
          <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px]">
            <div className="overflow-hidden rounded-[32px] border border-neutral-200 bg-neutral-100 shadow-[0_30px_60px_rgba(15,23,42,0.15)]">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/hero-building.svg"
                  alt="Project skyline"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <IconBadge
              icon="/globe.svg"
              alt="Global reach"
              className="absolute -top-7 left-24 shadow-[0_15px_30px_rgba(15,23,42,0.25)]"
            />
            <IconBadge
              icon="/window.svg"
              alt="Project window"
              className="absolute top-1/2 right-0 -translate-y-1/2 shadow-[0_15px_30px_rgba(15,23,42,0.25)]"
            />
          </div>
        </div>
        <StatsGrid stats={stats} className="gap-y-12" />
      </div>
    </section>
  );
}
