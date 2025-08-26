import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import Link from "next/link"
import { FeatureListItem } from "./feature-list-item"

interface Plan {
  name: string
  description: string
  price: string
  period: string
  studentLimit: string
  popular: boolean
  features: string[]
}

interface PricingCardProps {
  plan: Plan
  selected: boolean
}

export function PricingCard({ plan, selected }: PricingCardProps) {
  return (
    <Card
      className={`relative overflow-hidden flex flex-col ${plan.popular ? "ring-2 ring-blue-500 shadow-xl scale-105" : "shadow-lg"}`}
    >
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
          <Zap className="inline h-4 w-4 mr-1" />
          Most Popular
        </div>
      )}

      <CardHeader className={`text-center ${plan.popular ? "pt-12" : "pt-6"}`}>
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <CardDescription className="text-gray-600 mb-4">{plan.description}</CardDescription>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
          {plan.price !== "Custom" && <span className="text-gray-600 ml-2">{plan.period}</span>}
        </div>
        <div className="text-sm text-gray-600 mb-6">{plan.studentLimit}</div>
        <Button
          className={`w-full ${
            selected ? "bg-blue-600 hover:bg-blue-700" : plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""
          }`}
          variant={selected || plan.popular ? "default" : "outline"}
          asChild
        >
          <Link href={plan.price === "Custom" ? "/contact-sales" : "/get-started"}>
            {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="pt-0 flex-1">
        <ul className="space-y-3">
          {plan.features.map((feature, featureIndex) => (
            <FeatureListItem key={featureIndex}>{feature}</FeatureListItem>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
