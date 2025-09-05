"use client"

import type React from "react"

import { useRef, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  disabled?: boolean
  error?: boolean
  className?: string
}

export function OTPInput({ value, onChange, length = 6, disabled = false, error = false, className }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Memoize the array of values to prevent unnecessary re-renders
  const values = useMemo(() => {
    const arr = value.split("")
    return Array.from({ length }, (_, i) => arr[i] || "")
  }, [value, length])

  const handleInputChange = useCallback(
    (index: number, inputValue: string) => {
      // Only allow digits
      const digit = inputValue.replace(/\D/g, "").slice(-1)

      const newValues = [...values]
      newValues[index] = digit

      const newValue = newValues.join("")
      onChange(newValue)

      // Auto-focus next input
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [values, onChange, length],
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !values[index] && index > 0) {
        // Focus previous input on backspace if current is empty
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [values, length],
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
      onChange(pastedData)

      // Focus the next empty input or the last input
      const nextIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[nextIndex]?.focus()
    },
    [onChange, length],
  )

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => { inputRefs.current[index] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[index]}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "w-12 h-12 text-center text-lg font-semibold",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            "sm:w-14 sm:h-14 sm:text-xl",
          )}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  )
}
