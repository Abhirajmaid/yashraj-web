import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/about-us/AboutHeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { Footer } from "@/components/common/Footer";
import { PartnersSection } from "@/components/common/PartnersSection";
import { PurposeSection } from "@/components/about-us/PurposeSection";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { StorySection } from "@/components/about-us/StorySection";
import { purposePillars, storyHighlights, aboutNarrative } from "@/data/aboutUs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "At Yashraj Infrastructure, we turn vision into lasting impact. Based in Navi Mumbai, we deliver high-quality infrastructure projects across Maharashtra—roads, bridges, flyovers, STP, piling, and industrial buildings—with precision, durability, and innovation.",
  openGraph: {
    title: "About Us - Yashraj Infrastructure",
    description:
      "Based in Navi Mumbai, we deliver infrastructure across Maharashtra. Family-led, rooted in quality and long-term value creation.",
    images: ["/images/about.jpg"],
  },
};

export default function AboutUsPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <AboutHeroSection
        title="At Yashraj Infrastructure, we turn vision into lasting impact."
        upperImage={{
          src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
          alt: "Infrastructure and construction",
        }}
        lowerImage={{
          src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
          alt: "Infrastructure project",
        }}
        description="Based in Navi Mumbai, we deliver high-quality infrastructure projects across Maharashtra, earning the trust of government departments and stakeholders alike. Our portfolio spans highways, flyovers, beautification, sewage treatment plants, piling, industrial and commercial buildings—and we are manufacturers and suppliers of aggregates, concrete and bitumen mixes."
        buttonText="Our services"
        buttonLink="/services"
      />

      {/* Who We Are narrative */}
      <section className="relative bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
          <h2 className="mb-8 text-2xl font-semibold text-brand-dark sm:text-3xl">Who we are</h2>
          <div className="space-y-6 text-base leading-relaxed text-brand-dark/80">
            {aboutNarrative.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <PurposeSection
        eyebrow="OUR PURPOSE"
        title="Our Purpose"
        description="Focused on building infrastructure that lasts, we combine expertise, innovation, and commitment to serve communities across Maharashtra."
        pillars={purposePillars}
      />

      <StorySection
        eyebrow="OUR STORY"
        title="Our Story"
        description="From our founding in 2008 to today—a family-led enterprise built on hard work, ethical leadership, and technical strength."
        highlights={storyHighlights}
      />

      <PartnersSection />

      <ServiceCTASection />

      <Footer />
    </main>
  );
}
