"use client"

import { ProtectedRoute, usePermissions, withAuth } from "./protected-route"

// Example 1: Basic route protection
export function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Only admins can see this content</p>
      </div>
    </ProtectedRoute>
  )
}

// Example 2: Permission-based protection
export function TeacherManagement() {
  return (
    <ProtectedRoute requiredPermissions={["manage_teachers", "view_teacher_data"]}>
      <div>
        <h1>Teacher Management</h1>
        <p>Only users with teacher management permissions can see this</p>
      </div>
    </ProtectedRoute>
  )
}

// Example 3: Using the usePermissions hook
export function ConditionalContent() {
  const { hasPermission, isAdmin, isTeacher } = usePermissions()

  return (
    <div>
      <h1>Conditional Content</h1>
      
      {hasPermission("manage_students") && (
        <div>
          <h2>Student Management</h2>
          <p>You can manage students</p>
        </div>
      )}
      
      {isAdmin() && (
        <div>
          <h2>Admin Features</h2>
          <p>Admin-only content</p>
        </div>
      )}
      
      {isTeacher() && (
        <div>
          <h2>Teacher Features</h2>
          <p>Teacher-specific content</p>
        </div>
      )}
    </div>
  )
}

// Example 4: Using the withAuth HOC
function UserProfile() {
  return (
    <div>
      <h1>User Profile</h1>
      <p>This component is automatically protected</p>
    </div>
  )
}

// Export the protected version
export const ProtectedUserProfile = withAuth(UserProfile, {
  requiredPermissions: ["view_profile"],
  showLoading: false,
})

// Example 5: Complex permission checking
export function AdvancedPermissionExample() {
  const { 
    hasAllPermissions, 
    hasAnyPermission, 
    isRole,
    permissions 
  } = usePermissions()

  const canManageSchool = hasAllPermissions([
    "manage_school_settings",
    "manage_users",
    "view_financial_data"
  ])

  const canViewReports = hasAnyPermission([
    "view_student_reports",
    "view_teacher_reports",
    "view_financial_reports"
  ])

  return (
    <div>
      <h1>Advanced Permissions</h1>
      
      <div className="space-y-4">
        <div>
          <h3>Your Permissions:</h3>
          <ul className="list-disc list-inside">
            {permissions.map(permission => (
              <li key={permission} className="text-sm text-gray-600">
                {permission}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Access Levels:</h3>
          <p>Can manage school: {canManageSchool ? "✓" : "✗"}</p>
          <p>Can view reports: {canViewReports ? "✓" : "✗"}</p>
          <p>Is admin: {isRole("admin") ? "✓" : "✗"}</p>
        </div>
      </div>
    </div>
  )
}

// Example 6: Nested protection
export function NestedProtectionExample() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>
        <h1>Admin Section</h1>
        
        <ProtectedRoute requiredPermissions={["manage_finances"]}>
          <div>
            <h2>Financial Management</h2>
            <p>Only admins with financial permissions can see this</p>
          </div>
        </ProtectedRoute>
        
        <ProtectedRoute requiredPermissions={["manage_users"]}>
          <div>
            <h2>User Management</h2>
            <p>Only admins with user management permissions can see this</p>
          </div>
        </ProtectedRoute>
      </div>
    </ProtectedRoute>
  )
}
