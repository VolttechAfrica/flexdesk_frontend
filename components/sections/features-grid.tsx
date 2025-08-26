import { SectionHeader } from "@/components/shared/section-header"
import { IconFeatureCard } from "@/components/shared/icon-feature-card"
import { features } from "@/lib/data"
import { CheckCircle } from "lucide-react"

export function FeaturesGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge={{ icon: CheckCircle, text: "Core Features" }}
          title="Everything You Need, All in One Place"
          description="FlexDesk is a comprehensive platform that covers every aspect of school management, from academics and finance to communication and security."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <IconFeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
