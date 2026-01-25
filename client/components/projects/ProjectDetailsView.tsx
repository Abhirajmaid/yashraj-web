'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { GalleryModal } from './GalleryModal';
import { useEnquiryModal } from '@/contexts/EnquiryModalContext';
import type { ProjectRecord } from '@/types/project';

type ProjectDetailsViewProps = {
  project: ProjectRecord;
};

export function ProjectDetailsView({ project }: ProjectDetailsViewProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { openModal } = useEnquiryModal();

  const {
    featureImages,
    name,
    essentials,
    gallery,
    overview,
    description,
    location,
    category,
    segment,
    price,
    inventory,
    statement,
    industries,
    highlights,
    launchWindow,
    deliveryWindow,
    builder,
    consultants,
    financing,
    progress,
    status,
  } = project;

  const essentialsList = essentials?.length ? essentials : ['—'];
  const overviewText = overview?.trim() || description?.trim();
  const statementText = (statement || highlights || '').trim() || '—';

  const statusBadge =
    status === 'completed'
      ? { label: 'Completed', cn: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' }
      : status === 'active'
        ? { label: 'In progress', cn: 'bg-sky-500/10 text-sky-700 border-sky-200' }
        : status === 'draft'
          ? { label: 'Coming soon', cn: 'bg-brand-gray-light text-brand-foreground/70 border-brand-gray-light' }
          : null;

  const galleryImages = [
    ...(featureImages?.primary ? [{ src: featureImages.primary, alt: `${name} primary` }] : []),
    ...(featureImages?.lifestyle ? [{ src: featureImages.lifestyle, alt: `${name} lifestyle` }] : []),
    ...(featureImages?.city ? [{ src: featureImages.city, alt: `${name} city` }] : []),
    ...(gallery ?? []).map((src, i) => ({ src, alt: `${name} gallery ${i + 1}` })),
  ];

  const openGallery = (index: number = 0) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const progressPct = progress != null ? Math.min(100, Math.max(0, progress)) : null;

  return (
    <>
      <article className="space-y-10 sm:space-y-14">
        {/* ----- 1. Back + Breadcrumb ----- */}
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-medium text-brand-foreground/60 transition hover:text-brand-primary"
          >
            <Icon icon="solar:arrow-left-linear" className="text-lg" />
            Projects
          </Link>
          <Icon icon="solar:alt-arrow-right-linear" className="text-brand-foreground/40" />
          <span className="font-medium text-brand-foreground line-clamp-1">{name || 'Untitled project'}</span>
        </nav>

        {/* ----- 2. Hero: Main image + overlay (title, location, status) + thumbnails ----- */}
        <section className="relative">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
            {/* Main image */}
            <div
              className={`group relative aspect-4/3 w-full overflow-hidden rounded-2xl lg:rounded-3xl lg:flex-[1_1_70%] ${galleryImages.length > 0 ? 'cursor-pointer' : ''}`}
              onClick={() => galleryImages.length > 0 && openGallery(0)}
              role={galleryImages.length > 0 ? 'button' : undefined}
              aria-label={galleryImages.length > 0 ? 'Open gallery' : undefined}
            >
              {featureImages?.primary ? (
                <>
                  <Image
                    src={featureImages.primary}
                    alt={name ? `${name} — hero` : 'Project hero'}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    priority
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-brand-dark/80 via-brand-dark/20 to-transparent"
                    aria-hidden
                  />
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-brand-gray-light/30 rounded-2xl lg:rounded-3xl border border-dashed border-brand-gray-light">
                  <Icon icon="solar:gallery-bold" className="text-4xl text-brand-gray" />
                  <span className="text-sm font-medium text-brand-foreground/50">Primary image coming soon</span>
                </div>
              )}
              {/* Overlay: status (top-right), title + location (bottom) */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 lg:p-6 pointer-events-none">
                {statusBadge && (
                  <div className="flex justify-end">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge.cn}`}
                    >
                      {statusBadge.label}
                    </span>
                  </div>
                )}
                <div className="mt-auto">
                  <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    {name || 'Untitled project'}
                  </h1>
                  <p className="mt-1.5 flex items-center gap-2 text-sm text-white/90">
                    <Icon icon="solar:map-point-bold" className="text-base shrink-0" />
                    <span>{location || '—'}</span>
                  </p>
                </div>
              </div>
              {featureImages?.primary && (
                <div
                  className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 pointer-events-auto"
                  aria-hidden
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-brand-dark">
                    <Icon icon="solar:gallery-bold" />
                    {galleryImages.length} image{galleryImages.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            {/* All images column: thumbnails fill height of left image, View all at bottom. No scrollbar. */}
            <div className="flex flex-col gap-3 lg:flex-[0_0_180px] lg:min-h-0">
              {/* Thumbnails: on mobile horizontal scroll; on desktop fill available height (match left), no scroll */}
              <div className="flex flex-row gap-3 overflow-x-auto pb-1 lg:flex-1 lg:min-h-0 lg:flex-col lg:overflow-hidden lg:gap-2">
                {galleryImages.length > 0 ? (
                  galleryImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => openGallery(i)}
                      className="relative aspect-4/3 h-24 min-w-[120px] shrink-0 overflow-hidden rounded-xl border-2 border-transparent transition hover:border-brand-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary lg:min-h-0 lg:min-w-0 lg:flex-1 lg:w-full lg:aspect-auto"
                    >
                      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 1024px) 120px, 180px" />
                    </button>
                  ))
                ) : (
                  <div className="flex aspect-4/3 min-w-[120px] shrink-0 items-center justify-center rounded-xl border border-dashed border-brand-gray-light bg-brand-gray-light/20 text-brand-foreground/40 lg:min-w-0 lg:w-full">
                    <span className="text-xs font-medium">Images coming soon</span>
                  </div>
                )}
              </div>
              {/* View All at end of column */}
              {galleryImages.length > 0 && (
                <button
                  type="button"
                  onClick={() => openGallery(0)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-primary py-2.5 text-sm font-medium text-brand-primary transition hover:bg-brand-primary hover:text-white shrink-0"
                >
                  <Icon icon="solar:gallery-bold" className="text-base" />
                  View all
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ----- 3. Enquire (above) + Project Essentials (full width below) ----- */}
        <section className="flex flex-col gap-6">
          <button
            onClick={openModal}
            className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-primary/90"
          >
            <Icon icon="mdi:email-outline" className="text-xl" />
            Enquire
          </button>
          <div className="w-full rounded-2xl border border-brand-gray-light/60 bg-white p-4 sm:p-5 lg:p-6">
            <h2 className="font-heading text-base font-semibold text-brand-dark">Project Essentials</h2>
            <ul className="mt-3 space-y-2 text-sm text-brand-foreground/80">
              {essentialsList.map((e, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-brand-primary mt-0.5">•</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ----- 4. Overview + Statement (2-col) ----- */}
        <section className="grid gap-6 lg:grid-cols-[1fr,1fr] lg:gap-10">
          <div className="rounded-2xl border border-brand-gray-light/50 bg-white p-5 sm:p-6">
            <h2 className="font-heading text-lg font-semibold text-brand-dark border-l-4 border-brand-primary pl-4">
              Overview
            </h2>
            <p className="mt-4 text-sm sm:text-base text-brand-foreground/85 leading-relaxed">
              {overviewText || '—'}
            </p>
            {(industries ?? []).length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {(industries ?? []).map((ind) => (
                  <span
                    key={ind}
                    className="rounded-full border border-brand-gray-light bg-brand-gray-light/30 px-3 py-1 text-xs font-medium text-brand-foreground/80"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="rounded-2xl border border-brand-gray-light/50 bg-brand-gray-light/20 p-5 sm:p-6">
            <h2 className="font-heading text-lg font-semibold text-brand-dark border-l-4 border-brand-primary pl-4">
              Statement / Highlights
            </h2>
            <p className="mt-4 text-sm sm:text-base text-brand-foreground/85 leading-relaxed italic">
              {statementText}
            </p>
          </div>
        </section>

        {/* ----- 5. Key details + Timeline + Team & progress (3-card grid) ----- */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Key details */}
          <div className="rounded-2xl border border-brand-gray-light/50 bg-white p-5 sm:p-6">
            <h2 className="font-heading text-base font-semibold text-brand-dark">Key details</h2>
            <dl className="mt-4 space-y-3">
              {[
                { label: 'Category', value: category || '—' },
                { label: 'Segment', value: segment || '—' },
                { label: 'Location', value: location || '—' },
                { label: 'Pricing', value: price || '—' },
                { label: 'Inventory', value: inventory != null ? `${inventory} units` : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-3 border-b border-brand-gray-light/50 pb-2 last:border-0 last:pb-0">
                  <dt className="text-xs font-medium uppercase tracking-wide text-brand-foreground/50 shrink-0">{label}</dt>
                  <dd className="text-right text-sm font-medium text-brand-foreground/90">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-brand-gray-light/50 bg-white p-5 sm:p-6">
            <h2 className="font-heading text-base font-semibold text-brand-dark">Timeline</h2>
            <dl className="mt-4 space-y-3">
              <div className="flex justify-between gap-3 border-b border-brand-gray-light/50 pb-2">
                <dt className="text-xs font-medium uppercase tracking-wide text-brand-foreground/50">Launch</dt>
                <dd className="text-sm font-medium text-brand-foreground/90">{launchWindow || '—'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-brand-foreground/50">Delivery</dt>
                <dd className="text-sm font-medium text-brand-foreground/90">{deliveryWindow || '—'}</dd>
              </div>
            </dl>
          </div>

          {/* Team & progress */}
          <div className="rounded-2xl border border-brand-gray-light/50 bg-white p-5 sm:p-6 sm:col-span-2 lg:col-span-1">
            <h2 className="font-heading text-base font-semibold text-brand-dark">Team & progress</h2>
            <dl className="mt-4 space-y-3">
              <div className="flex justify-between gap-3 border-b border-brand-gray-light/50 pb-2">
                <dt className="text-xs font-medium uppercase tracking-wide text-brand-foreground/50">Builder</dt>
                <dd className="text-right text-sm font-medium text-brand-foreground/90">{builder || '—'}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-brand-gray-light/50 pb-2">
                <dt className="text-xs font-medium uppercase tracking-wide text-brand-foreground/50">Consultants</dt>
                <dd className="text-right text-sm font-medium text-brand-foreground/90">{consultants || '—'}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-brand-gray-light/50 pb-2">
                <dt className="text-xs font-medium uppercase tracking-wide text-brand-foreground/50">Financing</dt>
                <dd className="text-right text-sm font-medium text-brand-foreground/90">{financing || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-brand-foreground/50 mb-1.5">Progress</dt>
                {progressPct != null ? (
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-brand-gray-light">
                      <div
                        className="h-full rounded-full bg-brand-primary transition-all"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-brand-foreground/90">{progressPct}%</span>
                  </div>
                ) : (
                  <dd className="text-sm font-medium text-brand-foreground/90">—</dd>
                )}
              </div>
            </dl>
          </div>
        </section>
      </article>

      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={galleryImages}
        title={name || 'Project'}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
      />
    </>
  );
}
