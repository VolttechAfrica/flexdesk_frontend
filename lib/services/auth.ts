import type { LoginRequest, LoginResponse, User } from "@/lib/types/auth"
import { apiClient } from "@/lib/api/client"
import { log } from "@/lib/services/logger"
import { ForgotPasswordRequest, ForgotPasswordResponse, VerifyOTPRequest, VerifyOTPResponse } from "@/lib/types/forgotpassword"
import { setCookie, getCookie, removeCookie } from "@/lib/utils/manageCookie"


const AUTH_CONSTANTS = {
  // Cookie settings
  ACCESS_TOKEN_COOKIE: 'access_token',
  REFRESH_TOKEN_COOKIE: 'refresh_token',
  USER_STORAGE_KEY: 'user',
  
  // Cookie expiration times (in seconds)
  ACCESS_TOKEN_MAX_AGE: 3600, // 1 hour
  REFRESH_TOKEN_MAX_AGE: 604800, // 7 days
  
  // Token validation
  TOKEN_EXPIRY_BUFFER: 300, // 5 minutes buffer
  
  // Cookie attributes
  COOKIE_PATH: '/',
  SECURE_SAME_SITE: 'strict',
  INSECURE_SAME_SITE: 'lax',
} as const

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/token/refresh",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  CHANGE_PASSWORD: "/auth/change-password",
  VERIFY_OTP: "/auth/verify-otp",
} as const

// Custom Error Classes
class AuthError extends Error {
  public readonly code: string
  public readonly action: string

  constructor(message: string, code: string, action: string) {
    super(message)
    this.name = 'AuthError'
    this.code = code
    this.action = action
  }
}

class TokenError extends AuthError {
  constructor(message: string, action: string) {
    super(message, 'TOKEN_ERROR', action)
    this.name = 'TokenError'
  }
}

class NetworkError extends AuthError {
  constructor(message: string = "Network error occurred") {
    super(message, 'NETWORK_ERROR', 'network_error')
    this.name = 'NetworkError'
  }
}

/**
 * Token utility class for handling JWT token operations
 */
class TokenUtils {

  static isValidFormat(token: string): boolean {
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
      
      return !!(header.alg && payload.exp && payload.iat)
    } catch {
      return false
    }
  }

  /**
   * Checks if a token is expired (with buffer time)
   */
  static isExpired(token: string): boolean {
    try {
      if (!this.isValidFormat(token)) {
        return true
      }
      
      const parts = token.split('.')
      const payload = JSON.parse(atob(parts[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      
      if (!payload.exp || typeof payload.exp !== 'number') {
        return true
      }
      
      return payload.exp < (currentTime + AUTH_CONSTANTS.TOKEN_EXPIRY_BUFFER)
    } catch (error) {
      if (isDevelopment()) {
        log.error("Token validation error", error as Error, { action: 'token_validation_error' })
      }
      return true 
    }
  }

  /**
   * Extracts expiration date from token
   */
  static getExpirationDate(token: string): Date | null {
    try {
      if (!this.isValidFormat(token)) {
        return null
      }
      
      const parts = token.split('.')
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
}

/**
 * Cookie utility class for handling browser cookie operations
 */
class CookieUtils {
  
  static setCookie(name: string, value: string, maxAge: number): void {
    if (typeof window === "undefined") return
    
    try {
        setCookie(name, value, maxAge, AUTH_CONSTANTS.COOKIE_PATH)
    } catch (error) {
      throw new TokenError(`Failed to set cookie: ${error}`, 'cookie_set_error')
    }
  }

  /**
   * Gets a cookie value by name
   */
  static getCookie(name: string): string | null {
    if (typeof window === "undefined") return null
    
    const cookie = getCookie(name)
    
    return cookie || null
  }

  /**
   * Removes a cookie by setting max-age to 0
   */
  static removeCookie(name: string): void {
    if (typeof window === "undefined") return
    try {
      removeCookie(name, AUTH_CONSTANTS.COOKIE_PATH)
    } catch (error) {
      throw new TokenError(`Failed to remove cookie: ${error}`, 'cookie_remove_error')
    }
  }
}

/**
 * Main authentication service class
 * Handles user authentication, token management, and session persistence
 */
class AuthService {
  private static instance: AuthService
  private constructor() {}

  /**
   * Gets the singleton instance of AuthService
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  /**
   * Initiates forgot password flow by sending reset email
   */
  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    try {
      const response = await apiClient.post<ForgotPasswordResponse>(
        AUTH_ENDPOINTS.FORGOT_PASSWORD, 
        { email } as ForgotPasswordRequest
      )
      
      const { data, status, message } = response
      if (!status) {
        throw new AuthError(message || "Forgot password failed", 'FORGOT_PASSWORD_FAILED', 'forgot_password_error')
      }
      
      log.info("Forgot password successful", { email, action: 'forgot_password_success' })
      return data
    } catch (error) {
      this.handleAuthError(error, 'forgot_password_error')
    }
  }

  /**
   * Verifies OTP code for password reset
   */
  async verifyOTP(email: string, otp: string): Promise<any> {
    try {
      const response = await apiClient.post<VerifyOTPResponse>(
        AUTH_ENDPOINTS.VERIFY_OTP, 
        { email, otp } as VerifyOTPRequest
      )
      
      if (!response.status) {
        throw new AuthError(response.message || "Verify OTP failed", 'VERIFY_OTP_FAILED', 'verify_otp_error')
      }
      
      log.info("Verify OTP successful", { email, action: 'verify_otp_success' })
      return response
    } catch (error) {
      this.handleAuthError(error, 'verify_otp_error')
    }
  }

  /**
   * Changes password after otp verification
   */
  async resetPassword(newPassword: string, confirmPassword: string, resetToken: string, email: string): Promise<void> {
    try {
      await apiClient.post<void>(AUTH_ENDPOINTS.RESET_PASSWORD, { newPassword, confirmPassword, resetToken, email })
    } catch (error) {
      this.handleAuthError(error, 'reset_password_error')
    }
  }


  /**
   * Authenticates user with email and password
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, credentials)
      const { data, status, message } = response as any
      
      if (!status) {
        throw new AuthError(message || "Login failed", 'LOGIN_FAILED', 'login_error')
      }
      
      log.info("Login successful", { userId: data.user?.id, action: 'login_success' })
      
      // Store user data and tokens
      this.storeUserData(data.user)
      this.storeTokens(data.accessToken, data.refreshToken)

      return data
    } catch (error) {
      this.handleAuthError(error, 'login_error')
    }
  }

  /**
   * Logs out the current user and clears all auth data
   */
  async logout(): Promise<void> {
    try {
      const user = this.getCurrentUser()
      await apiClient.post<void>(AUTH_ENDPOINTS.LOGOUT)
      
      log.auth('User logout successful', user?.id)
    } catch (error) {
      log.error("Logout error", error as Error, { action: 'logout_error' })
    } finally {
      this.clearAllAuthData()
    }
  }

  /**
   * Refreshes the access token using the refresh token
   */
  async refreshToken(): Promise<void> {
    try {
      
      const userId = this.getCurrentUser()?.id
      if (!userId) {
        throw new TokenError("User ID is required", 'user_id_required')
      }
      
      const response = await apiClient.post<{ status: boolean, token: string }>(AUTH_ENDPOINTS.REFRESH_TOKEN)
      const { data: { token: newToken, status } } = response
      
      if (!status) {
        throw new TokenError("Authentication error, login again", 'token_refresh_failed')
      }
      
      this.storeAccessToken(newToken)
      log.auth('Token refresh successful', userId)
    } catch (error) {
      this.handleAuthError(error, 'token_refresh_error')
    }
  }

  /**
   * Stores both access and refresh tokens
   */
  private storeTokens(accessToken: string, refreshToken: string): void {
    this.storeAccessToken(accessToken)
    this.storeRefreshToken(refreshToken)
  }

  /**
   * Stores the access token in a secure cookie
   */
  private storeAccessToken(token: string): void {
    if (!token) {
      throw new TokenError("Access token is required", 'access_token_required')
    }
    CookieUtils.setCookie(AUTH_CONSTANTS.ACCESS_TOKEN_COOKIE, token, AUTH_CONSTANTS.ACCESS_TOKEN_MAX_AGE)
  }

  /**
   * Stores the refresh token in a secure cookie
   */
  private storeRefreshToken(token: string): void {
    if (!token) {
      throw new TokenError("Refresh token is required", 'refresh_token_required')
    }
    CookieUtils.setCookie(AUTH_CONSTANTS.REFRESH_TOKEN_COOKIE, token, AUTH_CONSTANTS.REFRESH_TOKEN_MAX_AGE)
  }

  /**
   * Stores user data in localStorage with sanitized data
   */
  private storeUserData(user: User): void {
    if (typeof window === "undefined") return
    
    const sanitizedUserData = this.sanitizeUserData(user)
    localStorage.setItem(AUTH_CONSTANTS.USER_STORAGE_KEY, JSON.stringify(sanitizedUserData))
  }

  /**
   * Sanitizes user data to only include necessary fields
   */
  private sanitizeUserData(user: User): Partial<User> {
    return {
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
  }

  /**
   * Gets the current authenticated user from localStorage
   */
  public getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    
    try {
      const userData = localStorage.getItem(AUTH_CONSTANTS.USER_STORAGE_KEY)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      log.error("Error parsing user data", error as Error, { action: 'user_data_parse_error' })
      localStorage.removeItem(AUTH_CONSTANTS.USER_STORAGE_KEY)
      return null
    }
  }

  /**
   * Clears all authentication data (user, tokens)
   */
  public clearAllAuthData(): void {
    if (typeof window === "undefined") return
    
    localStorage.removeItem(AUTH_CONSTANTS.USER_STORAGE_KEY)
    CookieUtils.removeCookie(AUTH_CONSTANTS.ACCESS_TOKEN_COOKIE)
    CookieUtils.removeCookie(AUTH_CONSTANTS.REFRESH_TOKEN_COOKIE)
    
    log.info('Auth data cleared', { action: 'auth_data_clear' })
  }

  /**
   * Gets the stored access token from cookies
   */
  getStoredAccessToken(): string | null {
    return CookieUtils.getCookie(AUTH_CONSTANTS.ACCESS_TOKEN_COOKIE)
  }

  /**
   * Gets the stored refresh token from cookies
   */
  getStoredRefreshToken(): string | null {
    return CookieUtils.getCookie(AUTH_CONSTANTS.REFRESH_TOKEN_COOKIE)
  }

  /**
   * Checks if the stored access token is expired
   */
  isAccessTokenExpired(): boolean {
    const token = this.getStoredAccessToken()
    return !token || TokenUtils.isExpired(token)
  }

  /**
   * Gets the expiration date of the stored access token
   */
  getAccessTokenExpiration(): Date | null {
    const token = this.getStoredAccessToken()
    return token ? TokenUtils.getExpirationDate(token) : null
  }

  /**
   * Validates if the stored access token has correct format
   */
  isValidAccessTokenFormat(): boolean {
    const token = this.getStoredAccessToken()
    return token ? TokenUtils.isValidFormat(token) : false
  }

  /**
   * Centralized error handling for authentication operations
   */
  private handleAuthError(error: unknown, action: string): never {
    log.error(`Auth operation failed: ${action}`, error as Error, { action })
    
    if (error instanceof AuthError || error instanceof TokenError) {
      throw error
    }
    
    if (error instanceof Error) {
      throw new AuthError(error.message, 'AUTH_OPERATION_FAILED', action)
    }
    
    throw new NetworkError()
  }

  // Legacy methods for backward compatibility
  /**
   * @deprecated Use getCurrentUser() instead
   */
  public getAuthUser(): User | null {
    return this.getCurrentUser()
  }

  /**
   * @deprecated Use getStoredAccessToken() instead
   */
  getStoredToken(): string | null {
    return this.getStoredAccessToken()
  }

  /**
   * @deprecated Use isAccessTokenExpired() instead
   */
  isTokenExpired(token: string): boolean {
    return TokenUtils.isExpired(token)
  }

  /**
   * @deprecated Use getAccessTokenExpiration() instead
   */
  getTokenExpiration(token: string): Date | null {
    return TokenUtils.getExpirationDate(token)
  }

  /**
   * @deprecated Use isValidAccessTokenFormat() instead
   */
  isValidTokenFormat(token: string): boolean {
    return TokenUtils.isValidFormat(token)
  }

  /**
   * @deprecated Use clearAllAuthData() instead
   */
  public clearAuthData(): void {
    this.clearAllAuthData()
  }
}

/**
 * Utility function to check if running in development mode
 */
function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
}

// Export the singleton instance
export const authService = AuthService.getInstance()

// Export types for external use
export { AuthError, TokenError, NetworkError }
