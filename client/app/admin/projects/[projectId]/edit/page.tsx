'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, type FormEvent, useEffect, useState } from 'react';
import { getProjectRecord, updateProjectRecord } from '@/lib/projectsRepository';
import { ProjectRecord } from '@/types/project';
import { Card, Field, ImageUploadField, SelectField, TextAreaField } from '@/components/admin/ProjectFormFields';

const MAX_GALLERY_IMAGES = 100; // No practical limit; all shown on frontend

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
  location: string;
  category: string;
  overview: string;
};

type GallerySlot = {
  id: string;
  preview: string;
  file: File;
};

const emptyForm: ProjectForm = {
  name: '',
  location: '',
  category: '',
  overview: '',
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
          location: record.location ?? '',
          category: record.category ?? '',
          overview: record.overview ?? '',
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

    const filesArray = Array.from(files).slice(0, MAX_GALLERY_IMAGES);
    const next: GallerySlot[] = filesArray.map((file, index) => ({
      id: `gallery-${index}-${makeLocalId()}`,
      file,
      preview: URL.createObjectURL(file),
    }));
    setGalleryUploads(next);
  };

  const handleRemoveFeatureImage = (key: 'primary' | 'lifestyle' | 'city') => {
    // Clear any selected file preview and remove the current URL from project state
    if (featureImage.preview) {
      URL.revokeObjectURL(featureImage.preview);
    }
    setFeatureImage({ file: null, preview: null });
    setProject((current) => {
      if (!current) return current;
      return {
        ...current,
        featureImages: { ...current.featureImages, [key]: '' },
      };
    });
  };

  const handleRemoveGalleryImageAt = (index: number) => {
    setProject((current) => {
      if (!current) return current;
      const nextGallery = [...current.gallery];
      nextGallery.splice(index, 1);
      return { ...current, gallery: nextGallery };
    });
  };
 
  const handleRemoveGalleryUploadById = (id: string) => {
    setGalleryUploads((current) => {
      const slot = current.find((s) => s.id === id);
      if (slot) URL.revokeObjectURL(slot.preview);
      return current.filter((s) => s.id !== id);
    });
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

    const featureFiles: Partial<Record<'primary' | 'lifestyle' | 'city', File>> = {};
    if (featureImage.file) {
      featureFiles.primary = featureImage.file;
    }

    const galleryFiles = galleryUploads.map((slot) => slot.file);

    try {
      const updated = await updateProjectRecord(project.id, {
        name: form.name.trim(),
        overview: form.overview.trim(),
        essentials: [],
        featureFiles: featureImage.file ? featureFiles : undefined,
        galleryFiles: galleryFiles.length ? galleryFiles : undefined,
        currentFeatureImages: project.featureImages,
        currentGallery: project.gallery,
        category: form.category || undefined,
        location: form.location.trim() || undefined,
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
          <Field
            label="Project Location"
            value={form.location}
            onChange={(value) => setForm((current) => ({ ...current, location: value }))}
            placeholder="e.g. Surat Industrial Corridor"
          />
          <SelectField
            label="Category"
            value={form.category}
            options={CATEGORY_OPTIONS.filter((o) => o.value !== '')}
            placeholder="—"
            onChange={(value) => setForm((current) => ({ ...current, category: value }))}
          />
          <TextAreaField
            label="Overview / Description"
            value={form.overview}
            onChange={(value) => setForm((current) => ({ ...current, overview: value }))}
            rows={3}
            placeholder="Short description that appears on listing cards and project page."
          />
        </Card>

        <Card
          title="Images"
          description="Add more gallery images as needed; all are shown on the project detail page. Leave blank to keep existing."
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
                onRemove={() => handleRemoveFeatureImage('primary')}
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
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Upload gallery (no limit)</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => handleGalleryFilesChange(event.target.files)}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-brand-primary file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </label>

              {/* Combined thumbnail grid: feature images, existing gallery, and newly selected uploads */}
              <div className="grid gap-4 md:grid-cols-3">
                {/* Feature images (primary / lifestyle / city) */}
                {(['primary', 'lifestyle', 'city'] as const).map((key) => {
                  const previewUrl =
                    featureImage.preview && key === 'primary'
                      ? featureImage.preview
                      : project.featureImages?.[key] ?? '';
                  return previewUrl ? (
                    <div key={`feature-${key}`} className="relative space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
                      <img src={previewUrl} alt={`${key} feature`} className="h-28 w-full rounded-md object-cover" />
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="truncate text-xs text-gray-600">{key}</p>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeatureImage(key)}
                          className="text-xs font-semibold text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : null;
                })}

                {/* Existing gallery images */}
                {project.gallery.map((url, idx) => (
                  <div key={`gallery-${url}-${idx}`} className="relative space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
                    <img src={url} alt={`gallery-${idx}`} className="h-28 w-full rounded-md object-cover" />
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-gray-600">Current image</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImageAt(idx)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {/* Newly selected uploads previews */}
                {galleryUploads.map((slot) => (
                  <div key={slot.id} className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
                    <img src={slot.preview} alt={slot.file.name} className="h-28 w-full rounded-md object-cover" />
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-gray-600">{slot.file.name}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryUploadById(slot.id)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {/* If nothing to show */}
                {project.featureImages?.primary === '' &&
                project.featureImages?.lifestyle === '' &&
                project.featureImages?.city === '' &&
                project.gallery.length === 0 &&
                galleryUploads.length === 0 ? (
                  <div className="text-xs text-gray-600">Current gallery is empty.</div>
                ) : null}
              </div>
            </section>
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


