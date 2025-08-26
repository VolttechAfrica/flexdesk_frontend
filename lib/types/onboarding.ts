// Onboarding specific types
export interface SchoolRegistrationRequest {
  // School Information
  schoolName: string
  schoolType: "PUBLIC" | "PRIVATE" | "CHARTER" | "INTERNATIONAL" | "OTHER"
  educationLevel: "ELEMENTARY" | "MIDDLE" | "HIGH" | "K12" | "UNIVERSITY" | "OTHER"
  studentCount: number
  staffCount: number

  // Contact Information
  contactFirstName: string
  contactLastName: string
  contactEmail: string
  contactPhone: string
  contactTitle: string

  // Address Information
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }

  // Plan Selection
  selectedPlan: "STARTER" | "PROFESSIONAL" | "ENTERPRISE"
  billingCycle: "MONTHLY" | "ANNUAL"

  // Additional Information
  currentSoftware?: string
  implementationTimeline: "IMMEDIATE" | "1_MONTH" | "3_MONTHS" | "6_MONTHS"
  specificNeeds?: string[]
  hearAboutUs?: string

  // Terms and Marketing
  acceptTerms: boolean
  acceptMarketing: boolean
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isActive: boolean
  isValid: boolean
}

export interface SchoolRegistrationResponse {
  id: string
  schoolName: string
  contactEmail: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  trialExpiresAt: string
  onboardingUrl: string
  setupTasks: OnboardingTask[]
}

export interface OnboardingTask {
  id: string
  title: string
  description: string
  isCompleted: boolean
  priority: "HIGH" | "MEDIUM" | "LOW"
  estimatedTime: string
}

export interface PlanFeature {
  name: string
  included: boolean
  limit?: string
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  period: "month" | "year"
  studentLimit: string
  popular: boolean
  features: PlanFeature[]
  ctaText: string
}
