"use client"

import { useState, useCallback } from "react"
import { supportService } from "@/lib/services/support"
import type { SupportTicketRequest, SupportTicket } from "@/lib/types/api"

interface UseSupportFormState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
  ticket: SupportTicket | null
}

interface UseSupportFormActions {
  submitTicket: (data: SupportTicketRequest) => Promise<void>
  reset: () => void
  clearError: () => void
}

type UseSupportFormReturn = UseSupportFormState & UseSupportFormActions

export function useSupportForm(): UseSupportFormReturn {
  const [state, setState] = useState<UseSupportFormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    ticket: null,
  })

  const submitTicket = useCallback(async (data: SupportTicketRequest) => {
    setState((prev) => ({
      ...prev,
      isSubmitting: true,
      error: null,
      isSuccess: false,
    }))

    try {
      console.log("data", data)
      const response = await supportService.createTicket(data)

      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
        ticket: response.data,
      }))
    } catch (error) {
      console.log(error)
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again."

      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: errorMessage,
      }))
    }
  }, [])

  const reset = useCallback(() => {
    setState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
      ticket: null,
    })
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }))
  }, [])

  return {
    ...state,
    submitTicket,
    reset,
    clearError,
  }
}
