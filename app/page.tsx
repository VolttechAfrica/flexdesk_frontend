"use client"

import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/sections/hero-section"
import { UserTypesSection } from "@/components/sections/user-types-section"
import { AIFeaturesSection } from "@/components/sections/ai-features-section"
import { FeaturesGrid } from "@/components/sections/features-grid"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { CTASection } from "@/components/sections/cta-section"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <UserTypesSection />
        <AIFeaturesSection />
        <FeaturesGrid />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
