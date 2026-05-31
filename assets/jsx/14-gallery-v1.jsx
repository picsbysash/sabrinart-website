// Gallery, full hi-fi page following doc sections 6.1-6.2.

const COLLECTIONS = [
  {
    n: '01', tag: 'New Collection',
    title: 'New Collection',
    sub: 'Current Projects · 2025-2026',
    body: 'The latest works, fresh from the studio, new pieces and current projects, including art being prepared for upcoming exhibitions. Available to purchase.',
    count: 5, status: 'ON SALE', range: '$490 to $2,360 AUD',
    feature: 'Golden Path',
  },
  {
    n: '02', tag: 'Available',
    title: 'Available Collection',
    sub: 'Originals ready to find a new home',
    body: 'Original works currently available. Each piece shows its full details, size, medium, year and price, ready to add to your cart or enquire about.',
    count: 10, status: 'AVAILABLE', range: '$210 to $670 AUD',
    feature: 'Billabong',
  },
  {
    n: '03', tag: 'Acquired',
    title: 'Acquired Collection',
    sub: 'Works that have found their homes',
    body: "Works that have found their homes, collected by private collectors, through exhibitions, and from the artist's own collection. Not for sale, but part of the story.",
    count: 21, status: 'ACQUIRED', range: null,
    feature: 'Layers of Happiness',
  },
  {
    n: '04', tag: 'Private',
    title: 'Private Collection',
    sub: "Not for Sale, the artist's personal works",
    body: "The most personal works in the collection, pieces Sabrina has chosen to keep, including WOW, the painting that started it all on 11 November 2011.",
    count: 2, status: 'NOT FOR SALE', range: null,
    feature: 'WOW',
  },
  {
    n: '05', tag: 'Exhibitions',
    title: 'Exhibition Collections',
    sub: '4 solo shows · Melbourne',
    body: 'Works grouped by the exhibitions they appeared in, a chance to revisit each show as it was first seen.',
    count: 4, status: null, range: null,
    feature: 'Layers of Happiness · Space2b',
  },
  {
    n: '06', tag: 'Thematic',
    title: 'Thematic Collections',
    sub: '5 themes · feelings, palettes, origins',
    body: 'Works grouped by theme and feeling: the Gold Collection, the Trilogy of Fun, the Ocean & Nature Series, Emotional Landscapes, and Origins / The Beginning.',
    count: 5, status: null, range: null,
    feature: 'Gold Series',
  },
];

function CollectionRow({ c, idx }) {
  const reverse = idx % 2 === 1;
  return (
    <article style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
      padding: '60px 0', borderBottom: `1px solid ${T.hair}`,
    }}>
      <div style={{ order: reverse ? 2 : 1, position: 'relative' }}>
        <ImgPH label={c.feature} ratio="4 / 5" />
        <div style={{
          position: 'absolute', top: 24, left: reverse ? 'auto' : -16, right: reverse ? -16 : 'auto',
          fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
          fontSize: 132, color: T.gold, opacity: 0.85, lineHeight: 1,
          letterSpacing: '-0.04em',
        }}>{c.n}</div>
      </div>
      <div style={{ order: reverse ? 1 : 2 }}>
        <Eyebrow>{c.tag} · {c.count} {c.count === 1 ? 'work' : 'works'}</Eyebrow>
        <H2 size={56} style={{ marginTop: 18 }}>{c.title}</H2>
        <div style={{
          fontFamily: T.display, fontStyle: 'italic', fontWeight: 400,
          fontSize: 20, color: T.taupe, marginTop: 12,
        }}>{c.sub}</div>
        <Body size={15} maxWidth={520} style={{ marginTop: 28 }}>{c.body}</Body>
        <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          {c.status && <StatusTag status={c.status} />}
          {c.range && <span style={{
            fontFamily: T.mono, fontSize: 15, letterSpacing: 1.8, padding: '5px 10px',
            border: `1px solid ${T.gold}`, color: T.gold,
          }}>{c.range}</span>}
        </div>
        <div style={{ marginTop: 36 }}>
          <Btn arrow href="#/gallery">View Collection</Btn>
        </div>
      </div>
    </article>
  );
}

function GalleryPage() {
  return (
    <div style={{ background: T.lightStage, minHeight: '100vh' }} data-screen-label="02 Gallery">
      <NavBar active="gallery" />

      {/* 6.1, Gallery intro */}
      <Section padding="80px 80px 60px">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Eyebrow style={{ display: 'inline-block' }}>06 · The Gallery</Eyebrow>
          <H1 style={{ marginTop: 28, fontSize: 'clamp(56px, 7vw, 104px)' }}>
            <span style={{ fontStyle: 'italic', fontWeight: 500 }}>The</span> Gallery.
          </H1>
          <Body size={17} maxWidth={760} style={{ margin: '32px auto 0', textAlign: 'center' }}>
            Sabrina's work is organised into six collections, each one a different
            way into the same world of colour, texture and emotion. Explore by what
            is new, what is available, what has been collected, or by the themes and
            exhibitions that connect the work.
          </Body>
        </div>

        {/* Sub-nav: the 6 collection tabs */}
        <nav style={{
          display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap',
          padding: '32px 0 0', borderTop: `1px solid ${T.hair}`,
        }}>
          {COLLECTIONS.map((c, i) => (
            <a key={c.tag} href={`#/gallery/${c.tag.toLowerCase().replace(/\s/g, '-')}`} style={{
              display: 'inline-flex', alignItems: 'baseline', gap: 8,
              padding: '14px 22px',
              fontFamily: T.sans, fontSize: 11, letterSpacing: 2.2,
              textTransform: 'uppercase', color: i === 0 ? T.gold : T.navy,
              borderBottom: i === 0 ? `1px solid ${T.gold}` : '1px solid transparent',
            }}>
              {c.tag}
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.taupeSoft, letterSpacing: 1 }}>
                ({c.count})
              </span>
            </a>
          ))}
        </nav>
      </Section>

      <Rule width="calc(100% - 160px)" margin="40px auto" />

      {/* 6.2, The six collections, full editorial rows */}
      <Section padding="40px 80px 80px">
        {COLLECTIONS.map((c, i) => <CollectionRow key={c.tag} c={c} idx={i} />)}
      </Section>

      {/* TOTAL FOOTER STRIP */}
      <Section padding="100px 80px" bg={T.paper2}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40,
          textAlign: 'center', maxWidth: 1100, margin: '0 auto',
        }}>
          {[
            ['38', 'works total'],
            ['15', 'available to buy'],
            ['6', 'collections'],
            ['4', 'solo exhibitions'],
          ].map(([n, l]) => (
            <div key={l}>
              <div style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                fontSize: 88, color: T.gold, lineHeight: 1,
                letterSpacing: '-0.025em',
              }}>{n}</div>
              <div style={{
                marginTop: 12, fontFamily: T.mono, fontSize: 15, color: T.taupe,
                letterSpacing: 2.4, textTransform: 'uppercase',
              }}>{l}</div>
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
}

window.GalleryPage = GalleryPage;
