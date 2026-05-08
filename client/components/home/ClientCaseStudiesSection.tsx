"use client";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CaseStudyCard } from "./ClientCaseStudyCard";

const caseStudies = [
  {
    clientName: "Navi Mumbai Municipal Corporation (NMMC)",
    projectTitle: "Airoli T-Junction",
    projectLocation: "Airoli, Navi Mumbai",
    challenge:
      "Severe traffic congestion and frequent water logging due to inadequate drainage and damaged pavement at a critical junction.",
    solution:
      "Upgradation of storm water drains and culvert, widening and concretisation of side shoulders, and replacement of damaged concrete pavement panels to improve traffic flow and drainage efficiency.",
    results:
      "Smooth and uninterrupted traffic movement with complete elimination of water logging at the junction.",
    images: [] as Array<{ src: string; alt: string }>,
  },
  {
    clientName: "S.M. Avtade Pvt. Ltd.",
    projectTitle: "Truck Lay-Byes at Mumbai–Pune Expressway",
    projectLocation: "Mumbai–Pune Expressway",
    challenge:
      "Frequent truck breakdowns and overheating during long journeys, leading to traffic congestion and safety risks on the expressway.",
    solution:
      "Construction of two dedicated truck lay-by bays to provide safe resting and emergency stopping zones for heavy vehicles.",
    results:
      "Significant reduction in vehicle breakdown incidents and smoother traffic flow with decreased congestion on the expressway.",
    images: [] as Array<{ src: string; alt: string }>,
  },
];

export function ClientCaseStudiesSection() {
  return (
    <section id="case-studies" className="relative isolate overflow-hidden bg-white text-brand-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 xl:px-14">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16">
          <SectionHeader
            eyebrow="CLIENT CASE STUDIES"
            title="Our Success Stories"
            description="Discover how we've helped government and private clients achieve their infrastructure goals through innovative solutions and exceptional execution."
            align="center"
            eyebrowClassName="text-primary"
            titleClassName="text-brand-dark"
            descriptionClassName="text-brand-dark/70 max-w-3xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyCard
              key={index}
              title={caseStudy.clientName}
              subtitle={caseStudy.projectTitle}
              challenge={caseStudy.challenge}
              solution={caseStudy.solution}
              results={caseStudy.results}
              location={caseStudy.projectLocation}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
