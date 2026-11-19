import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { BLOG_ARTICLES } from '@/src/components/blog/blog-data'
import { siteUrl } from '@/src/lib/site'

/*
 * Every indexable route is locale-prefixed, so the sitemap lists each path
 * once per locale and cross-links the translations through hreflang
 * alternates. Blog tag filters use query parameters and are not entries.
 */

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]['changeFrequency']
>

type IndexablePage = {
  /** Locale-independent path, '' for the home page. */
  path: string
  changeFrequency: ChangeFrequency
}

const STATIC_PAGES: readonly IndexablePage[] = [
  { path: '', changeFrequency: 'weekly' },
  { path: '/blog', changeFrequency: 'monthly' },
  { path: '/compare', changeFrequency: 'monthly' },
  { path: '/features', changeFrequency: 'monthly' },
  { path: '/support', changeFrequency: 'monthly' },
]

const ARTICLE_PAGES: readonly IndexablePage[] = BLOG_ARTICLES.map(
  (article): IndexablePage => ({
    path: `/blog/${article.slug}`,
    changeFrequency: 'yearly',
  }),
)

const INDEXABLE_PAGES: readonly IndexablePage[] = [
  ...STATIC_PAGES,
  ...ARTICLE_PAGES,
]

function localizedUrl(locale: string, path: string): string {
  return `${siteUrl}/${locale}${path}`
}

/** Absolute URLs for every locale, including x-default for the default one. */
function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}

  for (const locale of routing.locales) {
    languages[locale] = localizedUrl(locale, path)
  }

  languages['x-default'] = localizedUrl(routing.defaultLocale, path)

  return languages
}

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PAGES.flatMap(({ path, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      changeFrequency,
      alternates: {
        languages: languageAlternates(path),
      },
    })),
  )
}
