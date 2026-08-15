import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import InnerNav from '../components/ui/InnerNav'
import { useApp } from '../context/AppContext'
import { sendOtp as sendOtpRequest, verifyOtp as verifyOtpRequest } from '../services/authService'

export default function CitizenLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useApp()
  // Where to send the citizen after a successful login. If they got here
  // via ProtectedRoute (e.g. clicked "Report an Issue"), this is set to
  // wherever they were trying to go; otherwise default to /categories.
  const from = location.state?.from || '/categories'

  const [mobileNumber, setMobileNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  const sendOtp = async () => {
    setError('')
    setMessage('')

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    setLoading(true)

    const { ok, data } = await sendOtpRequest(mobileNumber)

    if (!ok) {
      setError(data.message || 'Unable to send OTP.')
      setLoading(false)
      return
    }

    setOtpSent(true)
    setCountdown(60)
    setMessage('OTP sent successfully to your mobile number.')
    setLoading(false)
  }

  const verifyOtp = async () => {
    setError('')
    setMessage('')

    if (!/^\d{6}$/.test(otp)) {
      setError('Please enter the 6-digit OTP.')
      return
    }

    setLoading(true)

    const { ok, data } = await verifyOtpRequest(mobileNumber, otp)

    if (!ok) {
      setError(data.message || 'Invalid or expired OTP.')
      setLoading(false)
      return
    }

    setMessage('Login successful!')

    // Persist the session so the citizen stays logged in across page
    // refreshes, and so ProtectedRoute lets them through from now on.
    login({
      mobileNumber,
      ...(data.user || {}),
      token: data.token || null,
    })

    setTimeout(() => {
      navigate(from)
    }, 700)

    setLoading(false)
  }

  const resendOtp = async () => {
    if (countdown > 0) return

    await sendOtp()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <InnerNav backTo="/" />

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div
          style={{
            maxWidth: '28rem',
            width: '100%',
            animation: 'fadeIn 0.5s ease-out forwards',
          }}
        >
          <div className="text-center mb-8">
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '1.875rem',
                fontWeight: 800,
              }}
            >
              Citizen Login
            </h2>

            <p
              style={{
                color: 'var(--muted)',
                marginTop: '0.5rem',
              }}
            >
              Login using your registered mobile number
            </p>
          </div>

          <div
            style={{
              background: 'var(--card)',
              border: '1.5px solid var(--border)',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 24px rgba(14,17,23,0.08)',
            }}
          >
            {!otpSent ? (
              <>
                <label
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                  }}
                >
                  Mobile Number
                </label>

                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      padding: '0.85rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.65rem',
                      background: 'var(--bg)',
                      fontWeight: 600,
                    }}
                  >
                    +91
                  </div>

                  <input
                    type="tel"
                    maxLength="10"
                    value={mobileNumber}
                    onChange={(e) =>
                      setMobileNumber(
                        e.target.value.replace(/\D/g, '')
                      )
                    }
                    placeholder="Enter mobile number"
                    style={{
                      flex: 1,
                      padding: '0.85rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.65rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      fontSize: '1rem',
                    }}
                  />
                </div>

                {error && (
                  <div
                    style={{
                      color: '#dc2626',
                      fontSize: '0.9rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  onClick={sendOtp}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    border: 'none',
                    borderRadius: '0.7rem',
                    background: 'var(--fg)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: loading ? 'wait' : 'pointer',
                  }}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>

                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: 'var(--muted)',
                    fontSize: '0.9rem',
                  }}
                >
                  Not registered yet?{' '}
                  <button
                    onClick={() => navigate('/citizen-register')}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--primary)',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Register
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <p
                    style={{
                      color: 'var(--muted)',
                      fontSize: '0.9rem',
                    }}
                  >
                    We sent a 6-digit OTP to
                  </p>

                  <strong>
                    +91 {mobileNumber}
                  </strong>
                </div>

                <label
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                  }}
                >
                  Enter OTP
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength="6"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ''))
                  }
                  placeholder="Enter 6-digit OTP"
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.65rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    letterSpacing: '0.4rem',
                    marginBottom: '1rem',
                  }}
                />

                {error && (
                  <div
                    style={{
                      color: '#dc2626',
                      fontSize: '0.9rem',
                      marginBottom: '1rem',
                      textAlign: 'center',
                    }}
                  >
                    {error}
                  </div>
                )}

                {message && (
                  <div
                    style={{
                      color: '#16a34a',
                      fontSize: '0.9rem',
                      marginBottom: '1rem',
                      textAlign: 'center',
                    }}
                  >
                    {message}
                  </div>
                )}

                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    border: 'none',
                    borderRadius: '0.7rem',
                    background: 'var(--fg)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: loading ? 'wait' : 'pointer',
                  }}
                >
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </button>

                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '1rem',
                  }}
                >
                  {countdown > 0 ? (
                    <span
                      style={{
                        color: 'var(--muted)',
                        fontSize: '0.9rem',
                      }}
                    >
                      Resend OTP in {countdown}s
                    </span>
                  ) : (
                    <button
                      onClick={resendOtp}
                      style={{
                        border: 'none',
                        background: 'none',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '1rem',
                  }}
                >
                  <button
                    onClick={() => {
                      setOtpSent(false)
                      setOtp('')
                      setError('')
                      setMessage('')
                    }}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--muted)',
                      cursor: 'pointer',
                    }}
                  >
                    Change mobile number
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}