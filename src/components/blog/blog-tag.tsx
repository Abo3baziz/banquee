import * as stylex from '@stylexjs/stylex'
import { useTranslations } from 'next-intl'
import { colors, fonts, radii } from '../../styles/tokens.stylex'
import type { BlogTag } from './blog-types'

const styles = stylex.create({
  badge: {
    borderRadius: radii.full,
    paddingBlock: '0.125rem',
    paddingInline: '0.625rem',
    backgroundColor: colors.primaryTint,
    color: colors.primary,
    fontFamily: fonts.body,
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    lineHeight: '1rem',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
})

/**
 * Category badge shared by the blog listing cards, the featured article, and
 * the article detail header. Labels come from the `blog.tags` namespace.
 */
export function BlogTagBadge({ tag }: { tag: BlogTag }) {
  const t = useTranslations('blog')

  return <span {...stylex.props(styles.badge)}>{t(`tags.${tag}`)}</span>
}
