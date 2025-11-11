import Image from "next/image";
import { IconBadge } from "./IconBadge";
import { PrimaryButton } from "./PrimaryButton";
import { SectionHeader } from "./SectionHeader";
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
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:px-10 xl:px-14">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeader
              title="Experience innovative architecture that transforms your vision into reality with enduring craftsmanship"
              description="From bespoke residences to large-scale infrastructure, Yashraj Constructions delivers projects that harmonize aesthetic brilliance with structural integrity. Our multidisciplinary teams collaborate closely with clients to reimagine skylines, elevate communities, and create spaces that stand the test of time."
            />
            <PrimaryButton
              href="#learn-more"
              variant="dark"
              size="sm"
              className="gap-3 self-start px-6 py-3 text-sm shadow-[0_20px_40px_rgba(14,14,14,0.18)] hover:-translate-y-0.5 hover:shadow-[0_30px_50px_rgba(14,14,14,0.22)]"
            >
              Learn more
            </PrimaryButton>
          </div>
          <div className="relative flex w-full justify-end">
            <div className="relative w-full max-w-[420px]">
              <div className="overflow-hidden rounded-[32px] border border-neutral-200 bg-neutral-100 shadow-[0_28px_56px_rgba(15,23,42,0.14)]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/yashrajshowcase.jpg"
                    alt="Yashraj architectural showcase"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <IconBadge
                icon="/globe.svg"
                alt="Global reach"
                className="absolute -top-7 left-20 shadow-[0_15px_28px_rgba(15,23,42,0.22)]"
              />
              <IconBadge
                icon="/window.svg"
                alt="Project window"
                className="absolute top-1/2 right-[-26px] -translate-y-1/2 shadow-[0_15px_28px_rgba(15,23,42,0.22)]"
              />
            </div>
          </div>
        </div>
        <StatsGrid stats={stats} className="gap-y-12" />
      </div>
    </section>
  );
}
