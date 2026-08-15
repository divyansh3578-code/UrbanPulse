const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3100'

// Every function here returns { ok, data } instead of throwing, so callers
// can just check `ok` and read `data.message` on failure without a
// try/catch around every call site.
async function request(path, body) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return { ok: false, data }
    }

    return { ok: true, data }
  } catch (err) {
    return { ok: false, data: { message: 'Unable to connect to the server.' } }
  }
}

export function sendOtp(mobileNumber) {
  return request('/api/auth/send-otp', { mobileNumber })
}

export function verifyOtp(mobileNumber, otp) {
  return request('/api/auth/verify-otp', { mobileNumber, otp })
}

export function registerCitizen({ name, mobileNumber, address }) {
  return request('/api/auth/register', { name, mobileNumber, address })
}
