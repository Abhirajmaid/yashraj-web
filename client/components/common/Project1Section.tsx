import Image from "next/image";

export function Project1Section() {
  return (
    <section className="relative bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-14">
        <div className="space-y-12">
          {/* Intro copy */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="max-w-xl space-y-4 text-left lg:-ml-6">
          <p className="text-sm uppercase tracking-[0.35em] text-[#0E0E0E]/45">
            Project Highlight
          </p>
          <h2 className="text-3xl font-bold text-[#0E0E0E] sm:text-4xl">
            Urban retreat in Golden Gate Park
          </h2>
            </div>
            <div className="flex flex-col items-end gap-1 mt-12 text-right text-base text-[#0E0E0E]/70">
              <span>Floor-to-ceiling glazing frames uninterrupted park vistas.</span>
              <span>Configurable conference suites support hybrid teams and live demos.</span>
            </div>
          </div>

          {/* Gallery + details */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div
          className="relative overflow-hidden rounded-3xl shadow-[0_36px_80px_rgba(14,14,14,0.22)] lg:flex-[0_0_620px] lg:-ml-8"
          style={{ width: "480px", height: "480px", marginLeft: "-32px" }}
        >
          <Image
            src="/showcase.jpg"
            alt="Golden Gate Park urban retreat exterior"
            fill
            className="object-cover object-center"
          />
            </div>

            <div className="flex h-full flex-col gap-6 lg:flex-1">
              <div className="flex w-full items-start justify-end gap-4">
                <div
                  className="relative overflow-hidden rounded-2xl shadow-[0_20px_55px_rgba(14,14,14,0.18)]"
                  style={{ width: "250px", height: "220px" }}
                >
                  <Image
                    src="/yashrajhero.jpg"
                    alt="Lounge space with timber soffits and soft seating"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div
                  className="relative overflow-hidden rounded-2xl shadow-[0_20px_55px_rgba(14,14,14,0.18)]"
                  style={{ width: "330px", height: "220px" }}
                >
                  <Image
                    src="/yashrajhero1.jpg"
                    alt="Glass boardroom overlooking landscaped courtyards"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-[#0E0E0E]/12 bg-white/90 p-6 text-left shadow-[0_30px_70px_rgba(14,14,14,0.18)] lg:mt-auto">
                <h3 className="text-lg font-semibold text-[#0E0E0E]">
                  Project Essentials
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-[#0E0E0E]/75">
                  <li>
                    • 6,500 sq.ft workplace with passive cooling, operable skylights, and
                    rainwater-fed biowalls for humidity control.
                  </li>
                  <li>
                    • Immersive innovation forum with retractable seating, acoustic fins, and
                    integrated AV for investor previews and press launches.
                  </li>
                  <li>
                    • Material palette couples reclaimed white oak, recycled terrazzo, and
                    low-iron glass connected to a campus-wide energy dashboard.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
