'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, type FormEvent, useEffect, useState } from 'react';
import { getProjectRecord, updateProjectRecord } from '@/lib/projectsRepository';
import { ProjectRecord } from '@/types/project';
import { Card, Field, ImageUploadField, NumberField, SelectField, TextAreaField } from '@/components/admin/ProjectFormFields';

const CATEGORY_OPTIONS = [
  { value: '', label: '—' },
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
  overview: string;
  essential1: string;
  essential2: string;
  essential3: string;
  category: string;
  launchWindow: string;
  deliveryWindow: string;
  builder: string;
  consultants: string;
  financing: string;
  progress: string;
};

type GallerySlot = {
  id: string;
  preview: string;
  file: File;
};

const emptyForm: ProjectForm = {
  name: '',
  overview: '',
  essential1: '',
  essential2: '',
  essential3: '',
  category: '',
  launchWindow: '',
  deliveryWindow: '',
  builder: '',
  consultants: '',
  financing: '',
  progress: '',
};

const makeLocalId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().slice(0, 6)
    : Math.random().toString(36).slice(2, 8);

export default function EditProjectPage({ params }: PageProps) {
  const router = useRouter();
  const { projectId } = use(params);

  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [featureImage, setFeatureImage] = useState<{ file: File | null; preview: string | null }>({
    file: null,
    preview: null,
  });
  const [galleryUploads, setGalleryUploads] = useState<GallerySlot[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const record = await getProjectRecord(projectId);
        if (!record) {
          setError('Project not found.');
          setProject(null);
          return;
        }
        setProject(record);
        setForm({
          name: record.name,
          overview: record.overview ?? '',
          essential1: record.essentials?.[0] ?? '',
          essential2: record.essentials?.[1] ?? '',
          essential3: record.essentials?.[2] ?? '',
          category: record.category ?? '',
          launchWindow: record.launchWindow ?? '',
          deliveryWindow: record.deliveryWindow ?? '',
          builder: record.builder ?? '',
          consultants: record.consultants ?? '',
          financing: record.financing ?? '',
          progress: record.progress != null ? String(record.progress) : '',
        });
        setError(null);
      } catch (fetchError) {
        const message =
          fetchError instanceof Error ? fetchError.message : 'Failed to load project for editing.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleFeatureImageChange = (file: File | null) => {
    if (featureImage.preview) {
      URL.revokeObjectURL(featureImage.preview);
    }
    if (!file) {
      setFeatureImage({ file: null, preview: null });
      return;
    }
    setFeatureImage({ file, preview: URL.createObjectURL(file) });
  };

  const handleGalleryFilesChange = (files: FileList | null) => {
    galleryUploads.forEach((slot) => URL.revokeObjectURL(slot.preview));

    if (!files || files.length === 0) {
      setGalleryUploads([]);
      return;
    }

    const next: GallerySlot[] = Array.from(files).map((file, index) => ({
      id: `gallery-${index}-${makeLocalId()}`,
      file,
      preview: URL.createObjectURL(file),
    }));
    setGalleryUploads(next);
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

    const essentialsList = [form.essential1, form.essential2, form.essential3]
      .map((item) => item.trim())
      .filter(Boolean);

    const featureFiles: Partial<Record<'primary' | 'lifestyle' | 'city', File>> = {};
    if (featureImage.file) {
      featureFiles.primary = featureImage.file;
    }

    const galleryFiles = galleryUploads.map((slot) => slot.file);
    const progressNum = form.progress.trim() === '' ? undefined : Math.min(100, Math.max(0, parseInt(form.progress, 10) || 0));

    try {
      const updated = await updateProjectRecord(project.id, {
        name: form.name.trim(),
        overview: form.overview.trim(),
        essentials: essentialsList,
        featureFiles: featureImage.file ? featureFiles : undefined,
        galleryFiles: galleryFiles.length ? galleryFiles : undefined,
        currentFeatureImages: project.featureImages,
        currentGallery: project.gallery,
        category: form.category || undefined,
        launchWindow: form.launchWindow.trim() || undefined,
        deliveryWindow: form.deliveryWindow.trim() || undefined,
        builder: form.builder.trim() || undefined,
        consultants: form.consultants.trim() || undefined,
        financing: form.financing.trim() || undefined,
        progress: progressNum ?? undefined,
      });

      setProject(updated);
      setFeatureImage({ file: null, preview: null });
      setGalleryUploads([]);
      setSuccessMessage('Project updated successfully.');
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : 'Failed to update project.';
      setError(message);
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
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
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

  if (!project) {
    return null;
  }

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
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {successMessage ? (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMessage}
        </p>
      ) : null}

      {successMessage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          <div className="w-full max-w-md rounded-xl border border-green-200 bg-white p-6 shadow-lg">
            <h2 id="success-modal-title" className="text-lg font-semibold text-green-800">
              Success
            </h2>
            <p className="mt-2 text-sm text-gray-700">{successMessage}</p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setSuccessMessage(null);
                  router.push('/admin/projects');
                }}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
            onChange={(value) => setForm((current) => ({ ...current, name: value }))}
            placeholder="e.g. Airoli T-Junction Upgradation"
            required
          />
          <TextAreaField
            label="Overview (single line)"
            value={form.overview}
            onChange={(value) => setForm((current) => ({ ...current, overview: value }))}
            rows={2}
            placeholder="Short description that appears on listing cards."
          />
          <SelectField
            label="Category"
            value={form.category}
            options={CATEGORY_OPTIONS.filter((o) => o.value !== '')}
            placeholder="—"
            onChange={(value) => setForm((current) => ({ ...current, category: value }))}
          />
        </Card>

        <Card title="Timeline" description="Launch and delivery windows.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Launch Window"
              value={form.launchWindow}
              onChange={(value) => setForm((current) => ({ ...current, launchWindow: value }))}
              placeholder="—"
            />
            <Field
              label="Delivery Window"
              value={form.deliveryWindow}
              onChange={(value) => setForm((current) => ({ ...current, deliveryWindow: value }))}
              placeholder="—"
            />
          </div>
        </Card>

        <Card title="Builder, Consultants & Progress" description="Builder/developer, consultants, financing, and project progress.">
          <div className="space-y-4">
            <Field
              label="Builder / Developer"
              value={form.builder}
              onChange={(value) => setForm((current) => ({ ...current, builder: value }))}
              placeholder="—"
            />
            <Field
              label="Consultants"
              value={form.consultants}
              onChange={(value) => setForm((current) => ({ ...current, consultants: value }))}
              placeholder="—"
            />
            <Field
              label="Financing & Schemes"
              value={form.financing}
              onChange={(value) => setForm((current) => ({ ...current, financing: value }))}
              placeholder="—"
            />
            <NumberField
              label="Progress"
              value={form.progress}
              onChange={(value) => setForm((current) => ({ ...current, progress: value }))}
              placeholder="—"
              min={0}
              max={100}
              suffix="% complete"
            />
          </div>
        </Card>

        <Card title="Project Essentials" description="Edit the three bullet points shown on marketing pages.">
          <TextAreaField
            label="Essential 1"
            value={form.essential1}
            onChange={(value) => setForm((current) => ({ ...current, essential1: value }))}
            rows={2}
          />
          <TextAreaField
            label="Essential 2"
            value={form.essential2}
            onChange={(value) => setForm((current) => ({ ...current, essential2: value }))}
            rows={2}
          />
          <TextAreaField
            label="Essential 3"
            value={form.essential3}
            onChange={(value) => setForm((current) => ({ ...current, essential3: value }))}
            rows={2}
          />
        </Card>

        <Card
          title="Visual Assets"
          description="Upload new images to replace the current hero or gallery. Leave blank to keep existing media."
        >
          <div className="space-y-6">
            <section className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Primary feature image</p>
              {project.featureImages.primary ? (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-600">
                  Current image shown below. Upload a new one to replace it.
                </div>
              ) : null}
              <ImageUploadField
                label="Replace primary image"
                preview={featureImage.preview ?? project.featureImages.primary ?? null}
                fileName={featureImage.file?.name ?? (project.featureImages.primary ? 'Current image' : null)}
                onChange={handleFeatureImageChange}
              />
            </section>

            <section className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Project gallery</p>
                  <p className="text-sm text-gray-600">
                    Uploading new files will replace the gallery. Leave empty to keep the current set.
                  </p>
                </div>
              </div>
              <label className="block space-y-2 text-sm text-gray-700">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Upload new gallery</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => handleGalleryFilesChange(event.target.files)}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-brand-primary file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </label>

              {galleryUploads.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {galleryUploads.map((slot) => (
                    <div
                      key={slot.id}
                      className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-center"
                    >
                      <img src={slot.preview} alt="" className="h-28 w-full rounded-md object-cover" />
                      <p className="truncate text-xs text-gray-600">{slot.file.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-600">
                  Current gallery has {project.gallery.length} image{project.gallery.length === 1 ? '' : 's'}.
                </div>
              )}
            </section>
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              setForm({
                name: project.name,
                overview: project.overview ?? '',
                essential1: project.essentials?.[0] ?? '',
                essential2: project.essentials?.[1] ?? '',
                essential3: project.essentials?.[2] ?? '',
                category: project.category ?? '',
                launchWindow: project.launchWindow ?? '',
                deliveryWindow: project.deliveryWindow ?? '',
                builder: project.builder ?? '',
                consultants: project.consultants ?? '',
                financing: project.financing ?? '',
                progress: project.progress != null ? String(project.progress) : '',
              });
              handleFeatureImageChange(null);
              handleGalleryFilesChange(null);
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


