"use client";
import { useState } from "react";
import { FAQItem } from "@/components/common/FAQItem";
import { SectionHeader } from "@/components/common/SectionHeader";
import { blogsFaqItems } from "@/data/blogsFaq";

export function BlogsFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-white text-brand-dark"
    >
      {/* Top left gradient with primary color - same as ProjectsSection */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-primary/10 via-transparent to-transparent" />
      
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 px-6 py-24 lg:px-8">
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          title="Your questions, answered with clarity."
          description="To help you make informed decisions, we've compiled answers to some of the most commonly asked questions about our blog and articles."
          align="center"
          eyebrowClassName="text-brand-dark/50"
          titleClassName="text-brand-dark"
          descriptionClassName="text-brand-dark/70 max-w-2xl"
        />
        <div className="rounded-2xl border border-brand-gray-light/50 bg-white p-8 shadow-[0_4px_20px_rgba(var(--color-dark-rgb),0.08)]">
          {blogsFaqItems.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? -1 : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

