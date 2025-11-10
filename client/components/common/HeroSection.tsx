import Image from "next/image";
import { IconBadge } from "./IconBadge";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { PrimaryButton } from "./PrimaryButton";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#0F76F4] text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0F76F4] via-[#0F6AE0] to-[#0E5BC6]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col gap-16 px-6 pb-24 pt-10 sm:pt-12 lg:px-10 xl:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Logo />
          <Navigation />
        </div>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr),minmax(0,1.15fr)] lg:items-end">
          <div className="flex flex-col gap-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Architecture Studio
            </p>
            <h1 className="text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl xl:text-[6.5rem]">
              Altuz Lab
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-white/80">
              Bring your architectural projects to life with a template that
              puts your work front and center.
            </p>
            <PrimaryButton href="/projects">Get started</PrimaryButton>
          </div>
          <div className="relative">
            <div className="relative mx-auto max-w-[560px] overflow-hidden rounded-[40px] border border-white/20 bg-white/10 p-3 shadow-[0_40px_80px_rgba(15,50,120,0.45)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px]">
                <Image
                  src="/hero-building.svg"
                  alt="Modern glass building"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
            <IconBadge
              icon="/globe.svg"
              alt="Global reach"
              className="absolute -top-8 left-16"
            />
            <IconBadge
              icon="/window.svg"
              alt="Project window"
              className="absolute top-1/2 right-8 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-12 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
    </section>
  );
}
