import { HeroSection } from "@/components/home/HeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { FAQSection } from "@/components/common/FAQSection";
import { FeatureBlogsSection } from "@/components/home/FeatureBlogsSection";
import { Footer } from "@/components/common/Footer";
import { MissionVisionSection } from "@/components/home/MissionVisionSection";
import { PartnersSection } from "@/components/common/PartnersSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <ShowcaseSection />
      <ConnectMarquee />
      <ProjectsSection />
      <PartnersSection />
      <MissionVisionSection />
      <TestimonialsSection />
      <FeatureBlogsSection />
      <FAQSection />
      <ServiceCTASection />
      <Footer />
    </main>
  );
}
