"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Calendar,
  FileText,
  CreditCard,
  Shield,
  Smartphone,
  Globe,
  Database,
  Settings,
  Bell,
  Users,
  BookOpen,
  BarChart3,
  MessageSquare,
  GraduationCap,
  Clock,
  Target,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const featureCategories = [
    {
      id: "ai-features",
      title: "AI-Powered Features",
      description: "Intelligent tools that adapt and learn",
      features: [
        {
          icon: Brain,
          title: "AI Teaching Assistant",
          description: "24/7 personalized tutoring with adaptive learning paths",
          benefits: ["Personalized learning", "Instant feedback", "Progress tracking"],
        },
        {
          icon: BarChart3,
          title: "Predictive Analytics",
          description: "Forecast student performance and identify at-risk learners",
          benefits: ["Early intervention", "Data-driven insights", "Performance forecasting"],
        },
        {
          icon: MessageSquare,
          title: "Smart Communication",
          description: "AI-enhanced messaging with translation and sentiment analysis",
          benefits: ["Auto-translation", "Smart notifications", "Sentiment tracking"],
        },
        {
          icon: Target,
          title: "Curriculum Optimizer",
          description: "AI-driven curriculum planning based on learning outcomes",
          benefits: ["Standards alignment", "Gap analysis", "Content recommendations"],
        },
      ],
    },
    {
      id: "management",
      title: "School Management",
      description: "Complete administrative control",
      features: [
        {
          icon: Users,
          title: "Student Information System",
          description: "Comprehensive student records and enrollment management",
          benefits: ["Digital records", "Enrollment tracking", "Family management"],
        },
        {
          icon: Calendar,
          title: "Smart Scheduling",
          description: "AI-powered timetable optimization with conflict resolution",
          benefits: ["Automated scheduling", "Resource optimization", "Conflict detection"],
        },
        {
          icon: CreditCard,
          title: "Fee Management",
          description: "Automated billing, payments, and financial reporting",
          benefits: ["Online payments", "Automated invoicing", "Financial reports"],
        },
        {
          icon: FileText,
          title: "Document Management",
          description: "Secure digital document storage and sharing",
          benefits: ["Cloud storage", "Version control", "Access permissions"],
        },
      ],
    },
    {
      id: "learning",
      title: "Learning & Teaching",
      description: "Enhanced educational experiences",
      features: [
        {
          icon: GraduationCap,
          title: "Digital Classroom",
          description: "Interactive online learning environment",
          benefits: ["Virtual classrooms", "Interactive content", "Real-time collaboration"],
        },
        {
          icon: BookOpen,
          title: "Assignment Management",
          description: "Create, distribute, and grade assignments efficiently",
          benefits: ["Auto-grading", "Plagiarism detection", "Feedback tools"],
        },
        {
          icon: BarChart3,
          title: "Progress Tracking",
          description: "Real-time monitoring of student academic progress",
          benefits: ["Individual tracking", "Class analytics", "Parent visibility"],
        },
        {
          icon: Clock,
          title: "Attendance System",
          description: "Automated attendance tracking with notifications",
          benefits: ["Digital check-in", "Absence alerts", "Attendance reports"],
        },
      ],
    },
    {
      id: "communication",
      title: "Communication & Engagement",
      description: "Connect all stakeholders",
      features: [
        {
          icon: Bell,
          title: "Smart Notifications",
          description: "Intelligent alerts and communication system",
          benefits: ["Personalized alerts", "Multi-channel delivery", "Priority routing"],
        },
        {
          icon: MessageSquare,
          title: "Parent Portal",
          description: "Dedicated platform for parent-school communication",
          benefits: ["Real-time updates", "Direct messaging", "Event notifications"],
        },
        {
          icon: Users,
          title: "Community Hub",
          description: "Social platform for school community engagement",
          benefits: ["Discussion forums", "Event planning", "Resource sharing"],
        },
        {
          icon: Globe,
          title: "Multi-Language Support",
          description: "Support for 50+ languages with real-time translation",
          benefits: ["Auto-translation", "Localized content", "Cultural adaptation"],
        },
      ],
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
              <Zap className="h-4 w-4 mr-2" />
              Complete Feature Set
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">Every Tool Your School Needs</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              From AI-powered teaching assistants to comprehensive administrative tools, FlexDesk provides everything
              you need to run a modern, efficient educational institution.
            </p>
            <Button size="lg" asChild>
              <Link href="/get-started">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="ai-features" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12">
              {featureCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-sm">
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {featureCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{category.title}</h2>
                  <p className="text-xl text-gray-600">{category.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {category.features.map((feature, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
                            <feature.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                            <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                          </div>
                        </div>
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
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Shield className="h-4 w-4 mr-2" />
              Security & Compliance
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Enterprise-Grade Security</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your data is protected with industry-leading security measures and compliance standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>FERPA Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Full compliance with Family Educational Rights and Privacy Act requirements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Database className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Data Encryption</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  End-to-end encryption for all data in transit and at rest with AES-256.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Settings className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Access Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Role-based permissions and multi-factor authentication for secure access.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile & Integration */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile & Integration
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Access Anywhere, Integrate Everything
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Native mobile apps for iOS and Android ensure you stay connected on the go. Seamless integrations with
                popular educational tools and systems.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Native iOS and Android apps</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Offline functionality</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Google Workspace integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Microsoft 365 compatibility</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>LMS integrations</span>
                </li>
              </ul>
              <Button size="lg">View All Integrations</Button>
            </div>
            <div className="relative">
              <img src="/placeholder.svg?height=500&width=600" alt="Mobile apps" className="rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
