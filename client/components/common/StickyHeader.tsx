/* eslint-disable react-hooks/rules-of-hooks */
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
  const isHeroOverlay = heroPresent && !isScrolled;
  useEnquiryModal();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-root]");

    if (!hero) {
      // No hero (e.g. project details, contact): always use solid header so nav is visible
      setHeroPresent(false);
      setIsScrolled(true);
      setMobileScrolled(true);
    } else {
      setHeroPresent(true);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const hasHero = document.querySelector("[data-hero-root]");
      // Update hero presence dynamically in case the hero mounts after header
      setHeroPresent(Boolean(hasHero));
      if (!hasHero) {
        // Pages without hero: always show solid header and dark nav
        setIsScrolled(true);
        setMobileScrolled(true);
        return;
      }
      setIsScrolled(scrollPosition > 50);
      setMobileScrolled(scrollPosition > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <>
      {/* Mobile Header - Logo + Contact (line-wise like desktop) */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-200 bg-transparent"
        style={{ pointerEvents: "auto" }}
      >
        {/* White Background on Scroll */}
        {/* Safari/WebKit: do not combine opacity transitions with backdrop-filter on the same
            layer — blur fails on macOS/iOS. Use visibility + solid-enough bg; blur via inline webkit. */}
        <div
          className={`absolute inset-0 border-b border-white/10 shadow-md transition-[visibility] duration-500 ${
            mobileScrolled
              ? "visible bg-white/25"
              : "invisible bg-transparent pointer-events-none"
          }`}
          style={
            mobileScrolled
              ? {
                  WebkitBackdropFilter: "blur(16px)",
                  backdropFilter: "blur(16px)",
                  transform: "translate3d(0, 0, 0)",
                }
              : undefined
          }
        />

        <div className={`relative z-10 px-4 flex items-center justify-between ${mobileScrolled ? "py-2.5" : "py-3.5"}`}>
          <div className={mobileScrolled ? "" : "drop-shadow-lg"}>
            <Logo
              compact={mobileScrolled}
              variant={mobileScrolled ? "dark" : "light"}
            />
          </div>
          <Button
            link="/contact"
            type={mobileScrolled ? "primary" : "secondary"}
            size="sm"
            className="uppercase tracking-[0.12em] shrink-0"
          >
            Contact
          </Button>
        </div>
      </header>

      {/* Desktop Header */}
      <header
        className={`hidden lg:block fixed z-200 transition-all duration-300 ${
          isScrolled ? "top-6 left-4 right-4" : "top-0 left-0 right-0"
        }`}
        style={{ pointerEvents: "auto" }}
      >
        {/* Initial background to prevent color flash - ensures header area is covered */}
        <div className="absolute inset-0 bg-transparent pointer-events-none" />

        {/* Glass background: WebKit needs explicit -webkit-backdrop-filter and must not share
            an opacity transition on the same node (breaks blur on Safari/macOS). */}
        <div
          className={`absolute inset-0 max-w-7xl mx-auto rounded-3xl border border-white/12 shadow-2xl shadow-black/12 transition-[visibility,transform] duration-500 ${
            isScrolled
              ? "visible translate-y-0 bg-white/25"
              : "invisible -translate-y-2 pointer-events-none border-transparent shadow-none bg-transparent"
          }`}
          style={
            isScrolled
              ? {
                  WebkitBackdropFilter: "blur(24px)",
                  backdropFilter: "blur(24px)",
                  transform: "translate3d(0, 0, 0)",
                }
              : undefined
          }
        >
          <div
            className={`absolute inset-0 rounded-3xl bg-linear-to-br from-white/20 to-white/6 transition-opacity duration-500 ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div
          className={`mx-auto max-w-7xl relative z-10 transition-all duration-300 ${
            isHeroOverlay ? "px-6 pt-6 pb-4" : "px-6 py-2.5"
          }`}
        >
          <nav className="relative flex items-center justify-between">
            {/* Logo - full logo when over hero, icon when scrolled */}
            <div className={isHeroOverlay ? "relative z-10 shrink-0" : ""}>
              <Logo variant={isScrolled ? "dark" : "light"} compact={isScrolled} />
            </div>

            {/* Desktop Navigation: true viewport-row center on initial hero; inline when scrolled */}
            {isHeroOverlay ? (
              <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
                <div
                  className="pointer-events-auto relative z-10 flex items-center"
                  style={{ pointerEvents: "auto" }}
                >
                  <Navigation variant="light" />
                </div>
              </div>
            ) : (
              <div
                className="hidden items-center space-x-8 lg:flex relative z-10"
                style={{ pointerEvents: "auto" }}
              >
                <Navigation variant={isScrolled ? "dark" : "light"} />
              </div>
            )}

            {/* Contact Button */}
            <Button
              // onClick={openModal}
              link="/contact"
              type={isScrolled ? "primary" : "secondary"}
              size="sm"
              className={`uppercase tracking-[0.12em] ${isHeroOverlay ? "relative z-10 shrink-0" : ""}`}
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
