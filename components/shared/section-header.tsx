import type React from "react"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  badge?: {
    icon: LucideIcon
    text: string
  }
  title: React.ReactNode
  description: string
  className?: string
}

export function SectionHeader({ badge, title, description, className }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {badge && (
        <Badge variant="secondary" className="mb-4">
          <badge.icon className="h-4 w-4 mr-2" />
          {badge.text}
        </Badge>
      )}
      <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
    </div>
  )
}
