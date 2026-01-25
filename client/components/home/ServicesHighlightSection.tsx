import Image from "next/image";
import { SectionHeader } from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";
import { getServicesForHomePage } from "@/data/services";

const services = getServicesForHomePage();

export function ServicesHighlightSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-brand-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 xl:px-14">
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
              className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-brand-gray-light/50 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(var(--color-dark-rgb),0.08)]"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden sm:h-80">
                <Image
                  src={service.image}
                  alt={service.imageAlt || service.title || "Service image"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-6 sm:p-8">
                <h3 className="mb-3 text-2xl font-semibold text-brand-dark sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-brand-dark/70 sm:text-base flex-grow">
                  {service.description}
                </p>
                <Button
                  link={service.link}
                  type="primary"
                  size="md"
                  className="w-full sm:w-auto mt-auto"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

