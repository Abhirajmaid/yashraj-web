"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import Button from "@/components/common/Button";
import { useEnquiryModal } from "@/contexts/EnquiryModalContext";

const TITLE = "Yashraj Infrastructure";
const SUBTITLE = "Trusted Partner, Quality Infrastructure.";

export function HeroSection() {
  const { openModal } = useEnquiryModal();

  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const words = useMemo(() => TITLE.split(" "), []);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // Intro loader removed — set final visual state immediately on mount
  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const subtitle = subRef.current;
    const cta = ctaRef.current;
    const headlineEls = wordRefs.current.filter(Boolean) as HTMLSpanElement[];

    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Respect reduced motion: show final state without motion
      gsap.set(video, { scale: 1, force3D: true });
      if (overlay) gsap.set(overlay, { opacity: 1 });
      if (headlineEls.length)
        gsap.set(headlineEls, { y: 0, opacity: 1, filter: "blur(0px)" });
      if (subtitle) gsap.set(subtitle, { y: 0, opacity: 1 });
      if (cta) gsap.set(cta, { y: 0, opacity: 1, scale: 1 });
      return;
    }

    // Immediately set the final visible state — no loader or intro timeline
    const ctx = gsap.context(() => {
      if (video)
        gsap.set(video, {
          scale: 1,
          transformOrigin: "50% 50%",
          willChange: "transform",
        });
      if (overlay) gsap.set(overlay, { opacity: 1, willChange: "opacity" });
      if (headlineEls.length) {
        gsap.set(headlineEls, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          willChange: "transform, opacity, filter",
        });
      }
      if (subtitle)
        gsap.set(subtitle, {
          y: 0,
          opacity: 1,
          willChange: "transform, opacity",
        });
      if (cta)
        gsap.set(cta, {
          y: 0,
          opacity: 1,
          scale: 1,
          willChange: "transform, opacity",
        });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [words]);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-[90vh] md:min-h-screen overflow-hidden bg-black"
      aria-label="Hero"
      data-hero-root
    >
      {/* Video background */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <video
          ref={videoRef}
          src="/upscaled-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          aria-hidden
        />
      </div>

      {/* Overlay: dark at bottom -> transparent at top */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(255,255,255,0) 60%)",
          willChange: "opacity",
        }}
        aria-hidden
      />

      {/* Content centered */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-7xl w-full text-left">
          <p
            ref={subRef}
            className="mt-6 text-white/90 max-w-2xl font-medium leading-[40px] md:leading-[60px]"
            style={{
              fontSize: "clamp(14px, 8vw, 60px)",
              willChange: "transform, opacity",
            }}
          >
            {SUBTITLE}
          </p>

          <div ref={ctaRef} className="mt-8">
            <Button onClick={openModal} type="primary" size="md">
              Get a Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Large auto-scrolling horizontal marquee (cinematic, low-opacity) */}
      <div
        className="absolute left-0 right-0 md:-bottom-3 bottom-2 pointer-events-none flex justify-center overflow-hidden"
        style={{ zIndex: 9 }}
        aria-hidden="true"
      >
        <div className="w-full max-w-full overflow-hidden">
          <div className="marquee-track">
            <div className="marquee-group">
              <span className="marquee-text">
                Infrastructure—Road Construction—Ready-Mix Concrete (RMC)
              </span>
              <span className="marquee-text">
                Infrastructure—Road Construction—Ready-Mix Concrete (RMC)
              </span>
            </div>
            <div className="marquee-group" aria-hidden="true">
              <span className="marquee-text">
                Infrastructure—Road Construction—Ready-Mix Concrete (RMC)
              </span>
              <span className="marquee-text">
                Infrastructure—Road Construction—Ready-Mix Concrete (RMC)
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          gap: 2rem;
          align-items: flex-end;
          white-space: nowrap;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          animation: marquee 18s linear infinite;
        }

        .marquee-group {
          display: inline-flex;
          align-items: center;
        }

        .marquee-text {
          display: inline-block;
          color: #fff;
          padding-bottom: 0px;
          font-weight: 400;
          letter-spacing: 0.06em;
          font-family:
            var(--font-montserrat),
            system-ui,
            -apple-system,
            "Segoe UI",
            Roboto,
            "Helvetica Neue",
            Arial,
            "Noto Sans";
          font-size: clamp(32px, 7vw, 160px);
          line-height: 1;
          padding-right: 2.5rem;
          text-transform: uppercase;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            transform: translateX(0) !important;
            opacity: 0.9;
          }
        }
        @media (max-width: 768px) {
          .marquee-text {
            font-size: clamp(32px, 14vw, 160px);
          }
        }
      `}</style>
    </section>
  );
}
