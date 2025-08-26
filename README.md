# Flexdesk

An AI-powered web application for school administration and learning management, featuring role-based dashboards for administrators, bursars, teachers, parents, and students. The app includes authentication, protected routes, onboarding, and a marketing website.

## Tech Stack
- Next.js 15 (App Router, Middleware)
- React 18.3.1
- TypeScript 5
- Tailwind CSS 4
- Radix UI + shadcn-inspired components
- Axios-based API client with retry + token refresh
- Zod for schemas and validation

## Quick Start

### Prerequisites
- Node.js 18+ (recommend 20+)
- pnpm or npm

### Install
```bash
pnpm install
# or
npm install
```

### Run Dev Server
```bash
pnpm dev
# or
npm run dev
```
The app runs at `http://localhost:3000`.

### Build and Start
```bash
pnpm build && pnpm start
# or
npm run build && npm run start
```

## Environment Configuration
- NEXT_PUBLIC_CLOUDINARY_NAME=?
- NEXT_PUBLIC_PROFILE_IMAGE_UPLOAD_PRESET=?
- NEXT_PUBLIC_CLOUDINARY_API_KEY=?
- NEXT_PUBLIC_CLOUDINARY_API_SECRET=?
- NEXT_PUBLIC_API_BASE_URL=?
- NEXT_PUBLIC_LOG_LEVEL=INFO (DEBUG, INFO, WARN, ERROR, FATAL)
- NEXT_PUBLIC_API_TIMEOUT="30000"
- NEXT_PUBLIC_API_RETRIES="3"
- NEXT_PUBLIC_API_RETRY_DELAY="1000"
- NODE_ENV="development"

## Security Features
- **JWT Token Security**: Comprehensive validation with structure, expiration, and issued-at time checks
- **CSRF Protection**: CSRF tokens and X-Requested-With headers
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, HSTS, and more
- **Route Protection**: Edge-level middleware protection with role-based access control
- **Input Validation**: Zod schema validation for all inputs
- **Secure Cookies**: httpOnly cookies in production, secure fallbacks in development

See `docs/SECURITY.md` for comprehensive security documentation.

## Authentication Overview
- Client-side authentication is handled by `lib/services/auth.ts` and `lib/contexts/AuthContext.tsx`.
- Access token is stored in a cookie named `token`; user info is stored in `localStorage`.
- Token refresh is supported via `POST /auth/token/refresh` (see `authService.refreshToken`).
- Global request/response handling and retry logic live in `lib/api/client.ts`.
- Middleware in `middleware.ts` guards routes by checking the `token` cookie and redirects unauthenticated users to `/login`.

See detailed docs: `docs/AUTHENTICATION.md`.

## Routing and Protected Areas
- Public marketing pages live under `app/` (e.g., `/about`, `/features`, `/solutions`).
- Auth-protected app areas live under `app/(protectedRoute)/` with role dashboards:
  - `admin/dashboard`, `bursar`, `teacher`, `parent`, `student`.
- Onboarding flow: `app/(protectedRoute)/onboarding`.
- Client-side protection helpers in `components/auth/protected-route.tsx`.

## Project Structure
```
app/                      # App Router pages, layouts, and route groups
components/               # UI components and feature sections
  ui/                     # Primitive UI components (Radix + shadcn-style)
  auth/                   # Auth forms and route helpers
  layout/                 # Site layout components
  sections/               # Marketing sections
hooks/                    # Reusable client hooks
lib/
  api/client.ts           # Axios client with interceptors, retry, refresh
  contexts/AuthContext.tsx# Auth provider and session state
  services/               # API service wrappers (auth, support, uploads, etc) this handles the data layer
  types/                  # Shared types (auth, api, onboarding)
  config/                 # Config helpers (routes, cloudinary)
middleware.ts             # Next.js middleware for auth gating
public/                   # Static assets
styles/ / app/globals.css # Tailwind + global styles
```

## AI Features
- AI Teaching Assistant: Q&A, explanations, remediation in context
- AI Lesson Planner: objectives, materials, assessments, differentiation
- Teacher/Admin Helper: create and delegate tasks to agents, track status
- AI Call Assistants: handle inbound/outbound calls; provide summaries and outcomes
- Intelligent insights for administrators (enrollment, attendance, finance trends)
- Student personalization: adaptive recommendations and study tips
- Parent summaries and notifications powered by analytics

See `docs/AI_FEATURES.md` for details and integration guidance.

## Development Notes
- Uses Turbopack in dev: `next dev --turbopack`.
- UI: Radix primitives with custom wrappers under `components/ui`.
- Forms: `react-hook-form` with `zod` resolvers.
- Charts: `recharts`.
- Carousel: `embla-carousel-react`.

## Adding a New API Call
1. Add a method in a service under `lib/services/` using the exported `apiClient`:
```ts
import { apiClient } from "@/lib/api/client"

export async function getSomething() {
  return apiClient.get("/something")
}
```
2. Use in a server action, route handler, or client component as appropriate.

## Security Scripts
```bash
# Security audit
npm run security:audit

# Fix security vulnerabilities
npm run security:fix

# Type checking
npm run type-check

# Lint and fix
npm run lint:fix
```

## Deployment
- Configure environment variables (API base URL, Cloudinary, etc.).
- Ensure cookies are set server-side as httpOnly in production for better security.
- Build with `next build`; run with `next start` or your platform's adapter.
- Common hosts: Vercel, Netlify, AWS Amplify, or Node server.

## Troubleshooting
- 401/403 after login: token may be missing/expired. Confirm `token` cookie is set and not httpOnly in dev.
- Infinite redirects to `/login`: check `middleware.ts` and token validity.
- CORS issues: configure your API backend to allow your frontend origin.

## License
Proprietary — All rights reserved.

## Contributing
- Create a feature branch, open a PR, and follow the existing code style.
- Use TypeScript types and prefer clear, descriptive names.
- Run security audits before submitting: `npm run security:audit`.
