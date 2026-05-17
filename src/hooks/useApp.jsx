import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [screen, setScreen] = useState('splash') // splash | login | daily | app
  const [activeTab, setActiveTab] = useState('map')
  const [selectedNeed, setSelectedNeed] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showZakat, setShowZakat] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [locale, setLocale] = useState('en')

  const login = (userData) => {
    setUser(userData)
    setScreen('daily')
  }

  const enterApp = () => setScreen('app')
  const toggleLocale = () => setLocale((current) => (current === 'en' ? 'ar' : 'en'))

  return (
    <AppContext.Provider value={{
      user, login,
      screen, setScreen, enterApp,
      activeTab, setActiveTab,
      selectedNeed, setSelectedNeed,
      selectedEvent, setSelectedEvent,
      showZakat, setShowZakat,
      notifications, setNotifications,
      locale, setLocale, toggleLocale
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)