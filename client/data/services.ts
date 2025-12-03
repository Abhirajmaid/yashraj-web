export type Service = {
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
    href?: string;
};

export const services: Service[] = [
  {
    title: "Road Construction",
    description:
      "End-to-end execution of highways, bridges, and access roads with strict adherence to safety, durability and delivery timelines.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Road construction service",
  },
  {
    title: "Infrastructure EPC",
    description:
      "Full‑scope engineering, procurement and construction for large civil projects — from feasibility and design to commissioning and handover.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Infrastructure EPC service",
  },
  {
    title: "Ready Mix Concrete (RMC)",
    description:
      "Quality-assured ready mix concrete, produced and delivered to site with precise mix designs for consistent strength and performance.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Ready Mix Concrete service",
  },
];

