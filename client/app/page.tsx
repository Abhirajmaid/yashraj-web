import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { Footer } from "@/components/common/Footer";
import { MissionVisionSection } from "@/components/home/MissionVisionSection";
import { PartnersSection } from "@/components/common/PartnersSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { FullWidthCTA } from "@/components/common/FullWidthCTA";
import { ServicesHighlightSection } from "@/components/home/ServicesHighlightSection";
import { ClientCaseStudiesSection } from "@/components/home/ClientCaseStudiesSection";
// import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";
import { DEFAULT_OG_IMAGE, SEO_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Yashraj Infrastructure – A Yashraj Group company. Building Beyond Horizons. Trusted government partner in Navi Mumbai delivering infrastructure across Maharashtra since 2008. We provide construction, operation & maintenance, building works, and manufacture bitumen mixes and ready-mix concrete.",
  keywords: SEO_KEYWORDS,
  openGraph: {
    title: "Yashraj Infrastructure | Building Beyond Horizons",
    description:
      "Trusted government partner based in Navi Mumbai delivering infrastructure projects across Maharashtra. Construction, O&M, buildings, and supply of bitumen mixes and ready-mix concrete.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <ShowcaseSection />
      <ConnectMarquee />
      <MissionVisionSection />
      <WhyOurWorkStandsOutSection />
      <ServicesHighlightSection />
      <PartnersSection />
      <ClientCaseStudiesSection />
      <CsrSection />
      <ProjectsSection />
      {/* <TestimonialsSection /> */}
      {/* <FeatureBlogsSection /> */}
      <FullWidthCTA />
      <Footer />
    </main>
  );
}
