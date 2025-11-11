import Image from "next/image";
import Link from "next/link";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { PrimaryButton } from "./PrimaryButton";
export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden bg-black text-[#0E0E0E]"
    >
      <div className="absolute inset-0">
        <Image
          src="/yashrajhero1.jpg"
          alt="Bridge architecture at dusk"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      <header className="relative z-20 px-6 pt-6">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-6">
          <Logo />
          <div className="flex flex-1 justify-center">
            <Navigation />
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-[#D2FDFF] px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#0E0E0E] shadow-[0_10px_24px_rgba(14,14,14,0.18)] transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2FDFF]"
          >
            Contact us
          </Link>
        </div>
      </header>
      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 pb-16 pt-[20vh] sm:items-start">
        <div className="relative isolate text-center text-[#0E0E0E] sm:text-left">
          <div className="pointer-events-none absolute -inset-x-16 -top-24 h-[45vh] bg-gradient-to-b from-[#D2FDFF]/12 via-transparent to-transparent blur-[110px]" />
          <h1 className="relative text-5xl font-semibold uppercase tracking-[0.2em] sm:text-[4.75rem] lg:text-[6.5rem]">
            YASHRAJ
          </h1>
        </div>
        <div className="mt-10 w-full max-w-md space-y-6 text-center text-[#0E0E0E]/80 sm:text-left">
          <p className="text-base leading-relaxed">
            Yashraj Constructions delivers iconic bridges and contemporary urban
            landmarks crafted with engineering excellence and bold design.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 rounded-full bg-[#D2FDFF] px-5 py-2 text-sm font-semibold text-[#0E0E0E] shadow-[0_12px_24px_rgba(14,14,14,0.2)] transition hover:-translate-y-0.5 hover:bg-white"
          >
            <span className="tracking-[0.1em]">Get started</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0E0E0E] text-white">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
