export type SiteSettings = {
  portfolioLink: string;
  brochureLink: string;
  updatedAt: string | null;
};

export type UpdateSiteSettingsPayload = {
  portfolioLink?: string;
  brochureLink?: string;
};
