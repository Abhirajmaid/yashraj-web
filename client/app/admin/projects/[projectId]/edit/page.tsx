'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { getProjectRecord, updateProjectRecord } from '@/lib/projectsRepository';
import { ProjectRecord } from '@/types/project';
import { Card, Field, ImageUploadField, TextAreaField } from '@/components/admin/ProjectFormFields';

type PageProps = {
  params: { projectId: string };
};

type ProjectForm = {
  name: string;
  overview: string;
  essential1: string;
  essential2: string;
  essential3: string;
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
};

const makeLocalId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().slice(0, 6)
    : Math.random().toString(36).slice(2, 8);

export default function EditProjectPage({ params }: PageProps) {
  const projectId = params.projectId;

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

    try {
      const updated = await updateProjectRecord(project.id, {
        name: form.name.trim(),
        overview: form.overview.trim(),
        essentials: essentialsList,
        featureFiles: featureImage.file ? featureFiles : undefined,
        galleryFiles: galleryFiles.length ? galleryFiles : undefined,
        currentFeatureImages: project.featureImages,
        currentGallery: project.gallery,
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
    return <p className="text-sm text-white/60">Loading project for editing…</p>;
  }

  if (error && !project) {
    return (
      <div className="space-y-4 text-white">
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
        <Link
          href="/admin/projects"
          className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-white hover:text-white"
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
    <div className="space-y-8 text-white">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Edit project</p>
          <h1 className="text-3xl font-semibold text-white">{project.name}</h1>
          <p className="text-sm text-white/60">Update details, copy, or media assets.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin/projects/${project.id}`}
            className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-white hover:text-white"
          >
            ← View details
          </Link>
          <Link
            href="/admin/projects"
            className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-white hover:text-white"
          >
            Back to list
          </Link>
        </div>
      </header>

      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}
      {successMessage ? (
        <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          {successMessage}
        </p>
      ) : null}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card title="Project Information" description="Update the core details visible on the website.">
          <Field
            label="Project Name"
            value={form.name}
            onChange={(value) => setForm((current) => ({ ...current, name: value }))}
            placeholder="Urban retreat in Golden Gate Park"
            required
          />
          <TextAreaField
            label="Overview (single line)"
            value={form.overview}
            onChange={(value) => setForm((current) => ({ ...current, overview: value }))}
            rows={2}
            placeholder="Short description that appears on listing cards."
          />
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
              <p className="text-xs uppercase tracking-wide text-white/40">Primary feature image</p>
              {project.featureImages.primary ? (
                <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-white/60">
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
                  <p className="text-xs uppercase tracking-wide text-white/40">Project gallery</p>
                  <p className="text-sm text-white/70">
                    Uploading new files will replace the gallery. Leave empty to keep the current set.
                  </p>
                </div>
              </div>
              <label className="block space-y-2 text-sm text-white/80">
                <span className="text-xs uppercase tracking-wide text-white/40">Upload new gallery</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => handleGalleryFilesChange(event.target.files)}
                  className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-2 text-xs text-white file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-2 file:text-xs file:font-semibold file:text-black focus:border-white/40 focus:outline-none"
                />
              </label>

              {galleryUploads.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {galleryUploads.map((slot) => (
                    <div
                      key={slot.id}
                      className="space-y-2 rounded-lg border border-white/10 bg-black/30 p-3 text-center"
                    >
                      <img src={slot.preview} alt="" className="h-28 w-full rounded-md object-cover" />
                      <p className="truncate text-xs text-white/60">{slot.file.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-white/60">
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
              });
              handleFeatureImageChange(null);
              handleGalleryFilesChange(null);
              setSuccessMessage(null);
              setError(null);
            }}
            className="inline-flex items-center justify-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-white hover:text-white"
          >
            Reset changes
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm shadow-black/40 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? 'Saving…' : 'Save updates'}
          </button>
        </div>
      </form>
    </div>
  );
}


