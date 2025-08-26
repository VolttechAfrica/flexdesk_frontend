import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { FeatureListItem } from "./feature-list-item"

interface UserTypeCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  color: string
}

export function UserTypeCard({ icon: Icon, title, description, features, color }: UserTypeCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color} text-white mb-4`}>
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, featureIndex) => (
            <FeatureListItem
              key={featureIndex}
              icon={<div className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>}
            >
              {feature}
            </FeatureListItem>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
