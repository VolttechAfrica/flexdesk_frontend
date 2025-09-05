"use client"

import { useState, useEffect, useMemo } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  expiresIn: number // seconds
  onExpired: () => void
  className?: string
}

export function CountdownTimer({ expiresIn, onExpired, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(expiresIn)

  useEffect(() => {
    setTimeLeft(expiresIn)
  }, [expiresIn])

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpired()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onExpired()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onExpired])

  // Memoize formatted time to prevent unnecessary re-renders
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }, [timeLeft])

  const isExpired = timeLeft <= 0

  return (
    <div className={`flex items-center gap-2 text-sm ${isExpired ? "text-red-500" : "text-gray-600"} ${className}`}>
      <Clock className="h-4 w-4" />
      <span>{isExpired ? "Code expired" : `Code expires in ${formattedTime}`}</span>
    </div>
  )
}
