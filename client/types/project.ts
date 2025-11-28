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
};

export type ProjectEssentials = string[];

export type CreateProjectPayload = {
  name: string; // Project title
  overview?: string; // Single line overview description
  essentials?: string[]; // Key bullet points (optional)
  featureFiles?: Partial<Record<'primary' | 'lifestyle' | 'city', File>>; // Hero image + 2 sub images
  galleryFiles?: File[]; // Gallery images (optional)
};



