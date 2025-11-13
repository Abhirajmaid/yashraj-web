import { BlogsHeroSection } from "@/components/common/BlogsHeroSection";
import { BlogsSection } from "@/components/common/BlogsSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { BlogsFAQSection } from "@/components/common/BlogsFAQSection";
import { ServiceCTASection } from "@/components/common/ServiceCTASection";
import { Footer } from "@/components/common/Footer";

export default function BlogsPage() {
  return (
    <main className="bg-[#0E0E0E]">
      <BlogsHeroSection />
      <BlogsSection />
      <ConnectMarquee />
      <BlogsFAQSection />
      <ServiceCTASection />
      <Footer />
    </main>
  );
}

