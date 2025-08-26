import { StatItem } from "./stat-item"

interface Stat {
  value: string
  label: string
  valueClassName?: string
  labelClassName?: string
}

interface StatsGridProps {
  stats: Stat[]
  gridClassName?: string
}

export function StatsGrid({ stats, gridClassName = "grid md:grid-cols-3 gap-6 mt-8" }: StatsGridProps) {
  return (
    <div className={gridClassName}>
      {stats.map((stat, index) => (
        <StatItem
          key={index}
          value={stat.value}
          label={stat.label}
          valueClassName={stat.valueClassName}
          labelClassName={stat.labelClassName}
        />
      ))}
    </div>
  )
}
