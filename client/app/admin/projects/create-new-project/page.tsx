'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { createProjectRecord } from '@/lib/projectsRepository';
import { ProjectRecord } from '@/types/project';
import { Card, Field, SelectField, TextAreaField } from '@/components/admin/ProjectFormFields';

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

type ProjectForm = {
  name: string;
  location: string;
  category: string;
  overview: string;
};

type ImageEntry = {
  id: string;
  file: File;
  preview: string;
};

const emptyForm: ProjectForm = { name: '', location: '', category: '', overview: '' };

const makeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().slice(0, 8)
    : Math.random().toString(36).slice(2, 10);

export default function CreateNewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [savedProject, setSavedProject] = useState<ProjectRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const revokeAll = (entries: ImageEntry[]) => {
    entries.forEach((e) => URL.revokeObjectURL(e.preview));
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
      const added: ImageEntry[] = fileArray.slice(0, available).map((file) => ({
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
      if (entry) URL.revokeObjectURL(entry.preview);
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

  const handleReset = () => {
    setForm(emptyForm);
    setSavedProject(null);
    setSuccessMessage(null);
    setFormError(null);
    setImages((current) => { revokeAll(current); return []; });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) return;

    setFormError(null);
    setSuccessMessage(null);

    if (!form.name.trim()) {
      setFormError('Project name is required.');
      return;
    }

    setIsSaving(true);

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Save timed out after 2 minutes.')), 120_000)
    );

    try {
      const project = await Promise.race([
        createProjectRecord({
          name: form.name.trim(),
          overview: form.overview.trim(),
          essentials: [],
          imageFiles: images.map((e) => e.file),
          category: form.category || undefined,
          location: form.location.trim() || undefined,
        }),
        timeout,
      ]);

      setSavedProject(project);
      setSuccessMessage(`"${project.name}" saved successfully!`);
    } catch (error) {
      console.error(error);
      setFormError(error instanceof Error ? error.message : 'Something went wrong.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-10 text-gray-900">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">Create project</p>
          <h1 className="text-3xl font-semibold text-gray-900">New project entry</h1>
          <p className="text-sm text-gray-500">Add project details and images to publish in the live showcase.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            ← Back to list
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Reset form
          </button>
        </div>
      </header>

      {formError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</p>
      ) : null}

      {successMessage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-xl border border-green-200 bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-green-800">Success</h2>
            <p className="mt-2 text-sm text-gray-700">{successMessage}</p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => router.push('/admin/projects')}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card title="Project Information" description="Basic project details displayed on the website.">
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
            placeholder="Short description that appears on cards and the project overview."
            rows={3}
          />
        </Card>

        <Card
          title="Images"
          description={`Upload up to ${MAX_IMAGES} images. The first image is used as the primary/hero image — click "Set as primary" to change which one leads.`}
        >
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Add images {images.length > 0 ? `(${images.length} / ${MAX_IMAGES})` : ''}
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
                {images.map((entry, idx) => (
                  <div
                    key={entry.id}
                    className={`relative overflow-hidden rounded-xl border-2 bg-gray-50 ${
                      idx === 0 ? 'border-brand-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={entry.preview}
                      alt={entry.file.name}
                      className="h-36 w-full object-cover"
                    />
                    {idx === 0 ? (
                      <span className="absolute left-2 top-2 rounded-full bg-brand-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                        Primary
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
                ))}
              </div>
            ) : (
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-gray-300 text-sm text-gray-400">
                No images selected yet
              </div>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Clear form
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <span className="flex items-center gap-1">
                <span>Saving</span>
                <span className="inline-flex gap-0.5">
                  <span style={{ animation: 'bounce 1s infinite 0ms' }}>.</span>
                  <span style={{ animation: 'bounce 1s infinite 200ms' }}>.</span>
                  <span style={{ animation: 'bounce 1s infinite 400ms' }}>.</span>
                </span>
              </span>
            ) : (
              'Save project'
            )}
          </button>
        </div>
      </form>

      {savedProject ? (
        <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Project saved</h2>
              <p className="text-xs text-gray-500">
                {savedProject.images.length} image{savedProject.images.length !== 1 ? 's' : ''} uploaded.
              </p>
            </div>
            <Link
              href="/admin/projects"
              className="inline-flex items-center rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-primary/90"
            >
              Go to project list
            </Link>
          </header>
          {savedProject.images.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {savedProject.images.map((url, idx) => (
                <div key={url} className={`overflow-hidden rounded-xl border-2 ${idx === 0 ? 'border-brand-primary' : 'border-gray-200'}`}>
                  <img src={url} alt={`Image ${idx + 1}`} className="h-32 w-full object-cover" />
                  {idx === 0 ? (
                    <p className="px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-brand-primary">
                      Primary
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
