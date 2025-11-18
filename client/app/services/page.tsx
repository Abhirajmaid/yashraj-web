import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { Footer } from "@/components/common/Footer";
import { FAQSection } from "@/components/common/FAQSection";
import { services } from "@/data/services";

export default function ServicesPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <CommonHeroSection
        id="services"
        backgroundImage="/images/projecthero2.jpg"
        backgroundImageAlt="Services hero background"
        title="Yashraj's Services"
        description="Comprehensive architectural and construction services designed to bring your vision to life with precision and excellence."
        buttons={[
          {
            text: "Get Started",
            link: "/contact",
            type: "secondary",
            size: "lg",
            className: "w-full sm:w-auto",
          },
          {
            text: "View Projects",
            link: "/projects",
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
      <ServicesSection services={services} />
      <ConnectMarquee />
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
