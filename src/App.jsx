import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import CustomCursor from './components/ui/CustomCursor'
import CivicSevaLoading from './components/CivicSevaLoading'
import ProtectedRoute from './components/auth/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import CitizenRegister from './pages/CitizenRegister'
import Categories from './pages/Categories'
import Channel from './pages/Channel'
import ReportForm from './pages/ReportForm'
import Success from './pages/Success'
import TrackComplaint from './pages/TrackComplaint'
import GovLogin from './pages/GovLogin'
import Dashboard from './pages/Dashboard'
import IssueDetail from './pages/IssueDetail'
import CitizenLogin from './pages/CitizenLogin'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <AppProvider>
      {isLoading ? (
        <CivicSevaLoading onComplete={() => setIsLoading(false)} />
      ) : (
        <BrowserRouter>
        <CustomCursor />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/citizen-register" element={<CitizenRegister />} />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/channel"
            element={
              <ProtectedRoute>
                <Channel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
          <Route path="/track" element={<TrackComplaint />} />
          <Route path="/gov-login" element={<GovLogin />} />
          <Route path="/dashboard/:dept" element={<Dashboard />} />
          <Route path="/issue/:id" element={<IssueDetail />} />
          <Route path="/citizen-login" element={<CitizenLogin />} />
        </Routes>

        </BrowserRouter>
      )}
    </AppProvider>
  )
}