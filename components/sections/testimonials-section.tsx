import { SectionHeader } from "@/components/shared/section-header"
import { TestimonialCard } from "@/components/shared/testimonial-card"
import { testimonials } from "@/lib/data"
import { MessageSquare } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge={{ icon: MessageSquare, text: "Customer Stories" }}
          title="Loved by Schools Worldwide"
          description="Discover how FlexDesk is transforming education for administrators, teachers, parents, and students across the globe."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
