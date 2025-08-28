"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/AuthContext"
import { Badge } from "@/components/ui/badge"
import { StepIndicator } from "@/components/shared/step-indicator"
import { PersonalInfoStep } from "@/components/pages/onboarding/staffs/personal-info-step"
import { ProfessionalInfoStep } from "@/components/pages/onboarding/staffs/professional-info-step"
import { AdditionalInfoStep } from "@/components/pages/onboarding/staffs/additional-info-step"
import { ReviewSubmitStep } from "@/components/pages/onboarding/staffs/review-submit-step"
import { Rocket, User, GraduationCap, Shield, CheckCircle } from "lucide-react"
import type { StaffOnboardingData } from "@/lib/types/staff-onboarding"
import { STAFF_ONBOARDING_STEPS } from "@/lib/types/staff-onboarding"
import { toast } from "@/hooks/use-toast"
import { OnboardingHeader } from "@/components/layout/Onboarding/Header"
import { apiClient } from "@/lib/api/client"
import { ROLE_ROUTES, UserRole } from "@/lib/types/auth"
import OnboardingFooter from "@/components/layout/Onboarding/Footer"
import { useCallback, useMemo } from "react"

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState(() => STAFF_ONBOARDING_STEPS)
  const { user, logout } = useAuth()
  const router = useRouter()

  // Ensure StepIndicator receives steps with required isValid property
  const indicatorSteps = useMemo(
    () => steps.map((s: any) => ({ ...s, isValid: s.isValid ?? true })),
    [steps]
  )

  const [formData, setFormData] = useState<StaffOnboardingData>({
    profile: {
        profilePicture: user?.profile?.profilePicture || "",
        dateOfBirth: user?.profile?.dateOfBirth || "",
        gender: user?.profile?.gender || "",
        phoneNumber: user?.profile?.phoneNumber || "",
        address: user?.profile?.address || "",
        state: user?.profile?.state || "",
        city: user?.profile?.city || "",
        lga: user?.profile?.lga || "",
    } as any,
    qualifications: [],
    emergencyContact: {
      name: "",
      relationship: "",
      phoneNumber: "",
    },
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  })

  const stepIcons = useMemo(() => [User, GraduationCap, Shield, CheckCircle], [])

  const updatePersonalInfo = useCallback((data: StaffOnboardingData["profile"]) => {
    setFormData((prev) => ({ ...prev, profile: data }))
  }, [])

  const updateProfessionalInfo = useCallback((data: StaffOnboardingData["qualifications"]) => {
    setFormData((prev) => ({ ...prev, qualifications: data }))
  }, [])

  const updateAdditionalInfo = useCallback((data: { emergencyContact?: any; notifications?: any }) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }, [])

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const newSteps = [...steps]
      newSteps[currentStep].isCompleted = true
      newSteps[currentStep].isActive = false
      newSteps[currentStep + 1].isActive = true
      setSteps(newSteps)
      setCurrentStep((s) => s + 1)
    }
  }, [currentStep, steps])

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      const newSteps = [...steps]
      newSteps[currentStep].isActive = false
      newSteps[currentStep - 1].isActive = true
      setSteps(newSteps)
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep, steps])

  const handleSubmit = useCallback(async () => {
    try {
      const response = await apiClient.post("/user/onboarding", formData)
      if (!response) throw new Error("Failed to submit staff onboarding data")
      router.replace(ROLE_ROUTES[user?.roleId as UserRole])
      toast({
        title: "Profile Setup Complete!",
        description: "Welcome to the platform. You can now access all features.",
      })
    } catch (error) {
      console.error("Onboarding submission failed:", error)
      toast({
        title: "Setup Failed",
        description: "There was an error completing your profile. Please try again.",
        variant: "destructive",
      })
    }
  }, [formData, router, user])

  const stepContent = useMemo(() => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep data={formData.profile} onUpdate={updatePersonalInfo} onNext={handleNext} />
      case 1:
        return (
          <ProfessionalInfoStep
            data={formData.qualifications}
            onUpdate={updateProfessionalInfo}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <AdditionalInfoStep
            data={{
              emergencyContact: formData.emergencyContact,
              notifications: formData.notifications,
            }}
            onUpdate={updateAdditionalInfo}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return <ReviewSubmitStep data={formData} onSubmit={handleSubmit} onBack={handleBack} />
      default:
        return null
    }
  }, [currentStep, formData, updatePersonalInfo, updateProfessionalInfo, updateAdditionalInfo, handleNext, handleBack, handleSubmit])

  return (
  
      <div className="min-h-screen bg-white">
        <OnboardingHeader user={user as any} logout={logout} />

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <Rocket className="h-4 w-4 mr-2" />
                Welcome, {user?.firstName}!
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Complete Your Profile Setup</h1>
              <p className="text-lg text-gray-600 mb-8">
                Help us personalize your experience by completing your staff profile. This will only take a few minutes.
              </p>

              {/* Step Indicator */}
              <StepIndicator steps={indicatorSteps} currentStep={currentStep} />
            </div>
          </div>
        </section>

        {/* Form Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">{stepContent}</div>
          </div>
        </section>

        <OnboardingFooter />
      </div>
  )
}
