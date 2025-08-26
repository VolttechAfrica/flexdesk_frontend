import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  school: string
  content: string
  rating: number
  image: string
}

export function TestimonialCard({ name, role, school, content, rating, image }: TestimonialCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <Quote className="h-8 w-8 text-blue-200 mb-4" />
        <p className="text-gray-700 mb-6 leading-relaxed">"{content}"</p>

        <div className="flex items-center gap-4">
          <img src={image || "/placeholder.svg"} alt={name} className="w-12 h-12 rounded-full object-cover" />
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="text-sm text-gray-600">{role}</div>
            <div className="text-sm text-blue-600">{school}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
