import type { Project } from "@/data/projects";
import type { ProjectRecord } from "@/types/project";

const fallbackDescription = "Project narrative coming soon.";
const fallbackEssential = "Details to be announced.";

/** Collect all image URLs from backend (no primary/lifestyle/city distinction). Deduped. */
function getAllImageUrls(record: ProjectRecord): string[] {
  const seen = new Set<string>();
  const urls: string[] = [];
  for (const url of [
    record.featureImages.primary,
    record.featureImages.lifestyle,
    record.featureImages.city,
    ...(record.gallery ?? []),
  ]) {
    if (url && typeof url === "string" && url.trim() !== "" && !seen.has(url)) {
      seen.add(url);
      urls.push(url);
    }
  }
  return urls;
}

export function mapRecordToProject(record: ProjectRecord): Project {
  const description =
    record.overview && record.overview.trim().length > 0
      ? [record.overview.trim()]
      : [fallbackDescription];

  const allUrls = getAllImageUrls(record);
  const projectName = record.name || "Project";
  const allImages: { src: string; alt: string }[] = allUrls.map((src, index) => ({
    src,
    alt: `${projectName} image ${index + 1}`,
  }));

  const mainImage = allUrls[0] || record.featureImages.primary;
  const secondaryImages = [
    record.featureImages.lifestyle
      ? { src: record.featureImages.lifestyle, alt: `${record.name} lifestyle view` }
      : null,
    record.featureImages.city
      ? { src: record.featureImages.city, alt: `${record.name} skyline view` }
      : null,
  ].filter(Boolean) as Project["secondaryImages"];

  const gallery = (record.gallery ?? []).map((src, index) => ({
    src,
    alt: `${record.name} gallery image ${index + 1}`,
  }));

  return {
    id: record.id,
    title: record.name || "Untitled project",
    description,
    mainImage: mainImage || undefined,
    mainImageAlt: mainImage ? `${projectName} hero image` : undefined,
    secondaryImages,
    essentials:
      record.essentials.length > 0 ? record.essentials : [fallbackEssential],
    gallery,
    allImages: allImages.length > 0 ? allImages : undefined,
    category: record.category?.trim() || undefined,
  };
}
