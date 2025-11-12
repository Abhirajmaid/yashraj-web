import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

export function ServiceCTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-[#FFD700]/5 to-white py-12 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,215,0,0.25),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
        <div className="relative overflow-hidden rounded-[32px] border border-[#FFD700]/40 bg-gradient-to-br from-[#0E0E0E] to-[#1a1a1a] shadow-[0_40px_80px_rgba(14,14,14,0.4)]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/yashrajhero1.jpg"
              alt="Premium interior service"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E]/95 via-[#0E0E0E]/80 to-[#0E0E0E]/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(255,215,0,0.1),transparent_60%)]" />
          </div>

          {/* Content */}
          <div className="relative grid gap-6 px-6 py-8 lg:grid-cols-[1.2fr,1fr] lg:items-center lg:gap-8 lg:px-10 lg:py-10">
            {/* Left Column - Main Content */}
            <div className="space-y-4 text-white">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 px-3 py-1 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFD700] animate-pulse" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFD700]">
                    Premium Services
                  </p>
                </div>
                <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  Spaces Refined for{" "}
                  <span className="bg-gradient-to-r from-[#FFD700] to-[#FFE55C] bg-clip-text text-transparent">
                    Inspired Living
                  </span>
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-white/90 lg:text-base">
                From bespoke residences to contemporary workspaces, we transform every environment
                with precision, creativity, and the signature Yashraj touch.
              </p>
            </div>

            {/* Right Column - Specialty & CTA */}
            <div className="flex flex-col gap-4">
              {/* Specialty Section */}
              <div className="space-y-2.5 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FFD700]">
                  Our Specialty
                </p>
                <ul className="space-y-2">
                  {[
                    "ARCHITECTURAL RENOVATIONS",
                    "LUXURY INTERIOR DESIGN",
                    "WORKPLACE TRANSFORMATIONS",
                    "TURNKEY PROJECT DELIVERY",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-xs font-medium tracking-[0.1em] text-white/90 transition hover:text-[#FFD700]"
                    >
                      <div className="h-1 w-1 rounded-full bg-[#FFD700]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFE55C] p-5 shadow-[0_20px_50px_rgba(255,215,0,0.3)] transition-all hover:shadow-[0_25px_60px_rgba(255,215,0,0.4)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex flex-col gap-3">
                  <p className="text-sm font-bold leading-snug text-[#0E0E0E] lg:text-base">
                    Let's plan a consultation tailored to your vision.
                  </p>
                  <Link
                    href="/contact"
                    className="group/btn inline-flex w-fit items-center gap-2 rounded-full bg-[#0E0E0E] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(14,14,14,0.4)] transition-all hover:-translate-y-1 hover:bg-[#1a1a1a] hover:shadow-[0_16px_40px_rgba(14,14,14,0.5)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700]"
                  >
                    <span>Schedule a Call</span>
                    <Icon
                      icon="solar:arrow-right-bold"
                      className="text-base transition-transform group-hover/btn:translate-x-1"
                      style={{ fontSize: "16px" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

