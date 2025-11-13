'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/common/SiteHeader';
import { FAQSection } from '@/components/common/FAQSection';
import { Footer } from '@/components/common/Footer';

export default function ContactPage() {
  return (
    <main className="bg-[#0F76F4] text-[#0E0E0E]">
      <SiteHeader
        backgroundClassName="border-b border-[#D2FDFF]/20 bg-[#031B4E]/80 backdrop-blur"
        contactHref="#contact-form"
      />

      <section className="relative isolate overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80"
          alt="Modern home exterior"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031B4E]/80 via-[#0F76F4]/70 to-[#031B4E]/65" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-20 lg:flex-row lg:items-start lg:gap-16">
          <div className="w-full max-w-xl rounded-[3rem] border border-white/30 bg-white/90 p-10 shadow-[0_32px_80px_rgba(5,20,53,0.35)] backdrop-blur-lg" id="contact-form">
            <h3 className="text-3xl font-semibold text-[#031B4E]">Connect with us</h3>
            <p className="mt-2 text-sm text-[#031B4E]/70">Share your vision with us.</p>

            <form className="mt-8 space-y-5">
              <label className="block space-y-2 text-sm text-[#031B4E]/70">
                <span>Full name</span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-[#031B4E]/20 bg-white px-4 py-3 text-sm text-[#031B4E] outline-none transition focus:border-[#0F76F4]"
                />
              </label>

              <label className="block space-y-2 text-sm text-[#031B4E]/70">
                <span>Email address</span>
                <input
                  type="email"
                  placeholder="Your mail address"
                  className="w-full rounded-xl border border-[#031B4E]/20 bg-white px-4 py-3 text-sm text-[#031B4E] outline-none transition focus:border-[#0F76F4]"
                />
              </label>

              <label className="block space-y-2 text-sm text-[#031B4E]/70">
                <span>Company name</span>
                <input
                  type="text"
                  placeholder="Company name"
                  className="w-full rounded-xl border border-[#031B4E]/20 bg-white px-4 py-3 text-sm text-[#031B4E] outline-none transition focus:border-[#0F76F4]"
                />
              </label>

              <label className="block space-y-2 text-sm text-[#031B4E]/70">
                <span>Project information</span>
                <textarea
                  rows={4}
                  placeholder="Project description"
                  className="w-full rounded-xl border border-[#031B4E]/20 bg-white px-4 py-3 text-sm text-[#031B4E] outline-none transition focus:border-[#0F76F4]"
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#0E0E0E] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-black"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <FAQSection />
      </div>

      <section className="relative isolate overflow-hidden bg-[#f2f2f2]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-[2.5rem] border border-black/10 bg-[#121212] text-white shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
            <div className="relative overflow-hidden rounded-[2.5rem]">
              <img
                src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80"
                alt="Cleaning equipment"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-50"
              />
              <div className="relative grid gap-8 rounded-[2.5rem] bg-gradient-to-r from-black/80 via-black/75 to-black/65 px-10 py-12 lg:grid-cols-[2fr,1fr] lg:px-16">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60">Services</p>
                    <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                      Cleaning That Works Around You
                    </h1>
                    <p className="max-w-md text-sm text-white/70">
                      Our expert cleaners handle the mess so you can focus on what matters.
                    </p>
                  </div>

                  <div className="inline-flex flex-col gap-4 rounded-3xl bg-[#F8D90F] px-6 py-5 text-sm font-medium text-[#0E0E0E] shadow-[0_18px_40px_rgba(246,217,15,0.35)] sm:flex-row sm:items-center sm:justify-between">
                    <span className="uppercase tracking-[0.2em]">Got a space in need of a refresh?</span>
                    <Link
                      href="#contact-form"
                      className="inline-flex items-center justify-center rounded-full bg-[#031B4E] px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-0.5 hover:bg-[#052f78]"
                    >
                      Schedule a Call
                    </Link>
                  </div>
                </div>

                <div className="flex h-full flex-col justify-center gap-3 text-right text-sm uppercase tracking-[0.25em] text-white/70">
                  <span className="inline-flex items-center justify-end gap-2">
                    Home cleaning <span className="text-white">•</span>
                  </span>
                  <span className="inline-flex items-center justify-end gap-2">
                    Store cleaning <span className="text-white">•</span>
                  </span>
                  <span className="inline-flex items-center justify-end gap-2">
                    Workspace cleaning <span className="text-white">•</span>
                  </span>
                  <span className="inline-flex items-center justify-end gap-2">
                    Move in / out cleaning <span className="text-white">•</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


