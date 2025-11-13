'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/common/SiteHeader';
import { FAQSection } from '@/components/common/FAQSection';
import { Footer } from '@/components/common/Footer';

const storyHighlights = [
  {
    title: 'Our beginnings',
    icon: 'building',
    description: 'ARINTECH was founded to revolutionize spaces with innovative, sustainable design.',
  },
  {
    title: 'Milestones of growth',
    icon: 'thumbs-up',
    description: 'We have evolved from a small company to a leading name, achieving significant milestones.',
  },
  {
    title: 'A legacy of Innovation',
    icon: 'lightbulb',
    description: 'Our story is defined by pushing design boundaries and creating inspiring projects.',
  },
  {
    title: 'Client-focused',
    icon: 'person',
    description: 'Committed to realizing our clients\' visions with innovative solutions.',
  },
  {
    title: 'Sustainable practices',
    icon: 'leaf',
    description: 'We implement eco-friendly solutions in our projects to maximize positive impact.',
  },
  {
    title: 'Collaborative results',
    icon: 'hashtag',
    description: 'We collaborate with clients and stakeholders for exceptional results.',
  },
];

const purposePillars = [
  {
    number: '01',
    title: 'Innovative perspective',
    description: 'Bringing original designs to life with an innovative touch.',
  },
  {
    number: '02',
    title: 'Customized solutions',
    description: 'Tailoring designs to perfectly align with the client\'s needs.',
  },
  {
    number: '03',
    title: 'Sustainable practices',
    description: 'Implementing energy-efficient and environmentally friendly solutions.',
  },
];

const partnerBadges = ['M', 'D', 'X', 'G', 'S'];


export default function AboutUsPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <SiteHeader backgroundClassName="border-b border-[#0F76F4]/20 bg-[#031B4E]/80 backdrop-blur" />

      <section className="relative overflow-hidden bg-[#031B4E] text-white">
        {/* Upper Block: Text Left, Image Right */}
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Designing spaces, bringing ideas to life
            </h1>
          </div>
          <div className="flex-1">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80"
                alt="Modern architectural building with angular roof structure"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Lower Block: Image Left, Text Right */}
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-16 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80"
                alt="Contemporary building with wave-like roofline"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <p className="text-lg leading-relaxed text-white/90 lg:text-xl">
              We are passionate about creating inspiring, attention-grabbing, and enduring spaces that adapt to innovation.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#031B4E]"
            >
              Our services
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* New Section: White text + Orange partners */}
      <section className="bg-white">
        {/* Upper White Section with Text */}
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            <span className="text-gray-400">Experience innovative architecture that transforms your </span>
            <span className="text-gray-900 font-bold">vision into reality.</span>
          </h2>
        </div>

        {/* Lower Orange Section with Partner Logos */}
        <div className="relative overflow-hidden bg-orange-500 py-16">
          {/* Subtle wavy pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
              <path
                d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z"
                fill="white"
                className="animate-pulse"
              />
              <path
                d="M0,150 Q300,100 600,150 T1200,150 L1200,200 L0,200 Z"
                fill="white"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Partner Logos Grid */}
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-4 gap-8 md:grid-cols-5">
              {/* Logo 1: Abstract M/W shape */}
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 p-3">
                  <svg viewBox="0 0 24 24" fill="white" className="h-full w-full">
                    <path d="M4 4h4v16H4V4zm6 0h4v16h-4V4zm6 0h4v16h-4V4z" />
                  </svg>
                </div>
              </div>

              {/* Logo 2: Play button triangle */}
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 p-3">
                  <svg viewBox="0 0 24 24" fill="white" className="h-full w-full">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Logo 3: Circular M */}
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 p-3">
                  <span className="text-2xl font-bold text-white">M</span>
                </div>
              </div>

              {/* Logo 4: C with dots */}
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 p-3">
                  <svg viewBox="0 0 24 24" fill="white" className="h-full w-full">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <circle cx="8" cy="8" r="1.5" fill="white" />
                    <circle cx="16" cy="8" r="1.5" fill="white" />
                    <circle cx="12" cy="16" r="1.5" fill="white" />
                  </svg>
                </div>
              </div>

              {/* Logo 5: Hexagon with text */}
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 p-2">
                  <div className="text-center">
                    <div className="text-xs font-bold text-white">LOREM</div>
                    <div className="text-[8px] text-white/80">IPSUM</div>
                  </div>
                </div>
              </div>

              {/* Logo 6: D with arrow */}
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 p-3">
                  <svg viewBox="0 0 24 24" fill="white" className="h-full w-full">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <path d="M8 8h4v8H8V8zm6 0l4 4-4 4V8z" />
                  </svg>
                </div>
              </div>

              {/* Logo 7: X pattern */}
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 p-3">
                  <svg viewBox="0 0 24 24" fill="white" className="h-full w-full">
                    <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Logo 8: Mountain range */}
              <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 p-3">
                  <svg viewBox="0 0 24 24" fill="white" className="h-full w-full">
                    <path d="M3 20l9-9 9 9H3z" />
                    <path d="M6 20l6-6 6 6H6z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className="border-t border-[#0F76F4] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Side: Heading and Description */}
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">OUR PURPOSE</p>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Our purpose
              </h2>
              <p className="text-base leading-relaxed text-gray-500">
                Focused on creativity and precision, we turn ideas into lasting designs.
              </p>
            </div>

            {/* Right Side: Numbered Items */}
            <div className="space-y-0">
              {purposePillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className={`border-b border-gray-200 py-8 ${index === purposePillars.length - 1 ? 'border-b-0' : ''}`}
                >
                  <div className="flex gap-6">
                    <span className="text-2xl font-light text-gray-400">{pillar.number}</span>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">{pillar.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-500">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="border-t border-[#0F76F4]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <header className="mb-12 max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">OUR STORY</p>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Our story
            </h2>
            <p className="text-base text-gray-500">
              How we started and where we are heading.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {storyHighlights.map((highlight) => (
              <article
                key={highlight.title}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                {/* Subtle circular pattern in upper-right */}
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gray-100 opacity-30 blur-2xl" />

                {/* Icon */}
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#031B4E]">
                  {highlight.icon === 'building' && (
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  )}
                  {highlight.icon === 'thumbs-up' && (
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  )}
                  {highlight.icon === 'lightbulb' && (
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                  {highlight.icon === 'person' && (
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {highlight.icon === 'leaf' && (
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  )}
                  {highlight.icon === 'hashtag' && (
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="relative space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">{highlight.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{highlight.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Connect with us Marquee */}
      <section className="border-y border-[#0F76F4] bg-gray-100 py-4">
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-12">
            {[Array.from({ length: 5 }), Array.from({ length: 5 })].map((iteration, outerIdx) => (
              <div key={outerIdx} className="flex items-center gap-12 pr-12">
                {iteration.map((_, idx) => (
                  <span
                    key={`${outerIdx}-${idx}`}
                    className="flex items-center gap-3 whitespace-nowrap text-lg font-semibold text-gray-700"
                  >
                    connect with us
                    {/* Custom right-angle arrow: square with diagonal */}
                    <svg
                      className="h-5 w-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Diagonal line (the stick) */}
                      <line
                        x1="4"
                        y1="16"
                        x2="16"
                        y2="4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      {/* Right-angle arrowhead (adjacent sides of square) */}
                      <line
                        x1="16"
                        y1="4"
                        x2="12"
                        y2="4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="16"
                        y1="4"
                        x2="16"
                        y2="8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white">
        <FAQSection />
      </div>

      <section className="border-t border-[#0F76F4]/10 bg-[#F7F9FC]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="rounded-[2.5rem] border border-[#0E0E0E]/10 bg-white px-8 py-12 text-center shadow-[0_20px_48px_rgba(9,28,62,0.12)] sm:px-12">
            <p className="text-xs uppercase tracking-[0.35em] text-[#031B4E]/50">Let’s collaborate</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#031B4E] sm:text-[2.75rem]">
              Ready to explore your next project?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[#031B4E]/60">
              Share a few details about your ambitions and we’ll set up a focused session to map possibilities,
              shape budgets, and define clear next steps.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F76F4] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0c5cd6]"
              >
                Schedule a call
                <span className="text-lg">↗</span>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F76F4]/20 px-6 py-3 text-sm font-semibold text-[#031B4E] transition hover:-translate-y-0.5 hover:bg-[#D2FDFF]/40"
              >
                Browse case studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


