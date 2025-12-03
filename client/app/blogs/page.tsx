import type { Metadata } from "next";
import { BlogsHeroSection } from "@/components/blogs/BlogsHeroSection";
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
      <BlogsHeroSection />
      <ConnectMarquee />
      <BlogsSection />
      <ConnectMarquee />
      <div className="bg-white">
        <ServiceCTASection />
      </div>
      <Footer />
    </main>
  );
}
