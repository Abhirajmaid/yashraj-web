"use client";

import React from "react";
import Button from "./Button";

export function FullWidthCTA() {
  return (
    <section className="w-full bg-brand-primary text-white py-20">
      <div className="flex flex-col items-center justify-center mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          Ready to build <span className="font-black">with us?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/90">
          From highways and flyovers to bitumen mixes and ready-mix concrete —
          we deliver quality, reliability, and complete infrastructure
          solutions. Let&apos;s discuss your next project.
        </p>

        <Button
          type="secondary"
          size="lg"
          className="rounded-full text-sm mt-8 font-semibold shadow-[0_8px_24px_rgba(var(--color-primary-rgb),0.18)]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Schedule a Call
        </Button>
      </div>
    </section>
  );
}
