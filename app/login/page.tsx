"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Shield, GraduationCap, Heart, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    resetEmail: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.resetEmail.trim()) {
      setErrors({ resetEmail: "Email is required" })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.resetEmail)) {
      setErrors({ resetEmail: "Please enter a valid email address" })
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Handle password reset here
      console.log("Password reset sent to:", formData.resetEmail)
      setActiveTab("login")
      setFormData((prev) => ({ ...prev, resetEmail: "" }))
    } catch (error) {
      setErrors({ resetEmail: "Failed to send reset email. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const userTypes = [
    {
      icon: Shield,
      title: "Administrators",
      description: "Complete school management and oversight",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: GraduationCap,
      title: "Teachers",
      description: "AI-enhanced teaching tools and classroom management",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Heart,
      title: "Parents & Students",
      description: "Stay connected with real-time progress and communication",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex min-h-screen">
        {/* Left Column - Desktop Only */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-32 w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-md">
            {/* Welcome Message */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Access your AI-powered school management platform and continue transforming education.
              </p>
            </div>

            {/* User Types */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">One Platform for Everyone</h3>
              {userTypes.map((type, index) => (
                <div key={index} className="flex items-start space-x-3 text-blue-100">
                  <type.icon className="h-5 w-5 mt-0.5 text-blue-200" />
                  <div>
                    <div className="font-medium text-white">{type.title}</div>
                    <div className="text-sm">{type.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Image src="/images/logo-flexdesk.png" alt="FlexDesk" width={32} height={32} className="h-8 w-auto" />
              </div>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <Card className="border-0 lg:border lg:shadow-sm">
              <CardHeader className="space-y-1 pb-6">
                <div className="hidden lg:block">
                  <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                  <CardDescription className="text-center">
                    Enter your credentials to access your account
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login" className="text-sm">
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="forgot" className="text-sm">
                      Reset Password
                    </TabsTrigger>
                  </TabsList>

                  {/* Login Tab */}
                  <TabsContent value="login" className="space-y-4">
                    {errors.general && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">{errors.general}</AlertDescription>
                      </Alert>
                    )}

                    <LoginForm />
                  </TabsContent>

                  {/* Forgot Password Tab */}
                  <TabsContent value="forgot" className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Reset Your Password</h3>
                      <p className="text-sm text-gray-600">
                        Enter your email address and we'll send you a link to reset your password.
                      </p>
                    </div>

                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="resetEmail" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="resetEmail"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.resetEmail}
                            onChange={(e) => handleInputChange("resetEmail", e.target.value)}
                            className={`pl-10 h-12 ${errors.resetEmail ? "border-red-500 focus:border-red-500" : ""}`}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.resetEmail && <p className="text-sm text-red-600">{errors.resetEmail}</p>}
                      </div>

                      <Button type="submit" className="w-full h-12 text-base font-medium" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending Reset Link...
                          </>
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full"
                        onClick={() => setActiveTab("login")}
                        disabled={isLoading}
                      >
                        Back to Sign In
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Mobile User Types */}
                <div className="lg:hidden mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">One Platform for Everyone</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {userTypes.map((type, index) => (
                      <div key={index} className={`${type.bgColor} rounded-lg p-3 flex items-center space-x-3`}>
                        <div className={`${type.color} p-2 rounded-lg bg-white`}>
                          <type.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{type.title}</div>
                          <div className="text-xs text-gray-600">{type.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/get-started" className="text-blue-600 hover:text-blue-700 font-medium">
                      Get Started
                    </Link>
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <Link href="/privacy" className="hover:text-gray-700">
                      Privacy
                    </Link>
                    <span>•</span>
                    <Link href="/terms" className="hover:text-gray-700">
                      Terms
                    </Link>
                    <span>•</span>
                    <Link href="/support" className="hover:text-gray-700">
                      Support
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
