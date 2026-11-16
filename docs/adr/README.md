# Architecture Decision Records

This directory contains the architectural decisions made during the development of Banko.

## ADR Statuses

- **Proposed:** Under consideration.
- **Accepted:** Approved and adopted.
- **Deprecated:** No longer recommended.
- **Superseded:** Replaced by another decision.

## Decision Records

| ADR | Decision | Status |
|---|---|---|
| [0001](0001-use-nextjs-app-router.md) | Use Next.js App Router | Accepted |
| [0002](0002-use-stylex.md) | Use StyleX for styling | Accepted |
| [0003](0003-use-next-intl.md) | Use next-intl for localization | Accepted |
| [0004](0004-frontend-only-architecture.md) | Adopt frontend-only architecture | Accepted |
| [0005](0005-use-radix-ui.md) | Use Radix UI primitives | Accepted |
| [0006](0006-use-motion.md) | Use Motion for animations | Accepted |
| [0007](0007-minimize-client-state.md) | Minimize client-side state | Accepted |

## Creating New ADRs

Use the naming convention `NNNN-short-descriptive-title.md`.

Each ADR should include:
1. Title
2. Status
3. Context
4. Decision
5. Alternatives Considered
6. Consequences

ADRs should document meaningful architectural decisions, not every dependency installation or minor implementation detail.

Once accepted, an ADR should not be silently rewritten when a decision changes. Create a new ADR and reference the superseded record.
