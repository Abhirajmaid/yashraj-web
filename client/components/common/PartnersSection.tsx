"use client";
import Image from "next/image";

const partnerImages = [
  { src: "/logo/apmc.png", alt: "APMC logo", name: "APMC", id: "apmc" },
  { src: "/logo/autade%20group.png", alt: "Autade Group logo", name: "Autade Group", id: "autade-group" },
  { src: "/logo/barc.png", alt: "BARC logo", name: "BARC", id: "barc" },
  { src: "/logo/cidco.png", alt: "CIDCO logo", name: "CIDCO", id: "cidco" },
  { src: "/logo/jkumar.png", alt: "J Kumar logo", name: "J Kumar", id: "jkumar" },
  { src: "/logo/kdmc.png", alt: "KDMC logo", name: "KDMC", id: "kdmc" },
  { src: "/logo/mcgm.png", alt: "MCGM logo", name: "MCGM", id: "mcgm" },
  { src: "/logo/MIDCLOGO.webp", alt: "MIDC logo", name: "MIDC", id: "midc" },
  { src: "/logo/mmrda.webp", alt: "MMRDA logo", name: "MMRDA", id: "mmrda" },
  { src: "/logo/msrdc.jpg", alt: "MSRDC logo", name: "MSRDC", id: "msrdc" },
  { src: "/logo/nmmc.png", alt: "NMMC logo", name: "NMMC", id: "nmmc" },
  { src: "/logo/pmc.webp", alt: "PMC logo", name: "PMC", id: "pmc" },
  { src: "/logo/pwd.png", alt: "PWD logo", name: "PWD", id: "pwd" },
  { src: "/logo/t%26t.jpg", alt: "T&T logo", name: "T&T", id: "t-and-t" },
  { src: "/logo/tmc.webp", alt: "TMC logo", name: "TMC", id: "tmc" },
];

const enlargedLogoIds = new Set(["pwd", "satyaminfra"]);

export function PartnersSection() {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...partnerImages, ...partnerImages];

  return (
    <section className="relative isolate overflow-hidden bg-white py-16">
      {/* Wave SVG Pattern Background */}
      {/* <div className="absolute inset-0 z-0 opacity-5">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z"
            fill="currentColor"
            className="text-brand-primary"
          />
          <path
            d="M0,120 Q300,80 600,120 T1200,120 L1200,200 L0,200 Z"
            fill="currentColor"
            className="text-brand-primary"
            opacity="0.7"
          />
          <path
            d="M0,140 Q300,100 600,140 T1200,140 L1200,200 L0,200 Z"
            fill="currentColor"
            className="text-brand-primary"
            opacity="0.4"
          />
        </svg>
      </div> */}

      {/* Inverted Wave at Bottom */}
      {/* <div className="absolute bottom-0 left-0 right-0 z-0 opacity-5">
        <svg
          className="h-24 w-full"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z"
            fill="currentColor"
            className="text-brand-primary"
          />
        </svg>
      </div> */}

      <div className="relative z-10 mx-auto max-w-full">
        {/* Single Row - Moving Left */}
        <div className="overflow-hidden">
          <div className="flex w-max animate-partners-marquee-left gap-8">
            {duplicatedLogos.map((partner, index) => (
              <div
                key={`${partner.id}-left-${index}`}
                className="flex shrink-0 flex-col items-center gap-3"
              >
                <div className="group flex h-36 w-44 items-center justify-center rounded-2xl border border-brand-gray-light/50 bg-white px-4 shadow-sm transition hover:border-brand-primary/30 hover:shadow-md">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={160}
                    height={90}
                    className={`w-auto object-contain opacity-85 transition group-hover:opacity-100 ${
                      enlargedLogoIds.has(partner.id)
                        ? "max-h-24 scale-125"
                        : "max-h-20"
                    }`}
                  />
                </div>
                <p className="max-w-44 text-center text-sm font-medium text-brand-dark/80">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
