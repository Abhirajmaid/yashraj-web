export type RMCPlant = {
  id: string;
  name: string;
  location: string;
  address: string;
  capacity: string; // e.g., "60 m³/hr"
  contact: {
    phone?: string;
    email?: string;
    manager?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  operationalHours?: string;
  specialties?: string[];
};

export const rmcPlants: RMCPlant[] = [
  {
    id: "plant-tanooja",
    name: "Yashraj RMC Plant",
    location: "Taloja",
    address: "Taloja",
    capacity: "60 m³/hr",
    contact: {
      phone: "7208747186",
      email: "Infrayashraj21@gmail.com",
    },
    coordinates: {
      lat: 19.0760,
      lng: 72.8777,
    },
    specialties: ["High-strength concrete", "Self-compacting concrete", "Fiber-reinforced concrete", "Standard concrete"],
  },
  {
    id: "plant-valap-asphalt",
    name: "Yashraj Asphalt Plant",
    location: "Valap village, Taloja",
    address: "Taloja",
    capacity: "120 tonnes/hr",
    contact: {
      phone: "7208747186",
      email: "Infrayashraj21@gmail.com",
    },
    specialties: ["Asphalt production", "Road works support", "Reliable supply", "Consistent quality"],
  },
];

export type DeliveryLocation = {
  id: string;
  name: string;
  description?: string;
  radius?: string;
};

export const deliveryLocations: DeliveryLocation[] = [
  {
    id: "navi-mumbai",
    name: "Navi Mumbai",
    description: "Ready-mix concrete delivery across Navi Mumbai",
  },
  {
    id: "panvel",
    name: "Panvel",
    description: "Serving Panvel and surrounding construction corridors",
  },
  {
    id: "thane",
    name: "Thane",
    description: "Thane district and nearby project sites",
  },
  {
    id: "kalyan",
    name: "Kalyan",
    description: "Kalyan–Dombivli region and adjacent industrial belts",
  },
  {
    id: "taloja",
    name: "Taloja",
    description: "Taloja MIDC and industrial catchment areas",
  },
];

export type RMCProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  features?: string[];
  applications?: string[];
};

export const rmcProducts: RMCProduct[] = [
  {
    id: "standard-rmc",
    name: "Standard Ready Mix Concrete",
    description: "High-quality standard ready mix concrete suitable for general construction purposes. Manufactured with precision and consistency to meet standard construction requirements.",
    image: "/images/rmc1.webp",
    imageAlt: "Standard Ready Mix Concrete",
    features: ["Consistent quality", "Easy to use", "Cost-effective", "Fast delivery"],
    applications: ["Residential buildings", "Commercial structures", "Roads and pavements", "Foundations"],
  },
  {
    id: "high-strength",
    name: "High-Strength Concrete",
    description: "Premium high-strength concrete designed for structures requiring superior durability and load-bearing capacity. Ideal for high-rise buildings and heavy-duty applications.",
    image: "/images/rmc2.jpg",
    imageAlt: "High-Strength Concrete",
    features: ["Superior strength", "Enhanced durability", "Reduced permeability", "Long-lasting"],
    applications: ["High-rise buildings", "Bridges", "Industrial structures", "Heavy foundations"],
  },
  {
    id: "self-compacting",
    name: "Self-Compacting Concrete (SCC)",
    description: "Advanced self-compacting concrete that flows and settles into place without the need for vibration. Perfect for complex formwork and congested reinforcement areas.",
    image: "/images/rmc3.jpg",
    imageAlt: "Self-Compacting Concrete",
    features: ["No vibration needed", "Smooth finish", "Reduced labor", "Better workability"],
    applications: ["Complex structures", "Precast elements", "Thin sections", "Dense reinforcement"],
  },
  {
    id: "pumpable",
    name: "Pumpable Concrete",
    description: "Specialty concrete mix designed for easy pumping through pipelines to elevated or hard-to-reach construction sites. Maintains workability during transportation.",
    image: "/images/Featured-image-12.jpg",
    imageAlt: "Pumpable Concrete",
    features: ["Easy pumping", "Maintains workability", "Reduced segregation", "Time-saving"],
    applications: ["High-rise construction", "Underground structures", "Remote locations", "Large-scale projects"],
  },
  {
    id: "fiber-reinforced",
    name: "Fiber-Reinforced Concrete",
    description: "Concrete enhanced with synthetic or steel fibers to improve tensile strength, reduce cracking, and enhance durability. Perfect for industrial floors and pavements.",
    image: "/images/fiber.png",
    imageAlt: "Fiber-Reinforced Concrete",
    features: ["Crack resistance", "Improved toughness", "Better impact resistance", "Enhanced durability"],
    applications: ["Industrial floors", "Pavements", "Airport runways", "Parking structures"],
  },
  {
    id: "lightweight",
    name: "Lightweight Concrete",
    description: "Lightweight concrete with reduced density while maintaining structural integrity. Ideal for reducing dead load in structures and improving thermal insulation.",
    image: "/images/light.png",
    imageAlt: "Lightweight Concrete",
    features: ["Reduced weight", "Better insulation", "Easier handling", "Lower structural load"],
    applications: ["Roof slabs", "Precast panels", "Partition walls", "Insulation layers"],
  },
];

export const rmcFeatures = [
  {
    title: "Quality Assurance",
    description: "ISO certified production with rigorous quality control at every stage",
    icon: "solar:medal-ribbons-star-bold",
  },
  {
    title: "On-Time Delivery",
    description: "Reliable delivery schedules with GPS-tracked transit vehicles",
    icon: "solar:delivery-bold",
  },
  {
    title: "Custom Mix Designs",
    description: "Tailored concrete mixes to meet specific project requirements",
    icon: "solar:settings-bold",
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support and emergency services",
    icon: "solar:phone-calling-bold",
  },
  {
    title: "Environmentally Conscious",
    description: "Sustainable production practices with recycled materials",
    icon: "solar:leaf-bold",
  },
  {
    title: "Competitive Pricing",
    description: "Cost-effective solutions without compromising on quality",
    icon: "solar:wallet-money-bold",
  },
];

export const rmcGrades = [
  { grade: "M10", strength: "10 N/mm²", use: "Non-structural applications" },
  { grade: "M15", strength: "15 N/mm²", use: "Plain cement concrete" },
  { grade: "M20", strength: "20 N/mm²", use: "Reinforced concrete (general)" },
  { grade: "M25", strength: "25 N/mm²", use: "Reinforced concrete (standard)" },
  { grade: "M30", strength: "30 N/mm²", use: "High-strength applications" },
  { grade: "M35", strength: "35 N/mm²", use: "Heavy-duty structures" },
  { grade: "M40", strength: "40 N/mm²", use: "Commercial buildings" },
  { grade: "M45", strength: "45 N/mm²", use: "Industrial structures" },
  { grade: "M50", strength: "50 N/mm²", use: "High-rise buildings" },
];

export const rmcDescription = {
  title: "What is Ready Mix Concrete (RMC)?",
  content: [
    "Ready Mix Concrete (RMC) is a factory-made concrete that is manufactured in a batching plant according to a set recipe and then delivered to the construction site in a transit mixer truck. Unlike traditional on-site concrete mixing, RMC ensures consistent quality, precise mix proportions, and eliminates the need for on-site storage of raw materials.",
    "RMC is produced under controlled conditions using advanced batching systems, ensuring uniform quality and strength. The concrete is mixed in a central plant and transported to construction sites in specialized transit mixer trucks that keep the concrete in a workable state during transit.",
    "This modern approach to concrete production offers numerous advantages including better quality control, reduced wastage, faster construction, and environmental benefits through optimized material usage and reduced site pollution.",
  ],
  benefits: [
    "Consistent quality and strength",
    "Reduced construction time",
    "Better quality control",
    "Environmental benefits",
    "Cost-effective for large projects",
    "No on-site storage required",
  ],
};

export const bitumenDescription = {
  title: "What are Bitumen Mixes?",
  content: [
    "Bitumen mixes (hot mix asphalt) are engineered combinations of aggregates and bituminous binder produced in modern hot mix plants. These mixes are designed for road construction, resurfacing, and maintenance applications where durability, load-bearing capacity, and riding comfort are essential.",
    "Our bituminous products are manufactured under strict quality control and in accordance with MoRTH, IRC, and client specifications. We use performance-grade modified binders, including PMB 40, PMB 70, and other specialized grades as required by project specifications.",
    "Bitumen mixes provide flexibility, resistance to deformation, and long service life when produced with quality aggregates and proper compaction, making them ideal for highways, arterial roads, and high-traffic surfaces.",
  ],
  benefits: [
    "High load-bearing capacity",
    "Improved rutting and deformation resistance",
    "Designed to meet MoRTH and IRC specifications",
    "Consistent quality through plant-controlled production",
  ],
};

export type BitumenProduct = {
  id: string;
  name: string;
  description: string;
  image?: string;
  imageAlt?: string;
  features?: string[];
  applications?: string[];
};

export const bitumenProducts: BitumenProduct[] = [
  {
    id: "bm-dbm-bc",
    name: "BM / DBM / BC (Bituminous Layers)",
    description:
      "Engineered BM, DBM, and BC layers designed for reliable pavement structure in base and wearing courses. Built for long-term strength, smoother rides, and consistent site performance.",
    image: "/images/biut1.webp",
    imageAlt: "Bitumen layers being laid on road",
    features: ["Designed for heavy traffic", "High durability", "MoRTH compliant"],
    applications: ["Highways", "Expressways", "Urban arterial roads"],
  },
  {
    id: "prime-tack",
    name: "Prime Coat & Tack Coat",
    description:
      "Specialized prime and tack coat binders that prepare surfaces and create strong interlayer adhesion before overlays. They improve bonding quality, reduce separation, and support durable roads.",
    image: "/images/cot.png",
    imageAlt: "Road construction and priming works",
    features: ["Improves interlayer bonding", "Reduces slippage", "Easy application"],
    applications: ["Overlay preparation", "Layer bonding"],
  },
  {
    id: "pmb-grades",
    name: "Performance-Grade Modified Binders (PMB)",
    description:
      "Performance-grade binders such as PMB 40 and PMB 70 developed for better stability under varying temperatures and loads. They improve rut resistance, flexibility, and pavement service life.",
    image: "/images/biut3.jpg",
    imageAlt: "Performance grade modified binders",
    features: ["Improved temperature susceptibility", "Enhanced rut resistance", "Longer service life"],
    applications: ["High-temperature regions", "Heavy-load pavements", "Critical highway stretches"],
  },
];


