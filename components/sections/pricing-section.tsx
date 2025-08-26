import { SectionHeader } from "@/components/shared/section-header"
import { PricingCard } from "@/components/shared/pricing-card"
import { plans } from "@/lib/data"
import { CreditCard } from "lucide-react"

export function PricingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge={{ icon: CreditCard, text: "Simple Pricing" }}
          title="Choose the Perfect Plan for Your School"
          description="Flexible pricing options designed to grow with your institution. Start with our free trial and upgrade as your needs expand."
        />

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need a custom solution for your district?</p>
          <p className="text-sm text-gray-500">
            All plans include 24/7 support, regular updates, and a 30-day money-back guarantee.
          </p>
        </div>
      </div>
    </section>
  )
}
