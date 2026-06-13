'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { listenToProjects } from '@/lib/projectsRepository';
import { listenToCareerApplications } from '@/lib/careerRepository';
import { FolderKanban, Plus, BriefcaseBusiness, FolderOpen } from 'lucide-react';

// Re-export Card pieces for Plantozone-style layout (if no shared ui/card, define locally)
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  barColor,
  iconBg,
  iconColor,
}: {
  label: string;
  value: number | string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  barColor: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border-0 bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="flex items-stretch">
        <div className={`w-1 shrink-0 ${barColor}`} />
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">{label}</p>
              <p className="mt-1 tabular-nums text-3xl font-bold text-gray-900">{value}</p>
              <p className="mt-0.5 text-xs text-gray-400">{sub}</p>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [projectCount, setProjectCount] = useState(0);
  const [careerCount, setCareerCount] = useState(0);

  useEffect(() => {
    const unsubscribe = listenToProjects(
      (records) => setProjectCount(records.length),
      () => {}
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = listenToCareerApplications(
      (records) => setCareerCount(records.length),
      () => {}
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-500">Welcome to Yashraj Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Projects"
          value={projectCount}
          sub="in portfolio"
          icon={FolderKanban}
          barColor="bg-brand-primary"
          iconBg="bg-brand-primary/10"
          iconColor="text-brand-primary"
        />
        <StatCard
          label="Career Applications"
          value={careerCount}
          sub="received"
          icon={BriefcaseBusiness}
          barColor="bg-brand-accent"
          iconBg="bg-brand-accent/10"
          iconColor="text-brand-accent"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border-0 bg-white shadow-md">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="font-semibold leading-none tracking-tight text-gray-900">Quick Actions</h2>
            <p className="text-sm text-gray-500">Common admin tasks</p>
          </div>
          <div className="space-y-1 p-6 pt-0">
            <Link
              href="/admin/projects"
              className="block rounded-lg p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <FolderKanban className="h-5 w-5 text-brand-primary" />
                <span className="font-medium">Manage Projects</span>
              </div>
            </Link>
            <Link
              href="/admin/projects/create-new-project"
              className="block rounded-lg p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Plus className="h-5 w-5 text-brand-accent" />
                <span className="font-medium">Create New Project</span>
              </div>
            </Link>
            <Link
              href="/admin/careers"
              className="block rounded-lg p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-5 w-5 text-brand-primary" />
                <span className="font-medium">View Career Applications</span>
              </div>
            </Link>
            <Link
              href="/admin/portfolio"
              className="block rounded-lg p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <FolderOpen className="h-5 w-5 text-brand-primary" />
                <span className="font-medium">Manage Portfolio Link</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border-0 bg-white shadow-md">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="font-semibold leading-none tracking-tight text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-500">Latest updates</p>
          </div>
          <div className="p-6 pt-0">
            <div className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">System is running smoothly</p>
                <p className="mt-1 text-xs text-gray-500">All services operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
