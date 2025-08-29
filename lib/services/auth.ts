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
      log.info("Login successful", { userId: data.user?.id, action: 'login_success' })
      this.setAuthUser(data.user)
      if (typeof window !== "undefined") {
        this.setAccessTokenFallback(data.accessToken)
        this.setRefreshTokenFallback(data.refreshToken)
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
      const response = await apiClient.post<{ status: boolean, token: string }>(this.endPoints().REFRESH_TOKEN)
      
      const { data: { token: newToken, status } } = response
      if (!status) throw new Error("Authentication error, login again");
      
      if (typeof window !== "undefined") {
        this.setAccessTokenFallback(newToken)
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


  private setRefreshTokenFallback(token: string): void {
 
    try {
      if (!token) throw new Error("Token is required")
      if (typeof window !== "undefined") {
        const isHttps = window.location.protocol === "https:"
        const secureAttr = isHttps ? "secure; " : ""
        const sameSite = isHttps ? "strict" : "lax"
        document.cookie = `refresh_token=${token}; path=/; max-age=604800; ${secureAttr}samesite=${sameSite}`
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }

  private setAccessTokenFallback(token: string): void {
    try {
      if (!token) throw new Error("Token is required")
      if (typeof window !== "undefined") {
        const isHttps = window.location.protocol === "https:"
        const secureAttr = isHttps ? "secure; " : ""
        const sameSite = isHttps ? "strict" : "lax"
        document.cookie = `access_token=${token}; path=/; max-age=3600; ${secureAttr}samesite=${sameSite}`
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }

  private setAuthUser(user: User): void {
    if (typeof window !== "undefined") {
      const safeUserData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
        userType: user.userType,
        profile: user?.profile,
        school: user?.school,
        assignedClasses: user?.assignedClasses,
        assignedSubjects: user?.assignedSubjects,
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
        localStorage.removeItem("user")
        return null
      }
    }
    return null
  }

  public clearAuthData(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      
      const isHttps = window.location.protocol === "https:"
      const secureAttr = isHttps ? "secure; " : ""
      const sameSite = isHttps ? "strict" : "lax"
      document.cookie = `access_token=; path=/; max-age=0; ${secureAttr}samesite=${sameSite}`
      document.cookie = `refresh_token=; path=/; max-age=0; ${secureAttr}samesite=${sameSite}`
      
      log.info('Auth data cleared', { action: 'auth_data_clear' })
    }
  }

  getStoredToken(): string | null {
    if (typeof window === "undefined") return null
    
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("access_token="))
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
      
      if (!payload.exp || typeof payload.exp !== 'number') {
        return true
      }
      
      return payload.exp < (currentTime + 300)
    } catch (error) {
      if (isDevelopment()) {
        log.error("Token validation error", error as Error, { action: 'token_validation_error' })
      }
      return true 
    }
  }

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

  isValidTokenFormat(token: string): boolean {
    try {
      if (!token || typeof token !== 'string') {
        return false
      }
      
      const parts = token.split('.')
      if (parts.length !== 3) {
        return false
      }
      
      const header = JSON.parse(atob(parts[0]))
      const payload = JSON.parse(atob(parts[1]))
      
      return header.alg && payload.exp && payload.iat
    } catch {
      return false
    }
  }
}

function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
}

export const authService = AuthService.getInstance()
