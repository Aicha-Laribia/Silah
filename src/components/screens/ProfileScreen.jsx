import { AnimatedSection, GlassCard, Page } from '../ui/Primitives'
import { ThemedIcon, profileIcons } from '../ui/ThemedIcon'
import { useApp } from '../../hooks/useApp'
import { t } from '../../data/translations'

const IMPACT = [
  { label: 'People supported', value: '3', icon: profileIcons.supported },
  { label: 'Needs answered', value: '5', icon: profileIcons.needs },
  { label: 'Gatherings joined', value: '2', icon: profileIcons.gatherings },
]

export default function ProfileScreen() {
  const { user, setScreen, locale } = useApp()

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'MS'

  const roleLabel = user?.role?.id
    ? t(locale, `roles.${user.role.id}.${locale === 'ar' ? 'ar' : 'label'}`)
    : locale === 'ar' ? 'فرد' : 'Individual'

  return (
    <Page variant="emerald">
      <div style={styles.scroll}>
        <AnimatedSection>
          <GlassCard style={styles.headerCard}>
            <div style={{ ...styles.headerGlow, ...(locale === 'ar' ? { left: -60, right: 'auto' } : { right: -60, left: 'auto' }) }} />
            {/* Mosque silhouette: large, blurred, behind content. Switch sides based on locale */}
            <svg
              viewBox="0 0 600 520"
              style={{ ...styles.mosque, ...(locale === 'ar' ? styles.mosqueRTL : styles.mosqueLTR) }}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g fill="currentColor" fillRule="nonzero" transform="translate(20,20)">
                <ellipse cx="260" cy="360" rx="260" ry="80" fill="black" opacity="0.03" />
                <path d="M120 300 C140 220 220 180 300 200 C380 180 460 220 480 300 L480 360 L120 360 Z" fill="black" opacity="0.06" />
                <circle cx="300" cy="160" r="72" fill="black" opacity="0.045" />
                <rect x="240" y="180" width="120" height="100" rx="30" fill="black" opacity="0.05" />
                <path d="M60 260 C90 200 160 160 240 160" stroke="black" strokeWidth="6" opacity="0.04" fill="none" />
              </g>
            </svg>
            <div style={styles.avatar}>
              <span>{initials}</span>
            </div>
            <div style={styles.identity}>
              <p style={styles.eyebrow}>Identity and trust</p>
              <h1 style={styles.name}>{user?.name || (locale === 'ar' ? 'أخ/أخت مسلم' : 'Muslim Sister/Brother')}</h1>
              <span style={styles.roleBadge}>{roleLabel}</span>
            </div>
            <div style={styles.trustPanel}>
              <span style={styles.trustIcon}><ThemedIcon icon={profileIcons.trusted} size={16} strokeWidth={2.4} /></span>
              <div>
                <strong>{t(locale, 'profile.trusted')}</strong>
                <p>Community trust is held with dignity and care.</p>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={90}>
          <section style={styles.section}>
            <div style={styles.sectionTitle}>{t(locale, 'profile.impactTitle')}</div>
            <div style={styles.impactGrid}>
              {IMPACT.map(item => (
                <GlassCard key={item.label} style={styles.impactCard}>
                  <span style={styles.impactIcon}>
                    <ThemedIcon icon={item.icon} size={20} strokeWidth={2.1} />
                  </span>
                  <span style={styles.impactValue}>{item.value}</span>
                  <span style={styles.impactLabel}>{item.label}</span>
                </GlassCard>
              ))}
            </div>
            <p style={styles.note}>{t(locale, 'profile.impactNote')}</p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={170}>
          <GlassCard style={styles.trustCard}>
            <div style={styles.trustCardIcon}>
              <ThemedIcon icon={profileIcons.masjid} size={22} strokeWidth={2.1} />
            </div>
            <div>
              <h3 style={styles.trustTitle}>Verified care network</h3>
              <p style={styles.trustText}>
                Your profile centers privacy, trust, and service. Public recognition is kept gentle so help remains sincere.
              </p>
            </div>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={240}>
          <section style={styles.section}>
            <div style={styles.sectionTitle}>{t(locale, 'profile.account')}</div>
            <GlassCard style={styles.settingsCard}>
              {[
                { icon: profileIcons.notifications, label: t(locale, 'profile.settings.notifications') },
                { icon: profileIcons.location, label: t(locale, 'profile.settings.location') },
                { icon: profileIcons.masjid, label: t(locale, 'profile.settings.masjid') },
                { icon: profileIcons.language, label: `${t(locale, 'profile.settings.language')} · ${locale === 'ar' ? 'العربية' : 'English'}` },
              ].map(item => (
                <button
                  key={item.label}
                  style={{ ...styles.settingsRow, direction: locale === 'ar' ? 'rtl' : 'ltr' }}
                  className="soft-interaction"
                >
                  <span style={styles.settingsIcon}>
                    <ThemedIcon icon={item.icon} size={17} strokeWidth={2.1} />
                  </span>
                  <span style={{ ...styles.settingsLabel, textAlign: locale === 'ar' ? 'right' : 'left' }}>{item.label}</span>
                  <span style={styles.settingsArrow}>›</span>
                </button>
              ))}
            </GlassCard>
          </section>
        </AnimatedSection>

        <button style={styles.signOut} onClick={() => setScreen('login')} className="soft-interaction">
          {t(locale, 'profile.signOut')}
        </button>

        <div style={{ height: 118 }} />
      </div>
    </Page>
  )
}

const styles = {
  scroll: { position: 'relative', zIndex: 1, flex: 1, minHeight: 0, overflowY: 'auto', padding: '1.25rem' },
  headerCard: { position: 'relative', padding: '1.25rem', overflow: 'hidden', background: 'linear-gradient(145deg, rgba(22,155,125,0.94), rgba(30,107,60,0.88))', color: 'var(--white)' },
  headerGlow: { position: 'absolute', width: 180, height: 180, top: -80, right: -60, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', filter: 'blur(24px)', transition: 'all 480ms ease' },
  mosque: { position: 'absolute', top: -40, width: 480, height: 420, opacity: 0.08, filter: 'blur(8px)', transform: 'scale(1.05)', transition: 'all 480ms ease', zIndex: 0, pointerEvents: 'none', color: 'var(--ink)' },
  mosqueLTR: { right: -40, left: 'auto' },
  mosqueRTL: { left: -40, right: 'auto', transform: 'scale(1.05) translateX(-4px)' },
  avatar: { position: 'relative', width: 72, height: 72, borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.34)', boxShadow: '0 16px 30px rgba(5,45,40,0.18)', fontSize: 23, fontWeight: 900 },
  identity: { position: 'relative', marginTop: 16 },
  eyebrow: { fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' },
  name: { fontSize: 25, lineHeight: 1.15, marginTop: 5, marginBottom: 10 },
  roleBadge: { display: 'inline-flex', padding: '7px 11px', borderRadius: 999, background: 'rgba(255,255,255,0.16)', fontSize: 12, fontWeight: 800 },
  trustPanel: { position: 'relative', marginTop: 16, display: 'flex', gap: 11, padding: 13, borderRadius: 24, background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.18)' },
  trustIcon: { width: 27, height: 27, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.22)', fontWeight: 900, flexShrink: 0 },
  section: { marginTop: 18 },
  sectionTitle: { fontSize: 11, fontWeight: 900, color: 'var(--teal-700)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 },
  impactGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 },
  impactCard: { padding: '14px 8px', textAlign: 'center', borderRadius: 24 },
  impactIcon: { color: 'var(--teal-700)', display: 'flex', justifyContent: 'center' },
  impactValue: { display: 'block', fontSize: 24, color: 'var(--teal-800)', fontWeight: 900, marginTop: 6 },
  impactLabel: { display: 'block', fontSize: 10, color: 'var(--ink-60)', lineHeight: 1.3, marginTop: 3 },
  note: { marginTop: 10, color: 'var(--ink-60)', fontSize: 12, lineHeight: 1.55, fontStyle: 'italic' },
  trustCard: { marginTop: 18, padding: '1.1rem', display: 'flex', gap: 13, alignItems: 'flex-start', background: 'rgba(255,253,240,0.82)' },
  trustCardIcon: { width: 46, height: 46, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212,160,23,0.13)', color: 'var(--gold-700)', flexShrink: 0 },
  trustTitle: { color: 'var(--ink)', fontSize: 16, marginBottom: 5 },
  trustText: { color: 'var(--ink-60)', fontSize: 13, lineHeight: 1.55 },
  settingsCard: { overflow: 'hidden' },
  settingsRow: { width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px', border: 'none', borderBottom: '1px solid rgba(16,34,31,0.06)', background: 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'background 0.25s ease' },
  settingsIcon: { width: 34, height: 34, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(22,155,125,0.08)', color: 'var(--teal-800)' },
  settingsLabel: { flex: 1, color: 'var(--ink)', fontSize: 14, fontWeight: 700 },
  settingsArrow: { color: 'var(--ink-30)', fontSize: 22 },
  signOut: { width: '100%', marginTop: 18, border: '1px solid rgba(16,34,31,0.08)', borderRadius: 24, background: 'rgba(255,255,255,0.54)', padding: 13, color: 'var(--ink-60)', fontWeight: 800, cursor: 'pointer', transition: 'all 0.25s ease' }
}
