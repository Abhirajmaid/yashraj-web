'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { listenToProjects } from '@/lib/projectsRepository';
import { ProjectRecord } from '@/types/project';
import { statusLabels, statusTone } from './data';

function normaliseText(text: string) {
  return text.toLowerCase().trim();
}

export default function AdminProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | keyof typeof statusLabels>('all');
  const [segmentFilter, setSegmentFilter] = useState<'all' | string>('all');
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

  const segments = useMemo(() => {
    const pool = new Set(projects.map((project) => project.segment).filter(Boolean));
    return Array.from(pool).sort();
  }, [projects]);

  const filteredRows = useMemo(() => {
    const query = normaliseText(searchTerm);

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        normaliseText(project.id).includes(query) ||
        normaliseText(project.code).includes(query) ||
        normaliseText(project.name).includes(query) ||
        normaliseText(project.location).includes(query);

      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesSegment =
        segmentFilter === 'all' || normaliseText(project.segment) === normaliseText(segmentFilter);

      return matchesSearch && matchesStatus && matchesSegment;
    });
  }, [projects, searchTerm, segmentFilter, statusFilter]);

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
            placeholder="Search by project name, code, or location…"
            className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none sm:max-w-md"
          />
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
              className="rounded-md border border-white/10 bg-[#0b0b0b] px-3 py-2 text-xs uppercase tracking-wide text-white/70 focus:border-white/40 focus:outline-none"
            >
              <option value="all">All status</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={segmentFilter}
              onChange={(event) =>
                setSegmentFilter(event.target.value === 'all' ? 'all' : (event.target.value as string))
              }
              className="rounded-md border border-white/10 bg-[#0b0b0b] px-3 py-2 text-xs uppercase tracking-wide text-white/70 focus:border-white/40 focus:outline-none"
            >
              <option value="all">All segments</option>
              {segments.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-md border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-black/40 text-xs uppercase tracking-wide text-white/40">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Project Code</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-left font-medium">Industries</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Price</th>
                <th className="px-4 py-3 text-left font-medium">Inventory</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {filteredRows.map((row) => (
                <tr key={row.id} className="bg-black/20 hover:bg-black/30">
                  <td className="px-4 py-3 font-medium text-white">{row.code || row.id}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3 text-white/60">{row.category || '—'}</td>
                  <td className="px-4 py-3 text-white/60">
                    {row.industries.length ? row.industries.join(', ') : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusTone[row.status]}`}
                    >
                      {statusLabels[row.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">{row.price || '—'}</td>
                  <td className="px-4 py-3">{row.inventory}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/projects/${row.id}`}
                      className="inline-flex items-center rounded-md bg-blue-900/40 px-3 py-1 text-xs font-medium text-blue-100 transition hover:bg-blue-800/40"
                    >
                      View details
                    </Link>
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

