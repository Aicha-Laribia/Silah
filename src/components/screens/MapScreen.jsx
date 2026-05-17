import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { NEEDS, NEED_ICONS } from '../../data/mockData'
import { ThemedIcon, needIcons, needMarkerSvg, profileIcons } from '../ui/ThemedIcon'
import { useApp } from '../../hooks/useApp'
import { t } from '../../data/translations'

// Note: Ensure you have `import 'leaflet/dist/leaflet.css'` in your main.jsx

// Redesigned Markers (Soft Glowing Orbs)
const createIcon = (type, urgency) => {
  const info = NEED_ICONS[type]
  const ringColor = urgency === 'critical' ? '#A32D2D' : urgency === 'high' ? '#085041' : '#3C3489'
  
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

function NeedCard({ need, onClose }) {
  const { locale } = useApp()
  const info = NEED_ICONS[need.type]
  const [donated, setDonated] = useState(false)

  return (
    <div style={styles.needCard}>
      <button style={styles.closeBtn} onClick={onClose}>×</button>

      <div style={styles.needHeader}>
        <span style={{ ...styles.needIcon, background: info.bg, color: info.color }}>
          <ThemedIcon icon={needIcons[need.type]} size={22} strokeWidth={2.2} />
        </span>
        <div>
          <div style={styles.needTitle}>{need.title}</div>
          <div style={styles.needOrg}>{need.org}</div>
        </div>
      </div>

      <div style={styles.needBadgeRow}>
        {need.verified === 'institution' && (
          <span style={{ ...styles.badge, background: '#E1F5EE', color: '#085041' }}>
            {t(locale, 'map.verifiedOrganisation')}
          </span>
        )}
        {need.verified === 'masjid' && (
          <span style={{ ...styles.badge, background: '#E6F1FB', color: '#185FA5' }}>
            {t(locale, 'map.masjidVouched')}
          </span>
        )}
        {need.urgency === 'critical' && (
          <span style={{ ...styles.badge, background: '#FCEBEB', color: '#A32D2D' }}>
            {t(locale, 'map.urgent')}
          </span>
        )}
      </div>

      <p style={styles.needDetail}>{need.detail}</p>

      <div style={styles.needMeta}>
        <span style={styles.metaItem}><ThemedIcon icon={profileIcons.location} size={14} /> {need.distance}</span>
        <span style={styles.metaItem}><ThemedIcon icon={profileIcons.time} size={14} /> {need.timePosted}</span>
        {need.bloodType && <span style={styles.metaItem}><ThemedIcon icon={needIcons.blood} size={14} /> {need.bloodType}</span>}
      </div>

      <div style={styles.needActions}>
        <button 
          style={styles.primaryBtn} 
          onClick={() => setDonated(true)}
          className="hover-lift"
        >
          {need.type === 'blood'
            ? donated ? t(locale, 'map.contactSent') : t(locale, 'map.donateBlood')
            : donated ? t(locale, 'map.thanks') : t(locale, 'map.sendZakat')}
        </button>
        <button style={styles.secondaryBtn}>{t(locale, 'map.share')}</button>
      </div>
    </div>
  )
}

export default function MapScreen() {
  const { locale } = useApp()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedNeed, setSelectedNeed] = useState(null)
  const [showRequest, setShowRequest] = useState(false)

  const filtered = activeFilter === 'all'
    ? NEEDS
    : NEEDS.filter(n => n.type === activeFilter || (activeFilter === 'urgent' && n.urgency === 'critical'))

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
      <div style={styles.header} className="map-header">
        <div>
          <h2 style={styles.headerTitle}>{t(locale, 'map.title')}</h2>
          <p style={styles.headerSub}>{t(locale, 'map.sub', { count: NEEDS.filter(n => n.urgency === 'critical').length })}</p>
        </div>
        <button style={{...styles.requestBtn, ...styles.glassBtn}} onClick={() => setShowRequest(true)}>
          + {t(locale, 'map.requestHelp')}
        </button>
      </div>

      {/* Map Wrapping Container */}
      <div style={styles.mapWrap} className="map-wrap">
        
        {/* Top Overlay Filters (Floating on map) */}
        {/* Added "hide-scrollbar" here to clean up the visual on mobile */}
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
          {filtered.map(need => {
            return (
              <Marker
                key={need.id}
                position={[need.lat, need.lng]}
                icon={createIcon(need.type, need.urgency)}
                eventHandlers={{ click: () => setSelectedNeed(need) }}
              />
            )
          })}
        </MapContainer>
        
        {filtered.length === 0 && (
          <div style={styles.emptyOverlay}>
            {t(locale, 'map.noNeeds')}
          </div>
        )}

        {/* Bottom overlay (count bar) now appears floating on top of the bottom of the map */}
        <div style={styles.countBarOverlay} className="glass map-count-overlay">
          <span style={styles.countText}>{t(locale, 'map.showing', { count: filtered.length })}</span>
          <span style={styles.countSub}>{t(locale, 'map.tapPin')}</span>
        </div>
      </div>

      {/* Selected need panel */}
      {selectedNeed && (
        <div style={styles.needPanel} className="animate-fadeUp map-need-panel">
          <NeedCard need={selectedNeed} onClose={() => setSelectedNeed(null)} />
        </div>
      )}

      {/* Request help modal */}
      {showRequest && (
        <div style={styles.modalOverlay} onClick={() => setShowRequest(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()} className="animate-fadeUp">
            <button style={styles.closeBtn} onClick={() => setShowRequest(false)}>×</button>
            <h3 style={styles.modalTitle}>{t(locale, 'map.modalTitle')}</h3>
            <p style={styles.modalSub}>{t(locale, 'map.modalHint')}</p>
            <select style={styles.select}>
              <option value="">{t(locale, 'map.placeholder')}</option>
              {Object.entries(NEED_ICONS).map(([k, v]) => (
                <option key={k} value={k}>{t(locale, `map.needType.${k}`)}</option>
              ))}
            </select>
            <textarea style={styles.textarea} placeholder={t(locale, 'map.placeholder')} rows={4} />
            <button style={styles.primaryBtn}>{t(locale, 'map.requestHelp')}</button>
          </div>
        </div>
      )}
    </div>
  )
}

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
    background: 'var(--teal-500)', border: 'none',
    color: 'var(--white)', fontSize: 12, fontWeight: 600,
    padding: '8px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(22,155,125,0.2)'
  },

  // UPDATED: Allow parent overlay to stretch full width so scrolling works natively
  filtersOverlay: {
    position: 'absolute', 
    top: 16, 
    left: 0,   // Stretch to left edge
    right: 0,  // Stretch to right edge
    zIndex: 1000,
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch', // Smooth momentum scrolling on iOS
  },

  // UPDATED: Padding handled inside the max-content flex box so it doesn't clip
  filters: { 
    display: 'flex', 
    gap: 8, 
    width: 'max-content',
    padding: '0 16px', // Pushes the start and end items off the screen edges
  },
  
  filterChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 14px',
    border: '1px solid rgba(15,45,28,0.06)',
    borderRadius: 999,
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(12px)',
    color: 'var(--ink-80)',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.25s ease',
    boxShadow: '0 4px 12px rgba(15,45,28,0.04)'
  },
  filterActive: {
    background: 'linear-gradient(135deg,#12806f,#1E6B3C)',
    color: 'white',
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 18px rgba(18,128,111,0.25)',
    border: 'none'
  },

  mapWrap: { 
    flex: 1,
    position: 'relative', 
    minHeight: 0, 
    borderTopLeftRadius: '28px',
    borderTopRightRadius: '28px',
    boxShadow: '0 -10px 30px rgba(15,45,28,0.08)',
    background: '#FAF8F3',
    overflow: 'hidden'
  },
  
  mapContainer: { 
    width: '100%', 
    height: '100%', 
    background: 'transparent',
    zIndex: 0
  },

  countBarOverlay: {
    position: 'absolute', 
    left: 16,
    right: 16,
    bottom: 96,
    zIndex: 1000,
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '12px 16px', 
    borderRadius: '16px',
    boxShadow: 'var(--shadow-md)'
  },

  countText: { fontSize: 13, fontWeight: 600, color: 'var(--teal-900)' },
  countSub: { fontSize: 12, color: 'var(--ink-60)' },

  needPanel: {
    position: 'absolute', bottom: 76, zIndex: 1100,
    width: '100%',
    background: 'var(--white)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
    maxHeight: '60vh', overflowY: 'auto', boxShadow: 'var(--shadow-lg)'
  },
  needCard: { padding: '1.5rem', position: 'relative' },
  closeBtn: {
    position: 'absolute', top: 16, right: 16,
    background: 'rgba(15,45,28,0.06)', border: 'none',
    width: 32, height: 32, borderRadius: '50%',
    fontSize: 18, cursor: 'pointer', color: 'var(--ink)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background 0.2s'
  },
  needHeader: { display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 12, paddingRight: 32 },
  needIcon: {
    width: 44,
    height: 44,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  needTitle: { fontSize: 16, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 },
  needOrg: { fontSize: 13, color: 'var(--ink-60)', marginTop: 4 },
  needBadgeRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 },
  badge: { fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 99 },
  needDetail: { fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: 16 },
  needMeta: {
    display: 'flex', gap: 14, fontSize: 12, color: 'var(--ink-60)',
    marginBottom: 20, flexWrap: 'wrap', fontWeight: 500
  },
  metaItem: { display: 'inline-flex', alignItems: 'center', gap: 5 },
  needActions: { display: 'flex', gap: 10 },
  
  primaryBtn: {
    flex: 1, padding: '12px', 
    background: 'linear-gradient(135deg,#169b7d,#1E6B3C)',
    boxShadow: '0 10px 20px rgba(22,155,125,0.18)',
    border: 'none',
    borderRadius: 'var(--radius-md)', color: 'var(--white)',
    fontSize: 14, fontWeight: 600, cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  secondaryBtn: {
    padding: '12px 16px', background: 'transparent',
    border: '1px solid rgba(15,45,28,0.1)', borderRadius: 'var(--radius-md)',
    color: 'var(--ink-80)', fontSize: 14, fontWeight: 500, cursor: 'pointer'
  },

  modalOverlay: {
    position: 'fixed', inset: 0, background: 'rgba(15,45,28,0.4)', backdropFilter: 'blur(4px)',
    zIndex: 1200, display: 'flex', alignItems: 'flex-end'
  },
  modal: {
    width: '100%', background: 'var(--surface-2)',
    borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
    padding: '2rem 1.5rem', position: 'relative',
    boxShadow: 'var(--shadow-lg)'
  },
  modalTitle: { fontSize: 18, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 },
  modalSub: { fontSize: 13, color: 'var(--ink-60)', marginBottom: 20, lineHeight: 1.5 },
  select: {
    width: '100%', padding: '12px 16px', marginBottom: 12,
    border: '1px solid rgba(15,45,28,0.1)', borderRadius: 'var(--radius-sm)',
    fontSize: 14, color: 'var(--ink)', background: 'var(--surface)', outline: 'none', display: 'block'
  },
  textarea: {
    width: '100%', padding: '12px 16px', marginBottom: 16,
    border: '1px solid rgba(15,45,28,0.1)', borderRadius: 'var(--radius-sm)',
    fontSize: 14, color: 'var(--ink)', background: 'var(--surface)',
    outline: 'none', resize: 'none', lineHeight: 1.6, display: 'block', fontFamily: 'var(--font-body)'
  },
  emptyOverlay: {
    position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',
    padding: 20, textAlign: 'center', fontSize: 15, fontWeight: 500, color: 'var(--ink-60)',
    background: 'rgba(247,244,238,0.85)', backdropFilter: 'blur(8px)', pointerEvents: 'none', zIndex: 500
  }
}