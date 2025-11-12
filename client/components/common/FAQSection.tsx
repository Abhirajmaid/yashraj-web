"use client";
import { useState } from "react";
import { FAQItem } from "./FAQItem";
import { SectionHeader } from "./SectionHeader";
import { faqItems } from "./faqData";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-[#FFD700] py-24 text-[#0E0E0E]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,14,14,0.08),transparent_65%)]" />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 px-6 lg:px-8">
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          title="Your questions, answered with clarity."
          description="To help you make informed decisions, we’ve compiled answers to some of the most commonly asked questions."
          align="center"
          eyebrowClassName="text-[#0E0E0E]/50"
          titleClassName="text-[#0E0E0E]"
          descriptionClassName="text-[#0E0E0E]/60 max-w-2xl"
        />
        <div className="rounded-[32px] border border-white/40 bg-white/80 p-8 shadow-[0_20px_50px_rgba(14,14,14,0.12)] backdrop-blur">
          {faqItems.map((item, index) => (
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

