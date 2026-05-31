// DarkPaintingHero, replaces the painterly SVG hero with a slow, animated
// "painting in motion" in dark tones. Drop a real video file at the path
// in `videoSrc` (e.g. assets/hero-painting.mp4) and it auto-takes over.

function DarkPaintingHero({ children, height = '820px', videoSrc, image, posterColor = '#0a0f1e' }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height,
      overflow: 'hidden', background: posterColor
    }}>
      {/* Real video if provided, otherwise the animated SVG painting below shows through */}
      {videoSrc &&
      <video
        autoPlay loop muted playsInline
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0
        }}
        src={videoSrc} />

      }

      {/* Real painting brought to life, slow Ken Burns drift + a light sheen
          sweeping across the wet brushwork, so the still reads as living video. */}
      {image && !videoSrc &&
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', background: '#1b2a8f' }}>
        <img src={image} alt="" aria-hidden="true" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          transformOrigin: '50% 50%',
          animation: 'dh-kenburns 34s ease-in-out infinite alternate',
          willChange: 'transform'
        }} />
        {/* slow light sweep, emulates light moving over the glossy paint */}
        <div style={{
          position: 'absolute', top: '-30%', left: '-60%', width: '60%', height: '160%',
          background: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,.16) 45%, rgba(214,228,255,.22) 50%, rgba(255,255,255,.16) 55%, transparent 100%)',
          filter: 'blur(8px)', mixBlendMode: 'screen',
          animation: 'dh-sheen 13s ease-in-out infinite', willChange: 'transform'
        }} />
        {/* gentle breathing tint so the blue subtly shifts like a slow video */}
        <div style={{
          position: 'absolute', inset: 0, mixBlendMode: 'overlay',
          background: 'radial-gradient(ellipse at 50% 38%, rgba(120,160,255,.35) 0%, rgba(10,15,40,0) 60%)',
          animation: 'dh-breathe 9s ease-in-out infinite', willChange: 'opacity'
        }} />
      </div>
      }

      {/* Animated dark painting fallback, slow morphing gold + copper on near-black */}
      {!image &&
      <svg
        viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
        aria-hidden="true">
        
        <defs>
          <radialGradient id="dh-bg" cx=".5" cy=".4" r=".9">
            <stop offset="0" stopColor="#161e34" />
            <stop offset=".5" stopColor="#0c1224" />
            <stop offset="1" stopColor="#04060e" />
          </radialGradient>

          <linearGradient id="dh-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8a5a18" />
            <stop offset=".45" stopColor="#d9a448" />
            <stop offset=".7" stopColor="#f3d27a" />
            <stop offset="1" stopColor="#6a3f10" />
          </linearGradient>

          <linearGradient id="dh-copper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7d3214" />
            <stop offset=".5" stopColor="#c46a3a" />
            <stop offset="1" stopColor="#5a1f08" />
          </linearGradient>

          <radialGradient id="dh-emberA" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#f3d27a" stopOpacity=".95" />
            <stop offset=".4" stopColor="#c98e34" stopOpacity=".55" />
            <stop offset="1" stopColor="#1d2a4d" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="dh-emberB" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#d9468c" stopOpacity=".6" />
            <stop offset=".4" stopColor="#8a2654" stopOpacity=".35" />
            <stop offset="1" stopColor="#0a0f1e" stopOpacity="0" />
          </radialGradient>

          <filter id="dh-blur"><feGaussianBlur stdDeviation="14" /></filter>
          <filter id="dh-blurBig"><feGaussianBlur stdDeviation="40" /></filter>
          <filter id="dh-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" />
            <feColorMatrix values="0 0 0 0 0
                                   0 0 0 0 0
                                   0 0 0 0 0
                                   0 0 0 0.18 0" />


            


            
          </filter>
        </defs>

        {/* base */}
        <rect width="1600" height="800" fill="url(#dh-bg)" />

        {/* GROUP A, slow drifting blobs */}
        <g style={{ transformOrigin: '50% 50%', animation: 'dh-driftA 28s ease-in-out infinite alternate' }}>
          <ellipse cx="380" cy="280" rx="380" ry="240" fill="url(#dh-emberA)" filter="url(#dh-blurBig)" opacity=".85" />
          <ellipse cx="1280" cy="520" rx="420" ry="260" fill="url(#dh-emberB)" filter="url(#dh-blurBig)" opacity=".7" />
        </g>

        {/* GROUP B, counter-rotating slower blobs */}
        <g style={{ transformOrigin: '50% 50%', animation: 'dh-driftB 36s ease-in-out infinite alternate' }}>
          <ellipse cx="820" cy="180" rx="320" ry="180" fill="url(#dh-emberA)" filter="url(#dh-blurBig)" opacity=".4" />
          <ellipse cx="1100" cy="700" rx="260" ry="160" fill="url(#dh-copper)" filter="url(#dh-blurBig)" opacity=".25" />
          <ellipse cx="240" cy="640" rx="260" ry="160" fill="url(#dh-copper)" filter="url(#dh-blurBig)" opacity=".22" />
        </g>

        {/* GOLD STROKES, painted in via stroke-dasharray animation, loop */}
        <g opacity=".9" filter="url(#dh-blur)">
          <path d="M -100 460 Q 240 360 540 460 T 1080 480 Q 1300 500 1720 420"
          stroke="url(#dh-gold)" strokeWidth="3.2" fill="none" strokeLinecap="round"
          style={{ strokeDasharray: 2400, strokeDashoffset: 2400, animation: 'dh-paint1 14s ease-in-out infinite' }} />
          <path d="M -50 340 Q 320 240 700 320 Q 1080 400 1700 280"
          stroke="url(#dh-gold)" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity=".7"
          style={{ strokeDasharray: 2400, strokeDashoffset: 2400, animation: 'dh-paint2 18s ease-in-out infinite' }} />
          <path d="M 100 600 Q 460 540 840 600 Q 1220 660 1620 580"
          stroke="url(#dh-copper)" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".55"
          style={{ strokeDasharray: 2400, strokeDashoffset: 2400, animation: 'dh-paint3 22s ease-in-out infinite' }} />
        </g>

        {/* SHIMMER VERTICALS, thin gold-leaf bars that fade in/out */}
        {[
        [180, 80, 360], [330, 240, 280], [1240, 100, 420],
        [1380, 220, 280], [780, 480, 220], [560, 60, 200]].
        map(([x, y, h], i) =>
        <rect key={i} x={x} y={y} width="22" height={h} fill="url(#dh-gold)"
        opacity=".7"
        style={{
          transformOrigin: `${x + 11}px ${y + h / 2}px`,
          transform: `rotate(${i % 2 ? 4 : -3}deg)`,
          animation: `dh-shimmer ${8 + i % 3 * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.7}s`
        }} />
        )}

        {/* SPARKS, small glints that twinkle */}
        {[
        [420, 200], [560, 540], [880, 280], [1100, 360], [320, 360],
        [1340, 540], [780, 620], [1180, 180], [220, 540], [980, 480]].
        map(([cx, cy], i) =>
        <circle key={i} cx={cx} cy={cy} r="3" fill="#f3d27a"
        style={{
          animation: `dh-twinkle ${3 + i % 4}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
          filter: 'drop-shadow(0 0 8px #f3d27a)'
        }} />
        )}

        {/* Film grain overlay */}
        <rect width="1600" height="800" filter="url(#dh-grain)" opacity=".5" />
      </svg>
      }

      {/* Extra legibility scrim when a bright painting backs the hero */}
      {image &&
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(6,10,26,.62) 0%, rgba(6,10,26,.30) 32%, rgba(6,10,26,.30) 60%, rgba(6,10,26,.66) 100%)'
      }} />
      }

      {/* Dark vignette, keeps the foreground type legible */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,.45) 75%, rgba(0,0,0,.7) 100%),
          linear-gradient(180deg, rgba(4,6,14,.35) 0%, rgba(4,6,14,0) 30%, rgba(4,6,14,.6) 100%)
        `
      }} />

      {/* Faint film-strip lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.012) 0 2px, transparent 2px 5px)',
        mixBlendMode: 'overlay'
      }} />

      {/* Content slot */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', height: "828px" }}>
        {children}
      </div>

      <style>{`
        @keyframes dh-driftA {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-40px, 30px) scale(1.06); }
        }
        @keyframes dh-driftB {
          0%   { transform: translate(0,0) scale(1.04); }
          100% { transform: translate(50px, -20px) scale(1); }
        }
        @keyframes dh-paint1 {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          20%  { opacity: .9; }
          50%  { stroke-dashoffset: 0; opacity: .9; }
          80%  { stroke-dashoffset: -2400; opacity: 0; }
          100% { stroke-dashoffset: -2400; opacity: 0; }
        }
        @keyframes dh-paint2 {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          25%  { opacity: .65; }
          55%  { stroke-dashoffset: 0; opacity: .7; }
          85%  { stroke-dashoffset: -2400; opacity: 0; }
          100% { stroke-dashoffset: -2400; opacity: 0; }
        }
        @keyframes dh-paint3 {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          25%  { opacity: .5; }
          60%  { stroke-dashoffset: 0; opacity: .55; }
          90%  { stroke-dashoffset: -2400; opacity: 0; }
          100% { stroke-dashoffset: -2400; opacity: 0; }
        }
        @keyframes dh-shimmer {
          0%, 100% { opacity: .15; }
          50%      { opacity: .85; }
        }
        @keyframes dh-twinkle {
          0%, 100% { opacity: 0; transform: scale(.4); }
          50%      { opacity: 1; transform: scale(1.4); }
        }
        @keyframes dh-kenburns {
          0%   { transform: scale(1.06) translate(0, 0); }
          50%  { transform: scale(1.12) translate(-1.2%, -1%); }
          100% { transform: scale(1.16) translate(1.2%, 1%); }
        }
        @keyframes dh-sheen {
          0%   { transform: translateX(0) skewX(-8deg); opacity: 0; }
          35%  { opacity: 1; }
          70%  { opacity: .6; }
          100% { transform: translateX(360%) skewX(-8deg); opacity: 0; }
        }
        @keyframes dh-breathe {
          0%, 100% { opacity: .35; }
          50%      { opacity: .75; }
        }
      `}</style>
    </div>);

}

window.DarkPaintingHero = DarkPaintingHero;