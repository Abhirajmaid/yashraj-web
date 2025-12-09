import type { Metadata } from "next";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { AggregatesContent } from "@/components/aggregates/AggregatesContent";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Aggregates - Ready Mix Concrete (RMC)",
  description:
    "Discover Yashraj Infrastructure's Ready Mix Concrete (RMC) solutions. Explore our state-of-the-art plants, locations, and comprehensive RMC services for all your construction needs.",
  openGraph: {
    title: "Aggregates - RMC Services | Yashraj Infrastructure",
    description:
      "Quality-assured Ready Mix Concrete from strategically located plants. Expert RMC solutions for construction projects of all scales.",
    images: ["/images/projecthero2.jpg"],
  },
};

export default function AggregatesPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <CommonHeroSection
        id="aggregates"
        backgroundImage="/images/servicesimage.jpg"
        backgroundImageAlt="Aggregates and RMC hero background"
        title="Aggregates"
        flipHorizontal={true}
        description="Quality-assured Ready Mix Concrete (RMC) solutions from strategically located plants. Delivering strength, durability, and consistency for your construction projects."
        showGradientOverlay={false}
        scrollIndicatorText="Scroll to explore"
        backgroundColor="bg-brand-dark"
        objectPosition="top"
        maxContentWidth="max-w-4xl"
      />
      <ConnectMarquee />
      <AggregatesContent />
      <div className="bg-white">
        <ServiceCTASection />
      </div>
      <Footer />
    </main>
  );
}
