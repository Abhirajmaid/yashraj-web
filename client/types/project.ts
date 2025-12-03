export type ProjectStatus = 'draft' | 'active' | 'completed';

export type FeatureImageMap = {
  primary: string;
  lifestyle: string;
  city: string;
};

export type ProjectRecord = {
  id: string;
  name: string; // Project title
  overview: string; // Single line overview description
  featureImages: FeatureImageMap; // primary (hero), lifestyle (sub1), city (sub2)
  essentials: string[]; // Array of 3 bullet points
  gallery: string[]; // Gallery images for View Gallery button
  createdAt?: string | null;
  updatedAt?: string | null;
  status?: ProjectStatus;
  location?: string;
  category?: string;
  segment?: string;
  price?: string;
  inventory?: number | null;
  statement?: string;
  description?: string;
  industries: string[];
  highlights?: string;
  launchWindow?: string;
  deliveryWindow?: string;
  builder?: string;
  consultants?: string;
  financing?: string;
  progress?: number | null;
};

export type ProjectEssentials = string[];

export type CreateProjectPayload = {
  name: string; // Project title
  overview?: string; // Single line overview description
  essentials?: string[]; // Key bullet points (optional)
  featureFiles?: Partial<Record<'primary' | 'lifestyle' | 'city', File>>; // Hero image + 2 sub images
  galleryFiles?: File[]; // Gallery images (optional)
};

export type UpdateProjectPayload = {
  name?: string;
  overview?: string;
  essentials?: string[];
  featureFiles?: Partial<Record<'primary' | 'lifestyle' | 'city', File>>;
  galleryFiles?: File[];
  currentFeatureImages: FeatureImageMap;
  currentGallery: string[];
};



