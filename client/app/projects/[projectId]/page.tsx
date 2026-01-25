'use client';

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { getProjectRecord } from '@/lib/projectsRepository';
import type { ProjectRecord } from '@/types/project';
import { ProjectDetailsView } from '@/components/projects/ProjectDetailsView';
import { Footer } from '@/components/common/Footer';

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default function ProjectDetailPage({ params }: PageProps) {
  const { projectId } = use(params);
  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const record = await getProjectRecord(projectId);
        if (!record) {
          setNotFoundState(true);
          setProject(null);
        } else {
          setProject(record);
          setNotFoundState(false);
        }
      } catch {
        setNotFoundState(true);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [projectId]);

  if (isLoading) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16">
          <p className="text-sm text-[#0E0E0E]/60">Loading project…</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (notFoundState || !project) {
    notFound();
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16">
        <ProjectDetailsView project={project} />
      </div>
      <Footer />
    </main>
  );
}
