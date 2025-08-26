"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Users, BarChart3, CreditCard, Calendar, FileText, Globe } from "lucide-react"
import Link from "next/link"

export default function AdministratorsPage() {
  const features = [
    {
      icon: Users,
      title: "Student Information System",
      description: "Comprehensive student records, enrollment management, and family communication tools.",
      benefits: ["Digital student profiles", "Enrollment workflows", "Family management", "Academic history tracking"],
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Real-time insights into school performance, student outcomes, and operational efficiency.",
      benefits: ["Performance metrics", "Predictive analytics", "Custom reports", "Data visualization"],
    },
    {
      icon: CreditCard,
      title: "Financial Management",
      description: "Complete fee management, budgeting, and financial reporting system.",
      benefits: ["Automated billing", "Payment processing", "Budget tracking", "Financial reports"],
    },
    {
      icon: Calendar,
      title: "Resource Management",
      description: "Optimize scheduling, room allocation, and resource utilization across your institution.",
      benefits: ["Smart scheduling", "Room booking", "Resource allocation", "Conflict resolution"],
    },
    {
      icon: FileText,
      title: "Compliance & Reporting",
      description: "Automated compliance tracking and report generation for regulatory requirements.",
      benefits: ["Regulatory compliance", "Automated reports", "Audit trails", "Document management"],
    },
    {
      icon: Globe,
      title: "Multi-Campus Management",
      description: "Centralized control and oversight for multi-location educational institutions.",
      benefits: ["Centralized dashboard", "Cross-campus reporting", "Unified policies", "Resource sharing"],
    },
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Principal",
      school: "Riverside Elementary School",
      content:
        "FlexDesk has transformed our administrative efficiency. We've reduced paperwork by 80% and improved parent communication significantly.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Robert Kim",
      role: "Superintendent",
      school: "Valley School District",
      content:
        "The multi-campus management features have been invaluable for our district. We can now oversee all 15 schools from a single dashboard.",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Shield className="h-4 w-4 mr-2" />
              For School Administrators
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">Complete School Management Control</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Streamline operations, improve efficiency, and make data-driven decisions with comprehensive
              administrative tools designed specifically for educational leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/get-started">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/get-started">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Run Your School
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From student enrollment to graduation, manage every aspect of your educational institution with
              intelligent, integrated tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Proven Results for Administrators</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the measurable impact FlexDesk has on administrative efficiency and school performance.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">80%</div>
              <div className="text-gray-600">Reduction in Paperwork</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">60%</div>
              <div className="text-gray-600">Time Saved on Admin Tasks</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Parent Satisfaction Rate</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-orange-600 mb-2">40%</div>
              <div className="text-gray-600">Faster Decision Making</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">What Administrators Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-blue-600">{testimonial.school}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your School Administration?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of administrators who have streamlined their operations with FlexDesk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/get-started">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                asChild
              >
                <Link href="/get-started">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
