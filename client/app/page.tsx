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
    "Welcome to Yashraj Infrastructure - Your trusted partner for premium construction and infrastructure projects. Discover our innovative building solutions and exceptional project portfolio.",
  openGraph: {
    title: "Yashraj Infrastructure - Leading Construction Company",
    description:
      "Your trusted partner for premium construction and infrastructure projects. Discover our innovative building solutions and exceptional project portfolio.",
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
