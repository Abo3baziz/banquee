import * as stylex from '@stylexjs/stylex'
import { Check } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import type { BlogArticle } from './blog-articles'

type ContentSection = {
  id: string
  titleKey: string
  paragraphs: string[]
  leadKey?: string
  listItems?: string[]
  outroKey?: string
}

const SECTIONS: readonly ContentSection[] = [
  {
    id: 'section-1',
    titleKey: 'sec1Title',
    paragraphs: ['sec1P1', 'sec1P2'],
    leadKey: 'sec1StartBy',
    listItems: ['sec1Bullet1', 'sec1Bullet2', 'sec1Bullet3', 'sec1Bullet4'],
    outroKey: 'sec1Outro',
  },
  {
    id: 'section-2',
    titleKey: 'sec2Title',
    paragraphs: ['sec2P1', 'sec2P2'],
    leadKey: 'sec2Routine',
    listItems: ['sec2Bullet1', 'sec2Bullet2', 'sec2Bullet3', 'sec2Bullet4'],
    outroKey: 'sec2Outro',
  },
  {
    id: 'section-3',
    titleKey: 'sec3Title',
    paragraphs: ['sec3P1', 'sec3P2'],
    leadKey: 'sec3PayAttention',
    listItems: ['sec3Bullet1', 'sec3Bullet2', 'sec3Bullet3', 'sec3Bullet4'],
    outroKey: 'sec3Outro',
  },
  {
    id: 'section-4',
    titleKey: 'sec4Title',
    paragraphs: ['sec4P1'],
    leadKey: 'sec4Habits',
    listItems: [
      'sec4Bullet1',
      'sec4Bullet2',
      'sec4Bullet3',
      'sec4Bullet4',
      'sec4Bullet5',
    ],
    outroKey: 'sec4Outro',
  },
  {
    id: 'section-5',
    titleKey: 'sec5Title',
    paragraphs: ['sec5P1', 'sec5P2', 'sec5P3'],
    outroKey: 'sec5Outro',
  },
]

const INTRO_PARAGRAPHS = ['introP1', 'introP2', 'introP3'] as const

const styles = stylex.create({
  root: {
    gap: spacing.xl,
    marginInline: 'auto',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '46rem',
    width: '100%',
  },
  paragraph: {
    margin: 0,
    color: colors.secondary,
    fontFamily: fonts.body,
    fontSize: '1rem',
    lineHeight: 1.625,
  },
  introLead: {
    color: colors.onSurface,
    fontSize: {
      default: '1.125rem',
      '@media (min-width: 40rem)': '1.25rem',
    },
  },
  intro: {
    gap: spacing.md,
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    gap: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    paddingBlockStart: spacing.xl,
    scrollMarginTop: '7rem',
  },
  sectionTitle: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.5rem',
      '@media (min-width: 64rem)': '2rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.25,
  },
  lead: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.625,
  },
  list: {
    margin: 0,
    padding: 0,
    gap: '0.875rem',
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
  },
  listItem: {
    gap: '0.75rem',
    alignItems: 'flex-start',
    color: colors.secondary,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '1rem',
    lineHeight: 1.625,
  },
  marker: {
    borderRadius: radii.full,
    alignItems: 'center',
    backgroundColor: colors.primaryTint,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    height: '1.25rem',
    marginTop: '0.125rem',
    width: '1.25rem',
  },
  markerIcon: {
    color: colors.primary,
  },
  conclusion: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 40rem)': spacing.xl,
    },
    borderRadius: radii.xl,
    gap: spacing.md,
    backgroundColor: colors.surfaceContainerLow,
    display: 'flex',
    flexDirection: 'column',
  },
  conclusionFinal: {
    fontWeight: 500,
  },
})

export async function ArticleContent({ article }: { article: BlogArticle }) {
  const [t, tc] = await Promise.all([
    getTranslations('blog'),
    getTranslations('blog.articleDetail.content'),
  ])

  if (!article.hasDetail) {
    return (
      <div {...stylex.props(styles.root)}>
        <p {...stylex.props(styles.paragraph)}>
          {t(`articles.${article.key}.description`)}
        </p>
      </div>
    )
  }

  return (
    <div {...stylex.props(styles.root)}>
      <Reveal>
        <div {...stylex.props(styles.intro)}>
          {INTRO_PARAGRAPHS.map((key, index) => (
            <p
              key={key}
              {...stylex.props(
                styles.paragraph,
                index === 0 && styles.introLead,
              )}
            >
              {tc(key)}
            </p>
          ))}
        </div>
      </Reveal>

      {SECTIONS.map((section) => (
        <Reveal key={section.id}>
          <section id={section.id} {...stylex.props(styles.section)}>
            <h2 {...stylex.props(styles.sectionTitle)}>
              {tc(section.titleKey)}
            </h2>

            {section.paragraphs.map((key) => (
              <p key={key} {...stylex.props(styles.paragraph)}>
                {tc(key)}
              </p>
            ))}

            {section.leadKey ? (
              <p {...stylex.props(styles.lead)}>{tc(section.leadKey)}</p>
            ) : null}

            {section.listItems ? (
              <ul {...stylex.props(styles.list)}>
                {section.listItems.map((key) => (
                  <li key={key} {...stylex.props(styles.listItem)}>
                    <span aria-hidden="true" {...stylex.props(styles.marker)}>
                      <Check
                        aria-hidden="true"
                        size={14}
                        {...stylex.props(styles.markerIcon)}
                      />
                    </span>
                    <span>{tc(key)}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {section.outroKey ? (
              <p {...stylex.props(styles.paragraph)}>{tc(section.outroKey)}</p>
            ) : null}
          </section>
        </Reveal>
      ))}

      <Reveal>
        <div {...stylex.props(styles.conclusion)}>
          <h2 {...stylex.props(styles.sectionTitle)}>
            {tc('conclusionTitle')}
          </h2>
          <p {...stylex.props(styles.paragraph)}>{tc('conclusionP1')}</p>
          <p {...stylex.props(styles.paragraph)}>{tc('conclusionP2')}</p>
          <p {...stylex.props(styles.paragraph)}>{tc('conclusionP3')}</p>
          <p {...stylex.props(styles.paragraph, styles.conclusionFinal)}>
            {tc('conclusionP4')}
          </p>
        </div>
      </Reveal>
    </div>
  )
}
