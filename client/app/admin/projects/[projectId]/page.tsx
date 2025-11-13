import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById, statusLabels, statusTone } from '../data';

type PageProps = {
  params: { projectId: string };
};

export default function ProjectDetailPage({ params }: PageProps) {
  const projectId = decodeURIComponent(params.projectId);
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8 text-white">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Project overview</p>
          <h1 className="text-3xl font-semibold text-white">{project.name}</h1>
          <p className="text-sm text-white/60">{project.location}</p>
        </div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition hover:border-white hover:text-white"
        >
          ← Back to projects
        </Link>
      </header>

      <section className="overflow-hidden rounded-xl border border-white/10 bg-[#111111] shadow-sm shadow-black/60">
        <div className="relative h-72 w-full bg-black/20">
          <img
            src={project.heroImage}
            alt={project.name}
            className="h-full w-full object-cover object-center opacity-90"
          />
          <span
            className={`absolute left-6 top-6 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusTone[project.status]}`}
          >
            {statusLabels[project.status]}
          </span>
        </div>

        <div className="grid gap-8 border-t border-white/10 p-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <article className="space-y-3">
              <h2 className="text-lg font-semibold text-white">Snapshot</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="rounded-lg bg-black/30 p-4 text-sm text-white/70">
                  <span className="block text-xs uppercase tracking-wide text-white/40">Category</span>
                  {project.category}
                </li>
                <li className="rounded-lg bg-black/30 p-4 text-sm text-white/70">
                  <span className="block text-xs uppercase tracking-wide text-white/40">Segment</span>
                  {project.segment}
                </li>
                <li className="rounded-lg bg-black/30 p-4 text-sm text-white/70">
                  <span className="block text-xs uppercase tracking-wide text-white/40">Headline pricing</span>
                  {project.price}
                </li>
                <li className="rounded-lg bg-black/30 p-4 text-sm text-white/70">
                  <span className="block text-xs uppercase tracking-wide text-white/40">Inventory</span>
                  {project.inventory} units
                </li>
              </ul>
            </article>

            <article className="space-y-3">
              <h2 className="text-lg font-semibold text-white">Narrative</h2>
              <p className="text-sm leading-relaxed text-white/70">{project.overview}</p>
            </article>

            <article className="space-y-3">
              <h2 className="text-lg font-semibold text-white">Project highlights</h2>
              <div className="rounded-lg bg-black/30 p-4 text-sm text-white/70">
                {project.highlights}
              </div>
            </article>

            <article className="space-y-3">
              <h2 className="text-lg font-semibold text-white">Timeline</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-black/30 p-4 text-sm text-white/70">
                  <span className="block text-xs uppercase tracking-wide text-white/40">Launch window</span>
                  {project.launchWindow}
                </div>
                <div className="rounded-lg bg-black/30 p-4 text-sm text-white/70">
                  <span className="block text-xs uppercase tracking-wide text-white/40">Delivery window</span>
                  {project.deliveryWindow}
                </div>
              </div>
            </article>
          </div>

          <aside className="space-y-4 text-sm text-white/70">
            <div className="space-y-2 rounded-lg bg-black/30 p-4">
              <span className="text-xs uppercase tracking-wide text-white/40">Builder / developer</span>
              <p className="text-white">{project.builder}</p>
            </div>
            <div className="space-y-2 rounded-lg bg-black/30 p-4">
              <span className="text-xs uppercase tracking-wide text-white/40">Consultants</span>
              <p>{project.consultants}</p>
            </div>
            <div className="space-y-2 rounded-lg bg-black/30 p-4">
              <span className="text-xs uppercase tracking-wide text-white/40">Financing & schemes</span>
              <p>{project.financing}</p>
            </div>
            <div className="space-y-2 rounded-lg bg-black/30 p-4">
              <span className="text-xs uppercase tracking-wide text-white/40">Progress</span>
              <p>{project.progress}% complete</p>
            </div>
          </aside>
        </div>
      </section>

      {project.gallery.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Gallery</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {project.gallery.map((imageUrl) => (
              <div
                key={imageUrl}
                className="overflow-hidden rounded-lg border border-white/10 bg-black/20 shadow-sm shadow-black/60"
              >
                <img src={imageUrl} alt="" className="h-40 w-full object-cover opacity-90" />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}


