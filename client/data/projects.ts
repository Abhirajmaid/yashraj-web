export type Project = {
    id: string;
    title: string;
    description: string[];
    mainImage: string;
    mainImageAlt: string;
    secondaryImages: {
        src: string;
        alt: string;
    }[];
    essentials: string[];
};

export const projects: Project[] = [
    {
        id: "urban-retreat-golden-gate",
        title: "Urban retreat in Golden Gate Park",
        description: [
            "Floor-to-ceiling glazing frames uninterrupted park vistas.",
            "Configurable conference suites support hybrid teams and live demos.",
        ],
        mainImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
        mainImageAlt: "Golden Gate Park urban retreat exterior",
        secondaryImages: [
            {
                src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
                alt: "Lounge space with timber soffits and soft seating",
            },
            {
                src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80",
                alt: "Glass boardroom overlooking landscaped courtyards",
            },
        ],
        essentials: [
            "6,500 sq.ft workplace with passive cooling, operable skylights, and rainwater-fed biowalls for humidity control.",
            "Immersive innovation forum with retractable seating, acoustic fins, and integrated AV for investor previews and press launches.",
            "Material palette couples reclaimed white oak, recycled terrazzo, and low-iron glass connected to a campus-wide energy dashboard.",
        ],
    },
    {
        id: "skyline-towers",
        title: "Skyline Towers",
        description: [
            "Modern residential complex with panoramic city views.",
            "Sustainable design featuring green roofs and energy-efficient systems.",
        ],
        mainImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
        mainImageAlt: "Skyline Towers project",
        secondaryImages: [
            {
                src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
                alt: "Skyline Towers exterior view",
            },
            {
                src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
                alt: "Skyline Towers interior spaces",
            },
        ],
        essentials: [
            "45-story residential tower with 320 luxury units and premium amenities.",
            "LEED Gold certified building with solar panels and rainwater harvesting systems.",
            "State-of-the-art fitness center, rooftop pool, and concierge services.",
        ],
    },
    {
        id: "riverfront-residences",
        title: "Riverfront Residences",
        description: [
            "Waterfront living with direct access to river promenades.",
            "Architectural excellence meets natural landscape integration.",
        ],
        mainImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
        mainImageAlt: "Riverfront Residences project",
        secondaryImages: [
            {
                src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
                alt: "Riverfront Residences waterfront view",
            },
            {
                src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
                alt: "Riverfront Residences community spaces",
            },
        ],
        essentials: [
            "Mixed-use development with 250 residential units and commercial spaces.",
            "Private marina access and waterfront dining establishments.",
            "Sustainable construction using locally sourced materials and green building practices.",
        ],
    },
    {
        id: "modular-megacity",
        title: "Modular Megacity",
        description: [
            "Innovative prefabricated construction for rapid urban development.",
            "Scalable design adaptable to various urban contexts and needs.",
        ],
        mainImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
        mainImageAlt: "Modular Megacity project",
        secondaryImages: [
            {
                src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                alt: "Modular Megacity construction process",
            },
            {
                src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
                alt: "Modular Megacity completed units",
            },
        ],
        essentials: [
            "500-unit affordable housing complex built using modular construction methods.",
            "Reduced construction time by 40% through prefabrication and efficient assembly.",
            "Smart home integration and community facilities including schools and healthcare centers.",
        ],
    },
    {
        id: "coastal-horizon",
        title: "Coastal Horizon",
        description: [
            "Luxury beachfront development with ocean views from every unit.",
            "Resort-style amenities in a residential setting.",
        ],
        mainImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        mainImageAlt: "Coastal Horizon project",
        secondaryImages: [
            {
                src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
                alt: "Coastal Horizon beachfront view",
            },
            {
                src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                alt: "Coastal Horizon resort amenities",
            },
        ],
        essentials: [
            "180 luxury beachfront condominiums with private balconies and ocean views.",
            "World-class spa, infinity pool, and private beach access.",
            "Hurricane-resistant construction with premium finishes and smart home technology.",
        ],
    },
    {
        id: "tech-campus",
        title: "Tech Campus",
        description: [
            "State-of-the-art technology hub for innovation and collaboration.",
            "Flexible workspaces designed for modern tech companies.",
        ],
        mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        mainImageAlt: "Tech Campus project",
        secondaryImages: [
            {
                src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80",
                alt: "Tech Campus office spaces",
            },
            {
                src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
                alt: "Tech Campus collaborative areas",
            },
        ],
        essentials: [
            "150,000 sq.ft technology campus with flexible office spaces and innovation labs.",
            "Advanced fiber-optic infrastructure and high-speed connectivity throughout.",
            "Sustainable design with green roofs, solar panels, and electric vehicle charging stations.",
        ],
    },
];

