import Image from "next/image";
import Link from "next/link";

export function ServiceCTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(210,253,255,0.18),transparent_65%)]" />
      <div className="relative z-10 mx-auto max-w-6xl overflow-hidden rounded-[44px] border border-[#D2FDFF]/35 shadow-[0_32px_70px_rgba(14,14,14,0.5)]">
        <Image
          src="/yashrajhero1.jpg"
          alt="Premium interior service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
        <div className="relative grid gap-10 px-8 py-14 lg:grid-cols-[1.15fr,1fr] lg:items-center lg:px-12">
          <div className="space-y-6 text-white">
            <h2 className="text-4xl font-semibold leading-tight sm:text-[2.75rem]">
              Spaces Refined for Inspired Living
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/80">
              From bespoke residences to contemporary workspaces, we transform every environment
              with precision, creativity, and the signature Yashraj touch.
            </p>
          </div>
          <div className="flex flex-col gap-6 text-white">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D2FDFF]">
                Our Specialty
              </p>
              <ul className="space-y-2 text-sm tracking-[0.25em] text-white/80">
                <li>ARCHITECTURAL RENOVATIONS</li>
                <li>LUXURY INTERIOR DESIGN</li>
                <li>WORKPLACE TRANSFORMATIONS</li>
                <li>TURNKEY PROJECT DELIVERY</li>
              </ul>
            </div>
            <div className="rounded-[20px] bg-[#D2FDFF] px-6 py-5 text-[#0E0E0E] shadow-[0_18px_35px_rgba(14,14,14,0.25)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-base font-semibold leading-snug">
                  Let’s plan a consultation tailored to your vision.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0E0E0E] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-[0_10px_24px_rgba(14,14,14,0.35)] transition hover:-translate-y-1 hover:bg-black focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E0E0E]"
                >
                  Schedule a Call
                  <span className="text-sm">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

