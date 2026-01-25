'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createProjectRecord } from '@/lib/projectsRepository';
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
  category: '',
  launchWindow: '',
  deliveryWindow: '',
  builder: '',
  consultants: '',
  financing: '',
  progress: '',
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
          category: form.category || undefined,
          launchWindow: form.launchWindow.trim() || undefined,
          deliveryWindow: form.deliveryWindow.trim() || undefined,
          builder: form.builder.trim() || undefined,
          consultants: form.consultants.trim() || undefined,
          financing: form.financing.trim() || undefined,
          progress: progressNum ?? undefined,
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
    <div className="space-y-10 text-gray-900">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">Create project</p>
          <h1 className="text-3xl font-semibold text-gray-900">New project entry</h1>
          <p className="text-sm text-gray-500">
            Add project details and images to publish in the live showcase.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
          >
            ← Back to list
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
          >
            Reset form
          </button>
        </div>
      </header>

      {formError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </p>
      ) : null}
      {successMessage ? (
        <p className="rounded-lg border border-brand-primary/30 bg-brand-primary/10 px-4 py-3 text-sm text-brand-primary">
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
              placeholder="e.g. Airoli T-Junction Upgradation"
              required
            />
            <TextAreaField
              label="Overview (Single line description)"
              value={form.overview}
              onChange={(value) => setForm((current) => ({ ...current, overview: value }))}
              placeholder="Short description that appears on cards and the project overview."
              rows={2}
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
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Primary feature image</p>
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
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Project gallery</p>
                    <p className="text-sm text-gray-600">
                      Add lifestyle, amenity, or work-in-progress images visitors can browse.
                    </p>
                  </div>
                </div>

                <label className="block space-y-2 text-sm text-gray-700">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Gallery images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => handleGalleryFilesChange(event.target.files)}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-brand-primary file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </label>

                {galleryImages.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    {galleryImages.map((slot) => (
                      <div
                        key={slot.id}
                        className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3"
                      >
                        <div className="overflow-hidden rounded-md border border-gray-200 bg-white text-center">
                          {slot.preview ? (
                            <img
                              src={slot.preview}
                              alt={slot.fileName ?? slot.label}
                              className="h-28 w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-28 items-center justify-center text-xs uppercase tracking-wide text-gray-400">
                              No image
                            </div>
                          )}
                        </div>
                        {slot.fileName ? (
                          <p className="truncate text-xs text-gray-600">{slot.fileName}</p>
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

      {submittedProject && submittedMedia ? (
        <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Project saved successfully</h2>
              <p className="text-xs text-gray-500">
                The project has been saved to Firebase and is now visible on the public projects page.
              </p>
            </div>
            <Link
              href="/admin/projects"
              className="inline-flex items-center rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-primary/90"
            >
              Go to project list
            </Link>
          </header>

          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
              {submittedMedia.feature[0]?.preview ? (
                <img
                  src={submittedMedia.feature[0].preview as string}
                  alt={submittedMedia.feature[0].fileName ?? 'Primary project image'}
                  className="h-full w-full max-h-[360px] object-cover"
                />
              ) : (
                <div className="flex h-[360px] items-center justify-center text-sm text-gray-400">
                  Primary feature image
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {submittedMedia.feature.slice(1, 3).map((slot) => (
                  <div
                    key={slot.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
                  >
                    {slot.preview ? (
                      <img
                        src={slot.preview}
                        alt={slot.fileName ?? slot.label}
                        className="h-40 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-40 items-center justify-center text-xs text-gray-400">
                        {slot.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Project essentials</p>
                <p className="text-sm font-semibold text-gray-900">{submittedProject.name}</p>
                <p className="text-sm text-gray-600">{submittedProject.overview || 'Overview pending.'}</p>
                {submittedProject.essentials && submittedProject.essentials.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-gray-600">
                    {submittedProject.essentials.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                <button
                  type="button"
                  onClick={() => setIsGalleryOpen((previous) => !previous)}
                  className="mt-3 inline-flex items-center justify-center rounded-md bg-brand-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-primary/90 disabled:opacity-50"
                  disabled={submittedMedia.gallery.length === 0}
                >
                  {isGalleryOpen ? 'Hide gallery' : 'View gallery'}
                </button>
              </div>
            </div>
          </div>

          {isGalleryOpen && submittedMedia.gallery.length > 0 ? (
            <div className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {submittedMedia.gallery.length} gallery image
                {submittedMedia.gallery.length > 1 ? 's' : ''}
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {submittedMedia.gallery.map((slot) => (
                  <div
                    key={slot.id}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                  >
                    {slot.preview ? (
                      <img
                        src={slot.preview}
                        alt={slot.fileName ?? slot.label}
                        className="h-32 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-32 items-center justify-center text-xs text-gray-400">
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
