import * as stylex from '@stylexjs/stylex'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '../../../i18n/navigation'
import { colors, fonts, radii, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import { getFeaturedArticle } from './blog-data'
import { BlogTagBadge } from './blog-tag'

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
  section: {
    marginBlockEnd: {
      default: '4rem',
      '@media (min-width: 64rem)': '6rem',
    },
    width: '100%',
  },
  card: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 64rem)': spacing.xl,
    },
    borderColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: radii.xl,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: {
      default: spacing.lg,
      '@media (min-width: 64rem)': '2.5rem',
    },
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    boxShadow: {
      default: '0 1px 2px rgba(0, 0, 0, 0.04)',
      ':hover': '0 12px 32px rgba(0, 0, 0, 0.08)',
    },
    color: 'inherit',
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 64rem)': '7fr 5fr',
    },
    textDecorationLine: 'none',
    transitionDuration: '250ms',
    transitionProperty: 'box-shadow',
    width: '100%',
  },
  imageWrapper: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    aspectRatio: {
      default: '16 / 10',
      '@media (min-width: 64rem)': '16 / 9',
    },
    backgroundColor: colors.surfaceContainer,
    position: 'relative',
    width: '100%',
  },
  image: {
    objectFit: 'cover',
    transform: {
      default: 'scale(1)',
      ':hover': 'scale(1.05)',
    },
    transitionDuration: '500ms',
    transitionProperty: 'transform',
  },
  content: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  },
  tags: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  title: {
    margin: 0,
    color: {
      default: colors.onSurface,
      ':hover': colors.primary,
    },
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.75rem',
      '@media (min-width: 64rem)': '2rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    transitionDuration: '150ms',
    transitionProperty: 'color',
  },
  description: {
    margin: 0,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.625,
    marginTop: spacing.sm,
  },
  readMore: {
    gap: spacing.xs,
    alignItems: 'center',
    color: colors.primary,
    display: 'inline-flex',
    fontFamily: fonts.body,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.25rem',
    marginTop: spacing.md,
  },
})

export async function FeaturedArticle() {
  const [t, locale] = await Promise.all([getTranslations('blog'), getLocale()])
  const article = getFeaturedArticle()
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight

  return (
    <section {...stylex.props(styles.section)}>
      <Reveal>
        <Link
          href={`/blog/${article.slug}`}
          {...stylex.props(styles.card, styles.focusRing)}
        >
          <div {...stylex.props(styles.imageWrapper)}>
            <Image
              src={article.image}
              alt={t(`articles.${article.translationKey}.title`)}
              fill
              sizes="(min-width: 64rem) 55vw, 100vw"
              loading="eager"
              {...stylex.props(styles.image)}
            />
          </div>
          <div {...stylex.props(styles.content)}>
            <div {...stylex.props(styles.tags)}>
              {article.tags.map((tag) => (
                <BlogTagBadge key={tag} tag={tag} />
              ))}
            </div>
            <h2 {...stylex.props(styles.title)}>
              {t(`articles.${article.translationKey}.title`)}
            </h2>
            <p {...stylex.props(styles.description)}>
              {t(`articles.${article.translationKey}.description`)}
            </p>
            <span {...stylex.props(styles.readMore)}>
              {t(`articles.${article.translationKey}.readMore`)}
              <Arrow aria-hidden="true" size={16} />
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  )
}
