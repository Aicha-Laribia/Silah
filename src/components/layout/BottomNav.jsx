import { useApp } from '../../hooks/useApp'
import { t } from '../../data/translations'
import { ThemedIcon, navIcons } from '../ui/ThemedIcon'

const tabs = [
  { id: 'map', key: 'nav.map' },
  { id: 'zakat', key: 'nav.zakat' },
  { id: 'events', key: 'nav.events' },
  { id: 'profile', key: 'nav.profile' },
]

export default function BottomNav() {
  const { activeTab, setActiveTab, locale } = useApp()

  return (
    <div style={styles.wrap}>
      <nav style={styles.nav} aria-label="Primary navigation">
        {tabs.map(tab => {
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              style={{ ...styles.tab, ...(active ? styles.tabActive : {}) }}
              onClick={() => setActiveTab(tab.id)}
              className="soft-interaction"
            >
              <span style={{ ...styles.icon, ...(active ? styles.iconActive : {}) }}>
                <ThemedIcon icon={navIcons[tab.id]} size={19} strokeWidth={active ? 2.4 : 2.1} />
              </span>
              <span style={{ ...styles.label, ...(active ? styles.labelActive : {}) }}>
                {t(locale, tab.key)}
              </span>
              {active && <span style={styles.activeGlow} />}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

const styles = {
  wrap: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 'max(14px, env(safe-area-inset-bottom))',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    padding: '0 1rem',
    pointerEvents: 'none'
  },
  nav: {
    pointerEvents: 'auto',
    width: 'min(430px, 100%)',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 6,
    padding: 8,
    borderRadius: 32,
    background: 'rgba(255,255,255,0.78)',
    border: '1px solid rgba(255,255,255,0.82)',
    boxShadow: '0 20px 48px rgba(15,45,28,0.16)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)'
  },
  tab: {
    position: 'relative',
    minHeight: 54,
    border: 'none',
    borderRadius: 24,
    background: 'transparent',
    color: 'var(--ink-60)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    overflow: 'hidden',
    transition: 'background 0.28s ease, color 0.28s ease, transform 0.28s ease'
  },
  tabActive: {
    background: 'linear-gradient(135deg, rgba(22,155,125,0.96), rgba(30,107,60,0.94))',
    color: 'var(--white)',
    boxShadow: '0 12px 24px rgba(22,155,125,0.25)'
  },
  icon: {
    position: 'relative',
    zIndex: 1,
    fontSize: 20,
    transition: 'transform 0.32s cubic-bezier(0.22,1,0.36,1)'
  },
  iconActive: {
    transform: 'translateY(-2px) scale(1.08)'
  },
  label: {
    position: 'relative',
    zIndex: 1,
    fontSize: 10,
    fontWeight: 700,
    color: 'var(--ink-60)',
    transition: 'color 0.25s ease'
  },
  labelActive: {
    color: 'rgba(255,255,255,0.92)'
  },
  activeGlow: {
    position: 'absolute',
    inset: -18,
    background: 'radial-gradient(circle, rgba(255,255,255,0.32), transparent 62%)',
    animation: 'glowPulse 3.6s ease-in-out infinite'
  }
}
