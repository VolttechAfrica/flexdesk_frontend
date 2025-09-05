"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, RefreshCw, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { OTPInput } from "@/components/auth/verifyOtp/otp-input"
import { CountdownTimer } from "@/components/auth/verifyOtp/countdown-timer"
import { toast } from "@/hooks/use-toast"
import type {
  VerifyOTPRequest,
  VerifyOTPResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "@/lib/types/forgotpassword"
import { useForgotPasswordStore } from "@/lib/data/store/useForgotPasswordStore"
import { useAuth } from "@/lib/contexts/AuthContext"

export default function VerifyOTPPage() {
  const router = useRouter()
  const { 
    email, 
    expiresIn: initialExpiresIn, 
    getRemainingTime, 
    isExpired: isStoreExpired,
    setForgotPasswordData 
  } = useForgotPasswordStore()

  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")
  const [expiresIn, setExpiresIn] = useState(0)
  const [isExpired, setIsExpired] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  const { forgotPassword } = useAuth()

  // Handle store hydration
  useEffect(() => {
    setIsHydrated(true)
    if (email && initialExpiresIn) {
      const remainingTime = getRemainingTime()
      setExpiresIn(remainingTime)
      setIsExpired(remainingTime <= 0)
    }
  }, [email, initialExpiresIn, getRemainingTime])

  // Update countdown periodically to stay in sync with store
  useEffect(() => {
    if (!email || !initialExpiresIn) return

    const interval = setInterval(() => {
      const remainingTime = getRemainingTime()
      setExpiresIn(remainingTime)
      setIsExpired(remainingTime <= 0)
    }, 1000)

    return () => clearInterval(interval)
  }, [email, initialExpiresIn, getRemainingTime])

  // Memoize validation to prevent unnecessary re-renders
  const isOTPComplete = useMemo(() => otp.length === 6, [otp])
  const canSubmit = useMemo(() => isOTPComplete && !isVerifying && !isExpired, [isOTPComplete, isVerifying, isExpired])

  const handleOTPChange = useCallback(
    (value: string) => {
      setOtp(value)
      if (error) setError("") // Clear error when user types
    },
    [error],
  )

  const handleExpired = useCallback(() => {
    setIsExpired(true)
    toast({
      title: "OTP has expired. Please request a new code.",
      variant: "destructive",
    })
  }, [])

  const verifyOTP = useCallback(async () => {
    if (!canSubmit) return

    setIsVerifying(true)
    setError("")

    try {
      const request: VerifyOTPRequest = {
        email,
        otp,
      }

      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      const data: VerifyOTPResponse = await response.json()

      if (data.status) {
        toast({
          title: "OTP verified successfully!",
          description: "You can now reset your password.",
        })
        // Redirect to reset password page with token
        router.push(`/reset-password?token=${data.data.resetToken}&email=${email}`)
      } else {
        setError(data.message || "Invalid OTP. Please try again.")
        setOtp("") // Clear OTP on error
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.")
      console.error("OTP verification error:", err)
    } finally {
      setIsVerifying(false)
    }
  }, [canSubmit, email, otp, router])

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
      setError("Network error. Please try again.")
      console.error("Resend OTP error:", err)
    } finally {
      setIsResending(false)
    }
  }, [email, isResending])

  // Auto-submit when OTP is complete
  const handleOTPComplete = useCallback(() => {
    if (isOTPComplete && !isVerifying && !isExpired) {
      verifyOTP()
    }
  }, [isOTPComplete, isVerifying, isExpired, verifyOTP])

  // Trigger verification when OTP is complete
  useState(() => {
    if (isOTPComplete) {
      const timer = setTimeout(handleOTPComplete, 500)
      return () => clearTimeout(timer)
    }
  })

  // Show loading state during hydration
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

  // Show invalid access only after hydration is complete
  if (!email || !initialExpiresIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">Invalid access. Please start the password reset process again.</p>
            <Link href="/login">
              <Button>Back to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Image src="/images/logo-flexdesk.png" alt="FlexDesk" width={32} height={32} className="h-8 w-auto" />
            </div>
          </div>

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

              <div className="space-y-4">
                <Button onClick={verifyOTP} disabled={!canSubmit} className="w-full" size="lg">
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
                    disabled={!isExpired && !isStoreExpired() || isResending}
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

              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/login"
                  className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Having trouble? Check your spam folder or contact support</p>
          </div>
        </div>
      </div>
    </div>
  )
}


