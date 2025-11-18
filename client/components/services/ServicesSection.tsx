import { ServiceCard } from "./ServiceCard";
import { Service } from "@/data/services";

type ServicesSectionProps = {
  services: Service[];
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function ServicesSection({
  services,
  eyebrow = "SERVICE INCLUDED",
  title = "Our services",
  description = "At Yashraj, we design unique architectural solutions that bring your vision to life.",
}: ServicesSectionProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Section: Title and Introduction - 1/3 of the page */}
          <div className="space-y-6 lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
              {eyebrow}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {title}
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              {description}
            </p>
          </div>

          {/* Right Section: Service Cards Grid (1 column on mobile, 2 columns on larger screens) - 2/3 of the page */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-8">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                image={service.image}
                imageAlt={service.imageAlt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
