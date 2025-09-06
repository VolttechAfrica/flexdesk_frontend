"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/services/auth"
import { type AuthContextType, type LoginRequest, type User, ROLE_ROUTES } from "@/lib/types/auth"
import { toast } from "@/hooks/use-toast"
import { log } from "@/lib/services/logger"
import { ForgotPasswordResponse, VerifyOTPResponse } from "@/lib/types/forgotpassword"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [permissions, setPermissions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const isAuthenticated = !!token && !!user

  useEffect(() => {
    // Check for stored token on mount
    const initializeAuth = async () => {
      try {
        const storedToken = authService.getStoredAccessToken()
        const newUser = authService.getAuthUser()
        if (storedToken && newUser) {
          if (authService.isAccessTokenExpired()) {
            try {
              await authService.refreshToken()
              const newToken = authService.getStoredAccessToken()
             
              if (newToken) {
                setToken(newToken)
                setUser(newUser)
                log.auth('Auth initialized with refreshed token', newUser.id)
              } else {
                authService.clearAllAuthData()
                log.warn('Token refresh failed during initialization', { action: 'init_token_refresh_failed' })
              }
            } catch (refreshError) {
              authService.clearAllAuthData()
              log.error('Token refresh failed during initialization', refreshError as Error, { action: 'init_token_refresh_error' })
            }
          } else {
            setToken(storedToken)
            setUser(newUser)
            log.auth('Auth initialized with existing token', newUser.id)
          }
        }
      } catch (error) {
        log.error('Auth initialization error', error as Error, { action: 'auth_init_error' })
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Set up token refresh interval
  useEffect(() => {
    if (!token) return

    const refreshInterval = setInterval(async () => {
      try {
        const currentToken = authService.getStoredAccessToken()
        if (currentToken && authService.isAccessTokenExpired()) {
          await authService.refreshToken()
          const newToken = authService.getStoredAccessToken()
          if (newToken) {
            setToken(newToken)
            log.info('Auto token refresh successful', { action: 'auto_token_refresh_success' })
          }
        }
      } catch (error) {
        log.error('Auto token refresh failed', error as Error, { action: 'auto_token_refresh_failed' })
        setIsLoading(false)
        await logout()
      }
    }, 5 * 60 * 1000) // Check every 5 minutes

    return () => clearInterval(refreshInterval)
  }, [token])

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await authService.login(credentials)

      const { user, accessToken: userToken, permissions: userPermissions } = response as any

      setUser(user)
      setToken(userToken)
      setPermissions(userPermissions)

      if (user.firstTimeLogin) {
        router.replace("/onboarding")
      } else { 
        const roleId = user.roleId as keyof typeof ROLE_ROUTES
        const redirectPath = ROLE_ROUTES[roleId]
        log.user('Redirecting to role dashboard', user.id, { 
          action: 'redirect_dashboard',
          roleId,
          redirectPath 
        })
        router.replace(redirectPath)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      setError(errorMessage)
      log.error('Login failed in context', error as Error, { action: 'context_login_error' })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      if (token) {
        await authService.logout()
      }
    } catch (error) {
      log.error('Logout error in context', error as Error, { action: 'context_logout_error' })
    } finally {
      setUser(null)
      setToken(null)
      setPermissions([])
      setError(null)
      authService.clearAllAuthData()
      router.replace("/login")
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        variant: "default",
      })
    }
  }

  const refreshAuth = async (): Promise<void> => {
    try {
      const currentToken = authService.getStoredAccessToken()
      if (currentToken) {
        await authService.refreshToken()
        const newToken = authService.getStoredAccessToken()
        if (newToken) {
          setToken(newToken)
          log.info('Manual token refresh successful', { action: 'manual_token_refresh_success' })
        }
      }
    } catch (error) {
      log.error('Manual token refresh failed', error as Error, { action: 'manual_token_refresh_failed' })
      await logout()
    }
  }

  const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
    return await authService.forgotPassword(email)
  }

  const verifyOTP = async (email: string, otp: string): Promise<VerifyOTPResponse> => {
    return await authService.verifyOTP(email, otp)
  }

  const resetPassword = async (password: string, confirmPassword: string, resetToken: string, email: string): Promise<void> => {
    return await authService.resetPassword(password, confirmPassword, resetToken, email)
  }

  

  const value: AuthContextType = {
    user,
    token,
    permissions,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshAuth,
    forgotPassword,
    verifyOTP,
    resetPassword
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
