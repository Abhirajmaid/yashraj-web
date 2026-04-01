export type Service = {
  title: string;
  shortTitle?: string;
  description: string;
  shortDescription?: string;
  image: string;
  imageAlt?: string;
  href?: string;
  link?: string;
  slug?: string;
};

export const services: Service[] = [
  {
    title: "Construction & Execution",
    description:
      "End-to-end execution of highways, flyovers, roads, bridges, storm water drains, culverts, and concrete pavement. We deliver with strict adherence to government standards, safety, durability, and timelines. From feasibility and design to commissioning and handover, we combine modern technology with deep industry expertise.",
    shortDescription:
      "Full-scope execution of highways, flyovers, roads, bridges, and urban infrastructure with adherence to government standards, safety, and delivery timelines.",
    image: "/images/a1.avif",
    imageAlt: "Construction and execution",
    slug: "construction-execution",
    link: "/projects",
  },
  {
    title: "Operation & Maintenance",
    description:
      "Comprehensive operation and maintenance services for infrastructure assets. We ensure sustained performance, safety, and longevity of roads, bridges, and public facilities through disciplined maintenance programs, timely repairs, and proactive monitoring—supporting our clients in preserving the value and usability of their investments.",
    shortDescription:
      "Operation and maintenance of infrastructure assets to ensure sustained performance, safety, and longevity of roads, bridges, and public facilities.",
    image: "/images/a2.avif",
    imageAlt: "Operation and maintenance",
    slug: "operation-maintenance",
    link: "/projects",
  },
  {
    title: "Buildings & Industrial",
    description:
      "Industrial and commercial building projects including piling, civil works, and integrated structures. We execute projects that meet functional requirements, safety norms, and stakeholder expectations—from factories and warehouses to institutional and commercial buildings—with precision and reliability.",
    shortDescription:
      "Industrial and commercial buildings, piling, civil works, and integrated structures—delivered with precision and reliability.",
    image: "/images/a3.avif",
    imageAlt: "Buildings and industrial",
    slug: "buildings-industrial",
    link: "/projects",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesForHomePage(): Service[] {
  return services.map((s) => ({
    ...s,
    title: s.shortTitle || s.title,
    description: s.shortDescription || s.description,
  }));
}
