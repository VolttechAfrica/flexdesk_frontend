"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StepIndicator } from "@/components/shared/step-indicator"
import { FormSection } from "@/components/shared/form-section"
import { InputField, SelectField } from "@/components/shared/form-field"
import { CheckboxField } from "@/components/shared/checkbox-field"
import { MultiSelectField } from "@/components/shared/multi-select-field"
import type { SchoolRegistrationRequest, OnboardingStep } from "@/lib/types/onboarding"
import {
  onboardingSteps as initialSteps,
  countries,
  schoolTypes,
  educationLevels,
  studentCountRanges,
  staffCountRanges,
  implementationTimelines,
  hearAboutUsOptions,
  specificNeedsOptions,
} from "@/lib/data/onboarding"
import { Rocket, ArrowLeft, ArrowRight, CheckCircle, Loader2, School, Users, Settings, FileCheck } from "lucide-react"

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<OnboardingStep[]>(initialSteps)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<SchoolRegistrationRequest>({
    // School Information
    schoolName: "",
    schoolType: "PUBLIC",
    educationLevel: "K12",
    studentCount: 200,
    staffCount: 25,

    // Contact Information
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
    contactTitle: "",

    // Address Information
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    },

    // Plan Selection (default values)
    selectedPlan: "PROFESSIONAL",
    billingCycle: "ANNUAL",

    // Additional Information
    currentSoftware: "",
    implementationTimeline: "1_MONTH",
    specificNeeds: [],
    hearAboutUs: "",

    // Terms and Marketing
    acceptTerms: false,
    acceptMarketing: false,
  })

  const stepIcons = [School, Users, Settings, FileCheck]

  const updateFormData = (field: keyof SchoolRegistrationRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const updateAddressData = (field: keyof SchoolRegistrationRequest["address"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }))
    // Clear error when user starts typing
    const errorKey = `address.${field}`
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: "" }))
    }
  }

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    switch (currentStep) {
      case 0: // School Information
        if (!formData.schoolName.trim()) newErrors.schoolName = "School name is required"
        if (!formData.schoolType) newErrors.schoolType = "School type is required"
        if (!formData.educationLevel) newErrors.educationLevel = "Education level is required"
        if (!formData.studentCount) newErrors.studentCount = "Student count is required"
        if (!formData.staffCount) newErrors.staffCount = "Staff count is required"
        break

      case 1: // Contact Information
        if (!formData.contactFirstName.trim()) newErrors.contactFirstName = "First name is required"
        if (!formData.contactLastName.trim()) newErrors.contactLastName = "Last name is required"
        if (!formData.contactEmail.trim()) newErrors.contactEmail = "Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
          newErrors.contactEmail = "Invalid email format"
        }
        if (!formData.contactPhone.trim()) newErrors.contactPhone = "Phone number is required"
        if (!formData.contactTitle.trim()) newErrors.contactTitle = "Title is required"
        if (!formData.address.street.trim()) newErrors["address.street"] = "Street address is required"
        if (!formData.address.city.trim()) newErrors["address.city"] = "City is required"
        if (!formData.address.state.trim()) newErrors["address.state"] = "State is required"
        if (!formData.address.zipCode.trim()) newErrors["address.zipCode"] = "ZIP code is required"
        if (!formData.address.country.trim()) newErrors["address.country"] = "Country is required"
        break

      case 2: // Additional Information
        if (!formData.implementationTimeline) {
          newErrors.implementationTimeline = "Implementation timeline is required"
        }
        break

      case 3: // Review & Submit
        if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms and conditions"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      const newSteps = [...steps]
      newSteps[currentStep].isCompleted = true
      newSteps[currentStep].isActive = false
      newSteps[currentStep].isValid = true

      if (currentStep < steps.length - 1) {
        newSteps[currentStep + 1].isActive = true
        setCurrentStep(currentStep + 1)
      }

      setSteps(newSteps)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      const newSteps = [...steps]
      newSteps[currentStep].isActive = false
      newSteps[currentStep - 1].isActive = true
      setCurrentStep(currentStep - 1)
      setSteps(newSteps)
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update final step
      const newSteps = [...steps]
      newSteps[currentStep].isCompleted = true
      setSteps(newSteps)

      // Redirect to success page or dashboard
      console.log("Registration submitted:", formData)
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <FormSection title="School Information" description="Tell us about your educational institution">
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="School Name"
                  value={formData.schoolName}
                  onChange={(value) => updateFormData("schoolName", value)}
                  placeholder="Enter your school name"
                  required
                  error={errors.schoolName}
                  className="md:col-span-2"
                />

                <SelectField
                  label="School Type"
                  value={formData.schoolType}
                  onChange={(value) => updateFormData("schoolType", value)}
                  options={schoolTypes}
                  required
                  error={errors.schoolType}
                />

                <SelectField
                  label="Education Level"
                  value={formData.educationLevel}
                  onChange={(value) => updateFormData("educationLevel", value)}
                  options={educationLevels}
                  required
                  error={errors.educationLevel}
                />

                <SelectField
                  label="Number of Students"
                  value={formData.studentCount.toString()}
                  onChange={(value) => updateFormData("studentCount", Number.parseInt(value))}
                  options={studentCountRanges.map((range) => ({
                    value: range.value.toString(),
                    label: range.label,
                  }))}
                  required
                  error={errors.studentCount}
                />

                <SelectField
                  label="Number of Staff"
                  value={formData.staffCount.toString()}
                  onChange={(value) => updateFormData("staffCount", Number.parseInt(value))}
                  options={staffCountRanges.map((range) => ({
                    value: range.value.toString(),
                    label: range.label,
                  }))}
                  required
                  error={errors.staffCount}
                />
              </div>
            </FormSection>
          </div>
        )

      case 1:
        return (
          <div className="space-y-8">
            <FormSection title="Contact Information" description="Primary contact details for your school account">
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  value={formData.contactFirstName}
                  onChange={(value) => updateFormData("contactFirstName", value)}
                  placeholder="Enter first name"
                  required
                  error={errors.contactFirstName}
                />

                <InputField
                  label="Last Name"
                  value={formData.contactLastName}
                  onChange={(value) => updateFormData("contactLastName", value)}
                  placeholder="Enter last name"
                  required
                  error={errors.contactLastName}
                />

                <InputField
                  label="Email Address"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(value) => updateFormData("contactEmail", value)}
                  placeholder="Enter email address"
                  required
                  error={errors.contactEmail}
                />

                <InputField
                  label="Phone Number"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(value) => updateFormData("contactPhone", value)}
                  placeholder="Enter phone number"
                  required
                  error={errors.contactPhone}
                />

                <InputField
                  label="Job Title"
                  value={formData.contactTitle}
                  onChange={(value) => updateFormData("contactTitle", value)}
                  placeholder="e.g., Principal, IT Director"
                  required
                  error={errors.contactTitle}
                  className="md:col-span-2"
                />
              </div>
            </FormSection>

            <FormSection title="School Address" description="Physical location of your school">
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Street Address"
                  value={formData.address.street}
                  onChange={(value) => updateAddressData("street", value)}
                  placeholder="Enter street address"
                  required
                  error={errors["address.street"]}
                  className="md:col-span-2"
                />

                <InputField
                  label="City"
                  value={formData.address.city}
                  onChange={(value) => updateAddressData("city", value)}
                  placeholder="Enter city"
                  required
                  error={errors["address.city"]}
                />

                <InputField
                  label="State/Province"
                  value={formData.address.state}
                  onChange={(value) => updateAddressData("state", value)}
                  placeholder="Enter state or province"
                  required
                  error={errors["address.state"]}
                />

                <InputField
                  label="ZIP/Postal Code"
                  value={formData.address.zipCode}
                  onChange={(value) => updateAddressData("zipCode", value)}
                  placeholder="Enter ZIP or postal code"
                  required
                  error={errors["address.zipCode"]}
                />

                <SelectField
                  label="Country"
                  value={formData.address.country}
                  onChange={(value) => updateAddressData("country", value)}
                  options={countries}
                  required
                  error={errors["address.country"]}
                />
              </div>
            </FormSection>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <FormSection title="Additional Information" description="Help us customize your FlexDesk experience">
              <div className="space-y-6">
                <InputField
                  label="Current Software"
                  value={formData.currentSoftware || ""}
                  onChange={(value) => updateFormData("currentSoftware", value)}
                  placeholder="What school management software do you currently use?"
                  description="This helps us with data migration and integration"
                />

                <SelectField
                  label="Implementation Timeline"
                  value={formData.implementationTimeline}
                  onChange={(value) => updateFormData("implementationTimeline", value)}
                  options={implementationTimelines}
                  required
                  error={errors.implementationTimeline}
                  description="When would you like to start using FlexDesk?"
                />

                <MultiSelectField
                  label="Specific Needs"
                  options={specificNeedsOptions.map((need) => ({ value: need, label: need }))}
                  value={formData.specificNeeds || []}
                  onChange={(value) => updateFormData("specificNeeds", value)}
                  placeholder="Select your priority features"
                  description="What features are most important to your school?"
                />

                <SelectField
                  label="How did you hear about us?"
                  value={formData.hearAboutUs || ""}
                  onChange={(value) => updateFormData("hearAboutUs", value)}
                  options={hearAboutUsOptions.map((option) => ({ value: option, label: option }))}
                  placeholder="Select an option"
                />
              </div>
            </FormSection>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <FormSection title="Review Your Information" description="Please review your details before submitting">
              <div className="space-y-6">
                {/* School Information Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">School Information</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">School Name:</span>
                      <span className="ml-2 font-medium">{formData.schoolName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-2 font-medium">
                        {schoolTypes.find((t) => t.value === formData.schoolType)?.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Education Level:</span>
                      <span className="ml-2 font-medium">
                        {educationLevels.find((l) => l.value === formData.educationLevel)?.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Students:</span>
                      <span className="ml-2 font-medium">
                        {studentCountRanges.find((r) => r.value === formData.studentCount)?.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <span className="ml-2 font-medium">
                        {formData.contactFirstName} {formData.contactLastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2 font-medium">{formData.contactEmail}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <span className="ml-2 font-medium">{formData.contactPhone}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Title:</span>
                      <span className="ml-2 font-medium">{formData.contactTitle}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-gray-600">Address:</span>
                      <span className="ml-2 font-medium">
                        {formData.address.street}, {formData.address.city}, {formData.address.state}{" "}
                        {formData.address.zipCode}, {countries.find((c) => c.value === formData.address.country)?.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Information Summary */}
                {(formData.currentSoftware || formData.specificNeeds?.length || formData.hearAboutUs) && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Additional Information</h4>
                    <div className="space-y-2 text-sm">
                      {formData.currentSoftware && (
                        <div>
                          <span className="text-gray-600">Current Software:</span>
                          <span className="ml-2 font-medium">{formData.currentSoftware}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-600">Implementation Timeline:</span>
                        <span className="ml-2 font-medium">
                          {implementationTimelines.find((t) => t.value === formData.implementationTimeline)?.label}
                        </span>
                      </div>
                      {formData.specificNeeds && formData.specificNeeds.length > 0 && (
                        <div>
                          <span className="text-gray-600">Priority Features:</span>
                          <span className="ml-2 font-medium">{formData.specificNeeds.join(", ")}</span>
                        </div>
                      )}
                      {formData.hearAboutUs && (
                        <div>
                          <span className="text-gray-600">How you heard about us:</span>
                          <span className="ml-2 font-medium">{formData.hearAboutUs}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <CheckboxField
                    id="acceptTerms"
                    label={
                      <span>
                        I agree to the{" "}
                        <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                          Privacy Policy
                        </a>
                      </span>
                    }
                    checked={formData.acceptTerms}
                    onChange={(checked) => updateFormData("acceptTerms", checked)}
                    required
                    error={errors.acceptTerms}
                  />

                  <CheckboxField
                    id="acceptMarketing"
                    label="I would like to receive product updates, educational content, and promotional emails from FlexDesk"
                    checked={formData.acceptMarketing}
                    onChange={(checked) => updateFormData("acceptMarketing", checked)}
                  />
                </div>
              </div>
            </FormSection>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Rocket className="h-4 w-4 mr-2" />
              Get Started
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Transform Your School with FlexDesk</h1>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of schools worldwide. Set up your account in just a few minutes and start your free trial.
            </p>

            {/* Step Indicator */}
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </div>

              {currentStep === steps.length - 1 ? (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Registration
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex items-center">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
