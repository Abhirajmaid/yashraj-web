"use client";
import Image from "next/image";

const partnerImages = [
  { src: "/logo/apmc.png", alt: "APMC logo", id: "apmc" },
  { src: "/logo/autade%20group.png", alt: "Autade Group logo", id: "autade-group" },
  { src: "/logo/barc.png", alt: "BARC logo", id: "barc" },
  { src: "/logo/cidco.png", alt: "CIDCO logo", id: "cidco" },
  { src: "/logo/jkumar.png", alt: "J Kumar logo", id: "jkumar" },
  { src: "/logo/kdmc.png", alt: "KDMC logo", id: "kdmc" },
  { src: "/logo/mcgm.png", alt: "MCGM logo", id: "mcgm" },
  { src: "/logo/MIDCLOGO.webp", alt: "MIDC logo", id: "midc" },
  { src: "/logo/mmrda.webp", alt: "MMRDA logo", id: "mmrda" },
  { src: "/logo/msrdc.jpg", alt: "MSRDC logo", id: "msrdc" },
  { src: "/logo/nmmc.png", alt: "NMMC logo", id: "nmmc" },
  { src: "/logo/paradise%20group.png", alt: "Paradise Group logo", id: "paradise-group" },
  { src: "/logo/pmc.webp", alt: "PMC logo", id: "pmc" },
  { src: "/logo/pwd.png", alt: "PWD logo", id: "pwd" },
  { src: "/logo/satyaminfra.png", alt: "Satyam Infra logo", id: "satyaminfra" },
  { src: "/logo/t%26t.jpg", alt: "T&T logo", id: "t-and-t" },
  { src: "/logo/tmc.webp", alt: "TMC logo", id: "tmc" },
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
        {/* First Row - Moving Left */}
        <div className="mb-8 overflow-hidden">
          <div className="flex w-max animate-partners-marquee-left gap-8">
            {duplicatedLogos.map((partner, index) => (
              <div
                key={`${partner.id}-left-${index}`}
                className="flex shrink-0 flex-col items-center gap-3"
              >
                <div className="group flex h-32 w-32 items-center justify-center rounded-2xl border border-brand-gray-light/50 bg-white shadow-sm transition hover:border-brand-primary/30 hover:shadow-md">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={120}
                    height={60}
                    className={`w-auto object-contain opacity-85 transition group-hover:opacity-100 ${
                      enlargedLogoIds.has(partner.id)
                        ? "max-h-24 scale-125"
                        : "max-h-16"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Moving Right */}
        <div className="overflow-hidden">
          <div className="flex w-max animate-partners-marquee-right gap-8">
            {duplicatedLogos.map((partner, index) => (
              <div
                key={`${partner.id}-right-${index}`}
                className="flex shrink-0 flex-col items-center gap-3"
              >
                <div className="group flex h-32 w-32 items-center justify-center rounded-2xl border border-brand-gray-light/50 bg-white shadow-sm transition hover:border-brand-primary/30 hover:shadow-md">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={120}
                    height={60}
                    className={`w-auto object-contain opacity-85 transition group-hover:opacity-100 ${
                      enlargedLogoIds.has(partner.id)
                        ? "max-h-24 scale-125"
                        : "max-h-16"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
