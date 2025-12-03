import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Newsreader } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/common/StickyHeader";
import { BottomNavbar } from "@/components/common/BottomNavbar";
import { EnquiryModalProvider } from "@/contexts/EnquiryModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Yashraj Infrastructure - Leading Construction Company",
    template: "%s | Yashraj Infrastructure",
  },
  description:
    "Yashraj Infrastructure is a premier construction company specializing in infrastructure development, architectural excellence, and innovative building solutions. Transform your vision into reality with our expert construction services.",
  keywords: [
    "construction company",
    "infrastructure development",
    "construction services",
    "building construction",
    "architectural construction",
    "commercial construction",
    "residential construction",
    "construction projects",
    "Yashraj Infrastructure",
    "construction contractors",
    "civil engineering",
    "project management",
  ],
  authors: [{ name: "Yashraj Infrastructure" }],
  creator: "Yashraj Infrastructure",
  publisher: "Yashraj Infrastructure",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashrajinfrastructure.com",
    siteName: "Yashraj Infrastructure",
    title: "Yashraj Infrastructure - Leading Construction Company",
    description:
      "Premier construction company specializing in infrastructure development, architectural excellence, and innovative building solutions.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Yashraj Infrastructure - Construction Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashraj Infrastructure - Leading Construction Company",
    description:
      "Premier construction company specializing in infrastructure development and innovative building solutions.",
    images: ["/images/hero.jpg"],
    creator: "@yashrajinfrastructure",
  },
  alternates: {
    canonical: "https://yashrajinfrastructure.com",
  },
  category: "Construction",
  metadataBase: new URL("https://yashrajinfrastructure.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${newsreader.variable} antialiased bg-white pb-20 lg:pb-0`}
      >
        <EnquiryModalProvider>
          <StickyHeader />
          {children}
          <BottomNavbar />
        </EnquiryModalProvider>
      </body>
    </html>
  );
}
