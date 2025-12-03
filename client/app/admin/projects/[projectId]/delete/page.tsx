'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deleteProjectRecord, getProjectRecord } from '@/lib/projectsRepository';
import { ProjectRecord } from '@/types/project';

type PageProps = {
  params: { projectId: string };
};

export default function DeleteProjectPage({ params }: PageProps) {
  const router = useRouter();
  const projectId = params.projectId;

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
    return <p className="text-sm text-white/60">Loading project…</p>;
  }

  if (error && !project) {
    return (
      <div className="space-y-4 text-white">
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
        <Link
          href="/admin/projects"
          className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-white hover:text-white"
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
    <div className="space-y-8 text-white">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-red-300/70">Delete project</p>
          <h1 className="text-3xl font-semibold text-white">{project.name}</h1>
          <p className="text-sm text-white/60">
            This action is permanent. The project will be removed from the admin dashboard and public
            website.
          </p>
        </div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-white hover:text-white"
        >
          Cancel
        </Link>
      </header>

      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <section className="space-y-6 rounded-xl border border-red-500/40 bg-red-950/40 p-6 shadow-sm shadow-black/60">
        <p className="text-sm text-red-50">
          You are about to delete <span className="font-semibold">{project.name}</span>. Any images
          associated with this project will remain in Cloudinary, but the project record and its
          visibility on the website will be removed.
        </p>

        <div className="rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-white/70">
          <p className="text-xs uppercase tracking-wide text-white/40">Snapshot</p>
          <p className="mt-1 font-semibold text-white">{project.overview || 'No overview provided.'}</p>
          <p className="mt-2 text-xs text-white/50">
            Created:{' '}
            {project.createdAt ? new Date(project.createdAt).toLocaleString() : 'Unknown date'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-black/40 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? 'Deleting…' : 'Yes, delete this project'}
          </button>
        </div>
      </section>
    </div>
  );
}


