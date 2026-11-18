# ADR 0008: Use Vitest and Testing Library for Unit and Component Tests

- Status: Accepted
- Date: 2026-11-18

## Context

The project needs a test layer that can verify hooks, utilities, and rendered component behavior — the demo sequencing logic, the currency hook, comparison data, the scroll-direction hook, and searchable FAQ filtering. The stack is TypeScript, React 19, Next.js App Router, and StyleX, and the tests must run quickly enough to be part of every change.

Playwright is already installed for end-to-end accessibility work, but it is the wrong tool for logic-level feedback: it needs a running server and a real browser per run.

## Decision

Use Vitest with jsdom as the default environment, plus Testing Library (`@testing-library/dom`, `react`, `user-event`) for component queries and interaction.

- Tests are colocated with the code they test (`*.test.ts` / `*.test.tsx` next to the component).
- `vitest.setup.ts` loads `@testing-library/jest-dom` matchers globally.
- Vitest configuration reuses the Babel pipeline so StyleX-processed components compile in tests.
- Playwright stays reserved for future end-to-end browser and accessibility checks, not unit concerns.

## Alternatives Considered

- **Jest:** The default choice historically, but it requires more configuration for TypeScript + ESM + JSX transform steps that Vitest handles out of the box, and its watch/re-run cycle is slower.
- **Playwright component testing:** Runs components in a real browser, which is closer to production but much slower and heavier for logic tests; kept out of the unit loop.
- **Playwright e2e only:** Too coarse — a failing e2e cannot point at a broken step in a demo sequence the way a `use-demo-sequence` unit test can.
- **No test layer:** Rejected; the locale-aware currency logic and demo choreography are exactly the kind of code that silently regresses without one.

## Consequences

### Positive

- Fast watch mode that fits the development loop.
- Tests live next to components, so the folder shape explains what is covered.
- Hooks and utilities are testable without a browser or a dev server.
- jest-dom matchers keep assertions readable.

### Negative

- jsdom has no real layout or CSS cascade, so StyleX visual output cannot be asserted directly.
- Behavior that depends on real browser layout still needs the future Playwright suite.

## Implementation Note

Component tests import StyleX-styled components through the Babel pipeline defined in `babel.config.js`; the same config powers the Next.js build, so test output matches production transforms.
