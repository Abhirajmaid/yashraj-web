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
  eyebrow = "WHAT WE DO",
  title = "Our Services",
  description = "Construction & execution, operation & maintenance, and buildings & industrial—delivered with precision, reliability, and quality across Maharashtra.",
}: ServicesSectionProps) {
  const featured = services.slice(0, 3);

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gray">
            {eyebrow}
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-text-dark sm:text-5xl">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-brand-foreground/80">
            {description}
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {featured.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              image={service.image}
              imageAlt={service.imageAlt}
              index={index}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
