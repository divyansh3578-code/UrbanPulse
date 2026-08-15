import { createContext, useContext, useState, useCallback } from 'react'
import { initialReports } from '../data/reportStore'

const AppContext = createContext(null)
const SESSION_KEY = 'citysync_citizen_session'

function loadStoredSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AppProvider({ children }) {
  const [reports, setReports] = useState(initialReports)
  const [nextId, setNextId] = useState(7)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [activeDept, setActiveDept] = useState(null)
  const [session, setSession] = useState(loadStoredSession)

  // Call after a successful OTP verification (or registration) to mark the
  // citizen as logged in. `user` can be whatever the backend returns
  // (mobileNumber, name, token, etc) — it's stored as-is.
  const login = useCallback((user) => {
    setSession(user)
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    } catch {
      // localStorage unavailable (private browsing etc) — session still
      // works for this tab via state, just won't survive a refresh.
    }
  }, [])

  const logout = useCallback(() => {
    setSession(null)
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const addReport = useCallback(
    ({ description, location, phone, channel, photo }) => {
      const newReport = {
        id: nextId,
        categoryId: selectedCategory.id,
        title: selectedCategory.title,
        icon: selectedCategory.icon,
        department: selectedCategory.department,
        description: description || `(Reported via ${channel})`,
        location: location || 'Location not provided',
        photo: photo || null,
        phone: phone ? `+91 ${phone}` : '',
        status: 'Pending',
        date: new Date().toISOString().slice(0, 10),
        channel,
      }
      setReports((prev) => [...prev, newReport])
      setNextId((n) => n + 1)
      return newReport
    },
    [nextId, selectedCategory]
  )

  const updateReportStatus = useCallback((id, newStatus) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    )
  }, [])

  return (
    <AppContext.Provider
      value={{
        reports,
        selectedCategory,
        setSelectedCategory,
        activeDept,
        setActiveDept,
        addReport,
        updateReportStatus,
        session,
        isCitizenLoggedIn: !!session,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}