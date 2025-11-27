'use client';

import { useEffect, useMemo, useState } from "react";
import { ProjectHighlightCard } from "./ProjectHighlightCard";
import { projects as demoProjects, Project } from "@/data/projects";
import { listenToProjects } from "@/lib/projectsRepository";
import { ProjectRecord } from "@/types/project";

const fallbackMainImage =
  demoProjects[0]?.mainImage ?? "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80";
const fallbackSecondaryImages =
  demoProjects[0]?.secondaryImages ??
  [
    {
      src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      alt: "Project detail",
    },
    {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      alt: "Project skyline",
    },
  ];

function mapRecordToHighlight(record: ProjectRecord): Project {
  const description = [record.statement, record.description].filter(Boolean);

  const essentials =
    record.essentials.length > 0
      ? record.essentials
      : record.highlights
          .split(/[\n•]/)
          .map((entry) => entry.trim())
          .filter(Boolean);

  const secondaryImages = [
    record.featureImages.lifestyle
      ? { src: record.featureImages.lifestyle, alt: `${record.name} lifestyle view` }
      : null,
    record.featureImages.city ? { src: record.featureImages.city, alt: `${record.name} skyline` } : null,
  ].filter(Boolean) as Project["secondaryImages"];

  const ensuredSecondary =
    secondaryImages.length > 0 ? secondaryImages : fallbackSecondaryImages.slice(0, 2);

  const gallery = record.gallery.map((src, index) => ({
    src,
    alt: `${record.name} gallery image ${index + 1}`,
  }));

  return {
    id: record.id,
    title: record.name || "Untitled project",
    description: description.length > 0 ? description : ["Project narrative coming soon."],
    mainImage: record.featureImages.primary || fallbackMainImage,
    mainImageAlt: `${record.name || "Project"} hero image`,
    secondaryImages: ensuredSecondary,
    essentials: essentials.length > 0 ? essentials : ["Details to be announced."],
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

  const mergedProjects = useMemo(() => {
    if (liveProjects.length === 0) {
      return demoProjects;
    }

    const demoWithoutDuplicates = demoProjects.filter(
      (demoProject) => !liveProjects.some((live) => live.title === demoProject.title)
    );

    return [...liveProjects, ...demoWithoutDuplicates];
  }, [liveProjects]);

  return (
    <section className="relative bg-white py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14">
        {error ? (
          <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error} • Showing demo projects while we reconnect.
          </p>
        ) : null}
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {mergedProjects.map((project) => (
            <ProjectHighlightCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
