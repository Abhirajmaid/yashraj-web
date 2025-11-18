import { BlogsHeroSection } from "@/components/blogs/BlogsHeroSection";
import { BlogsSection } from "@/components/blogs/BlogsSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { BlogsFAQSection } from "@/components/blogs/BlogsFAQSection";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { Footer } from "@/components/common/Footer";

export default function BlogsPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <BlogsHeroSection />
      <ConnectMarquee />
      <BlogsSection />
      <ConnectMarquee />
      <div className="bg-white">
        <BlogsFAQSection />
      </div>
      <div className="bg-white">
        <ServiceCTASection />
      </div>
      <Footer />
    </main>
  );
}
