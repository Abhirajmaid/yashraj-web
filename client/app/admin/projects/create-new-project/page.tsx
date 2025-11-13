'use client';

import Link from 'next/link';
import { FormEvent, ReactNode, useMemo, useState } from 'react';

type ProjectStatus = 'draft' | 'active' | 'completed';

type ProjectForm = {
  name: string;
  category: string;
  segment: string;
  status: ProjectStatus;
  price: string;
  inventory: number;
  location: string;
  progress: number;
  builder: string;
  consultants: string;
  launchWindow: string;
  deliveryWindow: string;
  financing: string;
  highlights: string;
  heroImage: string;
  gallery: string;
  overview: string;
};

const emptyForm: ProjectForm = {
  name: '',
  category: '',
  segment: '',
  status: 'draft',
  price: '',
  inventory: 0,
  location: '',
  progress: 0,
  builder: '',
  consultants: '',
  launchWindow: '',
  deliveryWindow: '',
  financing: '',
  highlights: '',
  heroImage: '',
  gallery: '',
  overview: '',
};

export default function CreateNewProjectPage() {
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [submittedProject, setSubmittedProject] = useState<ProjectForm | null>(null);

  const galleryPreview = useMemo(
    () =>
      form.gallery
        .split('\n')
        .map((entry) => entry.trim())
        .filter(Boolean),
    [form.gallery]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedProject(form);
  };

  const handleReset = () => {
    setForm(emptyForm);
    setSubmittedProject(null);
  };

  return (
    <div className="space-y-10 text-white">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Create project</p>
          <h1 className="text-3xl font-semibold text-white">New project entry</h1>
          <p className="text-sm text-white/60">
            Build a complete submission across identity, commercial data, and launch readiness.
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

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Basic Information" description="Define identity and categorisation.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Project name"
                value={form.name}
                onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                placeholder="Aurora Skyline Residences"
                required
              />
              <Field
                label="Category"
                value={form.category}
                onChange={(value) => setForm((current) => ({ ...current, category: value }))}
                placeholder="Residential / Commercial"
                required
              />
              <Field
                label="Segment"
                value={form.segment}
                onChange={(value) => setForm((current) => ({ ...current, segment: value }))}
                placeholder="High-rise / Villas / Transit"
              />
              <SelectField
                label="Status"
                value={form.status}
                options={[
                  { label: 'Draft', value: 'draft' },
                  { label: 'Active', value: 'active' },
                  { label: 'Completed', value: 'completed' },
                ]}
                onChange={(value) =>
                  setForm((current) => ({ ...current, status: value as ProjectStatus }))
                }
              />
            </div>
          </Card>

          <Card title="Pricing & Inventory" description="Commercial snapshot and stock.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Headline pricing"
                value={form.price}
                onChange={(value) => setForm((current) => ({ ...current, price: value }))}
                placeholder="₹2.1 Cr onwards"
              />
              <NumberField
                label="Inventory count"
                value={form.inventory}
                onChange={(value) => setForm((current) => ({ ...current, inventory: value }))}
                min={0}
              />
              <NumberField
                label="Progress (%)"
                value={form.progress}
                onChange={(value) => setForm((current) => ({ ...current, progress: value }))}
                min={0}
                max={100}
                step={1}
              />
              <Field
                label="Financing / schemes"
                value={form.financing}
                onChange={(value) => setForm((current) => ({ ...current, financing: value }))}
                placeholder="Payment plans, alliances, offers"
              />
            </div>
          </Card>

          <Card title="Location & Team" description="Where it sits and who is driving it.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Location"
                value={form.location}
                onChange={(value) => setForm((current) => ({ ...current, location: value }))}
                placeholder="City • Landmark"
                required
              />
              <Field
                label="Builder / developer"
                value={form.builder}
                onChange={(value) => setForm((current) => ({ ...current, builder: value }))}
                placeholder="Yashraj Constructions"
                required
              />
              <Field
                label="Consultants"
                value={form.consultants}
                onChange={(value) => setForm((current) => ({ ...current, consultants: value }))}
                placeholder="Architect • Structural • Landscape"
              />
              <Field
                label="Highlights"
                value={form.highlights}
                onChange={(value) => setForm((current) => ({ ...current, highlights: value }))}
                placeholder="Clubhouse • Waterfront promenade"
              />
            </div>
          </Card>

          <Card title="Timeline" description="Milestones for launch and handover.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Launch window"
                value={form.launchWindow}
                onChange={(value) => setForm((current) => ({ ...current, launchWindow: value }))}
                placeholder="Q3 2025"
              />
              <Field
                label="Delivery window"
                value={form.deliveryWindow}
                onChange={(value) => setForm((current) => ({ ...current, deliveryWindow: value }))}
                placeholder="Q4 2027"
              />
            </div>
            <TextAreaField
              label="Overview"
              value={form.overview}
              onChange={(value) => setForm((current) => ({ ...current, overview: value }))}
              placeholder="What defines the development, buyer focus, and promise."
              rows={4}
            />
          </Card>

          <Card title="Visual Assets" description="Primary hero image and supporting gallery references.">
            <Field
              label="Hero image URL"
              value={form.heroImage}
              onChange={(value) => setForm((current) => ({ ...current, heroImage: value }))}
              placeholder="https://"
            />
            <TextAreaField
              label="Gallery URLs (one per line)"
              value={form.gallery}
              onChange={(value) => setForm((current) => ({ ...current, gallery: value }))}
              placeholder="https://cdn.example.com/render-01.jpg"
              rows={4}
            />
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
            className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm shadow-black/40 transition hover:bg-white/90"
          >
            Save draft
          </button>
        </div>
      </form>

      {submittedProject ? (
        <section className="space-y-4 rounded-xl border border-white/10 bg-[#111111] p-6 shadow-sm shadow-black/60">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Draft preview</h2>
              <p className="text-xs uppercase tracking-wide text-white/40">
                Data staged locally until integration with backend workflows.
              </p>
            </div>
            <Link
              href="/admin/projects"
              className="inline-flex items-center rounded-md bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
            >
              Go to project list
            </Link>
          </header>

          <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
            <div className="space-y-4">
              <div className="rounded-lg bg-black/30 p-4">
                <h3 className="text-sm font-semibold text-white">{submittedProject.name}</h3>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  {submittedProject.location || 'Location TBD'}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {submittedProject.overview || 'Overview pending.'}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <PreviewStat label="Category" value={submittedProject.category || '—'} />
                <PreviewStat label="Segment" value={submittedProject.segment || '—'} />
                <PreviewStat label="Price" value={submittedProject.price || '—'} />
                <PreviewStat label="Inventory" value={submittedProject.inventory.toString()} />
              </div>
            </div>

            <div className="space-y-4">
              <PreviewStat label="Builder" value={submittedProject.builder || '—'} />
              <PreviewStat label="Consultants" value={submittedProject.consultants || '—'} />
              <PreviewStat label="Financing" value={submittedProject.financing || '—'} />
              <PreviewStat label="Launch window" value={submittedProject.launchWindow || '—'} />
              <PreviewStat label="Delivery window" value={submittedProject.deliveryWindow || '—'} />
            </div>
          </div>

          {galleryPreview.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-white/40">Gallery references</p>
              <div className="grid gap-3 md:grid-cols-3">
                {galleryPreview.map((url) => (
                  <div
                    key={url}
                    className="overflow-hidden rounded-lg border border-white/10 bg-black/20 shadow-sm shadow-black/40"
                  >
                    <img src={url} alt="" className="h-36 w-full object-cover opacity-90" />
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

type FieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
};

function Field({ label, value, placeholder, onChange, required }: FieldProps) {
  return (
    <label className="block space-y-2 text-sm text-white/80">
      <span className="text-xs uppercase tracking-wide text-white/40">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
      />
    </label>
  );
}

type NumberFieldProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

function NumberField({ label, value, min, max, step, onChange }: NumberFieldProps) {
  return (
    <label className="block space-y-2 text-sm text-white/80">
      <span className="text-xs uppercase tracking-wide text-white/40">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
      />
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  rows?: number;
  placeholder?: string;
  onChange: (value: string) => void;
};

function TextAreaField({ label, value, rows = 3, placeholder, onChange }: TextAreaFieldProps) {
  return (
    <label className="block space-y-2 text-sm text-white/80">
      <span className="text-xs uppercase tracking-wide text-white/40">{label}</span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="block space-y-2 text-sm text-white/80">
      <span className="text-xs uppercase tracking-wide text-white/40">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-xs uppercase tracking-wide text-white focus:border-white/40 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#0b0b0b] text-white">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type CardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function Card({ title, description, children }: CardProps) {
  return (
    <div className="space-y-4 rounded-md border border-white/10 bg-black/30 p-4">
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-xs text-white/40">{description}</p>
      </div>
      {children}
    </div>
  );
}

type PreviewStatProps = {
  label: string;
  value: string;
};

function PreviewStat({ label, value }: PreviewStatProps) {
  return (
    <div className="space-y-2 rounded-lg bg-black/30 p-4 text-sm text-white/70">
      <span className="block text-xs uppercase tracking-wide text-white/40">{label}</span>
      <p className="text-white">{value}</p>
    </div>
  );
}


