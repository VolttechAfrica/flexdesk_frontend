interface StatItemProps {
  value: string
  label: string
  valueClassName?: string
  labelClassName?: string
  wrapperClassName?: string
}

export function StatItem({
  value,
  label,
  valueClassName = "text-3xl font-bold",
  labelClassName = "text-gray-600",
  wrapperClassName = "text-center",
}: StatItemProps) {
  return (
    <div className={wrapperClassName}>
      <div className={valueClassName}>{value}</div>
      <div className={labelClassName}>{label}</div>
    </div>
  )
}
