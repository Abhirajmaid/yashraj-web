'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { deleteProjectRecord, getProjectRecord } from '@/lib/projectsRepository';
import { ProjectRecord } from '@/types/project';

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default function DeleteProjectPage({ params }: PageProps) {
  const router = useRouter();
  const { projectId } = use(params);

  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const record = await getProjectRecord(projectId);
        if (!record) {
          setError('Project not found.');
          setProject(null);
          return;
        }
        setProject(record);
        setError(null);
      } catch (fetchError) {
        const message =
          fetchError instanceof Error ? fetchError.message : 'Failed to load project for deletion.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleDelete = async () => {
    if (!project || isDeleting) return;
    setIsDeleting(true);
    setError(null);
    try {
      await deleteProjectRecord(project.id);
      router.push('/admin/projects');
    } catch (deleteError) {
      const message =
        deleteError instanceof Error ? deleteError.message : 'Failed to delete project.';
      setError(message);
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-gray-600">Loading project…</p>;
  }

  if (error && !project) {
    return (
      <div className="space-y-4 text-gray-900">
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
        <Link
          href="/admin/projects"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="space-y-8 text-gray-900">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-primary">Delete project</p>
          <h1 className="text-3xl font-semibold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500">
            This action is permanent. The project will be removed from the admin dashboard and public
            website.
          </p>
        </div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          Cancel
        </Link>
      </header>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <section className="space-y-6 rounded-xl border border-brand-primary/30 bg-brand-primary/10 p-6 shadow-md">
        <p className="text-sm text-brand-primary">
          You are about to delete <span className="font-semibold">{project.name}</span>. Any images
          associated with this project will remain in Cloudinary, but the project record and its
          visibility on the website will be removed.
        </p>

        <div className="rounded-lg border border-brand-primary/20 bg-white p-4 text-sm text-gray-700">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Snapshot</p>
          <p className="mt-1 font-semibold text-gray-900">{project.overview || 'No overview provided.'}</p>
          <p className="mt-2 text-xs text-gray-500">
            Created:{' '}
            {project.createdAt ? new Date(project.createdAt).toLocaleString() : 'Unknown date'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="inline-flex items-center justify-center rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? 'Deleting…' : 'Yes, delete this project'}
          </button>
        </div>
      </section>
    </div>
  );
}


