# ADR 0002: Use StyleX for Styling

- Status: Accepted
- Date: 2026-11-16

## Context

The project requires a maintainable styling solution that supports reusable components, design tokens, responsive layouts, type-safe styling, and efficient CSS generation.

The project also needs consistent RTL/LTR support.

## Decision

Use StyleX as the exclusive styling system.

StyleX will be responsible for:
- Component-level styles.
- Design tokens.
- Responsive styles.
- Theme definitions.
- Style composition.
- RTL/LTR-compatible styling through logical CSS properties.

Use StyleX's compile-time styling approach instead of runtime-generated component styles.

## Alternatives Considered

- **Tailwind CSS:** Utility-first styling with a different development approach.
- **CSS Modules:** Native scoped CSS with less integrated style composition.
- **Emotion / Styled Components:** Runtime-oriented CSS-in-JS solutions.
- **Vanilla Extract:** Build-time CSS with a different API and styling model.

## Consequences

### Positive
- Compile-time CSS generation.
- Predictable style composition.
- TypeScript-friendly styling.
- Reusable design tokens.
- No need for Tailwind utility classes.
- Encourages consistent component styling.

### Negative
- Requires compiler integration and configuration.
- Smaller ecosystem compared with Tailwind.
- Developers need to understand StyleX conventions.
- Third-party component styles may require additional integration work.

## Constraints

- Do not introduce Tailwind CSS.
- Do not introduce another CSS-in-JS framework.
- Prefer logical CSS properties over directional properties.
- Validate Next.js integration before establishing the component foundation.

## Implementation Note

Next.js integration must use a compatible StyleX compiler and server-side style extraction setup. Verify compatibility with the selected Next.js version before implementation.
