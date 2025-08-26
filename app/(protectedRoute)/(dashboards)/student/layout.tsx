"use client"

import type { ReactNode } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="student">
      {children}
    </ProtectedRoute>
  )
}
