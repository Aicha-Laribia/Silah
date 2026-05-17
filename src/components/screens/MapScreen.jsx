import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { NEEDS, NEED_ICONS, localizedField, formatMoney } from '../../data/mockData'
import { ThemedIcon, needIcons, eventIcons, needMarkerSvg, profileIcons } from '../ui/ThemedIcon'
import { useApp } from '../../hooks/useApp'
import { t } from '../../data/translations'

// Note: Ensure you have `import 'leaflet/dist/leaflet.css'` in your main.jsx

// ── REDESIGNED MARKERS (Soft Glowing Orbs with Feature Colors) ─────
const createIcon = (type, urgency, isShield, isSkill) => {
  const info = NEED_ICONS[type]
  // Base ring color
  let ringColor = urgency === 'critical' ? '#A32D2D' : urgency === 'high' ? '#085041' : '#3C3489'
  
  // Override for special features
  if (isShield) ringColor = '#3C3489' // Indigo for Dignity Shield
  if (isSkill) ringColor = '#2D8653'  // Green for Time Waqf

  return L.divIcon({
    className: '',
    html: `<div style="
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #ffffff, #F5F1E8);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      border: 2.5px solid ${ringColor};
      box-shadow: 0 6px 16px rgba(15,45,28,0.15);
      position: relative;
    ">
      ${needMarkerSvg(type, info?.color || ringColor)}
      ${urgency === 'critical' ? `<div style="
        position:absolute; top:-6px; left:-6px; right:-6px; bottom:-6px;
        border-radius:50%; border:2px solid #E24B4A;
        animation:pulse-ring 2s ease-out infinite;
        pointer-events:none;
      "></div>` : ''}
    </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22]
  })
}

function MapResizeHandler() {
  const map = useMap()
  useEffect(() => {
    const refreshMapSize = () => map.invalidateSize()
    refreshMapSize()
    const frameId = window.requestAnimationFrame(refreshMapSize)
    const timeoutId = window.setTimeout(refreshMapSize, 250)
    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(timeoutId)
    }
  }, [map])
  return null
}

// ── FEATURE COMPONENTS ─────────────────────────────────────────────
function FeatureBadge({ need }) {
  const { locale } = useApp()
  if (need.feature === 'dignity_shield') return (
    <div style={{...styles.featureBadge, background: 'rgba(60,52,137,0.1)', color: '#3C3489'}}>
      <ThemedIcon icon={profileIcons.trusted} size={14} strokeWidth={2.5}/> {t(locale, 'map.feature.dignity')}
    </div>
  )
  if (need.feature === 'blood_ping') return (
    <div style={{...styles.featureBadge, background: 'rgba(155,35,53,0.1)', color: '#9B2335'}}>
      <ThemedIcon icon={needIcons.blood} size={14} strokeWidth={2.5}/> {t(locale, 'map.feature.blood', { bloodType: need.bloodType })}
    </div>
  )
  if (need.feature === 'skill_waqf') return (
    <div style={{...styles.featureBadge, background: 'rgba(45,134,83,0.1)', color: '#2D8653'}}>
      <ThemedIcon icon={profileIcons.time} size={14} strokeWidth={2.5}/> {t(locale, 'map.feature.time', { time: localizedField(need, 'timeNeeded', locale) })}
    </div>
  )
  if (need.feature === 'micro_grant') return (
    <div style={{...styles.featureBadge, background: 'rgba(26,58,107,0.1)', color: '#1A3A6B'}}>
      <ThemedIcon icon={profileIcons.trusted} size={14} strokeWidth={2.5}/> {t(locale, 'map.feature.grant')}
    </div>
  )
  return null
}

function ReceiptCard({ need }) {
  const { locale } = useApp()
  const iconMap = { pharmacy: needIcons.medical, university: needIcons.student, funeral_home: needIcons.funeral }
  const receiptType = t(locale, `receipts.${need.receiptType}`)
  return (
    <div style={styles.receiptCard}>
      <div style={styles.receiptHeader}>
        <span style={{ fontSize: 20, display: 'flex' }}><ThemedIcon icon={iconMap[need.receiptType] || needIcons.supported} size={20} strokeWidth={2} /></span>
        <div style={{ flex: 1 }}>
          <div style={styles.receiptTitle}>{t(locale, 'map.receipt.title')}</div>
          <div style={styles.receiptSub}>{t(locale, 'map.receipt.invoice', { type: receiptType })}</div>
        </div>
        <div style={styles.receiptStatus}><ThemedIcon icon={profileIcons.trusted} size={12} strokeWidth={3} color="#fff"/></div>
      </div>
      <div style={styles.receiptAmountRow}>
        <span style={styles.receiptAmountLabel}>{t(locale, 'map.receipt.amount')}</span>
        <span style={styles.receiptAmount}>{formatMoney(need.amount, locale)}</span>
      </div>
      <div style={styles.receiptLockNote}>
        <ThemedIcon icon={profileIcons.trusted} size={12} strokeWidth={3} style={{ display: 'inline-block', marginInlineEnd: 4 }} /> {t(locale, 'map.receipt.lock', { type: receiptType })}
      </div>
    </div>
  )
}

function DignityNote({ need }) {
  const { locale } = useApp()
  const node = localizedField(need, 'trustNode', locale)
  return (
    <div style={styles.dignityNote}>
      <div style={styles.dignityTitle}>
        <ThemedIcon icon={profileIcons.masjid} size={14} /> {t(locale, 'map.dignity.title')}
      </div>
      <div style={styles.dignityText}>
        {t(locale, 'map.dignity.text', { node })} <em>"{t(locale, 'map.dignity.quote')}"</em>
      </div>
    </div>
  )
}

// ── NEED DETAIL CARD ───────────────────────────────────────────────
function NeedCard({ need, onClose }) {
  const { locale } = useApp()
  const info = NEED_ICONS[need.type]
  const [actioned, setActioned] = useState(false)

  return (
    <div style={styles.needCard}>
      <div style={styles.dragHandle} />
      <button style={styles.closeBtn} onClick={onClose}>×</button>

      <div style={styles.needHeader}>
        <span style={{ ...styles.needIcon, background: info.bg, color: info.color }}>
          <ThemedIcon icon={needIcons[need.type]} size={22} strokeWidth={2.2} />
        </span>
        <div style={{ flex: 1, paddingInlineEnd: 20 }}>
          <div style={styles.needTitle}>{localizedField(need, 'title', locale)}</div>
          <div style={styles.needOrg}>{localizedField(need, 'org', locale)}</div>
        </div>
      </div>

      <FeatureBadge need={need} />

      <div style={styles.needBadgeRow}>
        {need.verified === 'institution' && <span style={{ ...styles.badge, background: '#EFF9F4', color: '#1A4A2E', display: 'flex', alignItems: 'center', gap: 4 }}><ThemedIcon icon={profileIcons.trusted} size={10} strokeWidth={3} /> {t(locale, 'map.verifiedOrganisation')}</span>}
        {need.verified === 'masjid' && <span style={{ ...styles.badge, background: '#EEF5FD', color: '#1A3A6B', display: 'flex', alignItems: 'center', gap: 4 }}><ThemedIcon icon={eventIcons.salah} size={10} strokeWidth={2} /> {t(locale, 'map.masjidVouched')}</span>}
        {need.verified === 'dignity_shield' && <span style={{ ...styles.badge, background: '#F0EFFE', color: '#3C3489', display: 'flex', alignItems: 'center', gap: 4 }}><ThemedIcon icon={profileIcons.trusted} size={10} strokeWidth={3} /> {t(locale, 'map.trustNode')}</span>}
        {need.urgency === 'critical' && <span style={{ ...styles.badge, background: '#FEF2F4', color: '#9B2335', display: 'flex', alignItems: 'center', gap: 4 }}><ThemedIcon icon={needIcons.blood} size={10} strokeWidth={2} /> {t(locale, 'map.urgent')}</span>}
        {need.isSkill && <span style={{ ...styles.badge, background: '#EFF9F4', color: '#2D8653', display: 'flex', alignItems: 'center', gap: 4 }}><ThemedIcon icon={profileIcons.time} size={10} strokeWidth={2} /> {t(locale, 'map.timeOnly')}</span>}
      </div>

      <p style={styles.needDetail}>{localizedField(need, 'detail', locale)}</p>

      {need.feature === 'dignity_shield' && <DignityNote need={need} />}
      {need.receiptVerified && <ReceiptCard need={need} />}

      <div style={styles.needMeta}>
        <span style={styles.metaItem}><ThemedIcon icon={profileIcons.location} size={14} /> {localizedField(need, 'distance', locale)}</span>
        <span style={styles.metaItem}><ThemedIcon icon={profileIcons.time} size={14} /> {localizedField(need, 'timePosted', locale)}</span>
        {need.bloodType && <span style={styles.metaItem}><ThemedIcon icon={needIcons.blood} size={14} /> {need.bloodType}</span>}
        {need.timeNeeded && <span style={styles.metaItem}><ThemedIcon icon={profileIcons.time} size={14} /> {localizedField(need, 'timeNeeded', locale)}</span>}
        {need.amount && !need.receiptVerified && <span style={styles.metaItem}><ThemedIcon icon={needIcons.medical} size={14} /> {formatMoney(need.amount, locale)}</span>}
      </div>

      <div style={styles.needActions}>
        {need.type === 'blood' ? (
          <button style={{ ...styles.primaryBtn, background: 'linear-gradient(135deg, #E05470, #9B2335)' }} onClick={() => setActioned(true)} className="hover-lift">
            {actioned ? <><ThemedIcon icon={profileIcons.trusted} size={14} strokeWidth={3} style={{ display: 'inline-block', marginInlineEnd: 6 }} /> {t(locale, 'map.contactSent')}</> : `${t(locale, 'map.donateBlood')} ${need.bloodType}`}
          </button>
        ) : need.isSkill ? (
          <button style={{ ...styles.primaryBtn, background: 'linear-gradient(135deg, #3AA86A, #1A4A2E)' }} onClick={() => setActioned(true)} className="hover-lift">
            {actioned ? <><ThemedIcon icon={profileIcons.trusted} size={14} strokeWidth={3} style={{ display: 'inline-block', marginInlineEnd: 6 }} /> {t(locale, 'map.confirmed')}</> : t(locale, 'map.share')}
          </button>
        ) : (
          <button style={styles.primaryBtn} onClick={() => setActioned(true)} className="hover-lift">
            {actioned ? <><ThemedIcon icon={profileIcons.trusted} size={14} strokeWidth={3} style={{ display: 'inline-block', marginInlineEnd: 6 }} /> {t(locale, 'map.thanks')}</> : need.amount ? `${t(locale, 'map.sendZakat')} ${formatMoney(need.amount, locale)}` : t(locale, 'map.sendZakat')}
          </button>
        )}
        <button style={styles.secondaryBtn}>{t(locale, 'map.share')}</button>
      </div>
    </div>
  )
}

// ── MAIN MAP SCREEN ────────────────────────────────────────────────
export default function MapScreen() {
  const { locale } = useApp()
  const [activeFilter, setActiveFilter] = useState('all')
  const [mapMode, setMapMode] = useState('all') // 'all' | 'money' | 'skill'
  const [selectedNeed, setSelectedNeed] = useState(null)
  const [showRequest, setShowRequest] = useState(false)

  // Combined Filtering Logic
  const filtered = NEEDS.filter(n => {
    // 1. Category Filter
    if (activeFilter !== 'all' && n.type !== activeFilter && !(activeFilter === 'urgent' && n.urgency === 'critical')) return false
    // 2. Mode Filter (Money vs Skill)
    if (mapMode === 'skill' && !n.isSkill) return false
    if (mapMode === 'money' && n.isSkill) return false
    return true
  })

  const filters = [
    { id: 'all', label: t(locale, 'map.filters.all'), icon: null },
    { id: 'urgent', label: t(locale, 'map.filters.urgent'), icon: null },
    { id: 'blood', label: t(locale, 'map.filters.blood'), icon: needIcons.blood },
    { id: 'food', label: t(locale, 'map.filters.food'), icon: needIcons.food },
    { id: 'medical', label: t(locale, 'map.filters.medical'), icon: needIcons.medical },
    { id: 'orphan', label: t(locale, 'map.filters.orphan'), icon: needIcons.orphan },
  ]

  return (
    <div style={styles.root}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.headerTitle}>{t(locale, 'map.title')}</h2>
          <p style={styles.headerSub}>
            {t(locale, 'map.urgentCount', { urgent: NEEDS.filter(n=>n.urgency==='critical').length, total: NEEDS.length })}
          </p>
        </div>
        <button style={{...styles.requestBtn, ...styles.glassBtn}} onClick={() => setShowRequest(true)}>
          + {t(locale, 'map.requestHelp')}
        </button>
      </div>

      {/* Map Wrapping Container */}
      <div style={styles.mapWrap}>
        
        {/* Floating Controls Over Map */}
        <div style={styles.controlsOverlay}>
          {/* Mode Segmented Control (All / Donate / Time) */}
          <div style={styles.modeRow}>
            {['all', 'money', 'skill'].map((id) => (
              <button 
                key={id} 
                style={{ ...styles.modeBtn, ...(mapMode===id ? styles.modeBtnActive : {}) }} 
                onClick={() => { setMapMode(id); setActiveFilter('all'); }}
                className="soft-interaction"
              >
                {t(locale, `map.modes.${id}`)}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div style={styles.filtersOverlay} className="hide-scrollbar">
            <div style={styles.filters}>
              {filters.map(f => (
                <button
                  key={f.id}
                  style={{ ...styles.filterChip, ...(activeFilter === f.id ? styles.filterActive : {}) }}
                  onClick={() => setActiveFilter(f.id)}
                  className="soft-interaction"
                >
                  {f.icon && <ThemedIcon icon={f.icon} size={14} strokeWidth={2.2} />}
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaflet Map (Base Layer) */}
        <MapContainer
          center={[33.994, -6.854]}
          zoom={13}
          style={styles.mapContainer}
          zoomControl={false}
          scrollWheelZoom={true}
        >
          <MapResizeHandler />
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {filtered.map(need => (
            <Marker
              key={need.id}
              position={[need.lat, need.lng]}
              icon={createIcon(need.type, need.urgency, need.feature === 'dignity_shield', need.isSkill)}
              eventHandlers={{ click: () => setSelectedNeed(need) }}
            />
          ))}
        </MapContainer>
        
        {filtered.length === 0 && (
          <div style={styles.emptyOverlay}>{t(locale, 'map.noNeeds')}</div>
        )}

        {/* Legend Overlay */}
        <div style={styles.legend} className="glass">
          <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#9B2335' }} /> {t(locale, 'map.legend.urgent')}</div>
          <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#3C3489' }} /> {t(locale, 'map.legend.shield')}</div>
          <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#2D8653' }} /> {t(locale, 'map.legend.time')}</div>
        </div>

        {/* Bottom overlay (count bar) */}
        <div style={styles.countBarOverlay} className="glass map-count-overlay">
          <span style={styles.countText}>{t(locale, 'map.showing', { count: filtered.length })}</span>
          <span style={styles.countSub}>{t(locale, 'map.tapPin')}</span>
        </div>
      </div>

      {/* Selected need panel */}
      {selectedNeed && (
        <div style={styles.needPanel} className="animate-fadeUp">
          <NeedCard need={selectedNeed} onClose={() => setSelectedNeed(null)} />
        </div>
      )}

      {/* Request help modal */}
      {showRequest && (
        <div style={styles.modalOverlay} onClick={() => setShowRequest(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()} className="animate-fadeUp">
            <button style={styles.closeBtn} onClick={() => setShowRequest(false)}>✕</button>
            <h3 style={styles.modalTitle}>{t(locale, 'map.modalTitle')}</h3>
            <p style={styles.modalSub}>{t(locale, 'map.request.sub')}</p>
            
            <div style={styles.shieldNote}>
              <ThemedIcon icon={profileIcons.trusted} size={14} /> {t(locale, 'map.request.shield')}
            </div>

            <select style={styles.select}>
              <option value="">{t(locale, 'map.request.selectNeed')}</option>
              {Object.entries(NEED_ICONS).map(([k, v]) => (
                <option key={k} value={k}>{v.emoji} {t(locale, `map.needType.${k}`)}</option>
              ))}
            </select>

            <select style={styles.select}>
              <option>{t(locale, 'map.request.selectNode')}</option>
              <option>{locale === 'ar' ? 'مسجد النور، حي الرياض' : 'Al-Nour Masjid, Hay Riad'}</option>
              <option>{locale === 'ar' ? 'مسجد الإيمان، أكدال' : 'Al-Iman Masjid, Agdal'}</option>
              <option>{locale === 'ar' ? 'جمعية أمل، سلا' : 'Amal Association, Salé'}</option>
            </select>

            <textarea style={styles.textarea} placeholder={t(locale, 'map.request.textarea')} rows={4} />
            <button style={styles.primaryBtn}>{t(locale, 'map.request.send')}</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── STYLES ─────────────────────────────────────────────────────────
const styles = {
  root: { display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, background: 'transparent' },

  header: {
    position: 'relative',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1.2rem 1.25rem 0.9rem',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72))',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(15,45,28,0.05)',
    zIndex: 1000,
    flexShrink: 0
  },
  headerTitle: { fontFamily: 'var(--font-arabic)', fontSize: 22, fontWeight: 700, color: 'var(--ink)' },
  headerSub: { fontSize: 13, color: 'var(--ink-60)', marginTop: 2 },
  
  requestBtn: {
    background: 'var(--teal-500)', border: 'none', color: 'var(--white)', 
    fontSize: 13, fontWeight: 700, padding: '10px 16px', borderRadius: 'var(--radius-md)', 
    cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,155,125,0.2)'
  },

  mapWrap: { 
    flex: 1, position: 'relative', minHeight: 0, 
    borderTopLeftRadius: '28px', borderTopRightRadius: '28px',
    boxShadow: '0 -10px 30px rgba(15,45,28,0.08)',
    background: '#FAF8F3', overflow: 'hidden'
  },
  mapContainer: { width: '100%', height: '100%', background: 'transparent', zIndex: 0 },

  // Floating Controls
  controlsOverlay: { position: 'absolute', top: 16, left: 0, right: 0, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 12 },
  
  modeRow: { 
    display: 'flex', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', 
    borderRadius: 16, padding: 6, margin: '0 16px', border: '1px solid rgba(15,45,28,0.1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  modeBtn: { 
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 12, background: 'transparent', 
    color: 'var(--ink-60)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' 
  },
  modeBtnActive: { background: 'var(--white)', color: 'var(--teal-800)', boxShadow: '0 2px 8px rgba(15,45,28,0.08)' },

  filtersOverlay: { width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  filters: { display: 'flex', gap: 8, width: 'max-content', padding: '0 16px' },
  filterChip: {
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px',
    border: '1px solid rgba(15,45,28,0.06)', borderRadius: 999,
    background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
    color: 'var(--ink-80)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
    whiteSpace: 'nowrap', transition: 'all 0.25s ease', boxShadow: '0 4px 12px rgba(15,45,28,0.04)'
  },
  filterActive: { background: 'linear-gradient(135deg,#12806f,#1E6B3C)', color: 'white', border: 'none', boxShadow: '0 8px 18px rgba(18,128,111,0.25)' },

  // Overlays
  legend: { 
    position: 'absolute', bottom: 175, left: 16, zIndex: 1000, 
    background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', 
    borderRadius: 12, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 8, 
    border: '1px solid rgba(15,45,28,0.05)', boxShadow: 'var(--shadow-sm)'
  },
  legendItem: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: 'var(--ink-80)' },
  legendDot: { width: 10, height: 10, borderRadius: '50%', flexShrink: 0 },

  countBarOverlay: {
    position: 'absolute', left: 16, right: 16, bottom: 96, zIndex: 1000,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
    padding: '12px 16px', borderRadius: '16px', boxShadow: 'var(--shadow-md)',
    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)'
  },
  countText: { fontSize: 13, fontWeight: 700, color: 'var(--teal-900)' },
  countSub: { fontSize: 12, color: 'var(--ink-60)', fontWeight: 500 },

  // Need Panel
  needPanel: {
    position: 'absolute', bottom: 76, zIndex: 1100, width: '100%',
    background: 'var(--surface-2)', borderRadius: '28px 28px 0 0',
    maxHeight: '70vh', overflowY: 'auto', boxShadow: '0 -10px 40px rgba(15,45,28,0.15)'
  },
  needCard: { padding: '1.5rem', position: 'relative' },
  dragHandle: { width: 40, height: 5, background: 'var(--ink-10)', borderRadius: 99, margin: '0 auto 1.5rem' },
  closeBtn: {
    position: 'absolute', top: 16, insetInlineEnd: 16, background: 'rgba(15,45,28,0.05)', border: 'none',
    width: 32, height: 32, borderRadius: '50%', fontSize: 18, cursor: 'pointer', color: 'var(--ink-60)',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  needHeader: { display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16, paddingInlineEnd: 32 },
  needIcon: { width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  needTitle: { fontSize: 17, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 4 },
  needOrg: { fontSize: 13, fontWeight: 500, color: 'var(--ink-60)' },
  
  featureBadge: { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, padding: '6px 12px', borderRadius: 99, marginBottom: 12 },
  needBadgeRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 },
  badge: { fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 99 },
  needDetail: { fontSize: 14, color: 'var(--ink-80)', lineHeight: 1.6, marginBottom: 16 },
  
  // Custom Card Sections inside Panel
  receiptCard: { background: 'rgba(26,58,107,0.04)', border: '1px solid rgba(26,58,107,0.1)', borderRadius: 16, padding: '14px', marginBottom: 16 },
  receiptHeader: { display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 },
  receiptTitle: { fontSize: 13, fontWeight: 700, color: '#1A3A6B' },
  receiptSub: { fontSize: 12, color: 'rgba(26,58,107,0.7)', textTransform: 'capitalize', marginTop: 2 },
  receiptStatus: { background: '#2D8653', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  receiptAmountRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, background: 'rgba(255,255,255,0.5)', padding: '8px 12px', borderRadius: 10 },
  receiptAmountLabel: { fontSize: 13, fontWeight: 600, color: '#1A3A6B' },
  receiptAmount: { fontSize: 18, fontWeight: 800, color: '#1A3A6B' },
  receiptLockNote: { fontSize: 11, color: 'rgba(26,58,107,0.7)', lineHeight: 1.4, fontStyle: 'italic' },

  dignityNote: { background: 'rgba(60,52,137,0.04)', border: '1px solid rgba(60,52,137,0.1)', borderRadius: 16, padding: '14px', marginBottom: 16 },
  dignityTitle: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#3C3489', marginBottom: 6 },
  dignityText: { fontSize: 13, color: 'rgba(60,52,137,0.8)', lineHeight: 1.5 },

  needMeta: { display: 'flex', gap: 14, fontSize: 13, color: 'var(--ink-60)', marginBottom: 24, flexWrap: 'wrap', fontWeight: 600 },
  metaItem: { display: 'inline-flex', alignItems: 'center', gap: 6 },
  needActions: { display: 'flex', gap: 10 },
  primaryBtn: { flex: 1, padding: '14px', background: 'linear-gradient(135deg,#169b7d,#1E6B3C)', boxShadow: '0 10px 20px rgba(22,155,125,0.18)', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--white)', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s ease' },
  secondaryBtn: { padding: '14px 18px', background: 'transparent', border: '1px solid rgba(15,45,28,0.1)', borderRadius: 'var(--radius-md)', color: 'var(--ink-80)', fontSize: 14, fontWeight: 600, cursor: 'pointer' },

  // Request Modal
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(15,45,28,0.4)', backdropFilter: 'blur(4px)', zIndex: 1200, display: 'flex', alignItems: 'flex-end' },
  modal: { width: '100%', background: 'var(--surface-2)', borderRadius: '28px 28px 0 0', padding: '2rem 1.5rem', position: 'relative', boxShadow: 'var(--shadow-lg)' },
  modalTitle: { fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 8, paddingInlineEnd: 48 },
  modalSub: { fontSize: 14, color: 'var(--ink-60)', marginBottom: 16, lineHeight: 1.5 },
  shieldNote: { display: 'flex', gap: 8, background: 'rgba(60,52,137,0.05)', border: '1px solid rgba(60,52,137,0.1)', color: '#3C3489', fontSize: 13, fontWeight: 600, padding: '12px', borderRadius: 12, marginBottom: 20, lineHeight: 1.5 },
  select: { width: '100%', padding: '14px 16px', marginBottom: 12, border: '1px solid rgba(15,45,28,0.1)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 500, color: 'var(--ink)', background: 'var(--surface)', outline: 'none', display: 'block' },
  textarea: { width: '100%', padding: '14px 16px', marginBottom: 20, border: '1px solid rgba(15,45,28,0.1)', borderRadius: 'var(--radius-sm)', fontSize: 14, color: 'var(--ink)', background: 'var(--surface)', outline: 'none', resize: 'none', lineHeight: 1.6, display: 'block', fontFamily: 'var(--font-body)' },
  emptyOverlay: { position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20, textAlign: 'center', fontSize: 15, fontWeight: 600, color: 'var(--ink-60)', background: 'rgba(247,244,238,0.85)', backdropFilter: 'blur(8px)', pointerEvents: 'none', zIndex: 500 }
}
