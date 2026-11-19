import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'

/** Absolute site origin used for canonical URLs, Open Graph, sitemap, and JSON-LD. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3010'

/** Display name used in the title template and structured data. */
export const siteName = 'Banquee'

/** Open Graph locales use an underscore between language and region. */
export const openGraphLocales: Record<string, string> = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  ar: 'ar_AR',
}

type PageMetadataInput = {
  locale: string
  title: string
  description: string
  /** Locale-independent canonical path, e.g. '' for home or '/blog'. */
  path: string
}

/**
 * Builds canonical, hreflang, and Open Graph metadata for a localized page.
 * The title is a plain string so the layout template can append the brand.
 */
export function pageMetadata({
  locale,
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const localizedPath = `/${locale}${path}`

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
        'x-default': `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: localizedPath,
      type: 'website',
      locale: openGraphLocales[locale] ?? locale,
    },
  }
}
