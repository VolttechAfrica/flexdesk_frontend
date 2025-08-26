# Authentication System Documentation

## Overview

The Flexdesk authentication system provides secure, role-based access control with automatic token refresh and comprehensive route protection.

## Architecture

### Components

1. **AuthContext** (`lib/contexts/authContext.tsx`)
   - Manages authentication state
   - Handles login/logout operations
   - Automatic token refresh
   - User session management

2. **AuthService** (`lib/services/auth.ts`)
   - API communication for auth operations
   - Token management
   - Refresh token logic

3. **API Client** (`lib/api/client.ts`)
   - Automatic token injection in headers
   - 401/403 response handling
   - Automatic token refresh on auth failures
   - Request/response interceptors

4. **Middleware** (`middleware.ts`)
   - Edge-level route protection
   - Role-based access control
   - Token validation

5. **ProtectedRoute Component** (`components/auth/protected-route.tsx`)
   - Client-side route protection
   - Permission-based access control
   - Role-based restrictions

## Features

### ✅ Implemented

- **Secure Token Storage**: Cookies with secure flags
- **Automatic Token Refresh**: Background refresh every 5 minutes
- **Route Protection**: Both middleware and component-level
- **Role-Based Access Control**: Admin, Teacher, Parent, Student, Bursar
- **Permission System**: Granular permission checking
- **Automatic Token Injection**: All API requests include auth headers
- **401/403 Handling**: Automatic token refresh on auth failures
- **Session Management**: Persistent login state
- **Error Handling**: Comprehensive error management with user feedback

### 🔧 Security Features

- **CSRF Protection**: SameSite cookie attributes
- **Secure Cookies**: HTTPS-only in production
- **Token Expiration**: Automatic validation and refresh
- **Permission Validation**: Server and client-side checks
- **Route Guards**: Multiple layers of protection

## Usage Examples

### Basic Route Protection

```tsx
import { ProtectedRoute } from "@/components/auth/protected-route"

export function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>Admin-only content</div>
    </ProtectedRoute>
  )
}
```

### Permission-Based Protection

```tsx
export function TeacherManagement() {
  return (
    <ProtectedRoute requiredPermissions={["manage_teachers", "view_teacher_data"]}>
      <div>Teacher management interface</div>
    </ProtectedRoute>
  )
}
```

### Using the usePermissions Hook

```tsx
import { usePermissions } from "@/components/auth/protected-route"

export function ConditionalContent() {
  const { hasPermission, isAdmin, isTeacher } = usePermissions()

  return (
    <div>
      {hasPermission("manage_students") && (
        <div>Student management</div>
      )}
      
      {isAdmin() && (
        <div>Admin features</div>
      )}
    </div>
  )
}
```

### Higher-Order Component

```tsx
import { withAuth } from "@/components/auth/protected-route"

function UserProfile() {
  return <div>User profile content</div>
}

export const ProtectedUserProfile = withAuth(UserProfile, {
  requiredPermissions: ["view_profile"],
  showLoading: false,
})
```

## API Integration

### Automatic Token Injection

All API requests automatically include the authentication token:

```typescript
// Token is automatically added to headers
const response = await apiClient.get("/api/users")
// Headers: { Authorization: "Bearer <token>" }
```

### Token Refresh

The system automatically handles token refresh:

1. **Background Refresh**: Every 5 minutes
2. **On-Demand Refresh**: When 401/403 responses occur
3. **Failed Refresh**: Automatic logout and redirect to login

### Error Handling

```typescript
try {
  const data = await apiClient.get("/api/protected")
} catch (error) {
  if (error.code === "AUTH_FAILED") {
    // User will be redirected to login automatically
  }
}
```

## Configuration

### Environment Variables

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.flexdesk.sch.ng/api/v2
NEXT_PUBLIC_API_TIMEOUT=30000

# JWT Configuration (server-side)
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```

### Cookie Settings

```typescript
// Production settings
document.cookie = `token=${token}; path=/; max-age=3600; secure; samesite=strict`

// Development settings
document.cookie = `token=${token}; path=/; max-age=3600; samesite=lax`
```

## Security Considerations

### Token Security

- **Storage**: Secure cookies (not localStorage)
- **Expiration**: Short-lived tokens (1 hour)
- **Refresh**: Long-lived refresh tokens (7 days)
- **Validation**: JWT signature verification

### Route Protection

- **Middleware**: Edge-level protection
- **Components**: Client-side validation
- **Permissions**: Granular access control
- **Roles**: Hierarchical role system

### CSRF Protection

- **SameSite**: Strict cookie policy
- **Secure**: HTTPS-only in production
- **Validation**: Server-side token verification

## Troubleshooting

### Common Issues

1. **Token Not Found**
   - Check cookie settings
   - Verify domain configuration
   - Check browser security settings

2. **Refresh Token Fails**
   - Check API endpoint availability
   - Verify refresh token validity
   - Check network connectivity

3. **Permission Denied**
   - Verify user role assignment
   - Check permission configuration
   - Review route protection settings

### Debug Mode

Enable debug logging in development:

```typescript
// In API client
if (isDevelopment) {
  console.log("[API Request]", config)
  console.log("[API Response]", response)
}
```

## Best Practices

### Implementation

1. **Always use ProtectedRoute** for sensitive content
2. **Check permissions** before rendering features
3. **Handle loading states** during authentication
4. **Provide clear error messages** for users

### Security

1. **Never store tokens** in localStorage
2. **Always validate** server responses
3. **Implement proper** error boundaries
4. **Use HTTPS** in production

### Performance

1. **Lazy load** protected components
2. **Cache user permissions** when possible
3. **Optimize** token refresh intervals
4. **Minimize** authentication checks

## Future Enhancements

### Planned Features

- [ ] **Multi-factor Authentication** (MFA)
- [ ] **Session Management** dashboard
- [ ] **Audit Logging** for security events
- [ ] **Advanced Permission** inheritance
- [ ] **SSO Integration** support

### Technical Improvements

- [ ] **JWT Blacklisting** for logout
- [ ] **Rate Limiting** on auth endpoints
- [ ] **Device Fingerprinting** for security
- [ ] **Real-time** permission updates
- [ ] **Offline** authentication support
