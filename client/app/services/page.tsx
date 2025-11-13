'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/common/SiteHeader';
import { ServiceCTASection } from '@/components/common/ServiceCTASection';
import { Footer } from '@/components/common/Footer';
import { FAQSection } from '@/components/common/FAQSection';

const services = [
  {
    title: 'Functional design',
    description: 'Functional design organizes the project to meet its use objectives.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Renovation of spaces',
    description: 'Updating existing areas to improve their functionality, aesthetics and comfort.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Interior design',
    description: 'The Interior design combined aesthetics and functionality to improve user comfort.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Urban design',
    description: 'Urban design is the development of public and private spaces in urban environments.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Sustainable design',
    description: 'An approach that seeks to create solutions that minimize environmental impact.',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Project management',
    description: 'Planning and control process of a construction project from its beginning.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
  },
];

const serviceFeatures = [
  {
    title: 'Innovative Solutions',
    description: 'Cutting-edge design approaches that push boundaries while maintaining practicality.',
  },
  {
    title: 'Sustainable Practices',
    description: 'Eco-friendly materials and energy-efficient designs that reduce environmental impact.',
  },
  {
    title: 'Client-Centric Approach',
    description: 'Tailored solutions that align perfectly with your vision, budget, and timeline.',
  },
  {
    title: 'Expert Team',
    description: 'Experienced architects and designers committed to delivering exceptional results.',
  },
];


export default function ServicesPage() {
  return (
    <main className="bg-white text-[#031B4E]">
      <SiteHeader backgroundClassName="border-b border-[#0F76F4]/20 bg-[#031B4E]/80 backdrop-blur" />

      {/* Hero Section with Blue Sky and Concrete Background */}
      <section className="relative min-h-[80vh] overflow-hidden">
        {/* Blue Sky Background - Upper Half */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#5BA3D0] to-[#4A90C2]" />

        {/* Concrete Architectural Structure - Lower Half */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%]">
          {/* Base concrete color */}
          <div className="h-full w-full bg-gradient-to-b from-gray-200/90 via-gray-300 to-gray-400" />
          
          {/* Concrete texture pattern */}
          <div
            className="absolute inset-0 h-full w-full opacity-60"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='concrete' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Crect fill='%23d0d0d0' width='60' height='60'/%3E%3Cpath d='M0 30 Q15 25 30 30 T60 30' stroke='%23a0a0a0' stroke-width='1.5' fill='none' opacity='0.4'/%3E%3Cpath d='M0 45 Q15 40 30 45 T60 45' stroke='%23a0a0a0' stroke-width='1.5' fill='none' opacity='0.3'/%3E%3Cpath d='M20 0 L20 60 M40 0 L40 60' stroke='%23b0b0b0' stroke-width='0.5' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='60' height='60' fill='url(%23concrete)'/%3E%3C/svg%3E")`,
              backgroundSize: '120px 120px',
            }}
          />
          
          {/* Curved brutalist wall effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-200/30 to-gray-500/50" />
          
          {/* Highlight and shadow effects for depth */}
          <div className="absolute left-0 top-0 h-full w-2/5 bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
          <div className="absolute right-0 top-0 h-full w-2/5 bg-gradient-to-l from-gray-600/40 via-gray-500/20 to-transparent" />
          
          {/* Additional texture layers */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-500/80 to-transparent" />
        </div>

        {/* Main Title */}
        <div className="relative z-10 flex min-h-[80vh] items-center justify-center px-6">
          <h1 className="relative text-center text-6xl font-bold uppercase tracking-wider text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Yashraj's{' '}
            <span className="relative inline-block">
              Services
              {/* Decorative icon on the 's' - architectural/service icon */}
              <svg
                className="absolute -right-6 top-1 h-6 w-6 text-gray-800 sm:-right-8 sm:h-8 sm:w-8 md:-right-10 md:h-10 md:w-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Building/architecture icon */}
                <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
                <path d="M9 9v0M9 12v0M9 15v0M9 18v0" />
              </svg>
            </span>
          </h1>
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

      {/* Our Services Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Section: Title and Introduction - 1/3 of the page */}
            <div className="space-y-6 lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">SERVICE INCLUDED</p>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Our services
              </h2>
              <p className="text-base leading-relaxed text-gray-700">
                At Yashraj, we design unique architectural solutions that bring your vision to life.
              </p>
            </div>

            {/* Right Section: Service Cards Grid (2 columns x 3 rows) - 2/3 of the page */}
            <div className="grid grid-cols-2 gap-6 lg:col-span-8">
              {services.map((service) => (
                <div key={service.title} className="flex flex-col">
                  {/* Image - Separate entity */}
                  <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Information - Separate entity below image */}
                  <div className="flex flex-col">
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{service.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-500">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 transition hover:text-gray-700"
                    >
                      Learn more
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <div className="bg-white">
        <FAQSection />
      </div>

      <div className="bg-white">
        <ServiceCTASection />
      </div>

      <Footer />
    </main>
  );
}

