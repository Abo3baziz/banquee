'use client'

import { useMemo, useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { CircleUserRound, CreditCard, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import { SupportFaqItem } from './support-faq-item'
import { SupportSearch } from './support-search'
import { filterFaqCategories, type SupportFaqCategory } from './support-utils'

const CATEGORIES = [
  { key: 'cards', icon: CreditCard, itemCount: 5 },
  { key: 'account', icon: CircleUserRound, itemCount: 4 },
  { key: 'personalDetails', icon: ShieldCheck, itemCount: 4 },
] as const

const styles = stylex.create({
  section: {
    marginInline: 'auto',
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    paddingBlockEnd: '6rem',
    width: '100%',
  },
  container: {
    gap: '4rem',
    marginInline: 'auto',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '57.5rem',
  },
  searchBlock: {
    marginBottom: '1rem',
  },
  empty: {
    margin: 0,
    color: colors.secondary,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  categoryHeader: {
    gap: spacing.md,
    alignItems: 'center',
    borderBlockEndColor: colors.divider,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 1,
    display: 'flex',
    paddingBlockEnd: spacing.lg,
  },
  categoryIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primaryContainer,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '3rem',
    width: '3rem',
  },
  categoryTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.5rem',
      '@media (min-width: 40rem)': '2rem',
    },
    fontWeight: 700,
    lineHeight: 1.25,
  },
})

export function SupportFaqExplorer() {
  const t = useTranslations('support')
  const [query, setQuery] = useState('')
  const [openOverrides, setOpenOverrides] = useState<Record<string, boolean>>(
    {},
  )

  const categories = useMemo<SupportFaqCategory[]>(
    () =>
      CATEGORIES.map(({ key, icon, itemCount }) => ({
        key,
        title: t(`categories.${key}`),
        icon,
        items: Array.from({ length: itemCount }, (_, index) => {
          const suffix = index + 1

          return {
            key: `q${suffix}`,
            question: t(`faqs.${key}.q${suffix}`),
            answer: t(`faqs.${key}.a${suffix}`),
          }
        }),
      })),
    [t],
  )

  const visibleCategories = useMemo(
    () => filterFaqCategories(categories, query),
    [categories, query],
  )

  const hasQuery = query.trim().length > 0
  const autoOpen = query.trim().length >= 3

  function handleQueryChange(value: string) {
    setQuery(value)
    setOpenOverrides({})
  }

  function handleClear() {
    setQuery('')
    setOpenOverrides({})
  }

  function isItemOpen(categoryKey: string, itemKey: string) {
    const overrideKey = `${categoryKey}/${itemKey}`

    return overrideKey in openOverrides ? openOverrides[overrideKey] : autoOpen
  }

  function toggleItem(categoryKey: string, itemKey: string) {
    const overrideKey = `${categoryKey}/${itemKey}`
    const isOpen = isItemOpen(categoryKey, itemKey)

    setOpenOverrides((previous) => ({
      ...previous,
      [overrideKey]: !isOpen,
    }))
  }

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.searchBlock)}>
          <SupportSearch
            value={query}
            onChange={handleQueryChange}
            onClear={handleClear}
            label={t('search.label')}
            placeholder={t('search.placeholder')}
            clearLabel={t('search.clear')}
          />
          {hasQuery && visibleCategories.length === 0 ? (
            <p role="status" aria-live="polite" {...stylex.props(styles.empty)}>
              {t('search.empty')}
            </p>
          ) : null}
        </div>

        {visibleCategories.map((category, index) => {
          const Icon = category.icon

          return (
            <Reveal key={category.key} delay={index * 0.08}>
              <div>
                <div {...stylex.props(styles.categoryHeader)}>
                  <span
                    aria-hidden="true"
                    {...stylex.props(styles.categoryIcon)}
                  >
                    <Icon size={24} />
                  </span>
                  <h2 {...stylex.props(styles.categoryTitle)}>
                    {category.title}
                  </h2>
                </div>
                {category.items.map((item, itemIndex) => (
                  <SupportFaqItem
                    key={item.key}
                    id={`support-faq-${category.key}-${item.key}`}
                    question={item.question}
                    answer={item.answer}
                    isOpen={isItemOpen(category.key, item.key)}
                    onToggle={() => toggleItem(category.key, item.key)}
                    divider={itemIndex < category.items.length - 1}
                  />
                ))}
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
