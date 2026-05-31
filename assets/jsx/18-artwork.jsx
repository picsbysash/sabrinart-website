// Artwork detail page, tabbed media (Art / Texture video / View in Room).
// Route: #/artwork/<slug>. Defaults to "golden-path" demo.

const ARTWORK_DEMO = {
  slug: 'gold-droplets',
  title: 'Gold Droplets',
  collection: 'Available Collection',
  year: 2019,
  sizeIn: '18 × 18 in',
  sizeCm: '45 × 45 cm',
  medium: 'Mixed Media on Canvas',
  surface: 'Canvas with layered texture and gold',
  signed: 'Yes, on the back of the canvas',
  shipsFrom: 'Melbourne, Australia',
  priceAUD: '$620',
  status: 'AVAILABLE',
  rooms: ['Living room', 'Bedroom', 'Office', 'Gallery wall'],
  master: ART.goldDroplets,
  details: [
    { l: 'Full', src: ART.goldDroplets },
    { l: 'Close-up 1', src: ART.goldDroplets },
    { l: 'Close-up 2', src: ART.goldDroplets },
    { l: 'Gold detail', src: ART.goldDroplets },
    { l: 'Angle', src: ART.goldDroplets },
  ],
  roomImgs: [ART.installBlue, ART.install025, ART.installCarnival, ART.install029],
  shortDesc: 'A textural exploration of gold, light and emotional richness.',
  longDesc: `Gold Droplets explores the emotional language of gold, texture and light. The composition is built through layered surfaces that reflect and absorb light differently across the canvas. Gold becomes both material and symbol, representing value, energy and inner richness. The work balances delicacy with intensity through controlled spontaneity, so the surface shifts and catches the light from every angle.`,
};

function ArtworkPage() {
  const [tab, setTab] = useState('art'); // art | texture | room
  const [room, setRoom] = useState(0);
  const a = ARTWORK_DEMO;
  return (
    <div style={{ background: T.lightStage, minHeight: '100vh' }} data-screen-label="07 Artwork">
      <NavBar active="gallery" />

      {/* Breadcrumb */}
      <div style={{
        padding: '24px 80px 0',
        fontFamily: T.mono, fontSize: 15, color: T.taupe, letterSpacing: 2.2,
        textTransform: 'uppercase',
      }}>
        <a href="#/gallery" style={{ color: T.taupe }}>Gallery</a>
        <span style={{ color: T.taupeSoft, margin: '0 10px' }}>/</span>
        <a href="#/gallery" style={{ color: T.taupe }}>New Collection</a>
        <span style={{ color: T.taupeSoft, margin: '0 10px' }}>/</span>
        <span style={{ color: T.gold }}>{a.title}</span>
      </div>

      <Section padding="32px 80px 80px">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'flex-start' }}>
          {/* LEFT, Media viewer with tabs */}
          <div>
            {/* Tab bar */}
            <div style={{
              display: 'flex', gap: 0, borderBottom: `1px solid ${T.hairStrong}`,
              marginBottom: 28,
            }}>
              {[
                { id: 'art', label: 'The Artwork', sub: '6 photos' },
                { id: 'texture', label: 'Texture & Gold', sub: 'Detail' },
                { id: 'room', label: 'View in Room', sub: '4 rooms' },
              ].map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  flex: 1, padding: '18px 24px', background: 'transparent',
                  border: 'none', borderBottom: tab === t.id ? `2px solid ${T.gold}` : '2px solid transparent',
                  cursor: 'pointer', textAlign: 'left', marginBottom: -1,
                  transition: 'all .25s ease',
                }}>
                  <div style={{
                    fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 20,
                    color: tab === t.id ? T.gold : T.navy,
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    {t.icon && <span style={{ fontSize: 14 }}>{t.icon}</span>}
                    {t.label}
                  </div>
                  <div style={{
                    fontFamily: T.mono, fontSize: 9, color: T.taupe,
                    letterSpacing: 1.8, textTransform: 'uppercase', marginTop: 6,
                  }}>{t.sub}</div>
                </button>
              ))}
            </div>

            {/* Media slot, animated transition between tabs */}
            <div style={{ position: 'relative', minHeight: 540 }}>
              {tab === 'art' && (
                <div>
                  <ImgPH label={`${a.title} · master · ${a.sizeIn}`} src={a.master} ratio="4 / 3" badge={a.status} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 14 }}>
                    {a.details.map((d) => (
                      <ImgPH key={d.l} label={d.l} src={d.src} ratio="1 / 1" />
                    ))}
                  </div>
                </div>
              )}

              {tab === 'texture' && (
                <div>
                  <VideoPH
                    label="Texture & gold detail · 14 s macro loop"
                    ratio="4 / 3"
                    caption={`See the resin ridges and the way 24k gold catches the light across "${a.title}".`}
                  />
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14,
                  }}>
                    <VideoPH label="Gold leaf · close-up · 8 s" ratio="4 / 3" />
                    <VideoPH label="Surface relief · 6 s" ratio="4 / 3" />
                  </div>
                  <div style={{
                    marginTop: 18, padding: '14px 20px', background: T.cream,
                    border: `1px solid ${T.hairStrong}`,
                    fontFamily: T.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 14, color: T.taupe,
                  }}>
                    Tip, hover any image to enlarge it and study the texture and gold up close.
                  </div>
                </div>
              )}

              {tab === 'room' && (
                <div>
                  <ImgPH label={`${a.title} · hung in a ${a.rooms[room].toLowerCase()}`} src={a.roomImgs[room]} ratio="4 / 3" />
                  {/* Room switcher */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 14,
                  }}>
                    {a.rooms.map((r, i) => (
                      <button key={r} onClick={() => setRoom(i)} style={{
                        padding: 0, background: 'transparent', border: 'none', cursor: 'pointer',
                        position: 'relative', textAlign: 'left',
                      }}>
                        <ImgPH label={r} src={a.roomImgs[i]} ratio="4 / 3" />
                        <div style={{
                          position: 'absolute', inset: 0,
                          border: room === i ? `2px solid ${T.gold}` : '2px solid transparent',
                          background: room === i ? 'transparent' : 'rgba(255,255,255,.35)',
                          transition: 'all .2s',
                        }} />
                        <div style={{
                          position: 'absolute', bottom: 8, left: 8,
                          fontFamily: T.mono, fontSize: 9, letterSpacing: 1.8,
                          color: room === i ? T.gold : T.taupe, textTransform: 'uppercase',
                          background: 'rgba(255,255,255,.92)', padding: '3px 7px',
                        }}>{r}</div>
                      </button>
                    ))}
                  </div>
                  <div style={{
                    marginTop: 18, padding: '14px 20px', background: T.cream,
                    border: `1px solid ${T.hairStrong}`,
                    fontFamily: T.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 14, color: T.taupe,
                  }}>
                    See the scale, {a.title} in a real {a.rooms[room].toLowerCase()} setting.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT, Buy panel */}
          <aside style={{ position: 'sticky', top: 220 }}>
            <Eyebrow>{a.collection} · {a.year}</Eyebrow>
            <h1 style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
              fontSize: 64, color: T.navy, margin: '14px 0 0',
              lineHeight: 1.0, letterSpacing: '-0.02em',
            }}>{a.title}</h1>
            <div style={{
              fontFamily: T.serif, fontStyle: 'italic', fontSize: 20,
              color: T.taupe, marginTop: 12,
            }}>by Sabrina Goria · Melbourne</div>

            <div style={{
              marginTop: 32, padding: '28px 0',
              borderTop: `1px solid ${T.gold}`, borderBottom: `1px solid ${T.gold}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{
                  fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 44,
                  color: T.gold, lineHeight: 1,
                }}>{a.priceAUD}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontFamily: T.mono, fontSize: 15, color: T.taupe, letterSpacing: 1.8 }}>AUD</span>
                  <StatusTag status={a.status} />
                </div>
              </div>
              <Body size={12} style={{ marginTop: 10 }}>
                Shipping calculated at checkout. Secure payment by Stripe, 
                Visa, Mastercard, American Express and Apple Pay accepted.
              </Body>
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <Btn primary size="lg" style={{ flex: 1, justifyContent: 'center' }}>Add to Cart</Btn>
                <Btn size="lg" style={{ minWidth: 56, justifyContent: 'center' }}>♡</Btn>
              </div>
              <Btn ghost style={{
                width: '100%', justifyContent: 'center', marginTop: 10,
                border: `1px dashed ${T.navy}`,
              }}>Enquire about this work</Btn>
            </div>

            <div style={{ marginTop: 32 }}>
              <Eyebrow>Details</Eyebrow>
              <div style={{ marginTop: 14 }}>
                {[
                  ['Year', String(a.year)],
                  ['Medium', a.medium],
                  ['Size', `${a.sizeCm} · ${a.sizeIn}`],
                  ['Surface', a.surface],
                  ['Signed', a.signed],
                  ['Ships from', a.shipsFrom],
                ].map(([k, v]) => (
                  <div key={k} style={{
                    display: 'flex', justifyContent: 'space-between', gap: 16,
                    padding: '13px 0', borderBottom: `1px solid ${T.hair}`,
                  }}>
                    <span style={{ fontFamily: T.mono, fontSize: 9.5, color: T.ochre, letterSpacing: 2, textTransform: 'uppercase' }}>{k}</span>
                    <span style={{ fontFamily: T.serif, fontSize: 14, fontStyle: 'italic', color: T.navy, textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <Eyebrow>About this work</Eyebrow>
              <Body size={14} style={{ marginTop: 12 }}>{a.longDesc}</Body>
            </div>
          </aside>
        </div>
      </Section>

      <FooterV2 dark />
    </div>
  );
}

window.ArtworkPage = ArtworkPage;
