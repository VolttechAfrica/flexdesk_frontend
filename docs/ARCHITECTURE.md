# Flexdesk Architecture

## Overview
A modular Next.js application using the App Router, with edge middleware for auth gating, a central Axios client for backend integration, and client context for session state.

## Layers
- Presentation: `app/`, `components/`, `styles/`
- State/Domain: `lib/contexts/`, `lib/types/`
- Services: `lib/api/`, `lib/services/`
- Config: `lib/config/`, `next.config.mjs`, `tsconfig.json`
- Infra: `middleware.ts`, `public/`

## Key Modules
- `lib/api/client.ts`: Axios instance with interceptors, retries, exponential backoff, and token refresh.
- `lib/services/auth.ts`: Login, logout, token storage, token refresh, and helpers.
- `lib/contexts/AuthContext.tsx`: Session state, background refresh, redirects on auth.
- `middleware.ts`: Public route allowlist, token validation, redirects.

## Request Flow
1. User navigates to a route.
2. `middleware.ts` checks public routes and token validity; may redirect to `/login`.
3. Protected UI renders; components call services which use `apiClient`.
4. `apiClient` injects `Authorization` header from cookie, handles errors and refresh.
5. On 401/403, client tries to refresh token; on failure, redirects to `/login`.

## Routing Structure
- Marketing routes: `/`, `/about`, `/features`, `/solutions`, `/support`, `/privacy`, `/terms`.
- Authenticated routes: `(protectedRoute)/...`, role dashboards under `(protectedRoute)/(dashboards)`.

## Data and Types
- API response shape and request configs: `lib/types/api.ts`.
- Auth types and role route mapping: `lib/types/auth.ts`.
- Onboarding types: `lib/types/onboarding.ts`, `lib/types/staff-onboarding.ts`.

## Styling and UI
- Tailwind CSS v4 for utility-first styling.
- Radix UI primitives wrapped in `components/ui/*` for consistency.

## Security Considerations
- Use secure, httpOnly cookies for tokens in production; avoid localStorage for tokens.
- Set `SameSite=strict` on production cookies.
- Validate JWT expiry in middleware; never trust client time alone.

## Local Development
- Dev server with Turbopack: `pnpm dev`.
- Adjust API base URL via env and avoid hardcoding production IPs.

## Deployment Notes
- Configure environment variables per environment.
- Ensure middleware matcher excludes assets and API routes (already configured).
- Monitor API health via `apiClient.healthCheck()` if needed.

## Future Evolution
- Extract API base URL from `NEXT_PUBLIC_API_BASE_URL`.
- Add server actions or RSC data fetching where appropriate.
- Introduce e2e tests for auth gating and dashboard routing.
