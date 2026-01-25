import Image from "next/image";
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
  clientLogo,
  clientLogoAlt,
  clientName,
  description,
  images = [],
  projectTitle,
  projectLocation,
  challenge,
  solution,
  results,
  className,
}: ClientCaseStudyCardProps) {
  const hasChallengeSolutionResults = challenge || solution || results;
  const imgs = images.slice(0, 4);

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-gray-light/50 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(var(--color-dark-rgb),0.12)] lg:flex-row ${
        className ?? ""
      }`}
    >
      {/* Left Side: Logo, Client Info, Description or Challenge/Solution/Results */}
      <div className="flex flex-col lg:w-2/5 border-b lg:border-b-0 lg:border-r border-brand-gray-light/50 bg-linear-to-br from-brand-primary/5 to-transparent p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          {clientLogo ? (
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-lg bg-white p-2 shadow-sm border border-brand-gray-light/50 overflow-hidden">
              <Image src={clientLogo} alt={clientLogoAlt || clientName} fill className="object-contain p-1" />
            </div>
          ) : (
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary font-semibold text-lg">
              {clientName.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-brand-dark">{clientName}</h3>
            {projectTitle && <p className="text-xs sm:text-sm text-brand-dark/70 mt-0.5">{projectTitle}</p>}
          </div>
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

      {/* Right Side: Images or placeholder */}
      <div className="relative lg:w-3/5 shrink-0 min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]">
        {imgs.length > 0 ? (
          <div className="grid grid-cols-2 h-full min-h-[300px] sm:min-h-[350px] lg:min-h-full">
            {imgs.map((image, index) => (
              <div key={index} className="relative overflow-hidden border-r border-b border-brand-gray-light/30 last:border-r-0">
                <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                {index === 3 && images!.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">+{images!.length - 4} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-brand-gray-light/30 to-brand-primary/5">
            <Icon icon="solar:document-text-bold" className="text-5xl sm:text-6xl text-brand-primary/30" />
          </div>
        )}
      </div>
    </div>
  );
}
