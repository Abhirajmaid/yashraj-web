"use client";

import Image from "next/image";
import Button from "./Button";

export type HeroButton = {
  text: string;
  link?: string;
  onClick?: () => void;
  type?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type CommonHeroSectionProps = {
  id?: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  title: string;
  description: string;
  buttons?: HeroButton[];
  showGradientOverlay?: boolean;
  scrollIndicatorText?: string;
  backgroundColor?: string;
  objectPosition?: "center" | "top" | "bottom";
  maxContentWidth?: string;
  contentAlign?: "center" | "bottom" | "bottom-left";
  flipHorizontal?: boolean;
};

export function CommonHeroSection({
  id,
  backgroundImage,
  backgroundImageAlt,
  title,
  description,
  buttons = [],
  showGradientOverlay = false,
  scrollIndicatorText,
  backgroundColor = "bg-brand-dark",
  objectPosition = "center",
  maxContentWidth = "max-w-4xl",
  contentAlign = "center",
  flipHorizontal = false,
}: CommonHeroSectionProps) {
  const objectPositionClass =
    objectPosition === "top"
      ? "object-top"
      : objectPosition === "bottom"
      ? "object-bottom"
      : "object-center";

  return (
    <section
      id={id}
      data-hero-root
      className={`relative h-screen overflow-hidden ${backgroundColor}`}
      style={{ height: "100vh", zIndex: 1, pointerEvents: "auto" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full z-0">
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          priority
          quality={75}
          sizes="100vw"
          className={`object-cover h-full w-full ${objectPositionClass} ${
            flipHorizontal ? "scale-x-[-1]" : ""
          }`}
        />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Gradient Overlay */}
        {showGradientOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/40 to-transparent" />
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Main Content - Left Aligned */}
        <div
          className={`flex-1 flex ${
            contentAlign === "bottom" || contentAlign === "bottom-left"
              ? "items-end pb-16 sm:pb-20"
              : "items-center"
          } ${
            contentAlign === "bottom-left" ? "justify-start" : "justify-center"
          }`}
        >
          <div
            className={`max-w-7xl w-full px-6 lg:px-8 pt-20 lg:pt-24 pb-20 ${
              contentAlign === "bottom-left" ? "" : "mx-auto"
            }`}
          >
            <div
              className={`${maxContentWidth} ${
                contentAlign === "bottom-left"
                  ? "bg-black/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/10"
                  : ""
              }`}
            >
              {/* Main Headline */}
              <h1 className="text-5xl lg:text-6xl xl:text-8xl font-medium text-white leading-[1.1] mb-6">
                {title}
              </h1>

              {/* Description */}
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
                {description}
              </p>

              {/* CTA Buttons */}
              {buttons.length > 0 && (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {buttons.map((button, index) => (
                    <Button
                      key={index}
                      link={button.link}
                      onClick={button.onClick}
                      type={button.type || "primary"}
                      size={button.size || "lg"}
                      className={button.className || "w-full sm:w-auto"}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section - Scroll Indicator */}
        {scrollIndicatorText && (
          <div className="relative z-10 pb-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="flex justify-center">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 py-2 shadow-lg">
                  <div className="text-white/70 text-xs">
                    {scrollIndicatorText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
