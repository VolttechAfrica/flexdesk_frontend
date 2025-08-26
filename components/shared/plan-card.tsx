"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import type { PricingPlan } from "@/lib/types/onboarding"

interface PlanCardProps {
  plan: PricingPlan
  selected: boolean
  onSelect: () => void
  billingCycle: "MONTHLY" | "ANNUAL"
  disabled?: boolean
}

export function PlanCard({ plan, selected, onSelect, billingCycle, disabled }: PlanCardProps) {
  const isAnnual = billingCycle === "ANNUAL"
  const displayPrice = plan.id === "enterprise" ? "Custom" : isAnnual ? plan.price * 10 : plan.price
  const savings = isAnnual && plan.id !== "enterprise" ? Math.round(plan.price * 12 * 0.17) : 0

  return (
    <Card
      className={`relative cursor-pointer transition-all duration-200 ${
        selected ? "ring-2 ring-blue-500 shadow-lg scale-105" : "hover:shadow-md hover:scale-102"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={disabled ? undefined : onSelect}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-500 text-white px-3 py-1">Most Popular</Badge>
        </div>
      )}

      <CardHeader className={`text-center ${plan.popular ? "pt-8" : "pt-6"}`}>
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <CardDescription className="text-gray-600 mb-4">{plan.description}</CardDescription>

        <div className="mb-4">
          {plan.id === "enterprise" ? (
            <div className="text-3xl font-bold text-gray-900">Custom</div>
          ) : (
            <>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-gray-900">${displayPrice}</span>
                <span className="text-gray-600 ml-2">/{isAnnual ? "year" : "month"}</span>
              </div>
              {isAnnual && savings > 0 && <div className="text-sm text-green-600 mt-1">Save ${savings}/year</div>}
            </>
          )}
        </div>

        <div className="text-sm text-gray-600 mb-6">{plan.studentLimit}</div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {feature.included ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-gray-300" />
                )}
              </div>
              <span className={`text-sm ${feature.included ? "text-gray-700" : "text-gray-400"}`}>
                {feature.name}
                {feature.limit && <span className="text-gray-500"> ({feature.limit})</span>}
              </span>
            </div>
          ))}
        </div>

        <Button
          className={`w-full ${
            selected ? "bg-blue-600 hover:bg-blue-700" : plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""
          }`}
          variant={selected || plan.popular ? "default" : "outline"}
          disabled={disabled}
        >
          {selected ? "Selected" : plan.ctaText}
        </Button>
      </CardContent>
    </Card>
  )
}
