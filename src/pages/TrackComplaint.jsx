import { useState } from 'react'
import InnerNav from '../components/ui/InnerNav'

/**
 * Mock complaint records, keyed by ID. In production this would come from
 * an API call (e.g. GET /api/complaints/:id) — swap `findComplaint` for a
 * fetch call and this component keeps working unchanged.
 */
const complaints = [
  {
    id: 'CS-2024-0391',
    title: 'Large pothole causing tyre damage near bus stop',
    category: '🛣️ Road Issues',
    dept: 'Municipal Road Dept',
    priority: '🟠 High Priority',
    location: 'MG Road, Near Central Bus Stand',
    submitted: 'Apr 10, 2024',
    classification: 'Road Issues — Pothole',
    priorityScore: 'High (8.2 / 10)',
    duplicateCheck: '✓ Unique',
    estResolution: '2–3 Working Days',
    confidence: 92,
    remarks: 'Field team confirmed pothole depth of ~4 inches on inspection. Patch material has been ordered and repair is scheduled within 48 hours. Temporary caution markers placed at the site in the meantime.',
    timeline: [
      { dot: '✅', title: 'Complaint Submitted', time: 'Apr 10, 2024 · 09:14 AM', done: true },
      { dot: '🧠', title: 'AI Classified & Routed', time: 'Apr 10, 2024 · 09:14 AM (automated)', done: true },
      { dot: '🏛️', title: 'Received by Municipal Road Dept', time: 'Apr 10, 2024 · 10:02 AM', done: true },
      { dot: '👷', title: 'Field Team Assigned — In Progress', time: 'Apr 11, 2024 · 08:30 AM', done: true, active: true },
      { dot: '⏳', title: 'Resolution & Closure', time: 'Expected Apr 13, 2024', done: false },
    ],
  },
  {
    id: 'CS-2024-0412',
    title: 'Waterlogging outside Shivaji Nagar market after rain',
    category: '🌧️ Drainage Problems',
    dept: 'Drainage Department',
    priority: '🔴 Critical Priority',
    location: 'Shivaji Nagar Market Road',
    submitted: 'Apr 12, 2024',
    classification: 'Drainage — Waterlogging',
    priorityScore: 'Critical (9.4 / 10)',
    duplicateCheck: '⚠ 3 similar reports merged',
    estResolution: '1 Working Day',
    confidence: 88,
    remarks: 'Blocked storm drain identified as the root cause. Sanitation crew dispatched to clear debris; drainage department to inspect pipe alignment once water recedes.',
    timeline: [
      { dot: '✅', title: 'Complaint Submitted', time: 'Apr 12, 2024 · 07:40 AM', done: true },
      { dot: '🧠', title: 'AI Classified & Routed', time: 'Apr 12, 2024 · 07:40 AM (automated)', done: true },
      { dot: '🏛️', title: 'Received by Drainage Department', time: 'Apr 12, 2024 · 08:15 AM', done: true, active: true },
      { dot: '👷', title: 'Field Team Assigned — In Progress', time: 'Pending', done: false },
      { dot: '⏳', title: 'Resolution & Closure', time: 'Expected Apr 13, 2024', done: false },
    ],
  },
  {
    id: 'CS-2024-0455',
    title: 'Garbage bins overflowing for 4 days near Sector 12 park',
    category: '🗑️ Garbage / Sanitation',
    dept: 'Sanitation Department',
    priority: '🟡 Medium Priority',
    location: 'Sector 12 Park Entrance',
    submitted: 'Apr 14, 2024',
    classification: 'Sanitation — Overflow',
    priorityScore: 'Medium (6.1 / 10)',
    duplicateCheck: '✓ Unique',
    estResolution: '1–2 Working Days',
    confidence: 95,
    remarks: 'Resolved — collection truck rerouted to cover this stop twice daily going forward. Bins cleared and area sanitized on Apr 15.',
    timeline: [
      { dot: '✅', title: 'Complaint Submitted', time: 'Apr 14, 2024 · 06:55 PM', done: true },
      { dot: '🧠', title: 'AI Classified & Routed', time: 'Apr 14, 2024 · 06:55 PM (automated)', done: true },
      { dot: '🏛️', title: 'Received by Sanitation Department', time: 'Apr 14, 2024 · 07:30 PM', done: true },
      { dot: '👷', title: 'Field Team Assigned — Collected', time: 'Apr 15, 2024 · 09:10 AM', done: true },
      { dot: '✅', title: 'Resolution & Closure', time: 'Apr 15, 2024 · 11:00 AM', done: true, active: true },
    ],
  },
]

const findComplaint = (rawId) => {
  const id = rawId.trim().toUpperCase()
  return complaints.find((c) => c.id.toUpperCase() === id) || null
}

export default function TrackComplaint() {
  const [trackId, setTrackId] = useState('')
  const [complaint, setComplaint] = useState(complaints[0]) // demo shown by default
  const [notFound, setNotFound] = useState(false)
  const hov = (on) => document.body.classList.toggle('cursor-hover', on)

  const handleTrack = () => {
    if (!trackId.trim()) return
    const found = findComplaint(trackId)
    if (found) {
      setComplaint(found)
      setNotFound(false)
    } else {
      setComplaint(null)
      setNotFound(true)
    }
  }

  const loadSample = (id) => {
    setTrackId(id)
    setComplaint(findComplaint(id))
    setNotFound(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <InnerNav backTo="/" />
      <div style={{ flex: 1, padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '36rem', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem', animation: 'fadeIn 0.5s ease-out forwards' }}>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.4rem' }}>Track Your Complaint</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Enter your complaint ID or see a sample complaint below</p>
          </div>

          {/* Search bar */}
          <div className="flex gap-3 mb-3" style={{ animation: 'fadeIn 0.5s ease-out 0.1s both' }}>
            <input
              type="text"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              placeholder="e.g. CS-2024-0391"
              style={{ flex: 1, border: '1.5px solid var(--border)', borderRadius: '0.875rem', padding: '0.9rem 1.1rem', fontFamily: "'DM Sans',sans-serif", fontSize: '1rem', color: 'var(--fg)', background: 'var(--card)', outline: 'none', cursor: 'text' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <button
              onClick={handleTrack}
              style={{ padding: '0 1.5rem', background: 'var(--fg)', color: '#fff', border: 'none', borderRadius: '0.875rem', fontFamily: "'Sora',sans-serif", fontWeight: 700, cursor: 'none', flexShrink: 0, fontSize: '0.9rem' }}
              onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}
            >
              Track →
            </button>
          </div>

          {/* Sample IDs */}
          <div className="flex flex-wrap gap-2 mb-8" style={{ animation: 'fadeIn 0.5s ease-out 0.15s both' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginRight: '0.25rem', alignSelf: 'center' }}>Try:</span>
            {complaints.map((c) => (
              <button
                key={c.id}
                onClick={() => loadSample(c.id)}
                style={{ padding: '0.3rem 0.75rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700, fontFamily: "'Sora',sans-serif", background: complaint?.id === c.id ? 'var(--primary)' : 'rgba(26,158,143,.1)', color: complaint?.id === c.id ? '#fff' : 'var(--primary)', border: 'none', cursor: 'none' }}
                onMouseEnter={() => hov(true)} onMouseLeave={() => hov(false)}
              >
                {c.id}
              </button>
            ))}
          </div>

          {notFound && (
            <div style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: '1rem', padding: '2rem 1.5rem', textAlign: 'center', animation: 'fadeIn 0.4s ease-out forwards' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🔍</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                No complaint found for "{trackId}"
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                Double-check the ID, or tap one of the sample IDs above.
              </p>
            </div>
          )}

          {complaint && (
            <div style={{ animation: 'fadeIn 0.5s ease-out 0.2s both' }}>
              {/* Hero card */}
              <div style={{ background: 'linear-gradient(135deg,#1a2332,#0e1117)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.25rem', color: '#fff' }}>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,.45)', fontFamily: "'Sora',sans-serif", fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  COMPLAINT ID · {complaint.id}
                </div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  {complaint.title}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[
                    { label: complaint.category, bg: 'rgba(74,144,217,.2)', color: '#93c5fd' },
                    { label: complaint.dept, bg: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.7)' },
                    { label: complaint.priority, bg: 'rgba(240,121,42,.2)', color: '#fb923c' },
                    { label: '🧠 AI Classified', bg: 'rgba(26,158,143,.2)', color: '#4ecdc4' },
                  ].map((tag) => (
                    <span key={tag.label} style={{ padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700, fontFamily: "'Sora',sans-serif", background: tag.bg, color: tag.color }}>
                      {tag.label}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,.5)' }}>📍 {complaint.location} · Submitted {complaint.submitted}</div>
              </div>

              {/* AI Analysis */}
              <div style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div className="flex items-center gap-2 mb-4" style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--fg)' }}>
                  <span>🧠</span> AI Analysis
                </div>
                {[
                  { label: 'Classification', val: complaint.classification, color: 'var(--primary)' },
                  { label: 'Priority Score', val: complaint.priorityScore, color: 'var(--orange)' },
                  { label: 'Duplicate Check', val: complaint.duplicateCheck, color: 'var(--green)' },
                  { label: 'Estimated Resolution', val: complaint.estResolution, color: null },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 500 }}>{row.label}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: "'Sora',sans-serif", color: row.color || 'var(--fg)' }}>{row.val}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2">
                  <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 500 }}>Confidence</span>
                  <div className="flex items-center gap-2">
                    <div className="conf-bar"><div className="conf-fill" style={{ width: `${complaint.confidence}%` }} /></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: "'Sora',sans-serif" }}>{complaint.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div className="flex items-center gap-2 mb-3" style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--fg)' }}>
                  <span>📝</span> Department Remarks
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                  {complaint.remarks}
                </p>
              </div>

              {/* Timeline */}
              <div style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: '1rem', padding: '1.25rem' }}>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Status Timeline</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {complaint.timeline.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', position: 'relative', paddingBottom: i < complaint.timeline.length - 1 ? '1.25rem' : 0, opacity: !item.done && !item.active ? 0.4 : 1 }}>
                      {i < complaint.timeline.length - 1 && (
                        <div style={{ position: 'absolute', left: 16, top: 32, bottom: 0, width: 2, background: 'var(--border)' }} />
                      )}
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: item.active ? 'rgba(26,158,143,.15)' : item.done ? 'rgba(26,158,143,.08)' : 'var(--bg2)', border: item.active ? '2px solid var(--primary)' : '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0, zIndex: 1 }}>
                        {item.dot}
                      </div>
                      <div style={{ paddingTop: '0.2rem' }}>
                        <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '0.88rem', color: item.active ? 'var(--primary)' : 'var(--fg)' }}>{item.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.1rem' }}>{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
