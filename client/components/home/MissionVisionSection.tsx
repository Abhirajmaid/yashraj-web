import { SectionHeader } from "@/components/common/SectionHeader";

const missionVisionPurpose = [
  {
    number: "01",
    title: "Mission",
    description:
      "To deliver exceptional construction and infrastructure solutions that exceed client expectations through innovation, quality craftsmanship, and unwavering commitment to excellence.",
  },
  {
    number: "02",
    title: "Vision",
    description:
      "To be the leading construction company recognized for transforming visions into reality, creating sustainable infrastructure that shapes communities and stands the test of time.",
  },
  {
    number: "03",
    title: "Purpose",
    description:
      "Focused on creativity and precision, we turn ideas into lasting designs that harmonize aesthetic brilliance with structural integrity.",
  },
];

export function MissionVisionSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-brand-dark">
      {/* Top left gradient with primary color */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 xl:px-14">
        <div className="mb-12 sm:mb-16">
          <SectionHeader
            eyebrow="OUR FOUNDATION"
            title="Mission, Vision & Purpose"
            description="The core principles that guide our work and define our commitment to excellence."
            align="center"
            eyebrowClassName="text-primary"
            titleClassName="text-brand-dark"
            descriptionClassName="text-brand-dark/70 max-w-2xl mx-auto"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {missionVisionPurpose.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-brand-gray-light/50 bg-white p-6 sm:p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(var(--color-dark-rgb),0.08)]"
            >
              {/* Subtle circular pattern in upper-right */}
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-brand-primary/5 blur-2xl" />

              {/* Number */}
              <div className="mb-4">
                <span className="text-3xl sm:text-4xl font-light text-brand-primary">
                  {item.number}
                </span>
              </div>

              {/* Content */}
              <div className="relative space-y-3">
                <h3 className="text-xl sm:text-2xl font-semibold text-brand-dark">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-brand-dark/70">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

