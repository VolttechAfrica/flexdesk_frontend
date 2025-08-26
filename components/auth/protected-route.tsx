"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/AuthContext"
import { Loader2, Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermissions?: string[]
  requiredRole?: string
  fallback?: React.ReactNode
  showLoading?: boolean
}

export function ProtectedRoute({
  children,
  requiredPermissions = [],
  requiredRole,
  fallback,
  showLoading = true,
}: ProtectedRouteProps) {
  const { user, permissions, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  // Role gating is handled here (middleware only checks auth)

  useEffect(() => {
    console.log("isLoading", isLoading)
    console.log("isAuthenticated", isAuthenticated)
    if (!isLoading && !isAuthenticated) {
      const currentPath = window.location.pathname
      const redirectUrl = `/login?redirect=${encodeURIComponent(currentPath)}`
      router.replace(redirectUrl)
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading state
  if (isLoading && showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  // Check role-based access
  if (requiredRole && user && user.role !== requiredRole && user.userType !== requiredRole) {
    return (
      <AccessDenied
        title="Access Denied"
        description={`You need ${requiredRole} role to access this page.`}
        userRole={user?.role || user?.userType}
        requiredRole={requiredRole}
      />
    )
  }

  // Check permission-based access
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requiredPermissions.every(permission =>
      permissions.includes(permission)
    )

    if (!hasRequiredPermissions) {
      return (
        <AccessDenied
          title="Insufficient Permissions"
          description="You don't have the required permissions to access this page."
          userPermissions={permissions}
          requiredPermissions={requiredPermissions}
        />
      )
    }
  }

  // Check if user needs to complete onboarding
  // if (user && !user.profile?.phoneNumber && window.location.pathname !== "/onboarding") {
  //   router.replace("/onboarding")
  //   return null
  // }

  // All checks passed, render children
  return <>{children}</>
}

interface AccessDeniedProps {
  title: string
  description: string
  userRole?: string
  requiredRole?: string
  userPermissions?: string[]
  requiredPermissions?: string[]
}

function AccessDenied({
  title,
  description,
  userRole,
  requiredRole,
  userPermissions = [],
  requiredPermissions = [],
}: AccessDeniedProps) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Shield className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl text-red-600">{title}</CardTitle>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userRole && requiredRole && (
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Your role:</span> {userRole}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Required role:</span> {requiredRole}
              </p>
            </div>
          )}

          {requiredPermissions.length > 0 && (
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-sm font-medium text-gray-600 mb-2">Required permissions:</p>
              <div className="space-y-1">
                {requiredPermissions.map((permission) => (
                  <div
                    key={permission}
                    className={`text-sm ${
                      userPermissions.includes(permission)
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {permission} {userPermissions.includes(permission) ? "✓" : "✗"}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Go Back
            </Button>
            {/* Route user back to home by default */}
            <Button onClick={() => router.push("/")} className="flex-1">Home</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Higher-order component for protecting routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<ProtectedRouteProps, 'children'> = {}
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}

// Hook for checking permissions in components
export function usePermissions() {
  const { permissions, user } = useAuth()

  const hasPermission = (permission: string): boolean => {
    return permissions.includes(permission)
  }

  const hasAnyPermission = (permissionList: string[]): boolean => {
    return permissionList.some(permission => permissions.includes(permission))
  }

  const hasAllPermissions = (permissionList: string[]): boolean => {
    return permissionList.every(permission => permissions.includes(permission))
  }

  const isRole = (role: string): boolean => {
    return user?.role === role || user?.userType === role
  }

  const isAdmin = (): boolean => {
    return isRole('admin') || isRole('superadmin')
  }

  const isTeacher = (): boolean => {
    return isRole('teacher')
  }

  const isParent = (): boolean => {
    return isRole('parent')
  }

  const isStudent = (): boolean => {
    return isRole('student')
  }

  const isBursar = (): boolean => {
    return isRole('bursar')
  }

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isRole,
    isAdmin,
    isTeacher,
    isParent,
    isStudent,
    isBursar,
    user,
  }
}
