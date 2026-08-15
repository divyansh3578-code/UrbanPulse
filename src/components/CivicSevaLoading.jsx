import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";

export default function CivicSevaLoading({ onComplete }) {
  const globeRef = useRef(null);

  useEffect(() => {
    const completeTimer = window.setTimeout(() => {
      onComplete?.();
    }, 3200);

    if (!globeRef.current) return;

    const effect = GLOBE({
      el: globeRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x3ba46a,
      color2: 0xd9be7b,
      size: 0.8,
      backgroundColor: 0x19191a,
    });

    return () => {
      window.clearTimeout(completeTimer);
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        .civicseva-root{
          --bg: #f0f1f3;
          --bg2: #e8eaed;
          --fg: #f4cd6b;
          --card: #ffffff;
          --primary: #1a9e8f;
          --primary-light: #22c5b2;
          --orange: #f0792a;
          --blue: #4a90d9;
          --muted: #7a8799;
          --border: #dde1e7;
        }

        .civicseva-root *{ box-sizing:border-box; margin:0; padding:0; }
        .civicseva-root{
          height:100%;
          min-height:100vh;
        background: #ffffff;
          color: var(--fg);
          font-family: 'DM Sans', system-ui, sans-serif;
          display:flex; align-items:center; justify-content:center;
          overflow:hidden;
          position:relative;
        }

        /* faint dot grid, same texture language as .hero-bg-grid */
        .ls-grid{
          z-index: 0;
          position:absolute; inset:0;
          background-image: radial-gradient(circle, var(--border) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: radial-gradient(ellipse 80% 65% at 50% 45%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 65% at 50% 45%, black 30%, transparent 80%);
          opacity:0.7;
        }

        .ls-stage{
          position:relative;
          z-index:1;
          width:min(90vw, 480px);
          display:flex; flex-direction:column; align-items:center;
          animation: ls-exit 0.5s ease-in 2.7s forwards;
        }

        .ls-eyebrow{
          display:flex; align-items:center; gap:8px;
          color: var(--muted);
          font-family:'Sora', sans-serif;
          font-weight:700;
          font-size:0.75rem;
          letter-spacing:0.1em;
          text-transform:uppercase;
          opacity:0;
          animation: ls-fadeIn 0.5s ease-out 0.1s forwards;
        }
        .ls-dot{
          width:6px; height:6px; border-radius:50%;
          background: var(--primary);
          animation: ls-pulse 1.8s infinite;
        }

        .ls-word{
          font-family:'Sora', sans-serif;
          font-weight:800;
          font-size: clamp(2.4rem, 7vw, 3.2rem);
          letter-spacing:-0.02em;
          margin-top:0.6rem;
          opacity:0;
          animation: ls-fadeUp 0.9s ease-out 0.25s forwards;
        }
        .ls-word,
.ls-word span {
  color: #efdbbbdd;
}
        /* ---- pills: reports coming in, routed one by one ---- */
        .ls-pills{
          width:100%;
          display:flex; flex-direction:column; gap:10px;
          margin-top:2.4rem;
        }
        .ls-pill{
          position:relative;
          display:flex; align-items:center; justify-content:space-between;
          padding:11px 18px;
          border-radius:999px;
          color:#fff;
          font-family:'Sora', sans-serif;
          font-weight:700;
          font-size:0.82rem;
          opacity:0;
          transform: translateX(-14px);
          animation: ls-pillIn 0.45s cubic-bezier(.2,.8,.3,1) forwards;
          box-shadow: 0 8px 20px rgba(14,17,23,0.1);
        }
        .ls-pill .dept{
          font-weight:500;
          opacity:0.8;
          font-size:0.72rem;
          font-family:'DM Sans', sans-serif;
        }
        .ls-pill .check{
          display:inline-flex; align-items:center; justify-content:center;
          width:18px; height:18px;
          border-radius:50%;
          background:rgba(255,255,255,0.25);
          margin-left:10px;
          flex-shrink:0;
          transform:scale(0);
          animation: ls-checkPop 0.3s ease-out forwards;
        }
        .ls-pill .check svg{ width:10px; height:10px; }

        .ls-pill.p1{ animation-delay:0.35s; }
        .ls-pill.p1 .check{ animation-delay:1.05s; }
        .ls-pill.p2{ animation-delay:0.62s; }
        .ls-pill.p2 .check{ animation-delay:1.32s; }
        .ls-pill.p3{ animation-delay:0.89s; }
        .ls-pill.p3 .check{ animation-delay:1.59s; }
        .ls-pill.p4{ animation-delay:1.16s; }
        .ls-pill.p4 .check{ animation-delay:1.86s; }

        /* ---- progress ---- */
        .ls-bar-track{
          width:100%;
          height:4px;
          border-radius:999px;
          background: var(--border);
          margin-top:2rem;
          overflow:hidden;
          opacity:0;
          animation: ls-fadeIn 0.4s ease-out 1.9s forwards;
        }
        .ls-bar-fill{
          height:100%;
          width:0%;
          border-radius:999px;
          background: var(--primary);
          animation: ls-barFill 0.7s ease-in 2.05s forwards;
        }
.civicseva-root{
  height:100%;
  min-height:100vh;
  background: #ffffff;
  color: var(--fg);
  font-family: 'DM Sans', system-ui, sans-serif;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  position:relative;
}
  .civicseva-root canvas{
  position:absolute !important;
  inset:0;
  z-index:0 !important;
}
        .ls-status{
          margin-top:0.85rem;
          font-size:0.78rem;
          color: var(--muted);
          font-weight:500;
          opacity:0;
          animation: ls-fadeIn 0.4s ease-out 2.15s forwards;
        }

        @keyframes ls-fadeIn{ from{opacity:0;} to{opacity:1;} }
        @keyframes ls-fadeUp{ from{opacity:0; transform:translateY(14px);} to{opacity:1; transform:translateY(0);} }
        @keyframes ls-pillIn{ to{ opacity:1; transform:translateX(0); } }
        @keyframes ls-checkPop{ to{ transform:scale(1); } }
        @keyframes ls-barFill{ to{ width:100%; } }
        @keyframes ls-pulse{
          0%,100%{ opacity:1; transform:scale(1); }
          50%{ opacity:0.5; transform:scale(1.5); }
        }
        @keyframes ls-exit{ to{ opacity:0; transform:scale(0.97); } }

        @media (prefers-reduced-motion: reduce){
          .civicseva-root *{ animation-duration:0.01s !important; animation-delay:0s !important; }
        }
      `}</style>

      <div ref={globeRef} className="civicseva-root">
        <div className="ls-grid"></div>

        <div className="ls-stage">
          <div className="ls-eyebrow"><span className="ls-dot"></span>Civic Tech Platform</div>
          <h1 className="ls-word">Civic<span>Seva</span></h1>

          <div className="ls-pills">
            <div className="ls-pill p1" style={{ background: "var(--primary)", color: "#ffe9b3" }}>
              Pothole reported <span className="dept">→ Municipal Road Dept</span>
              <span className="check">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffe9b3" strokeWidth="3">
                  <path d="M5 12.5 L10 17 L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="ls-pill p2" style={{ background: "var(--orange)" }}>
              Garbage overflow <span className="dept">→ Sanitation Dept</span>
              <span className="check">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                  <path d="M5 12.5 L10 17 L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="ls-pill p3" style={{ background: "var(--blue)" }}>
              Drainage issue <span className="dept">→ Drainage Dept</span>
              <span className="check">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                  <path d="M5 12.5 L10 17 L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="ls-pill p4" style={{ background: "#158577" }}>
              Water leakage <span className="dept">→ Water Supply Dept</span>
              <span className="check">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                  <path d="M5 12.5 L10 17 L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>

          <div className="ls-bar-track"><div className="ls-bar-fill"></div></div>
          <p className="ls-status">Routing complaints to departments…</p>
        </div>
      </div>
    </>
  );
}