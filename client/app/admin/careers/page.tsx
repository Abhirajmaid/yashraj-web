'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, BriefcaseBusiness } from 'lucide-react';
import { CareerApplicationRecord } from '@/types/career';
import { listenToCareerApplications } from '@/lib/careerRepository';

function normaliseText(text: string) {
  return text.toLowerCase().trim();
}

export default function AdminCareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState<CareerApplicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = listenToCareerApplications(
      (records) => {
        setApplications(records);
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
    return applications.filter((row) => {
      if (!query) return true;
      return (
        normaliseText(row.fullName).includes(query) ||
        normaliseText(row.email).includes(query) ||
        normaliseText(row.position).includes(query) ||
        normaliseText(row.phone).includes(query) ||
        normaliseText(row.location).includes(query)
      );
    });
  }, [applications, searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Career</h1>
        <p className="mt-2 text-gray-500">All submitted career applications</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="overflow-hidden rounded-xl border-0 bg-white shadow-md transition-shadow hover:shadow-lg">
          <div className="flex items-stretch">
            <div className="w-1 shrink-0 bg-brand-primary" />
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Total Applications</p>
                  <p className="mt-1 tabular-nums text-3xl font-bold text-gray-900">{applications.length}</p>
                  <p className="mt-0.5 text-xs text-gray-400">career forms</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10">
                  <BriefcaseBusiness className="h-6 w-6 text-brand-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex h-9 w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b border-gray-200 [&_tr]:border-b">
              <tr>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Email</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Phone</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Position</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Experience</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Location</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Resume</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Submitted</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading && filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    Loading career applications...
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    No applications found
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium text-gray-900">{row.fullName}</td>
                    <td className="p-4 text-gray-600">{row.email}</td>
                    <td className="p-4 text-gray-600">{row.phone}</td>
                    <td className="p-4 text-gray-600">{row.position}</td>
                    <td className="p-4 text-gray-600">{row.experience}</td>
                    <td className="p-4 text-gray-600">{row.location}</td>
                    <td className="p-4 text-gray-600">
                      <a
                        href={row.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-primary hover:underline"
                      >
                        Open
                      </a>
                    </td>
                    <td className="p-4 text-gray-600">
                      {row.createdAt ? new Date(row.createdAt).toLocaleString() : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!isLoading && filteredRows.length > 0 && (
        <p className="text-sm text-gray-600">
          Showing {filteredRows.length} of {applications.length} applications
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
