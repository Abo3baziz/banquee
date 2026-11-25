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

- **UI/UX design** — The page designs are based on [Banquee – SaaS & Bank Website](https://www.figma.com/community/file/1151590403301615327), a Figma Community template by Pawel Gola used under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). My adaptation gives it a mint-and-ink palette built on tonal surface layering instead of drop shadows, a type scale pairing Sora/Inter with Cairo/Tajawal for Arabic, 8px spacing rhythm, and component specs for buttons, chips, inputs, cards, and transaction lists. I designed full screens for every website page plus five phone app screens (home, cards, savings, stats, support), which the site's animated demos are modeled on. The design sources live in a local `ui designs/` folder that isn't tracked in this repo.
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

## 🧩 Component architecture

Complex sections are never one big component. Each is a parent that owns layout and orchestration, plus children that each own a single visual or behavioral concern. Components fall into three tiers:

- **Shared primitives** (`src/components/ui/`) — `Cta`, `Reveal`, `BackToTop`, `BackButton`. They know nothing about banking and are used across every feature.
- **Reusable domain components** (`banking-card/`, `phone/`) — the flippable card and the phone frame. Several features import them by name through a barrel `index.ts`.
- **Feature sections** (`landing/`, `blog/`, `compare/`, `support/`, `features/`) — one folder per page area, where a server component assembles copy and child components.

Two supporting rules keep the tiers clean: behavior with timing or event listeners becomes a hook (`use-scroll-direction`, `use-has-started`, `use-demo-sequence`) so it is testable without rendering, and content that changes independently of components lives in a `.ts` data file (`compare-data.ts`, `savings-demo-data.ts`). Feature folders can nest: `support/need-help/` is a sub-feature behind its own `index.ts` barrel.

### Site header

```text
src/components/
└── layout/
    ├── site-header.tsx          # parent: chrome, nav, scroll behavior, menu state
    ├── language-switcher.tsx    # LanguageSwitcher + LanguageOptions
    ├── use-scroll-direction.ts   # pure behavior hook
    └── site-footer.tsx
```

**SiteHeader** owns the fixed header chrome: brand, desktop navigation, the mobile menu dialog, and the state that ties them together (`menuOpen`). It hides itself on scroll down and returns on scroll up, and while hidden it is `inert` — removed from the tab order. It wraps everything in a Radix `Direction.Provider` so the header mirrors in RTL.

**LanguageSwitcher** owns the desktop dropdown behavior — Radix navigation, keyboard support, locale switching. **LanguageOptions** is exported from the same file as a plain list for the mobile menu: two presentations of one locale list, no duplication.

**use-scroll-direction** reports scroll direction and nothing else. As a hook, it has its own unit tests; the header never re-renders differently because of it — it just reads `{ hidden }`.

The split is deliberate: the switcher encapsulates interaction logic the header shouldn't know about, and the scroll hook encapsulates behavior that predates any header markup. Nav links, by contrast, stay inline in the parent — they are one mapped expression over `NAV_ITEMS`, not repeated logic, so a `NavLink` component would be over-componentization.

### Bank card

```text
src/components/
└── banking-card/
    ├── bank-card.tsx            # parent: flip mechanics, faces, status overlays
    ├── card-chip.tsx            # the EMV chip graphic
    ├── card-number.tsx          # masked number, compact mode
    ├── card-network-logo.tsx    # visa / mastercard / none marks
    ├── card-status-badge.tsx    # frozen / blocked / expired presentation
    ├── card-tokens.stylex.ts    # standard / gold / premium tier themes
    ├── card-types.ts            # shared prop types + status helpers
    └── index.ts                 # public exports
```

**BankCard** owns the card as a whole: the flip (a `<button>` when `onFlip` is provided, a static `role="img"` otherwise), both faces, selection state, and the frozen/blocked/expired overlays. It renders at three sizes using container queries, with `em`-based typography so every detail scales with the card.

Each child owns one detail and its scaling: **CardChip** the chip graphic, **CardNumber** the masked number (with a compact mode for `size="mini"`), **CardNetworkLogo** the network mark. **CardStatusBadge** is the status presentation — reused wherever a status must be shown, independent of the card that hosts it.

Why this split: the card appears in the hero visual, the cards demo, and the compare page, so details that own their own scaling rules must not be tangled with flip mechanics. Tier themes live in `card-tokens.stylex.ts`, so a new tier is a token file, not a component rewrite. The status helpers in `card-types.ts` (`getInactiveStatus`) keep status resolution out of markup entirely.

### Phone demos

```text
src/components/
├── phone/
│   ├── phone-frame.tsx           # shared device shell
│   ├── phone-status-bar.tsx
│   ├── phone-dynamic-island.tsx
│   └── phone-home-indicator.tsx
└── banking-demo/
    ├── banking-demo.tsx          # orchestrator
    ├── demo-mode-switcher.tsx    # send / receive toggle
    ├── send-demo.tsx             # one choreography
    ├── receive-demo.tsx          # the other
    ├── use-has-started.ts        # mount gating + viewport amount
    └── …                         # sequence layer:
        use-demo-sequence.ts, demo-tap-indicator.tsx, demo-data.ts
```

**PhoneFrame** is a shared shell: status bar, dynamic island, home indicator, and a screen that takes any content as `children`. Every demo — banking, statistics, savings — renders inside it, so all phone screens share one device look.

**BankingDemo** owns orchestration only: it pauses when out of view or when the tab is hidden, mounts the sequence only after the demo has been seen, and switches modes. **SendDemo** and **ReceiveDemo** each own one choreography; a `runId` in the parent's state becomes their `key`, so switching modes remounts the sequence cleanly instead of resetting it from inside.

### Landing sections

```text
src/components/
└── landing/
    ├── hero.tsx                 # server component: copy, badge, CTAs
    ├── hero-visual.tsx          # client island: layered BankCards
    ├── plans.tsx                 # server: composes PlanCard + SecurityToggles
    ├── plan-card.tsx             # one plan's pricing and perks
    ├── security-toggles.tsx      # freeze / limits illustration
    └── …                        # one file per landing section
```

Landing sections split copy from visuals so the client boundary lands exactly where interactivity starts. **Hero** is a server component: localized copy, the badge, and `Cta` links, zero client JavaScript. **HeroVisual** is the only part that needs state — the flip interaction and `useCurrency` — so it is the island. **Plans** follows the same shape as a server parent composing `PlanCard` instances and `SecurityToggles`, wrapped in the shared `Reveal`.

### How it composes: BankingDemo

The parent's job is to decide _when_ something plays; the children decide _what_ plays:

```tsx
export function BankingDemo() {
  const rootRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rootRef, { amount: DEMO_VIEWPORT_AMOUNT })
  const [mode, setMode] = useState<DemoMode>('send')
  const [runId, setRunId] = useState(0)
  const hasStarted = useHasStarted(rootRef)
  const paused = !isInView || isDocumentHidden

  const handleModeChange = (nextMode: DemoMode) => {
    setMode(nextMode)
    setRunId((current) => current + 1)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div ref={rootRef} dir="ltr" {...stylex.props(styles.root)}>
        <DemoModeSwitcher mode={mode} onChange={handleModeChange} />
        <PhoneFrame size="md">
          <div
            role="tabpanel"
            aria-label={
              mode === 'send' ? 'Send Money demo' : 'Receive Money demo'
            }
            {...stylex.props(styles.panel)}
          >
            {hasStarted ? (
              mode === 'send' ? (
                <SendDemo
                  key={`send-${runId}`}
                  paused={paused}
                  reducedMotion={reducedMotion}
                />
              ) : (
                <ReceiveDemo
                  key={`receive-${runId}`}
                  paused={paused}
                  reducedMotion={reducedMotion}
                />
              )
            ) : null}
          </div>
        </PhoneFrame>
      </div>
    </MotionConfig>
  )
}
```

Data flows one way: the parent holds `mode`, `runId`, and `paused`, and passes primitives down. The children receive booleans and callbacks — never the parent's state machinery — so each can be reasoned about (and tested) alone.

### Why these boundaries

- **Parents orchestrate, children present.** No child reaches up for layout decisions; no parent renders detail-level markup it doesn't own.
- **Reuse drives extraction.** `PhoneFrame`, `BankCard`, `CardStatusBadge`, and `Cta` exist as components because a second consumer exists or was planned. A single-use element stays where it lives — the header's mobile panel is inline because only the header uses it and it shares `menuOpen`.
- **Behavior is extracted when it has a lifecycle.** Scroll direction, viewport gating, and demo sequencing all own timers or listeners, so they are hooks with their own tests instead of effects buried in markup.
- **Content is data.** Comparisons, demo steps, and plan details live in typed `.ts` files, so editing content never touches component structure.
- **Over-componentization is avoided on purpose.** A component is created when it carries its own concern (status presentation, device chrome, one choreography) — not merely to shorten a file.

## 🧪 Testing

Unit and component tests run on Vitest with Testing Library: the flippable bank card, demo sequencing and gesture indicators, blog data and article TOC/share, compare and savings data, support utilities, the scroll-direction hook, and the currency hook.

Playwright and axe-core run a WCAG 2.1 A/AA audit (`pnpm test:a11y`) across every page in all four locales, Arabic RTL included. The suite fails on any new violation and prints the offending rule, element, and failure details for triage.

## 📚 Docs

- [docs/TECH_STACK.md](docs/TECH_STACK.md) — the agreed stack and quality targets
- [docs/LOCALIZATION.md](docs/LOCALIZATION.md) — locale structure, naming, and RTL rules
- [docs/SEO.md](docs/SEO.md) — SEO architecture, metadata conventions, sitemap and robots configuration
- [docs/adr/](docs/adr/) — architecture decision records
- [AGENTS.md](AGENTS.md) — contribution and agent rules

## ⚠️ A note

Banquee is a mockup. It is not a bank, it does not hold money, and its account flows are simulated.

## 📄 License

Code released under the [MIT License](LICENSE).

The UI design is derived from [Banquee – SaaS & Bank Website](https://www.figma.com/community/file/1151590403301615327) by Pawel Gola (Figma Community), used under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) with modifications. The MIT license covers the code in this repository; the original template design remains under its Creative Commons license, and the footer carries the required attribution.

---

<p align="center">
  UI design based on the <a href="https://www.figma.com/community/file/1151590403301615327">Banquee template</a> by Pawel Gola · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
</p>

<p align="center">
  Designed and built by <a href="https://github.com/Abo3baziz">Abo3baziz</a>.
</p>
