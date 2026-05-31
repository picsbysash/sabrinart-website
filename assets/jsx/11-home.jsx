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

/* ---------- FooterV2, bigger, weightier; matches the site's visual scale ---------- */
function FooterV2({ dark = false }) {
  const bg = dark ? T.navy : T.paper2;
  const fg = dark ? T.cream : T.ink;
  const fg2 = dark ? 'rgba(255,255,255,.66)' : T.taupe;
  const eyebrow = dark ? T.goldShimmer : T.ochre;
  return (
    <footer style={{
      background: bg, color: fg, padding: '36px 80px 24px',
      borderTop: `1px solid ${dark ? 'rgba(255,255,255,.12)' : T.hairStrong}`,
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Gigantic italic wordmark in the back */}
      {/* (watermark removed) */}

      <div style={{ position: 'relative', maxWidth: 1480, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1.5fr', gap: 80
        }}>
          <div>
            <Logo light={dark} size={68} />
            <div style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 400,
              fontSize: 26, color: fg, lineHeight: 1.35, marginTop: 32, maxWidth: 380,
              letterSpacing: '-0.005em'
            }}>
              SabrinArt Collection, Contemporary Abstract Art for Modern Interiors
            </div>
            <div style={{
              fontFamily: T.sans, fontSize: 15, color: fg2, marginTop: 22, lineHeight: 1.7, maxWidth: 360, fontWeight: 300
            }}>
              Original paintings by Sabrina Goria, signed and shipped from her
              studio in Melbourne, Australia.
            </div>
          </div>

          <div>
            <div style={{ fontFamily: T.mono, fontSize: 11.5, letterSpacing: 3.4, color: eyebrow, textTransform: 'uppercase', marginBottom: 26 }}>Browse</div>
            <div style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: 22, color: fg, lineHeight: 1.85, fontWeight: 400 }}>
              <a href="#/gallery" style={{ display: 'block' }}>Gallery</a>
              <a href="#/about" style={{ display: 'block' }}>About</a>
              <a href="#/studio" style={{ display: 'block' }}>Studio</a>
              <a href="#/exhibitions" style={{ display: 'block' }}>Exhibitions</a>
              <a href="#/contact" style={{ display: 'block' }}>Contact</a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: T.mono, fontSize: 11.5, letterSpacing: 3.4, color: eyebrow, textTransform: 'uppercase', marginBottom: 26 }}>Information</div>
            <div style={{ fontFamily: T.sans, fontSize: 16, color: fg2, lineHeight: 2.1, fontWeight: 300 }}>
              <span style={{ display: 'block' }}>Shipping</span>
              <span style={{ display: 'block' }}>Returns</span>
              <span style={{ display: 'block' }}>Care &amp; Framing</span>
              <span style={{ display: 'block' }}>Privacy</span>
              <span style={{ display: 'block' }}>Terms</span>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: T.mono, fontSize: 11.5, letterSpacing: 3.4, color: eyebrow, textTransform: 'uppercase', marginBottom: 26 }}>Stay in the picture</div>
            <div style={{ fontFamily: T.sans, fontSize: 15, color: fg2, lineHeight: 1.7, marginBottom: 24, maxWidth: 320 }}>
              Be the first to see new collections, exhibition news and studio stories.
            </div>
            <div style={{
              display: 'flex', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.4)' : T.navy}`,
              paddingBottom: 12
            }}>
              <div style={{ flex: 1, fontFamily: T.mono, fontSize: 13.5, color: fg2, letterSpacing: 0.5 }}>your email address</div>
              <span style={{ fontFamily: T.sans, fontSize: 12, letterSpacing: 3, color: fg, textTransform: 'uppercase' }}>Subscribe →</span>
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 18 }}>
              {['Instagram', 'Facebook', 'YouTube', 'Pinterest'].map((s) =>
              <a key={s} href={s === 'Instagram' ? 'https://www.instagram.com/sabrinart_collection' : '#'}
                target={s === 'Instagram' ? '_blank' : undefined}
                rel={s === 'Instagram' ? 'noopener noreferrer' : undefined}
                style={{
                fontFamily: T.mono, fontSize: 11, color: fg2,
                letterSpacing: 2, textTransform: 'uppercase',
                borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.2)' : T.hair}`, paddingBottom: 4
              }}>{s}</a>
              )}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 96, paddingTop: 36,
          borderTop: `1px solid ${dark ? 'rgba(255,255,255,.12)' : T.hair}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          fontFamily: T.mono, fontSize: 12, color: fg2, letterSpacing: 2, textTransform: 'uppercase',
          flexWrap: 'wrap', gap: 24
        }}>
          <span>© 2026 SabrinArt Collection · Contemporary Abstract Art for Modern Interiors</span>
          <span>sabrinart.com.au · Melbourne, Australia · @sabrinart_collection</span>
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

      {/* ====== 1. DARK PAINTING HERO (animated video-style backdrop) ====== */}
      <DarkPaintingHero height="100vh" image={ART.blueHero}>
        <NavBar active="home" light floating />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-start',
          padding: 'max(200px, 22vh) clamp(32px, 5vw, 64px) clamp(60px, 8vh, 100px)', textAlign: 'center', height: "828px"
        }}>
          {/* tiny eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            padding: '7px 16px', background: 'rgba(20,29,54,.4)',
            border: '1px solid rgba(232,200,122,.45)', backdropFilter: 'blur(6px)',
            fontFamily: T.mono, fontSize: 10, color: T.goldShimmer, letterSpacing: 3.2,
            textTransform: 'uppercase', marginBottom: 36
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: T.goldShimmer,
              boxShadow: `0 0 12px ${T.goldShimmer}`
            }} />
            New Collection 2026 · 6 pieces on sale
          </div>

          <h1 style={{
            fontFamily: T.serif, fontWeight: 400, fontStyle: 'normal',
            fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1.05,
            letterSpacing: '-0.015em', color: '#ffffff', margin: 0,
            maxWidth: 1180, textShadow: '0 2px 24px rgba(0,0,0,.5)'
          }}>
            Painted in <em style={{ ...{ fontFamily: T.display, color: T.goldShimmer, fontStyle: 'italic', fontWeight: 500 }, fontFamily: "\"Cormorant Garamond\"" }}>layers</em>,
            built with <em style={{ fontFamily: T.display, color: T.goldShimmer, fontStyle: 'italic', fontWeight: 500 }}>gold</em>,
            <br />shipped from Melbourne to your wall
          </h1>

          <div style={{
            marginTop: 40, display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap'
          }}>
            <MagneticBtn href="#/gallery" arrow style={{
              background: T.goldRich, border: 'none', color: '#ffffff', padding: '12px 24px'
            }}>Discover the Collection</MagneticBtn>
            <MagneticBtn href="#/about" arrow style={{
              background: 'transparent', border: '1.5px solid #ffffff', color: '#ffffff', padding: '12px 24px'
            }}>Meet Sabrina</MagneticBtn>
          </div>

          <div style={{
            marginTop: 56, fontFamily: T.serif, fontStyle: 'italic',
            color: 'rgba(255,255,255,.7)', letterSpacing: 2, fontSize: "20px"
          }}>
            with art by Sabrina Goria · Asti · Milan · Melbourne
          </div>
        </div>
      </DarkPaintingHero>

      {/* ====== 2. NEW COLLECTION INTRO + GRID (white) ====== */}
      <section style={{ padding: 'clamp(48px, 5vh, 80px) clamp(32px, 5vw, 80px)', position: 'relative', background: "rgb(255, 255, 255)" }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>

          {/* Centered intro */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto' }}>
              <Eyebrow style={{ display: 'inline-block' }}>01 · Available now, originals you can take home</Eyebrow>
              <h2 style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 1.0,
                color: T.navy, margin: '24px 0 0', letterSpacing: '-0.022em',
                textWrap: 'balance'
              }}>Available Works

              </h2>
            </div>
          </ScrollReveal>

          {/* Editorial masonry, 3 columns, each an independent stack */}
          <style>{`
            .new-collection-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
              margin-top: 32px;
              align-items: start;
            }
            .nc-col {
              display: flex;
              flex-direction: column;
              gap: 24px;
            }
            @media (max-width: 960px) {
              .new-collection-grid { grid-template-columns: repeat(2, 1fr); }
              .nc-col--right { grid-column: span 2; flex-direction: row; }
              .nc-col--right > * { flex: 1; }
            }
            @media (max-width: 640px) {
              .new-collection-grid { grid-template-columns: 1fr; gap: 32px; }
              .nc-col--right { grid-column: auto; flex-direction: column; }
            }
          `}</style>
          <div className="new-collection-grid">
            {/* COL 1, dominant tall + square */}
            <div className="nc-col nc-col--left">
              <ScrollReveal>
                <HoverArtCard title="Silver Sea" price="$670" size="18 × 18 in" year="2019" status="AVAILABLE" ratio="3/4" src={ART.silverSea} />
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <HoverArtCard title="Gold Droplets" price="$620" size="18 × 18 in" year="2019" status="AVAILABLE" ratio="3/4" src={ART.goldDroplets} />
              </ScrollReveal>
            </div>

            {/* COL 2, square + tall */}
            <div className="nc-col nc-col--center">
              <ScrollReveal delay={120}>
                <HoverArtCard title="Butterfly" price="$480" size="12 × 12 in" year="2024" status="AVAILABLE" ratio="3/4" src={ART.butterfly} />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <HoverArtCard title="Party Time" price="$320" size="16 × 12 in" year="2024" status="AVAILABLE" ratio="3/4" src={ART.partyTime} />
              </ScrollReveal>
            </div>

            {/* COL 3, square + tall (mirrors col 2 for balanced heights) */}
            <div className="nc-col nc-col--right">
              <ScrollReveal delay={240}>
                <HoverArtCard title="Carnival" price="$420" size="12 × 12 in" year="2019" status="AVAILABLE" ratio="3/4" src={ART.carnival} />
              </ScrollReveal>
              <ScrollReveal delay={320}>
                <HoverArtCard title="Autumn" price="$210" size="10 × 10 in" year="2024" status="AVAILABLE" ratio="3/4" src={ART.oilPainting} />
              </ScrollReveal>
            </div>
          </div>

          {/* CTA centered below the grid */}
          <div style={{ textAlign: 'center', marginTop: 72 }}>
            <a href="#/gallery" style={{
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
              See the newest works
              <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 18, letterSpacing: 0 }}>→</span>
            </a>
          </div>
        </div>
      </section>

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
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.cream} strokeWidth="1.6" style={{ height: "20px", width: "20px" }}>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17" cy="7" r="0.9" fill={T.cream} />
            </svg>
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