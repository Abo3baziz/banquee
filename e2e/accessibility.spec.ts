import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

/*
 * Accessibility regression gate.
 *
 * Every locale is audited, including Arabic, which renders the whole shell in
 * RTL. Rules are limited to WCAG 2.1 A/AA so the suite tracks the standard the
 * project claims, and failures print the full axe report for triage.
 */

const LOCALES = ['en', 'de', 'es', 'ar'] as const

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/features', name: 'features' },
  { path: '/compare', name: 'compare' },
  { path: '/blog', name: 'blog' },
  { path: '/blog/startup-finances', name: 'blog article' },
  { path: '/blog/banko-secrets', name: 'blog article' },
  { path: '/blog/improve-saving-habits', name: 'blog article' },
  { path: '/support', name: 'support' },
] as const

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

/**
 * Sections below the fold start at opacity 0 until they are scrolled into view,
 * so a plain axe run would skip most of the page. Walk the document first and
 * return to the top, which also restores the header that hides on scroll down.
 */
async function revealWholePage(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    const step = Math.max(320, Math.floor(window.innerHeight * 0.75))

    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => requestAnimationFrame(resolve))
      await new Promise((resolve) => setTimeout(resolve, 60))
    }

    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Hold at the bottom so the last reveals finish, then return to the top.
    window.scrollTo(0, 0)
    await new Promise((resolve) => setTimeout(resolve, 900))
  })
}

for (const locale of LOCALES) {
  test.describe(`${locale} locale`, () => {
    for (const { path, name } of PAGES) {
      test(`${locale} ${path} — no WCAG 2.1 A/AA violations`, async ({
        page,
      }) => {
        const response = await page.goto(`/${locale}${path}`, {
          waitUntil: 'networkidle',
        })

        expect(response?.status(), `HTTP status for /${locale}${path}`).toBe(
          200,
        )
        await page.locator('h1').first().waitFor({ state: 'visible' })
        await revealWholePage(page)

        const results = await new AxeBuilder({ page })
          .withTags(TAGS)
          .analyze()

        const report = results.violations
          .map((violation) => {
            const targets = violation.nodes
              .map((node) => `    ${node.target.join(' ')}`)
              .join('\n')
            return `${violation.id} (${violation.impact}): ${violation.help}\n${targets}`
          })
          .join('\n\n')

        expect(
          results.violations,
          `axe violations on ${locale}${path} (${name}):\n\n${report}`,
        ).toEqual([])
      })
    }
  })
}
