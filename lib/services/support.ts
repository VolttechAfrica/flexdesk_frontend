import { apiClient } from "@/lib/api/client"
import type {
  SupportTicketRequest,
  SupportTicket,
  SupportAttachment,
  ApiResponse,
  PaginatedResponse,
} from "@/lib/types/api"

// Support API endpoints
const ENDPOINTS = {
  TICKETS: "/support/tickets",
  TICKET_BY_ID: (id: string) => `/support/tickets/${id}`,
  ATTACHMENTS: "/support/attachments",
  CATEGORIES: "/support/categories",
  PRIORITIES: "/support/priorities",
} as const

// Client-safe development check
const isDevelopment = typeof window !== "undefined" && window.location.hostname === "localhost"

// Support service class
export class SupportService {
  /**
   * Create a new support ticket
   */
  public async createTicket(ticketData: SupportTicketRequest): Promise<ApiResponse<SupportTicket>> {
    // Validate required fields
    this.validateTicketData(ticketData)

    // Prepare the payload
    const payload = {
      firstName: ticketData.firstName.trim(),
      lastName: ticketData.lastName.trim(),
      email: ticketData.email.toLowerCase().trim(),
      subject: ticketData.subject.trim(),
      message: ticketData.message.trim(),
      priority: ticketData.priority || "MEDIUM",
      category: ticketData.category || "GENERAL",
    }

    try {
      const response = await apiClient.post<SupportTicket>(ENDPOINTS.TICKETS, payload)

      // Handle file attachments if present
      if (ticketData.attachments && ticketData.attachments.length > 0) {
        await this.uploadAttachments(response.data.id, ticketData.attachments)
      }

      // Log success in development (client-safe)
      if (isDevelopment) {
        console.log("Support ticket created successfully:", response)
      }

      return response
    } catch (error) {
      // Log error in development (client-safe)
      if (isDevelopment) {
        console.error("Failed to create support ticket:", error)
      }
      // Add context to the error
      throw this.enhanceError(error, "Failed to create support ticket")
    }
  }

  /**
   * Get ticket by ID
   */
  public async getTicket(ticketId: string): Promise<ApiResponse<SupportTicket>> {
    if (!ticketId?.trim()) {
      throw new Error("Ticket ID is required")
    }

    try {
      return await apiClient.get<SupportTicket>(ENDPOINTS.TICKET_BY_ID(ticketId))
    } catch (error) {
      if (isDevelopment) {
        console.error(`Failed to fetch ticket ${ticketId}:`, error)
      }
      throw this.enhanceError(error, `Failed to fetch ticket ${ticketId}`)
    }
  }

  /**
   * Get paginated list of tickets
   */
  public async getTickets(
    page = 1,
    limit = 20,
    filters?: {
      status?: string
      priority?: string
      category?: string
      email?: string
    },
  ): Promise<PaginatedResponse<SupportTicket>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    })

    try {
      return await apiClient.get<SupportTicket[]>(`${ENDPOINTS.TICKETS}?${params}`) as PaginatedResponse<SupportTicket>
    } catch (error) {
      if (isDevelopment) {
        console.error("Failed to fetch tickets:", error)
      }
      throw this.enhanceError(error, "Failed to fetch tickets")
    }
  }

  /**
   * Update ticket status
   */
  public async updateTicketStatus(
    ticketId: string,
    status: SupportTicket["status"],
  ): Promise<ApiResponse<SupportTicket>> {
    if (!ticketId?.trim()) {
      throw new Error("Ticket ID is required")
    }

    if (!["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"].includes(status)) {
      throw new Error("Invalid ticket status")
    }

    try {
      return await apiClient.patch<SupportTicket>(ENDPOINTS.TICKET_BY_ID(ticketId), { status })
    } catch (error) {
      if (isDevelopment) {
        console.error(`Failed to update ticket ${ticketId} status:`, error)
      }
      throw this.enhanceError(error, `Failed to update ticket ${ticketId} status`)
    }
  }

  /**
   * Upload attachments for a ticket
   */
  public async uploadAttachments(ticketId: string, files: File[]): Promise<ApiResponse<SupportAttachment[]>> {
    if (!ticketId?.trim()) {
      throw new Error("Ticket ID is required")
    }

    if (!files?.length) {
      throw new Error("No files provided")
    }

    // Validate files
    this.validateAttachments(files)

    try {
      const uploadPromises = files.map((file) =>
        apiClient.uploadFile<SupportAttachment>(`${ENDPOINTS.ATTACHMENTS}?ticketId=${ticketId}`, file),
      )

      const responses = await Promise.all(uploadPromises)
      const attachments = responses.map((response) => response.data)

      if (isDevelopment) {
        console.log("Attachments uploaded successfully:", attachments)
      }

      return {
        success: true,
        data: attachments,
        message: "Attachments uploaded successfully",
        timestamp: new Date().toISOString(),
        requestId: `upload_${Date.now()}`,
      }
    } catch (error) {
      if (isDevelopment) {
        console.error("Failed to upload attachments:", error)
      }
      throw this.enhanceError(error, "Failed to upload attachments")
    }
  }

  /**
   * Get available ticket categories
   */
  public async getCategories(): Promise<ApiResponse<string[]>> {
    try {
      return await apiClient.get<string[]>(ENDPOINTS.CATEGORIES)
    } catch (error) {
      if (isDevelopment) {
        console.warn("Failed to fetch categories from API, using defaults:", error)
      }
      // Return default categories if API fails
      return {
        success: true,
        data: ["TECHNICAL", "BILLING", "GENERAL", "FEATURE_REQUEST", "OTHER"],
        message: "Default categories loaded",
        timestamp: new Date().toISOString(),
        requestId: `categories_${Date.now()}`,
      }
    }
  }

  /**
   * Get available ticket priorities
   */
  public async getPriorities(): Promise<ApiResponse<string[]>> {
    try {
      return await apiClient.get<string[]>(ENDPOINTS.PRIORITIES)
    } catch (error) {
      if (isDevelopment) {
        console.warn("Failed to fetch priorities from API, using defaults:", error)
      }
      // Return default priorities if API fails
      return {
        success: true,
        data: ["LOW", "MEDIUM", "HIGH", "URGENT"],
        message: "Default priorities loaded",
        timestamp: new Date().toISOString(),
        requestId: `priorities_${Date.now()}`,
      }
    }
  }

  /**
   * Validate ticket data
   */
  private validateTicketData(data: SupportTicketRequest): void {
    const errors: string[] = []

    if (!data.firstName?.trim()) {
      errors.push("First name is required")
    }

    if (!data.lastName?.trim()) {
      errors.push("Last name is required")
    }

    if (!data.email?.trim()) {
      errors.push("Email is required")
    } else if (!this.isValidEmail(data.email)) {
      errors.push("Invalid email format")
    }

    if (!data.subject?.trim()) {
      errors.push("Subject is required")
    } else if (data.subject.trim().length < 5) {
      errors.push("Subject must be at least 5 characters long")
    }

    if (!data.message?.trim()) {
      errors.push("Message is required")
    } else if (data.message.trim().length < 10) {
      errors.push("Message must be at least 10 characters long")
    }

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(", ")}`)
    }
  }

  /**
   * Validate file attachments
   */
  private validateAttachments(files: File[]): void {
    const maxFileSize = 10 * 1024 * 1024 // 10MB
    const maxFiles = 5
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (files.length > maxFiles) {
      throw new Error(`Maximum ${maxFiles} files allowed`)
    }

    for (const file of files) {
      if (file.size > maxFileSize) {
        throw new Error(`File "${file.name}" exceeds maximum size of 10MB`)
      }

      if (!allowedTypes.includes(file.type)) {
        throw new Error(`File type "${file.type}" is not allowed for "${file.name}"`)
      }
    }
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Enhance error with additional context
   */
  private enhanceError(error: any, context: string): Error {
    if (error instanceof Error) {
      error.message = `${context}: ${error.message}`
    }
    return error
  }
}

// Export singleton instance
export const supportService = new SupportService()

// Export class for custom instances
