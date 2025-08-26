import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { FeatureListItem } from "./feature-list-item"

interface AIFeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  benefits: string[]
}

export function AIFeatureCard({ icon: Icon, title, description, benefits }: AIFeatureCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {benefits.map((benefit, benefitIndex) => (
            <FeatureListItem key={benefitIndex} icon={<Lightbulb className="h-4 w-4 text-yellow-500 flex-shrink-0" />}>
              <span className="text-sm">{benefit}</span>
            </FeatureListItem>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
