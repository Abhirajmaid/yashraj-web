'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createProjectRecord } from '@/lib/projectsRepository';
import { ProjectRecord } from '@/types/project';
import { Card, Field, ImageUploadField, TextAreaField } from '@/components/admin/ProjectFormFields';

type ProjectForm = {
  name: string;
  overview: string;
  essential1: string;
  essential2: string;
  essential3: string;
};

type ImageSlot = {
  id: string;
  label: string;
  helper?: string;
  preview: string | null;
  fileName: string | null;
  file: File | null;
  required?: boolean;
  storageKey?: 'primary' | 'lifestyle' | 'city';
};

type SubmittedMediaState = {
  feature: ImageSlot[];
  gallery: ImageSlot[];
};

const emptyForm: ProjectForm = {
  name: '',
  overview: '',
  essential1: '',
  essential2: '',
  essential3: '',
};

const featureImageTemplate: ImageSlot[] = [
  {
    id: 'feature-primary',
    label: 'Primary showcase image',
    helper: 'Large hero frame on the left',
    preview: null,
    fileName: null,
    file: null,
    required: false,
    storageKey: 'primary',
  },
];

const createFeatureSlots = () => featureImageTemplate.map((slot) => ({ ...slot }));
const makeLocalId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().slice(0, 6)
    : Math.random().toString(36).slice(2, 8);

const createGallerySlot = (index: number): ImageSlot => ({
  id: `gallery-${index}-${makeLocalId()}`,
  label: `Gallery image ${index}`,
  helper: 'Appears inside the View Gallery modal',
  preview: null,
  fileName: null,
  file: null,
});

export default function CreateNewProjectPage() {
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [featureImages, setFeatureImages] = useState<ImageSlot[]>(() => createFeatureSlots());
  const [galleryImages, setGalleryImages] = useState<ImageSlot[]>([]);
  const [submittedProject, setSubmittedProject] = useState<ProjectRecord | null>(null);
  const [submittedMedia, setSubmittedMedia] = useState<SubmittedMediaState | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateImageSlot = (
    slotId: string,
    file: File | null,
    setter: React.Dispatch<React.SetStateAction<ImageSlot[]>>
  ) => {
    setter((current) =>
      current.map((slot) => {
        if (slot.id !== slotId) {
          return slot;
        }

        if (slot.preview && slot.file) {
          URL.revokeObjectURL(slot.preview);
        }

        if (!file) {
          return { ...slot, preview: null, fileName: null, file: null };
        }

        return {
          ...slot,
          preview: URL.createObjectURL(file),
          fileName: file.name,
          file,
        };
      })
    );
  };

  const handleFeatureImageChange = (slotId: string, file: File | null) => {
    updateImageSlot(slotId, file, setFeatureImages);
  };

  const handleGalleryFilesChange = (files: FileList | null) => {
    setGalleryImages((current) => {
      // Clean up existing previews
      current.forEach((slot) => {
        if (slot.preview && slot.file) {
          URL.revokeObjectURL(slot.preview);
        }
      });

      if (!files || files.length === 0) {
        return [];
      }

      const next: ImageSlot[] = [];
      Array.from(files).forEach((file, index) => {
        next.push({
          id: `gallery-${index}-${makeLocalId()}`,
          label: `Gallery image ${index + 1}`,
          helper: 'Appears inside the View Gallery modal',
          preview: URL.createObjectURL(file),
          fileName: file.name,
          file,
        });
      });

      return next;
    });
  };

  const resetImages = () => {
    featureImages.forEach((slot) => {
      if (slot.preview && slot.file) {
        URL.revokeObjectURL(slot.preview);
      }
    });
    galleryImages.forEach((slot) => {
      if (slot.preview && slot.file) {
        URL.revokeObjectURL(slot.preview);
      }
    });
    setFeatureImages(createFeatureSlots());
    setGalleryImages([]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) {
      return;
    }

    setFormError(null);
    setSuccessMessage(null);

    // Validation
    if (!form.name.trim()) {
      setFormError('Project name is required.');
      return;
    }

    const essentialsList = [form.essential1, form.essential2, form.essential3]
      .map((e) => e.trim())
      .filter(Boolean);

    const featureFiles = featureImages.reduce<Partial<Record<'primary' | 'lifestyle' | 'city', File>>>(
      (acc, slot) => {
        if (slot.storageKey && slot.file) {
          acc[slot.storageKey] = slot.file;
        }
        return acc;
      },
      {}
    );

    const galleryFiles = galleryImages
      .map((slot) => slot.file)
      .filter((file): file is File => Boolean(file));

    setIsSaving(true);
    setFormError(null);
    setSuccessMessage(null);

    // Create a timeout promise to prevent infinite loading
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Save operation timed out after 2 minutes. Please check your internet connection and try again.'));
      }, 120000); // 2 minutes timeout
    });

    try {
      console.log('Starting project save...', { projectName: form.name });
      
      // Race between the actual save and timeout
      const savedProject = await Promise.race([
        createProjectRecord({
          name: form.name.trim(),
          overview: form.overview.trim(),
          essentials: essentialsList,
          featureFiles,
          galleryFiles,
        }),
        timeoutPromise,
      ]);

      console.log('Project saved successfully!', { projectId: savedProject.id, projectName: savedProject.name });

      setSubmittedProject(savedProject);
      setSubmittedMedia({
        feature: [
          {
            ...featureImageTemplate[0],
            id: 'saved-primary',
            preview: savedProject.featureImages.primary,
            fileName: 'Primary feature',
            file: null,
          },
          {
            ...featureImageTemplate[1],
            id: 'saved-lifestyle',
            preview: savedProject.featureImages.lifestyle,
            fileName: 'Lifestyle feature',
            file: null,
          },
          {
            ...featureImageTemplate[2],
            id: 'saved-city',
            preview: savedProject.featureImages.city,
            fileName: 'City feature',
            file: null,
          },
        ],
        gallery: savedProject.gallery.map((url, index) => ({
          id: `saved-gallery-${index}`,
          label: `Gallery image ${index + 1}`,
          preview: url,
          fileName: `Gallery ${index + 1}`,
          helper: '',
          file: null,
        })),
      });
      setSuccessMessage(`Project "${savedProject.name}" saved successfully! It should now appear on the public projects page.`);
      setIsGalleryOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong while saving the project.';
      setFormError(errorMessage);
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      // Always reset saving state, even if there was an error
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setForm(emptyForm);
    setSubmittedProject(null);
    setSubmittedMedia(null);
    setSuccessMessage(null);
    setFormError(null);
    setIsGalleryOpen(false);
    resetImages();
  };

  return (
    <div className="space-y-10 text-white">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Create project</p>
          <h1 className="text-3xl font-semibold text-white">New project entry</h1>
          <p className="text-sm text-white/60">
            Add project details and images to publish in the live showcase.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-white hover:text-white"
          >
            ← Back to list
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-white hover:text-white"
          >
            Reset form
          </button>
        </div>
      </header>

      {formError ? (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {formError}
        </p>
      ) : null}
      {successMessage ? (
        <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </p>
      ) : null}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card title="Project Information" description="Basic project details displayed on the website.">
              <Field
              label="Project Name"
                value={form.name}
                onChange={(value) => setForm((current) => ({ ...current, name: value }))}
              placeholder="Urban retreat in Golden Gate Park"
                required
              />
            <TextAreaField
              label="Overview (Single line description)"
              value={form.overview}
              onChange={(value) => setForm((current) => ({ ...current, overview: value }))}
              placeholder="Floor-to-ceiling glazing frames uninterrupted park vistas. Configurable conference suites support hybrid teams and live demos."
              rows={2}
            />
          </Card>

          <Card title="Project Essentials" description="Three key features displayed as bullet points.">
            <TextAreaField
              label="Essential 1"
              value={form.essential1}
              onChange={(value) => setForm((current) => ({ ...current, essential1: value }))}
              placeholder="6,500 sq.ft workplace with passive cooling, operable skylights, and rainwater-fed biowalls for humidity control."
              rows={2}
            />
            <TextAreaField
              label="Essential 2"
              value={form.essential2}
              onChange={(value) => setForm((current) => ({ ...current, essential2: value }))}
              placeholder="Immersive innovation forum with retractable seating, acoustic fins, and integrated AV for investor previews and press launches."
              rows={2}
            />
            <TextAreaField
              label="Essential 3"
              value={form.essential3}
              onChange={(value) => setForm((current) => ({ ...current, essential3: value }))}
              placeholder="Material palette couples reclaimed white oak, recycled terrazzo, and low-iron glass connected to a campus-wide energy dashboard."
              rows={2}
            />
          </Card>

          <Card
            title="Visual Assets"
            description="Upload a primary hero image and gallery images."
          >
            <div className="space-y-6">
              <section>
                <p className="text-xs uppercase tracking-wide text-white/40">Primary feature image</p>
                <div className="mt-3 grid gap-4 lg:grid-cols-1">
                  {featureImages.map((slot) => (
                    <ImageUploadField
                      key={slot.id}
                      label={slot.label}
                      helper={slot.helper}
                      preview={slot.preview}
                      fileName={slot.fileName}
                      required={slot.required}
                      onChange={(file) => handleFeatureImageChange(slot.id, file)}
                    />
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/40">Project gallery</p>
                    <p className="text-sm text-white/70">
                      Add lifestyle, amenity, or work-in-progress images visitors can browse.
                    </p>
                  </div>
                </div>

                <label className="block space-y-2 text-sm text-white/80">
                  <span className="text-xs uppercase tracking-wide text-white/40">Gallery images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => handleGalleryFilesChange(event.target.files)}
                    className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-2 text-xs text-white file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-2 file:text-xs file:font-semibold file:text-black focus:border-white/40 focus:outline-none"
                  />
                </label>

                {galleryImages.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    {galleryImages.map((slot) => (
                      <div
                        key={slot.id}
                        className="space-y-2 rounded-lg border border-white/10 bg-black/30 p-3"
                      >
                        <div className="overflow-hidden rounded-md border border-white/10 bg-black/30 text-center">
                          {slot.preview ? (
                            <img
                              src={slot.preview}
                              alt={slot.fileName ?? slot.label}
                              className="h-28 w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-28 items-center justify-center text-xs uppercase tracking-wide text-white/30">
                              No image
                            </div>
                          )}
                        </div>
                        {slot.fileName ? (
                          <p className="truncate text-xs text-white/60">{slot.fileName}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-white hover:text-white"
          >
            Clear form
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm shadow-black/40 transition hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {submittedProject && submittedMedia ? (
        <section className="space-y-4 rounded-xl border border-white/10 bg-[#111111] p-6 shadow-sm shadow-black/60">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Project saved successfully</h2>
              <p className="text-xs uppercase tracking-wide text-white/40">
                The project has been saved to Firebase and is now visible on the public projects page.
              </p>
            </div>
            <Link
              href="/admin/projects"
              className="inline-flex items-center rounded-md bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
            >
              Go to project list
            </Link>
          </header>

          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              {submittedMedia.feature[0]?.preview ? (
                <img
                  src={submittedMedia.feature[0].preview as string}
                  alt={submittedMedia.feature[0].fileName ?? 'Primary project image'}
                  className="h-full w-full max-h-[360px] object-cover"
                />
              ) : (
                <div className="flex h-[360px] items-center justify-center text-sm text-white/30">
                  Primary feature image
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {submittedMedia.feature.slice(1, 3).map((slot) => (
                  <div
                    key={slot.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                  >
                    {slot.preview ? (
                      <img
                        src={slot.preview}
                        alt={slot.fileName ?? slot.label}
                        className="h-40 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-40 items-center justify-center text-xs text-white/30">
                        {slot.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2 rounded-2xl bg-black/30 p-4">
                <p className="text-xs uppercase tracking-wide text-white/40">Project essentials</p>
                <p className="text-sm font-semibold text-white/90">
                  {submittedProject.statement || 'Statement pending.'}
                </p>
                <p className="text-sm text-white/60">
                  {submittedProject.description || 'Description pending.'}
                </p>
                {submittedProject.essentials.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-white/70">
                    {submittedProject.essentials.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                <button
                  type="button"
                  onClick={() => setIsGalleryOpen((previous) => !previous)}
                  className="mt-3 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-black transition hover:bg-white/90"
                  disabled={submittedMedia.gallery.length === 0}
                >
                  {isGalleryOpen ? 'Hide gallery' : 'View gallery'}
                </button>
              </div>
            </div>
          </div>

          {isGalleryOpen && submittedMedia.gallery.length > 0 ? (
            <div className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-wide text-white/40">
                {submittedMedia.gallery.length} gallery image
                {submittedMedia.gallery.length > 1 ? 's' : ''}
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {submittedMedia.gallery.map((slot) => (
                  <div
                    key={slot.id}
                    className="overflow-hidden rounded-xl border border-white/10 bg-black/10"
                  >
                    {slot.preview ? (
                      <img
                        src={slot.preview}
                        alt={slot.fileName ?? slot.label}
                        className="h-32 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-32 items-center justify-center text-xs text-white/30">
                        Pending upload
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
