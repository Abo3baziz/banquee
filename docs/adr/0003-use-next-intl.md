# ADR 0003: Use next-intl for Localization

- Status: Accepted
- Date: 2026-11-16

## Context

The project supports English and Arabic.

Both languages require proper localization, including different writing directions, translated content, metadata, and locale-aware formatting.

A centralized localization solution is required.

## Decision

Use next-intl for localization.

Use locale-based routing:
- `/en`
- `/es`
- `/de`
- `/ar`

The application must support:
- English (LTR).
- Spainsh (LTR).
- German (LTR).
- Arabic (RTL).
- Translation dictionaries.
- Locale-aware navigation.
- Localized metadata.
- Number and date formatting.
- Locale-aware messages.

## Alternatives Considered

- **Custom React Context:** Requires maintaining translation infrastructure manually.
- **i18next:** Mature and flexible but introduces a different integration approach.
- **next-intl:** Provides a Next.js-oriented localization solution.

## Consequences

### Positive
- Centralized translations.
- Integrated locale-based routing.
- Support for server and client components.
- Locale-aware formatting.
- Better separation of content and presentation.

### Negative
- Additional routing configuration.
- Translation keys require maintenance.
- Both locales must be tested to prevent layout inconsistencies.

## Constraints

- No hardcoded user-facing strings in application components.
- Translation keys must be organized consistently.
- Both RTL and LTR layouts must be tested.
- Avoid using directional CSS properties when logical alternatives exist.
