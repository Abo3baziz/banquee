import * as stylex from '@stylexjs/stylex'
import { getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, spacing } from '../../styles/tokens.stylex'

const styles = stylex.create({
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
  nav: {
    paddingBlockStart: spacing.lg,
  },
  list: {
    gap: '0.5rem',
    marginBlock: 0,
    marginInline: 0,
    paddingInline: 0,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    listStyleType: 'none',
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    minWidth: 0,
  },
  link: {
    color: {
      default: colors.onSurfaceVariant,
      ':hover': colors.primary,
    },
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    textDecorationLine: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'color',
  },
  separator: {
    color: colors.outline,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    lineHeight: '1.25rem',
  },
  current: {
    overflow: 'hidden',
    color: colors.onSurface,
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: {
      default: '15rem',
      '@media (min-width: 64rem)': '28rem',
    },
  },
})

type ArticleBreadcrumbsProps = {
  title: string
}

/**
 * Home / Blog / article trail shown above the article header. The last crumb
 * is plain text, so it is truncated instead of wrapping.
 */
export async function ArticleBreadcrumbs({ title }: ArticleBreadcrumbsProps) {
  const t = await getTranslations('blog.articleDetail')
  const label = t('breadcrumbBlog')

  return (
    <nav aria-label={label} {...stylex.props(styles.nav)}>
      <ol {...stylex.props(styles.list)}>
        <li {...stylex.props(styles.item)}>
          <Link href="/" {...stylex.props(styles.link, styles.focusRing)}>
            {t('breadcrumbHome')}
          </Link>
        </li>
        <li aria-hidden="true" {...stylex.props(styles.separator)}>
          /
        </li>
        <li {...stylex.props(styles.item)}>
          <Link href="/blog" {...stylex.props(styles.link, styles.focusRing)}>
            {t('breadcrumbBlog')}
          </Link>
        </li>
        <li aria-hidden="true" {...stylex.props(styles.separator)}>
          /
        </li>
        <li {...stylex.props(styles.item)}>
          <span aria-current="page" {...stylex.props(styles.current)}>
            {title}
          </span>
        </li>
      </ol>
    </nav>
  )
}
