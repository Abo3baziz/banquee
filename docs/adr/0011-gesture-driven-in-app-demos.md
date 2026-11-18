# ADR 0011: Automated Gesture-Driven Demos Instead of Video

- Status: Accepted
- Date: 2026-11-18

## Context

The features and landing pages need to show the phone app in use — moving money, filling savings goals, browsing statistics. Product teams usually solve this with a screen recording, a GIF, or a static screenshot, but each of those conflicts with how the rest of the site works: they cannot inherit design tokens, cannot respond to reduced-motion preferences, and never match the site's fonts or colors exactly.

## Decision

Demos are scripted component compositions, not media.

- A shared `components/phone/` frame renders the device; every demo reuses it.
- Each demo has a data file (what the screens show) and a sequencing hook (`use-demo-sequence`) that walks through steps on a timer.
- A gesture layer (`demo-tap-indicator` and related components) draws taps, swipes, and drags so the sequence reads as a person using the app, and every gesture stays inside its demo's stage — a tap indicator never escapes the phone bounds.
- When the user prefers reduced motion, the sequence collapses to a static end state instead of playing.

## Alternatives Considered

- **Video or GIF embed:** Faithful to a real app but heavy, impossible to restyle, ignores `prefers-reduced-motion`, and shows typography that can never match the site's loaded fonts.
- **Static screenshots:** Lighter and honest, but tells no motion story — the whole point is showing the app being used.
- **Fully interactive embedded app:** Technically impressive but overkill for marketing; it hijacks scrolling and page focus and adds an accessibility burden no visitor asked for.
- **CSS-only looping animation without a sequence model:** Simpler, but untestable — with a sequencing hook, unit tests can prove steps advance and releases stay in bounds; with raw CSS timers they cannot.

## Consequences

### Positive

- Demos inherit the design system: fonts, colors, and currency formats match the page around them.
- Choreography logic is unit-tested, including the stage-bounds rule.
- Reduced-motion users get a deliberate end state, not a frozen mid-animation.

### Negative

- Real code to maintain: every demo needs authored steps and gesture data.
- Bounds and timing bugs surfaced during development and required follow-up fixes — the cost of choreography living in code.

## Implementation Note

Keep the four-file split per demo (composition, gesture visuals, sequence hook, data). When a demo misbehaves, the failing concern is identifiable from the file it lives in.
