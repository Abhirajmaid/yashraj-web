import type { Project } from "@/data/projects";
import type { ProjectRecord } from "@/types/project";

const fallbackDescription = "Project narrative coming soon.";
const fallbackEssential = "Details to be announced.";

export function mapRecordToProject(record: ProjectRecord): Project {
  const description =
    record.overview && record.overview.trim().length > 0
      ? [record.overview.trim()]
      : [fallbackDescription];

  const [primaryImage, ...restImages] = record.images ?? [];

  const gallery = restImages.map((src, index) => ({
    src,
    alt: `${record.name} image ${index + 2}`,
  }));

  return {
    id: record.id,
    title: record.name || "Untitled project",
    category: record.category?.trim() || "Project",
    location: record.location?.trim() || undefined,
    description,
    mainImage: primaryImage || undefined,
    mainImageAlt: primaryImage ? `${record.name || "Project"} hero image` : undefined,
    secondaryImages: [],
    essentials:
      record.essentials.length > 0 ? record.essentials : [fallbackEssential],
    gallery,
  };
}
