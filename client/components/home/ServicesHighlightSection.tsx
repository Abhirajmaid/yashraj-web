import Image from "next/image";
import { resolveImageSrc } from "@/lib/getImageSrc";
import { SectionHeader } from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";
import BlurGradient from "@/components/common/BlurGradient";
import { getServicesForHomePage } from "@/data/services";

const services = getServicesForHomePage();

export function ServicesHighlightSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-brand-dark">
      <div className="relative z-10 mx-auto max-w-[80%] px-6 py-16 sm:py-20 lg:px-10 xl:px-14">
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
                  src={resolveImageSrc(service.image)}
                  alt={service.imageAlt || service.title || "Service image"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Bottom blur + gradient overlay for legibility (stronger at bottom, decreasing to top) */}
                <BlurGradient
                  position="bottom"
                  height="33%"
                  blur={8}
                  className=""
                />

                {/* Content on top, anchored to bottom */}
                <div className="absolute left-6 right-6 bottom-6 z-10">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 mb-4 text-sm sm:text-base text-white/90 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-start">
                    <Button
                      link={service.link}
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
