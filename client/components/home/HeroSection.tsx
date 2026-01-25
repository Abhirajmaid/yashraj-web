"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "@/components/common/Button";
import { useEnquiryModal } from "@/contexts/EnquiryModalContext";

type HeroSlide = {
  backgroundImage: string;
  backgroundImageAlt: string;
  title: string;
  description: string;
  objectPosition?: "center" | "top" | "bottom";
  flipHorizontal?: boolean;
};

const heroSlides: HeroSlide[] = [
  {
    backgroundImage: "/images/homeimage.png",
    backgroundImageAlt: "Yashraj Infrastructure – construction and infrastructure",
    title: "YASHRAJ INFRASTRUCTURE",
    description:
      "Building Beyond Horizons. A Yashraj Group company. Yashraj Infrastructure is a trusted government partner based in Navi Mumbai, delivering a variety of infrastructure projects across Maharashtra. Since 2005, we have earned a reputation for quality, reliability, and trust.",
    objectPosition: "top",
    flipHorizontal: true,
  },
  {
    backgroundImage: "/images/hero.jpg",
    backgroundImageAlt: "Modern construction and infrastructure",
    title: "Building Beyond Horizons",
    description:
      "Combining decades of experience with innovative technologies, we execute large-scale projects while also owning high-capacity plant and machinery and being manufacturers and suppliers of aggregates, concrete and bitumen mixes offering complete solutions in the infrastructure sector.",
    objectPosition: "center",
  },
  {
    backgroundImage: "/images/projecthero2.jpg",
    backgroundImageAlt: "Infrastructure project showcase",
    title: "A Yashraj Group Company",
    description:
      "Every project reflects our commitment to durability, precision, and contributing to India's development story. From roads and bridges to urban infrastructure—we create infrastructure that lasts, connects, and inspires.",
    objectPosition: "center",
  },
];

export function HeroSection() {
  const { openModal } = useEnquiryModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handlePrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentSlideData = heroSlides[currentSlide];
  const objectPositionClass =
    currentSlideData.objectPosition === "top"
      ? "object-top"
      : currentSlideData.objectPosition === "bottom"
      ? "object-bottom"
      : "object-center";

  return (
    <section
      id="home"
      data-hero-root
      className="relative h-screen overflow-hidden bg-black"
      style={{ height: "100vh", zIndex: 1 }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Slides */}
      <div className="absolute inset-0 h-full w-full">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.backgroundImage}
              alt={slide.backgroundImageAlt}
              fill
              priority={index === 0}
              quality={75}
              sizes="100vw"
              className={`object-cover h-full w-full ${objectPositionClass} ${
                slide.flipHorizontal ? "scale-x-[-1]" : ""
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
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl w-full px-6 lg:px-8 pt-20 lg:pt-24 pb-20 mx-auto">
            <div className="max-w-7xl">
              {/* Animated Content */}
              <div
                key={currentSlide}
                className="animate-fade-in"
                style={{
                  animation: "fadeIn 0.8s ease-in-out",
                }}
              >
                <h1 className="text-5xl lg:text-6xl xl:text-8xl font-medium text-white leading-[1.1] mb-6">
                  {currentSlideData.title}
                </h1>

                <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
                  {currentSlideData.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    link="/projects"
                    type="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Explore Projects
                  </Button>
                  <Button
                    onClick={openModal}
                    type="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Get in Touch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="relative z-20 pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center gap-6">
              {/* Navigation Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevious}
                  aria-label="Previous slide"
                  className="h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <Icon icon="solar:alt-arrow-left-bold" className="text-2xl" />
                </button>

                {/* Slide Indicators */}
                <div className="flex items-center gap-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlide
                          ? "w-12 bg-white"
                          : "w-2 bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <Icon
                    icon="solar:alt-arrow-right-bold"
                    className="text-2xl"
                  />
                </button>
              </div>

              {/* Scroll Indicator */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 py-2 shadow-lg">
                <div className="text-white/70 text-xs">Scroll down</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
