import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface IconFeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function IconFeatureCard({ icon: Icon, title, description }: IconFeatureCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
