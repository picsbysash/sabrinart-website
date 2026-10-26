// Exhibitions (brief section 7): newest first. Each show: title, dates, venue, one main photo,
// "View Exhibition Photos →" (its own gallery page) and "Watch Video →" where a video exists.
// To add or edit a show, edit this list only. Photos live in assets/exhibitions/ as <slug>-01.jpg, <slug>-02.jpg ... (01 = main image).

const EXHIBITIONS = [
{
  slug: 'al-naturale-cafe',
  status: 'Now showing',
  title: 'Al Naturale Café',
  dates: '20 Sep – 20 Nov 2026',
  venue: '6 Acland Street, St Kilda',
  note: '5 paintings · opening details to come',
  photos: 0,
  video: null
},
{
  slug: 'italian-festa-2026',
  status: 'Recently',
  title: 'Art & Design Expo: Italian Festa',
  sub: 'Transformation in Colour',
  dates: '17–18 Oct 2026',
  venue: 'First Floor, Royal Exhibition Building, 9 Nicholson St, Carlton',
  note: 'Free entry · Sat 11 am–10:30 pm, Sun 11 am–8:30 pm',
  link: { label: 'italianfesta.com.au', href: 'https://italianfesta.com.au' },
  photos: 17,
  video: 'assets/exhibitions/italian-festa-2026.mp4'
},
{
  slug: 'the-hallway-edition-2025',
  title: 'The Hallway Edition',
  sub: 'Solo exhibition',
  dates: '2025',
  venue: 'Café, Collins Street, Melbourne',
  photos: 0,
  video: null
},
{
  slug: 'layers-of-happiness-2024',
  title: 'Layers of Happiness',
  dates: '1 October – 2 November 2024',
  venue: 'ArtSpace @ Space2b, 144 Chapel Street, St Kilda',
  photos: 14,
  video: null
},
{
  slug: 'my-journey-with-nature-second-exhibition-2019',
  title: 'My Journey with Nature: Second Exhibition',
  dates: 'Sunday 24 November 2019 · 5–8 pm',
  venue: 'Da Noi Restaurant, 95 Toorak Rd, South Yarra',
  photos: 14,
  video: null
},
{
  slug: 'my-journey-with-nature-2019',
  title: 'My Journey with Nature',
  dates: '15 Sep – 15 Nov 2019',
  venue: 'Da Noi Restaurant, 95 Toorak Rd, South Yarra',
  note: 'Opening Sunday 15 September, 4–7 pm',
  photos: 7,
  video: null
}];

window.EXHIBITIONS = EXHIBITIONS;

const exhImg = (e, n) => `assets/exhibitions/${e.slug}-${String(n).padStart(2, "0")}.webp`;

const exhLinkStyle = {
  fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: 2.2, textTransform: 'uppercase',
  color: T.navy, textDecoration: 'none', borderBottom: `1px solid ${T.navy}`, paddingBottom: 3
};

function ExhibitionCard({ e, i }) {
  const hasPhotos = e.photos > 0;
  return (
    <ScrollReveal>
      <article className="exh-row">
        <div className="exh-media">
          {hasPhotos ?
          <a href={`#/exhibitions/${e.slug}`} aria-label={`${e.title} photos`}>
              <img src={exhImg(e, 1)} alt={`${e.title}, ${e.venue}`} loading={i < 2 ? 'eager' : 'lazy'}
            style={{ width: '100%', height: 'auto', display: 'block', background: '#f6f4f0' }} />
            </a> :
          <div className="exh-nophoto">Photos coming soon</div>}
        </div>
        <div className="exh-text">
          {e.status &&
          <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 2.4, textTransform: 'uppercase', color: T.gold }}>{e.status}</div>}
          <h2 style={{
            fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, color: T.navy, margin: '12px 0 0',
            fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em'
          }}>{e.title}</h2>
          {e.sub && <div style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: 'clamp(16px, 1.4vw, 20px)', color: T.taupe, marginTop: 6 }}>{e.sub}</div>}
          <div style={{ fontFamily: T.sans, fontSize: 15, color: T.ink, marginTop: 18 }}>{e.dates}</div>
          <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: T.taupe, marginTop: 4, lineHeight: 1.6 }}>{e.venue}</div>
          {e.note && <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 300, color: T.taupe, marginTop: 4, lineHeight: 1.6 }}>{e.note}</div>}
          <div style={{ marginTop: 24, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            {hasPhotos && <a href={`#/exhibitions/${e.slug}`} style={exhLinkStyle}>View Exhibition Photos →</a>}
            {e.video && <a href={`#/exhibitions/${e.slug}`} style={exhLinkStyle}>Watch Video →</a>}
            {e.link && <a href={e.link.href} target="_blank" rel="noopener noreferrer" style={exhLinkStyle}>{e.link.label} →</a>}
          </div>
        </div>
      </article>
    </ScrollReveal>);
}

function ExhibitionsPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }} data-screen-label="Exhibitions">
      <NavBar active="exhibitions" />
      <section style={{ padding: 'clamp(40px, 6vh, 72px) clamp(24px, 5vw, 80px) clamp(56px, 8vh, 96px)' }}>
        <style>{`
          .exh-list { display: flex; flex-direction: column; gap: clamp(48px, 7vh, 88px); }
          .exh-row { display: grid; grid-template-columns: 1.15fr 1fr; gap: clamp(28px, 4vw, 64px); align-items: center; }
          .exh-media { min-width: 0; }
          .exh-nophoto { aspect-ratio: 4 / 3; display: flex; align-items: center; justify-content: center; background: #f6f4f0;
            font-family: ${T.mono}; font-size: 11px; letter-spacing: 2.4px; text-transform: uppercase; color: ${T.taupeSoft}; }
          @media (max-width: 760px) { .exh-row { grid-template-columns: 1fr; gap: 20px; } }
        `}</style>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vh, 72px)' }}>
            <h1 style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, color: T.navy, margin: 0,
              fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 1, letterSpacing: '-0.03em'
            }}>Exhibitions</h1>
          </div>
          <div className="exh-list">
            {EXHIBITIONS.map((e, i) => <ExhibitionCard key={e.slug} e={e} i={i} />)}
          </div>
        </div>
      </section>
      <FooterV2 />
    </div>);
}

// One page per exhibition with all of its photos.
function ExhibitionGalleryPage({ slug }) {
  const e = EXHIBITIONS.find((x) => x.slug === slug);
  const [open, setOpen] = useState(null);
  if (!e) return <ExhibitionsPage />;
  const nums = Array.from({ length: e.photos }, (_, k) => k + 1);
  useEffect(() => {
    if (open === null) return;
    const onKey = (ev) => {
      if (ev.key === 'Escape') setOpen(null);
      if (ev.key === 'ArrowRight') setOpen((o) => o % e.photos + 1);
      if (ev.key === 'ArrowLeft') setOpen((o) => (o - 2 + e.photos) % e.photos + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }} data-screen-label={`Exhibition ${e.title}`}>
      <NavBar active="exhibitions" />
      <section style={{ padding: 'clamp(32px, 5vh, 64px) clamp(24px, 5vw, 80px) clamp(56px, 8vh, 96px)' }}>
        <style>{`
          .exg-grid { columns: 3; column-gap: 16px; }
          .exg-grid button { display: block; width: 100%; padding: 0; margin: 0 0 16px; border: 0; background: #f6f4f0; cursor: zoom-in; break-inside: avoid; }
          .exg-grid img { width: 100%; height: auto; display: block; }
          @media (max-width: 900px) { .exg-grid { columns: 2; } }
          @media (max-width: 520px) { .exg-grid { columns: 1; } }
        `}</style>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <a href="#/exhibitions" style={{ ...exhLinkStyle, display: 'inline-block' }}>← All exhibitions</a>
          <h1 style={{
            fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, color: T.navy, margin: '28px 0 0',
            fontSize: 'clamp(36px, 4.5vw, 68px)', lineHeight: 1.05, letterSpacing: '-0.02em'
          }}>{e.title}</h1>
          <div style={{ fontFamily: T.sans, fontSize: 15, color: T.ink, marginTop: 16 }}>{e.dates}</div>
          <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 300, color: T.taupe, marginTop: 4 }}>{e.venue}</div>
          {e.video &&
          <div style={{ marginTop: 32, maxWidth: 560 }}>
            <video src={e.video} controls playsInline preload="metadata" poster={exhImg(e, 1)}
              style={{ width: '100%', maxHeight: '80vh', display: 'block', background: '#f6f4f0' }} />
          </div>}
          <div className="exg-grid" style={{ marginTop: 40 }}>
            {nums.map((n) =>
            <button key={n} onClick={() => setOpen(n)} aria-label={`Open photo ${n}`}>
                <img src={exhImg(e, n)} alt={`${e.title}, photo ${n}`} loading="lazy" />
              </button>)}
          </div>
        </div>
      </section>
      {open !== null &&
      <div role="dialog" aria-modal="true" onClick={() => setOpen(null)} style={{
        position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(255,255,255,.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out'
      }}>
          <img src={exhImg(e, open)} alt={`${e.title}, photo ${open}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          <button onClick={() => setOpen(null)} aria-label="Close" style={{
          position: 'absolute', top: 16, right: 20, border: 0, background: 'none', fontSize: 32, color: T.navy, cursor: 'pointer'
        }}>×</button>
        </div>}
      <FooterV2 />
    </div>);
}

window.ExhibitionsPage = ExhibitionsPage;
window.ExhibitionGalleryPage = ExhibitionGalleryPage;
