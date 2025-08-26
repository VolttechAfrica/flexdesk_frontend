"use client"

import type { ReactNode } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="parent">
      {children}
    </ProtectedRoute>
  )
}
