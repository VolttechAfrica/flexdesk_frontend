export interface StaffProfile {
    profilePicture?: string
    dateOfBirth?: string
    gender?: string
    phoneNumber?: string
    address?: string
    state?: string
    city?: string
    lga?: string
  }
  
  export interface StaffQualification {
    qualification: string
    institution: string
    course: string
    grade?: string
    yearObtained?: string
  }
  
  export interface StaffOnboardingData {
    // Personal Information
    profile: StaffProfile
  
    // Professional Information
    qualifications: StaffQualification[]
  
    // Additional Information
    emergencyContact?: {
      name: string
      relationship: string
      phoneNumber: string
    }
  
    // Preferences
    notifications?: {
      email: boolean
      sms: boolean
      push: boolean
    }
  }
  
  export interface StaffOnboardingStep {
    id: string
    title: string
    description: string
    isCompleted: boolean
    isActive: boolean
  }
  
  export const STAFF_ONBOARDING_STEPS: StaffOnboardingStep[] = [
    {
      id: "personal",
      title: "Personal Information",
      description: "Basic personal details and contact information",
      isCompleted: false,
      isActive: true,
    },
    {
      id: "professional",
      title: "Professional Details",
      description: "Educational qualifications and experience",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "additional",
      title: "Additional Information",
      description: "Emergency contacts and preferences",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "review",
      title: "Review & Submit",
      description: "Review your information and complete setup",
      isCompleted: false,
      isActive: false,
    },
  ]
  