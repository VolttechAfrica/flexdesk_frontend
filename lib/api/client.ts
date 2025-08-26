import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios"
import type { ApiResponse, RequestConfig } from "@/lib/types/api"
import { log } from "@/lib/services/logger"

// Environment configuration with validation
const getApiConfig = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is required")
  }
  
  return {
    baseURL,
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000"),
    retries: parseInt(process.env.NEXT_PUBLIC_API_RETRIES || "3"),
    retryDelay: parseInt(process.env.NEXT_PUBLIC_API_RETRY_DELAY || "1000"),
  } as const
}

// Check if we're in development mode (client-safe)
const isDevelopment = typeof window !== "undefined" && window.location.hostname === "localhost"

// Custom error class for API errors
export class ApiClientError extends Error {
  public readonly code: string
  public readonly status?: number
  public readonly details?: Record<string, any>
  public readonly requestId?: string

  constructor(message: string, code: string, status?: number, details?: Record<string, any>, requestId?: string) {
    super(message)
    this.name = "ApiClientError"
    this.code = code
    this.status = status
    this.details = details
    this.requestId = requestId
  }
}

// Request/Response interceptor types
type RequestInterceptor = (
  config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
type ErrorInterceptor = (error: AxiosError) => Promise<never> | Promise<AxiosResponse>

class ApiClient {
  private readonly client: AxiosInstance
  private readonly defaultConfig: RequestConfig
  private isRefreshing = false
  private failedQueue: Array<{
    resolve: (value: string | null) => void
    reject: (reason: any) => void
  }> = []

  constructor(config: RequestConfig = {}) {
    const apiConfig = getApiConfig()
    
    this.defaultConfig = {
      timeout: apiConfig.timeout,
      retries: apiConfig.retries,
      retryDelay: apiConfig.retryDelay,
      ...config,
    }

    this.client = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: this.defaultConfig.timeout,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Client-Version": process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
        "X-Client-Platform": "web",
        "X-Requested-With": "XMLHttpRequest", // CSRF protection
        ...this.defaultConfig.headers,
      },
      withCredentials: true, // Enable cookies for CSRF protection
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(this.requestInterceptor, this.requestErrorInterceptor)

    // Response interceptor
    this.client.interceptors.response.use(this.responseInterceptor, this.responseErrorInterceptor)
  }

  private requestInterceptor: RequestInterceptor = (config) => {
    // Add request ID for tracing
    const requestId = this.generateRequestId()
    config.headers = config.headers || {}
    config.headers["X-Request-ID"] = requestId

    // Add timestamp
    config.headers["X-Request-Timestamp"] = new Date().toISOString()

    // Add CSRF token if available
    const csrfToken = this.getCsrfToken()
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken
    }

    // Log request using structured logging
    log.api.request(
      config.method?.toUpperCase() || 'UNKNOWN',
      config.url || 'unknown',
      requestId,
      {
        headers: config.headers,
        data: config.data,
      }
    )

    return config
  }

  private requestErrorInterceptor = (error: AxiosError): Promise<never> => {
    log.error('API Request Error', error, { action: 'api_request_error' })
    return Promise.reject(error)
  }

  private responseInterceptor: ResponseInterceptor = (response) => {
    // Log response using structured logging
    log.api.response(
      response.status,
      response.config.url || 'unknown',
      response.config.headers?.["X-Request-ID"] as string || 'unknown',
      response.data
    )

    return response
  }

  private responseErrorInterceptor: ErrorInterceptor = async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean; _retryCount?: number }

    // Handle network errors
    if (!error.response) {
      const networkError = new ApiClientError(
        "Network error occurred. Please check your internet connection.",
        "NETWORK_ERROR",
        undefined,
        { originalError: error.message },
      )
      
      log.error('Network Error', networkError, { action: 'network_error' })
      throw networkError
    }

    const { status, data } = error.response
    const requestId = originalRequest?.headers?.["X-Request-ID"] as string

    // Handle authentication errors (401/403) with token refresh
    if (status === 401 || status === 403) {
      if (originalRequest && !originalRequest._retry) {
        originalRequest._retry = true
        
        try {
          // Try to refresh the token
          const newToken = await this.refreshAuthToken()
          if (newToken) {
            // Update the original request with new token
            originalRequest.headers = originalRequest.headers || {}
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            
            // Retry the original request
            return this.client.request(originalRequest)
          }
        } catch (refreshError) {
          // Token refresh failed, redirect to login
          this.handleAuthFailure()
          const authError = new ApiClientError(
            "Authentication failed. Please log in again.",
            "AUTH_FAILED",
            status,
            { originalError: error.message },
            requestId,
          )
          
          log.error('Authentication Failed', authError, { 
            action: 'auth_failed',
            requestId,
            status 
          })
          throw authError
        }
      }
    }

    // Handle retry logic for specific status codes
    if (this.shouldRetry(status) && this.canRetry(originalRequest)) {
      return this.retryRequest(originalRequest)
    }

    // Parse error response
    const apiError = this.parseErrorResponse(data, status, requestId)

    // Log error using structured logging
    log.api.error(status, originalRequest?.url || 'unknown', requestId || 'unknown', apiError, data)

    throw apiError
  }

  private shouldRetry(status: number): boolean {
    // Retry on server errors and rate limiting
    return status >= 500 || status === 429
  }

  private canRetry(config?: InternalAxiosRequestConfig & { _retry?: boolean; _retryCount?: number }): boolean {
    if (!config) return false

    const retryCount = config._retryCount || 0
    const maxRetries = this.defaultConfig.retries || 0

    return retryCount < maxRetries
  }

  private async retryRequest(
    config: InternalAxiosRequestConfig & { _retry?: boolean; _retryCount?: number },
  ): Promise<AxiosResponse> {
    config._retry = true
    config._retryCount = (config._retryCount || 0) + 1

    // Exponential backoff
    const delay = (this.defaultConfig.retryDelay || 1000) * Math.pow(2, config._retryCount - 1)
    
    log.info(`Retrying request (attempt ${config._retryCount})`, {
      requestId: config.headers?.["X-Request-ID"],
      delay,
      url: config.url
    })
    
    await this.sleep(delay)

    return this.client.request(config)
  }

  private parseErrorResponse(data: any, status: number, requestId?: string): ApiClientError {
    // Handle structured API error response
    if (data && typeof data === "object" && data.error) {
      return new ApiClientError(
        data?.message || "An error occurred",
        data.error.code || "UNKNOWN_ERROR",
        status,
        data.error.details,
        requestId,
      )
    }

    // Handle generic error responses
    const errorMessages: Record<number, string> = {
      400: "Bad request. Please check your input.",
      401: "Authentication required. Please log in.",
      403: "Access denied. You do not have permission to perform this action.",
      404: "The requested resource was not found.",
      409: "Conflict. The resource already exists or is in use.",
      422: "Validation error. Please check your input.",
      429: "Too many requests. Please try again later.",
      500: "Internal server error. Please try again later.",
      502: "Bad gateway. The server is temporarily unavailable.",
      503: "Service unavailable. Please try again later.",
      504: "Gateway timeout. The request took too long to process.",
    }

    const message = errorMessages[status] || "An unexpected error occurred"
    const code = `HTTP_${status}`

    return new ApiClientError(message, code, status, { originalData: data }, requestId)
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // CSRF token management
  private getCsrfToken(): string | null {
    if (typeof window === "undefined") return null
    
    // Get CSRF token from meta tag or cookie
    const metaTag = document.querySelector('meta[name="csrf-token"]')
    if (metaTag) {
      return metaTag.getAttribute('content')
    }
    
    // Fallback to cookie
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("csrf-token="))
      ?.split("=")[1]
    
    return token || null
  }

  // Token management methods - these should be handled server-side in production
  private getAuthToken(): string | null {
    // In production, tokens should be handled via httpOnly cookies
    // This is a fallback for development
    if (typeof window === "undefined") return null
    
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1]
    
    return token || null
  }

  private async refreshAuthToken(): Promise<string | null> {
    if (this.isRefreshing) {
      // If already refreshing, wait for it to complete
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject })
      })
    }

    this.isRefreshing = true

    try {
      const token = this.getAuthToken()
      if (!token) {
        throw new Error("No token to refresh")
      }

      // Import auth service dynamically to avoid circular dependency
      const { authService } = await import("@/lib/services/auth")
      await authService.refreshToken({ token })
      
      const newToken = this.getAuthToken()
      
      // Process queued requests
      this.failedQueue.forEach(({ resolve }) => {
        resolve(newToken as any)
      })
      this.failedQueue = []
      
      log.info('Token refreshed successfully', { action: 'token_refresh_success' })
      return newToken
    } catch (error) {
      // Process queued requests with error
      this.failedQueue.forEach(({ reject }) => {
        reject(error)
      })
      this.failedQueue = []
      
      log.error('Token refresh failed', error as Error, { action: 'token_refresh_failed' })
      throw error
    } finally {
      this.isRefreshing = false
    }
  }

  private handleAuthFailure(): void {
    // Clear token and redirect to login
    if (typeof window !== "undefined") {
      // Clear token cookie
      document.cookie = "token=; path=/; max-age=0; secure; samesite=strict"
      
      log.warn('Authentication failed, redirecting to login', { action: 'auth_failure_redirect' })
      
      // Redirect to login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
      }
    }
  }

  // Public API methods
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config)
    return response.data
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config)
    return response.data
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config)
    return response.data
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config)
    return response.data
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config)
    return response.data
  }

  // File upload method
  public async uploadFile<T = any>(
    url: string,
    file: File,
    onUploadProgress?: (progressEvent: any) => void,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
      onUploadProgress,
    })

    return response.data
  }

  // Health check method
  public async healthCheck(): Promise<boolean> {
    try {
      await this.get("/health")
      log.info('Health check passed', { action: 'health_check_success' })
      return true
    } catch (error) {
      log.error('Health check failed', error as Error, { action: 'health_check_failed' })
      return false
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export class for custom instances
export { ApiClient }
