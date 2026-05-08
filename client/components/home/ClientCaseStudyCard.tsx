import { Icon } from "@iconify/react";

export type CaseStudyCardProps = {
  title: string;
  subtitle?: string;
  challenge: string;
  solution: string;
  results: string;
  location?: string;
  className?: string;
};

export function CaseStudyCard({
  title,
  subtitle,
  challenge,
  solution,
  results,
  location,
  className,
}: CaseStudyCardProps) {
  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md ${
        className ?? ""
      }`}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold leading-tight text-brand-dark">{title}</h3>
          {subtitle && <p className="mt-1 text-base text-brand-dark/70">{subtitle}</p>}

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Challenge</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-dark/80">{challenge}</p>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Solution</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-dark/80">{solution}</p>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Results</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-dark/80">{results}</p>
          </div>
        </div>

        {location && (
          <div className="mt-4 flex items-center gap-1.5 text-sm text-brand-primary">
            <Icon icon="solar:map-point-bold" className="text-sm" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </div>
  );
}

type ClientCaseStudyCardProps = {
  clientName: string;
  projectTitle?: string;
  projectLocation?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  className?: string;
};

export function ClientCaseStudyCard({
  clientName,
  projectTitle,
  projectLocation,
  challenge,
  solution,
  results,
  className,
}: ClientCaseStudyCardProps) {
  if (!challenge || !solution || !results) {
    return null;
  }

  return (
    <CaseStudyCard
      title={clientName}
      subtitle={projectTitle}
      challenge={challenge}
      solution={solution}
      results={results}
      location={projectLocation}
      className={className}
    />
  );
}
