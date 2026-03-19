'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { listenToProjects } from '@/lib/projectsRepository';
import { ProjectRecord } from '@/types/project';
import { Plus, Edit, Trash2, Search, Eye, FolderKanban } from 'lucide-react';

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
    return projects.filter((p) => {
      if (!query) return true;
      return (
        normaliseText(p.id).includes(query) ||
        normaliseText(p.name).includes(query) ||
        normaliseText(p.overview ?? '').includes(query)
      );
    });
  }, [projects, searchTerm]);

  const getThumb = (row: ProjectRecord) => row.images?.[0] ?? null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-2 text-gray-500">Manage your project portfolio</p>
        </div>
        <Link
          href="/admin/projects/create-new-project"
          className="inline-flex items-center justify-center rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="overflow-hidden rounded-xl border-0 bg-white shadow-md transition-shadow hover:shadow-lg">
          <div className="flex items-stretch">
            <div className="w-1 shrink-0 bg-brand-primary" />
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Total Projects</p>
                  <p className="mt-1 tabular-nums text-3xl font-bold text-gray-900">{projects.length}</p>
                  <p className="mt-0.5 text-xs text-gray-400">in portfolio</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10">
                  <FolderKanban className="h-6 w-6 text-brand-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-[200px] flex-1 gap-2">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search projects…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-9 w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b border-gray-200 [&_tr]:border-b">
              <tr>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0">
                  Image
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Overview</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Location</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Images</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Created</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading && filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    Loading projects…
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No projects found
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => {
                  const thumb = getThumb(row);
                  const imgCount = row.images?.length ?? 0;
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                    >
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                          {thumb ? (
                            <Image
                              src={thumb}
                              alt={row.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              —
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-medium text-gray-900">{row.name}</td>
                      <td className="max-w-md truncate p-4 text-gray-600">{row.overview || '—'}</td>
                      <td className="max-w-[12rem] truncate p-4 text-gray-600">{row.location || '—'}</td>
                      <td className="p-4 text-gray-600">{imgCount}</td>
                      <td className="p-4 text-gray-600">
                        {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Link
                            href={`/admin/projects/${row.id}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/projects/${row.id}/edit`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/projects/${row.id}/delete`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-brand-primary transition hover:bg-brand-primary/10"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!isLoading && filteredRows.length > 0 && (
        <p className="text-sm text-gray-600">
          Showing {filteredRows.length} of {projects.length} projects
        </p>
      )}

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
