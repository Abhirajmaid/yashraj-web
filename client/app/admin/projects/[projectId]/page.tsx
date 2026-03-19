'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { getProjectRecord } from '@/lib/projectsRepository';
import { ProjectRecord, ProjectStatus } from '@/types/project';
import { statusLabels, statusTone } from '../data';

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default function ProjectDetailPage({ params }: PageProps) {
  const { projectId } = use(params);
  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const record = await getProjectRecord(projectId);
        if (!record) {
          setError('Project not found.');
          setProject(null);
        } else {
          setProject(record);
          setError(null);
        }
      } catch (firebaseError) {
        setError(firebaseError instanceof Error ? firebaseError.message : 'Failed to load project.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="space-y-4 text-gray-900">
        <p className="text-sm text-gray-600">Loading project details…</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="space-y-4 text-gray-900">
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error ?? 'Project not found.'}
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

  const statusKey: ProjectStatus = project.status ?? 'draft';

  return (
    <div className="space-y-8 text-gray-900">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">Project overview</p>
          <h1 className="text-3xl font-semibold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500">{project.location || project.overview || '—'}</p>
        </div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          ← Back to projects
        </Link>
      </header>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
        <div className="relative h-72 w-full bg-gray-100">
          {project.images?.[0] ? (
            <img
              src={project.images[0]}
              alt={project.name}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No hero image yet.
            </div>
          )}
          <span
            className={`absolute left-6 top-6 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusTone[statusKey]}`}
          >
            {statusLabels[statusKey]}
          </span>
        </div>

        <div className="grid gap-8 border-t border-gray-200 p-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <article className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Snapshot</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">Category</span>
                  {project.category || '—'}
                </li>
                <li className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">Segment</span>
                  {project.segment || '—'}
                </li>
                <li className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">Headline pricing</span>
                  {project.price || '—'}
                </li>
                <li className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">Inventory</span>
                  {project.inventory ?? '—'} units
                </li>
              </ul>
            </article>

            <article className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
              <p className="text-sm font-medium text-gray-900">{project.name}</p>
              <p className="text-sm leading-relaxed text-gray-600">{project.overview || project.description || '—'}</p>
              {project.industries?.length ? (
                <div className="flex flex-wrap gap-2">
                  {project.industries.map((industry) => (
                    <span
                      key={industry}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>

            <article className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Project essentials</h2>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                {project.essentials?.length ? (
                  <ul className="list-disc space-y-2 pl-4">
                    {project.essentials.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  project.highlights || 'Essentials pending.'
                )}
              </div>
            </article>

            <article className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Timeline</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">Launch window</span>
                  {project.launchWindow || '—'}
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">Delivery window</span>
                  {project.deliveryWindow || '—'}
                </div>
              </div>
            </article>
          </div>

          <aside className="space-y-4 text-sm text-gray-700">
            <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Builder / developer</span>
              <p className="font-medium text-gray-900">{project.builder || '—'}</p>
            </div>
            <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Consultants</span>
              <p>{project.consultants || '—'}</p>
            </div>
            <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Financing & schemes</span>
              <p>{project.financing || '—'}</p>
            </div>
            <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Progress</span>
              <p>{project.progress ?? '—'}% complete</p>
            </div>
          </aside>
        </div>
      </section>

      {project.images && project.images.length > 1 ? (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">All Images ({project.images.length})</h2>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {project.images.map((imageUrl, idx) => (
              <div
                key={imageUrl}
                className={`overflow-hidden rounded-lg border bg-white shadow ${idx === 0 ? 'border-brand-primary' : 'border-gray-200'}`}
              >
                <img src={imageUrl} alt={`Image ${idx + 1}`} className="h-40 w-full object-cover" />
                {idx === 0 ? (
                  <p className="px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-brand-primary">
                    Primary
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

