import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import type { BlogArticle } from './blog-articles'

const styles = stylex.create({
  header: {
    gap: spacing.md,
    marginInline: 'auto',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '48rem',
    width: '100%',
  },
  breadcrumb: {
    gap: spacing.xs,
    alignItems: 'center',
    color: colors.onSurfaceVariant,
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    marginBottom: spacing.md,
  },
  breadcrumbLink: {
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.primary,
    },
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'color',
  },
  focusRing: {
    outlineColor: {
      default: null,
      ':focus-visible': colors.primary,
    },
    outlineOffset: {
      default: null,
      ':focus-visible': 2,
    },
    outlineStyle: {
      default: 'none',
      ':focus-visible': 'solid',
    },
    outlineWidth: {
      default: null,
      ':focus-visible': 2,
    },
  },
  separator: {
    color: colors.outline,
  },
  current: {
    overflow: 'hidden',
    color: colors.onSurfaceVariant,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: {
      default: '15rem',
      '@media (min-width: 40rem)': '28rem',
    },
  },
  badges: {
    gap: spacing.sm,
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  badge: {
    borderRadius: radii.full,
    paddingBlock: '0.125rem',
    paddingInline: '0.625rem',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 600,
    lineHeight: '1rem',
  },
  title: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '2.25rem',
      '@media (min-width: 40rem)': '3rem',
      '@media (min-width: 64rem)': '3.375rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.15,
    marginBottom: spacing.md,
  },
  lede: {
    margin: 0,
    color: colors.secondary,
    fontFamily: fonts.body,
    fontSize: '1rem',
    lineHeight: 1.625,
  },
})

export async function ArticleHeader({ article }: { article: BlogArticle }) {
  const [t, td] = await Promise.all([
    getTranslations('blog'),
    getTranslations('blog.articleDetail'),
  ])

  const title = t(`articles.${article.key}.title`)

  return (
    <Reveal>
      <header {...stylex.props(styles.header)}>
        <nav {...stylex.props(styles.breadcrumb)}>
          <Link
            href="/"
            {...stylex.props(styles.breadcrumbLink, styles.focusRing)}
          >
            {td('breadcrumbHome')}
          </Link>
          <span aria-hidden="true" {...stylex.props(styles.separator)}>
            /
          </span>
          <Link
            href="/blog"
            {...stylex.props(styles.breadcrumbLink, styles.focusRing)}
          >
            {td('breadcrumbBlog')}
          </Link>
          <span aria-hidden="true" {...stylex.props(styles.separator)}>
            /
          </span>
          <span aria-current="page" {...stylex.props(styles.current)}>
            {title}
          </span>
        </nav>

        <div {...stylex.props(styles.badges)}>
          {article.tags.map((tag) => (
            <span key={tag} {...stylex.props(styles.badge)}>
              {t(`tags.${tag}`)}
            </span>
          ))}
        </div>

        <h1 {...stylex.props(styles.title)}>{title}</h1>

        <p {...stylex.props(styles.lede)}>
          {t(`articles.${article.key}.description`)}
        </p>
      </header>
    </Reveal>
  )
}
