import Image from "next/image";

const partnerImages = Array.from({ length: 8 }).map((_, index) => ({
  src: "/partnerslogo1-removebg-preview.png",
  alt: `Partner logo ${index + 1}`,
  id: `partner-logo-${index}`,
}));

export function PartnersSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f21b29] py-16 text-[#FFD700]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.15),transparent_55%),linear-gradient(115deg,rgba(255,255,255,0.05),transparent)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {partnerImages.map((partner) => (
            <div key={partner.id} className="flex flex-col items-center gap-4">
              <div className="group flex h-36 w-full items-center justify-center rounded-3xl border border-[#FFD700]/25 bg-[#FFD700]/10 transition hover:-translate-y-2 hover:border-[#FFD700]/60 hover:bg-[#FFD700]/20">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={220}
                  height={110}
                  className="max-h-20 w-auto object-contain opacity-85 transition group-hover:opacity-100"
                />
              </div>
              <p className="text-xl font-semibold uppercase tracking-[0.2em] text-[#FFD700]">
                PMC
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

