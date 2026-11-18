# ADR 0009: Validate Forms with React Hook Form and Zod

- Status: Accepted
- Date: 2026-11-18

## Context

Upcoming interactive flows (simulated sign-up, support contact forms) need controlled, validated inputs in a codebase with four locales. Validation errors must be localizable through the existing `messages/<locale>.json` dictionaries, and form logic must stay out of server components.

## Decision

Use React Hook Form for form state and Zod schemas as the single definition of validity.

- Zod schemas define the rules; React Hook Form binds them to inputs via `zodResolver`.
- Validation messages map to dictionary keys, so every error renders in the active locale.
- Inputs stay uncontrolled between renders — React Hook Form only re-renders the fields that change.

## Alternatives Considered

- **Formik:** Mature, but re-renders the whole form tree on each keystroke and its API has not kept pace with React 19 patterns.
- **Native HTML validation only:** Browser-native messages cannot be styled consistently, translated reliably across locales, or surfaced to screen readers in the site's design language.
- **Zod alone with manual state:** Duplicates wiring (values, touched, errors) that React Hook Form already provides, for no benefit at this scale.
- **Final Form:** Capable, but a smaller ecosystem and less RSC-era momentum.

## Consequences

### Positive

- One schema per form is the source of truth; UI and rules stay separate.
- Localized error handling with no per-locale branching in components.
- Minimal re-renders on interactive forms.

### Negative

- Two libraries to learn instead of one.
- Schemas written ahead of the flows that use them (installed for the upcoming form work, not yet wired to screens).

## Implementation Note

Keep schemas in the feature folder that consumes them; only shared validation shapes belong in `src/data/` or a shared module.
