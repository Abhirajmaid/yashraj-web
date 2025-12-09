export type Service = {
  title: string; // Full title for services page
  shortTitle?: string; // Short title for home page (e.g., "RMC" instead of "Ready Mix Concrete (RMC)")
  description: string; // Full description for services page
  shortDescription?: string; // Short description for home page highlights
  image: string;
  imageAlt?: string;
  href?: string;
  link?: string; // Link for home page service cards
  slug?: string; // URL slug for anchor links
};

export const services: Service[] = [
  {
    title: "Road Construction",
    description:
      "End-to-end execution of highways, bridges, and access roads with strict adherence to safety, durability and delivery timelines.",
    shortDescription:
      "Expert road construction services delivering durable, high-quality infrastructure solutions. From highways to local roads, we build with precision and engineering excellence.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Road construction service",
    slug: "road-construction",
    link: "/projects",
  },
  {
    title: "Infrastructure EPC",
    description:
      "Full‑scope engineering, procurement and construction for large civil projects — from feasibility and design to commissioning and handover.",
    shortDescription:
      "Full‑scope engineering, procurement and construction for large civil projects — from feasibility and design to commissioning and handover.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Infrastructure EPC service",
    slug: "infrastructure-epc",
    link: "/aggregates",
  },
  {
    title: "Ready Mix Concrete (RMC)",
    shortTitle: "RMC",
    description:
      "Quality-assured ready mix concrete, produced and delivered to site with precise mix designs for consistent strength and performance.",
    shortDescription:
      "Ready Mix Concrete (RMC) solutions for all your construction needs. Quality-assured concrete delivered on time, ensuring strength, durability, and consistency for your projects.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Ready Mix Concrete service",
    slug: "rmc",
    link: "/aggregates",
  },
];

// Helper function to get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

// Helper function to get services for home page (with short descriptions and titles)
export function getServicesForHomePage(): Service[] {
  return services.map((service) => ({
    ...service,
    title: service.shortTitle || service.title,
    description: service.shortDescription || service.description,
  }));
}

