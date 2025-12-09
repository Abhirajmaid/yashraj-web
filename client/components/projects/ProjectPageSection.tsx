'use client';

import { useEffect, useMemo, useState } from "react";
import { ProjectHighlightCard } from "./ProjectHighlightCard";
import { ProjectFilters } from "./ProjectFilters";
import { Pagination } from "./Pagination";
import type { Project } from "@/data/projects";
import { listenToProjects } from "@/lib/projectsRepository";
import { ProjectRecord } from "@/types/project";

const PROJECTS_PER_PAGE = 3;

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
  const [allProjects, setAllProjects] = useState<ProjectRecord[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectRecord[]>([]);
  const [liveProjects, setLiveProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = listenToProjects(
      (records) => {
        setAllProjects(records);
        setFilteredProjects(records);
        setError(null);
      },
      (firebaseError) => {
        setError(firebaseError.message);
      }
    );

    return () => unsubscribe();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProjects]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Update live projects when paginated projects change
  useEffect(() => {
    setLiveProjects(paginatedProjects.map(mapRecordToHighlight));
  }, [paginatedProjects]);

  const highlightProjects = useMemo(() => liveProjects, [liveProjects]);

  return (
    <section className="relative bg-white py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14">
        {error ? (
          <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error} • Showing demo projects while we reconnect.
          </p>
        ) : null}

        {/* Filters */}
        {allProjects.length > 0 && (
          <ProjectFilters
            projects={allProjects}
            onFilterChange={setFilteredProjects}
          />
        )}

        {/* Projects List */}
        {highlightProjects.length === 0 ? (
          <p className="rounded-lg border border-dashed border-brand-primary/20 bg-white/40 px-4 py-6 text-center text-sm font-medium text-dark/70">
            {allProjects.length === 0
              ? "No projects published yet. Create one from the admin dashboard to see it live here."
              : "No projects match your filters. Try adjusting your search criteria."}
          </p>
        ) : (
          <>
            <div className="space-y-16 sm:space-y-20 lg:space-y-24">
              {highlightProjects.map((project) => (
                <ProjectHighlightCard key={project.id} project={project} />
              ))}
            </div>

            {/* Pagination */}
            {filteredProjects.length > PROJECTS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredProjects.length}
                itemsPerPage={PROJECTS_PER_PAGE}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
