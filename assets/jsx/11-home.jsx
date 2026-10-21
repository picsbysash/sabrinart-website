// Home v2, editorial + dynamic. Uses motion primitives from site-motion.jsx.
// Same content/voice as v1, but composition is layered, asymmetric, and animated.

/* ---------- TabButton (TabbedStory item) ---------- */
function TabButton({ on, onClick, n, label }) {
  const [hover, setHover] = useState(false);
  const active = hover; // visual highlight ONLY on hover, not on selection
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        gap: 14,
        background: 'transparent', border: 'none', cursor: 'pointer',
        borderTop: on ? `2px solid ${T.gold}` : '2px solid transparent',
        marginTop: -1, textAlign: 'left',
        transition: 'border-color .35s',
        padding: '24px 0 0'
      }}>
      <div style={{
        fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
        fontSize: 'clamp(36px, 3.4vw, 52px)', lineHeight: 1, letterSpacing: '-0.03em',
        background: active ?
        `linear-gradient(180deg, ${T.goldShimmer} 0%, ${T.gold} 60%, ${T.goldRich} 100%)` :
        'none',
        WebkitBackgroundClip: active ? 'text' : 'unset',
        WebkitTextFillColor: active ? 'transparent' : T.taupeSoft,
        color: active ? 'transparent' : T.taupeSoft,
        transition: 'color .3s'
      }}>{n}</div>
      <div style={{
        fontFamily: T.mono, fontSize: 10, letterSpacing: 2.2,
        textTransform: 'uppercase', lineHeight: 1.4,
        color: active ? T.navy : T.taupeSoft,
        fontWeight: active ? 500 : 400,
        transition: 'color .3s',
        minHeight: 'calc(10px * 1.4 * 2)' // reserve 2 lines so labels share baseline
      }}>{label}</div>
    </button>);

}

/* ---------- Tabbed story (40/60, fades between 4 featured works) ---------- */
function TabbedStory({ phases }) {
  const [active, setActive] = useState(0);
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
      gap: 80,
      alignItems: 'center'
    }}>
      {/* LEFT, text + tab row */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vh, 36px)' }}>
        <div>
          <Eyebrow>02 · From Asti to Milan to Melbourne</Eyebrow>
          <h2 style={{
            fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
            fontSize: 'clamp(48px, 5vw, 76px)', lineHeight: 0.98,
            color: T.navy, margin: '16px 0 0', letterSpacing: '-0.018em'
          }}>
            Told in<br />
            <span style={{ color: T.gold, whiteSpace: 'nowrap' }}>paint &amp; gold</span>
          </h2>
        </div>

        {/* Horizontal tab row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          columnGap: 'clamp(16px, 2vw, 28px)',
          borderTop: `1px solid ${T.hairStrong}`, borderTopStyle: "solid", borderTopColor: "rgba(29, 42, 77, 0.22)", borderWidth: "1px 0px 0px"
        }}>
          {phases.map((ph, i) => {
            const on = active === i;
            return (
              <TabButton key={i} on={on} onClick={() => setActive(i)} n={ph.n} label={ph.shortLabel} />);

          })}
        </div>

        {/* Body for active phase, absolutely-positioned so heights are stable */}
        <div style={{ position: 'relative', minHeight: 170 }}>
          {phases.map((ph, i) =>
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: active === i ? 1 : 0,
            transform: active === i ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity .55s cubic-bezier(.2,.7,.2,1), transform .55s cubic-bezier(.2,.7,.2,1)',
            pointerEvents: active === i ? 'auto' : 'none',
            display: 'flex', flexDirection: 'column', gap: 20
          }}>
              <h3 style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
              fontSize: 28, lineHeight: 1.25, color: T.navy,
              letterSpacing: '-0.005em', margin: "20px 0px 0px"
            }}>{ph.title}</h3>
              <p style={{
              fontFamily: T.sans, fontSize: 16, fontWeight: 300, lineHeight: 1.65,
              color: T.taupe, maxWidth: 480, letterSpacing: 0.05, margin: "30px 0px 0px"
            }}>{ph.body}</p>
            </div>
          )}
        </div>

        {/* Premium static link */}
        <div>
          <a href="#/about" style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: 3.4,
            textTransform: 'uppercase', color: T.navy,
            paddingBottom: 8, borderBottom: `1px solid ${T.gold}`
          }}>
            Read the full story
            <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.gold }}>→</span>
          </a>
        </div>
      </div>

      {/* RIGHT, giant white-bordered floating canvas */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', margin: "80px 0px 0px" }}>
        <div style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column',
          background: '#ffffff', padding: 'clamp(24px, 3.4vw, 48px)',
          boxShadow: '0 70px 140px -40px rgba(28,20,16,.45), 0 36px 70px -30px rgba(28,20,16,.28), 0 6px 18px rgba(28,20,16,.10)',
          borderRadius: 1, width: '100%', maxWidth: 620, margin: "-50px 0px 0px"
        }}>
          <div style={{ position: 'relative', aspectRatio: '1 / 1', width: '100%' }}>
            {phases.map((ph, i) =>
            <div key={i} style={{
              position: 'absolute', inset: 0,
              opacity: active === i ? 1 : 0,
              transition: 'opacity .8s cubic-bezier(.2,.7,.2,1)',
              pointerEvents: active === i ? 'auto' : 'none'
            }}>
                <ImgPH label={ph.work} src={ph.img} frame={false} />
              </div>
            )}
          </div>
          {/* Plate label inside the paspartú */}
          <div style={{
            marginTop: 'clamp(20px, 2.2vw, 30px)',
            position: 'relative', minHeight: 32
          }}>
            {phases.map((ph, i) =>
            <div key={i} style={{
              position: 'absolute', inset: 0,
              display: 'flex',
              justifyContent: 'space-between', alignItems: 'baseline',
              gap: 16,
              opacity: active === i ? 1 : 0,
              transition: 'opacity .6s',
              pointerEvents: active === i ? 'auto' : 'none'
            }}>
                <div style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                fontSize: 22, color: T.navy, letterSpacing: '-0.005em'
              }}>{ph.work}</div>
                <div style={{
                fontFamily: T.mono, fontSize: 9.5, color: T.gold,
                letterSpacing: 2.4, textTransform: 'uppercase'
              }}>{ph.workMeta}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}

/* ---------- FooterV2, minimalist site footer shared by every page ---------- */
// Footer destinations, all existing routes.
const FOOTER_INSTAGRAM = 'https://www.instagram.com/sabrinart_collection';
const FOOTER_EMAIL = 'sabrinartcollection@gmail.com';
const FOOTER_LINKS = [
{ label: 'Gallery', href: '#/gallery' },
{ label: 'Shipping', href: '#/shipping' },
{ label: 'Commissions', href: '#/commissions' },
{ label: 'Returns', href: '#/returns' },
{ label: 'Contact', href: '#/contact' }];


function FooterV2({ dark = false }) {
  const bg = dark ? T.navy : T.paper2;
  const fg = dark ? T.cream : T.ink;
  const fg2 = dark ? 'rgba(255,255,255,.66)' : T.taupe;
  const hair = dark ? 'rgba(255,255,255,.12)' : T.hair;
  return (
    <footer className="sa-footer" style={{
      background: bg, color: fg, borderTop: `1px solid ${hair}`,
      '--sa-foot-fg': fg, '--sa-foot-fg2': fg2, '--sa-foot-hair': hair
    }}>
      <div className="sa-footer-inner">
        <div className="sa-footer-main">
          <div className="sa-footer-brand">
            <Logo light={dark} size={55} />
            <p className="sa-footer-tagline">Contemporary abstract art for modern interiors</p>
          </div>

          <div className="sa-footer-links">
            <nav className="sa-footer-nav" aria-label="Footer">
              {FOOTER_LINKS.map((l) =>
              <a key={l.label} href={l.href}>{l.label}</a>
              )}
            </nav>

            <div className="sa-footer-contact">
              <a href={`mailto:${FOOTER_EMAIL}`}>{FOOTER_EMAIL}</a>
              <a href={FOOTER_INSTAGRAM} target="_blank" rel="noopener noreferrer"
                aria-label="Instagram, @sabrinart_collection (opens in a new tab)">
                <InstagramIcon size={15} />
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="sa-footer-base">
          <span>© 2026 SabrinArt Collection</span>
          <span>Melbourne, Australia</span>
        </div>
      </div>
    </footer>);

}

/* ---------- StatIcon, small line-art icons for the stats row ---------- */
function StatIcon({ kind, color = '#b8852a', size = 42, style }) {
  const sw = 1.4;
  const common = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth: sw,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { position: 'relative', zIndex: 1, flexShrink: 0, ...style },
    'aria-hidden': true
  };
  if (kind === 'canvas') {
    // Stretched canvas on an easel
    return (
      <svg {...common}>
        <rect x="4" y="3.5" width="14" height="14" rx="0.4" />
        <line x1="4" y1="6.5" x2="18" y2="6.5" />
        <line x1="4" y1="14.5" x2="18" y2="14.5" />
        <line x1="11" y1="17.5" x2="11" y2="21" />
        <line x1="7.5" y1="21" x2="14.5" y2="21" />
      </svg>);
  }
  if (kind === 'tag') {
    // Price tag with hole
    return (
      <svg {...common}>
        <path d="M3.5 12.5 L11.5 4.5 L20 4.5 L20 13 L12 21 Z" />
        <circle cx="16.2" cy="8.3" r="1.3" />
      </svg>);
  }
  if (kind === 'frame') {
    // Framed painting on wall with hanging nail
    return (
      <svg {...common}>
        <circle cx="12" cy="3" r="0.6" fill={color} stroke="none" />
        <line x1="12" y1="3.3" x2="8.5" y2="6.5" />
        <line x1="12" y1="3.3" x2="15.5" y2="6.5" />
        <rect x="4.5" y="6.5" width="15" height="13" rx="0.4" />
        <rect x="7" y="9" width="10" height="8" rx="0.2" />
      </svg>);
  }
  if (kind === 'brush') {
    // Paintbrush at an angle
    return (
      <svg {...common}>
        <path d="M16 3.5 L20.5 8 L11 17.5 L7 18.5 L5.5 17 L6.5 13 Z" />
        <line x1="13.5" y1="6" x2="18" y2="10.5" />
        <path d="M6.5 13 L11 17.5" />
        <path d="M4 19 L7 18.5 L5.5 17 Z" />
      </svg>);
  }
  return null;
}

/* ---------- Home hero styles (white, two-column; stacks on narrow screens) ---------- */
(function injectHomeHeroStyles() {
  if (typeof document === 'undefined' || document.getElementById('sa-home-hero-css')) return;
  const s = document.createElement('style');
  s.id = 'sa-home-hero-css';
  s.textContent = `
    .sa-home-hero {
      background: #FFFFFF;
      display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
      align-items: center; gap: clamp(40px, 5vw, 96px);
      min-height: calc(100vh - 180px); box-sizing: border-box;
      max-width: 1600px; margin: 0 auto;
      padding: clamp(32px, 5vh, 64px) clamp(32px, 5vw, 80px) !important;
    }
    .sa-home-hero-art { margin: 0; min-width: 0; display: flex; justify-content: flex-end; }
    .sa-home-hero-art img {
      display: block; width: auto; height: auto; max-width: 100%;
      max-height: calc(100vh - 180px - 2 * clamp(32px, 5vh, 64px));
      opacity: 1 !important;
    }
    .sa-home-hero-text { min-width: 0; max-width: 520px; color: #111111; }
    .sa-home-hero-text h1, .sa-home-hero-text p { text-shadow: none !important; }
    .sa-home-hero-intro {
      font-family: ${T.display}; font-weight: 400; font-style: normal;
      font-size: clamp(30px, 2.9vw, 46px); line-height: 1.18; letter-spacing: -0.01em;
      color: #000000; margin: 0; overflow-wrap: break-word;
    }
    .sa-home-hero h1.sa-home-hero-title {
      font-family: ${T.sans}; font-weight: 400; font-style: normal;
      font-size: 16px !important; line-height: 1.55 !important; letter-spacing: .3px;
      color: #222222; margin: clamp(20px, 3vh, 32px) 0 0; overflow-wrap: break-word;
    }
    .sa-home-hero-ctas {
      display: flex; flex-wrap: wrap; align-items: center; gap: 14px 28px;
      margin-top: clamp(32px, 4.5vh, 48px);
    }
    .sa-home-hero-btn {
      display: inline-flex; align-items: center;
      font-family: ${T.sans}; font-size: 12px; font-weight: 500; letter-spacing: 1.4px;
      color: #111111; padding: 12px 22px; border: 1px solid #111111;
      text-decoration: none; transition: background .25s ease, color .25s ease;
    }
    .sa-home-hero-btn:hover, .sa-home-hero-btn:focus-visible { background: #111111; color: #FFFFFF; }
    .sa-home-hero-link {
      font-family: ${T.sans}; font-size: 13px; font-weight: 400; letter-spacing: .3px;
      color: #111111; text-decoration: underline; text-decoration-color: rgba(17,17,17,.35);
      text-underline-offset: 5px; transition: text-decoration-color .25s ease;
    }
    .sa-home-hero-link:hover, .sa-home-hero-link:focus-visible { text-decoration-color: #111111; }

    /* Tablet + mobile: stack artwork above the text */
    @media (max-width: 900px) {
      .sa-home-hero {
        grid-template-columns: 1fr; gap: 28px; min-height: 0; text-align: center;
        padding: 32px 40px 56px !important;
      }
      .sa-home-hero-art { justify-content: center; }
      .sa-home-hero-art img { max-height: 56vh; }
      .sa-home-hero-text { max-width: 560px; margin: 0 auto; }
      .sa-home-hero-ctas { justify-content: center; }
    }
    @media (max-width: 720px) {
      .sa-home-hero {
        gap: 22px;
        padding: 20px max(20px, env(safe-area-inset-right)) 48px max(20px, env(safe-area-inset-left)) !important;
      }
      .sa-home-hero-intro { font-size: clamp(24px, 7vw, 30px); }
      .sa-home-hero h1.sa-home-hero-title { font-size: 15px !important; margin-top: 16px; }
      .sa-home-hero-ctas { margin-top: 22px; gap: 6px 24px; }
      .sa-home-hero-btn { padding: 0 22px; min-height: 44px; }
    }
  `;
  document.head.appendChild(s);
})();

// ---------------------------------------------------------------------------
// ART IN INTERIORS, illustrative room mock-ups. Everything is drawn in
// centimetres (1 SVG unit = 1 cm), so each painting is scaled from its real size.
// Wall height 270 cm, floor line at y = 270. Painting shape comes from the photo.
// ---------------------------------------------------------------------------
const FLOOR_Y = 270;
const FURN = '#c3c7d0';
const FURN_DARK = '#9aa0ac';

function parseCm(s) {
  const m = String(s || '').match(/([\d.]+)\s*×\s*([\d.]+)/);
  return m ? [parseFloat(m[1]), parseFloat(m[2])] : [40, 40];
}

function RoomArt({ title, cx, bottom }) {
  const work = WORKS_CATALOG.find((w) => w.t === title);
  const [ratio, setRatio] = useState(null);
  useEffect(() => {
    if (!work || !work.src) return;
    const im = new Image();
    im.onload = () => setRatio(im.naturalWidth / im.naturalHeight);
    im.src = work.src;
  }, [work && work.src]);
  if (!work || !work.src) return null;
  const [a, b] = parseCm(work.sizeCm);
  const long = Math.max(a, b);
  const r = ratio || a / b;
  const w = r >= 1 ? long : long * r;
  const h = r >= 1 ? long / r : long;
  const bot = Math.min(bottom, 255 - h);
  const x = cx - w / 2;
  const y = FLOOR_Y - bot - h;
  return (
    <g>
      <rect x={x + 1.5} y={y + 2.5} width={w} height={h} fill="rgba(20,29,54,.22)" />
      <image href={work.src} x={x} y={y} width={w} height={h} preserveAspectRatio="none" />
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="0.6" />
    </g>
  );
}

// helpers: rect from the floor up (x, width, from-height, to-height)
const fr = (x, w, h0, h1, fill, key, rx) =>
  <rect key={key} x={x} y={FLOOR_Y - h1} width={w} height={h1 - h0} fill={fill} rx={rx || 0} />;

const ROOMS = [
  { id: 'living', label: 'Living room',
    art: [{ t: 'Smile', cx: 312, bottom: 118 }],
    furniture: () => [
      fr(165, 295, 0, 8, FURN_DARK, 'l1'),
      fr(165, 295, 8, 45, FURN, 'l2', 4),
      fr(175, 275, 45, 90, FURN, 'l3', 6),
      fr(165, 22, 8, 68, FURN_DARK, 'l4', 5),
      fr(438, 22, 8, 68, FURN_DARK, 'l5', 5),
      fr(500, 35, 0, 55, FURN, 'l6', 3), fr(512, 11, 55, 62, FURN_DARK, 'l7'),
      fr(75, 40, 0, 38, FURN_DARK, 'l8', 4), fr(85, 20, 38, 130, '#8fa391', 'l9', 10),
    ] },
  { id: 'office', label: 'Office',
    art: [{ t: 'Echoes in Red', cx: 300, bottom: 125 }],
    furniture: () => [
      fr(130, 290, 70, 74, FURN_DARK, 'o1'), fr(136, 5, 0, 70, FURN_DARK, 'o2'), fr(409, 5, 0, 70, FURN_DARK, 'o3'),
      fr(250, 50, 74, 114, '#2f3441', 'o4', 2), fr(270, 10, 74, 84, FURN_DARK, 'o5'),
      fr(440, 55, 0, 46, FURN, 'o6', 5), fr(446, 43, 46, 100, FURN, 'o7', 6),
      fr(60, 55, 0, 190, FURN, 'o8', 2), fr(62, 51, 95, 98, FURN_DARK, 'o9'), fr(62, 51, 145, 148, FURN_DARK, 'o10'),
    ] },
  { id: 'meeting', label: 'Meeting room',
    art: [{ t: 'Passion and Fire', cx: 312, bottom: 82 }],
    furniture: () => {
      const out = [fr(95, 435, 70, 76, FURN_DARK, 'm1'), fr(300, 8, 0, 70, FURN_DARK, 'm2')];
      [130, 215, 300, 385, 470].forEach((x, i) => {
        out.push(fr(x - 20, 40, 0, 44, FURN, 'mc' + i, 5), fr(x - 18, 36, 44, 92, FURN, 'mb' + i, 6));
      });
      return out;
    } },
  { id: 'reception', label: 'Reception',
    art: [{ t: 'Lights and Shadows', cx: 312, bottom: 150 }],
    furniture: () => [
      fr(170, 285, 0, 108, FURN, 'r1', 3), fr(160, 305, 108, 114, FURN_DARK, 'r2'),
      fr(240, 30, 114, 138, '#2f3441', 'r3', 2),
      fr(70, 40, 0, 40, FURN_DARK, 'r4', 4), fr(82, 16, 40, 140, '#8fa391', 'r5', 8),
      fr(510, 40, 0, 40, FURN_DARK, 'r6', 4), fr(522, 16, 40, 140, '#8fa391', 'r7', 8),
    ] },
  { id: 'waiting', label: 'Waiting room',
    art: [{ t: 'Green Orchid', cx: 262, bottom: 130 }, { t: 'Blue Lotus', cx: 362, bottom: 130 }],
    furniture: () => {
      const out = [];
      [150, 230, 310, 390].forEach((x, i) => {
        out.push(fr(x, 72, 0, 8, FURN_DARK, 'wl' + i), fr(x, 72, 8, 44, FURN, 'ws' + i, 5), fr(x + 4, 64, 44, 88, FURN, 'wb' + i, 6));
      });
      out.push(fr(500, 50, 0, 50, FURN, 'wt', 3), fr(75, 40, 0, 38, FURN_DARK, 'wp1', 4), fr(85, 20, 38, 120, '#8fa391', 'wp2', 9));
      return out;
    } },
  { id: 'hospital', label: 'Hospital',
    art: [{ t: 'Harmony of Nature', cx: 255, bottom: 125 }, { t: 'Gold Droplets', cx: 370, bottom: 125 }],
    furniture: () => {
      const out = [fr(0, 625, 0, 100, 'rgba(160,190,200,.35)', 'h0'), fr(0, 625, 98, 102, FURN_DARK, 'h1'),
        fr(0, 625, 88, 93, FURN, 'h2'), fr(25, 100, 0, 205, '#dfe3e8', 'hd', 1), fr(112, 8, 100, 106, FURN_DARK, 'hk')];
      [210, 300, 390, 480].forEach((x, i) => {
        out.push(fr(x, 70, 0, 8, FURN_DARK, 'hl' + i), fr(x, 70, 8, 46, FURN, 'hs' + i, 5), fr(x + 4, 62, 46, 86, FURN, 'hb' + i, 6));
      });
      return out;
    } },
];

function ArtInteriors() {
  const [i, setI] = useState(0);
  const room = ROOMS[i];
  const captions = room.art.map((p) => WORKS_CATALOG.find((w) => w.t === p.t)).filter(Boolean);
  return (
    <section style={{ padding: 'clamp(40px, 5vh, 72px) clamp(24px, 5vw, 80px)', background: '#ffffff', borderTop: `1px solid ${T.hair}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <Eyebrow style={{ display: 'inline-block' }}>03 · Art in Interiors</Eyebrow>
          <h2 style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(40px, 5vw, 80px)', lineHeight: 1.0, color: T.navy, margin: '20px 0 0', letterSpacing: '-0.022em' }}>Art in Interiors</h2>
        </div>
        <div role="tablist" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 32 }}>
          {ROOMS.map((r, k) =>
            <button key={r.id} role="tab" aria-selected={k === i} onClick={() => setI(k)} style={{
              fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
              padding: '10px 16px', border: `1px solid ${k === i ? T.navy : T.hairStrong}`,
              background: k === i ? T.navy : '#ffffff', color: k === i ? '#ffffff' : T.navy,
            }}>{r.label}</button>
          )}
        </div>
        <div style={{ position: 'relative', marginTop: 28, border: `1px solid ${T.hair}` }}>
          <svg viewBox="0 0 625 325" style={{ display: 'block', width: '100%', height: 'auto' }} role="img" aria-label={`${room.label} illustrative mock-up`}>
            <rect x="0" y="0" width="625" height={FLOOR_Y} fill="#eef0f3" />
            <rect x="0" y={FLOOR_Y} width="625" height="55" fill="#d8d1c6" />
            <rect x="0" y={FLOOR_Y - 8} width="625" height="8" fill="#e4e6eb" />
            {room.art.map((p) => <RoomArt key={p.t} title={p.t} cx={p.cx} bottom={p.bottom} />)}
            {room.furniture()}
            <g transform={`translate(20 ${FLOOR_Y + 28})`}>
              <line x1="0" y1="0" x2="100" y2="0" stroke="#5a5e66" strokeWidth="1" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="#5a5e66" strokeWidth="1" />
              <line x1="100" y1="-4" x2="100" y2="4" stroke="#5a5e66" strokeWidth="1" />
              <text x="50" y="-8" textAnchor="middle" fontSize="9" fill="#5a5e66" fontFamily="Inter, sans-serif">100 cm</text>
            </g>
          </svg>
          <div style={{ position: 'absolute', right: 12, bottom: 10, fontFamily: T.mono, fontSize: 10, letterSpacing: 1.8, textTransform: 'uppercase', color: T.taupe, background: 'rgba(255,255,255,.9)', padding: '5px 9px' }}>Illustrative mock-up</div>
        </div>
        <div style={{ marginTop: 16, textAlign: 'center', fontFamily: T.sans, fontSize: 13, color: T.taupe, lineHeight: 1.7 }}>
          {captions.map((w, k) => <span key={w.t}>{k > 0 ? '  ·  ' : ''}<a href="#/gallery/on-sale" style={{ color: T.navy }}>{w.t}</a> · {w.sizeCm}</span>)}
        </div>
      </div>
    </section>
  );
}

function HomePageV2() {
  const [palette, setPalette] = useState('all');
  const PALETTES = [
  { id: 'all', label: 'All works', colors: [T.navy, T.gold, T.cream] },
  { id: 'gold', label: 'Gold & ink', colors: ['#a87422', '#d9b463', '#1c1410'] },
  { id: 'ocean', label: 'Ocean', colors: ['#1b9aaa', '#1f5b66', '#0e2b3a'] },
  { id: 'fire', label: 'Fire', colors: ['#e04a2f', '#c56b45', '#b83a7e'] },
  { id: 'nature', label: 'Nature', colors: ['#6e8c6f', '#e0c99a', '#b8852a'] },
  { id: 'cerise', label: 'Cerise', colors: ['#d9468c', '#e04788', '#b83a7e'] }];

  // Each work tagged with the palette(s) it belongs to, so a chip filters the grid.
  // Palette browser draws from the canonical catalog, only photographed works,
  // each keeping its real availability status.
  const WORKS = WORKS_CATALOG.
  filter((w) => w.src && w.pal).
  map((w) => ({ title: w.t, price: w.price, size: w.sizeIn || w.medium, year: w.year, src: w.src, status: w.status, p: w.pal }));
  const shownWorks = palette === 'all' ? WORKS : WORKS.filter((w) => w.p.includes(palette));

  return (
    <div style={{ background: T.paper, minHeight: '100vh', overflowX: 'hidden' }} data-screen-label="01 Home" id="main-content">

      <NavBar active="home" />

      {/* ====== 1. HERO, white editorial split: WOW (2011) | artist intro ====== */}
      <section className="sa-home-hero" aria-label="Sabrina Goria, WOW (2011)">
        <figure className="sa-home-hero-art">
          <img
            src={ART.wow}
            alt="WOW 11:11:11, 2011, painting by Sabrina Goria"
            width="1800" height="1342"
            fetchpriority="high" decoding="async" />
        </figure>
        <div className="sa-home-hero-text">
          <p className="sa-home-hero-intro">I explore emotions through layers, colour and space, creating art that tells a story.</p>
          <h1 className="sa-home-hero-title">SabrinArt Collection: Contemporary Abstract Art for Modern Interiors.</h1>
          <div className="sa-home-hero-ctas">
            <a href="#/about" className="sa-home-hero-btn">MEET SABRINA →</a>
            <a href="#/gallery" className="sa-home-hero-btn">DISCOVER THE COLLECTION →</a>
          </div>
        </div>
      </section>

      {/* ====== 2. NEW COLLECTION INTRO + GRID (white) ====== */}
      <section style={{ padding: 'clamp(48px, 5vh, 80px) clamp(32px, 5vw, 80px)', position: 'relative', background: "rgb(255, 255, 255)" }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>

          {/* Centered intro */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto' }}>
              <Eyebrow style={{ display: 'inline-block' }}>01 · Originals you can take home</Eyebrow>
              <h2 style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 1.0,
                color: T.navy, margin: '24px 0 0', letterSpacing: '-0.022em',
                textWrap: 'balance'
              }}>On Sale

              </h2>
            </div>
          </ScrollReveal>

          {/* On Sale grid, ON SALE works only, 3 per row. First row: SMILE | PASSION AND FIRE | GOLDEN PATH */}
          <style>{`
            .on-sale-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px 24px; margin-top: 40px; align-items: start; }
            @media (max-width: 960px) { .on-sale-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 560px) { .on-sale-grid { grid-template-columns: 1fr; gap: 32px; } }
          `}</style>
          <div className="on-sale-grid">
            {WORKS_CATALOG.filter((w) => w.status === 'ON SALE' && w.src).slice(0, 9).map((w, i) =>
              <ScrollReveal key={w.t} delay={(i % 3) * 80}>
                <HoverArtCard title={w.t} price={w.price} size={w.sizeIn} year={w.year} status="ON SALE" ratio="3/4" src={w.src} />
              </ScrollReveal>
            )}
          </div>

          {/* CTA centered below the grid */}
          <div style={{ textAlign: 'center', marginTop: 72 }}>
            <a href="#/gallery/on-sale" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '12px 24px',
              background: T.navy, color: T.cream,
              border: `1px solid ${T.navy}`, cursor: 'pointer',
              fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: 2.4,
              textTransform: 'uppercase', textDecoration: 'none',
              transition: 'background .25s, border-color .25s, color .25s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = T.fuchsia;
              e.currentTarget.style.borderColor = T.fuchsia;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = T.navy;
              e.currentTarget.style.borderColor = T.navy;
            }}>
              View all works on sale
              <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 18, letterSpacing: 0 }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ====== 3. EXHIBITIONS, Now showing / Coming up ====== */}
      <section style={{ padding: 'clamp(40px, 5vh, 72px) clamp(32px, 5vw, 80px)', background: '#ffffff', borderTop: `1px solid ${T.hair}` }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <style>{`
            .home-exh-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 36px; }
            @media (max-width: 760px) { .home-exh-grid { grid-template-columns: 1fr; } }
          `}</style>
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <Eyebrow style={{ display: 'inline-block' }}>02 · Exhibitions</Eyebrow>
              <h2 style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                fontSize: 'clamp(40px, 5vw, 80px)', lineHeight: 1.0, color: T.navy,
                margin: '20px 0 0', letterSpacing: '-0.022em'
              }}>Exhibitions</h2>
            </div>
          </ScrollReveal>
          {(() => {
            // Italian Festa ran 17-18 Oct 2026: "Coming up" until it ends, then "Recently".
            const festaOver = new Date() > new Date('2026-10-19T00:00:00+11:00');
            const cards = [
              { label: 'Now showing', title: 'Al Naturale Café', dates: '20 Sep – 20 Nov 2026',
                venue: '6 Acland Street, St Kilda', note: '5 paintings · opening details to come' },
              { label: festaOver ? 'Recently' : 'Coming up', title: 'Art & Design Expo: Italian Festa', dates: '17–18 Oct 2026',
                venue: 'First Floor, Royal Exhibition Building, 9 Nicholson St, Carlton',
                note: 'Free entry · Sat 11 am–10:30 pm, Sun 11 am–8:30 pm', href: 'https://italianfesta.com.au' }
            ];
            return (
              <div className="home-exh-grid">
                {cards.map((c, i) =>
                  <ScrollReveal key={c.title} delay={i * 80}>
                    <div style={{ border: `1px solid ${T.hairStrong}`, padding: 'clamp(24px, 3vw, 40px)', height: '100%', boxSizing: 'border-box' }}>
                      <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 2.4, textTransform: 'uppercase', color: T.gold }}>{c.label}</div>
                      <div style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(26px, 2.6vw, 38px)', color: T.navy, marginTop: 12, lineHeight: 1.1 }}>{c.title}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 14, color: T.ink, marginTop: 16 }}>{c.dates}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: T.taupe, marginTop: 4, lineHeight: 1.6 }}>{c.venue}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: T.taupe, marginTop: 4, lineHeight: 1.6 }}>{c.note}</div>
                      {c.href && <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 16, fontFamily: T.sans, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: T.navy }}>italianfesta.com.au →</a>}
                    </div>
                  </ScrollReveal>
                )}
              </div>
            );
          })()}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href="#/exhibitions" style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: 2.4, textTransform: 'uppercase', color: T.navy, textDecoration: 'none', borderBottom: `1px solid ${T.navy}`, paddingBottom: 4 }}>All exhibitions →</a>
          </div>
        </div>
      </section>

      <ArtInteriors />

      {/* ====== 4. TABBED STORY ====== */}
      <section style={{ padding: 'clamp(32px, 4vh, 56px) clamp(32px, 5vw, 80px)', position: 'relative', background: "rgb(243, 244, 246)" }}>
        <div style={{ maxWidth: 1480, margin: '0 auto', width: '100%' }}>
          <TabbedStory phases={[
          {
            n: '01', shortLabel: 'The Beginning',
            title: '11 November 2011, the painting that started it all',
            body: "On a quiet Friday night in Melbourne, Sabrina put her hand on a canvas and didn't lift it for hours. The piece, later named WOW, became the seed of everything that followed",
            work: 'WOW · 2011',
            workMeta: 'Origins · Private',
            img: ART.wow
          },
          {
            n: '02', shortLabel: 'The Breakthrough',
            title: 'Layers of Happiness, 2024',
            body: 'Her first solo at Space2b. Eight works built around the idea that happiness is not a destination but a stack of moments, visible only when you look at the cross-section',
            work: 'Layers of Happiness · 2024',
            workMeta: 'Space2b · Solo show',
            img: ART.confetti
          },
          {
            n: '03', shortLabel: 'The Play',
            title: 'Trilogy of Fun',
            body: 'Three paintings in conversation, bold, colourful, almost reckless. The trilogy that gave Sabrina permission to be loud on the canvas',
            work: 'Trilogy of Fun · 2023',
            workMeta: 'Series · Thematic',
            img: ART.joy
          },
          {
            n: '04', shortLabel: 'The Stillness',
            title: 'Ocean & Nature',
            body: 'Quieter, slower works. Sea greens, sand, eucalyptus, salt. The series that brought the studio outside',
            work: 'Ocean & Nature · 2022',
            workMeta: 'Series · Available',
            img: ART.turquoiseBeach
          }]
          } />
        </div>
      </section>

      <PaintStrokeDivider variant="B" width="64%" margin="0 auto" />

      {/* ====== 5. SHOP BY PALETTE ====== */}
      <section style={{ padding: 'clamp(48px, 6vh, 84px) clamp(32px, 5vw, 80px)', background: "rgb(255, 255, 255)" }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          {/* Header block, eyebrow + title + subtitle, vertical rhythm */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', gap: 'clamp(16px, 2vh, 24px)',
            marginBottom: 'clamp(40px, 5vh, 64px)', margin: "0px 0px 50px"
          }}>
            <ScrollReveal style={{ textAlign: 'center' }}>
              <Eyebrow style={{ display: 'inline-block' }}>03 · Find the work that matches your space</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={60} style={{ textAlign: 'center' }}>
              <H2>
                Shop by <em style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, color: T.gold }}>palette</em>
              </H2>
            </ScrollReveal>
            <ScrollReveal delay={120} style={{ textAlign: 'center' }}>
              <Body size={15} style={{ textAlign: 'center', margin: 0, whiteSpace: 'nowrap' }}>
                Six recurring palettes run through the work. Pick one to filter the gallery, or browse them all.
              </Body>
            </ScrollReveal>
          </div>

          {/* Filter chips row */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            marginBottom: 'clamp(40px, 5vh, 64px)'
          }}>
            <ColorChips value={palette} onChange={setPalette} palettes={PALETTES} />
          </div>

          {/* Artwork grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(16px, 2vw, 24px)',
            transition: 'opacity .35s'
          }} key={palette}>
            {shownWorks.map((w, i) =>
            <ScrollReveal key={w.title} delay={i * 50}>
                <HoverArtCard
                title={w.title} price={w.price} size={w.size} year={w.year} src={w.src}
                status={w.status} />
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* ====== 6. CURATOR'S PICK (navy, cream text, gold accents) ====== */}
      <section style={{ padding: 'clamp(48px, 6vh, 84px) clamp(32px, 5vw, 80px)', background: T.navy, color: T.cream, position: 'relative', overflow: 'hidden' }}>
        {/* oversized italic faint name in the bg */}
        {/* (watermark removed) */}

        <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'start' }}>
            <div style={{ position: 'relative' }}>
              {/* stacked artworks */}
              <div style={{ position: 'relative', height: 'clamp(360px, 42vw, 520px)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '74%', transform: 'rotate(-3deg)' }}>
                  <ImgPH label="Carnival of Venice" src={ART.carnivalOfVenice} ratio="4/5" dark />
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '54%', transform: 'rotate(4deg)' }}>
                  <ImgPH label="Gold Droplets" src={ART.goldDroplets} ratio="3/4" dark />
                </div>
                <div style={{
                  position: 'absolute', top: '38%', left: '36%', width: '40%', transform: 'rotate(-1deg)',
                  zIndex: 2
                }}>
                  <ImgPH label="Golden Heart" src={ART.goldenHeart} ratio="1/1" dark />
                </div>
              </div>
            </div>

            <ScrollReveal>
              <Eyebrow color={T.goldShimmer}>04 · Curator's Pick of the Week</Eyebrow>
              <h2 style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                fontSize: 'clamp(48px, 5.6vw, 88px)', lineHeight: 0.98,
                color: T.cream, letterSpacing: '-0.02em', margin: "60px 0px 5px"
              }}>
                Three works,<br />one Italian summer
              </h2>
              <Body color="rgba(255,255,255,.78)" size={16} style={{ marginTop: 26, maxWidth: 480 }}>
                A trio our advisor has been showing collectors all month, bold,
                warm, full of gold. Together they tell one story. Separately, they
                each rewrite a room
              </Body>

              <div style={{
                marginTop: 36, padding: '24px 28px',
                background: 'rgba(255,255,255,.04)',
                border: `1px solid ${T.hairStrong}`,
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24
              }}>
                {[
                ['$5,250', 'AUD trio'],
                ['+35', 'Pieces'],
                ['Free', 'AU shipping']].
                map(([n, l]) =>
                <div key={l}>
                    <div style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, color: T.goldShimmer, fontSize: 40, lineHeight: 1 }}>{n}</div>
                    <div style={{ marginTop: 8, fontFamily: T.mono, color: 'rgba(255,255,255,.55)', letterSpacing: 2, fontSize: 11, textTransform: 'uppercase' }}>{l}</div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', margin: "50px 0px 0px" }}>
                <MagneticBtn arrow primary style={{ background: T.gold, borderColor: T.gold, color: T.cream, padding: '9px 18px', fontSize: 9.5, letterSpacing: 2.4 }}>Enquire about the trio</MagneticBtn>
                <MagneticBtn arrow dark style={{ padding: '9px 18px', fontSize: 9.5, letterSpacing: 2.4 }}>View each piece</MagneticBtn>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ====== STATS, merged into Instagram section below ====== */}

      {/* ====== 8. COMPACT TESTIMONIAL ====== */}
      <section style={{ padding: 'clamp(40px, 5vh, 64px) clamp(32px, 5vw, 80px)', background: '#ffffff' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 36, alignItems: 'center',
          padding: '28px 36px',
          borderTop: `1px solid ${T.hair}`, borderBottom: `1px solid ${T.hair}`, lineHeight: "1"
        }}>
          <Eyebrow style={{ whiteSpace: 'nowrap' }}>05 · Collectors &amp; press</Eyebrow>
          <div>
            <QuoteRotator quotes={[
            { text: 'Her work has a literal weight to it, you can feel the layers from across the room',
              author: 'Helena & Marco D.', role: 'Collectors, South Yarra' },
            { text: 'Sabrina paints the way an Italian grandmother cooks, slowly, by feel, with tools that have nothing to do with painting',
              author: 'Vespa Rossa Restaurant', role: 'Exhibition host, St Kilda' },
            { text: 'The first piece I have ever bought where every visitor stops walking',
              author: 'James R.', role: 'Collector, Brighton' }]
            } interval={6500} compact />
          </div>
        </div>
      </section>

      {/* ====== 9b. STATS, same tone as Stay In ====== */}
      <section style={{ padding: 'clamp(32px, 4vh, 56px) clamp(32px, 5vw, 80px)', background: "rgb(255, 255, 255)" }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(28px, 4vh, 48px) clamp(48px, 6vw, 96px)'
        }}>
          {[
          [38, '', 'works in the collection', { c1: T.cerise, c2: T.fuchsia, c3: T.magenta, fade: 'rgba(217,70,140,0)' }, 'canvas'],
          [15, '', 'available to buy', { c1: T.cobalt, c2: T.indigo, c3: T.navy, fade: 'rgba(46,88,180,0)' }, 'tag'],
          [4, '', 'solo exhibitions', { c1: T.sunset, c2: T.coral, c3: T.poppy, fade: 'rgba(232,112,42,0)' }, 'frame'],
          [14, '+ yrs', 'painting practice', { c1: T.sand, c2: T.goldSoft, c3: T.goldShimmer, fade: 'rgba(224,201,154,0)' }, 'brush']].
          map(([n, suffix, label, halo, iconKey]) =>
          <ScrollReveal key={label} style={{ textAlign: 'center' }}>
              <div style={{
              position: 'relative',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              gap: 14,
              minHeight: 90
            }}>
                {/* Sutil halo radial detrás del número, color único por bloque */}
                <div aria-hidden style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: '85%', height: '150%',
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(ellipse at center,
                  ${halo.c1}3D 0%,
                  ${halo.c2}1F 28%,
                  ${halo.c3}0A 55%,
                  ${halo.fade} 75%)`,
                filter: 'blur(14px)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
                {/* Icono dorado a la izquierda del número */}
                <StatIcon kind={iconKey} color={T.gold} size={32} />
                <div style={{
                position: 'relative', zIndex: 1,
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 600,
                color: T.gold,
                lineHeight: 0.92, letterSpacing: '-0.04em',
                background: `linear-gradient(180deg, ${T.goldShimmer} 0%, ${T.gold} 55%, ${T.goldRich} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: 'clamp(64px, 7vw, 88px)', textAlign: "center",
                paddingRight: "0.25em", paddingLeft: "0.04em"
              }}>
                  <Counter to={n} suffix={suffix} />
                </div>
              </div>
              <div style={{
              marginTop: 10, fontFamily: T.sans, fontSize: 11, color: T.taupe,
              letterSpacing: 2.6, textTransform: 'uppercase', fontWeight: 300, textAlign: "center"
            }}>{label}</div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ====== 9. INSTAGRAM ====== */}
      <section style={{ position: 'relative', background: "linear-gradient(0deg, rgb(209, 213, 219) 0%, rgb(229, 231, 235) 22%, rgb(243, 244, 246) 50%, rgb(255, 255, 255) 100%)", padding: "clamp(28px, 3vh, 44px) 0 clamp(16px, 2vh, 28px)" }}>
        <div style={{ padding: '0 clamp(32px, 5vw, 80px)', maxWidth: 1480, marginLeft: 'auto', marginRight: 'auto', marginBottom: 'clamp(24px, 3vh, 40px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'clamp(16px, 2vh, 24px)' }}>
            <div style={{ textAlign: 'center' }}>
              <Eyebrow style={{ display: 'inline-block' }}>06 · @sabrinart_collection</Eyebrow>
              <h2 style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 0.95,
                color: T.gold, margin: '12px 0 0', letterSpacing: '-0.025em'
              }}>
                Follow the <span style={{ color: T.gold }}>journey</span>
              </h2>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Body size={15} style={{ textAlign: 'center', margin: 0, whiteSpace: 'nowrap' }}>
                Studio moments, new work, behind-the-scenes, the unfiltered side of an Italian painter living in Melbourne
              </Body>
            </div>
          </div>
        </div>

        {/* Instagram feed, full-bleed marquee of tall portrait tiles */}
        <div style={{ padding: 'clamp(16px, 2vh, 28px) 0', overflow: 'hidden' }}
        onMouseEnter={(e) => {const t = e.currentTarget.querySelector('.ig-track');if (t) t.style.animationPlayState = 'paused';}}
        onMouseLeave={(e) => {const t = e.currentTarget.querySelector('.ig-track');if (t) t.style.animationPlayState = 'running';}}>
          <div className="ig-track" style={{
            display: 'flex', gap: 20, width: 'max-content',
            animation: 'ig-scroll 80s linear infinite', willChange: 'transform'
          }}>
            {[...Array(12)].map((_, i) => {
              const captions = [
              'Studio · 24k gold leaf', 'Detail · Golden Path',
              'Rolling pin · texture day', 'Layer 14 of 20',
              'New canvas · Day 1', 'Brunswick studio',
              'Pastry scraper · close up', 'Resin pour',
              'Behind Layers of Happiness', 'Sketchbook · Asti',
              'Studio cat approves', 'New collection · in progress'];
              const feed = [
              PHOTO.brushes, ART.goldDroplets, PHOTO.paintingAction, ART.confetti,
              PHOTO.studioSitting, PHOTO.porch, ART.butterfly, PHOTO.holdingTurquoise,
              ART.joy, PHOTO.holdingBlue, PHOTO.studioInterior, ART.turquoiseBeach];

              return (
                <div key={i} style={{ width: 'clamp(240px, 22vw, 320px)', flexShrink: 0 }}>
                  <div style={{
                    boxShadow: '0 36px 70px -32px rgba(28,20,16,.32), 0 14px 32px -16px rgba(28,20,16,.18)'
                  }}>
                    <ImgPH label={`@sabrinart · post ${i % 12 + 1}`} src={feed[i % feed.length]} ratio="3/4" />
                  </div>
                  <div style={{
                    marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'
                  }}>
                    <div style={{
                      fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                      fontSize: 18, color: T.navy, letterSpacing: '-0.005em'
                    }}>{captions[i % captions.length]}</div>
                    <div style={{
                      fontFamily: T.mono, fontSize: 10, color: T.gold, letterSpacing: 1.4
                    }}>♥ {Math.floor(420 + i * 137)}</div>
                  </div>
                </div>);

            })}
          </div>
        </div>
        <style>{`
          @keyframes ig-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        {/* CTA centered below the feed */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 'clamp(16px, 2vh, 28px)' }}>
          <a href="https://www.instagram.com/sabrinart_collection" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '11px 24px',
            background: T.navy, color: T.cream,
            border: `1px solid ${T.navy}`, borderRadius: 999,
            fontFamily: T.sans, fontWeight: 500, letterSpacing: 2.4,
            textTransform: 'uppercase', textDecoration: 'none',
            boxShadow: '0 14px 32px -14px rgba(28,40,77,.45)',
            transition: 'background .25s, transform .2s, box-shadow .25s', fontSize: "15px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = T.gold;
            e.currentTarget.style.borderColor = T.gold;
            e.currentTarget.style.boxShadow = '0 18px 38px -14px rgba(184,133,42,.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = T.navy;
            e.currentTarget.style.borderColor = T.navy;
            e.currentTarget.style.boxShadow = '0 14px 32px -14px rgba(28,40,77,.45)';
          }}>
            <InstagramIcon size={20} color={T.cream} />
            Follow on Instagram
            <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14 }}>→</span>
          </a>
          <a href="#" style={{
            fontFamily: T.mono, fontSize: 11, letterSpacing: 2.4, color: T.taupe,
            textTransform: 'uppercase',
            borderBottom: `1px solid ${T.hairStrong}`, paddingBottom: 4
          }}>21.4K followers</a>
        </div>
      </section>

      {/* ====== 10. NEWSLETTER (soft navy gradient, before navy footer) ====== */}
      <section style={{
        position: 'relative', padding: 'clamp(36px, 4vh, 60px) clamp(32px, 5vw, 80px)', overflow: 'hidden',
        background: `linear-gradient(180deg, rgb(209, 213, 219) 0%, rgba(229, 231, 235, 0) 35%), radial-gradient(ellipse 40% 50% at center, #c8d2e4 0%, #d8dfec 25%, #e8ecf2 55%, #f3f4f6 85%), #f3f4f6`
      }}>
        {/* soft luminous glow bg */}
        <svg aria-hidden viewBox="0 0 1600 600" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 }}>
          <defs>
            <radialGradient id="ns-glow" cx=".5" cy=".4" r=".6">
              <stop offset="0" stopColor="#ffffff" stopOpacity=".9" />
              <stop offset=".5" stopColor="#dbe3f1" stopOpacity=".4" />
              <stop offset="1" stopColor="#1d2a4d" stopOpacity="0" />
            </radialGradient>
            <filter id="ns-blur"><feGaussianBlur stdDeviation="40" /></filter>
          </defs>
          <ellipse cx="800" cy="300" rx="700" ry="280" fill="url(#ns-glow)" filter="url(#ns-blur)" />
        </svg>

        <div style={{ position: 'relative', maxWidth: 920, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow color={T.goldRich} style={{ display: 'inline-block' }}>07 · Newsletter</Eyebrow>
          <h2 style={{
            fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
            fontSize: 'clamp(40px, 5vw, 76px)', lineHeight: 1, marginTop: 24,
            color: T.navy, letterSpacing: '-0.018em', textWrap: 'pretty'
          }}>Stay in the picture</h2>
          <Body color={T.taupe} size={15} style={{ marginTop: 18, maxWidth: 560, margin: '18px auto 0' }}>
            New collections, exhibition news, studio stories, once a month, never more.
            No noise. Just art
          </Body>

          <form onSubmit={(e) => e.preventDefault()} style={{
            marginTop: 48, display: 'flex', gap: 0, maxWidth: 560,
            margin: '48px auto 0', borderBottom: `1px solid ${T.navy}`, paddingBottom: 4
          }}>
            <input type="email" placeholder="your email address" style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: T.mono, fontSize: 14, color: T.navy, padding: '14px 4px',
              letterSpacing: 0.3
            }} />
            <button type="submit" style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '14px 8px', fontFamily: T.sans, fontSize: 11, fontWeight: 500,
              letterSpacing: 3, textTransform: 'uppercase', color: T.navy,
              display: 'inline-flex', alignItems: 'center', gap: 10
            }}>Subscribe <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 18, color: T.goldRich }}>→</span></button>
          </form>
        </div>
      </section>

      <FooterV2 dark />
    </div>);

}

window.HomePageV2 = HomePageV2;
window.FooterV2 = FooterV2;
