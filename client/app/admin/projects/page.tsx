'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { listenToProjects } from '@/lib/projectsRepository';
import { ProjectRecord } from '@/types/project';

function normaliseText(text: string) {
  return text.toLowerCase().trim();
}

export default function AdminProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = listenToProjects(
      (records) => {
        setProjects(records);
        setIsLoading(false);
        setError(null);
      },
      (firebaseError) => {
        setError(firebaseError.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredRows = useMemo(() => {
    const query = normaliseText(searchTerm);

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        normaliseText(project.id).includes(query) ||
        normaliseText(project.name).includes(query) ||
        normaliseText(project.overview).includes(query);

      return matchesSearch;
    });
  }, [projects, searchTerm]);

  return (
    <div className="space-y-8 text-white">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Projects</h1>
          <p className="text-sm text-white/60">
            Track inventory, industries, and rollout plans across the live portfolio.
          </p>
        </div>
        <Link
          href="/admin/projects/create-new-project"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm shadow-black/40 transition hover:bg-white/90 sm:mt-0"
        >
          + Create new project
        </Link>
      </header>

      <div className="rounded-lg border border-white/10 bg-[#111111] p-4 shadow-sm shadow-black/40">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by project name or overview…"
            className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none sm:max-w-md"
          />
        </div>

        <div className="mt-5 overflow-x-auto rounded-md border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-black/40 text-xs uppercase tracking-wide text-white/40">
              <tr>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Overview</th>
                <th className="px-4 py-3 text-left font-medium">Essentials</th>
                <th className="px-4 py-3 text-left font-medium">Images</th>
                <th className="px-4 py-3 text-left font-medium">Created</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {filteredRows.map((row) => (
                <tr key={row.id} className="bg-black/20 hover:bg-black/30">
                  <td className="px-4 py-3 font-mono text-xs text-white/60">{row.id.slice(0, 8)}...</td>
                  <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                  <td className="px-4 py-3 text-white/60 max-w-md truncate">{row.overview}</td>
                  <td className="px-4 py-3 text-white/60">{row.essentials?.length || 0}</td>
                  <td className="px-4 py-3 text-white/60">
                    {(row.gallery?.length || 0) + 3} {/* 3 feature images + gallery */}
                  </td>
                  <td className="px-4 py-3 text-white/60">
                    {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/projects/${row.id}`}
                        className="inline-flex items-center rounded-md bg-blue-900/40 px-3 py-1 text-xs font-medium text-blue-100 transition hover:bg-blue-800/40"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/projects/${row.id}/edit`}
                        className="inline-flex items-center rounded-md bg-amber-800/40 px-3 py-1 text-xs font-medium text-amber-100 transition hover:bg-amber-700/50"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/admin/projects/${row.id}/delete`}
                        className="inline-flex items-center rounded-md bg-red-900/40 px-3 py-1 text-xs font-medium text-red-100 transition hover:bg-red-800/50"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isLoading ? (
          <p className="mt-4 text-xs text-white/50">Loading projects…</p>
        ) : filteredRows.length === 0 ? (
          <p className="mt-4 text-xs text-white/50">No projects match the current filters.</p>
        ) : (
          <p className="mt-4 text-xs text-white/40">
            Showing {filteredRows.length} of {projects.length} projects
          </p>
        )}

        {error ? (
          <p className="mt-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

