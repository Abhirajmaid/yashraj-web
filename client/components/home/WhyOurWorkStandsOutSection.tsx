import { SectionHeader } from "@/components/common/SectionHeader";
import { Icon } from "@iconify/react";

const points = [
  {
    icon: "mdi:domain",
    text: "Proven execution in government infrastructure projects",
  },
  {
    icon: "mdi:shield-check",
    text: "Strong focus on quality control and compliance",
  },
  {
    icon: "mdi:clock-check",
    text: "Reliable timelines with efficient resource management",
  },
  {
    icon: "mdi:crane",
    text: "Equipped with modern machinery and skilled workforce",
  },
] as const;

export function WhyOurWorkStandsOutSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-brand-dark">
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/8 via-transparent to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-14">
        <SectionHeader
          eyebrow="OUR DIFFERENCE"
          title="Why Our Work Stands Out"
          description="What clients and partners can expect when they work with us on infrastructure and construction projects."
          align="center"
          eyebrowClassName="text-primary text-xs sm:text-sm"
          titleClassName="text-brand-dark text-2xl sm:text-3xl lg:text-4xl"
          descriptionClassName="text-brand-dark/70 max-w-2xl mx-auto text-sm sm:text-base"
        />
        <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((item) => (
            <div
              key={item.text}
              className="group rounded-xl sm:rounded-2xl border border-brand-gray-light/50 bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(var(--color-dark-rgb),0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(var(--color-dark-rgb),0.1)] hover:scale-[1.02]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary transition group-hover:bg-brand-primary/15">
                <Icon icon={item.icon} width={24} height={24} aria-hidden />
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-brand-dark/85">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
