import { useState } from 'react'
import { AnimatedSection, GlassCard, Page } from '../ui/Primitives'
import { ThemedIcon, profileIcons, needIcons, eventIcons } from '../ui/ThemedIcon'
import { useApp } from '../../hooks/useApp'
import { t } from '../../data/translations'
import { IMPACT_STORIES, DEFAULT_CHECKLIST, WEEKLY_REPORT, localizedField, formatMoney } from '../../data/mockData'

// ── IMPACT TREE (Sadaqah Jariyah) ──────────────────────────────────
function ImpactTree() {
  const { locale } = useApp()
  const [expanded, setExpanded] = useState(null)
  
  const getImpactIcon = (type) => {
    const icons = { student: needIcons.student, food: needIcons.food, blood: needIcons.blood }
    return icons[type] || needIcons.supported
  }

  const getUpdateIcon = (type) => {
    return eventIcons[type] || profileIcons.supported
  }
  
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={styles.sectionHeader}>
        <div>
          <h3 style={styles.sectionTitle}><ThemedIcon icon={profileIcons.gatherings} size={16} /> {t(locale, 'profile.impactTitle')}</h3>
          <p style={styles.sectionSub}>{t(locale, 'profile.impactSub')}</p>
        </div>
        <div style={styles.totalBadge}>
          {t(locale, 'profile.livesTouched', { count: IMPACT_STORIES.reduce((a,s)=>a+s.ripples,0) })}
        </div>
      </div>

      {IMPACT_STORIES.map((story, idx) => (
        <AnimatedSection key={story.id} delay={idx * 50}>
          <GlassCard style={styles.storyCard}>
            <div style={styles.storyTop} onClick={() => setExpanded(expanded === story.id ? null : story.id)}>
              <div style={{ ...styles.storyIcon, background: story.status === 'resolved' ? 'rgba(45,134,83,0.1)' : 'rgba(184,130,13,0.1)' }}>
                <ThemedIcon icon={getImpactIcon(story.type)} size={20} strokeWidth={2.2} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.storyTitle}>{localizedField(story, 'title', locale)}</div>
                <div style={styles.storyMeta}>
                  {story.amount > 0 && <span style={styles.metaChip}><ThemedIcon icon={needIcons.medical} size={10}/> {formatMoney(story.amount, locale)}</span>}
                  {story.isBlood && <span style={{ ...styles.metaChip, background: '#FEF2F4', color: '#9B2335' }}><ThemedIcon icon={needIcons.blood} size={10}/> {t(locale, 'impact.donor')}</span>}
                  <span style={{ ...styles.metaChip, background: story.status === 'resolved' ? 'rgba(45,134,83,0.1)' : 'rgba(184,130,13,0.1)', color: story.status === 'resolved' ? '#1A4A2E' : '#854F0B' }}>
                    {t(locale, `impact.${story.status}`)}
                  </span>
                </div>
              </div>
              <span style={{ color: 'var(--ink-30)', fontSize: 24, transition: 'transform 0.3s ease', transform: expanded === story.id ? 'rotate(90deg)' : 'none' }}>›</span>
            </div>

            {expanded === story.id && (
              <div style={styles.timeline} className="animate-slideUp">
                {story.updates.map((u, i) => (
                  <div key={i} style={styles.timelineRow}>
                    <div style={styles.timelineLine}>
                      <div style={{ ...styles.timelineDot, background: u.done ? 'var(--teal-500)' : 'var(--ink-20)' }} />
                      {i < story.updates.length - 1 && <div style={styles.timelineConnector} />}
                    </div>
                    <div style={{ ...styles.timelineContent, opacity: u.done ? 1 : 0.5 }}>
                      <div style={styles.timelineDate}>{localizedField(u, 'date', locale)}</div>
                      <div style={styles.timelineText}>{localizedField(u, 'text', locale)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </AnimatedSection>
      ))}
    </div>
  )
}

// ── DAILY CHECKLIST ────────────────────────────────────────────────
function DailyChecklist() {
  const { locale } = useApp()
  const [checked, setChecked] = useState({})
  const [customItems, setCustomItems] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [newItem, setNewItem] = useState('')
  const [showReport, setShowReport] = useState(false)

  const allItems = [...DEFAULT_CHECKLIST, ...customItems]
  const doneCount = allItems.filter(i => checked[i.id]).length
  const totalCount = allItems.length
  const pct = Math.round((doneCount / totalCount) * 100) || 0

  const toggle = (id) => setChecked(c => ({ ...c, [id]: !c[id] }))

  const addCustom = () => {
    if (!newItem.trim()) return
    setCustomItems(prev => [...prev, { id: `custom_${Date.now()}`, label: newItem.trim(), category: 'custom', icon: profileIcons.supported }])
    setNewItem('')
    setShowAdd(false)
  }

  const categories = ['salah', 'ibadah', 'giving', 'sunnah', 'custom']
  const getCategoryIcon = (cat) => {
    const icons = { salah: eventIcons.salah, ibadah: eventIcons.halaqa, giving: eventIcons.volunteer, sunnah: eventIcons.eid, custom: profileIcons.supported }
    return icons[cat]
  }

  const getItemIcon = (item) => {
    if (item.category === 'custom') return profileIcons.supported
    const categoryIcon = getCategoryIcon(item.category)
    return categoryIcon
  }

  const getCategoryLabel = (cat) => t(locale, `categories.${cat}`)

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <GlassCard style={styles.progressCard} onClick={() => setShowReport(false)}>
        <div style={styles.cardHeader}>
          <div>
            <div style={styles.cardTitle}>{t(locale, 'profile.checklist.title')}</div>
            <div style={styles.cardSub}>{new Date().toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
          </div>
          <div style={styles.ring}>
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(22,155,125,0.1)" strokeWidth="5"/>
              <circle cx="28" cy="28" r="24" fill="none" stroke="var(--teal-500)" strokeWidth="5"
                strokeDasharray={`${(pct/100)*150} 150`} strokeLinecap="round" transform="rotate(-90 28 28)"
                style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.22, 1, 0.36, 1)' }}
              />
            </svg>
            <span style={styles.ringText}>{pct}%</span>
          </div>
        </div>
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${pct}%` }} />
        </div>
      </GlassCard>

      {categories.map(cat => {
        const items = allItems.filter(i => i.category === cat)
        if (!items.length) return null
        return (
          <div key={cat} style={styles.catSection}>
            {items.map(item => (
              <button 
                key={item.id} 
                style={{ ...styles.checkItem, ...(checked[item.id] ? styles.checkItemDone : {}), ...(locale === 'ar' ? { flexDirection: 'row-reverse' } : {}) }} 
                onClick={() => toggle(item.id)}
                className="soft-interaction"
              >
                <div style={{ ...styles.checkbox, ...(checked[item.id] ? styles.checkboxDone : {}) }}>
                  {checked[item.id] && <ThemedIcon icon={profileIcons.trusted} size={12} strokeWidth={3} />}
                </div>
                <span style={styles.itemIcon}>
                  <ThemedIcon icon={getItemIcon(item)} size={16} strokeWidth={2} />
                </span>
                <span style={{ ...styles.itemLabel, textDecoration: checked[item.id] ? 'line-through' : 'none', opacity: checked[item.id] ? 0.5 : 1 }}>
                  {item.category === 'custom' ? item.label : t(locale, `checklist.${item.id}`)}
                </span>
              </button>
            ))}
          </div>
        )
      })}

      {showAdd ? (
        <div style={styles.addRow} className="animate-fadeIn">
          <input style={styles.addInput} placeholder={t(locale, 'profile.checklist.addGoalPlaceholder')} value={newItem} onChange={e=>setNewItem(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addCustom()} autoFocus />
          <button style={styles.addConfirm} onClick={addCustom}><ThemedIcon icon={profileIcons.trusted} size={16} /></button>
          <button style={styles.addCancel} onClick={() => setShowAdd(false)}>✕</button>
        </div>
      ) : (
        <button style={styles.addBtn} onClick={() => setShowAdd(true)} className="soft-interaction">
          <ThemedIcon icon={profileIcons.gatherings} size={16} /> {t(locale, 'profile.checklist.addGoalBtn')}
        </button>
      )}

      <button style={styles.reportBtn} onClick={() => setShowReport(true)} className="hover-lift">
        <ThemedIcon icon={profileIcons.notifications} size={16} /> {t(locale, 'profile.checklist.viewInsights')}
      </button>

      {/* Weekly Report Modal */}
      {showReport && (
        <div style={styles.modalOverlay} onClick={() => setShowReport(false)}>
          <div style={styles.reportModal} onClick={e => e.stopPropagation()} className="animate-slideUp">
            <button style={styles.closeBtn} onClick={() => setShowReport(false)}>✕</button>
            <h3 style={styles.modalTitle}>{t(locale, 'profile.report.title')}</h3>
            <p style={styles.modalSub}>{localizedField(WEEKLY_REPORT, 'week', locale)}</p>

            {Object.values(WEEKLY_REPORT.scores).map(score => {
              const p = Math.round((score.done/score.total)*100)
              return (
                <div key={score.label} style={styles.scoreRow}>
                  <div style={styles.scoreLabel}><ThemedIcon icon={getCategoryIcon(score.label.toLowerCase())} size={16} /></div>
                  <div style={styles.scoreTrack}>
                    <div style={{ ...styles.scoreFill, width: `${p}%`, background: score.color }} />
                  </div>
                  <div style={styles.scorePct}>{p}%</div>
                </div>
              )
            })}
            <div style={styles.insightBox}>
              <div style={styles.insightItem}>
                <ThemedIcon icon={profileIcons.supported} size={14} style={{ display: 'inline-block', marginInlineEnd: 6 }} />
                {localizedField(WEEKLY_REPORT, 'topStreak', locale)}
              </div>
              <div style={styles.insightItem}>
                <ThemedIcon icon={profileIcons.notifications} size={14} style={{ display: 'inline-block', marginInlineEnd: 6 }} />
                {localizedField(WEEKLY_REPORT, 'improvement', locale)}
              </div>
              <div style={styles.insightItem}>
                <ThemedIcon icon={profileIcons.supported} size={14} style={{ display: 'inline-block', marginInlineEnd: 6 }} />
                {localizedField(WEEKLY_REPORT, 'nextGoal', locale)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── BADGES ─────────────────────────────────────────────────────────
const getBadges = (locale) => [
  { id:'donor',  icon: needIcons.blood, label: t(locale, 'badges.donor'),    earned:true },
  { id:'helper', icon: eventIcons.volunteer, label: t(locale, 'badges.helper'),  earned:true },
  { id:'shield', icon: profileIcons.trusted, label: t(locale, 'badges.shield'), earned:false },
  { id:'waqf',   icon: profileIcons.time, label: t(locale, 'badges.waqf'),       earned:false },
  { id:'zakat',  icon: profileIcons.supported, label: t(locale, 'badges.zakat'),     earned:false },
  { id:'salah',  icon: eventIcons.salah, label: t(locale, 'badges.salah_regular'), earned:false },
]

// ── MAIN SCREEN ────────────────────────────────────────────────────
export default function ProfileScreen() {
  const { user, setScreen, locale } = useApp()
  const [activeTab, setActiveTab] = useState('checklist')

  const initials = user?.name ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'MS'
  const roleLabel = user?.role?.id ? t(locale, `roles.${user.role.id}.${locale === 'ar' ? 'ar' : 'label'}`) : (locale === 'ar' ? 'فرد' : 'Individual')

  const tabs = [
    { id: 'checklist', icon: profileIcons.notifications, label: t(locale, 'profile.tabs.daily') },
    { id: 'impact',    icon: profileIcons.supported, label: t(locale, 'profile.tabs.impact') },
    { id: 'badges',    icon: profileIcons.masjid, label: t(locale, 'profile.tabs.badges') },
  ]

  const STATS = [
    { label: t(locale, 'profile.stats.supported'), value: '3', icon: profileIcons.supported },
    { label: t(locale, 'profile.stats.answered'), value: '5', icon: profileIcons.needs },
    { label: t(locale, 'profile.stats.events'), value: '2', icon: profileIcons.gatherings },
  ]

  const BADGES = getBadges(locale)

  return (
    <Page variant="emerald">
      <div style={styles.scroll}>
        
        {/* TOP HEADER: Merged Mosque SVG & Avatar */}
        <AnimatedSection>
          <GlassCard style={styles.headerCard}>
            <div style={{ ...styles.headerGlow, ...(locale === 'ar' ? { left: -60, right: 'auto' } : { right: -60, left: 'auto' }) }} />
            <svg viewBox="0 0 600 520" style={{ ...styles.mosque, ...(locale === 'ar' ? styles.mosqueRTL : styles.mosqueLTR) }} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g fill="currentColor" fillRule="nonzero" transform="translate(20,20)">
                <ellipse cx="260" cy="360" rx="260" ry="80" fill="black" opacity="0.03" />
                <path d="M120 300 C140 220 220 180 300 200 C380 180 460 220 480 300 L480 360 L120 360 Z" fill="black" opacity="0.06" />
                <circle cx="300" cy="160" r="72" fill="black" opacity="0.045" />
                <rect x="240" y="180" width="120" height="100" rx="30" fill="black" opacity="0.05" />
                <path d="M60 260 C90 200 160 160 240 160" stroke="black" strokeWidth="6" opacity="0.04" fill="none" />
              </g>
            </svg>
            
            <div style={styles.avatarWrap}>
              <div style={styles.avatar}><span>{initials}</span></div>
              <div style={styles.trustRing} />
            </div>
            
            <div style={styles.identity}>
              <h1 style={styles.name}>{user?.name || (locale === 'ar' ? 'أخ/أخت مسلم' : 'Muslim Sister/Brother')}</h1>
              <span style={styles.roleBadge}><ThemedIcon icon={profileIcons.masjid} size={12} /> {roleLabel}</span>
            </div>

            <div style={styles.impactGrid}>
              {STATS.map(item => (
                <div key={item.label} style={styles.impactStat}>
                  <span style={styles.impactIcon}><ThemedIcon icon={item.icon} size={18} strokeWidth={2.4} /></span>
                  <span style={styles.impactValue}>{item.value}</span>
                  <span style={styles.impactLabel}>{item.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </AnimatedSection>

        {/* TABS CONTROL */}
        <AnimatedSection delay={100}>
          <div style={styles.tabContainer}>
            {tabs.map(tab => (
              <button key={tab.id} style={{ ...styles.tabBtn, ...(activeTab === tab.id ? styles.tabActive : {}) }} onClick={() => setActiveTab(tab.id)}>
                <span style={styles.tabIcon}><ThemedIcon icon={tab.icon} size={16} strokeWidth={2} /></span> {tab.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* DYNAMIC CONTENT */}
        <AnimatedSection delay={150}>
          {activeTab === 'checklist' && <DailyChecklist />}
          {activeTab === 'impact' && <ImpactTree />}
          {activeTab === 'badges' && (
            <div style={styles.badgesGrid}>
              {BADGES.map((b, i) => (
                <GlassCard key={b.id} style={{ ...styles.badgeCard, opacity: b.earned ? 1 : 0.5, animationDelay: `${i*50}ms` }} className="animate-scaleIn">
                  <span style={{ fontSize: 24, marginBottom: 8, display: 'flex', justifyContent: 'center' }}><ThemedIcon icon={b.icon} size={24} strokeWidth={2} /></span>
                  <span style={styles.badgeLabel}>{b.label}</span>
                  {b.earned && <div style={styles.earnedCheck}><ThemedIcon icon={profileIcons.trusted} size={10} strokeWidth={3} /></div>}
                </GlassCard>
              ))}
              <p style={styles.badgeNote}>{t(locale, 'profile.badgeNote')}</p>
            </div>
          )}
        </AnimatedSection>

        {/* SETTINGS / SIGNOUT */}
        <AnimatedSection delay={200}>
          <GlassCard style={styles.settingsCard}>
            <button style={{ ...styles.settingsRow, borderBottom: '1px solid rgba(16,34,31,0.06)' }} className="soft-interaction" onClick={() => setScreen('login')}>
              <span style={styles.settingsIcon}><ThemedIcon icon={profileIcons.language} size={18} /></span>
              <span style={styles.settingsLabel}>{t(locale, 'profile.settingsTitle')}</span>
              <span style={styles.settingsArrow}>›</span>
            </button>
            <button style={styles.settingsRow} className="soft-interaction" onClick={() => setScreen('login')}>
              <span style={{...styles.settingsIcon, background: 'rgba(197,48,48,0.1)', color: 'var(--red-600)'}}><ThemedIcon icon={profileIcons.location} size={18} /></span>
              <span style={{...styles.settingsLabel, color: 'var(--red-600)'}}>{t(locale, 'profile.signOut')}</span>
            </button>
          </GlassCard>
        </AnimatedSection>

        <div style={{ height: 120 }} />
      </div>
    </Page>
  )
}

// ── STYLES ─────────────────────────────────────────────────────────
const styles = {
  scroll: { position: 'relative', zIndex: 1, flex: 1, minHeight: 0, overflowY: 'auto', padding: '1.25rem', overflowX: 'hidden' },
  
  // Header
  headerCard: { position: 'relative', padding: '1.5rem', overflow: 'hidden', background: 'linear-gradient(145deg, rgba(22,155,125,0.94), rgba(30,107,60,0.88))', color: 'var(--white)', marginBottom: '1.25rem', border: 'none' },
  headerGlow: { position: 'absolute', width: 180, height: 180, top: -80, right: -60, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', filter: 'blur(24px)' },
  mosque: { position: 'absolute', top: -40, width: 480, height: 420, opacity: 0.08, filter: 'blur(8px)', zIndex: 0, pointerEvents: 'none', color: 'var(--ink)' },
  mosqueLTR: { right: -40, left: 'auto' }, mosqueRTL: { left: -40, right: 'auto', transform: 'scale(1) translateX(-4px)' },
  
  avatarWrap: { position: 'relative', display: 'inline-block', zIndex: 2 },
  avatar: { position: 'relative', width: 64, height: 64, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.34)', boxShadow: '0 16px 30px rgba(5,45,40,0.18)', fontSize: 22, fontWeight: 900 },
  trustRing: { position: 'absolute', inset: -5, borderRadius: 28, border: '2px dashed rgba(255,255,255,0.4)', animation: 'spin 20s linear infinite' },
  
  identity: { position: 'relative', marginTop: 16, zIndex: 2 },
  name: { fontSize: 24, fontWeight: 700, lineHeight: 1.15, marginBottom: 8 },
  roleBadge: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.2)', fontSize: 12, fontWeight: 600, backdropFilter: 'blur(10px)' },
  
  impactGrid: { display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.15)', zIndex: 2, position: 'relative' },
  impactStat: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 },
  impactIcon: { color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  impactValue: { fontSize: 20, fontWeight: 800 },
  impactLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 },

  // Tabs
  tabContainer: { display: 'flex', background: 'rgba(255,255,255,0.5)', padding: 6, borderRadius: 16, marginBottom: '1.5rem', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)' },
  tabBtn: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 0', border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, color: 'var(--ink-60)', cursor: 'pointer', borderRadius: 12, transition: 'all 0.2s' },
  tabActive: { background: 'var(--white)', color: 'var(--teal-700)', boxShadow: '0 4px 12px rgba(15,45,28,0.06)' },
  tabIcon: { fontSize: 16 },

  // Section Defaults
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12, padding: '0 4px' },
  sectionTitle: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, color: 'var(--ink)' },
  sectionSub: { fontSize: 12, color: 'var(--ink-60)', marginTop: 2, marginInlineStart: 24 },

  // Impact Tree
  totalBadge: { fontSize: 12, fontWeight: 700, color: 'var(--teal-700)', background: 'rgba(22,155,125,0.1)', padding: '6px 12px', borderRadius: 99 },
  storyCard: { padding: '14px', marginBottom: 12, cursor: 'pointer' },
  storyTop: { display: 'flex', gap: 14, alignItems: 'center' },
  storyIcon: { width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  storyTitle: { fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 },
  storyMeta: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  metaChip: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 99, background: 'var(--surface)', color: 'var(--ink-60)' },
  timeline: { marginTop: 16, paddingTop: 16, borderTop: '1px dashed rgba(16,34,31,0.1)' },
  timelineRow: { display: 'flex', gap: 12, marginBottom: 4 },
  timelineLine: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0 },
  timelineDot: { width: 12, height: 12, borderRadius: '50%', flexShrink: 0, border: '2px solid var(--white)', boxShadow: '0 0 0 1px rgba(0,0,0,0.05)' },
  timelineConnector: { width: 2, flex: 1, background: 'rgba(16,34,31,0.06)', minHeight: 20, margin: '4px 0' },
  timelineContent: { flex: 1, paddingBottom: 16 },
  timelineDate: { fontSize: 11, fontWeight: 600, color: 'var(--ink-40)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' },
  timelineText: { fontSize: 13, color: 'var(--ink-80)', lineHeight: 1.5 },

  // Checklist
  progressCard: { padding: '16px', marginBottom: 16 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: 700, color: 'var(--ink)' },
  cardSub: { fontSize: 12, color: 'var(--ink-60)', marginTop: 4 },
  ring: { position: 'relative', width: 56, height: 56 },
  ringText: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: 'var(--teal-700)' },
  progressTrack: { height: 6, background: 'rgba(16,34,31,0.04)', borderRadius: 99, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, var(--teal-400), var(--teal-600))', borderRadius: 99 },
  
  catSection: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 },
  checkItem: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', borderRadius: 16, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(15,45,28,0.02)' },
  checkItemDone: { background: 'transparent', border: '1px solid transparent', boxShadow: 'none' },
  checkbox: { width: 24, height: 24, borderRadius: 8, border: '2px solid rgba(16,34,31,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' },
  checkboxDone: { background: 'var(--teal-500)', borderColor: 'var(--teal-500)', color: 'white' },
  itemIcon: { fontSize: 18 },
  itemLabel: { fontSize: 14, fontWeight: 500, color: 'var(--ink)', flex: 1, transition: 'all 0.2s' },
  
  addRow: { display: 'flex', gap: 8, marginBottom: 16 },
  addInput: { flex: 1, padding: '12px 16px', border: '1px solid rgba(16,34,31,0.1)', borderRadius: 14, fontSize: 14, outline: 'none', background: 'rgba(255,255,255,0.8)' },
  addConfirm: { padding: '0 16px', background: 'var(--teal-500)', border: 'none', borderRadius: 14, color: '#fff', cursor: 'pointer' },
  addCancel: { padding: '0 16px', background: 'rgba(16,34,31,0.05)', border: 'none', borderRadius: 14, color: 'var(--ink-60)', fontSize: 16, cursor: 'pointer' },
  addBtn: { width: '100%', padding: '14px', background: 'transparent', border: '2px dashed rgba(16,34,31,0.1)', borderRadius: 16, color: 'var(--ink-60)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  reportBtn: { width: '100%', padding: '14px', background: 'var(--surface-2)', border: '1px solid rgba(16,34,31,0.06)', borderRadius: 16, color: 'var(--teal-800)', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: 'var(--shadow-sm)' },

  // Badges Grid
  badgesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 },
  badgeCard: { padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', textAlign: 'center' },
  badgeLabel: { fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 },
  earnedCheck: { position: 'absolute', top: 12, insetInlineEnd: 12, width: 22, height: 22, borderRadius: '50%', background: 'var(--teal-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 2px 8px rgba(22,155,125,0.3)' },
  badgeNote: { gridColumn: '1/-1', textAlign: 'center', fontSize: 12, color: 'var(--ink-40)', fontStyle: 'italic', marginTop: 8 },

  // Modals & Settings
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(15,45,28,0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'flex-end' },
  reportModal: { width: '100%', background: 'var(--surface-2)', borderRadius: '28px 28px 0 0', padding: '2rem 1.5rem', position: 'relative', boxShadow: 'var(--shadow-lg)' },
  closeBtn: { position: 'absolute', top: 20, insetInlineEnd: 20, background: 'rgba(16,34,31,0.05)', border: 'none', width: 36, height: 36, borderRadius: '50%', fontSize: 18, cursor: 'pointer', color: 'var(--ink-60)' },
  modalTitle: { fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 4, paddingInlineEnd: 48 },
  modalSub: { fontSize: 13, color: 'var(--ink-60)', marginBottom: 24, fontWeight: 500 },
  scoreRow: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 },
  scoreLabel: { fontSize: 20, width: 24, textAlign: 'center' },
  scoreTrack: { flex: 1, height: 10, background: 'rgba(16,34,31,0.04)', borderRadius: 99, overflow: 'hidden' },
  scoreFill: { height: '100%', borderRadius: 99 },
  scorePct: { width: 40, fontSize: 14, fontWeight: 700, color: 'var(--ink)', textAlign: 'end' },
  insightBox: { background: 'rgba(22,155,125,0.05)', border: '1px solid rgba(22,155,125,0.1)', borderRadius: 16, padding: '16px', marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 },
  insightItem: { fontSize: 13, fontWeight: 500, color: 'var(--teal-900)', lineHeight: 1.5 },
  
  settingsCard: { overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' },
  settingsRow: { width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'start' },
  settingsIcon: { width: 36, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(22,155,125,0.1)', color: 'var(--teal-700)' },
  settingsLabel: { flex: 1, color: 'var(--ink)', fontSize: 15, fontWeight: 600 },
  settingsArrow: { color: 'var(--ink-30)', fontSize: 24 },
}
