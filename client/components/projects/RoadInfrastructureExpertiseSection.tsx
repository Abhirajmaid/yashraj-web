import { SectionHeader } from "@/components/common/SectionHeader";

export function RoadInfrastructureExpertiseSection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-brand-light/5 to-transparent py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
        <SectionHeader
          eyebrow="OUR FORTE"
          title="Road Infrastructure Expertise"
          align="center"
          eyebrowClassName="text-brand-primary"
        />
        <div className="mt-12 space-y-6">
          <p className="text-base leading-relaxed text-brand-dark/80">
            Yashraj Infrastructure specializes in the execution of road
            infrastructure projects with strong expertise in asphalt road
            construction, pavement rehabilitation, and concretisation of roads
            (RCC pavement).
          </p>
          <p className="text-base leading-relaxed text-brand-dark/80">
            Our teams undertake a wide range of roadway works including asphalt
            pavements, rigid pavement construction, carriageway strengthening,
            and urban road improvement projects, supported by experienced site
            supervision and machinery-backed execution capability.
          </p>
          <p className="text-base leading-relaxed text-brand-dark/80">
            Each project is executed with strong engineering supervision,
            quality-controlled materials, and adherence to established roadway
            construction standards to ensure durability and performance.
          </p>
          <p className="text-base leading-relaxed text-brand-dark/80">
            Our forte lies in executing technically sound roadway infrastructure
            with precision, reliability, and engineering discipline.
          </p>
        </div>
      </div>
    </section>
  );
}
