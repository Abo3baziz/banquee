<p align="center">
  <img src="./assets/app-icon.svg" alt="Banquee app icon" width="104" height="104" />
</p>

<h1 align="center">Banquee</h1>

<p align="center">
  A frontend-only banking site built as a portfolio project.<br />
  No backend. No real accounts. Just a lot of care for the UI.
</p>

<p align="center">
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" />
  <img alt="TypeScript 5" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="StyleX" src="https://img.shields.io/badge/StyleX-0.19-006B5C" />
  <img alt="Status: in progress" src="https://img.shields.io/badge/status-in%20progress-F5A623" />
</p>

## 👋 What this is

Banquee is a banking website mockup with a mint-and-ink design system, four locales, and a shared shell that the rest of the pages will plug into.

The project is intentionally frontend-only: no database, no authentication, no payment processing. Content is local and static, so the focus stays on layout, accessibility, motion, and the small details that make a page feel finished.

## 🧭 Where it stands

The shared pieces are in place:

- ✅ Next.js App Router with React Server Components by default
- ✅ StyleX design tokens and component styles
- ✅ Four locales: English, German, Spanish, and Arabic (RTL)
- ✅ Responsive site header with a Radix language switcher, Lucide icons, and a slide-in mobile menu
- ✅ Footer with localized columns, legal links, and copyright
- ✅ Landing hero with layered card mockups and a flip interaction
- ✅ Feature highlights strip and cashflow analytics section
- ✅ Card plans with flippable 3D mockups and capability previews
- ✅ Send & receive section with a phone transaction preview
- ✅ Styled 404 for unknown locale routes
- ✅ App icon and favicon

The landing hero, highlights, analytics, and card plans are in place. The remaining landing sections are next.

## 🛠️ Stack

| Layer           | Choice                                        |
| --------------- | --------------------------------------------- |
| ⚡ Framework    | Next.js 16, App Router, Turbopack             |
| ⚛️ UI           | React 19                                      |
| 🔷 Language     | TypeScript                                    |
| 🎨 Styling      | StyleX with the Babel + PostCSS pipeline      |
| 🧩 Primitives   | Radix UI                                      |
| ✨ Icons        | Lucide React                                  |
| 🎞️ Motion       | Motion (installed for upcoming interactions)  |
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

Open [http://localhost:3000](http://localhost:3000).

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

| Locale | Language | Direction |
| ------ | -------- | --------- |
| `en`   | English  | LTR       |
| `de`   | German   | LTR       |
| `es`   | Spanish  | LTR       |
| `ar`   | Arabic   | RTL       |

Messages live in `messages/<locale>.json`; English is the source of truth. Routing and locale-aware links are in `i18n/`, and the localization rules are in [docs/LOCALIZATION.md](docs/LOCALIZATION.md).

The dictionaries use `{{variable}}` placeholders. The footer interpolates the copyright year without changing that convention.

## 🎨 Design

The visual language is light, calm, and a little editorial:

| Token       | Value     | Used for                         |
| ----------- | --------- | -------------------------------- |
| Mint        | `#5BB5A2` | Primary container, brand accents |
| Deep teal   | `#006B5C` | Primary text, buttons, the 404   |
| Surface     | `#F9F9F9` | Page background                  |
| Surface low | `#F3F3F3` | Footer                           |
| Ink         | `#1A1C1C` | Headings                         |
| Muted ink   | `#3E4946` | Body and secondary text          |

English headings use **DM Sans** and UI text uses **Inter**. Arabic pages use **Cairo** for headings and **Tajawal** for body copy. Spacing follows an 8px rhythm, and the shared shell is capped at 80rem. Tokens live in [src/styles/tokens.stylex.ts](src/styles/tokens.stylex.ts).

## 🗂️ Project layout

```text
src/
  app/[locale]/          # locale layout, home, 404, catch-all
  components/layout/     # header, footer, language switcher
  components/landing/    # hero
  components/ui/         # shared UI pieces
  styles/tokens.stylex.ts
i18n/                    # routing, request config, navigation helpers
messages/                # en, de, es, ar dictionaries
docs/                    # tech stack, localization, ADRs
assets/                  # brand and payment SVGs
```

## 🧪 Testing

Vitest, Testing Library, Playwright, and axe-core are installed and configured. There are no test files yet — the first tests will land with the landing page and the interactive flows.

## 📚 Docs

- [docs/TECH_STACK.md](docs/TECH_STACK.md) — the agreed stack and quality targets
- [docs/LOCALIZATION.md](docs/LOCALIZATION.md) — locale structure, naming, and RTL rules
- [docs/adr/](docs/adr/) — architecture decision records
- [AGENTS.md](AGENTS.md) — contribution and agent rules

## ⚠️ A note

Banquee is a mockup. It is not a bank, it does not hold money, and its account flows are simulated.

---

<p align="center">
  Built by <a href="https://github.com/Abo3baziz">Abo3baziz</a>.
</p>
