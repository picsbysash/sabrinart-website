// Studio & Process, Visual Journal layout (option B per art-direction).
// Magazine-style masonry, micro-loop video clips of kitchen tools in motion,
// scroll-reveal entrance for every block. The most differentiated page of the site.

function StudioPage() {
  return (
    <div style={{ background: T.lightStage, minHeight: '100vh' }} data-screen-label="04 Studio">
      <NavBar active="studio" />

      {/* HERO, quiet editorial intro, big cinematic loop of Sabrina's hand */}
      <Section padding="40px 80px 80px">
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 980, margin: '0 auto' }}>
            <Eyebrow style={{ display: 'inline-block' }}>05 · Studio &amp; Process · The Visual Journal</Eyebrow>
            <H1 style={{ marginTop: 32, fontSize: 'clamp(48px, 6vw, 96px)' }}>
              Where <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Italian heritage</span><br/>
              meets <span style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>Australian light</span>.
            </H1>
            <Body size={17} maxWidth={680} style={{ margin: '36px auto 0', textAlign: 'center' }}>
              Sabrina does not paint like anyone else, and she does not use the tools
              you would expect.
            </Body>
          </div>
        </Reveal>

        <Reveal delay={120} y={40}>
          <div style={{ marginTop: 64, maxWidth: 1320, margin: '64px auto 0', position: 'relative' }}>
            <VideoPH label="Hero loop · Sabrina at work · 18 s" ratio="21 / 9" poster={PHOTO.studioInterior} />
            <div style={{
              position: 'absolute', bottom: -28, left: 56,
              background: T.cream, padding: '14px 22px',
              border: `1px solid ${T.gold}`,
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 400, fontSize: 18, color: T.navy,
              boxShadow: '0 18px 36px -12px rgba(60,40,15,.2)',
            }}>
              "Each work is built in layers, colour over colour, gesture over gesture."
            </div>
          </div>
        </Reveal>
      </Section>

      <Rule width="calc(100% - 160px)" margin="80px auto 0" />

      {/* THE METHOD, asymmetric pull quote + body */}
      <Section padding="140px 80px">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 100, alignItems: 'flex-start' }}>
          <Reveal>
            <div style={{ position: 'sticky', top: 120 }}>
              <Eyebrow>The Method</Eyebrow>
              <H2 size={48} style={{ marginTop: 18 }}>
                An <span style={{ color: T.gold }}>intuitive</span><br/>
                and unconventional<br/>process.
              </H2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <Body size={17} lh={1.85}>
                Inspired by her Italian upbringing, she paints with the instruments
                of the kitchen: rolling pins, spatulas, pastry scrapers, forks, and
                ricotta containers. In her hands, these everyday objects become
                expressive tools, pulling and pressing paint into layered textures,
                fluid movement, and spontaneous marks that carry emotion straight onto
                the surface.
              </Body>
              <Body size={17} lh={1.85}>
                Her process is intuitive and unconventional. Each work is built in
                layers, colour over colour, gesture over gesture, until the painting
                becomes a record of feeling, memory and transformation.
              </Body>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* MASONRY JOURNAL, 4 micro-loops interleaved with stills + editorial copy */}
      <Section padding="80px 80px 140px" bg={T.paper2}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <Eyebrow style={{ display: 'inline-block' }}>The journal</Eyebrow>
            <H2 style={{ marginTop: 20 }}>
              Tools <span style={{ fontStyle: 'italic' }}>at work</span>.
            </H2>
            <Body size={15} maxWidth={620} style={{ margin: '20px auto 0' }}>
              Everyday kitchen objects, reimagined as the artist's instruments. The kitchen becomes a studio.
            </Body>
          </div>
        </Reveal>

        {/* Masonry grid, 4 cols × variable heights, mixing video, image and copy cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 24,
        }}>
          <Reveal style={{ gridColumn: 'span 5', gridRow: 'span 2' }}>
            <VideoPH label="Rolling pin · 8 s loop" ratio="3 / 4" poster={PHOTO.paintingAction} caption="01 · The rolling pin pulls long, rhythmic ridges across wet resin." />
          </Reveal>

          <Reveal style={{ gridColumn: 'span 4' }} delay={100}>
            <ImgPH label="Paint jars · still" src={PHOTO.porch} ratio="4 / 3" />
          </Reveal>

          <Reveal style={{ gridColumn: 'span 3' }} delay={150}>
            <div style={{
              padding: '36px 32px', background: T.cream,
              border: `1px solid ${T.hairStrong}`, height: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 56,
                color: T.gold, lineHeight: 0.9,
              }}>01</div>
              <H3 size={22} style={{ marginTop: 14 }}>Layer</H3>
              <Body size={12.5} style={{ marginTop: 10 }}>
                Acrylic and resin poured wet on wet. The canvas comes alive in colour before any intentional mark.
              </Body>
            </div>
          </Reveal>

          <Reveal style={{ gridColumn: 'span 4' }} delay={80}>
            <VideoPH label="Pastry scraper · 10 s loop" ratio="1 / 1" poster={PHOTO.studioSitting2} />
          </Reveal>

          <Reveal style={{ gridColumn: 'span 3' }} delay={160}>
            <div style={{
              padding: '36px 32px', background: T.cream,
              border: `1px solid ${T.hairStrong}`, height: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 56,
                color: T.gold, lineHeight: 0.9,
              }}>02</div>
              <H3 size={22} style={{ marginTop: 14 }}>Texture</H3>
              <Body size={12.5} style={{ marginTop: 10 }}>
                Kitchen tools draw, press and disturb the surface, pulling structure out of fluid pigment.
              </Body>
            </div>
          </Reveal>

          <Reveal style={{ gridColumn: 'span 5' }} delay={120}>
            <ImgPH label="Studio bench · ricotta tins & forks" src={PHOTO.porch2} ratio="3 / 2" />
          </Reveal>

          <Reveal style={{ gridColumn: 'span 4' }}>
            <ImgPH label="Hands at work · gesso layer" src={PHOTO.paintingAction} ratio="4 / 5" />
          </Reveal>

          <Reveal style={{ gridColumn: 'span 4' }} delay={100}>
            <VideoPH label="Fork scoring · 6 s loop" ratio="4 / 5" poster={PHOTO.brushes} />
          </Reveal>

          <Reveal style={{ gridColumn: 'span 4' }} delay={180}>
            <div style={{
              padding: '36px 32px', background: T.cream,
              border: `1px solid ${T.hairStrong}`, height: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 56,
                color: T.gold, lineHeight: 0.9,
              }}>03</div>
              <H3 size={22} style={{ marginTop: 14 }}>Wait</H3>
              <Body size={12.5} style={{ marginTop: 10 }}>
                Cure for days. Sabrina lets the work speak back before deciding what is missing.
              </Body>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* THE GOLD, full dark stage spotlight with macro video */}
      <Section padding="160px 80px" bg={T.darkStage} dark>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 100, alignItems: 'center' }}>
          <Reveal>
            <div style={{ position: 'relative' }}>
              <VideoPH label="24k gold leaf · macro · 14 s" dark ratio="4 / 5" poster={ART.goldDroplets} />
              <div style={{
                position: 'absolute', top: -16, right: -16,
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 120,
                color: T.goldShimmer, opacity: 0.3, lineHeight: 1, pointerEvents: 'none',
              }}>Au</div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <Eyebrow color={T.goldShimmer}>04 · The signature</Eyebrow>
              <h2 style={{
                fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                fontSize: 'clamp(56px, 6vw, 92px)', lineHeight: 0.95,
                color: T.cream, margin: '24px 0 0', letterSpacing: '-0.025em',
              }}>
                And then there is<br/>
                <span style={{ color: T.goldShimmer }}>the gold.</span>
              </h2>
              <Body size={17} color="rgba(255,255,255,.78)" lh={1.85} style={{ marginTop: 36 }}>
                A signature thread through every collection, gold is Sabrina's symbol
                of <strong style={{ color: T.goldShimmer, fontWeight: 400 }}>light, vitality, resilience and inner strength</strong>, a reminder
                that beauty and clarity can emerge from even the most challenging
                moments.
              </Body>
              <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                <Btn dark arrow href="#/gallery">See all gold-series works</Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CTA, invite to view the works */}
      <Section padding="clamp(56px, 7vh, 84px) clamp(32px, 5vw, 80px)" style={{ textAlign: 'center' }}>
        <Reveal>
          <Eyebrow style={{ display: 'inline-block' }}>The next chapter</Eyebrow>
          <H2 style={{ marginTop: 20 }}>See the works born here.</H2>
          <div style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn primary arrow href="#/gallery">Browse the Gallery</Btn>
            <Btn arrow href="#/about">Meet Sabrina</Btn>
          </div>
        </Reveal>
      </Section>

      <FooterV2 dark />
    </div>
  );
}

window.StudioPage = StudioPage;
