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
  const lgCols =
    stats.length <= 2 ? "lg:grid-cols-2" : "lg:grid-cols-4";
  return (
    <dl
      className={`grid w-full grid-cols-2 items-stretch gap-x-6 gap-y-6 text-neutral-900 sm:gap-x-8 sm:gap-y-8 ${lgCols} lg:gap-x-10 lg:gap-y-10 ${
        className ?? ""
      }`}
    >
      {stats.map((stat) => (
        <div
          key={stat.id ?? stat.label}
          className="flex min-w-0 flex-col items-center justify-center text-center"
        >
          <dt className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
            {stat.label}
          </dt>
          <dd className="mt-1 text-3xl font-semibold sm:mt-2">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
