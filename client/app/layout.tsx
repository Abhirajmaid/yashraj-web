import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Newsreader } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/common/StickyHeader";
import { BottomNavbar } from "@/components/common/BottomNavbar";

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
  title: "Altuz Lab",
  description:
    "Bring your architectural projects to life with a bold, modern presentation.",
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
        <StickyHeader />
        {children}
        <BottomNavbar />
      </body>
    </html>
  );
}
