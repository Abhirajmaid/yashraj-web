import type { Metadata } from "next";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { AggregatesContent } from "@/components/aggregates/AggregatesContent";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Products - Bitumen Mixes & Ready-Mix Concrete (RMC)",
  description:
    "Yashraj Infrastructure manufactures and supplies Bitumen Mixes and Ready-Mix Concrete (RMC). Quality-assured materials from our plants for infrastructure and construction across Maharashtra.",
  openGraph: {
    title: "Products - Bitumen Mixes & RMC | Yashraj Infrastructure",
    description:
      "Bitumen mixes and Ready-Mix Concrete. Quality-assured materials for infrastructure and construction.",
    images: ["/images/projecthero2.jpg"],
  },
};

export default function AggregatesPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <CommonHeroSection
        id="products"
        backgroundImage="/images/servicesimage.jpg"
        backgroundImageAlt="Products – Bitumen Mixes and Ready-Mix Concrete"
        title="Products"
        flipHorizontal={true}
        description="Bitumen mixes and Ready-Mix Concrete (RMC). Quality-assured materials from our plants—delivering strength, durability, and consistency for your infrastructure and construction projects."
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
