export type ProjectStatus = 'draft' | 'active' | 'completed';

export type FeatureImageMap = {
  primary: string;
  lifestyle: string;
  city: string;
};

export type ProjectRecord = {
  id: string;
  code: string;
  name: string;
  industries: string[];
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
  description: string;
  statement: string;
  essentials: string[];
  featureImages: FeatureImageMap;
  gallery: string[];
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type ProjectEssentials = string[];

export type CreateProjectPayload = {
  code: string;
  name: string;
  industries: string[];
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
  description: string;
  statement: string;
  essentials: string[];
  featureFiles: Record<'primary' | 'lifestyle' | 'city', File>;
  galleryFiles: File[];
};



