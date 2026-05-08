"use client";
import Image from "next/image";

const partnerImages = [
  {
    src: "/logo/apmc 1.png",
    alt: "Agricultural Produce Market Committee logo",
    name: "Agricultural Produce Market Committee",
    id: "apmc",
  },
  {
    src: "/logo/ag.png",
    alt: "Autade Constructions / Autade Infraprojects logo",
    name: "Autade Constructions / Autade Infraprojects",
    id: "autade-group",
  },
  {
    src: "/logo/barc.png",
    alt: "Bhabha Atomic Research Centre logo",
    name: "Bhabha Atomic Research Centre",
    id: "barc",
  },
  {
    src: "/logo/cidco.png",
    alt: "City and Industrial Development Corporation logo",
    name: "City and Industrial Development Corporation",
    id: "cidco",
  },
  {
    src: "/logo/jkumar.png",
    alt: "J. Kumar Infraprojects Ltd logo",
    name: "J. Kumar Infraprojects Ltd",
    id: "jkumar",
  },
  {
    src: "/logo/kdmc.png",
    alt: "Kalyan-Dombivli Municipal Corporation logo",
    name: "Kalyan-Dombivli Municipal Corporation",
    id: "kdmc",
  },
  {
    src: "/logo/mcgm.png",
    alt: "Municipal Corporation of Greater Mumbai (BMC) logo",
    name: "Municipal Corporation of Greater Mumbai (BMC)",
    id: "mcgm",
  },
  {
    src: "/logo/MIDCLOGO.webp",
    alt: "Maharashtra Industrial Development Corporation logo",
    name: "Maharashtra Industrial Development Corporation",
    id: "midc",
  },
  {
    src: "/logo/mmrda 1.jpeg",
    alt: "Mumbai Metropolitan Region Development Authority logo",
    name: "Mumbai Metropolitan Region Development Authority",
    id: "mmrda",
  },
  {
    src: "/logo/msrdc.jpg",
    alt: "Maharashtra State Road Development Corporation logo",
    name: "Maharashtra State Road Development Corporation",
    id: "msrdc",
  },
  {
    src: "/logo/nmmc.png",
    alt: "Navi Mumbai Municipal Corporation logo",
    name: "Navi Mumbai Municipal Corporation",
    id: "nmmc",
  },
  {
    src: "/logo/pmc.webp",
    alt: "Pune Municipal Corporation logo",
    name: "Pune Municipal Corporation",
    id: "pmc",
  },
  {
    src: "/logo/pwd.png",
    alt: "Public Works Department logo",
    name: "Public Works Department",
    id: "pwd",
  },
  {
    src: "/logo/t%26t.jpg",
    alt: "T & T Infra Limited logo",
    name: "T & T Infra Limited",
    id: "t-and-t",
  },
  {
    src: "/logo/tmc.webp",
    alt: "Thane Municipal Corporation logo",
    name: "Thane Municipal Corporation",
    id: "tmc",
  },
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
                <div className="group flex h-48 w-56 items-center justify-center rounded-2xl border border-brand-gray-light/50 bg-white px-5 shadow-sm transition hover:border-brand-primary/30 hover:shadow-md">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={220}
                    height={124}
                    className={`w-auto object-contain opacity-85 transition group-hover:opacity-100 ${
                      enlargedLogoIds.has(partner.id)
                        ? "max-h-36 scale-125"
                        : "max-h-32"
                    }`}
                  />
                </div>
                <p className="max-w-56 text-center text-sm font-medium text-brand-dark/80">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
