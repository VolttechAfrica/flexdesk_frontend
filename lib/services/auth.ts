import type { LoginRequest, LoginResponse, User } from "@/lib/types/auth"
import { apiClient } from "@/lib/api/client"
import { log } from "@/lib/services/logger"

class AuthService {
  private static instance: AuthService

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  private endPoints() {
    return {
      LOGIN: "/auth/login",
      LOGOUT: "/auth/logout",
      REFRESH_TOKEN: "/auth/token/refresh",
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(this.endPoints().LOGIN, credentials)
      const { data, status, message } = response as any
      if (!status) {
        throw new Error(message || "Login failed")
      }
      // Store user info in localStorage (non-sensitive data only)
      this.setAuthUser(data.user)
      // This is a fallback for development
      if (typeof window !== "undefined") {
        this.setAuthTokenFallback(data.token)
      }

      return data
    } catch (error) {
      log.error("Login service error", error as Error, { action: 'login_error' })
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Network error occurred")
    }
  }

  async logout(): Promise<void> {
    try {
      const user = this.getAuthUser()
      const response = await apiClient.post<void>(this.endPoints().LOGOUT)
      
      log.auth('User logout successful', user?.id)
      return response.data
    } catch (error) {
      log.error("Logout error", error as Error, { action: 'logout_error' })
    } finally {
      this.clearAuthData()
    }
  }

  async refreshToken({ token }: { token: string }): Promise<void> {
    try {
      if (!token) throw new Error("Token is required")
      const userId = this.getAuthUser()?.id
      if (!userId) throw new Error("User ID is required")
      const response = await apiClient.post<{ status: boolean, token: string }>(this.endPoints().REFRESH_TOKEN, { token, userId })
      
      const { data: { token: newToken, status } } = response
      if (!status) throw new Error("Authentication error, login again");
      
      // Update token in fallback storage (development only)
      if (typeof window !== "undefined") {
        this.setAuthTokenFallback(newToken)
      }

      log.auth('Token refresh successful', userId)
    } catch (error) {
      log.error("Refresh token error", error as Error, { action: 'token_refresh_error' })
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Network error occurred")
    }
  }

  // Development fallback token storage - REMOVE IN PRODUCTION
  private setAuthTokenFallback(token: string): void {
    if (!isDevelopment()) {
      log.warn("Client-side token storage should not be used in production", { action: 'security_warning' })
      return
    }
    
    try {
      if (!token) throw new Error("Token is required")
      if (typeof window !== "undefined") {
        const isHttps = window.location.protocol === "https:"
        const secureAttr = isHttps ? "secure; " : ""
        // Use lax in dev to avoid CSRF issues with redirects; strict in prod
        const sameSite = isHttps ? "strict" : "lax"
        document.cookie = `token=${token}; path=/; max-age=3600; ${secureAttr}samesite=${sameSite}`
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }

  private setAuthUser(user: User): void {
    if (typeof window !== "undefined") {
      // Only store non-sensitive user data
      const safeUserData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
        userType: user.userType,
        profile: user?.profile,
        school: user?.school,
      }
      localStorage.setItem("user", JSON.stringify(safeUserData))
    }
  }

  public getAuthUser(): User | null {
    if (typeof window !== "undefined") {
      try {
        const user = localStorage.getItem("user")
        return user ? JSON.parse(user) : null
      } catch (error) {
        log.error("Error parsing user data", error as Error, { action: 'user_data_parse_error' })
        // Clear corrupted data
        localStorage.removeItem("user")
        return null
      }
    }
    return null
  }

  public clearAuthData(): void {
    if (typeof window !== "undefined") {
      // Clear user data
      localStorage.removeItem("user")
      
      // Clear fallback token cookie
      const isHttps = window.location.protocol === "https:"
      const secureAttr = isHttps ? "secure; " : ""
      const sameSite = isHttps ? "strict" : "lax"
      document.cookie = `token=; path=/; max-age=0; ${secureAttr}samesite=${sameSite}`
      
      log.info('Auth data cleared', { action: 'auth_data_clear' })
    }
  }

  getStoredToken(): string | null {
    if (!isDevelopment()) {
      return null
    }
    
    if (typeof window === "undefined") return null
    
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1]
    
    return token || null
  }

  isTokenExpired(token: string): boolean {
    try {
      if (!token || typeof token !== 'string') {
        return true
      }
      
      const parts = token.split('.')
      if (parts.length !== 3) {
        return true
      }
      
      const payload = JSON.parse(atob(parts[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      
      // Check if token has expiration
      if (!payload.exp || typeof payload.exp !== 'number') {
        return true
      }
      
      // Add 5 minute buffer for refresh
      return payload.exp < (currentTime + 300)
    } catch (error) {
      if (isDevelopment()) {
        log.error("Token validation error", error as Error, { action: 'token_validation_error' })
      }
      return true // If we can't parse the token, consider it expired
    }
  }

  // Get token expiration time with validation
  getTokenExpiration(token: string): Date | null {
    try {
      if (!token || typeof token !== 'string') {
        return null
      }
      
      const parts = token.split('.')
      if (parts.length !== 3) {
        return null
      }
      
      const payload = JSON.parse(atob(parts[1]))
      
      if (!payload.exp || typeof payload.exp !== 'number') {
        return null
      }
      
      return new Date(payload.exp * 1000)
    } catch (error) {
      if (isDevelopment()) {
        log.error("Error getting token expiration", error as Error, { action: 'token_expiration_error' })
      }
      return null
    }
  }

  // Validate token structure
  isValidTokenFormat(token: string): boolean {
    try {
      if (!token || typeof token !== 'string') {
        return false
      }
      
      const parts = token.split('.')
      if (parts.length !== 3) {
        return false
      }
      
      // Basic format validation
      const header = JSON.parse(atob(parts[0]))
      const payload = JSON.parse(atob(parts[1]))
      
      return header.alg && payload.exp && payload.iat
    } catch {
      return false
    }
  }
}

// Development mode check
function isDevelopment(): boolean {
  return typeof window !== "undefined" && 
         (window.location.hostname === "localhost" || 
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname.includes("localhost"))
}

export const authService = AuthService.getInstance()
