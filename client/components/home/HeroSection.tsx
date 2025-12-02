"use client";

import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { useEnquiryModal } from "@/contexts/EnquiryModalContext";

export function HeroSection() {
  const { openModal } = useEnquiryModal();

  return (
    <CommonHeroSection
      id="home"
      backgroundImage="/images/fuji bridge.jpg"
      backgroundImageAlt="Curved red bridge with mountain in background"
      title="Yashraj Infrastructure"
      description="Yashraj Constructions delivers iconic bridges and contemporary urban landmarks crafted with engineering excellence and bold design."
      buttons={[
        {
          text: "Explore Projects",
          link: "/projects",
          type: "secondary",
          size: "lg",
          className: "w-full sm:w-auto",
        },
      ]}
      showGradientOverlay={false}
      scrollIndicatorText="Scroll down"
      backgroundColor="bg-black"
      objectPosition="top"
      maxContentWidth="max-w-7xl"
    />
  );
}
