export function Atmosphere({ variant = 'emerald' }) {
  const variants = {
    emerald: {
      a: 'rgba(22,155,125,0.18)',
      b: 'rgba(212,160,23,0.14)',
      c: 'rgba(255,255,255,0.78)'
    },
    sunrise: {
      a: 'rgba(245,216,122,0.34)',
      b: 'rgba(102,207,176,0.18)',
      c: 'rgba(255,246,226,0.82)'
    },
    gold: {
      a: 'rgba(212,160,23,0.22)',
      b: 'rgba(22,155,125,0.16)',
      c: 'rgba(255,253,240,0.9)'
    },
    community: {
      a: 'rgba(46,111,212,0.11)',
      b: 'rgba(212,160,23,0.18)',
      c: 'rgba(239,250,245,0.85)'
    }
  }
  const tone = variants[variant] || variants.emerald

  return (
    <div style={styles.atmosphere} aria-hidden="true">
      <div style={{ ...styles.orb, ...styles.orbOne, background: tone.a }} />
      <div style={{ ...styles.orb, ...styles.orbTwo, background: tone.b }} />
      <div style={{ ...styles.orb, ...styles.orbThree, background: tone.c }} />
      <div style={styles.geometry} />
    </div>
  )
}

export function Page({ children, variant = 'emerald', style }) {
  return (
    <main style={{ ...styles.page, ...style }}>
      <Atmosphere variant={variant} />
      {children}
    </main>
  )
}

export function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <header style={styles.header} className="animate-fadeUp">
      <div>
        {eyebrow && <div style={styles.eyebrow}>{eyebrow}</div>}
        <h1 style={styles.title}>{title}</h1>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>
      {action}
    </header>
  )
}

export function GlassCard({ children, style, className = '' }) {
  return (
    <section style={{ ...styles.card, ...style }} className={`glass-card ${className}`.trim()}>
      {children}
    </section>
  )
}

export function AnimatedSection({ children, delay = 0, style }) {
  return (
    <div className="animate-fadeUp" style={{ animationDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

export function GradientButton({ children, onClick, style, disabled, type = 'button' }) {
  return (
    <button
      type={type}
      style={{ ...styles.gradientButton, ...(disabled ? styles.disabled : {}), ...style }}
      onClick={onClick}
      disabled={disabled}
      className="soft-interaction"
    >
      {children}
    </button>
  )
}

export function FloatingActionButton({ children, onClick, style }) {
  return (
    <button style={{ ...styles.fab, ...style }} onClick={onClick} className="soft-interaction">
      {children}
    </button>
  )
}

export function SoftModal({ children, onClose }) {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()} className="animate-fadeUp">
        <button style={styles.close} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  )
}

const styles = {
  page: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
    background: 'var(--bg-gradient)',
    color: 'var(--ink)'
  },
  atmosphere: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  },
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(34px)',
    transform: 'translateZ(0)',
    animation: 'softFloat 7s ease-in-out infinite'
  },
  orbOne: { width: 210, height: 210, top: -72, right: -56 },
  orbTwo: { width: 260, height: 260, bottom: 90, left: -120, animationDelay: '1.2s' },
  orbThree: { width: 170, height: 170, top: '36%', right: -72, animationDelay: '2s' },
  geometry: {
    position: 'absolute',
    inset: 0,
    opacity: 0.045,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='88' height='88' viewBox='0 0 88 88' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23064b40' stroke-width='1'%3E%3Cpath d='M44 4l16 24 24 16-24 16-16 24-16-24L4 44l24-16L44 4z'/%3E%3Cpath d='M44 22l10 12 12 10-12 10-10 12-10-12-12-10 12-10 10-12z'/%3E%3C/g%3E%3C/svg%3E")`
  },
  header: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    padding: '1.2rem 1.25rem 0.8rem',
    flexShrink: 0
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--teal-700)',
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    marginBottom: 6
  },
  title: {
    fontFamily: 'var(--font-arabic)',
    fontSize: 25,
    lineHeight: 1.1,
    color: 'var(--ink)',
    fontWeight: 700
  },
  subtitle: {
    marginTop: 7,
    fontSize: 13,
    lineHeight: 1.55,
    color: 'var(--ink-60)',
    maxWidth: 300
  },
  card: {
    position: 'relative',
    borderRadius: 28,
    background: 'rgba(255,255,255,0.72)',
    border: '1px solid rgba(255,255,255,0.72)',
    boxShadow: '0 18px 45px rgba(15,45,28,0.09)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)'
  },
  gradientButton: {
    border: 'none',
    borderRadius: 22,
    padding: '13px 18px',
    background: 'linear-gradient(135deg, #169b7d, #1E6B3C)',
    color: 'var(--white)',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 14px 28px rgba(22,155,125,0.22)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease'
  },
  disabled: { opacity: 0.48, cursor: 'default' },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    border: '1px solid rgba(255,255,255,0.72)',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.92), rgba(239,250,245,0.78))',
    color: 'var(--teal-800)',
    boxShadow: '0 14px 30px rgba(15,45,28,0.14)',
    backdropFilter: 'blur(18px)',
    cursor: 'pointer',
    fontSize: 22,
    fontWeight: 700,
    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'flex-end',
    background: 'rgba(16,34,31,0.24)',
    backdropFilter: 'blur(10px)'
  },
  modal: {
    position: 'relative',
    width: '100%',
    padding: '2rem 1.5rem max(2rem, env(safe-area-inset-bottom))',
    borderRadius: '32px 32px 0 0',
    background: 'rgba(255,255,255,0.9)',
    border: '1px solid rgba(255,255,255,0.8)',
    boxShadow: '0 -24px 60px rgba(15,45,28,0.16)',
    backdropFilter: 'blur(24px)'
  },
  close: {
    position: 'absolute',
    top: 16,
    right: 18,
    width: 34,
    height: 34,
    borderRadius: 17,
    border: 'none',
    background: 'rgba(16,34,31,0.07)',
    color: 'var(--ink)',
    cursor: 'pointer',
    fontSize: 19
  }
}
