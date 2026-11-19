# SEO Architecture (`SEO.md`)

How metadata, crawling, canonical URLs, structured data, and social images are built in this project, and where each piece lives.

## 1. Overview

Every localized route builds its metadata from the same helpers: `src/lib/site.ts` holds the site URL, brand name, Open Graph locale map, and the `pageMetadata()` builder, while `src/app/[locale]/layout.tsx` sets the shared defaults (metadata base, title template, Twitter card, Organization/WebSite JSON-LD). Page-level metadata lives in each route's `generateMetadata`, the sitemap and robots files sit at `src/app/sitemap.ts` and `src/app/robots.ts`, and social images come from `src/app/[locale]/_og/brand-image.tsx`.

## 2. Site URL configuration

`siteUrl` in `src/lib/site.ts` reads `NEXT_PUBLIC_SITE_URL` and falls back to `http://localhost:3010` so local development still produces valid absolute URLs.

```ts
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3010'
```

Search engines need absolute URLs for canonicals, Open Graph tags, the sitemap, robots.txt, and JSON-LD `@id`/`url` values. A relative canonical is ambiguous, and Open Graph crawlers reject relative image paths. Set the variable to the production origin (scheme plus host, no trailing slash) in the deployment environment. `.env.example` at the repository root documents the variable and is committed; the `.env*` ignore rule stays in place with an exception for that file.

## 3. Metadata architecture

### Layout defaults

`generateMetadata` in `src/app/[locale]/layout.tsx` returns:

- `metadataBase: new URL(siteUrl)` — resolves relative URLs in child metadata (canonicals, OG images) to absolute ones.
- `title.default` and `description` from the `landing` namespace, which is the closest thing to a site-wide fallback.
- `title.template: '%s - Banquee'` — appends the brand to any child page title.
- `applicationName: 'Banquee'` and `twitter.card: 'summary_large_image'`. No per-page Twitter overrides exist; the card type is enough.

### `pageMetadata()`

`src/lib/site.ts` exports one builder used by every localized page:

```ts
pageMetadata({ locale, title, description, path })
```

It emits:

- `title` as a plain string, so the layout template appends the brand.
- `alternates.canonical` as `/<locale><path>`.
- `alternates.languages` with an entry for every locale in `routing.locales` plus `x-default` pointing at the default locale. The entry for the current locale is the self-reference hreflang.
- `openGraph` with `title`, `description`, `url`, `type: 'website'`, and `locale` from the `openGraphLocales` map (`en_US`, `de_DE`, `es_ES`, `ar_AR`).

Paths passed to `path` are locale-independent and have no trailing slash: `''` for the home page, `'/blog'`, `'/compare'`, `'/features'`, `'/support'`, and `/blog/${slug}` for articles.

### Title template caveat

`title.template` only applies to child segments, not to the page that defines it. The home page is `src/app/[locale]/page.tsx`, the same segment as the layout, so it sets its complete title itself: `` `${siteName} - ${t('meta.title')}` ``. Without that, the home page would show the untemplated string.

### Adding metadata to a new page

1. Add `meta.title` and `meta.description` to the page's namespace in all four dictionaries (`messages/en.json`, `de.json`, `es.json`, `ar.json`). See [LOCALIZATION.md](LOCALIZATION.md) for key conventions.
2. Export a `generateMetadata` from the route:

   ```tsx
   export async function generateMetadata({ params }): Promise<Metadata> {
     const { locale } = await params
     const t = await getTranslations({ locale, namespace: 'myPage' })

     return pageMetadata({
       locale,
       title: t('meta.title'),
       description: t('meta.description'),
       path: '/my-page',
     })
   }
   ```

3. Add the path to `STATIC_PAGES` in `src/app/sitemap.ts`. It flows into `INDEXABLE_PAGES`, so the sitemap, its hreflang alternates, and the entry count in `src/app/sitemap.test.ts` all follow from it. Update the expected total in that spec when the number of pages changes.

## 4. Crawling & indexing

`src/app/robots.ts` describes a fully public site: `userAgent: '*'` with `allow: '/'`, no `disallow` rules, a `sitemap` pointer to `${siteUrl}/sitemap.xml`, and `host` set to `siteUrl`.

`src/app/sitemap.ts` builds one entry per locale per indexable path. Five static pages plus three blog articles across four locales gives 32 URLs. Every entry carries `alternates.languages` with all four locales plus `x-default`, so the translations of a page point at each other. `changeFrequency` follows page type: `weekly` for the home page, `monthly` for the static subpages, `yearly` for articles.

Blog tag filters are query-string variants of `/blog`, not separate routes, so they are excluded — listing them would add duplicate content without a distinct canonical.

Unknown blog slugs are rejected at routing time and return a real 404 status. `src/app/[locale]/blog/[slug]/page.tsx` sets `unstable_paramMatching = { slug: 'blocking' }` because `cacheComponents` does not support `dynamicParams: false` and would otherwise stream a 200 shell before `notFound()` fires.

`lastModified` is omitted because there is no reliable per-page timestamp: content is static, nothing reads a CMS, and inventing a date per build would tell crawlers the pages change on every deploy. `priority` is omitted as well; the sitemap tests assert both are unset.

The sitemap and robots behaviour is covered by `src/app/sitemap.test.ts`, which checks URL uniqueness, absolute origins, the absence of query strings and trailing slashes, the hreflang cross-links, the frequency values, and the robots rules.

## 5. Canonical strategy

Canonicals are always locale-prefixed: `/en/blog`, not `/blog`. next-intl serves every route under a locale segment and redirects `/` to `/en` (the default locale) through the middleware exported from `src/proxy.ts`, so the unprefixed form is never a live URL and never needs its own canonical.

The same rule applies to trailing slashes: `path` values never end in a slash, so a canonical is `/en/blog`, and every URL in the sitemap is absolute and written without one. The sitemap tests enforce both properties.

## 6. Structured data

Two JSON-LD blocks are rendered in the layout for every page:

- `Organization` with `name` and `url`.
- `WebSite` with `name`, `url`, and `inLanguage`.

Both use `${siteUrl}/${locale}` as their URL, so each locale describes itself rather than sharing one global entity.

Article pages (`src/app/[locale]/blog/[slug]/page.tsx`) add `BlogPosting` with `headline`, `description`, `image`, `inLanguage`, and `mainEntityOfPage`. It is deliberately minimal: there is no author page, no publish date, and no modified date in the content model, and schema fields are not filled with placeholder values. Add `author` and `datePublished` only when real data exists.

`BreadcrumbList` mirrors the visible breadcrumb exactly: Home, Blog, and the article title, with localized labels from `blog.articleDetail.breadcrumbHome` and `breadcrumbBlog` and absolute item URLs.

## 7. International SEO

The `alternates.languages` map emitted by `pageMetadata()` and by the sitemap follows the usual hreflang rules: each page lists itself, every translation, and `x-default`. `x-default` points at the English URL because English is `routing.defaultLocale`.

`og:locale` comes from `openGraphLocales` in `src/lib/site.ts`. Open Graph expects `language_TERRITORY`, hence `en_US` rather than `en`.

Arabic renders with `dir="rtl"` on `<html lang="ar">`. Direction is a presentation concern and does not change any metadata value: titles, descriptions, canonicals, and hreflang codes are identical in structure across locales, just translated.

## 8. Open Graph images

The brand card is defined once in `src/app/[locale]/_og/brand-image.tsx` using `ImageResponse` at 1200×630. `_og` is a private folder (the underscore prefix keeps it out of routing), and each route segment that needs the image re-exports the file as `opengraph-image.tsx`:

```ts
export { alt, contentType, default, size } from '../_og/brand-image'
```

There is one in `[locale]/` and one in each child segment (`blog/`, `compare/`, `features/`, `support/`). The file convention only attaches a generated image to the segment that declares it — it is not inherited the way metadata objects are — so each child route needs its own re-export.

Article pages override the generated card with the cover image in `generateMetadata`: `openGraph.images: [{ url: article.image, alt: title }]`. Explicit `openGraph.images` wins over an inherited `opengraph-image` convention file, and `metadataBase` turns the relative `/images/...` path into an absolute URL.

## 9. Performance notes

- The article cover is the Largest Contentful Paint element on article pages, so `src/components/blog/article-header.tsx` renders it with `priority`. That emits a preload link for the responsive cover image and opts it out of lazy loading; the earlier `loading="eager"` only skipped lazy loading, without the preload.
- Images declare intrinsic dimensions or use `fill` with a `sizes` value, so layout space is reserved before the bytes arrive. This keeps Cumulative Layout Shift near zero.
- Fonts load through `next/font` with `display: 'swap'`. Cairo and Tajawal use `preload: false` because preloading two Arabic families on every page would compete with the render-blocking resources Latin pages need.
- There are no third-party scripts: no analytics, tag managers, or embeds.

## 10. Validation

Run the local checks after any metadata change:

```bash
pnpm test        # sitemap and robots specs
pnpm build       # prerenders every locale
```

Then inspect the prerendered HTML under `.next/server/app/` for the locale routes and confirm `<link rel="canonical">`, `<link rel="alternate" hreflang>`, the `og:*` tags, the JSON-LD blocks, and the cover image preload are present.

External checks once the site is deployed:

- Google Search Console for indexing status and coverage.
- Rich Results Test for the Organization, WebSite, BlogPosting, and BreadcrumbList blocks.
- PageSpeed Insights for Core Web Vitals, especially LCP on article pages.

### Production setup checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
2. Verify `https://<domain>/robots.txt` and `https://<domain>/sitemap.xml` resolve and use that origin.
3. Verify the domain in Google Search Console, then submit the sitemap.
4. Monitor Core Web Vitals in Search Console after launch.
