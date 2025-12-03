import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Yashraj Infrastructure for your construction and infrastructure projects. Ready to bring your vision to life? Let's discuss your next project and explore how we can help transform your ideas into reality.",
  openGraph: {
    title: "Contact Us - Yashraj Infrastructure",
    description:
      "Get in touch with Yashraj Infrastructure for your construction and infrastructure projects. Let's discuss your next project.",
    images: ["/images/projecthero2.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


