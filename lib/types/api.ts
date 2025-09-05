// Base API types
export interface ApiResponse<T = any> {
  // Some endpoints may return `status` instead of `success`.
  // Keep both for compatibility; prefer `success` when available.
  status?: boolean
  success: boolean
  data: T
  message: string
  timestamp: string
  requestId: string
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, any>
  }
  timestamp: string
  requestId: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Support form specific types
export interface SupportTicketRequest {
  schoolId?: string
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  priority?:"LOW" | "MEDIUM" | "HIGH" | "URGENT"
  category?: "TECHNICAL" | "BILLING" | "GENERAL" | "FEATURE_REQUEST" | "OTHERS"
  attachments?: File[]
}

export interface SupportTicket {
  id: string
  ticketNumber: string
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  category:"TECHNICAL" | "BILLING" | "GENERAL" | "FEATURE_REQUEST" | "OTHERS"
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  assignedTo?: string
  createdAt: string
  updatedAt: string
  attachments?: SupportAttachment[]
}

export interface SupportAttachment {
  id: string
  filename: string
  size: number
  mimeType: string
  url: string
  uploadedAt: string
}

// HTTP method types
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

// Request configuration
export interface RequestConfig {
  timeout?: number
  retries?: number
  retryDelay?: number
  headers?: Record<string, string>
}
