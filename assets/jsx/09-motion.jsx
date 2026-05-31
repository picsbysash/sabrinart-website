// Site motion primitives, adds editorial dynamism without changing tokens.
// Marquee, Counter, ParallaxLayer, StickyArtScroll, PaintStrokeDivider,
// MagneticBtn, ColorChips, QuoteRotator, ScrollReveal, HoverArtCard.

const { useRef, useLayoutEffect } = React;

/* ----------------------------- ScrollReveal ----------------------------- */
function ScrollReveal({ children, delay = 0, y = 28, once = true, style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          if (once) io.disconnect();
        } else if (!once) setShown(false);
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay, once]);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
      transition: 'opacity 1s cubic-bezier(.2,.7,.2,1), transform 1s cubic-bezier(.2,.7,.2,1)',
      ...style
    }}>{children}</div>);

}

/* ----------------------------- Marquee ----------------------------- */
// Slow, infinite horizontal scroll. Pause on hover. Loops via duplicated row.
function Marquee({ items, speed = 60, gap = 64, fontSize = 78, italic = true, color, separator = '✦', style }) {
  const c = color || T.navy;
  const rowKey = React.useId();
  return (
    <div className="marquee-wrap" style={{
      overflow: 'hidden', width: '100%',
      maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      ...style
    }}
    onMouseEnter={(e) => {e.currentTarget.querySelectorAll('.marquee-track').forEach((t) => t.style.animationPlayState = 'paused');}}
    onMouseLeave={(e) => {e.currentTarget.querySelectorAll('.marquee-track').forEach((t) => t.style.animationPlayState = 'running');}}>
      
      <div className="marquee-track" style={{
        display: 'inline-flex', alignItems: 'center', gap,
        animation: `marquee-${rowKey.replace(/[^a-z0-9]/gi, '')} ${speed}s linear infinite`,
        whiteSpace: 'nowrap', willChange: 'transform'
      }}>
        {[...items, ...items, ...items].map((it, i) =>
        <React.Fragment key={i}>
            <span style={{
            fontFamily: T.display, fontStyle: italic ? 'italic' : 'normal',
            fontWeight: 400, fontSize, color: c, letterSpacing: '-0.015em'
          }}>{it}</span>
            <span style={{
            fontFamily: T.display, fontSize: fontSize * 0.5,
            color: T.gold, opacity: 0.7
          }}>{separator}</span>
          </React.Fragment>
        )}
      </div>
      <style>{`
        @keyframes marquee-${rowKey.replace(/[^a-z0-9]/gi, '')} {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>);

}

/* ----------------------------- Counter (animated count-up) ----------------------------- */
function Counter({ to, suffix = '', duration = 1600, format = (n) => n }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    let raf, start;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const animate = (t) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {io.disconnect();cancelAnimationFrame(raf);};
  }, [to, duration]);
  return <span ref={ref}>{format(val)}{suffix}</span>;
}

/* ----------------------------- ParallaxLayer (mouse-tracked tilt) ----------------------------- */
function ParallaxLayer({ children, strength = 14, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--mx', x.toFixed(3));
      el.style.setProperty('--my', y.toFixed(3));
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative', ...style }}>
      {React.Children.map(children, (child, i) => {
        const depth = (i + 1) * strength;
        return (
          <div style={{
            position: child.props?.style?.position || 'absolute',
            inset: 0,
            transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px), 0)`,
            transition: 'transform .4s cubic-bezier(.2,.7,.2,1)',
            willChange: 'transform'
          }}>{child}</div>);

      })}
    </div>);

}

/* ----------------------------- PaintStrokeDivider ----------------------------- */
// Organic painterly horizontal section break, hand-drawn brush in gold.
function PaintStrokeDivider({ variant = 'A', color, width = '60%', opacity = 0.7, margin = '0 auto' }) {
  const stroke = color || T.gold;
  const paths = {
    A: 'M 10 22 Q 120 6 280 18 T 600 14 Q 780 4 990 24',
    B: 'M 12 14 Q 200 30 380 12 T 720 22 Q 880 8 990 18',
    C: 'M 8 18 Q 160 4 320 22 Q 480 36 640 12 Q 820 -2 990 20'
  };
  return (
    <div style={{ width, margin, lineHeight: 0 }}>
      <svg viewBox="0 0 1000 32" preserveAspectRatio="none" style={{ width: '100%', height: 28, opacity, overflow: 'visible' }} aria-hidden="true">
        <defs>
          <linearGradient id={`ps-${variant}-${stroke.replace('#', '')}`} x1="0" x2="1">
            <stop offset="0" stopColor={stroke} stopOpacity="0" />
            <stop offset=".2" stopColor={stroke} stopOpacity=".9" />
            <stop offset=".5" stopColor={stroke} stopOpacity="1" />
            <stop offset=".8" stopColor={stroke} stopOpacity=".9" />
            <stop offset="1" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
          <filter id={`ps-rough-${variant}`}>
            <feTurbulence baseFrequency="0.9" numOctaves="2" seed={variant.charCodeAt(0)} />
            <feDisplacementMap in="SourceGraphic" scale="2" />
          </filter>
        </defs>
        <path d={paths[variant]}
        stroke={`url(#ps-${variant}-${stroke.replace('#', '')})`}
        strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d={paths[variant]} transform="translate(0 4)"
        stroke={`url(#ps-${variant}-${stroke.replace('#', '')})`}
        strokeWidth="0.7" fill="none" strokeLinecap="round" opacity=".5"
        filter={`url(#ps-rough-${variant})`} />
      </svg>
    </div>);

}

/* ----------------------------- MagneticBtn ----------------------------- */
// Re-skin of Btn, subtly drifts toward the cursor when hovered.
function MagneticBtn({ children, href, onClick, dark, arrow, primary, style }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / r.width;
    const y = (e.clientY - r.top - r.height / 2) / r.height;
    el.style.transform = `translate(${x * 14}px, ${y * 8}px)`;
  };
  const onLeave = (e) => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
    const el = e.currentTarget;
    el.style.background = el.dataset.origBg || '';
    el.style.color = el.dataset.origColor || '';
    el.style.borderColor = el.dataset.origBorder || '';
  };
  const fg = primary ? T.cream : dark ? T.cream : T.navy;
  const bg = primary ? T.navy : 'transparent';
  return (
    <a ref={ref} href={href} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '11px 22px',
      border: `1px solid ${dark ? 'rgba(255,255,255,.55)' : T.navy}`,
      background: bg, color: fg, cursor: 'pointer',
      fontFamily: T.sans, fontSize: 13, fontWeight: 500, letterSpacing: 2.4,
      textTransform: 'uppercase', textDecoration: 'none',
      transition: 'transform .25s cubic-bezier(.2,.7,.2,1), background .25s, color .25s, border-color .25s',
      willChange: 'transform',
      ...style
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      if (!el.dataset.origBg) {
        el.dataset.origBg = el.style.background || '';
        el.dataset.origColor = el.style.color || '';
        el.dataset.origBorder = el.style.borderColor || '';
      }
      el.style.background = T.fuchsia;
      el.style.color = '#ffffff';
      el.style.borderColor = T.fuchsia;
    }}>
      
      {children}
      {arrow && <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: "rgb(255, 255, 255)" }}>→</span>}
    </a>);

}

/* ----------------------------- StickyArtScroll ----------------------------- */
// Long left column of artist-intro text, right column sticks and swaps
// between featured artworks as the user scrolls each anchor into view.
function StickyArtScroll({ left, items }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const i = Number(e.target.dataset.idx);
          setActive(i);
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 80, alignItems: 'start' }}>
      <div>{left}</div>
      <div style={{ position: 'relative' }}>
        {/* Sticky stack */}
        <div style={{ position: 'sticky', top: 80 }}>
          <div style={{ position: 'relative', aspectRatio: '4 / 5', width: '100%' }}>
            {items.map((it, i) =>
            <div key={i} style={{
              position: 'absolute', inset: 0,
              opacity: active === i ? 1 : 0,
              transform: active === i ? 'scale(1) translateY(0)' : 'scale(.96) translateY(20px)',
              transition: 'opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1)',
              pointerEvents: active === i ? 'auto' : 'none'
            }}>
                <ImgPH label={it.title} src={it.src} ratio="4 / 5" />
                <div style={{
                position: 'absolute', bottom: -8, left: -16,
                padding: '8px 14px', background: T.cream,
                border: `1px solid ${T.hairStrong}`,
                fontFamily: T.display, fontStyle: 'italic',
                fontSize: 22, fontWeight: 500, color: T.navy
              }}>{it.title}</div>
                <div style={{
                position: 'absolute', top: 14, right: 14,
                fontFamily: T.mono, fontSize: 9, color: T.gold,
                background: 'rgba(255,255,255,.95)', padding: '5px 10px',
                border: `1px solid ${T.hairStrong}`, letterSpacing: 2
              }}>{it.tag}</div>
              </div>
            )}
          </div>
          {/* progress pips */}
          <div style={{ display: 'flex', gap: 6, marginTop: 32, justifyContent: 'center' }}>
            {items.map((_, i) =>
            <span key={i} style={{
              width: active === i ? 36 : 12, height: 2,
              background: active === i ? T.gold : T.hairStrong,
              transition: 'width .5s, background .5s'
            }} />
            )}
          </div>
        </div>
        {/* Anchors, invisible spacers that drive the active state */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {items.map((_, i) =>
          <div key={i} ref={(el) => refs.current[i] = el} data-idx={i}
          style={{ height: '100vh', pointerEvents: 'none' }} />
          )}
        </div>
      </div>
    </div>);

}

/* ----------------------------- ColorChips (palette filter) ----------------------------- */
function ColorChips({ value, onChange, palettes }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
      {palettes.map((p) =>
      <button key={p.id} onClick={() => onChange?.(p.id)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 12,
        padding: '8px 14px 8px 8px',
        background: value === p.id ? T.navy : 'transparent',
        color: value === p.id ? T.cream : T.navy,
        border: `1px solid ${value === p.id ? T.navy : T.hairStrong}`,
        fontFamily: T.mono, fontSize: 10, letterSpacing: 2,
        textTransform: 'uppercase', cursor: 'pointer',
        transition: 'background .25s, color .25s, border-color .25s'
      }}>
          <span style={{ display: 'inline-flex' }}>
            {p.colors.map((c, i) =>
          <span key={i} style={{
            width: 14, height: 14, background: c, marginLeft: i === 0 ? 0 : -4,
            border: '1px solid rgba(255,255,255,.4)', borderRadius: '50%'
          }} />
          )}
          </span>
          {p.label}
        </button>
      )}
    </div>);

}

/* ----------------------------- QuoteRotator ----------------------------- */
function QuoteRotator({ quotes, interval = 6500, compact = false }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % quotes.length), interval);
    return () => clearInterval(t);
  }, [quotes.length, interval]);
  if (compact) {
    return (
      <div style={{ position: 'relative', minHeight: 92 }}>
        {quotes.map((q, idx) =>
        <div key={idx} style={{
          position: 'absolute', inset: 0,
          opacity: i === idx ? 1 : 0,
          transform: i === idx ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity .7s, transform .7s',
          display: 'flex', flexDirection: 'column', justifyContent: 'center'
        }}>
            <div style={{
            fontFamily: T.display, fontStyle: 'italic', fontWeight: 400,

            color: T.navy, letterSpacing: '-0.003em', fontSize: "25px", lineHeight: "1"
          }}>"{q.text}"</div>
            <div style={{
            marginTop: 10, display: 'flex', alignItems: 'center', gap: 16,
            fontFamily: T.mono, fontSize: 9.5, color: T.gold, letterSpacing: 2.2, textTransform: 'uppercase'
          }}>
              <span style={{ fontSize: "1px" }}>{q.author} · {q.role}</span>
              <span style={{ display: 'inline-flex', gap: 5, marginLeft: 'auto' }}>
                {quotes.map((_, j) =>
              <button key={j} onClick={() => setI(j)} style={{
                width: i === j ? 18 : 6, height: 2, padding: 0, border: 'none',
                background: i === j ? T.gold : T.hairStrong,
                cursor: 'pointer', transition: 'width .3s, background .3s'
              }} />
              )}
              </span>
            </div>
          </div>
        )}
      </div>);

  }
  return (
    <div style={{ position: 'relative', minHeight: 220 }}>
      {quotes.map((q, idx) =>
      <div key={idx} style={{
        position: 'absolute', inset: 0,
        opacity: i === idx ? 1 : 0,
        transform: i === idx ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity 1s, transform 1s',
        textAlign: 'center'
      }}>
          <div style={{
          fontFamily: T.display, fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(22px, 2vw, 32px)', lineHeight: 1.45,
          color: T.navy, maxWidth: 820, margin: '0 auto'
        }}>"{q.text}"</div>
          <div style={{ marginTop: 26, fontFamily: T.mono, fontSize: 10, color: T.gold, letterSpacing: 3, textTransform: 'uppercase' }}>
            {q.author} · {q.role}
          </div>
        </div>
      )}
      <div style={{ position: 'absolute', bottom: -20, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8 }}>
        {quotes.map((_, idx) =>
        <button key={idx} onClick={() => setI(idx)} style={{
          width: i === idx ? 28 : 8, height: 2,
          background: i === idx ? T.gold : T.hairStrong,
          border: 'none', padding: 0, cursor: 'pointer',
          transition: 'width .4s, background .4s'
        }} />
        )}
      </div>
    </div>);

}

/* ----------------------------- HoverArtCard ----------------------------- */
// Like ArtworkCard but with a hover-reveal overlay (price + CTA fade in).
function HoverArtCard({ title, price, size, year, status, statusColor, dark, ratio = '4 / 5', src }) {
  const [h, setH] = useState(false);
  // If a palette color is provided, render a filled custom AVAILABLE pill;
  // otherwise fall back to the default StatusTag (string).
  const badgeNode = statusColor && status ?
  <span style={{
    display: 'inline-block',
    background: statusColor,
    color: '#ffffff',
    border: `1px solid ${statusColor}`,
    fontFamily: T.mono, fontSize: 9, letterSpacing: 2.4,
    padding: '5px 10px', textTransform: 'uppercase', fontWeight: 500,
    boxShadow: '0 10px 22px -8px rgba(0,0,0,.25)'
  }}>{status}</span> :
  status;
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: 14, cursor: 'pointer' }}
    onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          transform: h ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform .9s cubic-bezier(.2,.7,.2,1)'
        }}>
          <ImgPH label={title} src={src} ratio={ratio} dark={dark} badge={badgeNode} />
        </div>
        {/* hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(20,29,54,0) 40%, rgba(20,29,54,.85) 100%)',
          opacity: h ? 1 : 0, transition: 'opacity .4s',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 20, pointerEvents: 'none'
        }}>
          <div style={{
            transform: h ? 'translateY(0)' : 'translateY(12px)',
            transition: 'transform .5s',
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'
          }}>
            <span style={{ fontFamily: T.mono, fontSize: 10, color: T.cream, letterSpacing: 2 }}>VIEW ARTWORK →</span>
            <span style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
              fontSize: 22, color: T.goldShimmer
            }}>{price}</span>
          </div>
        </div>
      </div>
      <div>
        <h4 style={{
          fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 22,
          color: dark ? T.cream : T.navy, margin: 0, letterSpacing: '-0.01em'
        }}>{title}</h4>
        <div style={{
          marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          fontFamily: T.mono, fontSize: 9.5, color: dark ? 'rgba(255,255,255,.55)' : T.taupe,
          letterSpacing: 1.5, textTransform: 'uppercase'
        }}>
          <span>{[size, year].filter(Boolean).join(' · ')}</span>
        </div>
      </div>
    </article>);

}

Object.assign(window, {
  ScrollReveal, Marquee, Counter, ParallaxLayer, PaintStrokeDivider,
  MagneticBtn, StickyArtScroll, ColorChips, QuoteRotator, HoverArtCard
});