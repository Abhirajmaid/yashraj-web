"use client";

import { useEffect, useState } from "react";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { PrimaryButton } from "./PrimaryButton";

export function StickyHeader() {
  const [heroPresent, setHeroPresent] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(true);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-root]");

    if (!hero) {
      setHeroPresent(false);
      setShowBackdrop(true);
      return;
    }

    setHeroPresent(true);

    const updateBackdrop = () => {
      const { bottom } = hero.getBoundingClientRect();
      setShowBackdrop(bottom <= 0);
    };

    updateBackdrop();
    window.addEventListener("scroll", updateBackdrop, { passive: true });
    window.addEventListener("resize", updateBackdrop);

    return () => {
      window.removeEventListener("scroll", updateBackdrop);
      window.removeEventListener("resize", updateBackdrop);
    };
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4 sm:px-6">
        <div
          className={`pointer-events-auto flex w-full max-w-6xl items-center gap-6 rounded-full border px-5 py-3 transition-all duration-500 ${
            showBackdrop
              ? "border-white/25 bg-white/60 text-[#0E0E0E] shadow-[0_18px_40px_rgba(14,14,14,0.18)] backdrop-blur-md"
              : "border-transparent bg-transparent text-white"
          }`}
        >
          <Logo />
          <div className="flex flex-1 justify-center">
            <Navigation variant={showBackdrop ? "dark" : "light"} />
          </div>
          <PrimaryButton
            href="/contact"
            variant={showBackdrop ? "dark" : "secondary"}
            size="sm"
            className="uppercase tracking-[0.12em]"
          >
            Contact
          </PrimaryButton>
        </div>
      </header>
      {!heroPresent ? <div className="h-[88px]" aria-hidden /> : null}
    </>
  );
}


