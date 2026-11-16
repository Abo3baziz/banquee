# ADR 0006: Use Motion for Animations

- Status: Accepted
- Date: 2026-11-16

## Context

The project requires polished interactions and animations without compromising accessibility or performance.

A dedicated animation library will help manage complex transitions and component interactions.

## Decision

Use Motion (formerly Framer Motion) for React animations.

Use it for:
- Component entrance animations.
- Page transitions where appropriate.
- Interactive feedback.
- Scroll-triggered animations.
- Layout transitions.
- Expand and collapse interactions.

Use CSS for simple transitions when a JavaScript animation library is unnecessary.

## Alternatives Considered

- CSS transitions and keyframes.
- GSAP.
- React Spring.

## Consequences

### Positive
- Declarative animation API.
- React integration.
- Complex animation support.
- Reusable animation patterns.

### Negative
- Additional JavaScript dependency.
- Excessive animation can negatively affect performance and usability.
- Requires reduced-motion handling.

## Constraints

- Respect `prefers-reduced-motion`.
- Avoid unnecessary animations.
- Prefer transform and opacity for animated elements.
- Avoid layout-heavy animations where possible.
