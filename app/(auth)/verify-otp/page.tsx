"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, RefreshCw, CheckCircle, Loader2 } from "lucide-react"
import { OTPInput } from "@/components/auth/verifyOtp/otp-input"
import { CountdownTimer } from "@/components/auth/verifyOtp/countdown-timer"
import { toast } from "@/hooks/use-toast"
import { useIdleTime } from "@/hooks/useIdealTime"
import { useForgotPasswordStore } from "@/lib/data/store/useForgotPasswordStore"
import { useAuth } from "@/lib/contexts/AuthContext"
import { setCookie } from "@/lib/utils/manageCookie"

// Constants
const IDLE_TIMEOUT = 15 * 60 * 1000 // 15 minutes
const DEFAULT_EXPIRY_TIME = 300 // 5 minutes
const AUTO_SUBMIT_DELAY = 1000 // ms
const OTP_LENGHTH = 6

export default function VerifyOTPPage() {
  const router = useRouter()
  const { forgotPassword, verifyOTP: RequestOTPVerification } = useAuth()
  const { 
    email, 
    expiresIn: initialExpiresIn, 
    getRemainingTime, 
    isExpired: isStoreExpired,
    setForgotPasswordData,
    resetForgotPasswordData
  } = useForgotPasswordStore()

  // State management
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")
  const [expiresIn, setExpiresIn] = useState(0)
  const [isExpired, setIsExpired] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isVerificationComplete, setIsVerificationComplete] = useState(false)
  const [hasShownExpiredToast, setHasShownExpiredToast] = useState(false)

  // Effects
  useEffect(() => {
    router.prefetch("/changepassword")
  }, [router])

  useIdleTime({
    timeout: IDLE_TIMEOUT,
    onIdle: () => {
      toast({
        title: "Session expired",
        description: "You've been inactive for too long. Please start over.",
        variant: "destructive",
      })
      resetForgotPasswordData()
      router.replace("/login")
    }
  })

  // Initialize timer and hydration
  useEffect(() => {
    setIsHydrated(true)
    
    if (email && initialExpiresIn) {
      const remainingTime = getRemainingTime()
      setExpiresIn(remainingTime)
      setIsExpired(remainingTime <= 0)
    } else if (email && !initialExpiresIn) {
      setExpiresIn(DEFAULT_EXPIRY_TIME)
      setIsExpired(false)
    }
    
    setHasShownExpiredToast(false)
  }, [email, initialExpiresIn, getRemainingTime])

  // Update countdown timer
  useEffect(() => {
    if (!email || !initialExpiresIn) return

    const interval = setInterval(() => {
      const remainingTime = getRemainingTime()
      setExpiresIn(remainingTime)
      setIsExpired(remainingTime <= 0)
    }, 1000)

    return () => clearInterval(interval)
  }, [email, initialExpiresIn, getRemainingTime])

  // Computed values
  const isOTPComplete = useMemo(() => otp.length === OTP_LENGHTH, [otp])
  const canSubmit = useMemo(() => isOTPComplete && !isVerifying && !isExpired, [isOTPComplete, isVerifying, isExpired])

  // Event handlers
  const handleOTPChange = useCallback((value: string) => {
    setOtp(value)
    if (error) setError("")
  }, [error])

  const handleExpired = useCallback(() => {
    setIsExpired(true)
    if (!hasShownExpiredToast && isHydrated) {
      setHasShownExpiredToast(true)
      toast({
        title: "OTP has expired. Please request a new code.",
        variant: "destructive",
      })
    }
  }, [hasShownExpiredToast, isHydrated])

  const verifyOTP = useCallback(async () => {
    if (!canSubmit) return

    setIsVerifying(true)
    setError("")

    try {
      const response = await RequestOTPVerification(email, otp)
      
      if (response?.data?.resetToken) {
        toast({
          title: "OTP verified successfully!",
          description: "You can now reset your password.",
        })
        
        setIsVerificationComplete(true)
        setCookie("password_reset_token", response.data.resetToken, 600)
        setCookie("email", email, 600)
        
        router.replace("/changepassword")
        
        setTimeout(() => {
          resetForgotPasswordData()
        }, 100)
      } else {
        setError(response?.message || "Invalid OTP. Please try again.")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Network error. Please check your connection and try again."
      setError(errorMessage)
    } finally {
      setIsVerifying(false)
    }
  }, [canSubmit, email, otp, router, resetForgotPasswordData, RequestOTPVerification])

  const resendOTP = useCallback(async () => {
    if (!email || isResending) return

    setIsResending(true)
    setError("")

    try {
      const response = await forgotPassword(email) as any
      if (response?.expiresIn) {
        setForgotPasswordData({ email, expiresIn: Number(response.expiresIn) })
        setExpiresIn(Number(response.expiresIn))
        setIsExpired(false)
        setOtp("")
        toast({
          title: "New OTP sent to your email!",
          description: "Please check your email for the new OTP.",
        })
      } else {
        setError(response?.message || "Failed to resend OTP. Please try again.")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Network error. Please try again."
      setError(errorMessage)
    } finally {
      setIsResending(false)
    }
  }, [email, isResending, setForgotPasswordData, forgotPassword])

  const handleOTPComplete = useCallback(() => {
    if (isOTPComplete && !isVerifying && !isExpired) {
      verifyOTP()
    }
  }, [isOTPComplete, isVerifying, isExpired, verifyOTP])

  // Auto-submit when OTP is complete
  // useEffect(() => {
  //   if (isOTPComplete) {
  //     const timer = setTimeout(handleOTPComplete, AUTO_SUBMIT_DELAY)
  //     return () => clearTimeout(timer)
  //   }
  // }, [isOTPComplete, handleOTPComplete])

  // Handle invalid session redirect
  useEffect(() => {
    if (!isHydrated || isVerificationComplete || otp.length > 0) return

    if (!email) {
      router.replace(
        "/login?message=Invalid verification session. Please restart the password reset process.",
      )
    }
  }, [email, router, isVerificationComplete, isHydrated, otp.length])

  // Loading state
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Image 
                src="/images/logo-flexdesk.png" 
                alt="FlexDesk" 
                width={32} 
                height={32} 
                className="h-8 w-auto" 
              />
            </div>
          </div>

          {/* Main Card */}
          <Card className="border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Enter Verification Code</CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to
                <br />
                <span className="font-medium text-gray-900">{email}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* OTP Input Section */}
              <div className="space-y-4">
                <OTPInput
                  value={otp}
                  onChange={handleOTPChange}
                  length={6}
                  disabled={isVerifying || isExpired}
                  error={!!error}
                  className="mb-4"
                />

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="text-center">
                  <CountdownTimer 
                    expiresIn={expiresIn} 
                    onExpired={handleExpired} 
                    className="justify-center mb-4" 
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button 
                  onClick={verifyOTP} 
                  disabled={!canSubmit} 
                  className="w-full" 
                  size="lg"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Verify Code
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                  <Button
                    variant="ghost"
                    onClick={resendOTP}
                    disabled={(!isExpired && !isStoreExpired()) || isResending}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Resend Code"
                    )}
                  </Button>
                </div>
              </div>

              {/* Help Text */}
              <div className="pt-2">
                <p className="text-center text-xs text-gray-500">
                  Having trouble? Check your spam folder or contact support.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
