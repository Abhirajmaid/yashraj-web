"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjectRecord } from "@/lib/projectsRepository";
import { mapRecordToProject } from "@/lib/projectUtils";
import type { Project } from "@/data/projects";
import { ProjectDetailsInline } from "@/components/projects/ProjectDetailsInline";
import { Footer } from "@/components/common/Footer";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = typeof params.projectId === "string" ? params.projectId : params.projectId?.[0];
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!projectId) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    getProjectRecord(projectId)
      .then((record) => {
        if (cancelled) return;
        if (!record) {
          setNotFound(true);
          setProject(null);
        } else {
          setProject(mapRecordToProject(record));
        }
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 xl:px-14">
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
            <p className="mt-4 text-sm font-medium">Loading project…</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 xl:px-14">
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-12 text-center">
            <h1 className="text-xl font-semibold text-gray-900">Project not found</h1>
            <p className="mt-2 text-sm text-gray-600">
              The project you’re looking for doesn’t exist or has been removed.
            </p>
            <a
              href="/projects"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline"
            >
              ← Back to projects
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-gray-50 py-6 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14">
          <ProjectDetailsInline project={project} backHref="/projects" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
