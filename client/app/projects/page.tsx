import { ProjectsHeroSection } from "@/components/common/ProjectsHeroSection";
import { Project1Section } from "@/components/common/Project1Section";
import { PartnersSection } from "@/components/common/PartnersSection";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { Footer } from "@/components/common/Footer";

export default function ProjectsPage() {
  return (
    <main className="bg-[#0F76F4]">
      <ProjectsHeroSection />
      <Project1Section />
      <div className="bg-white">
        <div className="pt-16">
          <PartnersSection />
        </div>
        <div className="pt-16">
          <ServiceCTASection />
        </div>
      </div>
      <Footer />
    </main>
  );
}

