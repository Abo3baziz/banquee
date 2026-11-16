# ADR 0007: Minimize Client-Side State

- Status: Accepted
- Date: 2026-11-16

## Context

The project is primarily a static content-oriented frontend with limited interactive functionality.

Introducing a global state management library without a clear requirement would increase complexity.

## Decision

Use React's built-in state management as the default.

Prefer:
- `useState` for local component state.
- `useReducer` for complex local state transitions.
- React Context for genuinely shared, relatively stable state.

Zustand may be introduced when shared client state becomes sufficiently complex to justify it.

## Alternatives Considered

- Redux Toolkit.
- Zustand.
- React Context for all application state.
- React built-in state.

## Consequences

### Positive
- Less boilerplate.
- Smaller dependency footprint.
- Simpler component logic.
- Reduced unnecessary global state.

### Negative
- Shared state may require additional composition.
- Complex interactions may eventually justify a dedicated state library.

## Constraints

- Do not introduce Redux by default.
- Do not use global state for static content.
- Keep state as close as possible to the components that consume it.
- Introduce Zustand only when a concrete requirement justifies it.
