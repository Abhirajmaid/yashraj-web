'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, type FormEvent, useEffect, useState } from 'react';
import { getProjectRecord, updateProjectRecord } from '@/lib/projectsRepository';
import { ProjectRecord } from '@/types/project';
import { Card, Field, SelectField, TextAreaField, StringListField } from '@/components/admin/ProjectFormFields';

const MAX_IMAGES = 10;

const CATEGORY_OPTIONS = [
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Roads & Bridges', label: 'Roads & Bridges' },
  { value: 'Buildings & Industrial', label: 'Buildings & Industrial' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Residential', label: 'Residential' },
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Renovation', label: 'Renovation' },
  { value: 'Other', label: 'Other' },
];

type PageProps = {
  params: Promise<{ projectId: string }>;
};

type ProjectForm = {
  name: string;
  location: string;
  category: string;
  overview: string;
  essentials: string[];
};

/** An image that already exists in the saved project (URL). */
type ExistingImage = { kind: 'existing'; id: string; url: string };
/** An image the user just picked from disk (not yet uploaded). */
type NewImage = { kind: 'new'; id: string; file: File; preview: string };
type ImageEntry = ExistingImage | NewImage;

const emptyForm: ProjectForm = { name: '', location: '', category: '', overview: '', essentials: [] };

const makeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().slice(0, 8)
    : Math.random().toString(36).slice(2, 10);

export default function EditProjectPage({ params }: PageProps) {
  const router = useRouter();
  const { projectId } = use(params);

  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const record = await getProjectRecord(projectId);
        if (!record) {
          setError('Project not found.');
          return;
        }
        setProject(record);
        setForm({
          name: record.name,
          location: record.location ?? '',
          category: record.category ?? '',
          overview: record.overview ?? '',
          essentials: record.essentials ?? [],
        });
        setImages(
          record.images.map((url) => ({ kind: 'existing', id: makeId(), url }))
        );
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load project.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const revokeNew = (entries: ImageEntry[]) => {
    entries.forEach((e) => {
      if (e.kind === 'new') URL.revokeObjectURL(e.preview);
    });
  };

  const handleFilesAdd = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    // Snapshot to a plain array immediately — FileList can become stale once
    // the input is reset via e.currentTarget.value = '' in the onChange handler.
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setImages((current) => {
      const available = MAX_IMAGES - current.length;
      if (available <= 0) return current;
      const added: NewImage[] = fileArray.slice(0, available).map((file) => ({
        kind: 'new',
        id: makeId(),
        file,
        preview: URL.createObjectURL(file),
      }));
      return [...current, ...added];
    });
  };

  const handleRemove = (id: string) => {
    setImages((current) => {
      const entry = current.find((e) => e.id === id);
      if (entry?.kind === 'new') URL.revokeObjectURL(entry.preview);
      return current.filter((e) => e.id !== id);
    });
  };

  const handleSetPrimary = (id: string) => {
    setImages((current) => {
      const idx = current.findIndex((e) => e.id === id);
      if (idx <= 0) return current;
      const next = [...current];
      const [item] = next.splice(idx, 1);
      next.unshift(item);
      return next;
    });
  };

  const handleResetImages = () => {
    if (!project) return;
    setImages((current) => { revokeNew(current); return []; });
    setImages(project.images.map((url) => ({ kind: 'existing', id: makeId(), url })));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!project || isSaving) return;

    if (!form.name.trim()) {
      setError('Project name is required.');
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsSaving(true);

    const currentImages = images
      .filter((e): e is ExistingImage => e.kind === 'existing')
      .map((e) => e.url);

    const newImageFiles = images
      .filter((e): e is NewImage => e.kind === 'new')
      .map((e) => e.file);

    try {
      const updated = await updateProjectRecord(project.id, {
        name: form.name.trim(),
        overview: form.overview.trim(),
        essentials: form.essentials.filter((s) => s.trim() !== ''),
        currentImages,
        newImageFiles: newImageFiles.length ? newImageFiles : undefined,
        category: form.category || undefined,
        location: form.location.trim() || undefined,
      });

      setProject(updated);
      // Re-sync images from the freshly saved record
      revokeNew(images);
      setImages(updated.images.map((url) => ({ kind: 'existing', id: makeId(), url })));
      setSuccessMessage('Project updated successfully.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update project.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-gray-600">Loading project for editing…</p>;
  }

  if (error && !project) {
    return (
      <div className="space-y-4 text-gray-900">
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        <Link
          href="/admin/projects"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          ← Back to projects
        </Link>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="space-y-8 text-gray-900">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">Edit project</p>
          <h1 className="text-3xl font-semibold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500">Update details, copy, or media assets.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin/projects/${project.id}`}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            ← View details
          </Link>
          <Link
            href="/admin/projects"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Back to list
          </Link>
        </div>
      </header>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}
      {successMessage ? (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{successMessage}</p>
      ) : null}

      {successMessage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-xl border border-green-200 bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-green-800">Saved</h2>
            <p className="mt-2 text-sm text-gray-700">{successMessage}</p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => { setSuccessMessage(null); router.push('/admin/projects'); }}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card title="Project Information" description="Update the core details visible on the website.">
          <Field
            label="Project Name"
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            placeholder="e.g. Airoli T-Junction Upgradation"
            required
          />
          <Field
            label="Project Location"
            value={form.location}
            onChange={(v) => setForm((f) => ({ ...f, location: v }))}
            placeholder="e.g. Surat Industrial Corridor"
          />
          <SelectField
            label="Category"
            value={form.category}
            options={CATEGORY_OPTIONS}
            placeholder="—"
            onChange={(v) => setForm((f) => ({ ...f, category: v }))}
          />
          <TextAreaField
            label="Overview / Description"
            value={form.overview}
            onChange={(v) => setForm((f) => ({ ...f, overview: v }))}
            rows={3}
            placeholder="Short description that appears on listing cards and project page."
          />
          <StringListField
            label="Key Highlights"
            value={form.essentials}
            onChange={(v) => setForm((f) => ({ ...f, essentials: v }))}
            placeholder="e.g. Completed ahead of schedule"
            addLabel="Add highlight"
            emptyMessage="No key highlights yet. Add bullet points shown on the project details page."
          />
        </Card>

        <Card
          title="Images"
          description={`All project images. The first image is the primary/hero. Click "Set as primary" to change which one leads. Up to ${MAX_IMAGES} images total.`}
        >
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Add more images {images.length > 0 ? `(${images.length} / ${MAX_IMAGES})` : ''}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={images.length >= MAX_IMAGES}
                onChange={(e) => { handleFilesAdd(e.target.files); e.currentTarget.value = ''; }}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-brand-primary file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:opacity-50"
              />
            </label>

            {images.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {images.map((entry, idx) => {
                  const src = entry.kind === 'existing' ? entry.url : entry.preview;
                  const label = entry.kind === 'new' ? entry.file.name : null;
                  return (
                    <div
                      key={entry.id}
                      className={`relative overflow-hidden rounded-xl border-2 bg-gray-50 ${
                        idx === 0 ? 'border-brand-primary' : 'border-gray-200'
                      }`}
                    >
                      <img src={src} alt={label ?? `Image ${idx + 1}`} className="h-36 w-full object-cover" />
                      {idx === 0 ? (
                        <span className="absolute left-2 top-2 rounded-full bg-brand-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                          Primary
                        </span>
                      ) : null}
                      {entry.kind === 'new' ? (
                        <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                          New
                        </span>
                      ) : null}
                      <div className="flex items-center justify-between gap-1 px-2 py-2">
                        {idx !== 0 ? (
                          <button
                            type="button"
                            onClick={() => handleSetPrimary(entry.id)}
                            className="text-xs font-semibold text-brand-primary hover:underline"
                          >
                            Set as primary
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">Hero image</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemove(entry.id)}
                          className="text-xs font-semibold text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-gray-300 text-sm text-gray-400">
                No images — add some above.
              </div>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              setForm({
                name: project.name,
                location: project.location ?? '',
                category: project.category ?? '',
                overview: project.overview ?? '',
                essentials: project.essentials ?? [],
              });
              handleResetImages();
              setSuccessMessage(null);
              setError(null);
            }}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Reset changes
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? 'Saving…' : 'Save updates'}
          </button>
        </div>
      </form>
    </div>
  );
}
