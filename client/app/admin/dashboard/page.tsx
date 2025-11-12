const metricCards = [
  { label: 'Active Projects', value: '12', icon: '📦' },
  { label: 'In Review', value: '04', icon: '✅' },
  { label: 'Inventory Ready', value: '256', icon: '🏗️' },
  { label: 'Featured', value: '03', icon: '⭐' },
];

const activities = [
  { title: 'Aurora Skyline Residences', status: 'Draft updated', date: '12/11/2025' },
  { title: 'Harbor Promenade Villas', status: 'Pricing refreshed', date: '11/11/2025' },
  { title: 'Northern Ridge Viaduct', status: 'Milestones synced', date: '10/11/2025' },
  { title: 'Midtown Transit Hub', status: 'Gallery curated', date: '09/11/2025' },
  { title: 'Lakeview Terraces', status: 'Inventory added', date: '08/11/2025' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10 text-white">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-white/60">
          Quick view of inventory movement and the latest edits across the portfolio.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric) => (
          <article
            key={metric.label}
            className="rounded-lg border border-white/10 bg-[#111111] p-5 shadow-sm shadow-black/40"
          >
            <div className="flex items-center justify-between text-white/70">
              <span className="text-xl">{metric.icon}</span>
              <span className="text-sm uppercase tracking-wide">{metric.label}</span>
            </div>
            <p className="mt-6 text-4xl font-semibold text-white">{metric.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-white/10 bg-[#111111]">
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <span className="text-xs uppercase tracking-wide text-white/40">Most recent first</span>
        </header>

        <ul className="divide-y divide-white/10">
          {activities.map((activity) => (
            <li key={activity.title} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium text-white">{activity.title}</p>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  {activity.status}
                </p>
              </div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/50">
                {activity.date}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

