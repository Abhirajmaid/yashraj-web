import Image from "next/image";
import { SectionHeader } from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";
import { getServicesForHomePage } from "@/data/services";

const services = getServicesForHomePage();

export function ServicesHighlightSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-brand-dark">
      <div className="relative z-10 mx-auto max-w-[90%] md:max-w-[80%] px-2 py-16 sm:py-20 lg:px-10 xl:px-14">
        <div className="mb-12 sm:mb-16">
          <SectionHeader
            eyebrow="OUR SERVICES"
            title="What We Do"
            description="Construction & execution, operation & maintenance, and buildings & industrial—delivered with precision, reliability, and quality."
            align="center"
            eyebrowClassName="text-primary"
            titleClassName="text-brand-dark"
            descriptionClassName="text-brand-dark/70 max-w-2xl mx-auto"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-brand-gray-light/50 bg-black/5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
            >
              {/* Card as image background */}
              <div className="relative h-80 sm:h-96 md:h-[620px] w-full">
                <Image
                  src={service.image}
                  alt={service.imageAlt || service.title || "Service image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Darker gradient from bottom for clear text (no glass/blur) */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/95 via-black/70 to-transparent"
                  aria-hidden
                />

                {/* Content anchored to bottom: centered on mobile, consistent alignment */}
                <div className="absolute left-4 right-4 bottom-4 z-10 flex flex-col items-center text-center sm:left-6 sm:right-6 sm:bottom-6 sm:items-start sm:text-left">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 mb-3 hidden text-sm text-white/95 line-clamp-2 sm:mt-3 sm:mb-4 sm:block sm:text-base">
                    {service.description}
                  </p>
                  <div className="mt-4 flex w-full justify-center sm:mt-5 sm:justify-start">
                    <Button
                      link="/contact"
                      type="primary"
                      size="md"
                      className="bg-primary text-white rounded-full shadow-md"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
