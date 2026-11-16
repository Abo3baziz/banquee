# Localization Architecture & Guidelines (`LOCALIZATION.md`)

This document defines the localization structure, naming conventions, interpolation rules, and workflows for managing supported languages in the **Banquee / Banko** web application.

The application supports four locales:

- English (`en`) — Source of Truth, LTR.
- Arabic (`ar`) — RTL.
- Spanish (`es`) — LTR.
- German (`de`) — LTR.

---

## 1. File Structure & Namespaces

Translation dictionaries are stored in the `locales/` directory.

English is the primary source dictionary. All other locale dictionaries must maintain the same key structure.

```text
locales/
├── en.json         # Base English dictionary (Source of Truth)
├── ar.json         # Arabic translations (RTL)
├── es.json         # Spanish translations (LTR)
└── de.json         # German translations (LTR)
```

### Supported Locales

| Locale | Language | Direction | Status |
|---|---|---|---|
| `en` | English | LTR | Source of Truth |
| `ar` | Arabic | RTL | Supported |
| `es` | Spanish | LTR | Supported |
| `de` | German | LTR | Supported |

### Top-Level Namespaces

| Namespace | Scope / Description |
|---|---|
| `common` | Shared recurring actions (`Open Account`, `Login`, `Get Started`, `Read Article`, `Completed`, `View All`), brand naming, and global button labels. |
| `nav` | Global header navigation links (`Features`, `Compare`, `Support`, `Blog`). |
| `footer` | Footer brand taglines, column headers, navigation links, copyright notices, and legal items. |
| `landing` | Landing page content including Hero, Velocity Cashflow charts, Card tiers, feature cards, Send & Receive, Tools & Integrations, Manifesto, Testimonials, App download CTA, and blog snippet. |
| `featuresPage` | Dedicated Features page content: Hero stats, Send & Receive breakdown, Card Management, Cash Control & analytics, and Savings accounts. |
| `compareCards` | Card comparison page: Plan cards (Premium, Gold, Plat), detailed comparison tables (Credit Card, Bank Account, Extra Features), and security CTA banner. |
| `support` | Customer support and Help Center: Hero, categorized FAQ questions and answers (`cards`, `account`, `personalDetails`), and contact channels (`Hotline`, `Email`, `Chat with us`). |
| `blog` | Editorial blog index and article details: Hero, filter categories, article cards, breadcrumbs, table of contents, article body, author CTA, sharing links, and related articles. |
| `mockups` | Embedded smartphone banking UI strings: Dashboard balances, transaction history, Send & Receive composer, Transaction Details, Cards Management, Statistics, and Savings Vaults. |

---

## 2. Key Naming Conventions

1. **CamelCase Keys:** All keys must use descriptive `camelCase` identifiers (e.g., `ctaPrimary`, `totalInflowBadge`, `recentTransactions`).
2. **Context-Specific Grouping:** Group sub-components logically (e.g., `support.faqs.cards.q1`, `support.faqs.cards.a1`).
3. **No Brittle Index Keys:** Use descriptive semantic names instead of generic keys such as `text1` or `label2`.
4. **Verbatim Fidelity:** Preserve the intended meaning, capitalization, punctuation, and typographical symbols where appropriate.
5. **Consistent Key Structure:** All locale dictionaries must contain exactly the same keys as `en.json`.
6. **No Hardcoded UI Text:** User-facing application strings must come from translation dictionaries.

---

## 3. Dynamic Variables & Interpolation Syntax

Dynamic values use double-bracket Mustache-style placeholders: `{{variable}}`.

Examples:

**Copyright year**
```json
{
  "copyright": "© {{year}} banquee. All rights reserved."
}
```

**User greetings**
```json
{
  "welcome": "Good morning, {{name}}"
}
```

**Transfer details**
```json
{
  "transferDetail": "Sarah Johnson sent you {{amount}}"
}
```

### Interpolation Rules

- Never translate or rename interpolation variables.
- Preserve the exact placeholder names across every locale.
- Use locale-aware formatting for dates, numbers, and currencies.
- Avoid manually concatenating translated sentences.
- Prefer complete translated sentences with named variables.

---

## 4. Localization Rules by Language

### English (`en`)

- Primary source dictionary.
- All new translation keys must be introduced here first.
- Use clear, natural English.
- Maintain consistent terminology throughout the application.

### Arabic (`ar`)

- Direction: RTL.
- Use natural, professionally written Arabic.
- Apply `dir="rtl"` at the document level.
- Use CSS logical properties instead of hardcoded left/right positioning.
- Verify mixed Arabic and Latin content, numbers, and currency values.
- Ensure icons and directional controls behave correctly.

### Spanish (`es`)

- Direction: LTR.
- Use natural, neutral Spanish suitable for an international audience.
- Maintain consistent banking and financial terminology.
- Account for longer translated text when designing buttons, navigation, and cards.
- Use locale-aware number, date, and currency formatting.
- Avoid assuming Spanish translations have the same text length as English.

### German (`de`)

- Direction: LTR.
- Use natural, professional German.
- Maintain consistent banking and financial terminology.
- Account for potentially longer words and compound nouns.
- Ensure buttons, navigation, cards, and comparison tables accommodate longer text.
- Use locale-aware number, date, and currency formatting.

---

## 5. Instructions for Adding or Updating a Language

### Adding a New Locale

1. Copy the English source dictionary:

```bash
cp locales/en.json locales/es.json
```

Replace `es` with the desired locale code.

2. Translate values only:
   - Maintain the exact JSON key hierarchy.
   - Preserve key names and casing.
   - Do not translate interpolation placeholders.
   - Preserve the intended meaning and context.
   - Adapt date, number, and currency formatting to the target locale.

3. Register the locale in the application's next-intl configuration.

4. Configure the appropriate writing direction:
   - `ar`: RTL.
   - `en`, `es`, `de`: LTR.

5. Verify routing and locale switching.

6. Validate translation completeness before considering the locale ready.

### Adding New Translation Keys

When introducing a new user-facing string:

1. Add the key to `en.json`.
2. Add the equivalent translation to `ar.json`.
3. Add the equivalent translation to `es.json`.
4. Add the equivalent translation to `de.json`.
5. Run translation validation.

Never introduce a key in only one language.

---

## 6. RTL / LTR Implementation

The application must derive its writing direction from the active locale.

| Locale | HTML `lang` | HTML `dir` |
|---|---|---|
| `en` | `en` | `ltr` |
| `ar` | `ar` | `rtl` |
| `es` | `es` | `ltr` |
| `de` | `de` | `ltr` |

Example:

```tsx
<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
```

### Styling Requirements

Use logical CSS properties:

| Avoid | Prefer |
|---|---|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `text-align: left` | `text-align: start` |
| `left` | `inset-inline-start` |
| `right` | `inset-inline-end` |

Additional requirements:

- Use logical properties in StyleX styles.
- Verify directional icons and navigation controls.
- Ensure tables and phone mockups work in both directions.
- Use `dir="ltr"` for content that must remain left-to-right, such as certain account numbers or email addresses, when appropriate.
- Do not reverse the entire interface using CSS transforms.

---

## 7. Translation Validation

Every locale must be validated against `en.json`.

Validation requirements:

- No missing keys.
- No unexpected additional keys.
- No duplicate keys.
- Valid JSON syntax.
- Matching interpolation placeholders.
- Correct locale registration.
- Correct writing direction.

### Translation Completeness Matrix

| Validation | EN | AR | ES | DE |
|---|---|---|---|---|
| Valid JSON | Required | Required | Required | Required |
| Complete keys | Required | Required | Required | Required |
| Matching placeholders | Required | Required | Required | Required |
| Correct direction | LTR | RTL | LTR | LTR |
| Localized metadata | Required | Required | Required | Required |
| Visual verification | Required | Required | Required | Required |

---

## 8. Quality Assurance

Before releasing localization changes, verify:

- All four languages are available through the locale switcher.
- Every page has translated content.
- Navigation and footer links are translated.
- No untranslated strings remain.
- No text is clipped or overflowing.
- Buttons and cards accommodate translated text.
- RTL layouts work correctly.
- Dates, numbers, and currencies use the appropriate locale.
- Metadata and page titles are localized.
- All interpolation variables render correctly.

---

## 9. Source of Truth

`locales/en.json` is the canonical translation structure.

Other locale dictionaries must always remain synchronized with its keys and interpolation variables.

The supported locales are:

`en`, `ar`, `es`, `de`.

Any future locale must follow the same structure, naming conventions, validation rules, and localization requirements.