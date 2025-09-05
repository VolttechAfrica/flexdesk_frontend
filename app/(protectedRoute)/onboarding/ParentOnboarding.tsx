"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StepIndicator } from "@/components/shared/step-indicator"
import { PersonalInfoStep } from "@/components/pages/onboarding/parents/PersonalInfo"
import { ContactPreferencesStep } from "@/components/pages/onboarding/parents/ContactInfo"
import { EmergencyContactStep } from "@/components/pages/onboarding/parents/EmergencyContact"
import { SetupReviewStep } from "@/components/pages/onboarding/parents/SetupReview"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Rocket, User, Phone, Shield, Users, LogOut, Settings } from "lucide-react"
import type {
  ParentOnboardingData,
  ParentProfile,
  ParentEmergencyContact,
  ParentNotificationPreferences,
} from "@/lib/types/parentOnboarding"
import { PARENT_ONBOARDING_STEPS } from "@/lib/types/parentOnboarding"
import { toast } from "@/hooks/use-toast"
import { ROLE_ROUTES, User as UserType, UserRole } from "@/lib/types/auth"
import { apiClient } from "@/lib/api/client"
import { OnboardingHeader } from "@/components/layout/Onboarding/Header"
import OnboardingFooter from "@/components/layout/Onboarding/Footer"

interface ParentOnboardingPageProps {
  user: UserType
  logout: () => void
}

export default function GetStartedParentPage({ user, logout }: ParentOnboardingPageProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState(PARENT_ONBOARDING_STEPS)
  const router = useRouter()

  const [formData, setFormData] = useState<ParentOnboardingData>({
    profile: {
        profilePicture: user?.profile?.profilePicture || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        otherName: user?.otherName || "",
        phone: user?.profile?.phoneNumber || "",
        address: user?.profile?.address || "",
        state: user?.profile?.state || "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phoneNumber: "",
    },
    notifications: {
      email: true,
      sms: false,
      whatsapp: false,
      schoolUpdates: true,
      academicReports: true,
      eventNotifications: true,
      emergencyAlerts: true,
    },
    children: [], // Initialize empty children array
  })

  const stepIcons = [User, Phone, Shield, Users]

  const updatePersonalInfo = (data: ParentProfile) => {
    setFormData((prev) => ({ ...prev, profile: data }))
  }

  const updateContactPreferences = (data: {
    profile?: Partial<ParentProfile>
    emergencyContact?: Partial<ParentEmergencyContact>
    notifications?: Partial<ParentNotificationPreferences>
  }) => {
    setFormData((prev) => ({
      ...prev,
      ...(data.profile && { profile: { ...prev.profile, ...data.profile } }),
      ...(data.emergencyContact && { emergencyContact: { ...prev.emergencyContact, ...data.emergencyContact } }),
      ...(data.notifications && { notifications: { ...prev.notifications, ...data.notifications } }),
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const newSteps = [...steps]
      newSteps[currentStep].isCompleted = true
      newSteps[currentStep].isActive = false
      newSteps[currentStep + 1].isActive = true
      setSteps(newSteps)
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      const newSteps = [...steps]
      newSteps[currentStep].isActive = false
      newSteps[currentStep - 1].isActive = true
      setSteps(newSteps)
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      console.log("Submitting parent onboarding data:", formData)
    const response = await apiClient.post("/onboarding/parent", formData)
    if (!response) throw new Error("Failed to submit staff onboarding data")
    
      toast({
        title: "Account Configuration Complete",
        description: "Your parent account has been successfully configured. You now have access to the parent portal.",
      })

      router.replace(ROLE_ROUTES[user?.roleId as UserRole])
    } catch (error) {
      console.error("Parent onboarding submission failed:", error)
      toast({
        title: "Configuration Error",
        description: "Unable to complete account configuration. Please review your information and try again.",
        variant: "destructive",
      })
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep data={formData.profile} onUpdate={updatePersonalInfo} onNext={handleNext} />
      case 1:
        return (
          <ContactPreferencesStep
            data={{
              profile: formData.profile,
              emergencyContact: formData.emergencyContact,
              notifications: formData.notifications,
            }}
            onUpdate={updateContactPreferences}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <EmergencyContactStep
            data={{
              emergencyContact: formData.emergencyContact,
              notifications: formData.notifications,
            }}
            onUpdate={updateContactPreferences}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <SetupReviewStep
            data={formData}
            onUpdate={(data) => setFormData((prev) => ({ ...prev, ...data }))}
            user={user}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )
      default:
        return null
    }
  }


  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
      <OnboardingHeader user={user as any} logout={logout} />

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <Rocket className="h-4 w-4 mr-2" />
                Parent Portal Setup
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Parent Account Configuration</h1>
              <p className="text-lg text-gray-600 mb-8">
                Complete your parent account setup to access student information, academic reports, and school communications. 
                This process ensures secure and authorized access to your child's educational records.
              </p>

              {/* Step Indicator */}
              <StepIndicator steps={steps as any} currentStep={currentStep} />
            </div>
          </div>
        </section>

        {/* Form Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">{renderStepContent()}</div>
          </div>
        </section>

        <OnboardingFooter />
      </div>
    </ProtectedRoute>
  )
}
