import { SectionHeader } from "@/components/shared/section-header"
import { AIFeatureCard } from "@/components/shared/ai-feature-card"
import { StatsGrid } from "@/components/shared/stats-grid"
import { aiFeatures, aiPlatformStats } from "@/lib/data"
import { Zap } from "lucide-react"

export function AIFeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge={{ icon: Zap, text: "AI-Powered Features" }}
          title="Intelligence That Transforms Education"
          description="Our advanced AI capabilities don't just automate tasks—they enhance learning, improve outcomes, and create smarter educational environments for everyone."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <AIFeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">AI Teaching Platform</h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Our dedicated AI teaching platform provides students with personalized tutoring, interactive lessons, and
              adaptive learning experiences that evolve with their progress.
            </p>
            <StatsGrid stats={aiPlatformStats} />
          </div>
        </div>
      </div>
    </section>
  )
}
