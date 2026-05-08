import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SEO_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Yashraj Infrastructure for your construction and infrastructure projects. Ready to bring your vision to life? Let's discuss your next project and explore how we can help transform your ideas into reality.",
  keywords: SEO_KEYWORDS,
  openGraph: {
    title: "Contact Us - Yashraj Infrastructure",
    description:
      "Get in touch with Yashraj Infrastructure for your construction and infrastructure projects. Let's discuss your next project.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


