import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CommonHeroSection } from "@/components/common/CommonHeroSection";
import { ConnectMarquee } from "@/components/common/ConnectMarquee";
import { AggregatesContent } from "@/components/aggregates/AggregatesContent";
import { FullWidthCTA } from "@/components/common/FullWidthCTA";
import { Footer } from "@/components/common/Footer";
import { DEFAULT_OG_IMAGE, SEO_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Products - Bitumen Mixes & Ready-Mix Concrete (RMC)",
  description:
    "Yashraj Infrastructure manufactures and supplies Bitumen Mixes and Ready-Mix Concrete (RMC). Quality-assured materials from our plants for infrastructure and construction across Maharashtra.",
  keywords: SEO_KEYWORDS,
  openGraph: {
    title: "Products - Bitumen Mixes & RMC | Yashraj Infrastructure",
    description:
      "Bitumen mixes and Ready-Mix Concrete. Quality-assured materials for infrastructure and construction.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/aggregates`,
  },
};

export default function AggregatesPage() {
  redirect("/products");
}
