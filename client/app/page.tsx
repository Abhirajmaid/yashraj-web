import { HeroSection } from "@/components/common/HeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { FAQSection } from "@/components/common/FAQSection";
import { FeatureBlogsSection } from "@/components/common/FeatureBlogsSection";
import { Footer } from "@/components/common/Footer";
import { PartnersSection } from "@/components/common/PartnersSection";
import { ProjectsSection } from "@/components/common/ProjectsSection";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { TestimonialsSection } from "@/components/common/TestimonialsSection";
import { ShowcaseSection } from "@/components/common/ShowcaseSection";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <ShowcaseSection />
      <ConnectMarquee />
      <ProjectsSection />
      <PartnersSection />
      <TestimonialsSection />
      <FeatureBlogsSection />
      <FAQSection />
      <ServiceCTASection />
      <Footer />
    </main>
  );
}
