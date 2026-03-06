import type { Project } from "@/data/projects";
import type { ProjectRecord } from "@/types/project";

const fallbackDescription = "Project narrative coming soon.";
const fallbackEssential = "Details to be announced.";

export function mapRecordToProject(record: ProjectRecord): Project {
  const description =
    record.overview && record.overview.trim().length > 0
      ? [record.overview.trim()]
      : [fallbackDescription];

  const secondaryImages = [
    record.featureImages.lifestyle
      ? { src: record.featureImages.lifestyle, alt: `${record.name} lifestyle view` }
      : null,
    record.featureImages.city
      ? { src: record.featureImages.city, alt: `${record.name} skyline view` }
      : null,
  ].filter(Boolean) as Project["secondaryImages"];

  const gallery = record.gallery.map((src, index) => ({
    src,
    alt: `${record.name} gallery image ${index + 1}`,
  }));

  return {
    id: record.id,
    title: record.name || "Untitled project",
    description,
    mainImage: record.featureImages.primary,
    mainImageAlt: record.featureImages.primary
      ? `${record.name || "Project"} hero image`
      : undefined,
    secondaryImages,
    essentials:
      record.essentials.length > 0 ? record.essentials : [fallbackEssential],
    gallery,
  };
}
