import { describe, expect, it } from 'vitest'
import { routing } from '../../i18n/routing'
import { BLOG_ARTICLES } from '../components/blog/blog-data'
import { siteUrl } from '../lib/site'
import robots from './robots'
import sitemap from './sitemap'

const INDEXABLE_PATHS = [
  '',
  '/blog',
  '/compare',
  '/features',
  '/support',
  ...BLOG_ARTICLES.map((article) => `/blog/${article.slug}`),
]

function localizedUrl(locale: string, path: string): string {
  return `${siteUrl}/${locale}${path}`
}

const entries = sitemap()

describe('sitemap', () => {
  it('lists one entry per locale and indexable path', () => {
    expect(entries).toHaveLength(
      routing.locales.length * INDEXABLE_PATHS.length,
    )
    expect(entries).toHaveLength(32)

    for (const locale of routing.locales) {
      for (const path of INDEXABLE_PATHS) {
        const matches = entries.filter(
          (entry) => entry.url === localizedUrl(locale, path),
        )

        expect(matches).toHaveLength(1)
      }
    }
  })

  it('uses unique, absolute urls without query strings or trailing slashes', () => {
    const urls = entries.map((entry) => entry.url)

    expect(new Set(urls).size).toBe(urls.length)

    for (const url of urls) {
      const path = url.slice(siteUrl.length)

      expect(new URL(url).origin).toBe(new URL(siteUrl).origin)
      expect(path.startsWith('/')).toBe(true)
      expect(path).not.toContain('?')
      expect(path).not.toMatch(/\/$/)
      expect(path).not.toContain('//')
    }
  })

  it('cross-links every locale and x-default for the same path', () => {
    for (const locale of routing.locales) {
      for (const path of INDEXABLE_PATHS) {
        const entry = entries.find(
          (item) => item.url === localizedUrl(locale, path),
        )
        const languages = entry?.alternates?.languages

        expect(languages).toBeDefined()

        for (const alternateLocale of routing.locales) {
          expect(languages?.[alternateLocale]).toBe(
            localizedUrl(alternateLocale, path),
          )
        }

        expect(languages?.['x-default']).toBe(
          localizedUrl(routing.defaultLocale, path),
        )
      }
    }
  })

  it('marks update frequency by page type', () => {
    const frequencyFor = (locale: string, path: string) =>
      entries.find((entry) => entry.url === localizedUrl(locale, path))
        ?.changeFrequency

    expect(frequencyFor('en', '')).toBe('weekly')
    expect(frequencyFor('de', '/blog')).toBe('monthly')
    expect(frequencyFor('es', '/support')).toBe('monthly')
    expect(frequencyFor('ar', '/blog/banko-secrets')).toBe('yearly')
  })

  it('leaves lastModified and priority unset', () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeUndefined()
      expect(entry.priority).toBeUndefined()
    }
  })
})

describe('robots', () => {
  const file = robots()
  const rules = Array.isArray(file.rules) ? file.rules : [file.rules]

  it('allows every crawler and disallows nothing', () => {
    expect(rules).toHaveLength(1)
    expect(rules[0].userAgent).toBe('*')
    expect(rules[0].allow).toBe('/')
    expect(rules[0].disallow).toBeUndefined()
  })

  it('points crawlers at the sitemap', () => {
    expect(file.sitemap).toBe(`${siteUrl}/sitemap.xml`)
    expect(file.host).toBe(siteUrl)
  })
})
