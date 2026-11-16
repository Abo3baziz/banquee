# Technical Stack

## 1. Project Overview

Banko is a frontend-only banking website mockup built as a portfolio project.

The project demonstrates production-quality frontend engineering, including accessibility, internationalization, SEO, loading performance, responsive design, and maintainable architecture.

There is no backend, database, or real authentication system. Application data is provided through static mock data.

## 2. Core Technologies

| Category | Technology | Responsibility |
|---|---|---|
| Framework | Next.js (App Router) | Routing, rendering, SEO |
| Language | TypeScript | Static type safety |
| Styling | StyleX | Component styling and design tokens |
| UI primitives | Radix UI | Accessible interaction primitives |
| Icons | Lucide React | Iconography |
| Animations | Motion | UI animations and transitions |
| Localization | next-intl | Arabic, English, Spanish and German |
| Forms | React Hook Form | Form state and handling |
| Validation | Zod | Schema validation |
| State management | React state | Local UI state |
| Optional state | Zustand | Shared client state when justified |

## 3. Development and Quality Tools

| Category | Technology | Responsibility |
|---|---|---|
| Unit testing | Vitest | Unit tests |
| Component testing | React Testing Library | Component behavior |
| E2E testing | Playwright | User workflows |
| Accessibility testing | axe-core | Automated accessibility checks |
| Linting | ESLint | Code quality |
| Formatting | Prettier | Consistent formatting |
| Package manager | pnpm | Dependency management |
| Hosting | Vercel | Deployment |

## 4. Quality Attributes

### 4.1 Accessibility (A11y)

Target: WCAG 2.2 AA.

Requirements:
- Semantic HTML.
- Full keyboard navigation.
- Visible focus indicators.
- Accessible forms and validation errors.
- Appropriate ARIA attributes.
- Screen reader compatibility.
- Sufficient color contrast.
- Reduced-motion support.

Implementation:
- Radix UI for accessible interaction primitives.
- axe-core for automated accessibility testing.
- Manual keyboard and screen reader testing.

### 4.2 Localization

Supported locales:
- English (`en`): LTR.
- Spanish (`es`): LTR.
- German (`de`): LTR.
- Arabic (`ar`): RTL.

Requirements:
- Locale-based routing.
- Complete translation coverage.
- RTL/LTR layout support.
- Locale-aware number and date formatting.
- Localized page metadata.
- Appropriate typography for each language.

Technology: next-intl.<br>
Reference Example (Github Repo): [link](https://github.com/amannn/next-intl/tree/main/examples/example-app-router).<br>
Official Documentaion: [link](https://next-intl.dev/docs/getting-started/app-router)

### 4.3 SEO

Requirements:
- Page-specific metadata.
- Open Graph metadata.
- Semantic HTML structure.
- Sitemap and robots.txt.
- Canonical URLs where appropriate.
- Structured data where applicable.
- Server-rendered content.

Implementation: Next.js Metadata API and static rendering.

### 4.4 Performance

Requirements:
- Minimize JavaScript delivered to the browser.
- Prefer Server Components.
- Avoid unnecessary client-side rendering.
- Optimize images using `next/image`.
- Lazy-load non-critical content.
- Avoid unnecessary dependencies.
- Prevent layout shifts.
- Respect reduced-motion preferences.

### 4.5 Responsiveness

Requirements:
- Mobile-first implementation.
- Fluid layouts.
- Consistent spacing and typography.
- Responsive navigation.
- Touch-friendly interaction targets.
- No horizontal overflow.
- Support common mobile, tablet, and desktop viewport sizes.

StyleX will handle responsive styling through media queries.

## 5. Architecture Principles

1. Server Components by default.
2. Client Components only when browser-side interactivity is required.
3. Keep business and presentation concerns separated.
4. Prefer reusable components over duplicated implementations.
5. Keep mock data separate from UI components.
6. Use logical CSS properties to support RTL/LTR.
7. Avoid unnecessary dependencies and abstractions.
8. Keep styling within StyleX.
9. Prefer native React state before introducing global state management.
10. Treat accessibility as a development requirement, not a final polish step.

## 6. Data Strategy

All application data is static and locally defined.

Examples:
- Banking cards.
- Features.
- Testimonials.
- Blog articles.
- Pricing plans.
- FAQ entries.

No backend, database, or external API integration is required.

Forms and account-related interactions may use simulated frontend behavior.

## 7. Rendering Strategy

| Page / Component | Strategy |
|---|---|
| Homepage | Static rendering |
| Features | Static rendering |
| Compare | Static rendering |
| Support | Static rendering |
| Blog listing | Static rendering |
| Blog articles | Static rendering |
| Interactive UI | Client Components where needed |

Use Server Components by default and avoid making entire pages client-rendered unnecessarily.

## 8. Styling Strategy

StyleX is the exclusive styling solution.

- Centralized design tokens.
- Reusable component styles.
- Responsive media queries.
- Logical properties for RTL/LTR.
- Consistent spacing, typography, and colors.
- No Tailwind CSS or competing styling frameworks.

## 9. Scope Exclusions

The following are intentionally excluded:
- Backend services.
- Database.
- Real authentication.
- Payment processing.
- Real banking integrations.
- Content management system.
- Server-side business logic.
- Redux or other unnecessary global state solutions.

## 10. Decision Records

Architecture decisions are documented separately under `docs/adr/`.

All significant changes to the agreed architecture should be recorded in an ADR.
