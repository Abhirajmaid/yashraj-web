export type ProjectStatus = 'draft' | 'active' | 'completed';

/** @deprecated Use `images` array on ProjectRecord instead */
export type FeatureImageMap = {
  primary: string;
  lifestyle: string;
  city: string;
};

export type ProjectRecord = {
  id: string;
  name: string;
  overview: string;
  /** All project images. images[0] is treated as the primary/hero image. */
  images: string[];
  essentials: string[];
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
  /** @deprecated Kept for backward-compat reading of old Firestore docs */
  featureImages?: Partial<FeatureImageMap>;
  /** @deprecated Kept for backward-compat reading of old Firestore docs */
  gallery?: string[];
};

export type ProjectEssentials = string[];

export type CreateProjectPayload = {
  name: string;
  overview?: string;
  essentials?: string[];
  /** All image files to upload. imageFiles[0] will be the primary/hero image. */
  imageFiles?: File[];
  category?: string;
  location?: string;
  launchWindow?: string;
  deliveryWindow?: string;
  builder?: string;
  consultants?: string;
  financing?: string;
  progress?: number | null;
};

export type UpdateProjectPayload = {
  name?: string;
  overview?: string;
  essentials?: string[];
  /** New image files to append to the existing images */
  newImageFiles?: File[];
  /** Current images array (after any UI removals / reordering). images[0] = primary. */
  currentImages: string[];
  category?: string;
  location?: string;
  launchWindow?: string;
  deliveryWindow?: string;
  builder?: string;
  consultants?: string;
  financing?: string;
  progress?: number | null;
};
