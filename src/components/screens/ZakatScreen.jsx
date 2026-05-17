import { useState } from 'react'
import { AnimatedSection, GlassCard, GradientButton, Page, PageHeader } from '../ui/Primitives'
import { ThemedIcon, moneyIcons, needIcons, profileIcons } from '../ui/ThemedIcon'
import { useApp } from '../../hooks/useApp'
import { NEEDS, NEED_ICONS, localizedField, formatMoney } from '../../data/mockData'
import { t } from '../../data/translations'

const NISAB_MAD = 5800

export default function ZakatScreen() {
  const { locale } = useApp()
  const [assets, setAssets] = useState({ cash: '', gold: '', savings: '', business: '', investments: '' })
  const [calculated, setCalculated] = useState(false)
  const [distributions, setDistributions] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const total = Object.values(assets).reduce((sum, v) => sum + (parseFloat(v) || 0), 0)
  const zakatDue = total >= NISAB_MAD ? Math.round(total * 0.025) : 0
  const distributed = Object.values(distributions).reduce((sum, v) => sum + (parseFloat(v) || 0), 0)
  const remaining = zakatDue - distributed
  const progress = zakatDue ? Math.min((distributed / zakatDue) * 100, 100) : 0

  const zakatableNeeds = NEEDS.filter(n => ['food', 'orphan', 'medical', 'student', 'shelter', 'funeral'].includes(n.type))
  const updateDist = (id, val) => setDistributions(d => ({ ...d, [id]: parseFloat(val) || 0 }))

  const fields = [
    { key: 'cash', label: t(locale, 'zakat.fields.cash') },
    { key: 'savings', label: t(locale, 'zakat.fields.savings') },
    { key: 'gold', label: t(locale, 'zakat.fields.gold') },
    { key: 'business', label: t(locale, 'zakat.fields.business') },
    { key: 'investments', label: t(locale, 'zakat.fields.investments') },
  ]

  return (
    <Page variant="gold">
      <PageHeader
        eyebrow={t(locale, 'zakat.eyebrow')}
        title={t(locale, 'zakat.title')}
        subtitle={t(locale, 'zakat.sub')}
      />

      <div style={styles.scroll}>
        <AnimatedSection>
          <GlassCard style={styles.nisabNote}>
            <span style={styles.nisabIcon}>
              <ThemedIcon icon={profileIcons.info} size={16} strokeWidth={2.2} />
            </span>
            <span style={styles.nisabText}>{t(locale, 'zakat.nisab', { amount: NISAB_MAD.toLocaleString(locale === 'ar' ? 'ar-MA' : 'en-US') })}</span>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={80}>
          <GlassCard style={styles.calculator}>
            <div style={styles.sectionHead}>
              <div>
                <p style={styles.sectionKicker}>{t(locale, 'zakat.assets')}</p>
                <h3 style={styles.sectionTitle}>{t(locale, 'zakat.clarityTitle')}</h3>
              </div>
              <div style={styles.ratePill}>2.5%</div>
            </div>

            <div style={styles.fieldGrid}>
              {fields.map(f => (
                <label key={f.key} style={styles.inputRow}>
                  <span style={styles.inputIcon}>
                    <ThemedIcon icon={moneyIcons[f.key]} size={18} strokeWidth={2.1} />
                  </span>
                  <span style={styles.inputLabel}>{f.label}</span>
                  <input
                    className="premium-input"
                    style={styles.input}
                    type="number"
                    placeholder="0"
                    value={assets[f.key]}
                    onChange={e => setAssets(a => ({ ...a, [f.key]: e.target.value }))}
                  />
                </label>
              ))}
            </div>

            <div style={styles.summary}>
              <div style={styles.summaryRow}>
                <span>{t(locale, 'zakat.totalAssets')}</span>
                <strong>{formatMoney(total, locale)}</strong>
              </div>
              <div style={styles.summaryRow}>
                <span>{t(locale, 'zakat.nisabThreshold')}</span>
                <strong style={{ color: total >= NISAB_MAD ? 'var(--teal-700)' : 'var(--rose-600)' }}>
                  {total >= NISAB_MAD ? t(locale, 'zakat.aboveNisab') : t(locale, 'zakat.belowNisab')}
                </strong>
              </div>
              <div style={styles.duePanel}>
                <span>{t(locale, 'zakat.zakatDue')}</span>
                <strong>{formatMoney(zakatDue, locale)}</strong>
              </div>
            </div>

            {total >= NISAB_MAD ? (
              <GradientButton style={styles.fullButton} onClick={() => setCalculated(true)}>
                {t(locale, 'zakat.distribute')}
              </GradientButton>
            ) : (
              <p style={styles.noZakat}>{total > 0 ? t(locale, 'zakat.noZakat') : t(locale, 'zakat.start')}</p>
            )}
          </GlassCard>
        </AnimatedSection>

        {calculated && zakatDue > 0 && !submitted && (
          <AnimatedSection delay={120}>
            <GlassCard style={styles.distribution}>
              <div style={styles.sectionHead}>
                <div>
                  <p style={styles.sectionKicker}>{t(locale, 'zakat.distributeTitle')}</p>
                  <h3 style={styles.sectionTitle}>{t(locale, 'zakat.sendTitle')}</h3>
                </div>
              </div>

              <div style={styles.progressCard}>
                <div style={styles.remainingRow}>
                  <span>{t(locale, 'zakat.remaining')}</span>
                  <strong style={{ color: remaining < 0 ? 'var(--rose-600)' : 'var(--teal-700)' }}>
                    {formatMoney(remaining, locale)}
                  </strong>
                </div>
                <div style={styles.progressTrack}>
                  <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                </div>
              </div>

              {zakatableNeeds.map((need, index) => {
                const info = NEED_ICONS[need.type]
                return (
                  <div key={need.id} style={styles.distRow} className="animate-fadeUp">
                    <div style={styles.distInfo}>
                      <span style={{ ...styles.distIcon, background: info.bg, color: info.color }}>
                        <ThemedIcon icon={needIcons[need.type]} size={19} strokeWidth={2.1} />
                      </span>
                      <div style={styles.distCopy}>
                        <div style={styles.distName}>{localizedField(need, 'title', locale)}</div>
                        <div style={styles.distOrg}>{localizedField(need, 'org', locale)} · {localizedField(need, 'distance', locale)}</div>
                      </div>
                      {need.verified && <span style={styles.verified}>✓</span>}
                    </div>
                    <input
                      className="premium-input"
                      style={styles.distInput}
                      type="number"
                      placeholder={t(locale, 'zakat.placeholderAmount')}
                      value={distributions[need.id] || ''}
                      onChange={e => updateDist(need.id, e.target.value)}
                    />
                    <span style={{ animationDelay: `${index * 55}ms` }} />
                  </div>
                )
              })}

              <div style={styles.totalAssigned}>
                <span>{t(locale, 'zakat.totalAssigned')}</span>
                <strong>{formatMoney(distributed, locale)}</strong>
              </div>

              <GradientButton
                style={styles.fullButton}
                disabled={distributed === 0}
                onClick={() => distributed > 0 && setSubmitted(true)}
              >
                {t(locale, 'zakat.confirm')}
              </GradientButton>
            </GlassCard>
          </AnimatedSection>
        )}

        {submitted && (
          <AnimatedSection>
            <GlassCard style={styles.confirmation}>
              <div style={styles.confirmIcon}>
                <ThemedIcon icon={profileIcons.supported} size={34} strokeWidth={2} />
              </div>
              <h3 style={styles.confirmTitle}>{t(locale, 'zakat.confirmationTitle')}</h3>
              <p style={styles.confirmText}>{t(locale, 'zakat.confirmationText', { amount: distributed.toLocaleString(locale === 'ar' ? 'ar-MA' : 'en-US') })}</p>
              <p style={styles.confirmSub}>{t(locale, 'zakat.confirmationSub')}</p>
            </GlassCard>
          </AnimatedSection>
        )}

        <div style={{ height: 118 }} />
      </div>
    </Page>
  )
}

const styles = {
  scroll: { position: 'relative', zIndex: 1, flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 1.25rem' },
  nisabNote: { display: 'flex', gap: 12, alignItems: 'flex-start', padding: '1rem', marginBottom: 14, background: 'rgba(255,253,240,0.82)' },
  nisabIcon: { color: 'var(--teal-700)', flexShrink: 0, marginTop: 1 },
  nisabText: { fontSize: 12, color: 'var(--ink-60)', lineHeight: 1.55 },
  calculator: { padding: '1.2rem', marginBottom: 14 },
  sectionHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 },
  sectionKicker: { fontSize: 10, fontWeight: 800, color: 'var(--teal-700)', letterSpacing: '0.1em', textTransform: 'uppercase' },
  sectionTitle: { fontSize: 17, color: 'var(--ink)', marginTop: 4 },
  ratePill: { padding: '8px 11px', borderRadius: 999, background: 'rgba(212,160,23,0.14)', color: 'var(--gold-700)', fontSize: 12, fontWeight: 800 },
  fieldGrid: { display: 'flex', flexDirection: 'column', gap: 10 },
  inputRow: { display: 'grid', gridTemplateColumns: '34px 1fr 104px', gap: 10, alignItems: 'center', padding: '10px', borderRadius: 22, background: 'rgba(255,255,255,0.58)' },
  inputIcon: { width: 34, height: 34, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(22,155,125,0.08)' },
  inputLabel: { fontSize: 13, color: 'var(--ink-80)', fontWeight: 700 },
  input: { padding: '10px 12px', textAlign: 'end', fontSize: 13, borderRadius: 16 },
  summary: { marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(16,34,31,0.07)' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', gap: 12, color: 'var(--ink-60)', fontSize: 13, padding: '5px 0' },
  duePanel: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, padding: '14px', borderRadius: 22, background: 'linear-gradient(135deg, rgba(22,155,125,0.12), rgba(212,160,23,0.11))', color: 'var(--teal-900)', fontSize: 13 },
  noZakat: { textAlign: 'center', color: 'var(--ink-60)', fontSize: 13, marginTop: 14 },
  fullButton: { width: '100%', marginTop: 14 },
  distribution: { padding: '1.2rem', marginBottom: 14 },
  progressCard: { padding: 12, borderRadius: 22, background: 'rgba(239,250,245,0.82)', marginBottom: 12 },
  remainingRow: { display: 'flex', justifyContent: 'space-between', color: 'var(--ink-60)', fontSize: 13, marginBottom: 10 },
  progressTrack: { height: 7, borderRadius: 999, overflow: 'hidden', background: 'rgba(16,34,31,0.07)' },
  progressFill: { height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, var(--teal-500), var(--gold-400))', transition: 'width 0.35s ease' },
  distRow: { padding: 12, borderRadius: 24, background: 'rgba(255,255,255,0.62)', marginBottom: 10, border: '1px solid rgba(255,255,255,0.68)' },
  distInfo: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 },
  distIcon: { width: 38, height: 38, borderRadius: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 },
  distCopy: { flex: 1, minWidth: 0 },
  distName: { fontSize: 13, color: 'var(--ink)', fontWeight: 800 },
  distOrg: { fontSize: 11, color: 'var(--ink-60)', marginTop: 2 },
  verified: { width: 22, height: 22, borderRadius: 11, background: 'rgba(22,155,125,0.14)', color: 'var(--teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 },
  distInput: { padding: '11px 12px', textAlign: 'end', fontSize: 13 },
  totalAssigned: { display: 'flex', justifyContent: 'space-between', padding: 14, borderRadius: 22, background: 'rgba(16,34,31,0.04)', color: 'var(--ink-60)', fontSize: 13, marginTop: 12 },
  confirmation: { padding: '2rem 1.4rem', textAlign: 'center' },
  confirmIcon: { width: 64, height: 64, borderRadius: 28, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(22,155,125,0.1)', color: 'var(--teal-800)' },
  confirmTitle: { color: 'var(--teal-900)', fontSize: 21, marginBottom: 8 },
  confirmText: { color: 'var(--ink)', lineHeight: 1.6, fontSize: 14 },
  confirmSub: { color: 'var(--ink-60)', lineHeight: 1.6, fontSize: 12, marginTop: 14 }
}
