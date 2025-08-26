import { SectionHeader } from "@/components/shared/section-header"
import { UserTypeCard } from "@/components/shared/user-type-card"
import { userTypes } from "@/lib/data"
import { Users } from "lucide-react"

export function UserTypesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge={{ icon: Users, text: "Built for Everyone" }}
          title="Tailored Solutions for Every User"
          description="FlexDesk adapts to the unique needs of administrators, teachers, parents, and students, providing specialized tools and interfaces for each user type."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => (
            <UserTypeCard key={index} {...userType} />
          ))}
        </div>
      </div>
    </section>
  )
}
