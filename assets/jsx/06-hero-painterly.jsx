// Painterly hero, abstract gold + turquoise + navy gestural background, in the
// spirit of Sabrina Goria's work. Doubles as the POSTER FRAME for the cinematic
// background video on the Home hero (loop of Sabrina applying gold leaf / texture).

function PainterlyHero({ children, height = '780px', cinematic = true, label }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height,
      overflow: 'hidden', background: '#0d1a2c',
    }}>
      {/* Layered SVG painting */}
      <svg
        viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ph-teal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1d2a4d" />
            <stop offset=".4" stopColor="#1f5b66" />
            <stop offset=".8" stopColor="#0e2b3a" />
            <stop offset="1" stopColor="#0a1426" />
          </linearGradient>
          <linearGradient id="ph-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a87422" />
            <stop offset=".5" stopColor="#d9b463" />
            <stop offset="1" stopColor="#8b5e1d" />
          </linearGradient>
          <linearGradient id="ph-goldSoft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e8c87a" />
            <stop offset="1" stopColor="#a87422" />
          </linearGradient>
          <linearGradient id="ph-turq" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2c7c84" />
            <stop offset="1" stopColor="#155460" />
          </linearGradient>
          <filter id="ph-blur"><feGaussianBlur stdDeviation="6" /></filter>
          <filter id="ph-blurBig"><feGaussianBlur stdDeviation="22" /></filter>
        </defs>

        <rect width="1600" height="800" fill="url(#ph-teal)" />

        <path d="M -200 320 Q 400 220 900 380 T 1800 340 L 1800 800 L -200 800 Z"
              fill="url(#ph-turq)" opacity=".55" filter="url(#ph-blurBig)" />

        <path d="M -100 80 Q 220 40 380 180 Q 440 320 280 460 Q 120 580 60 460 Q -20 280 -100 80 Z"
              fill="url(#ph-gold)" opacity=".82" filter="url(#ph-blur)" />

        <path d="M 1100 120 Q 1320 60 1520 200 Q 1640 360 1480 520 Q 1280 660 1180 520 Q 1080 360 1100 120 Z"
              fill="url(#ph-gold)" opacity=".7" filter="url(#ph-blur)" />

        {[
          [120, 60, 360, 0.85], [240, 200, 280, 0.5], [560, 50, 180, 0.4],
          [1280, 80, 420, 0.75], [1420, 240, 260, 0.55], [820, 480, 240, 0.35],
        ].map(([x, y, h, o], i) => (
          <rect key={i} x={x} y={y} width="36" height={h} fill="url(#ph-goldSoft)"
                opacity={o} transform={`rotate(${(i % 2 ? 6 : -4)} ${x + 18} ${y + h / 2})`} />
        ))}

        {[140, 240, 360, 480, 600].map((y, i) => (
          <line key={i}
                x1={i * 80 + 40} y1={y} x2={1560 - i * 60} y2={y + (i % 2 ? 12 : -8)}
                stroke={i % 2 ? '#e8c87a' : '#5fb8b2'}
                strokeWidth={i === 2 ? 2.2 : 1}
                opacity={0.25 + (i % 2) * 0.15} />
        ))}

        {[
          [380, 540, 14], [440, 580, 22], [1100, 500, 18], [1180, 540, 28],
          [620, 200, 12], [780, 240, 16],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#5fb8b2" opacity={0.35} filter="url(#ph-blur)" />
        ))}
      </svg>

      {/* CINEMATIC OVERLAY, navy + turquoise wash for legibility */}
      {cinematic && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse at 50% 40%, rgba(15,40,70,.45) 0%, rgba(10,30,55,.7) 70%),
            linear-gradient(180deg, rgba(20,29,54,.35) 0%, rgba(31,92,102,.25) 50%, rgba(10,20,38,.75) 100%)
          `,
          pointerEvents: 'none',
        }} />
      )}

      {/* canvas-grain dot pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)',
        backgroundSize: '3px 3px',
        mixBlendMode: 'overlay', pointerEvents: 'none',
      }} />

      {/* Cinematic "VIDEO BACKGROUND" indicator, top-left, pulsing red dot */}
      {cinematic && (
        <div style={{
          position: 'absolute', top: 24, left: 28, zIndex: 3,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '7px 14px',
          background: 'rgba(15,25,50,.55)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(232,200,122,.35)',
          fontFamily: T.mono, fontSize: 9.5, color: '#e8c87a', letterSpacing: 2.4,
          textTransform: 'uppercase',
        }}>
          <span style={{
            width: 9, height: 9, borderRadius: '50%', background: '#e04788',
            boxShadow: '0 0 14px #e04788',
            animation: 'pulse 1.6s ease-in-out infinite',
          }} />
          Video background · {label || 'studio loop · 12 s'}
        </div>
      )}

      {/* placeholder caption, bottom right, discreet */}
      <div style={{
        position: 'absolute', right: 24, bottom: 18, zIndex: 3,
        fontFamily: T.mono, fontSize: 9, letterSpacing: 2,
        color: 'rgba(255,255,255,.4)', textTransform: 'uppercase',
      }}>Poster frame · drop video MP4/WebM here</div>

      {/* Slot for content overlay */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

window.PainterlyHero = PainterlyHero;
