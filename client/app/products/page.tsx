import type { Metadata } from "next";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { AggregatesContent } from "@/components/aggregates/AggregatesContent";
import { FullWidthCTA } from "@/components/common/FullWidthCTA";
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

export default function ProductsPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <CommonHeroSection
        id="products"
        backgroundImage="/yashraj_project_images/WhatsApp Image 2026-02-04 at 15.56.55 (2).jpeg"
        backgroundImageAlt="Products – Bitumen Mixes and Ready-Mix Concrete"
        title="Products"
        flipHorizontal={true}
        description="Bitumen mixes and Ready-Mix Concrete (RMC). Quality-assured materials from our plants—delivering strength, durability, and consistency for your infrastructure and construction projects."
        showGradientOverlay={true}
        scrollIndicatorText="Scroll to explore"
        backgroundColor="bg-brand-dark"
        objectPosition="top"
        maxContentWidth="max-w-4xl"
      />
      <ConnectMarquee />
      <AggregatesContent />
      <div className="bg-white">
        <FullWidthCTA />
      </div>
      <Footer />
    </main>
  );
}
