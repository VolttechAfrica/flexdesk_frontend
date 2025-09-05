"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useForgotPasswordStore } from "@/lib/data/store/useForgotPasswordStore"


interface ForgotPasswordProps {
  onBack?: () => void
  onSuccess?: (email: string) => void
}

export function ForgotPassword({ onBack, onSuccess }: ForgotPasswordProps) {
  const [resetEmail, setResetEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { forgotPassword } = useAuth()
  const router = useRouter()
  const setForgotPasswordData = useForgotPasswordStore(state => state.setForgotPasswordData);


  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!resetEmail.trim()) {
      setError("Email is required")
      return
    }
    if (!validateEmail(resetEmail)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    try {
      const {email, expiresIn} = await forgotPassword(resetEmail) as any
      console.log(email, expiresIn)
      if (expiresIn) {
        setSuccess("Password reset link has been sent to your email")
        setForgotPasswordData({ email: resetEmail, expiresIn: Number(expiresIn) });
        router.push("/verify-otp")
      } else {
        throw new Error("Failed to send reset email. Please try again.")
      }
    } catch (err: any) {
      setError(err?.message || "Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
          <CheckCircle2 className="h-4 w-4" />
          <span>{success}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="resetEmail" className="text-sm font-medium">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="resetEmail"
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className={`pl-10 h-12 ${error ? "border-red-500 focus:border-red-500" : ""}`}
            disabled={isLoading}
          />
        </div>
      </div>

      <Button type="submit" className="w-full h-12 text-base font-medium" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Reset Link...
          </>
        ) : (
          "Send Reset Link"
        )}
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="w-full"
        onClick={() => onBack?.()}
        disabled={isLoading}
      >
        Back to Sign In
      </Button>
    </form>
  )
}