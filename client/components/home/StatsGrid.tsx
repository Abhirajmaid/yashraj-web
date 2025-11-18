type Stat = {
  id?: string;
  value: string;
  label: string;
};

type StatsGridProps = {
  stats: Stat[];
  className?: string;
};

export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <dl
      className={`grid grid-cols-2 gap-10 text-neutral-900 lg:grid-cols-4 ${
        className ?? ""
      }`}
    >
      {stats.map((stat) => (
        <div key={stat.id ?? stat.label} className="space-y-2">
          <dt className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
            {stat.label}
          </dt>
          <dd className="text-3xl font-semibold">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
