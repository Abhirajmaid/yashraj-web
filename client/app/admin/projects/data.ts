export type ProjectStatus = 'draft' | 'active' | 'completed';

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  category: string;
  segment: string;
  price: string;
  inventory: number;
  location: string;
  progress: number;
  builder: string;
  consultants: string;
  launchWindow: string;
  deliveryWindow: string;
  financing: string;
  highlights: string;
  heroImage: string;
  gallery: string[];
  overview: string;
};

export const projects: Project[] = [
  {
    id: 'yr-1001',
    name: 'Aurora Skyline Residences',
    status: 'draft',
    category: 'Residential',
    segment: 'High-rise',
    price: '₹2.1 Cr onwards',
    inventory: 320,
    location: 'Sector 112, Mumbai',
    progress: 68,
    builder: 'Yashraj Constructions',
    consultants: 'Arclight Studio • GridStruct',
    launchWindow: 'Aug 2025',
    deliveryWindow: 'Q4 2027',
    financing: '20:20:20 Flex plan • Partner banks aligned',
    highlights: 'Sky lounge • EV parking • Retail concourse • Smart concierge',
    heroImage:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
    ],
    overview:
      'Connected twin towers overlooking the eastern freeway. Focused on transit professionals with premium club access.',
  },
  {
    id: 'yr-1002',
    name: 'Harbor Promenade Villas',
    status: 'active',
    category: 'Residential',
    segment: 'Waterfront villas',
    price: '₹5.4 Cr onwards',
    inventory: 48,
    location: 'Palm Beach Road, Navi Mumbai',
    progress: 34,
    builder: 'Yashraj Signature Homes',
    consultants: 'Studio Sangraha • GreenHive',
    launchWindow: 'Jan 2026',
    deliveryWindow: 'Q2 2028',
    financing: '15:70:15 milestone plan • Luxe alliance benefits',
    highlights: 'Private marina • Aqua clubhouse • Spa pavilions',
    heroImage:
      'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    ],
    overview:
      'Limited series waterfront community with hospitality-grade services and curated coastal landscaping.',
  },
  {
    id: 'yr-1003',
    name: 'Northern Ridge Viaduct',
    status: 'draft',
    category: 'Commercial',
    segment: 'Transit hub',
    price: '₹890 Cr (capex)',
    inventory: 12,
    location: 'Uttarakhand logistics corridor',
    progress: 92,
    builder: 'Yashraj InfraWorks',
    consultants: 'GridStruct • Horizon Mobility',
    launchWindow: 'Apr 2025',
    deliveryWindow: 'Q1 2026',
    financing: 'PPP alignment confirmed • Central grant locked',
    highlights: 'Seismic retrofits • Multi-modal decks • Retail pockets',
    heroImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=70',
    gallery: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=70',
    ],
    overview:
      'Signature viaduct connecting northern freight with passenger lines, built for extreme terrain resilience.',
  },
];

export const statusLabels: Record<ProjectStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  completed: 'Completed',
};

export const statusTone: Record<ProjectStatus, string> = {
  draft: 'bg-yellow-900/50 text-yellow-200 border-yellow-700/50',
  active: 'bg-green-900/40 text-green-200 border-green-700/40',
  completed: 'bg-blue-900/40 text-blue-200 border-blue-700/40',
};

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}


