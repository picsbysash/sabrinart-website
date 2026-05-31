// Home, full hi-fi page following doc sections 3.1-3.4.

function HomePage() {
  return (
    <div style={{ background: T.lightStage, minHeight: '100vh' }} data-screen-label="01 Home">
      {/* Floating editorial header on top of the painterly hero */}
      <PainterlyHero height="780px">
        <NavBar active="home" light floating />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '240px 64px 80px', textAlign: 'center',
          gap: 36,
        }}>
          <h1 style={{
            fontFamily: T.serif,
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: 'clamp(28px, 3.6vw, 54px)',
            lineHeight: 1.45,
            letterSpacing: '0.015em',
            color: '#ffffff',
            margin: 0,
            maxWidth: 1080,
            textShadow: '0 2px 18px rgba(0,0,0,.45), 0 1px 0 rgba(0,0,0,.25)',
          }}>
            Contemporary abstract art that illuminates,<br/>
            moves, and transforms modern interiors.
          </h1>

          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(20px, 1.7vw, 28px)',
            color: T.goldShimmer, letterSpacing: '0.05em',
            textShadow: '0 2px 12px rgba(0,0,0,.5)',
          }}>
            &amp; Sabrina Goria
          </div>

          <div style={{
            marginTop: 8, display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <a href="#/gallery" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px 38px', minWidth: 180,
              background: '#ffffff', color: T.navy,
              fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: 4,
              textTransform: 'uppercase', textDecoration: 'none',
              border: '1px solid #ffffff',
              transition: 'all .25s ease',
              boxShadow: '0 12px 28px -10px rgba(0,0,0,.4)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = T.navy; }}
            >Discover</a>

            <a href="#/gallery" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px 38px', minWidth: 180,
              background: 'transparent', color: '#ffffff',
              fontFamily: T.sans, fontSize: 11, fontWeight: 500, letterSpacing: 4,
              textTransform: 'uppercase', textDecoration: 'none',
              border: '1px solid #ffffff',
              transition: 'all .25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = T.navy; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
            >Gallery</a>
          </div>

          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontWeight: 400,
            fontSize: 13, color: 'rgba(255,255,255,.78)', letterSpacing: 2,
            textShadow: '0 1px 8px rgba(0,0,0,.5)',
            marginTop: 12,
          }}>
            with Art by Sabrina Goria
          </div>

          {/* Social icons */}
          <div style={{
            marginTop: 8, display: 'flex', gap: 28, alignItems: 'center', justifyContent: 'center',
          }}>
            {[
              ['Facebook', 'M9.2 22v-8H6.6v-3.1h2.6V8.6c0-2.6 1.6-4 3.9-4 1.1 0 2 .1 2.3.1v2.7h-1.6c-1.2 0-1.5.6-1.5 1.4v1.8h3l-.4 3.1h-2.6V22'],
              ['Instagram', 'M12 4.3c2.5 0 2.8 0 3.8.1 1 0 1.5.2 1.8.3.5.2.8.4 1.2.8.4.4.6.7.8 1.2.1.4.3.9.3 1.8.1 1 .1 1.3.1 3.8s0 2.8-.1 3.8c0 .9-.2 1.4-.3 1.8-.2.5-.4.8-.8 1.2-.4.4-.7.6-1.2.8-.4.1-.9.3-1.8.3-1 .1-1.3.1-3.8.1s-2.8 0-3.8-.1c-.9 0-1.4-.2-1.8-.3-.5-.2-.8-.4-1.2-.8-.4-.4-.6-.7-.8-1.2-.1-.4-.3-.9-.3-1.8-.1-1-.1-1.3-.1-3.8s0-2.8.1-3.8c0-.9.2-1.4.3-1.8.2-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.4-.1.9-.3 1.8-.3 1-.1 1.3-.1 3.8-.1zm0-1.7c-2.6 0-2.9 0-3.9.1-1 0-1.7.2-2.3.5-.6.2-1.2.6-1.7 1.1-.5.5-.9 1.1-1.1 1.7-.3.6-.4 1.3-.5 2.3-.1 1-.1 1.3-.1 3.9s0 2.9.1 3.9c0 1 .2 1.7.5 2.3.2.6.6 1.2 1.1 1.7.5.5 1.1.9 1.7 1.1.6.3 1.3.4 2.3.5 1 .1 1.3.1 3.9.1s2.9 0 3.9-.1c1 0 1.7-.2 2.3-.5.6-.2 1.2-.6 1.7-1.1.5-.5.9-1.1 1.1-1.7.3-.6.4-1.3.5-2.3.1-1 .1-1.3.1-3.9s0-2.9-.1-3.9c0-1-.2-1.7-.5-2.3-.2-.6-.6-1.2-1.1-1.7-.5-.5-1.1-.9-1.7-1.1-.6-.3-1.3-.4-2.3-.5-1-.1-1.3-.1-3.9-.1zm0 4.6c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9zm0 8.1c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2zm6.2-8.3c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1.5-1.1 1.1-1.1 1.1.5 1.1 1.1z'],
              ['YouTube', 'M21.6 8.3c-.2-.9-.9-1.5-1.8-1.8C18.2 6 12 6 12 6s-6.2 0-7.8.5c-.9.2-1.5.9-1.8 1.8C2 9.9 2 13 2 13s0 3.1.5 4.7c.2.9.9 1.5 1.8 1.8C5.8 20 12 20 12 20s6.2 0 7.8-.5c.9-.2 1.5-.9 1.8-1.8.5-1.6.5-4.7.5-4.7s0-3.1-.5-4.7zM10 16v-6l5 3-5 3z'],
            ].map(([name, d]) => (
              <a key={name} href="#" aria-label={name} style={{
                display: 'grid', placeItems: 'center',
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(255,255,255,.12)',
                border: '1px solid rgba(255,255,255,.35)',
                transition: 'background .25s, border-color .25s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.95)'; e.currentTarget.firstChild.setAttribute('fill', T.navy); }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.12)'; e.currentTarget.firstChild.setAttribute('fill', '#ffffff'); }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                  <path d={d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </PainterlyHero>

      <Rule width="calc(100% - 160px)" margin="0 auto" />

      {/* 3.2, INTRO STRIP */}
      <Section padding="100px 80px" style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: T.display, fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(26px, 2.4vw, 38px)', lineHeight: 1.4,
          color: T.indigo, maxWidth: 880, margin: '0 auto',
          letterSpacing: '-0.005em',
        }}>
          Vibrant, layered, emotionally charged paintings, created with movement,
          gold, and the unmistakable mark of an <span style={{ color: T.gold }}>Italian heritage</span>.
        </div>
      </Section>

      <Rule width="calc(100% - 160px)" margin="0 auto" />

      {/* 3.3, THE NEW COLLECTION */}
      <Section padding="120px 80px 80px">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, gap: 60 }}>
          <div>
            <Eyebrow>01 · On sale · 5 pieces</Eyebrow>
            <H2 style={{ marginTop: 18 }}>The New Collection</H2>
            <Body size={15} maxWidth={520} style={{ marginTop: 18 }}>
              The latest works, fresh from the studio and currently on sale.
              Each piece is a new chapter in an evolving story of colour, light, and transformation.
            </Body>
          </div>
          <Btn arrow size="md" href="#/gallery">See the newest works</Btn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          <ArtworkCard title="Golden Path" price="$1,640" size="72 × 36 in" medium="Mixed Media" year="2026" status="ON SALE" />
          <ArtworkCard title="Passion and Fire" price="$2,360" size="47 × 71 in" medium="Mixed Media" year="2026" status="ON SALE" />
          <ArtworkCard title="SMILE" price="$1,250" size="30 × 36 in" medium="Mixed Media" year="2026" status="ON SALE" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 48, marginTop: 48 }}>
          <ArtworkCard title="Golden Ember" price="$490" size="14 × 14 in" medium="Mixed Media" year="2026" status="ON SALE" />
          <ArtworkCard title="Harmony of Nature" price="$560" size="14 × 14 in" medium="Mixed Media" year="2025" status="ON SALE" />
          <div style={{
            gridColumn: 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '32px 40px', background: T.cream, border: `1px solid ${T.hairStrong}`,
          }}>
            <Eyebrow>Origins of the collection</Eyebrow>
            <H3 style={{ marginTop: 14 }}>
              "Layers are central to my visual language, they hold memory,
              healing, transformation."
            </H3>
            <Body size={12.5} style={{ marginTop: 16, maxWidth: 380 }}>
              Each work in the New Collection is built layer by layer with kitchen
              tools, resin and 24k gold leaf, a slow, intuitive ritual.
            </Body>
          </div>
        </div>
      </Section>

      <Rule width="calc(100% - 160px)" margin="0 auto" />

      {/* 3.3, AVAILABLE WORKS */}
      <Section padding="120px 80px" bg={T.paper2}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'center' }}>
          <div>
            <Eyebrow>02 · 10 originals available</Eyebrow>
            <H2 style={{ marginTop: 18 }}>Available Works.</H2>
            <Body size={15} maxWidth={420} style={{ marginTop: 18 }}>
              Original paintings ready to find a new home. Browse by collection,
              theme, or exhibition, every work is one of a kind, signed and shipped
              from Melbourne.
            </Body>
            <div style={{ marginTop: 36 }}>
              <Btn arrow href="#/gallery">Browse Available Art</Btn>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <ArtworkCard title="Butterfly" price="$480" size="12 × 12 in" status="AVAILABLE" />
            <ArtworkCard title="Billabong" price="$520" size="16 × 16 in" status="AVAILABLE" />
            <ArtworkCard title="Silver Sea" price="$670" size="18 × 18 in" status="AVAILABLE" />
            <ArtworkCard title="Carnival" price="$420" size="12 × 12 in" status="AVAILABLE" />
          </div>
        </div>
      </Section>

      {/* 3.3, THE ARTIST + STUDIO (two-up) */}
      <Section padding="120px 80px">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <article style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <ImgPH label="Sabrina · Melbourne studio portrait" ratio="4 / 5" />
            <div>
              <Eyebrow>03 · The Artist</Eyebrow>
              <H2 size={42} style={{ marginTop: 12 }}>From Asti<br/>to Milan to Melbourne.</H2>
              <Body size={14} maxWidth={440} style={{ marginTop: 16 }}>
                Sabrina Goria turns emotion into colour and movement into language.
                Discover the story behind the brushstrokes.
              </Body>
              <div style={{ marginTop: 24 }}>
                <Btn arrow href="#/about">Meet Sabrina</Btn>
              </div>
            </div>
          </article>
          <article style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <ImgPH label="Rolling pin · pastry scraper · 24k gold leaf" ratio="4 / 5" />
            <div>
              <Eyebrow>04 · Inside the Studio</Eyebrow>
              <H2 size={42} style={{ marginTop: 12 }}>Painted with the tools<br/>of an Italian kitchen.</H2>
              <Body size={14} maxWidth={440} style={{ marginTop: 16 }}>
                Rolling pins, spatulas, pastry scrapers, building texture, movement,
                and the signature touch of gold.
              </Body>
              <div style={{ marginTop: 24 }}>
                <Btn arrow href="#/studio">Explore the Process</Btn>
              </div>
            </div>
          </article>
        </div>
      </Section>

      {/* 3.3, EXHIBITIONS strip */}
      <Section padding="120px 80px" bg={T.paper2}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Eyebrow style={{ display: 'inline-block' }}>05 · A decade of solo shows</Eyebrow>
          <H2 style={{ marginTop: 20 }}>Exhibitions.</H2>
          <Body size={15} maxWidth={620} style={{ margin: '20px auto 0' }}>
            A decade of solo shows across Melbourne, see where the work has been,
            and where it is going next.
          </Body>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[
            { y: '2025', t: 'Solo Exhibition', v: 'The Alley Edition Cafe', l: 'Collins Street' },
            { y: '2024', t: 'Layers of Happiness', v: 'Space2b', l: 'St Kilda' },
            { y: '2024', t: 'Solo Exhibition', v: 'Vespa Rossa Restaurant', l: 'St Kilda' },
            { y: '2019', t: 'My Journey with Nature', v: 'Da Noi Restaurant', l: 'South Yarra' },
          ].map((e, i) => (
            <article key={i} style={{
              padding: '36px 0 0', borderTop: `1px solid ${T.goldSoft}`,
            }}>
              <div style={{ fontFamily: T.mono, fontSize: 15, color: T.gold, letterSpacing: 3 }}>{e.y}</div>
              <H3 style={{ marginTop: 14 }}>{e.t}</H3>
              <div style={{ fontFamily: T.sans, fontSize: 12.5, color: T.taupe, marginTop: 10, fontWeight: 300, lineHeight: 1.6 }}>
                {e.v}<br/>{e.l}
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <Btn arrow href="#/exhibitions">View All Exhibitions</Btn>
        </div>
      </Section>

      {/* 3.4, INSTAGRAM + NEWSLETTER */}
      <Section padding="120px 80px">
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <Eyebrow>06 · @sabrinart_collection</Eyebrow>
            <H2 style={{ marginTop: 18 }}>Follow the journey.</H2>
            <Body size={14} maxWidth={460} style={{ marginTop: 14 }}>
              Studio moments, new work, and behind-the-scenes.
            </Body>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginTop: 36 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <ImgPH key={i} label={`ig ${i + 1}`} ratio="1 / 1" />
              ))}
            </div>
          </div>
          <aside style={{
            padding: 40, background: T.cream,
            border: `1px solid ${T.hairStrong}`, position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: -10, left: 40, padding: '4px 10px',
              background: T.gold, color: T.cream,
              fontFamily: T.mono, fontSize: 9, letterSpacing: 2.4, textTransform: 'uppercase',
            }}>Newsletter</div>
            <H3 size={32} style={{ marginTop: 16 }}>Stay in the picture.</H3>
            <Body size={13} style={{ marginTop: 14 }}>
              Be the first to see new collections, exhibition news, and studio stories.
              No noise, just art.
            </Body>
            <div style={{
              display: 'flex', borderBottom: `1px solid ${T.navy}`, marginTop: 24, paddingBottom: 8,
            }}>
              <div style={{ flex: 1, fontFamily: T.mono, fontSize: 11, color: T.taupeSoft, letterSpacing: 0.4 }}>
                your email address
              </div>
              <span style={{ fontFamily: T.sans, fontSize: 15, letterSpacing: 2.4, textTransform: 'uppercase' }}>Subscribe →</span>
            </div>
            <div style={{
              marginTop: 18, fontFamily: T.sans, fontSize: 10.5, color: T.taupeSoft,
              letterSpacing: 0.3, lineHeight: 1.6,
            }}>
              We will only ever email you about SabrinArt Collection. Unsubscribe anytime.
            </div>
          </aside>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

window.HomePage = HomePage;
