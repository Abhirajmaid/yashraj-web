import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/about-us/AboutHeroSection";
import { AboutIntroSection } from "@/components/about-us/AboutIntroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { FAQSection } from "@/components/common/FAQSection";
import { Footer } from "@/components/common/Footer";
import { PartnersSection } from "@/components/common/PartnersSection";
import { PurposeSection } from "@/components/about-us/PurposeSection";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { StorySection } from "@/components/about-us/StorySection";
import { TeamsSection } from "@/components/about-us/TeamsSection";
import { purposePillars, storyHighlights } from "@/data/aboutUs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Yashraj Infrastructure - a premier construction company passionate about creating inspiring, attention-grabbing, and enduring spaces that adapt to innovation. Experience innovative architecture that transforms your vision into reality.",
  openGraph: {
    title: "About Us - Yashraj Infrastructure",
    description:
      "Learn about our construction company passionate about creating inspiring and enduring spaces that adapt to innovation.",
    images: ["/images/about.jpg"],
  },
};

export default function AboutUsPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <AboutHeroSection
        title="Designing spaces, bringing ideas to life"
        upperImage={{
          src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
          alt: "Modern architectural building with angular roof structure",
        }}
        lowerImage={{
          src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
          alt: "Contemporary building with wave-like roofline",
        }}
        description="We are passionate about creating inspiring, attention-grabbing, and enduring spaces that adapt to innovation."
        buttonText="Our services"
        buttonLink="/services"
      />

      <AboutIntroSection
        title="Experience innovative architecture that transforms your"
        highlightedText="vision into reality."
      />

      <PartnersSection />

      <PurposeSection pillars={purposePillars} />

      <StorySection highlights={storyHighlights} />

      <TeamsSection />

      <ConnectMarquee />

      <div className="bg-white">
        <FAQSection />
      </div>

      <ServiceCTASection />

      <Footer />
    </main>
  );
}
