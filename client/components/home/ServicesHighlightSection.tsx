import Image from "next/image";
import { SectionHeader } from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";

const services = [
  {
    title: "Road Construction",
    description:
      "Expert road construction services delivering durable, high-quality infrastructure solutions. From highways to local roads, we build with precision and engineering excellence.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Road construction project",
    link: "/services#road-construction",
  },
  {
    title: "RMC",
    description:
      "Ready Mix Concrete (RMC) solutions for all your construction needs. Quality-assured concrete delivered on time, ensuring strength, durability, and consistency for your projects.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Ready Mix Concrete plant",
    link: "/services#rmc",
  },
];

export function ServicesHighlightSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-brand-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 xl:px-14">
        <div className="mb-12 sm:mb-16">
          <SectionHeader
            eyebrow="OUR SERVICES"
            title="Specialized Construction Solutions"
            description="Comprehensive construction services tailored to meet your infrastructure needs with quality and precision."
            align="center"
            eyebrowClassName="text-primary"
            titleClassName="text-brand-dark"
            descriptionClassName="text-brand-dark/70 max-w-2xl mx-auto"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-brand-gray-light/50 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(var(--color-dark-rgb),0.08)]"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden sm:h-80">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <h3 className="mb-3 text-2xl font-semibold text-brand-dark sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-brand-dark/70 sm:text-base">
                  {service.description}
                </p>
                <Button
                  link={service.link}
                  type="primary"
                  size="md"
                  className="w-full sm:w-auto"
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

