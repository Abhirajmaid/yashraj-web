'use client';

import type { ReactNode } from 'react';
import { FormEvent, useMemo, useRef, useState } from 'react';

type ProjectStatus = 'draft' | 'active' | 'completed';

type ProjectRow = {
  id: string;
  name: string;
  status: ProjectStatus;
  category: string;
  segment: string;
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
  gallery: string[];
  overview: string;
};

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

const seedRows: ProjectRow[] = [
  {
    id: 'yr-1001',
    name: 'Aurora Skyline Residences',
    status: 'draft',
    category: 'Residential',
    segment: 'High-rise',
    price: '₹2.1 Cr onwards',
    inventory: 320,
    location: 'Sector 112, Mumbai',
    progress: 68,
    builder: 'Yashraj Constructions',
    consultants: 'Arclight Studio • GridStruct',
    launchWindow: 'Aug 2025',
    deliveryWindow: 'Q4 2027',
    financing: '20:20:20 Flex plan • Partner banks aligned',
    highlights: 'Sky lounge • EV parking • Retail concourse • Smart concierge',
    heroImage:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
    ],
    overview:
      'Connected twin towers overlooking the eastern freeway. Focused on transit professionals with premium club access.',
  },
  {
    id: 'yr-1002',
    name: 'Harbor Promenade Villas',
    status: 'active',
    category: 'Residential',
    segment: 'Waterfront villas',
    price: '₹5.4 Cr onwards',
    inventory: 48,
    location: 'Palm Beach Road, Navi Mumbai',
    progress: 34,
    builder: 'Yashraj Signature Homes',
    consultants: 'Studio Sangraha • GreenHive',
    launchWindow: 'Jan 2026',
    deliveryWindow: 'Q2 2028',
    financing: '15:70:15 milestone plan • Luxe alliance benefits',
    highlights: 'Private marina • Aqua clubhouse • Spa pavilions',
    heroImage:
      'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    ],
    overview:
      'Limited series waterfront community with hospitality-grade services and curated coastal landscaping.',
  },
  {
    id: 'yr-1003',
    name: 'Northern Ridge Viaduct',
    status: 'draft',
    category: 'Commercial',
    segment: 'Transit hub',
    price: '₹890 Cr (capex)',
    inventory: 12,
    location: 'Uttarakhand logistics corridor',
    progress: 92,
    builder: 'Yashraj InfraWorks',
    consultants: 'GridStruct • Horizon Mobility',
    launchWindow: 'Apr 2025',
    deliveryWindow: 'Q1 2026',
    financing: 'PPP alignment confirmed • Central grant locked',
    highlights: 'Seismic retrofits • Multi-modal decks • Retail pockets',
    heroImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=70',
    gallery: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=70',
    ],
    overview:
      'Signature viaduct connecting northern freight with passenger lines, built for extreme terrain resilience.',
  },
];

const statusLabels: Record<ProjectStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  completed: 'Completed',
};

const statusTone: Record<ProjectStatus, string> = {
  draft: 'bg-yellow-900/50 text-yellow-200 border-yellow-700/50',
  active: 'bg-green-900/40 text-green-200 border-green-700/40',
  completed: 'bg-blue-900/40 text-blue-200 border-blue-700/40',
};

function normaliseText(text: string) {
  return text.toLowerCase().trim();
}

export default function AdminProjectsPage() {
  const [rows, setRows] = useState<ProjectRow[]>(seedRows);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ProjectStatus>('all');
  const [segmentFilter, setSegmentFilter] = useState<'all' | string>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const idCounter = useRef(
    seedRows.reduce((max, row) => Math.max(max, Number.parseInt(row.id.split('-')[1] ?? '0', 10)), 0)
  );

  const segments = useMemo(() => {
    const pool = new Set(rows.map((row) => row.segment));
    return Array.from(pool).sort();
  }, [rows]);

  const filteredRows = useMemo(() => {
    const query = normaliseText(searchTerm);
    return rows.filter((row) => {
      const matchesSearch =
        !query ||
        normaliseText(row.id).includes(query) ||
        normaliseText(row.name).includes(query) ||
        normaliseText(row.location).includes(query);

      const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
      const matchesSegment = segmentFilter === 'all' || row.segment === segmentFilter;

      return matchesSearch && matchesStatus && matchesSegment;
    });
  }, [rows, searchTerm, segmentFilter, statusFilter]);

  const editingHeadline = editingId ? 'Update Project' : 'Create Project';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const gallery = form.gallery
      .split('\n')
      .map((entry) => entry.trim())
      .filter(Boolean);

    if (editingId) {
      setRows((current) =>
        current.map((row) =>
          row.id === editingId
            ? {
                ...row,
                ...form,
                gallery,
              }
            : row
        )
      );
    } else {
      idCounter.current += 1;
      const nextId = `yr-${idCounter.current.toString().padStart(4, '0')}`;
      const nextRow: ProjectRow = {
        id: nextId,
        ...form,
        gallery,
      };
      setRows((current) => [nextRow, ...current]);
    }

    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const row = rows.find((item) => item.id === id);
    if (!row) return;

    setEditingId(id);
    setForm({
      ...row,
      gallery: row.gallery.join('\n'),
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setRows((current) => current.filter((row) => row.id !== id));
    if (editingId === id) {
      resetForm();
      setShowForm(false);
    }
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const selectedProject = rows.find((row) => row.id === selectedId);

  return (
    <div className="space-y-8 text-white">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Projects</h1>
          <p className="text-sm text-white/60">
            Track inventory, pricing, and rollout plans across the real estate portfolio.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="mt-4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm shadow-black/40 transition hover:bg-white/90 sm:mt-0"
        >
          + Add project
        </button>
      </header>

      <div className="rounded-lg border border-white/10 bg-[#111111] p-4 shadow-sm shadow-black/40">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by project name, ID, or location…"
            className="w-full rounded-md border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none sm:max-w-md"
          />
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
              className="rounded-md border border-white/10 bg-[#0b0b0b] px-3 py-2 text-xs uppercase tracking-wide text-white/70 focus:border-white/40 focus:outline-none"
            >
              <option value="all">All status</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={segmentFilter}
              onChange={(event) =>
                setSegmentFilter(
                  event.target.value === 'all' ? 'all' : (event.target.value as string)
                )
              }
              className="rounded-md border border-white/10 bg-[#0b0b0b] px-3 py-2 text-xs uppercase tracking-wide text-white/70 focus:border-white/40 focus:outline-none"
            >
              <option value="all">All segments</option>
              {segments.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-md border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-black/40 text-xs uppercase tracking-wide text-white/40">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Project ID</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Price</th>
                <th className="px-4 py-3 text-left font-medium">Inventory</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {filteredRows.map((row) => (
                <tr key={row.id} className="bg-black/20 hover:bg-black/30">
                  <td className="px-4 py-3 font-medium text-white">{row.id}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3 text-white/60">{row.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusTone[row.status]}`}
                    >
                      {statusLabels[row.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">{row.price}</td>
                  <td className="px-4 py-3">{row.inventory}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedId(row.id)}
                        className="rounded-md bg-blue-900/40 px-3 py-1 text-xs font-medium text-blue-100 transition hover:bg-blue-800/40"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(row.id)}
                        className="rounded-md bg-yellow-900/50 px-3 py-1 text-xs font-medium text-yellow-100 transition hover:bg-yellow-800/50"
                      >
                        Modify
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="rounded-md bg-red-900/40 px-3 py-1 text-xs font-medium text-red-100 transition hover:bg-red-800/40"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-white/40">
          Showing {filteredRows.length} of {rows.length} projects
        </p>
      </div>

      {selectedProject ? (
        <section className="rounded-lg border border-white/10 bg-[#111111] p-6 shadow-sm shadow-black/40">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">{selectedProject.name}</h2>
              <p className="text-xs uppercase tracking-wide text-white/40">
                {selectedProject.location}
              </p>
            </div>
            <span className="text-xs text-white/50">Progress {selectedProject.progress}%</span>
          </header>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2 text-sm text-white/70">
              <p>
                <span className="text-white/40">Builder:</span> {selectedProject.builder}
              </p>
              <p>
                <span className="text-white/40">Consultants:</span> {selectedProject.consultants}
              </p>
              <p>
                <span className="text-white/40">Launch:</span> {selectedProject.launchWindow}
              </p>
              <p>
                <span className="text-white/40">Delivery:</span> {selectedProject.deliveryWindow}
              </p>
            </div>
            <div className="space-y-2 text-sm text-white/70">
              <p>
                <span className="text-white/40">Financing:</span> {selectedProject.financing}
              </p>
              <p>
                <span className="text-white/40">Highlights:</span> {selectedProject.highlights}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-white/70">{selectedProject.overview}</p>
        </section>
      ) : null}

      {showForm ? (
        <section className="space-y-6 rounded-lg border border-white/10 bg-[#111111] p-6 shadow-sm shadow-black/40">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">{editingHeadline}</h2>
              <p className="text-xs uppercase tracking-wide text-white/40">
                Provide the details below to {editingId ? 'update' : 'publish'} a project entry.
              </p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="rounded-md border border-white/20 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-white hover:text-white"
            >
              Cancel
            </button>
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
                    onChange={(value) =>
                      setForm((current) => ({ ...current, launchWindow: value }))
                    }
                    placeholder="Q3 2025"
                  />
                  <Field
                    label="Delivery window"
                    value={form.deliveryWindow}
                    onChange={(value) =>
                      setForm((current) => ({ ...current, deliveryWindow: value }))
                    }
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

              <Card
                title="Visual Assets"
                description="Primary hero image and supporting gallery references."
              >
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
                onClick={resetForm}
                className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/60 transition hover:border-white hover:text-white"
              >
                Clear form
              </button>
              <button
                type="submit"
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm shadow-black/40 transition hover:bg-white/90"
              >
                {editingId ? 'Save changes' : 'Create project'}
              </button>
            </div>
          </form>
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

