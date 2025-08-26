"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Brain, BookOpen, BarChart3, MessageSquare, Clock, FileText } from "lucide-react"
import Link from "next/link"

export default function TeachersPage() {
  const features = [
    {
      icon: Brain,
      title: "AI Teaching Assistant",
      description: "Get intelligent support for lesson planning, grading, and student engagement.",
      benefits: ["Automated lesson plans", "Smart grading", "Personalized recommendations", "Content suggestions"],
    },
    {
      icon: BookOpen,
      title: "Digital Classroom",
      description: "Interactive online learning environment with multimedia content and collaboration tools.",
      benefits: ["Virtual classrooms", "Interactive content", "Real-time collaboration", "Screen sharing"],
    },
    {
      icon: BarChart3,
      title: "Student Progress Tracking",
      description: "Monitor individual and class performance with detailed analytics and insights.",
      benefits: ["Individual tracking", "Class analytics", "Progress reports", "Performance insights"],
    },
    {
      icon: FileText,
      title: "Assignment Management",
      description: "Create, distribute, and grade assignments with automated feedback and plagiarism detection.",
      benefits: ["Auto-grading", "Plagiarism detection", "Feedback tools", "Rubric creation"],
    },
    {
      icon: MessageSquare,
      title: "Parent Communication",
      description: "Seamless communication with parents through integrated messaging and updates.",
      benefits: ["Direct messaging", "Progress updates", "Behavior reports", "Event notifications"],
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Efficient scheduling and time tracking tools to optimize your teaching workflow.",
      benefits: ["Schedule management", "Time tracking", "Task automation", "Reminder system"],
    },
  ]

  const testimonials = [
    {
      name: "Michael Chen",
      role: "Mathematics Teacher",
      school: "Lincoln High School",
      content:
        "The AI teaching assistant has revolutionized my classroom. It helps me create personalized learning paths and saves hours of grading time.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lisa Rodriguez",
      role: "English Teacher",
      school: "Central Middle School",
      content:
        "FlexDesk's assignment management system has made my workflow so much more efficient. The plagiarism detection is incredibly accurate.",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <GraduationCap className="h-4 w-4 mr-2" />
              For Teachers & Educators
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">Empower Your Teaching with AI</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Focus on what matters most - teaching and inspiring students. Let FlexDesk handle the administrative tasks
              while providing intelligent insights to enhance your classroom experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/get-started">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/get-started">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Tools That Transform Teaching</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered lesson planning to intelligent grading, discover how FlexDesk can enhance your teaching
              effectiveness and student engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 text-green-600 mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
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

      {/* AI Teaching Platform */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Brain className="h-4 w-4 mr-2" />
                AI Teaching Platform
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Your Intelligent Teaching Companion</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our AI teaching platform learns from your teaching style and student needs to provide personalized
                recommendations, automated grading, and intelligent insights.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Personalized lesson plan generation</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Intelligent grading and feedback</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Student learning analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Adaptive content recommendations</span>
                </li>
              </ul>
              <Button size="lg">Explore AI Features</Button>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="AI Teaching Platform"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Measurable Impact on Teaching</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how FlexDesk helps teachers save time, improve student outcomes, and enhance their teaching
              effectiveness.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">Time Saved on Grading</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
              <div className="text-gray-600">Teacher Satisfaction</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-purple-600 mb-2">40%</div>
              <div className="text-gray-600">Increase in Student Engagement</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-orange-600 mb-2">70%</div>
              <div className="text-gray-600">Faster Lesson Planning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">What Teachers Are Saying</h2>
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
                      <div className="text-sm text-green-600">{testimonial.school}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Revolutionize Your Teaching?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of teachers who have transformed their classrooms with FlexDesk's AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/get-started">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
                asChild
              >
                <Link href="/get-started">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
