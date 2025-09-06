"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Eye, EyeOff, Lock, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

import { getCookie, removeCookie } from "@/lib/utils/manageCookie"
import { useIdleTime } from "@/hooks/useIdealTime"
import { useAuth } from "@/lib/contexts/AuthContext"


const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ChangePasswordPage() {
  const router = useRouter()

  const token = getCookie("password_reset_token")
  const email = getCookie("email")

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { resetPassword } = useAuth()

  useIdleTime({
    timeout: 15 * 60 * 1000,
    onIdle: () => {
      router.replace("/login?message=Session expired. Please start over.")
      removeCookie("password_reset_token")
      removeCookie("email")
    }
  })

  useEffect(() => {
    if (!token || !email) {
      router.replace("/login?message=Invalid or expired verification token. Please restart the password reset process.")
    }
  }, [token, email])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    watch,
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  })

  const newPassword = watch("newPassword")

  const passwordStrength = useMemo(() => {
    if (!newPassword) return { score: 0, label: "", color: "" }

    let score = 0
    if (newPassword.length >= 8) score++
    if (/[a-z]/.test(newPassword)) score++
    if (/[A-Z]/.test(newPassword)) score++
    if (/\d/.test(newPassword)) score++
    if (/[^a-zA-Z\d]/.test(newPassword)) score++
   


    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

    return {
      score,
      label: labels[Math.min(score - 1, 4)] || "",
      color: colors[Math.min(score - 1, 4)] || "bg-gray-300",
    }
  }, [newPassword])

  const togglePasswordVisibility = useCallback((field: "new" | "confirm") => {
    switch (field) {
      case "new":
        setShowNewPassword((prev) => !prev)
        break
      case "confirm":
        setShowConfirmPassword((prev) => !prev)
        break
    }
  }, [])

  const onSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      if (!token) {
        setError("root", {
          type: "manual",
          message: "Invalid or expired verification token. Please restart the password reset process.",
        })
        return
      }

      setIsSubmitting(true)

      try {
        await resetPassword(data.newPassword, data.confirmPassword, token as string, email as string)
        toast({
          title: "Password reset successfully!",
          description: "You can now log in with your new password.",
        })
        reset()
        removeCookie("password_reset_token")
        removeCookie("email")
        router.push("/login?message=Password reset successful. Please log in with your new password.")

      } catch (error) {
        setError("root", {
          type: "manual",
          message: error instanceof Error ? error.message : "Network error. Please try again.",
        })
        console.error("Reset password error:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [token, setError, reset, router, removeCookie],
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Image src="/images/logo-flexdesk.png" alt="FlexDesk" width={32} height={32} className="h-8 w-auto" />
            </div>
          </div>

          <Card className="border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Create New Password</CardTitle>
              <CardDescription>Choose a strong password to secure your account</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      {...register("newPassword")}
                      className={errors.newPassword ? "border-red-500 pr-10" : "pr-10"}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={isSubmitting}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {newPassword && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Password strength:</span>
                        <span
                          className={`font-medium ${
                            passwordStrength.score >= 4
                              ? "text-green-600"
                              : passwordStrength.score >= 3
                                ? "text-blue-600"
                                : passwordStrength.score >= 2
                                  ? "text-yellow-600"
                                  : "text-red-600"
                          }`}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      {...register("confirmPassword")}
                      className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={isSubmitting}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>

                {errors.root && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.root.message}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={!isValid || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Reset Password
                    </>
                  )}
                </Button>

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/login"
                    className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-800"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Password Security Tips</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Use at least 8 characters with mixed case, numbers, and symbols</li>
              <li>• Avoid using personal information or common words</li>
              <li>• Don't reuse passwords from other accounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
