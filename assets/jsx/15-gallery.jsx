// Gallery v2, dynamic. Marquee header, sticky filter rail, asymmetric editorial
// rows with painterly overlap, plus animated stats footer.

const COLLECTIONS_V2 = [
{ n: '01', tag: 'New', title: 'New Collection', sub: 'Current Projects · 2025-2026',
  body: 'The latest works, fresh from the studio, new pieces and current projects, including art being prepared for upcoming exhibitions. Available to purchase.',
  count: 9, status: 'ON SALE', range: '$520 to $2,360 AUD', feature: 'SMILE',
  palette: [T.gold, T.goldRich, T.terracotta], img: ART.smile },
{ n: '02', tag: 'Available', title: 'Available Collection', sub: 'Originals ready to find a new home',
  body: 'Original works currently available. Each piece shows its full details, size, medium, year and price, ready to add to your cart or enquire about.',
  count: 5, status: 'AVAILABLE', range: '$470 to $630 AUD', feature: 'Turquoise Beach',
  palette: [T.ocean, T.eucalyptus, T.sand], img: ART.turquoiseBeach },
{ n: '03', tag: 'Acquired', title: 'Acquired Collection', sub: 'Works that have found their homes',
  body: "Works collected by private collectors, through exhibitions, and from the artist's own collection. Not for sale, but part of the story.",
  count: 23, status: 'ACQUIRED', range: null, feature: 'Confetti and Falling Stars',
  palette: [T.indigo, T.gold, T.cream], img: ART.confetti },
{ n: '04', tag: 'Private', title: 'Private Collection', sub: "Not for Sale, the artist's personal works",
  body: "The most personal works, including WOW, the painting that started it all on 11 November 2011.",
  count: 2, status: 'NOT FOR SALE', range: null, feature: 'WOW',
  palette: [T.vermillion, T.poppy, T.fuchsia], img: ART.wow },
{ n: '05', tag: 'Exhibitions', title: 'Exhibition Collections', sub: '4 solo shows · Melbourne',
  body: 'Works grouped by the exhibitions they appeared in, a chance to revisit each show as it was first seen.',
  count: 4, status: null, range: null, feature: 'Layers of Happiness · Space2b',
  palette: [T.cobalt, T.gold, T.paperDeep], img: ART.carnival },
{ n: '06', tag: 'Thematic', title: 'Thematic Collections', sub: '5 themes · feelings, palettes, origins',
  body: 'Works grouped by theme and feeling: the Gold Collection, the Trilogy of Fun, the Ocean & Nature Series, Emotional Landscapes, and Origins.',
  count: 5, status: null, range: null, feature: 'Gold Series',
  palette: [T.cerise, T.magenta, T.sunset], img: ART.goldDroplets }];


function CollectionCardV2({ c }) {
  return (
    <ScrollReveal>
      <article style={{
        display: 'flex', flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}>
        {/* Image */}
        <div style={{ position: 'relative' }}>
          <ImgPH label={c.feature} src={c.img} ratio="4/5" />
        </div>

        {/* Content block */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* palette ribbon */}
          <div style={{ display: 'inline-flex', alignSelf: 'flex-start', marginBottom: 14 }}>
            {c.palette.map((col, i) =>
              <span key={i} style={{
                width: 16, height: 16, background: col,
                marginLeft: i === 0 ? 0 : -5,
                border: '1.5px solid #ffffff', borderRadius: '50%'
              }} />
            )}
          </div>

          <Eyebrow style={{ margin: 0, marginBottom: 12, fontSize: 10, letterSpacing: 2.8 }}>
            {c.tag} · {c.count} {c.count === 1 ? 'work' : 'works'}
          </Eyebrow>

          <H2 size={'clamp(22px, 1.9vw, 30px)'} style={{ marginTop: 0, lineHeight: 1.15 }}>
            {c.title}
          </H2>

          <div style={{
            fontFamily: T.display, fontStyle: 'italic', fontWeight: 400,
            fontSize: 14, color: T.taupe, marginTop: 8, lineHeight: 1.4
          }}>{c.sub}</div>

          <p style={{
            fontFamily: T.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.6,
            color: T.taupe, margin: '14px 0 0',
            letterSpacing: 0.05,
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>{c.body}</p>

          {/* Status / range, compact row */}
          {(c.status || c.range) && (
            <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap', alignItems: 'center' }}>
              {c.status && <StatusTag status={c.status} />}
              {c.range && <span style={{
                fontFamily: T.mono, fontSize: 10, letterSpacing: 1.6, padding: '4px 8px',
                border: `1px solid ${T.gold}`, color: T.gold, whiteSpace: 'nowrap',
              }}>{c.range}</span>}
            </div>
          )}

          {/* Actions, pin to bottom of card */}
          <div style={{
            marginTop: 'auto', paddingTop: 20,
            display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
          }}>
            <MagneticBtn arrow href={`#/gallery/${c.tag.toLowerCase()}`}>View</MagneticBtn>
            <a href={`#/gallery/${c.tag.toLowerCase()}`} style={{
              fontFamily: T.sans, fontSize: 10.5, color: T.taupe, letterSpacing: 2.2,
              textTransform: 'uppercase', borderBottom: `1px solid ${T.taupeSoft}`,
              paddingBottom: 2,
            }}>Quick preview</a>
          </div>
        </div>
      </article>
    </ScrollReveal>);

}

function GalleryPageV2() {
  const SECTIONS = [
    { key: 'ON SALE', title: 'On Sale' },
    { key: 'SOLD', title: 'Sold' },
    { key: 'NOT FOR SALE', title: 'Not for Sale' },
  ];
  return (
    <div style={{ background: T.paper, minHeight: '100vh', overflow: 'hidden' }} data-screen-label="02 Gallery">
      <NavBar active="gallery" />
      <style>{`
        .gal-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(36px, 3.4vw, 56px) clamp(24px, 2.6vw, 40px); }
        @media (max-width: 980px) { .gal-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 600px) { .gal-grid { grid-template-columns: 1fr; } }
      `}</style>
      <section style={{ padding: 'clamp(48px, 6vh, 72px) clamp(24px, 5vw, 80px) clamp(64px, 8vh, 96px)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <h1 style={{
            fontFamily: T.display, fontWeight: 600, lineHeight: 0.94, textAlign: 'center',
            color: T.navy, letterSpacing: '-0.035em',
            fontSize: 'clamp(56px, 8vw, 120px)', margin: '0 0 clamp(40px, 6vh, 72px)',
          }}>
            <em style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>The</em> Gallery
          </h1>
          {SECTIONS.map((s) => {
            const list = WORKS_CATALOG.filter((w) => w.status === s.key);
            return (
              <div key={s.key} id={s.key.toLowerCase().replace(/ /g, '-')} style={{ marginBottom: 'clamp(56px, 8vh, 96px)' }}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 14, paddingBottom: 16,
                  borderBottom: `1px solid ${T.hair}`, marginBottom: 'clamp(28px, 4vh, 44px)',
                }}>
                  <h2 style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(30px, 3.4vw, 46px)', color: T.navy, margin: 0 }}>{s.title}</h2>
                  <span style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: 2, color: T.taupe }}>({list.length})</span>
                </div>
                <div className="gal-grid">
                  {list.map((w, i) =>
                    <ScrollReveal key={w.t} delay={(i % 3) * 40}>
                      <GalleryWorkCard w={w} />
                    </ScrollReveal>
                  )}
                </div>
              </div>);
          })}
        </div>
      </section>
      <FooterV2 dark />
    </div>);
}

window.GalleryPageV2 = GalleryPageV2;

// ---------------------------------------------------------------------------
// Works grouped by collection, drives the collection-detail view.
// ---------------------------------------------------------------------------
// Works for a collection are derived from the canonical WORKS_CATALOG, 
// photographed works first, then those whose photography is still pending.
function worksForCollection(key) {
  const list = WORKS_CATALOG.filter((w) => w.col === key);
  return list.slice().sort((a, b) => (a.src ? 0 : 1) - (b.src ? 0 : 1));
}

// Gallery card, shows price for sale works, prestige/context label otherwise.
// Works without a photo render a tasteful "photography in progress" plate.
// Works with a `gallery` array of multiple photos get a small carousel.
function GalleryWorkCard({ w }) {
  const onSale = w.status === 'ON SALE';
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <a href={`#/gallery/${w.slug}`} aria-label={w.t} style={{ display: 'block' }}>
        <ImgPH label={w.t} alt={`${w.t}, ${w.medium}`} src={w.src || undefined} ratio="1 / 1" badge={w.status} />
      </a>
      <div>
        <h4 style={{
          fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 24,
          color: T.navy, margin: 0, letterSpacing: '-0.01em',
        }}><a href={`#/gallery/${w.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{w.t}</a></h4>
        {w.short &&
          <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.55, color: T.taupe, margin: '8px 0 0' }}>{w.short}</p>
        }
        <div style={{
          marginTop: 10, fontFamily: T.mono, fontSize: 10, color: T.taupe, letterSpacing: 1.4, textTransform: 'uppercase', lineHeight: 1.7,
        }}>
          <div>{[w.year, w.sizeCm].filter(Boolean).join(' · ')}</div>
          <div>{w.medium}</div>
        </div>
        {onSale && w.price &&
          <div style={{ marginTop: 8, fontFamily: T.display, fontStyle: 'italic', fontSize: 22, fontWeight: 500, color: T.gold }}>AUD {w.price}</div>
        }
      </div>
    </article>);
}


// Exhibitions + thematic groupings (these route through to their own pages / themes).
const EXH_SHOWS = [
  { t: 'The Alley Edition Cafe', y: '2025', l: 'Collins Street, Melbourne', src: null },
  { t: 'Layers of Happiness', y: '2024', l: 'Space2b, St Kilda', src: 'assets/photos/exhib-reddot.jpg' },
  { t: 'Vespa Rossa Restaurant', y: '2024', l: 'St Kilda', src: null },
  { t: 'My Journey with Nature', y: '2019', l: 'Da Noi, South Yarra', src: 'assets/photos/da-noi.jpg' },
];
const THEMES = [
  { t: 'The Gold Collection', d: 'Works where gold leads, light, resilience and inner strength.', src: ART.goldDroplets },
  { t: 'Trilogy of Fun', d: 'Joy, Humor and Laughter, bold, colourful, almost reckless.', src: ART.joy },
  { t: 'Ocean & Nature Series', d: 'Sea greens, sand, eucalyptus and salt, the studio outdoors.', src: ART.turquoiseBeach },
  { t: 'Emotional Landscapes', d: 'Layered abstractions of memory, healing and transformation.', src: ART.confetti },
  { t: 'Origins', d: 'Where it began, WOW and the earliest works.', src: ART.wow },
];

function CollectionDetailPage({ tag }) {
  const key = (tag || '').toLowerCase();
  const onSaleWorks = WORKS_CATALOG.filter((w) => w.status === 'ON SALE');
  const onSalePrices = onSaleWorks.map((w) => parseInt(String(w.price).replace(/[^0-9]/g, ''), 10)).filter((n) => n);
  const ON_SALE_META = { n: '00', tag: 'On Sale', title: 'On Sale',
    body: 'Original works currently on sale. Each piece shows its full details, size, medium, year and price, ready to add to your cart or enquire about.',
    count: onSaleWorks.length, status: 'ON SALE',
    range: onSalePrices.length ? `$${Math.min(...onSalePrices).toLocaleString('en-US')} to $${Math.max(...onSalePrices).toLocaleString('en-US')} AUD` : null,
    palette: [T.gold, T.goldRich, T.terracotta] };
  const meta = key === 'on-sale' ? ON_SALE_META : COLLECTIONS_V2.find((c) => c.tag.toLowerCase() === key);
  const works = key === 'on-sale' ? onSaleWorks : (['new', 'available', 'acquired', 'private'].includes(key) ? worksForCollection(key) : null);

  // Unknown tag → bounce back to the overview.
  if (!meta) {
    if (typeof window !== 'undefined') setTimeout(function () { window.saNavigate('/gallery'); }, 0);
    return null;
  }

  return (
    <div style={{ background: T.paper, minHeight: '100vh', overflow: 'hidden' }} data-screen-label={`02 Gallery · ${meta.title}`}>
      <NavBar active="gallery" />

      {/* Breadcrumb */}
      <div style={{
        padding: '24px clamp(24px,5vw,80px) 0', maxWidth: 1320, margin: '0 auto',
        fontFamily: T.mono, fontSize: 12, color: T.taupe, letterSpacing: 2.2, textTransform: 'uppercase',
      }}>
        <a href="#/gallery" style={{ color: T.taupe }}>Gallery</a>
        <span style={{ color: T.taupeSoft, margin: '0 10px' }}>/</span>
        <span style={{ color: T.gold }}>{meta.title}</span>
      </div>

      {/* HEADER */}
      <section style={{ padding: 'clamp(28px,4vh,52px) clamp(24px,5vw,80px) 0' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignSelf: 'flex-start', marginBottom: 18 }}>
            {meta.palette.map((col, i) =>
              <span key={i} style={{
                width: 18, height: 18, background: col, marginLeft: i === 0 ? 0 : -6,
                border: '2px solid #ffffff', borderRadius: '50%',
              }} />
            )}
          </div>
          <Eyebrow style={{ margin: 0, marginBottom: 14 }}>{key === 'on-sale' ? 'Works on sale' : `${meta.n} · ${meta.tag} Collection`}</Eyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'end' }} className="cd-head">
            <h1 style={{
              fontFamily: T.display, fontStyle: 'normal', fontWeight: 600, lineHeight: 0.94,
              color: T.navy, letterSpacing: '-0.03em', fontSize: 'clamp(52px,7vw,112px)', margin: 0,
            }}>
              <em style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>{meta.title.split(' ')[0]}</em>{meta.title.slice(meta.title.indexOf(' '))}
            </h1>
            <div>
              <p style={{
                fontFamily: T.sans, fontSize: 'clamp(14px,1.05vw,16px)', fontWeight: 300, lineHeight: 1.7,
                color: 'rgba(29,42,77,.82)', margin: 0, maxWidth: 480,
              }}>{meta.body}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap', alignItems: 'center' }}>
                {meta.status && <StatusTag status={meta.status} />}
                {meta.range && <span style={{
                  fontFamily: T.mono, fontSize: 10, letterSpacing: 1.6, padding: '5px 9px',
                  border: `1px solid ${T.gold}`, color: T.gold,
                }}>{meta.range}</span>}
                <span style={{
                  fontFamily: T.mono, fontSize: 10, letterSpacing: 1.6, padding: '5px 9px',
                  border: `1px solid ${T.hairStrong}`, color: T.taupe,
                }}>{(works ? works.length : meta.count)} {(works ? works.length : meta.count) === 1 ? 'WORK' : 'WORKS'}</span>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden style={{ marginTop: 'clamp(32px,5vh,56px)', marginLeft: 'calc(50% - 50vw)', width: '100vw', height: 1, background: T.hair }} />
      </section>

      {/* BODY, works grid, or sub-collection cards for exhibitions/thematic */}
      <section style={{ padding: 'clamp(40px,5vh,64px) clamp(24px,5vw,80px) clamp(64px,8vh,96px)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          {works &&
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 'clamp(28px,3vw,48px) clamp(20px,2.2vw,36px)',
            }}>
              {works.map((w, i) =>
                <ScrollReveal key={w.t} delay={i * 30}>
                  <GalleryWorkCard w={w} />
                </ScrollReveal>
              )}
            </div>
          }

          {key === 'exhibitions' &&
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'clamp(28px,3vw,44px)' }}>
              {EXH_SHOWS.map((e, i) =>
                <ScrollReveal key={e.t} delay={i * 50}>
                  <a href="#/exhibitions" style={{ display: 'block' }}>
                    <ImgPH label={e.t} src={e.src} ratio="4/5" />
                    <div style={{ marginTop: 14 }}>
                      <div style={{ fontFamily: T.mono, fontSize: 10, color: T.gold, letterSpacing: 2 }}>{e.y}</div>
                      <div style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 22, color: T.navy, marginTop: 4 }}>{e.t}</div>
                      <div style={{ fontFamily: T.sans, fontSize: 12, color: T.taupe, marginTop: 4 }}>{e.l}</div>
                    </div>
                  </a>
                </ScrollReveal>
              )}
            </div>
          }

          {key === 'thematic' &&
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'clamp(28px,3vw,44px)' }}>
              {THEMES.map((th, i) =>
                <ScrollReveal key={th.t} delay={i * 50}>
                  <ImgPH label={th.t} src={th.src} ratio="4/5" />
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 24, color: T.navy }}>{th.t}</div>
                    <p style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 300, lineHeight: 1.6, color: T.taupe, margin: '8px 0 0' }}>{th.d}</p>
                  </div>
                </ScrollReveal>
              )}
            </div>
          }

          {/* Back to all collections */}
          <div style={{ marginTop: 'clamp(48px,6vh,72px)', display: 'flex', justifyContent: 'center' }}>
            <MagneticBtn arrow href="#/gallery">Back to all collections</MagneticBtn>
          </div>
        </div>
        <style>{`@media (max-width: 760px){ .cd-head{ grid-template-columns:1fr !important; gap:24px !important; } }`}</style>
      </section>

      <FooterV2 dark />
    </div>);

}

window.CollectionDetailPage = CollectionDetailPage;