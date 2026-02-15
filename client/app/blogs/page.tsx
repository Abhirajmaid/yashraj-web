import type { Metadata } from "next";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { BlogsSection } from "@/components/blogs/BlogsSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Explore insights, industry news, construction tips, and project updates from Yashraj Infrastructure. Stay informed about the latest trends in construction and infrastructure development.",
  openGraph: {
    title: "Blogs - Yashraj Infrastructure",
    description:
      "Explore insights, industry news, construction tips, and project updates from Yashraj Infrastructure.",
  },
};

export default function BlogsPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <CommonHeroSection
        id="blogs"
        backgroundImage="/yashraj_project_images/WhatsApp Image 2026-02-04 at 15.56.55 (2).jpeg"
        backgroundImageAlt="Blogs hero background"
        title="Insights & Updates"
        description=""
        showGradientOverlay={false}
        scrollIndicatorText="Scroll to explore"
        backgroundColor="bg-black"
        objectPosition="center"
        maxContentWidth="max-w-4xl"
      />

      <BlogsSection />

      <div className="bg-white">
        <ServiceCTASection />
      </div>
      <Footer />
    </main>
  );
}
