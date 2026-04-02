import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Newsreader,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/common/StickyHeader";
import { BottomNavbar } from "@/components/common/BottomNavbar";
import { WhatsappCTA } from "@/components/common/WhatsappCTA";
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Yashraj Infrastructure - A Yashraj Group Ventures | Building Beyond Horizons",
    template: "%s | Yashraj Infrastructure",
  },
  description:
    "Yashraj Infrastructure is a trusted government partner based in Navi Mumbai, delivering infrastructure projects across Maharashtra since 2008. We offer construction, operation & maintenance, buildings & industrial projects, and manufacture high-quality bitumen mixes and ready-mix concrete.",
  keywords: [
    "Yashraj Infrastructure",
    "Yashraj Group",
    "infrastructure",
    "construction",
    "Navi Mumbai",
    "Maharashtra",
    "bitumen mixes",
    "ready-mix concrete",
    "RMC",
    "highways",
    "flyovers",
    "government contractor",
    "civil works",
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
    siteName: "Yashraj Infrastructure - A Yashraj Group Ventures",
    title: "Yashraj Infrastructure | Building Beyond Horizons",
    description:
      "Trusted government partner in Navi Mumbai. Infrastructure projects across Maharashtra. Construction, O&M, bitumen mixes, and ready-mix concrete.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Yashraj Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashraj Infrastructure | Building Beyond Horizons",
    description:
      "Trusted government partner in Navi Mumbai. Infrastructure across Maharashtra.",
    images: ["/images/hero.jpg"],
    creator: "@yashrajinfrastructure",
  },
  alternates: { canonical: "https://yashrajinfrastructure.com" },
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
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${newsreader.variable} ${montserrat.variable} antialiased bg-white pb-20 lg:pb-0 overflow-x-hidden`}
      >
        <EnquiryModalProvider>
          <StickyHeader />
          {children}
          <WhatsappCTA />
          <BottomNavbar />
        </EnquiryModalProvider>
      </body>
    </html>
  );
}
