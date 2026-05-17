import { useState } from 'react'
import { AnimatedSection, FloatingActionButton, GlassCard, GradientButton, Page, PageHeader, SoftModal } from '../ui/Primitives'
import { ThemedIcon, eventIcons, profileIcons } from '../ui/ThemedIcon'
import { useApp } from '../../hooks/useApp'
import { EVENTS, EVENT_ICONS as EVENT_STYLES, localizedField } from '../../data/mockData'
import { t } from '../../data/translations'

export default function EventsScreen() {
  const { locale } = useApp()
  const [joined, setJoined] = useState({})
  const [showCreate, setShowCreate] = useState(false)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? EVENTS : EVENTS.filter(e => e.type === filter)
  const toggleJoin = (id) => setJoined(j => ({ ...j, [id]: !j[id] }))

  const filters = [
    { id: 'all', label: t(locale, 'events.all') },
    { id: 'salah', label: t(locale, 'events.salah') },
    { id: 'halaqa', label: t(locale, 'events.halaqa') },
    { id: 'volunteer', label: t(locale, 'events.volunteer') },
  ]

  return (
    <Page variant="community">
      <PageHeader
        eyebrow={t(locale, 'events.eyebrow')}
        title={t(locale, 'events.title')}
        subtitle={t(locale, 'events.sub')}
        action={<FloatingActionButton onClick={() => setShowCreate(true)}>+</FloatingActionButton>}
      />

      <div style={styles.filtersWrap}>
        {filters.map(f => (
          <button
            key={f.id}
            style={{ ...styles.filterTab, ...(filter === f.id ? styles.filterActive : {}) }}
            onClick={() => setFilter(f.id)}
            className="soft-interaction"
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={styles.scroll}>
        {filtered.map((event, index) => {
          const info = EVENT_STYLES[event.type]
          const isJoined = joined[event.id]
          const volunteer = event.type === 'volunteer'
          return (
            <AnimatedSection key={event.id} delay={index * 70}>
              <GlassCard style={{ ...styles.card, ...(volunteer ? styles.volunteerCard : {}) }}>
                  {event.womenOnly && (
                    <div style={{ ...styles.womenBadge, ...(locale === 'ar' ? { left: 10, right: 'auto' } : { right: 10, left: 'auto' }) }}>{t(locale, 'events.sistersOnly')}</div>
                  )}
                <div style={styles.cardTop}>
                  <div style={{ ...styles.eventIcon, background: info.bg, color: info.color }}>
                    <ThemedIcon icon={eventIcons[event.type]} size={22} strokeWidth={2.15} />
                  </div>
                  <div style={{ ...styles.cardInfo, ...(event.womenOnly ? (locale === 'ar' ? { paddingLeft: 92, paddingRight: 0 } : { paddingRight: 92, paddingLeft: 0 }) : {}) }}>
                    <div style={styles.cardTitle}>{localizedField(event, 'title', locale)}</div>
                    <div style={styles.metaGrid}>
                      <span style={styles.metaPill}><ThemedIcon icon={profileIcons.time} size={13} /> {localizedField(event, 'time', locale)}</span>
                      <span style={styles.metaPill}><ThemedIcon icon={profileIcons.location} size={13} /> {localizedField(event, 'location', locale)}</span>
                    </div>
                  </div>
                </div>

                <p style={styles.cardDesc}>{localizedField(event, 'description', locale)}</p>

                <div style={styles.cardFooter}>
                  <div style={styles.attendees}>
                    <div style={styles.attendeesDots}>
                      {[...Array(Math.min(event.attendees, 5))].map((_, i) => (
                        <div key={i} style={{ ...styles.dot, marginLeft: i === 0 ? 0 : -6 }} />
                      ))}
                    </div>
                    <span style={styles.attendeesCount}>
                      {event.attendees + (isJoined ? 1 : 0)} {t(locale, 'events.attending')}
                    </span>
                  </div>
                  <button
                    style={{ ...styles.joinBtn, ...(isJoined ? styles.joinBtnActive : {}) }}
                    onClick={() => toggleJoin(event.id)}
                    className="soft-interaction"
                  >
                    {isJoined ? t(locale, 'events.joined') : t(locale, 'events.join')}
                  </button>
                </div>
              </GlassCard>
            </AnimatedSection>
          )
        })}

        <div style={{ height: 118 }} />
      </div>

      {showCreate && (
        <SoftModal onClose={() => setShowCreate(false)}>
          <h3 style={styles.modalTitle}>{t(locale, 'events.modalTitle')}</h3>
          <select className="premium-input" style={styles.formField}>
            <option>{t(locale, 'events.selectPlaceholder')}</option>
            <option>{t(locale, 'events.optionSalah')}</option>
            <option>{t(locale, 'events.optionHalaqa')}</option>
            <option>{t(locale, 'events.optionVolunteer')}</option>
            <option>{t(locale, 'events.optionEid')}</option>
            <option>{t(locale, 'events.optionSisters')}</option>
          </select>
          <input className="premium-input" style={styles.formField} placeholder={t(locale, 'events.eventTitle')} />
          <input className="premium-input" style={styles.formField} placeholder={t(locale, 'events.location')} />
          <input className="premium-input" style={styles.formField} type="datetime-local" />
          <textarea className="premium-input" style={{ ...styles.formField, minHeight: 96 }} rows={3} placeholder={t(locale, 'events.details')} />
          <GradientButton style={{ width: '100%' }}>{t(locale, 'events.post')}</GradientButton>
        </SoftModal>
      )}
    </Page>
  )
}

const styles = {
  filtersWrap: { position: 'relative', zIndex: 1, display: 'flex', gap: 8, padding: '0 1.25rem 0.85rem', overflowX: 'auto', flexShrink: 0 },
  filterTab: { border: '1px solid rgba(16,34,31,0.07)', borderRadius: 999, background: 'rgba(255,255,255,0.64)', color: 'var(--ink-60)', padding: '9px 15px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.25s ease' },
  filterActive: { background: 'linear-gradient(135deg, var(--teal-500), var(--green-700))', color: 'var(--white)', boxShadow: '0 10px 22px rgba(22,155,125,0.2)' },
  scroll: { position: 'relative', zIndex: 1, flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 1.25rem' },
  card: { padding: '1rem', marginBottom: 12, background: 'rgba(255,255,255,0.74)' },
  volunteerCard: { background: 'linear-gradient(145deg, rgba(255,253,240,0.86), rgba(239,250,245,0.78))' },
  womenBadge: { position: 'absolute', top: 14, right: 14, fontSize: 11, fontWeight: 800, color: 'var(--gold-700)', background: 'rgba(212,160,23,0.13)', padding: '5px 10px', borderRadius: 999 },
  cardTop: { display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 },
  eventIcon: { width: 48, height: 48, borderRadius: 21, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21, flexShrink: 0, boxShadow: '0 10px 20px rgba(15,45,28,0.06)' },
  cardInfo: { flex: 1, minWidth: 0 },
  cardTitle: { fontSize: 15, fontWeight: 900, color: 'var(--ink)', lineHeight: 1.35, marginBottom: 8 },
  metaGrid: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  metaPill: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 9px', borderRadius: 999, background: 'rgba(16,34,31,0.05)', color: 'var(--ink-60)', fontSize: 11, lineHeight: 1.25 },
  cardDesc: { fontSize: 13, color: 'var(--ink-60)', lineHeight: 1.55, marginBottom: 14 },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  attendees: { display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 },
  attendeesDots: { display: 'flex', alignItems: 'center' },
  dot: { width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal-400), var(--gold-400))', border: '2px solid rgba(255,255,255,0.8)' },
  attendeesCount: { fontSize: 12, color: 'var(--ink-60)' },
  joinBtn: { border: '1px solid rgba(22,155,125,0.18)', borderRadius: 20, background: 'rgba(239,250,245,0.9)', color: 'var(--teal-800)', padding: '10px 14px', fontSize: 12, fontWeight: 900, cursor: 'pointer', transition: 'all 0.25s ease' },
  joinBtnActive: { background: 'linear-gradient(135deg, var(--teal-500), var(--green-700))', color: 'var(--white)', boxShadow: '0 10px 20px rgba(22,155,125,0.18)' },
  modalTitle: { fontSize: 20, color: 'var(--ink)', marginBottom: 16, paddingInlineEnd: 48 },
  formField: { display: 'block', padding: '13px 15px', marginBottom: 10, fontSize: 14, resize: 'none' }
}
