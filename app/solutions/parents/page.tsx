"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Smartphone, MessageSquare, BarChart3, Calendar, Bell, BookOpen } from "lucide-react"
import Link from "next/link"

export default function ParentsPage() {
  const features = [
    {
      icon: BarChart3,
      title: "Real-Time Progress Tracking",
      description: "Monitor your child's academic progress, grades, and achievements in real-time.",
      benefits: ["Live grade updates", "Progress reports", "Achievement tracking", "Performance analytics"],
    },
    {
      icon: MessageSquare,
      title: "Direct Teacher Communication",
      description: "Seamless communication with teachers and school staff through integrated messaging.",
      benefits: ["Direct messaging", "Video calls", "Group discussions", "Translation support"],
    },
    {
      icon: Calendar,
      title: "Schedule & Events",
      description: "Stay informed about school events, assignments, and important dates.",
      benefits: ["Event calendar", "Assignment due dates", "School announcements", "Reminder notifications"],
    },
    {
      icon: BookOpen,
      title: "AI Homework Helper",
      description: "AI-powered tutoring assistant to help your child with homework and learning.",
      benefits: ["24/7 tutoring support", "Step-by-step explanations", "Practice problems", "Learning resources"],
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Receive personalized alerts about your child's school activities and performance.",
      benefits: ["Attendance alerts", "Grade notifications", "Behavior updates", "Emergency alerts"],
    },
    {
      icon: Smartphone,
      title: "Mobile App Access",
      description: "Access all features on-the-go with our intuitive mobile application.",
      benefits: ["iOS & Android apps", "Offline access", "Push notifications", "Secure login"],
    },
  ]

  const testimonials = [
    {
      name: "Jennifer Martinez",
      role: "Parent",
      school: "Oakwood Middle School",
      content:
        "FlexDesk has transformed how I stay connected with my daughter's education. The real-time updates and AI tutoring have been game-changers.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "David Thompson",
      role: "Parent",
      school: "Riverside Elementary",
      content:
        "The communication with teachers is seamless, and I love being able to track my son's progress in real-time. It's made me more involved in his education.",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Heart className="h-4 w-4 mr-2" />
              For Parents & Students
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Stay Connected to Your Child's Education
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Be an active participant in your child's learning journey with real-time insights, direct communication
              with teachers, and AI-powered learning support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/get-started">Download App</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/get-started">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Support Your Child
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From real-time progress tracking to AI-powered homework help, FlexDesk gives you the tools to be actively
              involved in your child's educational success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-600 mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></div>
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

      {/* Student Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <BookOpen className="h-4 w-4 mr-2" />
                For Students
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Personalized Learning Experience</h2>
              <p className="text-lg text-gray-600 mb-6">
                Students get access to AI-powered tutoring, personalized learning paths, and interactive tools that make
                learning engaging and effective.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>AI tutoring available 24/7</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Personalized learning paths</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Interactive homework assistance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Achievement badges and rewards</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Progress tracking and goals</span>
                </li>
              </ul>
              <Button size="lg">Learn More</Button>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Student learning interface"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Increased Parent Engagement</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how FlexDesk helps parents become more involved in their children's education.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Parent Satisfaction</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
              <div className="text-gray-600">Increase in Communication</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-green-600 mb-2">88%</div>
              <div className="text-gray-600">Student Improvement</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-orange-600 mb-2">90%</div>
              <div className="text-gray-600">App Usage Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">What Parents Are Saying</h2>
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
                      <div className="text-sm text-purple-600">{testimonial.school}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Start Supporting Your Child's Success Today</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of parents who are actively involved in their children's education with FlexDesk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/get-started">Download App</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
                asChild
              >
                <Link href="/get-started">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
