import { SectionHeader } from "@/components/common/SectionHeader";

type PurposePillar = {
  number: string;
  title: string;
  description: string;
};

type PurposeSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  pillars: PurposePillar[];
};

export function PurposeSection({
  eyebrow = "OUR PURPOSE",
  title = "Our purpose",
  description = "Focused on creativity and precision, we turn ideas into lasting designs.",
  pillars,
}: PurposeSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-white text-brand-dark">
      {/* Top left gradient with primary color */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 xl:px-14">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side: Heading and Description */}
          <div>
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              description={description}
              eyebrowClassName="text-primary"
              titleClassName="text-brand-dark"
              descriptionClassName="text-brand-dark/70"
            />
          </div>

          {/* Right Side: Numbered Items */}
          <div className="space-y-0">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`border-b border-brand-gray-light/50 py-6 sm:py-8 ${
                  index === pillars.length - 1 ? "border-b-0" : ""
                }`}
              >
                <div className="flex gap-4 sm:gap-6">
                  <span className="text-xl sm:text-2xl font-light text-brand-primary">
                    {pillar.number}
                  </span>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold text-brand-dark">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-dark/70">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

