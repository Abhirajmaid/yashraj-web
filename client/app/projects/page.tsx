import type { Metadata } from "next";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { ProjectPageSection } from "@/components/projects/ProjectPageSection";
import { PartnersSection } from "@/components/common/PartnersSection";
import { FullWidthCTA } from "@/components/common/FullWidthCTA";
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
        backgroundImage="/yashraj_project_images/WhatsApp Image 2026-02-04 at 14.44.03 (1).jpeg"
        backgroundImageAlt="Projects hero background"
        title="Our Projects"
        description="Discover our portfolio of iconic infrastructure projects."
        buttons={[
          {
            text: "Start Your Project",
            link: "/contact",
            type: "secondary",
            size: "lg",
            className: "w-full sm:w-auto",
          },
        ]}
        showGradientOverlay={true}
        scrollIndicatorText="Scroll to explore"
        backgroundColor="bg-brand-dark"
        objectPosition="center"
        maxContentWidth="max-w-4xl"
        flipHorizontal={true}
      />
      <ConnectMarquee />
      <ProjectPageSection />
      <div className="bg-white">
        <div className="pt-16">
          <PartnersSection />
        </div>
        <div className="pt-16">
          <FullWidthCTA />
        </div>
      </div>

      <Footer />
    </main>
  );
}
