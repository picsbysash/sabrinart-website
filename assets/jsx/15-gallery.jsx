// Gallery v2, dynamic. Marquee header, sticky filter rail, asymmetric editorial
// rows with painterly overlap, plus animated stats footer.

const COLLECTIONS_V2 = [
{ n: '01', tag: 'New', title: 'New Collection', sub: 'Current Projects · 2025-2026',
  body: 'The latest works, fresh from the studio, new pieces and current projects, including art being prepared for upcoming exhibitions. Available to purchase.',
  count: 6, status: 'ON SALE', range: '$210 to $2,360 AUD', feature: 'SMILE',
  palette: [T.gold, T.goldRich, T.terracotta], img: ART.smile },
{ n: '02', tag: 'Available', title: 'Available Collection', sub: 'Originals ready to find a new home',
  body: 'Original works currently available. Each piece shows its full details, size, medium, year and price, ready to add to your cart or enquire about.',
  count: 11, status: 'AVAILABLE', range: '$210 to $670 AUD', feature: 'Silver Sea',
  palette: [T.ocean, T.eucalyptus, T.sand], img: ART.silverSea },
{ n: '03', tag: 'Acquired', title: 'Acquired Collection', sub: 'Works that have found their homes',
  body: "Works collected by private collectors, through exhibitions, and from the artist's own collection. Not for sale, but part of the story.",
  count: 22, status: 'ACQUIRED', range: null, feature: 'Confetti and Falling Stars',
  palette: [T.indigo, T.gold, T.cream], img: ART.confetti },
{ n: '04', tag: 'Private', title: 'Private Collection', sub: "Not for Sale, the artist's personal works",
  body: "The most personal works, including WOW, the painting that started it all on 11 November 2011.",
  count: 2, status: 'NOT FOR SALE', range: null, feature: 'WOW',
  palette: [T.vermillion, T.poppy, T.fuchsia], img: ART.wow },
{ n: '05', tag: 'Exhibitions', title: 'Exhibition Collections', sub: '4 solo shows · Melbourne',
  body: 'Works grouped by the exhibitions they appeared in, a chance to revisit each show as it was first seen.',
  count: 4, status: null, range: null, feature: 'Layers of Happiness · Space2b',
  palette: [T.cobalt, T.gold, T.paperDeep], img: ART.installCarnival },
{ n: '06', tag: 'Thematic', title: 'Thematic Collections', sub: '5 themes · feelings, palettes, origins',
  body: 'Works grouped by theme and feeling: the Gold Collection, the Trilogy of Fun, the Ocean & Nature Series, Emotional Landscapes, and Origins.',
  count: 5, status: null, range: null, feature: 'Gold Series',
  palette: [T.cerise, T.magenta, T.sunset], img: ART.goldDroplets }];


function GalleryFilterRail({ active, onSelect, query, setQuery }) {
  const searching = (query || '').trim().length > 0;
  return (
    <aside style={{
      position: 'sticky', top: 200,
      padding: 0
    }}>
      {/* SEARCH, by artwork name or collection */}
      <div style={{
        marginBottom: 32, display: 'flex', alignItems: 'center', gap: 10,
        padding: '13px 16px',
        background: '#ffffff', border: `1px solid ${searching ? T.gold : T.hairStrong}`,
        transition: 'border-color .25s',
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="7" stroke={T.taupe} strokeWidth="1.8" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke={T.taupe} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artwork or collection…"
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: T.navy, letterSpacing: 0.2,
          }} />
        {searching &&
          <button onClick={() => setQuery('')} aria-label="Clear search" style={{
            flexShrink: 0, border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: T.mono, fontSize: 16, color: T.taupe, lineHeight: 1, padding: 0,
          }}>×</button>
        }
      </div>

      <div style={{
        marginBottom: 32, padding: '28px 24px', background: T.cream,
        border: `1px solid ${T.hairStrong}`
      }}>
        <Eyebrow color={T.ochre} style={{ margin: 0, marginBottom: 12 }}>Need advice?</Eyebrow>
        <div style={{
          fontFamily: T.display, fontStyle: 'italic', fontWeight: 400,
          fontSize: 18, color: T.navy, lineHeight: 1.35
        }}>Book a free 20-min advisory call with Sabrina.</div>
        <div style={{ marginTop: 20 }}>
          <a href="#/contact" style={{
            fontFamily: T.sans, fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
            color: T.gold, borderBottom: `1px solid ${T.gold}`, paddingBottom: 3
          }}>Book a call →</a>
        </div>
      </div>

      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.gold, letterSpacing: 3, marginBottom: 22, textTransform: 'uppercase' }}>
        Filter collections
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[{ tag: 'all', count: 41, n: '00' }, ...COLLECTIONS_V2].map((c) =>
        <button key={c.tag} onClick={() => onSelect(c.tag)} style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          gap: 14, padding: '10px 0',
          background: 'transparent', border: 'none', cursor: 'pointer',
          borderBottom: `1px solid ${active === c.tag ? T.gold : T.hair}`,
          textAlign: 'left', fontFamily: T.sans, fontSize: 13,
          color: active === c.tag ? T.gold : T.navy,
          fontWeight: active === c.tag ? 500 : 300,
          letterSpacing: 0.3, transition: 'color .25s, border-color .25s'
        }}>
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.taupeSoft, letterSpacing: 1.5 }}>{c.n}</span>
              <span style={{ textTransform: 'capitalize' }}>{c.tag === 'all' ? 'All works' : c.tag}</span>
            </span>
            <span style={{ fontFamily: T.mono, fontSize: 15, color: T.taupeSoft }}>{c.count}</span>
          </button>
        )}
      </div>

      {/* Origins · in her words, quote block */}
      <div style={{
        marginTop: 32, padding: '28px 24px', background: T.cream,
        border: `1px solid ${T.hairStrong}`,
        position: 'relative',
      }}>
        <Eyebrow color={T.ochre} style={{ margin: 0, marginBottom: 12 }}>Origins · in her words</Eyebrow>
        <div style={{
          fontFamily: T.display, fontStyle: 'italic', fontWeight: 400,
          fontSize: 18, color: T.navy, lineHeight: 1.4, letterSpacing: '-0.005em',
        }}>"Layers are central to my visual language, they hold memory, healing, transformation"</div>
        <div style={{
          marginTop: 18,
          fontFamily: T.mono, fontSize: 9, color: T.gold, letterSpacing: 2.4,
        }}>SABRINA G.</div>
        <div aria-hidden style={{
          position: 'absolute', top: -1, right: -1, width: 22, height: 22,
          background: T.gold,
        }} />
      </div>
    </aside>);

}

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
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');
  const filtered = active === 'all' ? COLLECTIONS_V2 : COLLECTIONS_V2.filter((c) => c.tag.toLowerCase() === active.toLowerCase());

  // Search across every artwork (by title/medium/status) and every collection.
  const q = query.trim().toLowerCase();
  const searching = q.length > 0;
  const COL_LABEL = { new: 'New Collection', available: 'Available Collection', acquired: 'Acquired Collection', private: 'Private Collection' };
  const matchedWorks = searching ? WORKS_CATALOG.filter((w) => {
    const colName = (COL_LABEL[w.col] || w.col || '').toLowerCase();
    return [w.t, w.medium, w.status, colName, w.label].filter(Boolean).join(' ').toLowerCase().includes(q);
  }) : [];
  const matchedCollections = searching ? COLLECTIONS_V2.filter((c) =>
    [c.title, c.tag, c.sub, c.body].join(' ').toLowerCase().includes(q)
  ) : [];

  return (
    <div style={{ background: T.paper, minHeight: '100vh', overflow: 'hidden' }} data-screen-label="02 Gallery">
      <NavBar active="gallery" />

      {/* HERO, asymmetric editorial: title left, descriptive paragraph right */}
      <section style={{ padding: 'clamp(48px, 6vh, 72px) clamp(24px, 5vw, 80px) 0', position: 'relative' }}>
        <div className="gallery-hero-grid" style={{
          maxWidth: 1320, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 'clamp(48px, 7vw, 120px)',
          alignItems: 'start',
        }}>
          {/* LEFT, eyebrow + title */}
          <div style={{ minWidth: 0 }}>
            <Eyebrow style={{ margin: 0, marginBottom: 20 }}>06 · The Gallery</Eyebrow>
            <h1 style={{
              fontFamily: T.display, fontStyle: 'normal', fontWeight: 600,
              lineHeight: 0.94,
              color: T.navy, letterSpacing: '-0.035em',
              fontSize: 'clamp(72px, 9vw, 144px)', margin: 0,
            }}>
              <em style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>The</em> Gallery
            </h1>
          </div>

          {/* RIGHT, descriptive paragraph, left-aligned, navy with soft opacity */}
          <div style={{ minWidth: 0, paddingTop: 'clamp(12px, 2vw, 28px)' }}>
            <p style={{
              fontFamily: T.sans, fontSize: 'clamp(15px, 1.1vw, 17px)', fontWeight: 300,
              lineHeight: 1.7, color: 'rgba(29, 42, 77, 0.82)',
              letterSpacing: 0.05, margin: 0, maxWidth: 540,
            }}>
              Sabrina's work is organised into six collections, six ways into the
              same world of colour, texture and emotion. Browse by what is new, what
              is available, or by the themes and exhibitions that connect them.
            </p>
          </div>
        </div>

        {/* Closing hairline, full-width, ultra-thin, light gray */}
        <div aria-hidden style={{
          marginTop: 'clamp(48px, 6vh, 80px)',
          marginLeft: 'calc(50% - 50vw)',
          width: '100vw',
          height: 1,
          background: T.hair,
        }} />

        <style>{`
          @media (max-width: 760px) {
            .gallery-hero-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
            .gallery-hero-grid > div:last-child { padding-top: 0 !important; }
          }
        `}</style>
      </section>

      {/* MARQUEE, contained editorial strip, subtle gray bg, secondary scale */}
      <section style={{
        marginTop: 'clamp(36px, 5vh, 56px)',
        padding: 'clamp(20px, 2.4vh, 32px) 0',
        background: T.paper2,
        borderTop: `1px solid ${T.hair}`,
        borderBottom: `1px solid ${T.hair}`,
        overflow: 'hidden'
      }}>
        <Marquee
          items={['New · 5', 'Available · 10', 'Acquired · 21', 'Private · 2', 'Exhibitions · 4', 'Thematic · 5']}
          speed={80} fontSize={56} gap={80} italic color={T.navy} separator="✦" />
        
      </section>

      {/* MAIN, sticky filter rail + 3-column editorial grid of collection cards */}
      <section style={{ padding: 'clamp(40px, 5vh, 64px) clamp(24px, 5vw, 80px) clamp(64px, 8vh, 96px)' }}>
        <div className="gallery-main-grid" style={{
          maxWidth: 1320, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'clamp(40px, 5vw, 72px)', alignItems: 'start'
        }}>
          <GalleryFilterRail active={active} onSelect={setActive} query={query} setQuery={setQuery} />

          <div style={{ minWidth: 0 }}>
            {searching &&
              <div style={{ marginBottom: 'clamp(28px, 3vh, 40px)' }}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                  gap: 16, flexWrap: 'wrap', paddingBottom: 16, borderBottom: `1px solid ${T.hair}`,
                }}>
                  <div style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(22px, 2.4vw, 30px)', color: T.navy }}>
                    {matchedWorks.length} {matchedWorks.length === 1 ? 'work' : 'works'} for "{query}"
                  </div>
                  {matchedCollections.length > 0 &&
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: T.mono, fontSize: 9, color: T.taupe, letterSpacing: 1.8, textTransform: 'uppercase' }}>Collections</span>
                      {matchedCollections.map((c) =>
                        <a key={c.tag} href={`#/gallery/${c.tag.toLowerCase()}`} style={{
                          fontFamily: T.sans, fontSize: 12, color: T.gold,
                          border: `1px solid ${T.gold}`, padding: '5px 11px', letterSpacing: 0.3,
                        }}>{c.title} →</a>
                      )}
                    </div>
                  }
                </div>
              </div>
            }

            {searching && matchedWorks.length === 0 &&
              <div style={{ padding: '60px 0', textAlign: 'center' }}>
                <div style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: 24, color: T.navy, marginBottom: 10 }}>No works found</div>
                <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: T.taupe, margin: 0 }}>
                  Try another title, or browse the collections below.
                </p>
                <div style={{ marginTop: 22 }}>
                  <button onClick={() => setQuery('')} style={{
                    fontFamily: T.sans, fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
                    color: T.gold, background: 'transparent', border: `1px solid ${T.gold}`, padding: '11px 22px', cursor: 'pointer',
                  }}>Clear search</button>
                </div>
              </div>
            }

            <div className="gallery-cards-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 'clamp(36px, 3.4vw, 56px) clamp(28px, 2.6vw, 44px)',
            }}>
              {!searching && filtered.map((c) => <CollectionCardV2 key={c.tag} c={c} />)}
              {searching && matchedWorks.map((w, i) =>
                <ScrollReveal key={w.t + i} delay={i * 25}>
                  <GalleryWorkCard w={w} showCollection />
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .gallery-main-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            .gallery-main-grid aside { position: static !important; }
          }
          @media (max-width: 600px) {
            .gallery-cards-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* STATS FOOTER */}
      <section style={{ padding: 'clamp(64px, 8vh, 96px) clamp(32px, 5vw, 80px)', background: T.navy, color: T.cream, position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{
          position: 'absolute', right: -80, top: -40,
          fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
          fontSize: 'clamp(160px, 22vw, 360px)', lineHeight: 0.85,
          color: T.indigo, opacity: 0.5, letterSpacing: '-0.05em', userSelect: 'none'
        }}>Collection</div>

        <div style={{
          maxWidth: 1200, margin: '0 auto', position: 'relative',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, textAlign: 'center'
        }}>
          {[[38, 'works total'], [15, 'available'], [6, 'collections'], [4, 'solo shows']].map(([n, l]) =>
          <ScrollReveal key={l}>
              <div style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
              fontSize: 'clamp(72px, 8vw, 132px)', color: T.goldShimmer,
              lineHeight: 1, letterSpacing: '-0.025em'
            }}><Counter to={n} /></div>
              <div style={{ marginTop: 16, fontFamily: T.mono, fontSize: 10.5, color: 'rgba(255,255,255,.6)', letterSpacing: 2.4, textTransform: 'uppercase' }}>{l}</div>
            </ScrollReveal>
          )}
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
function GalleryWorkCard({ w, showCollection }) {
  const onSale = w.status === 'ON SALE' || w.status === 'AVAILABLE';
  const COL_NAME = { new: 'New Collection', available: 'Available Collection', acquired: 'Acquired Collection', private: 'Private Collection' };
  const photos = (w.gallery && w.gallery.length > 1) ? w.gallery : (w.src ? [w.src] : []);
  const [idx, setIdx] = useState(0);
  const multi = photos.length > 1;
  const go = (dir, e) => { e.preventDefault(); e.stopPropagation(); setIdx((i) => (i + dir + photos.length) % photos.length); };
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ position: 'relative' }}>
        <ImgPH label={w.src ? w.t : `${w.t} · photo soon`} src={photos[idx] || undefined} ratio="4 / 5" badge={w.status} />
        {!w.src &&
          <div style={{
            position: 'absolute', bottom: 12, left: 12, right: 12, textAlign: 'center',
            fontFamily: T.mono, fontSize: 8.5, letterSpacing: 1.8, textTransform: 'uppercase',
            color: T.taupe, background: 'rgba(255,255,255,.9)', padding: '5px 8px',
          }}>Photography in progress</div>
        }
        {multi &&
          <React.Fragment>
            <button onClick={(e) => go(-1, e)} aria-label="Previous photo" style={{
              position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,.92)', color: T.navy, fontSize: 16, lineHeight: 1,
              display: 'grid', placeItems: 'center', boxShadow: '0 6px 18px -6px rgba(28,20,16,.4)',
            }}>‹</button>
            <button onClick={(e) => go(1, e)} aria-label="Next photo" style={{
              position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)',
              width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,.92)', color: T.navy, fontSize: 16, lineHeight: 1,
              display: 'grid', placeItems: 'center', boxShadow: '0 6px 18px -6px rgba(28,20,16,.4)',
            }}>›</button>
            <div style={{
              position: 'absolute', bottom: 12, left: 0, right: 0,
              display: 'flex', justifyContent: 'center', gap: 7,
            }}>
              {photos.map((_, i) =>
                <button key={i} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx(i); }} aria-label={`Photo ${i + 1}`} style={{
                  width: 7, height: 7, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
                  background: i === idx ? T.gold : 'rgba(255,255,255,.7)',
                  boxShadow: '0 1px 4px rgba(28,20,16,.3)',
                }} />
              )}
            </div>
          </React.Fragment>
        }
      </div>
      <div>
        <h4 style={{
          fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 22,
          color: T.navy, margin: 0, letterSpacing: '-0.01em',
        }}>{w.t}</h4>
        <div style={{
          marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10,
          fontFamily: T.mono, fontSize: 9.5, color: T.taupe, letterSpacing: 1.4, textTransform: 'uppercase',
        }}>
          <span>{[w.sizeIn, w.year].filter(Boolean).join(' · ')}</span>
          {onSale && w.price &&
            <span style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: 18, fontWeight: 500, color: T.gold, letterSpacing: 0 }}>{w.price}</span>
          }
        </div>
        {w.label &&
          <div style={{
            marginTop: 8, fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.gold, letterSpacing: 0.2,
          }}>{w.label}</div>
        }
        {showCollection && COL_NAME[w.col] &&
          <a href={`#/gallery/${w.col}`} style={{
            marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 7,
            fontFamily: T.mono, fontSize: 9, color: T.taupe, letterSpacing: 1.8, textTransform: 'uppercase',
          }}>
            <span style={{ width: 16, height: 1, background: T.gold }} />
            {COL_NAME[w.col]}
          </a>
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
  const meta = COLLECTIONS_V2.find((c) => c.tag.toLowerCase() === key);
  const works = ['new', 'available', 'acquired', 'private'].includes(key) ? worksForCollection(key) : null;

  // Unknown tag → bounce back to the overview.
  if (!meta) {
    if (typeof window !== 'undefined') window.location.hash = '#/gallery';
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
          <Eyebrow style={{ margin: 0, marginBottom: 14 }}>{meta.n} · {meta.tag} Collection</Eyebrow>
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