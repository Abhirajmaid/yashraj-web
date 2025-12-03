'use client';

import { useEffect, useMemo, useState } from "react";
import { ProjectHighlightCard } from "./ProjectHighlightCard";
import type { Project } from "@/data/projects";
import { listenToProjects } from "@/lib/projectsRepository";
import { ProjectRecord } from "@/types/project";

const fallbackDescription = "Project narrative coming soon.";
const fallbackEssential = "Details to be announced.";

function mapRecordToHighlight(record: ProjectRecord): Project {
  const description =
    record.overview && record.overview.trim().length > 0
      ? [record.overview.trim()]
      : [fallbackDescription];

  const secondaryImages = [
    record.featureImages.lifestyle
      ? { src: record.featureImages.lifestyle, alt: `${record.name} lifestyle view` }
      : null,
    record.featureImages.city ? { src: record.featureImages.city, alt: `${record.name} skyline view` } : null,
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
    mainImageAlt: record.featureImages.primary ? `${record.name || "Project"} hero image` : undefined,
    secondaryImages,
    essentials: record.essentials.length > 0 ? record.essentials : [fallbackEssential],
    gallery,
  };
}

export function ProjectPageSection() {
  const [liveProjects, setLiveProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = listenToProjects(
      (records) => {
        setLiveProjects(records.map(mapRecordToHighlight));
        setError(null);
      },
      (firebaseError) => {
        setError(firebaseError.message);
      }
    );

    return () => unsubscribe();
  }, []);

  const highlightProjects = useMemo(() => liveProjects, [liveProjects]);

  return (
    <section className="relative bg-white py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14">
        {error ? (
          <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error} • Showing demo projects while we reconnect.
          </p>
        ) : null}
        {highlightProjects.length === 0 ? (
          <p className="rounded-lg border border-dashed border-brand-primary/20 bg-white/40 px-4 py-6 text-center text-sm font-medium text-dark/70">
            No projects published yet. Create one from the admin dashboard to see it live here.
          </p>
        ) : (
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {highlightProjects.map((project) => (
            <ProjectHighlightCard key={project.id} project={project} />
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
