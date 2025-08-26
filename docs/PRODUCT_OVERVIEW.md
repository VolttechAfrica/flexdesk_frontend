# Flexdesk Product Overview

## Vision
Empower schools with a unified, modern platform for administration, finance, teaching, parent engagement, and student learning.

## AI Positioning
FlexDesk revolutionizes education with AI-powered tools that streamline administration, enhance teaching, and create personalized learning experiences for every student.

## Target Users
- Administrators: oversee operations, reporting, configuration
- Bursars: manage billing, invoices, payments
- Teachers: classes, assessments, communication
- Parents: payments, student progress, announcements
- Students: coursework, schedules, notifications

## Core Value Propositions
- Single source of truth for academic and financial data
- Role-based dashboards tailored to each user type
- Secure, scalable, and extensible architecture
- AI-powered insights and assistance across roles

## Key Features (MVP)
- Authentication and onboarding
- Role-based dashboards for admin, bursar, teacher, parent, student
- Support/contact form and marketing site
- Profile and media upload support

## AI Capabilities (Initial)
- Administrator analytics: attendance, enrollment, finance trend summaries
- Teacher assistants: lesson plan suggestions, formative assessment ideas
- Student personalization: adaptive study tips and resource recommendations
- Parent summaries: concise weekly updates powered by analytics
- Support assistant: FAQ triage and recommended actions
- AI Teaching Assistant (Q&A, explanations, remediation)
- AI Lesson Planner (objectives, materials, assessments, differentiation)
- Teacher/Admin Helper (create and delegate tasks to agents)
- AI Call Assistants (handle inbound/outbound calls with summaries)
- Analytics and insights for operations and learning


## Non-Goals (MVP)
- Full LMS gradebook and curriculum authoring
- Complex finance modules (e.g., multi-currency, tax rules)
- Real-time chat/messaging

## KPIs
- Activation: % of invited users who complete onboarding
- Engagement: WAU/MAU across roles
- Retention: Day-7 and Day-30 retention
- Conversion: Free-to-paid or plan upgrades (if applicable)
- Reliability: API error rate, p95 latency

## Roadmap (High-level)
- Phase 1: Authentication, dashboards, support, marketing
- Phase 2: Payments integration, reporting, advanced permissions
- Phase 3: LMS features (assignments, submissions), communications
- Phase 4: Expand AI assistants and personalization, domain-specific models

## Architecture at a Glance
- Frontend: Next.js App Router, Tailwind, Radix UI
- API: External service via Axios client (`lib/api/client.ts`)
- Auth: Cookie-based JWT, middleware protection, context management
- Deploy: Vercel/Node host with environment-based API configuration

## Risks and Mitigations
- Authentication security: use httpOnly cookies in production, strict SameSite
- API dependency: graceful error handling and retries
- Multi-role complexity: clear role routes and permissions model
- AI quality and bias: human-in-the-loop review, transparent explanations
- Telephony compliance: consent/recording disclosures via backend flows

## References
- Authentication details: `docs/AUTHENTICATION.md`
- AI features: `docs/AI_FEATURES.md`
- Code structure: see `README.md`
