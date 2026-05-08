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
import {
  DEFAULT_OG_IMAGE,
  SEO_KEYWORDS,
  SITE_FULL_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

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
    default: `${SITE_FULL_NAME} | Building Beyond Horizons`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Yashraj Infrastructure is a trusted government partner based in Navi Mumbai, delivering infrastructure projects across Maharashtra since 2008. We offer construction, operation & maintenance, buildings & industrial projects, and manufacture high-quality bitumen mixes and ready-mix concrete.",
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Yashraj Infrastructure" }],
  creator: "Yashraj Infrastructure",
  publisher: "Yashraj Infrastructure",
  applicationName: SITE_NAME,
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
    url: SITE_URL,
    siteName: SITE_FULL_NAME,
    title: "Yashraj Infrastructure | Building Beyond Horizons",
    description:
      "Trusted government partner in Navi Mumbai. Infrastructure projects across Maharashtra. Construction, O&M, bitumen mixes, and ready-mix concrete.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Yashraj Infrastructure - Infrastructure Company in Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashraj Infrastructure | Building Beyond Horizons",
    description:
      "Trusted government partner in Navi Mumbai. Infrastructure across Maharashtra.",
    images: [DEFAULT_OG_IMAGE],
    creator: "@yashrajinfrastructure",
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  category: "Construction",
  metadataBase: new URL(SITE_URL),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_FULL_NAME,
  alternateName: [SITE_NAME, "Yashraj Group"],
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8591954712",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "505, Ambience Court, Sector 19D, Vashi",
    addressLocality: "Navi Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400703",
    addressCountry: "IN",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Yashraj Infrastructure is a trusted infrastructure company in Mumbai and Navi Mumbai, delivering roads, bridges, flyovers, and industrial construction projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
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
