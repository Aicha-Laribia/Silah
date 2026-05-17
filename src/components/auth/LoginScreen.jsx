import { useState } from 'react'
import { AnimatedSection, GlassCard, GradientButton } from '../ui/Primitives'
import { ThemedIcon, roleIcons } from '../ui/ThemedIcon'
import { useApp } from '../../hooks/useApp'
import { USER_TYPES } from '../../data/mockData'
import { t } from '../../data/translations'

export default function LoginScreen() {
  const { login, locale, toggleLocale } = useApp()
  const [step, setStep] = useState('role')
  const [selectedRole, setSelectedRole] = useState(null)
  const [form, setForm] = useState({ name: '', sex: '', age: '', bloodType: '', email: '', password: '' })
  const [isLogin, setIsLogin] = useState(false)

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setStep('form')
  }

  const handleSubmit = () => {
    if (!form.name && !isLogin) return
    if (!form.sex && !isLogin) return
    if (!form.age && !isLogin) return
    if (!form.email || !form.password) return
    login({ ...form, role: selectedRole, id: Date.now() })
  }

  const roleLabel = (role) => t(locale, `roles.${role.id}.${locale === 'ar' ? 'ar' : 'label'}`)
  const roleDesc = (role) => t(locale, `roles.${role.id}.${locale === 'ar' ? 'descAr' : 'desc'}`)

  return (
    <div style={styles.root}>
      <div style={styles.ambientOne} />
      <div style={styles.ambientTwo} />
      <div style={styles.pattern} />
      <div style={styles.silhouette} />
      <button style={styles.languageBtn} onClick={toggleLocale}>
        {locale === 'en' ? 'العربية' : 'English'}
      </button>

      <div style={styles.container}>
        <AnimatedSection>
          <div style={styles.brand}>
            <div style={styles.logoMark} className="animate-softFloat">
              <span style={styles.logoArabic}>صِلة</span>
            </div>
            <p style={styles.kicker}>{t(locale, 'login.kicker')}</p>
            <h1 style={styles.appName}>Silah</h1>
            <p style={styles.tagline}>{t(locale, 'login.heading')}</p>
          </div>
        </AnimatedSection>

        {step === 'role' && (
          <AnimatedSection delay={120}>
            <GlassCard style={styles.card}>
              <div style={styles.cardHeader}>
                <p style={styles.cardTitle}>{t(locale, 'login.role')}</p>
                <span style={styles.cardSub}>{t(locale, 'login.roleHint')}</span>
              </div>

              <div style={styles.roles}>
                {USER_TYPES.map((type, index) => (
                  <button
                    key={type.id}
                    style={styles.roleBtn}
                    onClick={() => handleRoleSelect(type)}
                    className="soft-interaction animate-fadeUp"
                  >
                    <span style={styles.roleIcon}>
                      <ThemedIcon icon={roleIcons[type.id]} size={23} strokeWidth={2.1} />
                    </span>
                    <span style={styles.roleCopy}>
                      <span style={styles.roleLabel}>{roleLabel(type)}</span>
                      <span style={styles.roleDesc}>{roleDesc(type)}</span>
                    </span>
                    <span style={styles.roleArrow}>→</span>
                    <span style={{ animationDelay: `${index * 70}ms` }} />
                  </button>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        )}

        {step === 'form' && (
          <AnimatedSection delay={120}>
            <GlassCard style={styles.card}>
              <button style={styles.back} onClick={() => setStep('role')}>{t(locale, 'login.back')}</button>

              <div style={styles.selectedRole}>
                <span style={styles.selectedIcon}>
                  <ThemedIcon icon={roleIcons[selectedRole.id]} size={18} strokeWidth={2.2} />
                </span>
                <span>{roleLabel(selectedRole)}</span>
              </div>

              <div style={styles.toggle}>
                <button
                  style={{ ...styles.toggleBtn, ...(!isLogin ? styles.toggleActive : {}) }}
                  onClick={() => setIsLogin(false)}
                >
                  {t(locale, 'login.createAccount')}
                </button>
                <button
                  style={{ ...styles.toggleBtn, ...(isLogin ? styles.toggleActive : {}) }}
                  onClick={() => setIsLogin(true)}
                >
                  {t(locale, 'login.signIn')}
                </button>
              </div>

              {!isLogin && (
                <>
                  <input
                    className="premium-input"
                    style={styles.input}
                    placeholder={selectedRole?.id === 'muslim' ? t(locale, 'login.name') : t(locale, 'login.organization')}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                  <select
                    className="premium-input"
                    style={styles.input}
                    value={form.sex}
                    onChange={e => setForm({ ...form, sex: e.target.value })}
                    aria-label={t(locale, 'login.sex')}
                  >
                    <option value="">{t(locale, 'login.sexPlaceholder')}</option>
                    <option value="male">{t(locale, 'login.male')}</option>
                    <option value="female">{t(locale, 'login.female')}</option>
                    <option value="prefer-not">{t(locale, 'login.preferNot')}</option>
                  </select>
                  <select
                    className="premium-input"
                    style={styles.input}
                    value={form.bloodType}
                    onChange={e => setForm({ ...form, bloodType: e.target.value })}
                    aria-label={t(locale, 'login.bloodType')}
                  >
                    <option value="">{t(locale, 'login.bloodTypePlaceholder')}</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                  <input
                    className="premium-input"
                    style={styles.input}
                    type="number"
                    placeholder={t(locale, 'login.agePlaceholder')}
                    value={form.age}
                    onChange={e => setForm({ ...form, age: e.target.value })}
                  />
                </>
              )}
              <input
                className="premium-input"
                style={styles.input}
                type="email"
                placeholder={t(locale, 'login.email')}
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="premium-input"
                style={styles.input}
                type="password"
                placeholder={t(locale, 'login.password')}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
              {/* retype password */}
              <input
                className="premium-input"
                style={styles.input}
                type="password"
                placeholder={t(locale, 'login.confirmPassword')}
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              />

              <GradientButton style={styles.submitBtn} onClick={handleSubmit}>
                {isLogin ? t(locale, 'login.signInButton') : t(locale, 'login.join')}
              </GradientButton>

              <p style={styles.disclaimer}>{t(locale, 'login.disclaimer')}</p>
            </GlassCard>
          </AnimatedSection>
        )}
      </div>
    </div>
  )
}

const styles = {
  root: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, #fffaf0 0%, #effaf5 48%, #f7f4ee 100%)'
  },
  ambientOne: {
    position: 'absolute',
    width: 330,
    height: 330,
    top: -110,
    right: -130,
    borderRadius: '50%',
    background: 'rgba(22,155,125,0.2)',
    filter: 'blur(30px)',
    animation: 'softFloat 7s ease-in-out infinite'
  },
  ambientTwo: {
    position: 'absolute',
    width: 280,
    height: 280,
    bottom: -100,
    left: -110,
    borderRadius: '50%',
    background: 'rgba(212,160,23,0.2)',
    filter: 'blur(34px)',
    animation: 'softFloat 8s ease-in-out infinite 1.2s'
  },
  pattern: {
    position: 'absolute',
    inset: 0,
    opacity: 0.055,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='96' height='96' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23064b40' stroke-width='1'%3E%3Cpath d='M48 6l14 28 28 14-28 14-14 28-14-28L6 48l28-14L48 6z'/%3E%3Cpath d='M48 28a20 20 0 110 40 20 20 0 010-40z'/%3E%3C/g%3E%3C/svg%3E")`
  },
  silhouette: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
    height: 150,
    opacity: 0.1,
    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 480 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23052d28' d='M0 118h70V78c0-19 15-34 34-34s34 15 34 34v40h52V62c0-24 20-44 44-44s44 20 44 44v56h52V88c0-17 14-31 31-31s31 14 31 31v30h88v32H0z'/%3E%3C/svg%3E") center bottom / cover no-repeat`
  },
  languageBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
    border: '1px solid rgba(255,255,255,0.82)',
    borderRadius: 999,
    background: 'rgba(255,255,255,0.68)',
    color: 'var(--teal-900)',
    padding: '9px 13px',
    fontSize: 12,
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 12px 24px rgba(15,45,28,0.1)',
    backdropFilter: 'blur(18px)'
  },
  container: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: 470,
    padding: '2rem 1.25rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem'
  },
  brand: { textAlign: 'center' },
  logoMark: {
    width: 86,
    height: 86,
    margin: '0 auto 14px',
    borderRadius: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(214,244,236,0.75))',
    border: '1px solid rgba(255,255,255,0.9)',
    boxShadow: '0 22px 45px rgba(15,45,28,0.14)'
  },
  logoArabic: { fontFamily: 'var(--font-arabic)', fontSize: 31, color: 'var(--teal-800)' },
  kicker: { fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-700)', fontWeight: 700 },
  appName: { fontFamily: 'var(--font-arabic)', fontSize: 48, lineHeight: 1, color: 'var(--ink)', fontWeight: 700, marginTop: 4 },
  tagline: { fontSize: 14, lineHeight: 1.6, color: 'var(--ink-60)', marginTop: 8 },
  card: { padding: '1.25rem' },
  cardHeader: { marginBottom: 14 },
  cardTitle: { fontSize: 16, fontWeight: 800, color: 'var(--ink)' },
  cardSub: { display: 'block', fontSize: 12, color: 'var(--ink-60)', marginTop: 4 },
  roles: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 },
  roleBtn: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    width: '100%',
    border: '1px solid rgba(16,34,31,0.07)',
    borderRadius: 24,
    minHeight: 162,
    padding: '1rem',
    background: 'rgba(255,255,255,0.72)',
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow: '0 10px 24px rgba(15,45,28,0.05)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease'
  },
  roleIcon: {
    width: 46,
    height: 46,
    borderRadius: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--teal-50), var(--gold-50))',
    color: 'var(--teal-800)',
    flexShrink: 0
  },
  roleCopy: { flex: 1, display: 'flex', flexDirection: 'column', gap: 5 },
  roleLabel: { fontSize: 14, fontWeight: 900, color: 'var(--ink)', lineHeight: 1.2 },
  roleDesc: { fontSize: 11.5, color: 'var(--ink-60)', lineHeight: 1.45 },
  roleArrow: {
    position: 'absolute',
    right: 14,
    bottom: 12,
    width: 26,
    height: 26,
    borderRadius: 13,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--teal-700)',
    background: 'rgba(22,155,125,0.08)'
  },
  back: {
    border: 'none',
    background: 'transparent',
    color: 'var(--teal-800)',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    marginBottom: 14
  },
  selectedRole: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: '10px 12px',
    borderRadius: 20,
    background: 'rgba(22,155,125,0.09)',
    color: 'var(--teal-900)',
    fontSize: 13,
    fontWeight: 800,
    marginBottom: 14
  },
  selectedIcon: { color: 'var(--teal-800)' },
  toggle: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: 4,
    gap: 4,
    borderRadius: 22,
    background: 'rgba(16,34,31,0.06)',
    marginBottom: 14
  },
  toggleBtn: {
    border: 'none',
    borderRadius: 18,
    padding: '10px 8px',
    background: 'transparent',
    color: 'var(--ink-60)',
    fontSize: 13,
    fontWeight: 800,
    cursor: 'pointer',
    transition: 'background 0.25s ease, color 0.25s ease'
  },
  toggleActive: {
    background: 'rgba(255,255,255,0.92)',
    color: 'var(--teal-900)',
    boxShadow: '0 8px 18px rgba(15,45,28,0.08)'
  },
  input: { padding: '13px 15px', marginBottom: 10, fontSize: 14 },
  submitBtn: { width: '100%', marginTop: 4 },
  disclaimer: { marginTop: 13, fontSize: 11, color: 'var(--ink-60)', lineHeight: 1.55, textAlign: 'center' }
}
