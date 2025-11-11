import Image from "next/image";

const partnerImages = Array.from({ length: 8 }).map((_, index) => ({
  src: "/partnerslogo1-removebg-preview.png",
  alt: `Partner logo ${index + 1}`,
  id: `partner-logo-${index}`,
}));

export function PartnersSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f21b29] py-16 text-[#D2FDFF]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(210,253,255,0.15),transparent_55%),linear-gradient(115deg,rgba(255,255,255,0.05),transparent)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {partnerImages.map((partner) => (
            <div
              key={partner.id}
              className="group flex h-36 items-center justify-center rounded-3xl border border-[#D2FDFF]/25 bg-[#D2FDFF]/10 transition hover:-translate-y-2 hover:border-[#D2FDFF]/60 hover:bg-[#D2FDFF]/20"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={220}
                height={110}
                className="max-h-20 w-auto object-contain opacity-85 transition group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

