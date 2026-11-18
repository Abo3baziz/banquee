import * as stylex from '@stylexjs/stylex'
import {
  BadgeCheck,
  Gauge,
  Lock,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { colors, fonts, spacing } from '../../styles/tokens.stylex'
import { Reveal } from '../ui/reveal'
import { ChatButton } from './chat-button'
import { SupportContactCard } from './support-contact-card'

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
    paddingBlock: '6rem',
    paddingInline: {
      default: spacing.md,
      '@media (min-width: 40rem)': spacing.margin,
    },
    backgroundColor: colors.surfaceContainerLow,
  },
  container: {
    marginInline: 'auto',
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '62.5rem',
  },
  heading: {
    margin: 0,
    color: colors.onSurface,
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.75rem',
      '@media (min-width: 40rem)': '2.5rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: 1.2,
    textAlign: 'center',
  },
  description: {
    margin: 0,
    color: colors.secondary,
    fontFamily: fonts.body,
    fontSize: '1rem',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '3rem',
    marginTop: spacing.sm,
  },
  grid: {
    gap: spacing.lg,
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 48rem)': 'repeat(3, minmax(0, 1fr))',
    },
    width: '100%',
  },
  link: {
    color: {
      default: colors.primary,
      ':hover': colors.primaryHover,
    },
    fontFamily: fonts.heading,
    fontSize: '1.125rem',
    fontWeight: 700,
    textDecorationLine: 'none',
  },
  sub: {
    margin: 0,
    color: colors.secondary,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    marginTop: 'auto',
    paddingTop: spacing.md,
  },
  chatDescription: {
    margin: 0,
    color: colors.secondary,
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    marginBottom: spacing.lg,
  },
  badges: {
    gap: spacing.xl,
    color: colors.secondary,
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: fonts.body,
    fontSize: '0.8125rem',
    fontWeight: 500,
    justifyContent: 'center',
    marginTop: '3.5rem',
  },
  badge: {
    gap: spacing.sm,
    alignItems: 'center',
    display: 'inline-flex',
  },
  badgeIcon: {
    color: colors.primaryContainer,
    flexShrink: 0,
  },
})

export async function SupportContact() {
  const t = await getTranslations('support')
  const phoneDigits = t('contact.phone').replace(/\s+/g, '')
  const email = t('contact.email')

  return (
    <section
      aria-labelledby="support-contact-title"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.container)}>
        <Reveal>
          <h2 id="support-contact-title" {...stylex.props(styles.heading)}>
            {t('contact.headingAlt')}
          </h2>
        </Reveal>
        <p {...stylex.props(styles.description)}>{t('contact.description')}</p>

        <Reveal delay={0.1}>
          <div {...stylex.props(styles.grid)}>
            <SupportContactCard title={t('contact.hotlineTitle')} icon={Phone}>
              <a
                href={`tel:${phoneDigits}`}
                {...stylex.props(styles.link, styles.focusRing)}
              >
                <bdi dir="ltr">{t('contact.phone')}</bdi>
              </a>
              <p {...stylex.props(styles.sub)}>{t('contact.hotlineSub')}</p>
            </SupportContactCard>

            <SupportContactCard title={t('contact.emailTitle')} icon={Mail}>
              <a
                href={`mailto:${email}`}
                {...stylex.props(styles.link, styles.focusRing)}
              >
                <bdi dir="ltr">{email}</bdi>
              </a>
              <p {...stylex.props(styles.sub)}>{t('contact.emailSub')}</p>
            </SupportContactCard>

            <SupportContactCard
              title={t('contact.chatTitle')}
              icon={MessageCircle}
            >
              <p {...stylex.props(styles.chatDescription)}>
                {t('contact.chatDescription')}
              </p>
              <ChatButton />
            </SupportContactCard>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div {...stylex.props(styles.badges)}>
            <span {...stylex.props(styles.badge)}>
              <Lock
                aria-hidden="true"
                size={20}
                {...stylex.props(styles.badgeIcon)}
              />
              {t('contact.badges.encrypted')}
            </span>
            <span {...stylex.props(styles.badge)}>
              <BadgeCheck
                aria-hidden="true"
                size={20}
                {...stylex.props(styles.badgeIcon)}
              />
              {t('contact.badges.regulated')}
            </span>
            <span {...stylex.props(styles.badge)}>
              <Gauge
                aria-hidden="true"
                size={20}
                {...stylex.props(styles.badgeIcon)}
              />
              {t('contact.badges.nominalStatus')}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
