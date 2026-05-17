import { useState } from 'react'
import { AnimatedSection, GlassCard, GradientButton, Page } from '../ui/Primitives'
import { ThemedIcon, eventIcons } from '../ui/ThemedIcon'
import { useApp } from '../../hooks/useApp'
import { getTodayContent } from '../../data/mockData'
import { t } from '../../data/translations'

export default function DailyScreen() {
  const { enterApp, user, locale } = useApp()
  const content = getTodayContent()
  const [dhikrCount, setDhikrCount] = useState(0)
  const [challenged, setChallenged] = useState(false)

  const progress = Math.min((dhikrCount / content.dhikr_count) * 100, 100)
  const done = dhikrCount >= content.dhikr_count

  return (
    <Page variant="sunrise" style={{ overflowY: 'auto' }}>
      <div style={styles.container}>
        <AnimatedSection>
          <header style={styles.hero}>
            <div style={styles.sun} className="animate-breathe" />
            <p style={styles.eyebrow}>Fajr serenity</p>
            <h1 style={styles.greeting}>
              {t(locale, 'daily.greeting')}{user?.name ? `, ${user.name}` : ''}
            </h1>
            <p style={styles.date}>
              {new Date().toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </p>
          </header>
        </AnimatedSection>

        <AnimatedSection delay={80}>
          <GlassCard style={styles.ayahCard}>
            <div style={styles.ayahBadge}>{t(locale, 'daily.ayahBadge')}</div>
            <p style={styles.ayahArabic}>{content.ayah}</p>
            <p style={styles.ayahTranslation}>"{content.ayah_translation}"</p>
            <p style={styles.ayahSource}>{content.surah}</p>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={160}>
          <GlassCard style={styles.dhikrCard}>
            <div style={styles.dhikrTop}>
              <div>
                <div style={styles.smallBadge}>{t(locale, 'daily.dhikrBadge')}</div>
                <p style={styles.dhikrArabic}>{content.dhikr}</p>
                <p style={styles.dhikrTranslation}>{content.dhikr_translation}</p>
              </div>
              <div style={styles.counterOrb}>
                <span style={styles.dhikrNumber}>{dhikrCount}</span>
                <span style={styles.dhikrTotal}>/{content.dhikr_count}</span>
              </div>
            </div>

            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>

            <button
              style={{ ...styles.dhikrBtn, ...(done ? styles.dhikrBtnDone : {}) }}
              onClick={() => !done && setDhikrCount(c => c + 1)}
              className="soft-interaction"
            >
              {done ? 'Alhamdulillah, completed' : 'Tap gently to count'}
            </button>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={240}>
          <GlassCard style={styles.sunnahCard}>
            <div style={styles.sunnahIcon}>
              <ThemedIcon icon={eventIcons.eid} size={21} strokeWidth={2.1} />
            </div>
            <div style={styles.sunnahCopy}>
              <div style={styles.smallBadgeGold}>{t(locale, 'daily.challengeBadge')}</div>
              <p style={styles.sunnahText}>{content.challenge}</p>
            </div>
            <button
              style={{ ...styles.sunnahBtn, ...(challenged ? styles.sunnahBtnDone : {}) }}
              onClick={() => setChallenged(true)}
              className="soft-interaction"
            >
              {challenged ? t(locale, 'daily.challengeDone') : t(locale, 'daily.challengeAction')}
            </button>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={320}>
          <GradientButton style={styles.enterBtn} onClick={enterApp}>
            <span>{t(locale, 'daily.enter')}</span>
            <span>→</span>
          </GradientButton>
          <button style={styles.skipLink} onClick={enterApp}>{t(locale, 'daily.skip')}</button>
        </AnimatedSection>
      </div>
    </Page>
  )
}

const styles = {
  container: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: 520,
    margin: '0 auto',
    padding: '2rem 1.25rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  hero: {
    position: 'relative',
    minHeight: 170,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  sun: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(245,216,122,0.62), rgba(245,216,122,0.08) 70%)',
    filter: 'blur(2px)'
  },
  eyebrow: { position: 'relative', color: 'var(--gold-700)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800 },
  greeting: { position: 'relative', fontFamily: 'var(--font-arabic)', fontSize: 28, color: 'var(--ink)', lineHeight: 1.25, marginTop: 8 },
  date: { position: 'relative', marginTop: 8, color: 'var(--ink-60)', fontSize: 13 },
  ayahCard: { padding: '1.6rem', textAlign: 'center' },
  ayahBadge: {
    display: 'inline-flex',
    padding: '5px 12px',
    borderRadius: 999,
    background: 'rgba(212,160,23,0.12)',
    color: 'var(--gold-700)',
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    marginBottom: 15
  },
  ayahArabic: { fontFamily: 'var(--font-arabic)', fontSize: 27, color: 'var(--teal-950)', lineHeight: 1.85, direction: 'rtl' },
  ayahTranslation: { marginTop: 12, fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.65, fontStyle: 'italic' },
  ayahSource: { marginTop: 10, fontSize: 12, color: 'var(--teal-700)', fontWeight: 700 },
  dhikrCard: { padding: '1.2rem' },
  dhikrTop: { display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' },
  smallBadge: { color: 'var(--teal-700)', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 8 },
  dhikrArabic: { fontFamily: 'var(--font-arabic)', fontSize: 21, color: 'var(--ink)', direction: 'rtl', lineHeight: 1.5 },
  dhikrTranslation: { fontSize: 12, color: 'var(--ink-60)', marginTop: 4 },
  counterOrb: {
    width: 82,
    height: 82,
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, rgba(22,155,125,0.12), rgba(255,255,255,0.9))',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 12px 26px rgba(15,45,28,0.08)'
  },
  dhikrNumber: { color: 'var(--teal-800)', fontSize: 28, fontWeight: 800, lineHeight: 1 },
  dhikrTotal: { color: 'var(--ink-60)', fontSize: 12, marginTop: 3 },
  progressTrack: { height: 8, borderRadius: 999, background: 'rgba(16,34,31,0.06)', overflow: 'hidden', margin: '18px 0 12px' },
  progressFill: { height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, var(--teal-500), var(--gold-400))', transition: 'width 0.35s ease' },
  dhikrBtn: {
    width: '100%',
    border: '1px solid rgba(22,155,125,0.18)',
    borderRadius: 22,
    padding: '13px',
    background: 'rgba(239,250,245,0.86)',
    color: 'var(--teal-900)',
    fontWeight: 800,
    cursor: 'pointer',
    transition: 'all 0.25s ease'
  },
  dhikrBtnDone: { background: 'rgba(22,155,125,0.12)', color: 'var(--teal-700)' },
  sunnahCard: { padding: '1.2rem', display: 'grid', gridTemplateColumns: '44px 1fr', gap: 12, alignItems: 'start', background: 'rgba(255,253,240,0.78)' },
  sunnahIcon: {
    width: 44,
    height: 44,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(212,160,23,0.14)',
    color: 'var(--gold-700)'
  },
  sunnahCopy: { minWidth: 0 },
  smallBadgeGold: { color: 'var(--gold-700)', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 5 },
  sunnahText: { fontSize: 14, color: 'var(--ink)', lineHeight: 1.55, fontWeight: 600 },
  sunnahBtn: {
    gridColumn: '1 / -1',
    border: '1px solid rgba(212,160,23,0.2)',
    borderRadius: 22,
    padding: '12px',
    background: 'rgba(255,255,255,0.68)',
    color: 'var(--gold-700)',
    fontWeight: 800,
    cursor: 'pointer',
    transition: 'all 0.25s ease'
  },
  sunnahBtnDone: { background: 'rgba(212,160,23,0.14)' },
  enterBtn: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 },
  skipLink: {
    display: 'block',
    width: '100%',
    border: 'none',
    background: 'transparent',
    color: 'var(--ink-60)',
    padding: '14px',
    fontSize: 12,
    cursor: 'pointer'
  }
}
