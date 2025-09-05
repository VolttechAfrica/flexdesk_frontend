import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { ForgotPasswordData } from "@/lib/types/forgotpassword"

interface ForgotPasswordStore extends ForgotPasswordData {
    sentAt: number // timestamp when OTP was sent
    setForgotPasswordData: (data: ForgotPasswordData) => void
    resetForgotPasswordData: () => void
    getRemainingTime: () => number // returns remaining seconds
    isExpired: () => boolean
}

export const useForgotPasswordStore = create<ForgotPasswordStore>()(
  persist(
    (set, get) => ({
      email: "",
      expiresIn: 0,
      sentAt: 0,

      setForgotPasswordData: (data) => set({ 
        email: data.email, 
        expiresIn: data.expiresIn,
        sentAt: Date.now() // store when OTP was sent
      }),

      resetForgotPasswordData: () =>
        set({
          email: "",
          expiresIn: 0,
          sentAt: 0,
        }),

      getRemainingTime: () => {
        const { sentAt, expiresIn } = get()
        if (!sentAt || !expiresIn) return 0
        
        const elapsed = Math.floor((Date.now() - sentAt) / 1000)
        const remaining = expiresIn - elapsed
        return Math.max(0, remaining)
      },

      isExpired: () => {
        return get().getRemainingTime() <= 0
      },
    }),
    {
      name: "fd_forgot_password_v1",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ 
        email: state.email, 
        expiresIn: state.expiresIn,
        sentAt: state.sentAt 
      }),
      version: 1,
      migrate: (persistedState, version) => {
        if (!persistedState || typeof persistedState !== "object") {
          return { email: "", expiresIn: 0, sentAt: 0 }
        }
        const state = persistedState as ForgotPasswordData & { sentAt?: number }
        return { 
          email: state.email, 
          expiresIn: state.expiresIn,
          sentAt: state.sentAt || 0
        }
      },
    },
  ),
)
