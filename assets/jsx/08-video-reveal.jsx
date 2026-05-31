// Video placeholder + scroll-reveal hook, used across the cinematic sections.

// VideoPH, visual slot for a future micro-loop or hero video.
// Renders a poster surface with a play badge + MICRO-LOOP eyebrow label.
function VideoPH({ label = 'micro-loop', height, width, ratio, dark = false, style, caption, badge, poster, video }) {
  const bg = dark ? '#10182e' : '#f3f4f6';
  const border = dark ? 'rgba(255,255,255,.1)' : 'rgba(29,42,77,.18)';
  const fg = dark ? 'rgba(255,255,255,.7)' : T.taupe;
  return (
    <div style={{
      position: 'relative', width: width || '100%',
      height: height || (ratio ? undefined : '100%'),
      aspectRatio: ratio || undefined,
      background: bg, border: `1px solid ${border}`,
      display: 'grid', placeItems: 'center', overflow: 'hidden',
      boxShadow: dark ? T.artShadowDark : T.artShadow,
      ...style,
    }}>
      {/* Poster image when provided */}
      {poster &&
        <img src={poster} alt={label} loading="lazy" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center', display: 'block'
        }} />
      }
      {/* Faux film-grain stripe + center radial */}
      <div style={{
        position: 'absolute', inset: 0,
        background: dark
          ? 'radial-gradient(ellipse at 50% 35%, rgba(232,200,122,.08) 0%, transparent 60%)'
          : 'radial-gradient(ellipse at 50% 35%, rgba(232,200,122,.18) 0%, transparent 60%)',
      }} />
      {!poster &&
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(0deg, ${dark ? 'rgba(255,255,255,.03)' : 'rgba(184,133,42,.06)'} 0 2px, transparent 2px 6px)`,
      }} />
      }

      {/* Play badge — only shown when a real video is wired up */}
      {video &&
      <div style={{
        position: 'relative', display: 'grid', placeItems: 'center',
        width: 72, height: 72, borderRadius: '50%',
        background: 'rgba(216,180,99,.95)',
        boxShadow: '0 16px 36px -10px rgba(168,116,34,.55)',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" fill={T.navy} />
        </svg>
      </div>
      }

      {/* Top-left label — only when a real video is wired up */}
      {video &&
      <div style={{
        position: 'absolute', top: 14, left: 14, display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '5px 10px',
        background: dark ? 'rgba(20,29,54,.7)' : 'rgba(255,255,255,.85)',
        border: `1px solid ${border}`,
        fontFamily: T.mono, fontSize: 9, color: fg, letterSpacing: 2.4,
        textTransform: 'uppercase',
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', background: T.fuchsia,
          boxShadow: `0 0 10px ${T.fuchsia}`,
        }} />
        {label}
      </div>
      }

      {/* Badge slot top-right */}
      {badge && (
        <div style={{ position: 'absolute', top: 14, right: 14 }}>
          {typeof badge === 'string' ? <StatusTag status={badge} floating /> : badge}
        </div>
      )}

      {/* Bottom caption */}
      {caption && (
        <div style={{
          position: 'absolute', left: 14, right: 14, bottom: 14,
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 12,
          color: dark ? 'rgba(255,255,255,.65)' : T.taupe, letterSpacing: 0.3,
        }}>{caption}</div>
      )}
    </div>
  );
}

// Reveal, IntersectionObserver wrapper. Fade + slide on first viewport entry.
function Reveal({ children, delay = 0, y = 24, style }) {
  const [shown, setShown] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setShown(true); io.disconnect(); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity .9s cubic-bezier(.2,.6,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.6,.2,1) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

window.VideoPH = VideoPH;
window.Reveal = Reveal;
