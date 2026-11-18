# ADR 0010: Locale-Aware Currency Display

- Status: Accepted
- Date: 2026-11-18

## Context

Banquee is a banking mockup shown in four locales, and money appears everywhere: card pricing, savings previews, plan comparison, blog articles about money. A site that reads in German but prices in dollars breaks the illusion the design works hard to maintain.

Each locale has one natural currency: English reads as USD, German and Spanish as EUR, Arabic as SAR. There are no user accounts or settings, so language is the only signal available.

## Decision

Money is formatted by a single centralized utility, not by components.

- `i18n/currency.ts` owns the locale-to-currency mapping (`en → USD`, `de → EUR`, `es → EUR`, `ar → SAR`) and one formatter built on `Intl.NumberFormat`.
- A `useCurrency` hook exposes the formatter to components; no component calls `Intl.NumberFormat` directly.
- Monetary values in shared data modules stay as plain numbers with an explicit unit; formatting happens at render time.

## Alternatives Considered

- **Hardcode USD everywhere:** Cheapest, but German and Arabic pages would show foreign currency with foreign symbols in the middle of localized copy.
- **Per-component `Intl.NumberFormat` calls:** Duplicates the mapping in every section and invites drift — the exact inconsistency a design-token-driven codebase exists to avoid.
- **Currency chosen by the user:** Rejected because the site has no settings surface; language is the only honest signal, and adding a currency picker to a marketing mockup adds weight without value.
- **Locale defaults from `Intl` alone:** Wrongly ties currency to the browser's region rather than the page's language, producing combos like an English page with EUR.

## Consequences

### Positive

- One place to audit every monetary display.
- Formats (decimal separators, grouping, symbol position) follow each locale's real conventions, including Arabic.
- The hook is unit-tested, so a locale mapping regression fails loudly.

### Negative

- A reader who wants a currency other than their language's default has no option — accepted for a mockup.
- Adding a locale means deciding its currency explicitly in one file.
