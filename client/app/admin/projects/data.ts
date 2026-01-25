import { ProjectStatus } from '@/types/project';

export const statusLabels: Record<ProjectStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  completed: 'Completed',
};

export const statusTone: Record<ProjectStatus, string> = {
  draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  active: 'bg-brand-primary/10 text-brand-primary border-brand-primary/30',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
};
