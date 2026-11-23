import AxeBuilder from '@axe-core/playwright'
import { chromium } from '@playwright/test'
import { writeFileSync } from 'node:fs'

const LOCALES = ['en', 'de', 'es', 'ar']
const PAGES = ['/', '/features', '/compare', '/blog', '/support']
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

const browser = await chromium.launch()
const context = await browser.newContext()

const rows = []

for (const locale of LOCALES) {
  for (const path of PAGES) {
    const page = await context.newPage()
    await page.goto(`http://localhost:3010/${locale}${path}`, {
      waitUntil: 'networkidle',
    })
    await page.locator('h1').first().waitFor({ state: 'visible' })
    await page.evaluate(async () => {
      const step = Math.max(320, Math.floor(window.innerHeight * 0.75))
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((resolve) => requestAnimationFrame(resolve))
        await new Promise((resolve) => setTimeout(resolve, 60))
      }
      window.scrollTo(0, document.body.scrollHeight)
      await new Promise((resolve) => setTimeout(resolve, 400))
      window.scrollTo(0, 0)
      await new Promise((resolve) => setTimeout(resolve, 900))
    })

    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()
    for (const violation of results.violations) {
      rows.push({
        locale,
        path,
        rule: violation.id,
        impact: violation.impact,
        help: violation.help,
        count: violation.nodes.length,
        nodes: violation.nodes.map((node) => ({
          target: node.target.join(' '),
          html: node.html.slice(0, 220),
          failureSummary: node.failureSummary,
          data: node.any[0]?.data ?? node.all[0]?.data ?? node.none[0]?.data,
          message: node.any[0]?.message ?? node.all[0]?.message,
        })),
      })
    }
    console.log(
      `${locale}${path}: ${results.violations.length} rules, ${results.violations.reduce((total, violation) => total + violation.nodes.length, 0)} nodes`,
    )
    await page.close()
  }
}

writeFileSync('axe-audit.json', JSON.stringify(rows, null, 2))
await browser.close()
