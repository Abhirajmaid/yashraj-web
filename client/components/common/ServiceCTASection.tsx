"use client";

import Button from "./Button";
import { useEnquiryModal } from "@/contexts/EnquiryModalContext";

export function ServiceCTASection() {
  const { openModal } = useEnquiryModal();
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
        <div className="rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(var(--color-dark-rgb),0.08)] lg:p-12">
          {/* Content */}
          <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr] lg:items-center lg:gap-12">
            {/* Left Column - Main Content */}
            <div className="space-y-4 text-brand-dark">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Spaces Refined for{" "}
                <span className="text-brand-primary">Inspired Living</span>
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-brand-dark/70">
                From bespoke residences to contemporary workspaces, we transform
                every environment with precision, creativity, and the signature
                Yashraj touch.
              </p>
            </div>

            {/* Right Column - CTA */}
            <div className="flex flex-col gap-4">
              <div className="rounded-xl bg-brand-secondary/10 p-6">
                <p className="mb-4 text-sm font-semibold leading-snug text-brand-dark lg:text-base">
                  Let&apos;s plan a consultation tailored to your vision.
                </p>
                <Button
                  onClick={openModal}
                  type="primary"
                  size="lg"
                  className="w-full sm:w-[30%]"
                >
                  Schedule a Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
