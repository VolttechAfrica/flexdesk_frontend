import { StudentData } from "./auth"

export interface ParentProfile {
    profilePicture?: string
    firstName?: string
    lastName?: string
    otherName?: string
    phone?: string
    altPhone?: string 
    address?: string
    state?: string
    lga?: string
    city?: string
    preferredContactMethod?: "EMAIL" | "SMS" | "WHATSAPP"
  }
  
  export interface ParentEmergencyContact {
    name: string
    relationship: string
    phoneNumber: string
    email?: string
  }
  
  export interface ParentNotificationPreferences {
    email: boolean
    sms: boolean
    whatsapp: boolean
    schoolUpdates: boolean
    academicReports: boolean
    eventNotifications: boolean
    emergencyAlerts: boolean
  }
  
  export interface ParentOnboardingData {
    profile: ParentProfile
    emergencyContact: ParentEmergencyContact
    notifications: ParentNotificationPreferences
    children?: StudentData[]
  }
  
  export interface OnboardingStep {
    id: string
    title: string
    description: string
    isCompleted: boolean
    isActive: boolean
  }
  
  export const PARENT_ONBOARDING_STEPS: OnboardingStep[] = [
    {
      id: "personal-info",
      title: "Personal Information",
      description: "Configure personal details and contact information",
      isCompleted: false,
      isActive: true,
    },
    {
      id: "contact-preferences",
      title: "Contact & Communication",
      description: "Establish communication preferences and secondary contacts",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "emergency-info",
      title: "Emergency Contact & Notifications",
      description: "Configure emergency contacts and notification preferences",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "review-submit",
      title: "Account Review & Configuration",
      description: "Review account information and complete configuration",
      isCompleted: false,
      isActive: false,
    },
  ]
  

  