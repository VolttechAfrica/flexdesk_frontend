"use client"

import type { ReactNode } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="teacher">
      {children}
    </ProtectedRoute>
  )
}
