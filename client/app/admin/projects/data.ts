import { ProjectStatus } from '@/types/project';

export const statusLabels: Record<ProjectStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  completed: 'Completed',
};

export const statusTone: Record<ProjectStatus, string> = {
  draft: 'bg-yellow-900/50 text-yellow-200 border-yellow-700/50',
  active: 'bg-green-900/40 text-green-200 border-green-700/40',
  completed: 'bg-blue-900/40 text-blue-200 border-blue-700/40',
};
