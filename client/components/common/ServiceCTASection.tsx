"use client";

import Button from "./Button";
import { useEnquiryModal } from "@/contexts/EnquiryModalContext";

export function ServiceCTASection() {
  const { openModal } = useEnquiryModal();
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
        <div className="rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgba(var(--color-dark-rgb),0.08)] lg:p-12">
          {/* Content */}
          <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr] lg:items-center lg:gap-12">
            {/* Left Column - Main Content */}
            <div className="space-y-4 text-brand-dark">
              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Ready to build{" "}
                <span className="text-brand-primary">with us?</span>
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-brand-dark/70">
                From highways and flyovers to bitumen mixes and ready-mix concrete—we deliver quality, reliability, and complete infrastructure solutions. Let's discuss your next project.
              </p>
            </div>

            {/* Right Column - Modern CTA Card */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md rounded-3xl bg-linear-to-r from-white/60 via-white/40 to-white/30 backdrop-blur-sm border border-white/10 p-6 shadow-lg">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="mb-1 text-sm font-semibold text-brand-dark">
                      Personalized consultation
                    </p>
                    <p className="text-sm text-brand-dark/70">
                      Let&apos;s plan a consultation tailored to your vision.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={openModal}
                      type="primary"
                      size="lg"
                      className="flex-1 rounded-full px-6 py-3 shadow-[0_8px_24px_rgba(var(--color-primary-rgb),0.18)]"
                    >
                      Schedule a Call
                    </Button>

                    <Button
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      type="secondary"
                      size="md"
                      className="hidden sm:inline-flex rounded-full px-4 py-2"
                    >
                      View Projects
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
