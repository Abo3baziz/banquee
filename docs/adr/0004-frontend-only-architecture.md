# ADR 0004: Adopt a Frontend-Only Architecture

- Status: Accepted
- Date: 2026-11-16

## Context

Banko is a portfolio project intended to demonstrate frontend engineering skills.

The project does not require real banking functionality, persistent user data, or server-side business operations.

Introducing a backend would add complexity without contributing meaningfully to the project's primary objectives.

## Decision

Build the application as a frontend-only mockup.

Use locally maintained TypeScript data files as the source of application content.

Examples include:
- Banking cards.
- Pricing plans.
- Features.
- Testimonials.
- Blog articles.
- FAQs.

Interactive features should simulate realistic frontend behavior where appropriate.

## Alternatives Considered

- Full-stack Next.js application.
- Separate frontend and backend repositories.
- External mock API.

## Consequences

### Positive
- Faster development.
- Simpler deployment.
- No database infrastructure.
- No API maintenance.
- More focus on UI quality and frontend architecture.

### Negative
- No persistent user data.
- No real authentication.
- No real banking operations.
- Some interactions will be simulated.

## Constraints

- No backend services.
- No database.
- No unnecessary API abstraction layers.
- Keep mock data separate from presentation components.
- Do not represent simulated banking operations as real transactions.
