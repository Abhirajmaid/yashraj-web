import type { Metadata } from "next";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
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
    images: ["/images/projecthero2.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <CommonHeroSection
        id="services"
        backgroundImage="/yashraj_project_images/WhatsApp Image 2026-02-04 at 14.44.03.jpeg"
        backgroundImageAlt="Services hero background"
        title="Services"
        flipHorizontal={true}
        description="Construction & Execution, Operation & Maintenance, and Buildings & Industrial. Quality infrastructure across Maharashtra."
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
        <ServiceCTASection />
      </div>

      <Footer />
    </main>
  );
}
