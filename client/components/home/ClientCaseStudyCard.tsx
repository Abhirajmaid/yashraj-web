import Image from "next/image";
import { Icon } from "@iconify/react";

type ClientCaseStudyCardProps = {
  clientLogo: string;
  clientLogoAlt: string;
  clientName: string;
  description: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
  projectTitle?: string;
  projectLocation?: string;
  className?: string;
};

export function ClientCaseStudyCard({
  clientLogo,
  clientLogoAlt,
  clientName,
  description,
  images,
  projectTitle,
  projectLocation,
  className,
}: ClientCaseStudyCardProps) {
  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-gray-light/50 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(var(--color-dark-rgb),0.12)] lg:flex-row ${
        className ?? ""
      }`}
    >
      {/* Left Side: Logo, Client Info, and Description */}
      <div className="flex flex-col lg:w-2/5 border-b lg:border-b-0 lg:border-r border-brand-gray-light/50 bg-gradient-to-br from-brand-primary/5 to-transparent p-4 sm:p-6">
        {/* Client Logo and Name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-lg bg-white p-2 shadow-sm border border-brand-gray-light/50 overflow-hidden">
            <Image
              src={clientLogo}
              alt={clientLogoAlt}
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-brand-dark">
              {clientName}
            </h3>
            {projectTitle && (
              <p className="text-xs sm:text-sm text-brand-dark/70 mt-0.5">
                {projectTitle}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex-1">
          <p className="text-xs sm:text-sm leading-relaxed text-brand-dark/80 mb-3">
            {description}
          </p>
          {projectLocation && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-brand-primary">
              <Icon icon="solar:map-point-bold" className="text-sm" />
              <span>{projectLocation}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Images Gallery */}
      <div className="relative lg:w-3/5 flex-shrink-0">
        <div className="grid grid-cols-2 h-full min-h-[300px] sm:min-h-[350px] lg:min-h-full">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden border-r border-b border-brand-gray-light/30 last:border-r-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    +{images.length - 4} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
