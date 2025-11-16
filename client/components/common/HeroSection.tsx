import Image from "next/image";

import { PrimaryButton } from "./PrimaryButton";

export function HeroSection() {
  return (
    <section
      id="home"
      data-hero-root
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
      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 pb-16 pt-[20vh] sm:items-start">
        <div className="relative isolate text-center text-[#0E0E0E] sm:text-left">
          <div className="pointer-events-none absolute -inset-x-16 -top-24 h-[45vh] bg-gradient-to-b from-[#FFD700]/12 via-transparent to-transparent blur-[110px]" />
          <h1 className="relative text-5xl font-bold uppercase tracking-[0.2em] sm:text-[4.75rem] lg:text-[6.5rem]">
            YASHRAJ
          </h1>
        </div>
        <div className="mt-10 w-full max-w-md space-y-6 text-center text-[#0E0E0E]/80 sm:text-left">
          <p className="text-xl leading-relaxed">
            Yashraj Constructions delivers iconic bridges and contemporary urban
            landmarks crafted with engineering excellence and bold design.
          </p>
          <PrimaryButton
            href="/projects"
            variant="primary"
            className="tracking-[0.1em]"
          >
            Get started
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
