import type React from "react"
import { Check } from "lucide-react"

interface FeatureListItemProps {
  children: React.ReactNode
  icon?: React.ReactNode
}

export function FeatureListItem({ children, icon }: FeatureListItemProps) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1 flex-shrink-0">{icon || <Check className="h-5 w-5 text-green-500" />}</div>
      <span className="text-gray-700">{children}</span>
    </li>
  )
}
