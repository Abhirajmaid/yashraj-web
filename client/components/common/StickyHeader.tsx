"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import Button from "./Button";
import { useEnquiryModal } from "@/contexts/EnquiryModalContext";

export function StickyHeader() {
  const pathname = usePathname();

  // Hide marketing navigation on all admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const [isScrolled, setIsScrolled] = useState(false);
  const [heroPresent, setHeroPresent] = useState(true); // Start as true to prevent flash
  const [mobileScrolled, setMobileScrolled] = useState(false);
  const { openModal } = useEnquiryModal();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-root]");

    if (!hero) {
      // Use setTimeout to avoid synchronous setState
      setTimeout(() => {
        setHeroPresent(false);
        setIsScrolled(true);
        // Don't set mobileScrolled to true initially - let scroll handle it
      }, 0);
    } else {
      setTimeout(() => {
        setHeroPresent(true);
      }, 0);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setMobileScrolled(scrollPosition > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Mobile Header - Logo Only */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[100] bg-transparent" style={{ pointerEvents: "auto" }}>
        {/* White Background on Scroll */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            mobileScrolled
              ? "opacity-100 bg-white border-b border-dark/10 shadow-md"
              : "opacity-0 bg-transparent pointer-events-none"
          }`}
        />

        {/* Logo Container - Centered */}
        <div className="relative z-10 px-4 py-3.5 flex items-center justify-center">
          <div className={mobileScrolled ? "" : "drop-shadow-lg"}>
            <Logo />
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header
        className={`hidden lg:block fixed z-[100] transition-all duration-300 ${
          isScrolled ? "top-6 left-4 right-4" : "top-6 left-0 right-0"
        }`}
        style={{ pointerEvents: "auto" }}
      >
        {/* Initial background to prevent color flash - ensures header area is covered */}
        <div className="absolute inset-0 bg-transparent pointer-events-none" />

        {/* Glass Morphism Background */}
        <div
          className={`absolute inset-0 backdrop-blur-xl max-w-7xl mx-auto rounded-3xl transition-all duration-500 ${
            isScrolled
              ? "opacity-100 translate-y-0 bg-white border border-dark/10 shadow-2xl shadow-black/20"
              : "opacity-0 -translate-y-2 bg-transparent pointer-events-none"
          }`}
        >
          {/* Glass effect overlay */}
          <div
            className={`absolute inset-0 rounded-3xl bg-linear-to-br from-white/30 to-white/10 transition-opacity duration-500 ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div
          className={`mx-auto max-w-7xl relative z-10 transition-all duration-300 ${
            isScrolled ? "px-6 py-4" : "px-6 py-4"
          }`}
        >
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 relative z-10" style={{ pointerEvents: "auto" }}>
              <Navigation variant={isScrolled ? "dark" : "light"} />
            </div>

            {/* Contact Button */}
            <Button
              // onClick={openModal}
              link="/contact"
              type={isScrolled ? "primary" : "secondary"}
              size="sm"
              className="uppercase tracking-[0.12em]"
            >
              Contact
            </Button>
          </nav>
        </div>
      </header>
      {!heroPresent ? <div className="h-[88px]" aria-hidden /> : null}
    </>
  );
}
