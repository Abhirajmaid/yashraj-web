"use client";

import { Icon } from "@iconify/react";
import { useEnquiryModal } from "@/contexts/EnquiryModalContext";

export function ConnectMarquee() {
  const items = Array.from({ length: 6 });
  const { openModal } = useEnquiryModal();

  return (
    <section
      aria-live="off"
      className="relative bg-brand-primary text-white -mt-px"
    >
      <button
        onClick={openModal}
        className="group relative block w-full h-[60px] overflow-hidden focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-brand-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-brand-primary to-transparent" />

        <div className="flex h-full w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {[items, items].map((iteration, outerIdx) => (
            <div key={outerIdx} className="flex items-center gap-12 pr-12">
              {iteration.map((_, idx) => (
                <span
                  key={`${outerIdx}-${idx}`}
                  className="flex items-center gap-3 whitespace-nowrap text-xl font-black uppercase tracking-[0.2em] transition group-hover:-translate-y-px lg:text-2xl"
                >
                  Connect with us
                  <Icon
                    icon="solar:arrow-right-up-linear"
                    width="24"
                    height="24"
                    className="lg:w-6 lg:h-6"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </button>
    </section>
  );
}
