import { Icon } from "@iconify/react";

type ClientCaseStudyCardProps = {
  clientLogo?: string;
  clientLogoAlt?: string;
  clientName: string;
  description?: string;
  images?: Array<{ src: string; alt: string }>;
  projectTitle?: string;
  projectLocation?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  className?: string;
};

export function ClientCaseStudyCard({
  clientName,
  description,
  projectTitle,
  projectLocation,
  challenge,
  solution,
  results,
  className,
}: ClientCaseStudyCardProps) {
  const hasChallengeSolutionResults = challenge || solution || results;

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-gray-light/50 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(var(--color-dark-rgb),0.12)] ${
        className ?? ""
      }`}
    >
      {/* Left Side: Logo, Client Info, Description or Challenge/Solution/Results */}
      <div className="flex flex-col bg-linear-to-br from-brand-primary/5 to-transparent p-4 sm:p-6">
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-brand-dark">{clientName}</h3>
          {projectTitle && <p className="text-xs sm:text-sm text-brand-dark/70 mt-0.5">{projectTitle}</p>}
        </div>

        <div className="flex-1 space-y-3">
          {hasChallengeSolutionResults ? (
            <>
              {challenge && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-1">Challenge</p>
                  <p className="text-xs sm:text-sm leading-relaxed text-brand-dark/80">{challenge}</p>
                </div>
              )}
              {solution && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-1">Solution</p>
                  <p className="text-xs sm:text-sm leading-relaxed text-brand-dark/80">{solution}</p>
                </div>
              )}
              {results && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-1">Results</p>
                  <p className="text-xs sm:text-sm leading-relaxed text-brand-dark/80">{results}</p>
                </div>
              )}
            </>
          ) : description ? (
            <p className="text-xs sm:text-sm leading-relaxed text-brand-dark/80">{description}</p>
          ) : null}
          {projectLocation && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-brand-primary">
              <Icon icon="solar:map-point-bold" className="text-sm" />
              <span>{projectLocation}</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
