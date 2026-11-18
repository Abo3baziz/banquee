import * as stylex from '@stylexjs/stylex'
import { Check } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import type { BlogArticle } from './blog-types'

const styles = stylex.create({
  intro: {
    gap: spacing.md,
    display: 'flex',
    flexDirection: 'column',
  },
  introLead: {
    marginBlock: 0,
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.7,
  },
  introParagraph: {
    marginBlock: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '1.0625rem',
    fontWeight: 400,
    lineHeight: 1.7,
  },
  section: {
    marginBlockStart: '3rem',
    scrollMarginTop: '7rem',
  },
  sectionTitle: {
    marginBlock: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.5rem',
      '@media (min-width: 64rem)': '2rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.25,
    marginBlockEnd: spacing.md,
  },
  paragraph: {
    marginBlock: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.75,
    marginBlockEnd: spacing.sm,
  },
  lead: {
    marginBlock: spacing.sm,
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  bullets: {
    gap: '0.875rem',
    marginBlock: 0,
    marginInline: 0,
    paddingInline: 0,
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
  },
  bullet: {
    gap: '0.75rem',
    alignItems: 'flex-start',
    display: 'flex',
  },
  bulletIcon: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    marginBlockStart: '0.1875rem',
    height: '1.25rem',
    width: '1.25rem',
  },
  bulletText: {
    color: colors.onSurfaceVariant,
    flexGrow: 1,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.75,
    minWidth: 0,
  },
  outro: {
    marginBlock: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.75,
    marginBlockStart: spacing.sm,
  },
  conclusion: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 64rem)': spacing.xl,
    },
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceContainerLow,
    marginBlockStart: '3.5rem',
  },
  conclusionParagraph: {
    marginBlock: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.75,
    marginBlockEnd: spacing.sm,
  },
  conclusionFinal: {
    color: colors.onSurface,
    fontWeight: 600,
  },
  conclusionFinalSpacing: {
    marginBlockEnd: 0,
  },
})

type ArticleContentProps = {
  article: BlogArticle
}

/**
 * Renders the translated article body. Section count and paragraph/bullet
 * counts differ per article, so every optional key is probed with `has`.
 */
export async function ArticleContent({ article }: ArticleContentProps) {
  const t = await getTranslations(
    `blog.articles.${article.translationKey}.content`,
  )

  const introParagraphs: string[] = []
  for (let index = 1; t.has(`introP${index}`); index += 1) {
    introParagraphs.push(t(`introP${index}`))
  }

  const conclusionParagraphs: string[] = []
  for (let index = 1; t.has(`conclusionP${index}`); index += 1) {
    conclusionParagraphs.push(t(`conclusionP${index}`))
  }

  return (
    <div>
      {introParagraphs.length > 0 ? (
        <div {...stylex.props(styles.intro)}>
          {introParagraphs.map((paragraph, index) => (
            <p
              key={`intro-${index}`}
              {...stylex.props(
                index === 0 ? styles.introLead : styles.introParagraph,
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {article.sectionIds.map((sectionId) => {
        const paragraphs: string[] = []
        for (let index = 1; t.has(`${sectionId}P${index}`); index += 1) {
          paragraphs.push(t(`${sectionId}P${index}`))
        }

        const bullets: string[] = []
        for (let index = 1; t.has(`${sectionId}Bullet${index}`); index += 1) {
          bullets.push(t(`${sectionId}Bullet${index}`))
        }

        const leadKey = `${sectionId}Lead`
        const outroKey = `${sectionId}Outro`

        return (
          <section
            key={sectionId}
            id={sectionId}
            {...stylex.props(styles.section)}
          >
            <h2 {...stylex.props(styles.sectionTitle)}>
              {t(`${sectionId}Title`)}
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p
                key={`${sectionId}-p${index}`}
                {...stylex.props(styles.paragraph)}
              >
                {paragraph}
              </p>
            ))}
            {t.has(leadKey) ? (
              <p {...stylex.props(styles.lead)}>{t(leadKey)}</p>
            ) : null}
            {bullets.length > 0 ? (
              <ul {...stylex.props(styles.bullets)}>
                {bullets.map((bullet, index) => (
                  <li
                    key={`${sectionId}-b${index}`}
                    {...stylex.props(styles.bullet)}
                  >
                    <span
                      aria-hidden="true"
                      {...stylex.props(styles.bulletIcon)}
                    >
                      <Check size={14} />
                    </span>
                    <span {...stylex.props(styles.bulletText)}>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {t.has(outroKey) ? (
              <p {...stylex.props(styles.outro)}>{t(outroKey)}</p>
            ) : null}
          </section>
        )
      })}

      {t.has('conclusionTitle') ? (
        <section {...stylex.props(styles.conclusion)}>
          <h2 {...stylex.props(styles.sectionTitle)}>{t('conclusionTitle')}</h2>
          {conclusionParagraphs.map((paragraph, index) => {
            const isLast = index === conclusionParagraphs.length - 1

            return (
              <p
                key={`conclusion-${index}`}
                {...stylex.props(
                  styles.conclusionParagraph,
                  isLast && styles.conclusionFinal,
                  isLast && styles.conclusionFinalSpacing,
                )}
              >
                {paragraph}
              </p>
            )
          })}
        </section>
      ) : null}
    </div>
  )
}
