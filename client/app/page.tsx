import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { FAQSection } from "@/components/common/FAQSection";
import { FeatureBlogsSection } from "@/components/home/FeatureBlogsSection";
import { Footer } from "@/components/common/Footer";
import { MissionVisionSection } from "@/components/home/MissionVisionSection";
import { PartnersSection } from "@/components/common/PartnersSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { ServicesHighlightSection } from "@/components/home/ServicesHighlightSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";
import { ClientCaseStudiesSection } from "@/components/home/ClientCaseStudiesSection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Yashraj Infrastructure – A Yashraj Group company. Building Beyond Horizons. Trusted government partner in Navi Mumbai delivering infrastructure across Maharashtra since 2005. Construction, O&M, buildings, bitumen mixes, and ready-mix concrete.",
  openGraph: {
    title: "Yashraj Infrastructure | Building Beyond Horizons",
    description:
      "Trusted government partner in Navi Mumbai. Infrastructure projects across Maharashtra. Construction, O&M, bitumen mixes, and RMC.",
    images: ["/images/hero.jpg"],
  },
};

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <ShowcaseSection />
      <ConnectMarquee />
      <MissionVisionSection />
      <ServicesHighlightSection />
      <PartnersSection />
      <ClientCaseStudiesSection />
      <ProjectsSection />
      <TestimonialsSection />
      {/* <FeatureBlogsSection /> */}
      <ServiceCTASection />
      <Footer />
    </main>
  );
}
