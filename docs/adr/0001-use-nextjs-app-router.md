# ADR 0001: Use Next.js App Router

- Status: Accepted
- Date: 2026-11-16

## Context

The project requires a multi-page frontend with strong SEO, good initial loading performance, static content, and interactive components.

A framework is needed that supports server rendering, static generation, routing, and modern React development.

## Decision

Use Next.js with the App Router and TypeScript.

Use React Server Components by default and introduce Client Components only when browser-side interactivity is required.

Use static rendering for content-oriented pages wherever possible.

## Alternatives Considered

- **React + Vite:** Excellent for client-side applications but requires additional solutions for routing and SEO-oriented rendering.
- **Remix / React Router:** Viable alternatives, but Next.js provides the desired integrated rendering and routing capabilities.
- **Plain React:** Requires additional infrastructure and libraries.

## Consequences

### Positive
- Integrated routing and rendering.
- Built-in SEO capabilities.
- Static generation support.
- Server Components.
- Image optimization.
- Strong TypeScript ecosystem.

### Negative
- More framework conventions to learn.
- Requires careful separation of server and client components.
- Some configuration complexity when integrating third-party tools such as StyleX.
