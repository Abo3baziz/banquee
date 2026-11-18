import type { LucideIcon } from 'lucide-react'

export type SupportFaqItem = {
  key: string
  question: string
  answer: string
}

export type SupportFaqCategory = {
  key: string
  title: string
  icon: LucideIcon
  items: readonly SupportFaqItem[]
}

export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase()
}

export function faqItemMatches(
  item: SupportFaqItem,
  normalizedQuery: string,
): boolean {
  if (!normalizedQuery) {
    return true
  }

  return (
    item.question.toLowerCase().includes(normalizedQuery) ||
    item.answer.toLowerCase().includes(normalizedQuery)
  )
}

export function filterFaqCategories(
  categories: readonly SupportFaqCategory[],
  query: string,
): SupportFaqCategory[] {
  const normalizedQuery = normalizeQuery(query)

  if (!normalizedQuery) {
    return categories.map((category) => ({
      ...category,
      items: [...category.items],
    }))
  }

  return categories.flatMap((category) => {
    const items = category.items.filter((item) =>
      faqItemMatches(item, normalizedQuery),
    )

    return items.length > 0 ? [{ ...category, items }] : []
  })
}
