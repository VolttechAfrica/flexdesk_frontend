"use client"

import type { ReactNode } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function BursarLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="bursar">
      {children}
    </ProtectedRoute>
  )
}
