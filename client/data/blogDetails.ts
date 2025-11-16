import { BlogPost, blogs } from "./blogs";

const blogsBySlug = blogs.reduce<Record<string, BlogPost>>((acc, blog) => {
  acc[blog.slug] = blog;
  return acc;
}, {});

type SectionImage = {
  src: string;
  alt: string;
  caption?: string;
};

type SectionInsight = {
  label: string;
  content: string;
};

export type BlogContentSection = {
  heading: string;
  paragraphs: string[];
  image?: SectionImage;
  insight?: SectionInsight;
};

export type BlogDetail = BlogPost & {
  heroKicker: string;
  category: string;
  summary: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
  };
  keyPoints: string[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
  highlightStats: {
    label: string;
    value: string;
    description: string;
  }[];
  sections: BlogContentSection[];
};

export const blogDetails: Record<string, BlogDetail> = {
  "green-space-revolution": {
    ...blogsBySlug["green-space-revolution"]!,
    heroKicker: "Urban ecology",
    category: "Sustainable architecture",
    summary:
      "Living buildings are no longer an experiment. They are fast becoming the most reliable way to reduce embodied carbon, improve tenant well-being, and reconnect dense cities to nature.",
    readingTime: "7 min read",
    author: {
      name: "Ananya Kulkarni",
      role: "Lead Urban Ecologist",
    },
    keyPoints: [
      "Biophilic skins can lower the perceived temperature at street level by up to 3°C.",
      "Hybrid irrigation loops keep maintenance predictable even in arid regions.",
      "Certification bodies now reward biodiversity metrics alongside efficiency.",
    ],
    quote: {
      text: "When plant life is embedded into the structure itself, wellness stops being an amenity and becomes part of the building's DNA.",
      author: "Ananya Kulkarni",
      role: "Lead Urban Ecologist",
    },
    highlightStats: [
      {
        label: "Energy savings",
        value: "38%",
        description: "Average HVAC load reduction after a living facade retrofit.",
      },
      {
        label: "Rain reuse",
        value: "420k L",
        description: "Annual greywater captured and filtered on site.",
      },
      {
        label: "Occupant comfort",
        value: "92%",
        description: "Post-occupancy survey respondents reporting improved focus.",
      },
    ],
    sections: [
      {
        heading: "Biophilic design as critical infrastructure",
        paragraphs: [
          "Traditional podium gardens treat planting as an accessory. In contrast, living buildings weave vegetation through the structure so that shading, filtration, and wayfinding all benefit from a single move.",
          "We model wind, sun, and humidity at every level of the tower to decide where moss walls, cascading planters, or canopy trees will have the most impact. The result is a system that feels organic but is tuned with the precision of an engineered facade.",
        ],
        image: {
          src: "/showcase.jpg",
          alt: "Terraced facade covered in vegetation",
          caption: "Layered terraces create self-shading pockets throughout the day.",
        },
      },
      {
        heading: "Closed-loop stewardship",
        paragraphs: [
          "Irrigation remains the single biggest constraint for verdant envelopes. We pair concealed cisterns with sensor-driven drip lines so that every planter receives only the water it needs.",
          "This loop is tied to the building management system. When humidity spikes or rainfall is forecast, the algorithm adjusts flows automatically, keeping horticulture teams focused on curation rather than firefighting.",
        ],
        insight: {
          label: "Playbook update",
          content: "Integrate greywater polishing beds into mechanical floors to unlock LEED points without extra GFA.",
        },
      },
      {
        heading: "Healthy cities, measurable impact",
        paragraphs: [
          "Living buildings are measurably cooler, quieter, and more breathable. They also trigger a halo effect: nearby streets attract more foot traffic, which supports retail and keeps the public realm active.",
          "Cities such as Singapore and Toronto now offer expedited permitting for projects that treat biodiversity as a metric. Expect more planning authorities to follow in the next 24 months.",
        ],
      },
    ],
  },
  "riverfront-hub": {
    ...blogsBySlug["riverfront-hub"]!,
    heroKicker: "Adaptive reuse",
    category: "Community placemaking",
    summary:
      "A dormant industrial dock can transform into a civic living room when programming, flood resilience, and mobility are planned together.",
    readingTime: "6 min read",
    author: {
      name: "Marco Estevez",
      role: "Director of Urban Design",
    },
    keyPoints: [
      "Layered promenades keep the boardwalk active across microclimates.",
      "Floating classrooms and labs unlock year-round educational programming.",
      "Local vendors were embedded early to create an immediate sense of ownership.",
    ],
    quote: {
      text: "We approached the river as a collaborator rather than a constraint, choreographing high and low tide moments for people.",
      author: "Marco Estevez",
      role: "Director of Urban Design",
    },
    highlightStats: [
      {
        label: "Flood storage",
        value: "1.8M gal",
        description: "Water accommodated within stepped basins during storm events.",
      },
      {
        label: "Daily visitors",
        value: "12k+",
        description: "Projected footfall once the cultural calendar is in full swing.",
      },
      {
        label: "Local vendors",
        value: "34",
        description: "Small businesses pre-leased before construction wrapped.",
      },
    ],
    sections: [
      {
        heading: "Designing the civic spine",
        paragraphs: [
          "The riverwalk runs as a multi-level spine that threads together gardens, maker kiosks, and rehearsal decks. Each elevation band corresponds to a flood recurrence interval so the landscape can take a hit without closing.",
          "Materials are deliberately tactile: charred timber, recycled steel, and low-glare resin panels create a palette that feels rooted in craft rather than spectacle.",
        ],
      },
      {
        heading: "Programming for every season",
        paragraphs: [
          "We worked with cultural partners to map an annual calendar before finalizing the architecture. The plan includes sunrise tai chi decks, rotating food labs, and interactive light installations that bloom during the winter lull.",
          "A micro-grid fed by concealed river turbines keeps the site energized and resilient, allowing performances to continue during grid interruptions.",
        ],
        image: {
          src: "/yashrajhero.jpg",
          alt: "Riverfront promenade at dusk",
        },
      },
      {
        heading: "Governance that invites community",
        paragraphs: [
          "The development agreement reserves 35 percent of operational slots for local entrepreneurs. A shared logistics hub under the plaza handles storage, waste, and deliveries, keeping the promenade car-free.",
          "An on-site stewardship studio publishes quarterly impact dashboards so the surrounding neighborhoods can see exactly how revenue feeds public amenities.",
        ],
        insight: {
          label: "Toolkit",
          content: "Pair cultural operators with coastal engineers early. It shortens approvals and surfaces new funding models.",
        },
      },
    ],
  },
  "modular-megacity": {
    ...blogsBySlug["modular-megacity"]!,
    heroKicker: "Fabrication at scale",
    category: "Future of construction",
    summary:
      "Modular ecosystems now rival conventional towers in performance while cutting embodied carbon and neighborhood disruption in half.",
    readingTime: "8 min read",
    author: {
      name: "Sara Idris",
      role: "Head of Industrialized Construction",
    },
    keyPoints: [
      "Digital twins anchor everything from procurement to punch lists.",
      "Hybrid steel-timber cassettes allow 12 percent more daylight penetration.",
      "Neighborhood playbooks guide logistics to keep streets open during stacking.",
    ],
    quote: {
      text: "The secret to modular is choreography. When every module knows its role, the city barely notices a 40-story tower arriving in weeks.",
      author: "Sara Idris",
      role: "Head of Industrialized Construction",
    },
    highlightStats: [
      {
        label: "On-site duration",
        value: "-46%",
        description: "Reduction in street closures compared to cast-in-place builds.",
      },
      {
        label: "Carbon footprint",
        value: "-32%",
        description: "Embodied carbon savings delivered through repeatable chassis.",
      },
      {
        label: "Quality issues",
        value: "-58%",
        description: "Defects caught upstream thanks to factory QA automation.",
      },
    ],
    sections: [
      {
        heading: "Why megacities are embracing kits of parts",
        paragraphs: [
          "Demand for housing and workspace is outpacing traditional delivery models. Prefabricated chassis provide reliable schedules and reduce financing gaps because lenders can track progress in discrete milestones.",
          "Cities also appreciate the quieter streets. By moving 70 percent of labor off-site, neighborhoods stay open for business even when a tower is racing skyward.",
        ],
      },
      {
        heading: "Design freedom in a modular world",
        paragraphs: [
          "Gone are the days of boxy repetition. Parametric panel libraries let architects remix window patterns, balcony depths, and shading fins without compromising manufacturing efficiency.",
          "We prototype every interior in VR, validating MEP clearances, acoustic isolation, and daylight sweeps before a single bolt is tightened.",
        ],
        image: {
          src: "/yashrajhero1.jpg",
          alt: "Prefabricated modules being assembled",
        },
      },
      {
        heading: "Logistics that respect the city",
        paragraphs: [
          "We collaborate with city agencies to stage modules at night and lift them during daylight windows that avoid school rush hours.",
          "Digital permits mean inspectors can review weld scans and fire-stopping photos remotely, freeing them to focus on critical milestones such as topping out.",
        ],
        insight: {
          label: "Field note",
          content: "Give neighbors a live dashboard of upcoming deliveries. Transparency builds trust faster than any town hall.",
        },
      },
    ],
  },
  "concept-to-creation": {
    ...blogsBySlug["concept-to-creation"]!,
    heroKicker: "Inside the studio",
    category: "Design process",
    summary:
      "From sketches on tracing paper to VR walkthroughs and fabrication-ready models, every project passes through a rigorous yet human-centered pipeline.",
    readingTime: "5 min read",
    author: {
      name: "Meera Levin",
      role: "Executive Creative Director",
    },
    keyPoints: [
      "Idea sprints condense stakeholder visioning into 10-day bursts.",
      "Physical models remain critical for daylight and material studies.",
      "Digital twins ensure designers and builders reference a single source of truth.",
    ],
    quote: {
      text: "Great architecture is a relay race. Each discipline hands the baton forward without losing the project's original intent.",
      author: "Meera Levin",
      role: "Executive Creative Director",
    },
    highlightStats: [
      {
        label: "Design sprints",
        value: "10 days",
        description: "Average duration from first workshop to concept vote.",
      },
      {
        label: "Iteration loops",
        value: "4",
        description: "Structured review cycles before documentation begins.",
      },
      {
        label: "Clash issues",
        value: "-65%",
        description: "Conflicts resolved digitally before site mobilization.",
      },
    ],
    sections: [
      {
        heading: "Vision casting with purpose",
        paragraphs: [
          "We start every commission with an immersion: soundwalks, community interviews, and analog sketch sessions that reveal the behavioral cues a site is already giving us.",
          "These insights turn into guiding principles that we revisit at every milestone. If an idea drifted away from the promise, it gets rewritten or removed.",
        ],
      },
      {
        heading: "Model everything",
        paragraphs: [
          "Physical study models help the team stress-test scale, massing, and material warmth. We pair them with VR simulations so clients can inhabit the building early.",
          "This duality keeps us honest. A concept that looks elegant in renderings should also resolve gracefully when transferred into a factory-made mullion.",
        ],
        image: {
          src: "/showcase.jpg",
          alt: "Architect reviewing models",
          caption: "Analog and digital tools coexist throughout the process.",
        },
      },
      {
        heading: "Documentation as storytelling",
        paragraphs: [
          "We script our drawing sets the way a filmmaker plans a storyboard. Every detail is contextualized, making it easier for contractors to understand intent.",
          "Once construction starts, the same narrative powers our digital twin. Field teams capture deviations with LiDAR, and designers push adjustments back through the model within hours.",
        ],
        insight: {
          label: "Pro tip",
          content: "Host interdisciplinary pin-ups weekly. It breaks silos and stops rework before it snowballs.",
        },
      },
    ],
  },
  "sustainable-construction": {
    ...blogsBySlug["sustainable-construction"]!,
    heroKicker: "Climate action",
    category: "Next-gen delivery",
    summary:
      "True sustainability marries material health, logistics, and long-term operations. Here's how we keep carbon honest from day zero.",
    readingTime: "6 min read",
    author: {
      name: "Noah Bishop",
      role: "Sustainability Principal",
    },
    keyPoints: [
      "Material passports track every component for future reuse.",
      "Procurement decisions factor in both carbon and community investment.",
      "Smart commissioning keeps buildings efficient long after handover.",
    ],
    quote: {
      text: "We cannot offset our way out of bad decisions. Every beam and panel must justify its carbon story.",
      author: "Noah Bishop",
      role: "Sustainability Principal",
    },
    highlightStats: [
      {
        label: "Reclaimed content",
        value: "58%",
        description: "Average recycled or bio-based material share across our 2024 projects.",
      },
      {
        label: "Grid impact",
        value: "-24%",
        description: "Operational energy reduction after smart commissioning.",
      },
      {
        label: "Circularity score",
        value: "82/100",
        description: "Composite rating from third-party material health audits.",
      },
    ],
    sections: [
      {
        heading: "Material intelligence",
        paragraphs: [
          "We run every specification through a carbon and toxicity dashboard. When a finish or structural element tips the balance, we flag alternatives with documented supply chains.",
          "Suppliers are onboarded months before tender so they can align fabrication slots with our low-carbon targets.",
        ],
      },
      {
        heading: "Construction without the chaos",
        paragraphs: [
          "Lean delivery plans shrink laydown areas and keep surrounding streets breathable. Prefabricated service racks drop straight into place, cutting diesel usage from temporary generators.",
          "Field crews rely on electric equipment wherever possible, supported by battery swap stations stationed on each deck.",
        ],
        image: {
          src: "/yashrajhero.jpg",
          alt: "Construction site using sustainable methods",
        },
      },
      {
        heading: "Operations that stay efficient",
        paragraphs: [
          "Once the ribbon is cut, we stay involved through a two-year performance assurance phase. Real-time meters feed dashboards that alert facility teams before drift occurs.",
          "Lessons learned roll back into material passports, making future retrofits faster and cleaner.",
        ],
        insight: {
          label: "Checklist",
          content: "Pair each carbon promise with a measurable KPI that survives handover.",
        },
      },
    ],
  },
  "urban-planning": {
    ...blogsBySlug["urban-planning"]!,
    heroKicker: "Policy + design",
    category: "City strategy",
    summary:
      "Modern planning balances density, delight, and durability. It takes bold zoning, nimble mobility plans, and relentless community feedback.",
    readingTime: "7 min read",
    author: {
      name: "Priya Menon",
      role: "Chief Planner",
    },
    keyPoints: [
      "15-minute districts demand mixed-tenure housing on day one.",
      "Mobility hubs must mix bikes, shuttles, and micro-fulfillment.",
      "Data trusts help residents see how growth benefits every block.",
    ],
    quote: {
      text: "Cities that treat public space as the primary asset are the ones people will choose, work in, and fight for.",
      author: "Priya Menon",
      role: "Chief Planner",
    },
    highlightStats: [
      {
        label: "Transit access",
        value: "92%",
        description: "Residents living within five minutes of high-frequency transit in pilot districts.",
      },
      {
        label: "Green cover",
        value: "+18%",
        description: "Net increase in canopy over the past three plan cycles.",
      },
      {
        label: "Public projects",
        value: "64",
        description: "Community-led micro grants funded through participatory budgeting.",
      },
    ],
    sections: [
      {
        heading: "Designing resilient density",
        paragraphs: [
          "We begin with scenario planning rather than fixed master plans. This allows us to tune density up or down as market forces shift.",
          "Key parcels near transit are locked for mixed-income housing early. Retail bays are kept shallow so independent operators can thrive.",
        ],
      },
      {
        heading: "Mobility that feels intuitive",
        paragraphs: [
          "Mobility hubs double as social infrastructure. They include daycare drop-off, maker kiosks, and parcel lockers so errands layer into a single trip.",
          "Dynamic curb management keeps streets fluid, prioritizing pedestrians and light mobility while still supporting logistics.",
        ],
        image: {
          src: "/yashrajhero1.jpg",
          alt: "City plan overview with transit connections",
        },
      },
      {
        heading: "Radical transparency",
        paragraphs: [
          "We built a data trust so communities can audit metrics without waiting for PDFs. Air quality, traffic counts, and housing delivery targets update nightly.",
          "Workshops now focus on solutions rather than conflicting anecdotes because everyone references the same live dataset.",
        ],
        insight: {
          label: "Engagement idea",
          content: "Host quarterly open-studio nights where residents can remix zoning concepts with the design team.",
        },
      },
    ],
  },
};


