import type { Metadata } from "next";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { ProjectPageSection } from "@/components/projects/ProjectPageSection";
import { PartnersSection } from "@/components/common/PartnersSection";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Discover our portfolio of iconic infrastructure projects, from stunning bridges to contemporary urban landmarks, each crafted with engineering excellence and bold design vision. Explore Yashraj Infrastructure's completed construction projects.",
  openGraph: {
    title: "Our Projects - Yashraj Infrastructure",
    description:
      "Discover our portfolio of iconic infrastructure projects, each crafted with engineering excellence and bold design vision.",
    images: ["/images/projecthero2.jpg"],
  },
};

export default function ProjectsPage() {
  return (
    <main className="bg-white">
      <CommonHeroSection
        id="projects"
        backgroundImage="/images/projecthero2.jpg"
        backgroundImageAlt="Projects hero background"
        title="Our Projects"
        description="Discover our portfolio of iconic infrastructure projects, from stunning bridges to contemporary urban landmarks, each crafted with engineering excellence and bold design vision."
        buttons={[
          {
            text: "Start Your Project",
            link: "/contact",
            type: "secondary",
            size: "lg",
            className: "w-full sm:w-auto",
          },
          {
            text: "View Portfolio",
            link: "#projects-grid",
            type: "primary",
            size: "lg",
            className: "w-full sm:w-auto",
          },
        ]}
        showGradientOverlay={false}
        scrollIndicatorText="Scroll to explore"
        backgroundColor="bg-brand-dark"
        objectPosition="top"
        maxContentWidth="max-w-4xl"
      />
      <ConnectMarquee />
      <ProjectPageSection />
      <div className="bg-white">
        <div className="pt-16">
          <PartnersSection />
        </div>
        <div className="pt-16">
          <ServiceCTASection />
        </div>
      </div>
      <ConnectMarquee />
      <Footer />
    </main>
  );
}
