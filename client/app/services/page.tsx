import type { Metadata } from "next";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { ServicesSection } from "@/components/services/ServicesSection";
import { FullWidthCTA } from "@/components/common/FullWidthCTA";
import { Footer } from "@/components/common/Footer";
import { FAQSection } from "@/components/common/FAQSection";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Yashraj Infrastructure offers Construction & Execution, Operation & Maintenance, and Buildings & Industrial services. Highways, flyovers, STP, piling, civil works—delivered with precision and reliability across Maharashtra.",
  openGraph: {
    title: "Our Services - Yashraj Infrastructure",
    description:
      "Construction & Execution, Operation & Maintenance, and Buildings & Industrial. Quality infrastructure across Maharashtra.",
    images: ["/images/what we do1.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <CommonHeroSection
        id="services"
        backgroundImage="/images/what we do1.jpg"
        useDirectImagePath
        backgroundImageAlt="What we do hero background"
        title="Services"
        flipHorizontal={true}
        description="Construction & Execution, Operation & Maintenance, and Buildings & Industrial."
        showGradientOverlay={true}
        scrollIndicatorText="Scroll to explore"
        backgroundColor="bg-brand-dark"
        objectPosition="center"
        maxContentWidth="max-w-4xl"
      />
      <ConnectMarquee />
      <ServicesSection services={services} />
      <div className="bg-white">
        <FAQSection />
      </div>

      <div className="bg-white">
        <FullWidthCTA />
      </div>

      <Footer />
    </main>
  );
}
