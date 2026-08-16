import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InnerNav from '../components/ui/InnerNav'
import { useApp } from '../context/AppContext'
import { registerCitizen } from '../services/authService'

export default function CitizenRegister() {
  const navigate = useNavigate()
  const { login } = useApp()

  const [form, setForm] = useState({
    name: '',
    mobileNumber: '',
    address: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    if (!form.name || !form.mobileNumber || !form.address) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    const { ok, data } = await registerCitizen(form)

    if (!ok) {
      setError(data.message || 'Registration failed')
      setLoading(false)
      return
    }

    setSuccess('Registration successful!')

    // Log the citizen in immediately after registering so they don't
    // have to go through OTP login separately right after signing up.
    login({
      mobileNumber: form.mobileNumber,
      name: form.name,
      ...(data.user || {}),
      token: data.token || null,
    })

    setTimeout(() => {
      navigate('/categories')
    }, 1000)

    setLoading(false)
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
                fontFamily: "'Sora',sans-serif",
                fontSize: '1.875rem',
                fontWeight: 800,
              }}
            >
              Create Your Account
            </h2>

            <p
              style={{
                color: 'var(--muted)',
                marginTop: '0.5rem',
              }}
            >
              Register as a citizen to report civic issues
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            {/* Name */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem',
                  border: '1.5px solid var(--border)',
                  borderRadius: '0.75rem',
                  background: 'var(--card)',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>

            {/* Mobile */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobileNumber"
                value={form.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                maxLength="10"
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem',
                  border: '1.5px solid var(--border)',
                  borderRadius: '0.75rem',
                  background: 'var(--card)',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>

            {/* Address */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Address
              </label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your address"
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem',
                  border: '1.5px solid var(--border)',
                  borderRadius: '0.75rem',
                  background: 'var(--card)',
                  fontFamily: 'inherit',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  background: '#fee2e2',
                  color: '#b91c1c',
                  fontSize: '0.9rem',
                }}
              >
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  background: '#dcfce7',
                  color: '#15803d',
                  fontSize: '0.9rem',
                }}
              >
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                border: 'none',
                borderRadius: '0.75rem',
                background: 'var(--fg)',
                color: 'white',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'none',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={() => document.body.classList.add('cursor-hover')}
              onMouseLeave={() => document.body.classList.remove('cursor-hover')}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}