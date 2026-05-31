// Shared visual primitives, buttons, hairline, eyebrow, image placeholder, badges.

function Btn({ children, primary, ghost, dark, size = 'md', style, href, onClick, arrow }) {
  const pad = size === 'sm' ? '6px 12px' : size === 'lg' ? '12px 24px' : '9px 18px';
  const fs = size === 'sm' ? 9 : size === 'lg' ? 10 : 9.5;
  const fg = dark ? T.cream : T.navy;
  const borderC = dark ? 'rgba(255,255,255,.55)' : T.navy;
  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', padding: pad, gap: 10,
      border: ghost ? '1px solid transparent' : `1px solid ${borderC}`,
      background: 'transparent', color: fg, cursor: 'pointer',
      fontFamily: T.sans, fontSize: fs, fontWeight: 400, letterSpacing: 2.4,
      textTransform: 'uppercase', whiteSpace: 'nowrap',
      transition: 'background .25s, color .25s, border-color .25s',
      ...style
    }}
    onMouseEnter={(e) => {
      if (ghost) return;
      const el = e.currentTarget;
      if (!el.dataset.origBg) {
        el.dataset.origBg = el.style.background || '';
        el.dataset.origColor = el.style.color || '';
        el.dataset.origBorder = el.style.borderColor || '';
      }
      el.style.background = T.fuchsia;
      el.style.color = '#ffffff';
      el.style.borderColor = T.fuchsia;
    }}
    onMouseLeave={(e) => {
      if (ghost) return;
      const el = e.currentTarget;
      el.style.background = el.dataset.origBg || 'transparent';
      el.style.color = el.dataset.origColor || fg;
      el.style.borderColor = el.dataset.origBorder || borderC;
    }}>
      {children}{arrow && <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: fs + 4, letterSpacing: 0 }}>→</span>}</Tag>);

}

function Eyebrow({ children, color, style }) {
  return (
    <div style={{
      fontFamily: T.mono, fontWeight: 400, fontSize: 11.5, letterSpacing: 3.4,
      textTransform: 'uppercase', color: color || T.ochre,
      margin: "0px 0px 60px", ...style
    }}>{children}</div>);

}

function H1({ children, color, italic, style }) {
  return (
    <h1 style={{
      fontFamily: T.display, fontWeight: italic ? 500 : 600, fontStyle: italic ? 'italic' : 'normal',
      fontSize: 'clamp(56px, 7vw, 104px)', lineHeight: 0.94,
      letterSpacing: '-0.025em', color: color || T.navy, margin: 0,
      ...style
    }}>{children}</h1>);

}

function H2({ children, color, italic = true, style, size }) {
  return (
    <h2 style={{
      fontFamily: T.display, fontWeight: 500, fontStyle: italic ? 'italic' : 'normal',
      fontSize: size || 'clamp(48px, 6vw, 88px)', lineHeight: 1.08,
      letterSpacing: '-0.018em', color: color || T.navy, margin: 0,
      ...style
    }}>{children}</h2>);

}

function H3({ children, color, italic = true, style, size }) {
  return (
    <h3 style={{
      fontFamily: T.display, fontWeight: 400, fontStyle: italic ? 'italic' : 'normal',
      fontSize: size || 28, lineHeight: 1.15,
      letterSpacing: '-0.005em', color: color || T.navy, margin: 0,
      ...style
    }}>{children}</h3>);

}

function Body({ children, size = 16, color, lh = 1.6, maxWidth, style }) {
  return (
    <p style={{
      fontFamily: T.sans, fontSize: size, fontWeight: 300, lineHeight: lh,
      color: color || T.taupe, maxWidth,
      letterSpacing: 0.05, margin: '14px 0 0', ...style
    }}>{children}</p>);

}

function Rule({ width = '100%', margin = '0', dark = false }) {
  return (
    <div style={{
      margin, width, height: 1,
      background: `linear-gradient(90deg, transparent 0%, ${dark ? T.goldShimmer : T.gold} 50%, transparent 100%)`,
      opacity: 0.5
    }} />);

}

function StatusTag({ status, floating = false, style }) {
  const map = {
    'ON SALE': { bg: T.fuchsia, fg: '#ffffff', border: T.fuchsia },
    'AVAILABLE': { bg: T.ocean, fg: T.cream, border: T.ocean },
    'SOLD': { bg: T.magenta, fg: '#ffffff', border: T.magenta },
    'ACQUIRED': { bg: T.sunset, fg: T.cream, border: T.sunset },
    'NOT FOR SALE': { bg: T.gold, fg: T.cream, border: T.goldRich },
    'NEW': { bg: T.sunset, fg: T.cream, border: T.sunset }
  };
  const s = map[status] || map['AVAILABLE'];
  return (
    <span style={{
      display: 'inline-block', background: s.bg, color: s.fg,
      border: `1px solid ${s.border}`,
      fontFamily: T.mono, fontSize: 9, letterSpacing: 2.4,
      padding: '5px 10px', textTransform: 'uppercase', fontWeight: 500,
      boxShadow: floating ? '0 10px 22px -8px rgba(60,40,15,.25)' : 'none',
      ...style
    }}>{status}</span>);

}

window.Btn = Btn;
window.Eyebrow = Eyebrow;
window.H1 = H1;
window.H2 = H2;
window.H3 = H3;
window.Body = Body;
window.Rule = Rule;
window.StatusTag = StatusTag;

// Gallery-lit image placeholder, neutral cream surface, soft drop shadow.
// Used everywhere we will eventually drop a real artwork photo.
function ImgPH({ label = 'artwork', height, width, ratio, dark = false, style, badge, caption, frame = true, src, fit = 'cover', alt }) {
  const bg = dark ? '#1a2342' : '#fefcf6';
  const border = dark ? 'rgba(255,255,255,.08)' : 'rgba(184,133,42,.18)';
  // Real image mode, render the photo cover-filling the frame, keep the gallery
  // shadow + optional badge/caption overlays, drop the placeholder gradient/label.
  if (src) {
    return (
      <div style={{
        position: 'relative', width: width || '100%',
        height: height || (ratio ? undefined : '100%'),
        aspectRatio: ratio || undefined,
        background: bg, border: `1px solid ${border}`,
        overflow: 'hidden',
        boxShadow: frame ? dark ? T.artShadowDark : T.artShadow : 'none',
        ...style
      }}>
        <img src={src} alt={alt || label} loading="lazy" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: fit, objectPosition: 'center', display: 'block'
        }} />
        {badge &&
        <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 2 }}>
            {typeof badge === 'string' ? <StatusTag status={badge} floating /> : badge}
          </div>
        }
        {caption &&
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
          padding: '28px 16px 14px',
          background: 'linear-gradient(180deg, transparent, rgba(10,15,30,.72))',
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 12,
          color: 'rgba(255,255,255,.92)', letterSpacing: 0.3
        }}>{caption}</div>
        }
      </div>);
  }
  return (
    <div style={{
      position: 'relative', width: width || '100%',
      height: height || (ratio ? undefined : '100%'),
      aspectRatio: ratio || undefined,
      background: bg, border: `1px solid ${border}`,
      display: 'grid', placeItems: 'center', overflow: 'hidden',
      boxShadow: frame ? dark ? T.artShadowDark : T.artShadow : 'none',
      ...style
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(135deg, transparent 49.5%, ${dark ? 'rgba(255,255,255,.04)' : 'rgba(184,133,42,.10)'} 49.5%, ${dark ? 'rgba(255,255,255,.04)' : 'rgba(184,133,42,.10)'} 50.5%, transparent 50.5%)`,
        opacity: 0.9, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: dark ?
        'radial-gradient(ellipse at 50% 28%, rgba(255,255,255,.07) 0%, transparent 70%)' :
        'radial-gradient(ellipse at 50% 28%, rgba(255,255,255,.55) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        fontFamily: T.mono, fontSize: 9, color: dark ? 'rgba(255,255,255,.5)' : T.taupe,
        letterSpacing: 1.8, textTransform: 'uppercase',
        background: dark ? 'rgba(20,29,54,.85)' : 'rgba(255,255,255,.94)',
        padding: '6px 14px', position: 'relative',
        border: `1px solid ${border}`, maxWidth: '85%', textAlign: 'center'
      }}>{label}</div>
      {badge &&
      <div style={{ position: 'absolute', top: 14, left: 14 }}>
          {typeof badge === 'string' ? <StatusTag status={badge} floating /> : badge}
        </div>
      }
      {caption &&
      <div style={{
        position: 'absolute', bottom: 14, left: 14, right: 14,
        fontFamily: T.serif, fontStyle: 'italic', fontSize: 12,
        color: dark ? 'rgba(255,255,255,.65)' : T.taupe,
        letterSpacing: 0.3
      }}>{caption}</div>
      }
    </div>);

}

// Artwork card, image + meta line + price/status. Used in grids.
function ArtworkCard({ title, price, size, medium, year, status, dark, src }) {
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <ImgPH label={title} src={src} ratio="1 / 1" dark={dark} badge={status} />
      <div style={{ paddingTop: 4 }}>
        <h4 style={{
          fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 22,
          color: dark ? T.cream : T.navy, margin: 0, letterSpacing: '-0.01em'
        }}>{title}</h4>
        <div style={{
          marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          fontFamily: T.mono, fontSize: 9.5, color: dark ? 'rgba(255,255,255,.55)' : T.taupe,
          letterSpacing: 1.5, textTransform: 'uppercase'
        }}>
          <span>{[size, medium, year].filter(Boolean).join(' · ')}</span>
          {price && <span style={{
            fontFamily: T.display, fontStyle: 'italic', fontSize: 18, fontWeight: 500,
            color: T.gold, letterSpacing: 0
          }}>{price}</span>}
        </div>
      </div>
    </article>);

}

// Section frame, generous padding + optional eyebrow + title layout.
// Default padding mirrors the home v2 rhythm: clamp() so it breathes on every viewport.
function Section({ children, bg, dark, padding = 'clamp(48px, 6vh, 80px) clamp(24px, 5vw, 80px)', maxWidth, style, id }) {
  return (
    <section id={id} style={{
      padding, background: bg, color: dark ? T.cream : T.ink,
      position: 'relative', ...style
    }}>
      <div style={{ maxWidth: maxWidth || 1320, margin: '0 auto' }}>{children}</div>
    </section>);

}

window.ImgPH = ImgPH;
window.ArtworkCard = ArtworkCard;
window.Section = Section;