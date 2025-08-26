export interface LoginRequest {
    email: string
    password: string
  }
  
  export interface SchoolData {
    id: string
    name: string
    shortName: string
    email: string
    phone: string
    address: string
    slogan: string
    logo: string
    website: string
    state: string
    lga: string
    country: string
    status: string
  }
  
  export interface UserProfileData {
    profilePicture: string
    dateOfBirth: string
    phoneNumber: string
    address: string
    state: string
    lga: string
    gender?: string
    city?: string
  }
  
  export interface AssignedClassData {
    classId: string
    classArmId: string
  }
  
  export interface AssignedSubjectData {
    subject: {
      id: string
      name: string
      code: string
    }
  }
  
  export interface StudentData {
    id: string
    firstName: string
    lastName: string
    class: {
      id: string
      name: string
      level: number
    }
    classArm: {
      id: string
      name: string
    }
    school: {
      id: string
      name: string
      shortName: string
    }
  }
  
  export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    otherName?: string
    status: string
    userType: "staff" | "parent" | "student" | "bursar" 
    schoolId: string
    roleId: string
    type?: "ADMIN" | "CLASS_ROOM_TEACHER" | "SUBJECT_TEACHER" | "OTHER"
    role: string
    school: SchoolData
    profile: UserProfileData
    assignedClasses: AssignedClassData[]
    assignedSubjects: AssignedSubjectData[]
    phone: string
    address: string
    state: string
    lga: string
    city: string
    children?: StudentData[]
  }
  
  export interface LoginResponse {
    status: boolean
    message: string
    token: string
    userType: "staff" | "parent" | "student" | "bursar" 
    permissions: string[]
    data: {
      user: User
      firstTimeLogin?: boolean
    }
  }
  
  export interface AuthContextType {
    user: User | null
    token: string | null
    permissions: string[]
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    login: (credentials: LoginRequest) => Promise<void>
    logout: () => void
    refreshAuth: () => Promise<void>
  }
  
  export type UserRole = "801" | "802" | "803" | "805" | "804" | "807" | "800"
  
  export const ROLE_ROUTES: Record<UserRole, string> = {
    "801": "/admin/dashboard", // Admin (can also be Super Admin)
    "802": "/superadmin/dashboard", // Super Admin
    "800": "/superadmin/dashboard", // Super Admin
    "803": "/teacher/dashboard", // Teacher
    "805": "/parent/dashboard", // Parent
    "804": "/student/dashboard", // Student
    "807": "/bursar/dashboard", // Bursar
  }
  