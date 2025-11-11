import Link from "next/link";

export function ConnectMarquee() {
  const items = Array.from({ length: 6 });

  return (
    <section
      aria-live="off"
      className="relative bg-[#f21b29] text-[#D2FDFF]"
    >
      <Link
        href="/contact"
        className="group relative block h-[60px] overflow-hidden focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2FDFF]"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f21b29] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f21b29] to-transparent" />

        <div className="flex h-full w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {[items, items].map((iteration, outerIdx) => (
            <div key={outerIdx} className="flex items-center gap-12 pr-12">
              {iteration.map((_, idx) => (
                <span
                  key={`${outerIdx}-${idx}`}
                  className="flex items-center gap-3 whitespace-nowrap text-lg font-semibold uppercase tracking-[0.4em] transition group-hover:translate-y-[-1px]"
                >
                  Connect with us
                  <span className="text-2xl leading-none">↗</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </Link>
    </section>
  );
}

