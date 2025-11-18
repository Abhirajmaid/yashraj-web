export type Service = {
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
    href?: string;
};

export const services: Service[] = [
    {
        title: "Functional design",
        description:
            "Functional design organizes the project to meet its use objectives.",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Functional design service",
    },
    {
        title: "Renovation of spaces",
        description:
            "Updating existing areas to improve their functionality, aesthetics and comfort.",
        image:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Renovation of spaces service",
    },
    {
        title: "Interior design",
        description:
            "The Interior design combined aesthetics and functionality to improve user comfort.",
        image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Interior design service",
    },
    {
        title: "Urban design",
        description:
            "Urban design is the development of public and private spaces in urban environments.",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Urban design service",
    },
    {
        title: "Sustainable design",
        description:
            "An approach that seeks to create solutions that minimize environmental impact.",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Sustainable design service",
    },
    {
        title: "Project management",
        description:
            "Planning and control process of a construction project from its beginning.",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Project management service",
        href: "/contact",
    },
];

