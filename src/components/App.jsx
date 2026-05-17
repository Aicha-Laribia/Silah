import { useApp } from '../hooks/useApp'
import LoginScreen from './auth/LoginScreen'
import DailyScreen from './screens/DailyScreen'
import MapScreen from './screens/MapScreen'
import ZakatScreen from './screens/ZakatScreen'
import EventsScreen from './screens/EventsScreen'
import ProfileScreen from './screens/ProfileScreen'
import BottomNav from './layout/BottomNav'

function AppContent() {
  const { activeTab, locale, toggleLocale } = useApp()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', minHeight: '100vh', position: 'relative' }}>
      <div style={styles.langWrap}>
        <button style={styles.langBtn} onClick={toggleLocale}>
          {locale === 'en' ? 'العربية' : 'English'}
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
        {activeTab === 'map'     && <MapScreen />}
        {activeTab === 'zakat'   && <ZakatScreen />}
        {activeTab === 'events'  && <EventsScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </div>
      <BottomNav />
    </div>
  )
}

export default function App() {
  const { screen, locale } = useApp()

  if (screen === 'login')  return <div dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--surface)' }}><LoginScreen /></div>
  if (screen === 'daily')  return <div dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--surface)' }}><DailyScreen /></div>
  if (screen === 'app')    return <div dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{ height: '100vh', minHeight: '100vh', background: 'var(--surface)' }}><AppContent /></div>

  // splash / default → go to login
  return <div dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--surface)' }}><LoginScreen /></div>
}

const styles = {
  langBtn: {
    padding: '9px 13px', borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.82)', background: 'rgba(255,255,255,0.74)',
    color: 'var(--teal-900)', fontSize: 12, fontWeight: 800, cursor: 'pointer',
    boxShadow: '0 12px 24px rgba(15,45,28,0.11)',
    backdropFilter: 'blur(18px)'
  },
  langWrap: {
    position: 'absolute',
    top: 12,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 80,
    pointerEvents: 'auto'
  }
}
