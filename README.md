<p align="center">
  <img src="./assets/app-icon.svg" alt="Banquee app icon" width="104" height="104" />
</p>

<h1 align="center">Banquee</h1>

<p align="center">
  A banking website I designed and built from scratch as a portfolio project.<br />
  No backend. No real accounts. Just a lot of care for the UI.
</p>

<p align="center">
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" />
  <img alt="TypeScript 5" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="StyleX" src="https://img.shields.io/badge/StyleX-0.19-006B5C" />
  <img alt="Locales" src="https://img.shields.io/badge/locales-en%20%C2%B7%20de%20%C2%B7%20es%20%C2%B7%20ar%20(RTL)-5BB5A2" />
  <img alt="Tests" src="https://img.shields.io/badge/tests-Vitest-6E9F18?logo=vitest&logoColor=white" />
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-3E4946" />
</p>

## 👋 What this is

Banquee is a frontend-only banking website: five pages, four locales, and a design system that started in Figma before a single line of code was written.

There is no database, no authentication, and no payment processing. Content is local and static, so the focus stays on layout, accessibility, motion, and the small details that make a page feel finished.

## 🙋 My role

I owned this project end to end, from the first artboard to the last test:

- **UI/UX design** — The visual language is mine: a mint-and-ink palette built on tonal surface layering instead of drop shadows, a type scale pairing Sora/Inter with Cairo/Tajawal for Arabic, 8px spacing rhythm, and component specs for buttons, chips, inputs, cards, and transaction lists. I designed full screens for every website page plus five phone app screens (home, cards, savings, stats, support), which the site's animated demos are modeled on. The design sources live in a local `ui designs/` folder that isn't tracked in this repo.
- **Code implementation** — The code was not written by hand: I directed an AI coding agent that implemented everything in this repository from my designs and specs — the StyleX design tokens, every page and component, the next-intl routing with RTL support, the locale-aware currency utilities, the automated phone demos with gesture-driven interactions, and the test suite. I reviewed, tested, and merged every change it produced.

## 🧭 What's built

### Pages

- **Landing** — hero with layered card mockups and a flip interaction, feature highlights, cashflow analytics, card plans with flippable 3D mockups, send & receive with a phone transaction preview, tools & integrations, manifesto with editorial imagery, customer testimonials, app download CTA with a dashboard mockup, blog preview, and a need-help section
- **Features** — product features with automated statistics, cards, and savings phone demos, hooked into the plans, app CTA, and support sections
- **Compare cards** — the app's three real cards compared around product terms (fees, rates, limits) with full RTL support
- **Blog** — listing with a featured article and category filters, plus article pages with a sticky table of contents, share links, related articles, and complete SEO metadata
- **Support** — searchable categorized FAQs and contact channels
- **404** — styled for unknown routes in every locale

### Shell & interactions

- Responsive header that hides on scroll down and reveals on scroll up, kept out of the tab order while hidden
- Radix-based language switcher and slide-in mobile menu
- Floating back-to-top button with reduced-motion support
- Footer with localized columns and legal links
- Automated demos driven by realistic finger gestures that stay inside their stages

### Localization

- Four locales: English, German, Spanish, and Arabic (RTL)
- Locale-aware currency display: every monetary value follows the selected language — USD for English, EUR for German and Spanish, SAR for Arabic

## 🛠️ Stack

| Layer           | Choice                                        |
| --------------- | --------------------------------------------- |
| ⚡ Framework    | Next.js 16, App Router, Turbopack             |
| ⚛️ UI           | React 19, Server Components by default        |
| 🔷 Language     | TypeScript                                    |
| 🎨 Styling      | StyleX with the Babel + PostCSS pipeline      |
| 🧩 Primitives   | Radix UI                                      |
| ✨ Icons        | Lucide React                                  |
| 🎞️ Motion       | Motion for scroll and gesture interactions    |
| 📝 Forms        | React Hook Form + Zod (for upcoming flows)    |
| 🌍 Localization | next-intl                                     |
| 🧪 Testing      | Vitest, Testing Library, Playwright, axe-core |
| 🧹 Tooling      | ESLint, Prettier, pnpm                        |

## 🚀 Run it

Requires Node.js 22+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3010](http://localhost:3010) — the dev server runs on port 3010.

### Scripts

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `pnpm dev`          | Start the development server          |
| `pnpm build`        | Build for production                  |
| `pnpm start`        | Serve the production build            |
| `pnpm lint`         | Run ESLint                            |
| `pnpm typecheck`    | Run TypeScript without emitting files |
| `pnpm test`         | Run Vitest once                       |
| `pnpm test:watch`   | Run Vitest in watch mode              |
| `pnpm test:e2e`     | Run Playwright                        |
| `pnpm format`       | Format with Prettier                  |
| `pnpm format:check` | Check formatting                      |

## 🌍 Localization

| Locale | Language | Direction | Currency |
| ------ | -------- | --------- | -------- |
| `en`   | English  | LTR       | USD      |
| `de`   | German   | LTR       | EUR      |
| `es`   | Spanish  | LTR       | EUR      |
| `ar`   | Arabic   | RTL       | SAR      |

Messages live in `messages/<locale>.json`; English is the source of truth. Routing and locale-aware links are in `i18n/`, the currency mapping and formatter are in `i18n/currency.ts`, and the localization rules are in [docs/LOCALIZATION.md](docs/LOCALIZATION.md).

The dictionaries use `{{variable}}` placeholders. The footer interpolates the copyright year without changing that convention.

## 🎨 Design

The visual language is light, calm, and a little editorial. Depth comes from tonal surface layering rather than shadows.

| Token       | Value     | Used for                         |
| ----------- | --------- | -------------------------------- |
| Mint        | `#5BB5A2` | Primary container, brand accents |
| Deep teal   | `#006B5C` | Primary text, buttons, the 404   |
| Surface     | `#F9F9F9` | Page background                  |
| Surface low | `#F3F3F3` | Footer                           |
| Ink         | `#1A1C1C` | Headings                         |
| Muted ink   | `#3E4946` | Body and secondary text          |

Latin-script pages use **Sora** for headings and **Inter** for UI text. Arabic pages use **Cairo** for headings and **Tajawal** for body copy. Spacing follows an 8px rhythm, and the shared shell is capped at 80rem. Tokens live in [src/styles/tokens.stylex.ts](src/styles/tokens.stylex.ts).

## 🗂️ Project layout

```text
src/
  app/[locale]/          # locale layout, home, blog, compare, features, support, 404
  components/
    landing/             # hero, plans, testimonials, and the other home sections
    banking-card/        # flippable 3D card mockup
    banking-demo/        # gesture-driven phone demo
    statistics-demo/     # analytics phone demo
    savings-demo/        # savings goal phone demo
    cards-demo/          # card capability previews
    compare/             # comparison table and data
    blog/                # article cards, TOC, share links
    support/             # searchable FAQs and contact channels
    features/            # features page sections
    layout/              # header, footer, language switcher
    phone/               # phone frame used by the demos
    ui/                  # back-to-top, CTA, shared pieces
  data/                  # shared demo and content data
  hooks/                 # shared hooks (useCurrency)
  styles/tokens.stylex.ts
i18n/                    # routing, request config, navigation, currency
messages/                # en, de, es, ar dictionaries
docs/                    # tech stack, localization, ADRs
assets/                  # brand and payment SVGs
```

## 🧪 Testing

Unit and component tests run on Vitest with Testing Library: the flippable bank card, demo sequencing and gesture indicators, blog data and article TOC/share, compare and savings data, support utilities, the scroll-direction hook, and the currency hook.

Playwright and axe-core are configured for end-to-end accessibility specs; those haven't been written yet.

## 📚 Docs

- [docs/TECH_STACK.md](docs/TECH_STACK.md) — the agreed stack and quality targets
- [docs/LOCALIZATION.md](docs/LOCALIZATION.md) — locale structure, naming, and RTL rules
- [docs/adr/](docs/adr/) — architecture decision records
- [AGENTS.md](AGENTS.md) — contribution and agent rules

## ⚠️ A note

Banquee is a mockup. It is not a bank, it does not hold money, and its account flows are simulated.

## 📄 License

Released under the [MIT License](LICENSE).

---

<p align="center">
  Designed and built by <a href="https://github.com/Abo3baziz">Abo3baziz</a>.
</p>
