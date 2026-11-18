# ADR 0012: Use Lucide React for Icons

- Status: Accepted
- Date: 2026-11-18

## Context

The site shell and every section need a consistent icon set: navigation, payments, feature bullets, FAQ chevrons, social marks. Icons appear inside Radix primitives, StyleX-styled components, and both LTR and RTL layouts.

## Decision

Use `lucide-react` for all general-purpose stroke icons.

- Import icons individually so the bundle only carries what is rendered.
- Icons accept StyleX-passed sizing and color through their normal props; no global icon CSS.
- Payment network marks (Visa, Mastercard, PayPal, etc.) are project SVGs in `assets/`, not icon-library glyphs — they are brand assets, not UI icons.

## Alternatives Considered

- **Icon fonts:** Render as glyphs with font-loading shifts, no multicolor support, and accessibility hacks (`aria-hidden`, unicode fallbacks) — obsolete for this stack.
- **Hand-drawn SVG set:** Full control but high maintenance cost and inevitable stroke-width inconsistency across authors and agents.
- **Other React icon libraries:** `react-icons` bundles many families through heavyweight packages that invite treeshaking issues; Heroicons is a credible alternative, but its smaller set misses several banking-UI marks (contactless, landline support, QR) that Lucide already provides with a consistent 2px stroke.

## Consequences

### Positive

- One visual language for every icon, matching the thin-stroke minimal aesthetic.
- Tree-shakeable per-icon imports keep the client bundle small.
- Predictable props for size and color integrate with StyleX styling.

### Negative

- A large icon surface means discipline is required to keep imports named and minimal.
- Brand and payment marks still need separate SVG assets — the library does not cover them.

## Implementation Note

Never restyle icon internals; size and color through props and tokens only, so icons respond to theme and locale changes like every other component.
