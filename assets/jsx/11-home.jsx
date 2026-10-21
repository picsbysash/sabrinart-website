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
{ label: 'Commissions', href: '#/commissions' },
{ label: 'Shipping & Returns', href: '#/shipping' },
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
    .sa-home-hero-name { font-family: ${T.display}; font-weight: 500; font-size: clamp(40px, 4.4vw, 72px); line-height: 1.02; letter-spacing: -0.02em; color: #000; margin: 0; }
    .sa-home-hero-sub { font-family: ${T.sans}; font-size: 16px; line-height: 1.5; color: #222; margin: 14px 0 0; }
    .sa-home-hero-cap { font-family: ${T.sans}; font-size: 13px; letter-spacing: 1.2px; color: #444; margin: clamp(24px, 4vh, 40px) 0 0; }
    .sa-home-hero-slogan { font-family: ${T.sans}; font-weight: 700; font-size: clamp(15px, 1.4vw, 19px); letter-spacing: 1.6px; line-height: 1.4; color: #000; margin: 8px 0 0; }
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

function RoomArt({ title, cx, bottom, scale = 1, floorY = FLOOR_Y, minY = FLOOR_Y - 255 }) {
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
  const w = (r >= 1 ? long : long * r) * scale;
  const h = (r >= 1 ? long / r : long) * scale;
  const x = cx - w / 2;
  const y = Math.max(minY, floorY - bottom * scale - h);
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
    photo: { src: 'assets/interiors/living.jpg', w: 1024, h: 637, scale: 1.65, floorY: 493, minY: 72 },
    art: [{ t: 'Smile', cx: 575, bottom: 112 }] },
  { id: 'office', label: 'Office',
    photo: { src: 'assets/interiors/office.jpg', w: 1024, h: 572, scale: 1.5, floorY: 462, minY: 62 },
    art: [{ t: 'Echoes in Red', cx: 520, bottom: 150 }] },
  { id: 'meeting', label: 'Meeting room',
    // the blank whiteboard on the wall is covered with a matching wall tone so the painting hangs on the wall
    photo: { src: 'assets/interiors/meeting.jpg', w: 1024, h: 687, scale: 1.5, floorY: 497, minY: 97,
      patch: { x: 343, y: 160, w: 349, h: 230 } },
    art: [{ t: 'Passion and Fire', cx: 517, bottom: 80 }] },
  { id: 'reception', label: 'Reception',
    photo: { src: 'assets/interiors/reception.jpg', w: 1024, h: 572, scale: 1.4, floorY: 440, minY: 160 },
    art: [{ t: 'Lights and Shadows', cx: 662, bottom: 116 }] },
  { id: 'waiting', label: 'Waiting room',
    photo: { src: 'assets/interiors/waiting.jpg', w: 1024, h: 572, scale: 1.7, floorY: 487, minY: 40 },
    art: [{ t: 'Green Orchid', cx: 440, bottom: 130 }, { t: 'Blue Lotus', cx: 560, bottom: 130 }] },
  { id: 'hospital', label: 'Hospital',
    photo: { src: 'assets/interiors/hospital.jpg', w: 1024, h: 687, scale: 1.8, floorY: 578, minY: 92 },
    art: [{ t: 'Harmony of Nature', cx: 270, bottom: 115 }, { t: 'Gold Droplets', cx: 400, bottom: 115 }] },
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
          {room.photo ?
            <svg viewBox={`0 0 ${room.photo.w} ${room.photo.h}`} style={{ display: 'block', width: '100%', height: 'auto' }} role="img" aria-label={`${room.label} illustrative mock-up`}>
              <defs>
                <linearGradient id="wallH" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#efefef" /><stop offset="0.45" stopColor="#e6e6e6" /><stop offset="1" stopColor="#d2d2d2" /></linearGradient>
                <linearGradient id="wallV" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity="0.11" /><stop offset="0.4" stopColor="#000" stopOpacity="0" /></linearGradient>
              </defs>
              <image href={room.photo.src} x="0" y="0" width={room.photo.w} height={room.photo.h} />
              {room.photo.patch && <g><rect x={room.photo.patch.x} y={room.photo.patch.y} width={room.photo.patch.w} height={room.photo.patch.h} fill="url(#wallH)" /><rect x={room.photo.patch.x} y={room.photo.patch.y} width={room.photo.patch.w} height={room.photo.patch.h} fill="url(#wallV)" /></g>}
              {room.art.map((p) => <RoomArt key={p.t} title={p.t} cx={p.cx} bottom={p.bottom} scale={room.photo.scale} floorY={room.photo.floorY} minY={room.photo.minY} />)}
            </svg>
            :
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
          }
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
  filter((w) => w.src && w.pal && w.status === 'ON SALE').
  map((w) => ({ title: w.t, price: w.price, size: w.sizeCm, year: w.year, src: w.src, status: w.status, p: w.pal }));
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
          <h1 className="sa-home-hero-name">Sabrina Goria</h1>
          <p className="sa-home-hero-sub">Italian Australian Abstract Expressionist Artist</p>
          <p className="sa-home-hero-cap">WOW 11:11:11, 2011 (Painting)</p>
          <p className="sa-home-hero-slogan">THE PAINTING THAT STARTED IT ALL.</p>
          <div className="sa-home-hero-ctas">
            <a href="#/gallery" className="sa-home-hero-btn">EXPLORE THE COLLECTION →</a>
            <a href="#/studio" className="sa-home-hero-link">Where it all began →</a>
          </div>
        </div>
      </section>

      {/* ====== SHORT INTRODUCTION ====== */}
      <section style={{ padding: 'clamp(40px, 6vh, 80px) clamp(24px, 5vw, 80px)', background: '#ffffff', textAlign: 'center', borderTop: `1px solid ${T.hair}` }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ fontFamily: T.display, fontWeight: 400, fontSize: 'clamp(28px, 3.2vw, 46px)', lineHeight: 1.2, letterSpacing: '-0.01em', color: '#000', margin: 0 }}>I explore emotions through layers, colour and space, creating art that tells a story.</p>
          <p style={{ fontFamily: T.sans, fontSize: 16, lineHeight: 1.6, color: '#222', margin: '22px 0 0' }}>SabrinArt Collection: Contemporary Abstract Art for Modern Interiors.</p>
          <div className="sa-home-hero-ctas" style={{ justifyContent: 'center' }}>
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
                            <h2 style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 1.0,
                color: T.navy, margin: '0', letterSpacing: '-0.022em',
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
                <HoverArtCard title={w.t} price={w.price} size={w.sizeCm} year={w.year} status="ON SALE" ratio="3/4" src={w.src} />
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

      {/* ====== STUDIO & PROCESS TEASER ====== */}
      <section style={{ padding: 'clamp(48px, 7vh, 96px) clamp(24px, 5vw, 80px)', background: '#ffffff', borderTop: `1px solid ${T.hair}` }}>
        <style>{`
          .home-studio { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(28px, 5vw, 80px); align-items: center; max-width: 1320px; margin: 0 auto; }
          .home-studio img { display: block; width: 100%; height: auto; }
          @media (max-width: 820px) { .home-studio { grid-template-columns: 1fr; text-align: center; } }
        `}</style>
        <div className="home-studio">
          <a href="#/studio"><img src="assets/studio/sabrina-painting.jpg" alt="Sabrina Goria painting in her studio" loading="lazy" /></a>
          <div>
            <h2 style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(36px, 4vw, 60px)', lineHeight: 1.05, color: T.navy, margin: 0 }}>Studio &amp; Process</h2>
            <div style={{ marginTop: 28 }}><a href="#/studio" className="sa-home-hero-btn">STEP INTO THE STUDIO →</a></div>
          </div>
        </div>
      </section>

      <FooterV2 dark />
    </div>);

}

window.HomePageV2 = HomePageV2;
window.FooterV2 = FooterV2;
