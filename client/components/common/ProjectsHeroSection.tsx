import Image from "next/image";
import Link from "next/link";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export function ProjectsHeroSection() {
  return (
    <section
      id="projects"
      className="relative isolate min-h-screen overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/yashrajhero.jpg"
          alt="Projects hero background"
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
            className="rounded-full bg-[#FFD700] px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#0E0E0E] shadow-[0_10px_24px_rgba(14,14,14,0.18)] transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700]"
          >
            Contact us
          </Link>
        </div>
      </header>
      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 pb-16 pt-[20vh]">
        <h1 className="text-6xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem]">
          Yashraj
        </h1>
      </div>
    </section>
  );
}

