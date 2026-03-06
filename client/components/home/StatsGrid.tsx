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
      className={`grid grid-cols-2 gap-6 gap-y-6 text-neutral-900 sm:gap-8 sm:gap-y-8 lg:grid-cols-4 lg:gap-10 lg:gap-y-10 ${
        className ?? ""
      }`}
    >
      {stats.map((stat) => (
        <div
          key={stat.id ?? stat.label}
          className="space-y-2 flex flex-col justify-center items-center"
        >
          <dt className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
            {stat.label}
          </dt>
          <dd className="text-3xl font-semibold">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
