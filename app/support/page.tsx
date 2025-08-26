"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { useSupportForm } from "@/hooks/use-support-form"
import type { SupportTicketRequest } from "@/lib/types/api"
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  BookOpen,
  Video,
  Users,
  Search,
  ChevronDown,
  ChevronRight,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
} from "lucide-react"

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState<SupportTicketRequest>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    priority: "MEDIUM",
    category: "GENERAL",
    attachments: [],
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)

  const { isSubmitting, isSuccess, error, ticket, submitTicket, reset, clearError } = useSupportForm()

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 Available",
      action: "Start Chat",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 8AM-8PM EST",
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions and concerns",
      availability: "Response within 2 hours",
      action: "Send Email",
    },
    {
      icon: Video,
      title: "Video Training",
      description: "Schedule personalized training sessions",
      availability: "By Appointment",
      action: "Schedule Session",
    },
  ]

  const faqs = [
    {
      question: "How do I get started with FlexDesk?",
      answer:
        "Getting started is easy! Sign up for a free trial, and our onboarding team will guide you through the setup process. We provide comprehensive training and support to ensure a smooth transition.",
    },
    {
      question: "Is my school's data secure with FlexDesk?",
      answer:
        "Absolutely. We use enterprise-grade security measures including AES-256 encryption, FERPA compliance, and regular security audits. Your data is stored in secure, redundant data centers with 99.9% uptime guarantee.",
    },
    {
      question: "Can FlexDesk integrate with our existing systems?",
      answer:
        "Yes! FlexDesk integrates with popular educational tools including Google Workspace, Microsoft 365, Canvas, Blackboard, and many others. Our API also allows for custom integrations.",
    },
    {
      question: "What training and support do you provide?",
      answer:
        "We offer comprehensive training including live webinars, video tutorials, documentation, and personalized training sessions. Our support team is available 24/7 via chat, email, and phone.",
    },
    {
      question: "How much does FlexDesk cost?",
      answer:
        "We offer flexible pricing plans starting at $29/month for small schools. Pricing is based on the number of students and features needed. Contact our sales team for a custom quote.",
    },
    {
      question: "Can I try FlexDesk before purchasing?",
      answer:
        "Yes! We offer a 30-day free trial with full access to all features. No credit card required to start your trial.",
    },
  ]

  const resources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides and API documentation",
      link: "#",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      link: "#",
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other FlexDesk users",
      link: "#",
    },
    {
      icon: HelpCircle,
      title: "Knowledge Base",
      description: "Searchable database of common questions",
      link: "#",
    },
  ]

  const priorities = [
    { value: "LOW", label: "Low" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HIGH", label: "High" },
    { value: "URGENT", label: "Urgent" },
  ]

  const categories = [
    { value: "GENERAL", label: "General Inquiry" },
    { value: "TECHNICAL", label: "Technical Support" },
    { value: "BILLING", label: "Billing & Payments" },
    { value: "FEATURE_REQUEST", label: "Feature Request" },
    { value: "OTHERS", label: "Others" },
  ]

  const handleInputChange = (field: keyof SupportTicketRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) clearError()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    addFiles(files)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    addFiles(files)
  }

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]

      return file.size <= maxSize && allowedTypes.includes(file.type)
    })

    setSelectedFiles((prev) => {
      const combined = [...prev, ...validFiles]
      return combined.slice(0, 5) // Max 5 files
    })
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const ticketData: SupportTicketRequest = {
      ...formData,
      attachments: selectedFiles,
    }
    console.log("ticketData", ticketData)

    await submitTicket(ticketData)
  }

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      priority: "MEDIUM",
      category: "GENERAL",
      attachments: [],
    })
    setSelectedFiles([])
    reset()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <HelpCircle className="h-4 w-4 mr-2" />
              Support Center
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">We're Here to Help</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Get the support you need to make the most of FlexDesk. Our team of experts is available 24/7 to help you
              succeed.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Search for help..." className="pl-10 pr-4 py-3 text-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Get Support Your Way</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the support method that works best for you. Our team is ready to help with any questions or issues
              you may have.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600 mx-auto mb-4">
                    <option.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <CardDescription className="text-gray-600 mb-2">{option.description}</CardDescription>
                  <div className="text-sm text-green-600 font-medium">{option.availability}</div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">{option.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ and Resources */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-12 max-w-md mx-auto">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="faq">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                  <p className="text-xl text-gray-600">
                    Find quick answers to the most common questions about FlexDesk.
                  </p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      >
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{faq.question}</CardTitle>
                          {expandedFaq === index ? (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedFaq === index && (
                        <CardContent className="pt-0">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Learning Resources</h2>
                  <p className="text-xl text-gray-600">
                    Explore our comprehensive resources to get the most out of FlexDesk.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex-shrink-0">
                            <resource.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                            <CardDescription className="text-gray-600 mb-4">{resource.description}</CardDescription>
                            <Button variant="outline">Explore</Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Still Need Help?</h2>
              <p className="text-xl text-gray-600">Send us a message and we'll get back to you within 2 hours.</p>
            </div>

            {/* Success State */}
            {isSuccess && ticket && (
              <Card className="mb-8 border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900 mb-2">Support Ticket Created Successfully!</h3>
                      <p className="text-green-700 mb-4">
                        Your support ticket has been created with ID: <strong>{ticket.ticketNumber}</strong>
                      </p>
                      <p className="text-sm text-green-600 mb-4">
                        We'll respond to your inquiry within 2 hours. You'll receive email updates at{" "}
                        <strong>{ticket.email}</strong>
                      </p>
                      <Button variant="outline" size="sm" onClick={handleReset} className="bg-transparent">
                        Submit Another Ticket
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error State */}
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {/* Form */}
            {!isSuccess && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Fill out the form below and our support team will assist you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter your first name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Enter your last name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => handleInputChange("priority", value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                {priority.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="What can we help you with?"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Describe your question or issue in detail..."
                        rows={5}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Attachments (Optional)</Label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Drag and drop files here, or{" "}
                          <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                            browse
                            <input
                              type="file"
                              multiple
                              onChange={handleFileSelect}
                              className="hidden"
                              accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.doc,.docx"
                              disabled={isSubmitting}
                            />
                          </label>
                        </p>
                        <p className="text-xs text-gray-500">
                          Max 5 files, 10MB each. Supported: JPG, PNG, GIF, PDF, TXT, DOC, DOCX
                        </p>
                      </div>

                      {/* Selected Files */}
                      {selectedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                disabled={isSubmitting}
                                className="flex-shrink-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
