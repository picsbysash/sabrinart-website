// Exhibitions, full hi-fi page following doc section 7.

const EXHIBITIONS = [
{
  y: '2025',
  t: 'Solo Exhibition',
  v: 'The Alley Edition Cafe',
  l: 'Collins Street, Melbourne',
  dates: null,
  body: "Sabrina's most recent solo exhibition, bringing colour and movement to the heart of Melbourne.",
  feature: true,
  img: null
},
{
  y: '2024',
  t: 'Layers of Happiness',
  v: 'Space2b',
  l: 'St Kilda',
  dates: '1 October to 1 November 2024',
  body: "A solo exhibition tracing Sabrina's evolution from 2011 to 2024, layers of paint as layers of memory, growth and joy.",
  quote: "Each layer of paint was a layer of memory, growth and joy.",
  img: 'assets/photos/exhib-reddot.jpg'
},
{
  y: '2024',
  t: 'Solo Exhibition',
  v: 'Vespa Rossa Restaurant',
  l: 'St Kilda',
  dates: null,
  body: "A solo showing of vibrant, texture-rich works in one of St Kilda's much-loved Italian dining rooms.",
  img: null
},
{
  y: '2019',
  t: 'My Journey with Nature',
  v: 'Da Noi Restaurant',
  l: '95 Toorak Road, South Yarra',
  dates: '15 September to 15 November 2019',
  body: "Sabrina's professional debut as a visual artist. A first chapter, exploring nature, colour, and the beginning of a creative life in Australia.",
  quote: "A first chapter, exploring nature, colour, and the beginning of a creative life in Australia.",
  img: 'assets/photos/da-noi.jpg'
}];


function ExhibitionsPage() {
  return (
    <div style={{ background: T.paper, minHeight: '100vh', overflow: 'hidden' }} data-screen-label="05 Exhibitions">
      <NavBar active="exhibitions" />

      {/* HERO, centered editorial composition (mirrors "Shop by palette" header) */}
      <section style={{ padding: 'clamp(40px, 5vh, 68px) clamp(32px, 5vw, 80px) 0', position: 'relative' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', gap: 'clamp(16px, 2vh, 24px)'
          }}>
            <ScrollReveal style={{ textAlign: 'center' }}>
              <Eyebrow style={{ display: 'inline-block', margin: 0 }}>07 · The Exhibitions</Eyebrow>
            </ScrollReveal>

            <ScrollReveal delay={60} style={{ textAlign: 'center' }}>
              <h1 style={{
                fontFamily: T.display, fontStyle: 'normal', fontWeight: 600,
                lineHeight: 0.94,
                color: T.navy, letterSpacing: '-0.035em',
                fontSize: 'clamp(56px, 7vw, 112px)', margin: 0
              }}>
                <em style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>Exhi</em>bitions
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={120} style={{ textAlign: 'center', width: '100%' }}>
              <p style={{
                fontFamily: T.sans, fontSize: 'clamp(15px, 1.1vw, 17px)', fontWeight: 300,
                lineHeight: 1.7, color: 'rgba(29, 42, 77, 0.82)',
                letterSpacing: 0.05, margin: '0 auto', maxWidth: 940, textAlign: 'center', textWrap: 'balance'
              }}>A decade of painting, shown across Melbourne's restaurants, cafés and creative spaces. Four solo shows tracing Sabrina's evolution as a colourist each chapter its own collection.



              </p>
            </ScrollReveal>

            <ScrollReveal delay={180} style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex', gap: 28, marginTop: 'clamp(8px, 1.5vh, 16px)',
                alignItems: 'baseline', justifyContent: 'center', flexWrap: 'wrap'
              }}>
                <span style={{
                  fontFamily: T.mono, fontSize: 11, letterSpacing: 2.4,
                  color: T.gold, borderBottom: `1px solid ${T.gold}`, paddingBottom: 4
                }}>PAST · 4 SHOWS</span>
                <span style={{
                  fontFamily: T.mono, fontSize: 11, letterSpacing: 2.4,
                  color: T.taupeSoft
                }}>UPCOMING · TBC</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Full-width closing hairline */}
        <div aria-hidden style={{
          marginTop: 'clamp(56px, 7vh, 88px)',
          marginLeft: 'calc(50% - 50vw)',
          width: '100vw',
          height: 1,
          background: T.hair
        }} />
      </section>

      {/* EXHIBITION BLOCKS, vertical, alternating left/right composition */}
      <section style={{ padding: 'clamp(40px, 6vh, 72px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vh, 72px)' }}>
          {EXHIBITIONS.map((e, i) => {
            const reverse = i % 2 === 1;
            return (
              <ScrollReveal key={i}>
                <article className="exh-block" style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: 'clamp(32px, 4vw, 64px)',
                  alignItems: 'stretch'
                }}>
                  {/* IMAGE */}
                  <div style={{ order: reverse ? 2 : 1, minWidth: 0, position: 'relative' }}>
                    <ImgPH label={`${e.v} · install view`} src={e.img} ratio="4 / 3" />
                    {i === 0 &&
                    <div style={{
                      position: 'absolute', top: 16, left: 16,
                      padding: '5px 12px', background: T.sunset, color: T.cream,
                      fontFamily: T.mono, fontSize: 9, letterSpacing: 2.2
                    }}>MOST RECENT</div>
                    }
                  </div>

                  {/* TEXT BLOCK */}
                  <div style={{
                    order: reverse ? 1 : 2, minWidth: 0,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    paddingTop: 'clamp(4px, 1vh, 12px)', paddingBottom: 'clamp(4px, 1vh, 12px)'
                  }}>
                    <div>
                    {/* Year eyebrow */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'baseline', gap: 14,
                        marginBottom: 18
                      }}>
                      <span style={{
                          fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                          fontSize: 'clamp(40px, 4vw, 64px)', color: T.gold, lineHeight: 0.9, letterSpacing: '-0.03em'
                        }}>{e.y}</span>
                      <span style={{
                          fontFamily: T.mono, fontSize: 10.5, letterSpacing: 2.6,
                          color: T.ochre, textTransform: 'uppercase'
                        }}>{`0${i + 1} · ${i === 0 ? 'Latest' : i === EXHIBITIONS.length - 1 ? 'Debut' : 'Solo show'}`}</span>
                    </div>

                    <H2 size={'clamp(32px, 3.4vw, 52px)'} style={{ marginTop: 0, lineHeight: 1.08 }}>
                      {e.t}
                    </H2>

                    <div style={{
                        fontFamily: T.display, fontStyle: 'italic', fontWeight: 400,
                        fontSize: 'clamp(16px, 1.4vw, 20px)', color: T.taupe, marginTop: 14, lineHeight: 1.4
                      }}>
                      {e.v} <span style={{ color: T.taupeSoft }}>·</span> {e.l}
                    </div>

                    {e.dates &&
                      <div style={{
                        marginTop: 12, fontFamily: T.mono, fontSize: 11, color: T.gold,
                        letterSpacing: 2.2, textTransform: 'uppercase'
                      }}>{e.dates}</div>
                      }

                    <p style={{
                        fontFamily: T.sans, fontSize: 'clamp(14px, 1.1vw, 16px)', fontWeight: 300, lineHeight: 1.7,
                        color: T.taupe, margin: '22px 0 0', maxWidth: 520
                      }}>{e.body}</p>
                    </div>

                    <div style={{ marginTop: 28, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                      <Btn arrow>View Exhibition</Btn>
                      <a href="#" style={{
                        fontFamily: T.sans, fontSize: 10.5, color: T.taupe, letterSpacing: 2.4,
                        textTransform: 'uppercase', borderBottom: `1px solid ${T.taupeSoft}`,
                        paddingBottom: 3
                      }}>Quick preview</a>
                    </div>
                  </div>
                </article>
              </ScrollReveal>);

          })}
        </div>
        <style>{`
          @media (max-width: 760px) {
            .exh-block {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
              align-items: start !important;
            }
            .exh-block > div { order: initial !important; }
          }
        `}</style>
      </section>

      {/* UPCOMING, full dark stage cinematic anticipation */}
      <Section padding="clamp(56px, 7vh, 84px) clamp(24px, 5vw, 80px)" bg={T.darkStage} dark>
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          <Eyebrow color={T.goldShimmer} style={{ margin: 0, marginBottom: 28, display: 'inline-block' }}>Upcoming</Eyebrow>
          <h2 style={{
            fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
            fontSize: 'clamp(48px, 5vw, 76px)', lineHeight: 1.0, color: T.cream,
            margin: 0, letterSpacing: '-0.02em'
          }}>
            What comes <span style={{ color: T.goldShimmer }}>next.</span>
          </h2>
          <p style={{
            fontFamily: T.sans, fontSize: 16, fontWeight: 300, lineHeight: 1.75,
            color: 'rgba(255,255,255,.78)', margin: '32px 0 0', maxWidth: 620,
            marginLeft: 'auto', marginRight: 'auto'
          }}>
            Upcoming exhibition details will be announced here once confirmed.
            Join the newsletter to be the first to know when, where, and how to see
            the next chapter in person.
          </p>
          <div style={{ marginTop: 44, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn dark arrow href="#/contact">Subscribe for announcements</Btn>
            <Btn dark arrow href="#/gallery">Browse the Gallery</Btn>
          </div>
        </div>
      </Section>

      <FooterV2 dark />
    </div>);

}

window.ExhibitionsPage = ExhibitionsPage;