// About the Artist, full hi-fi page following doc sections 4.1-4.4.

function AboutPage() {
  return (
    <div style={{ background: T.lightStage, minHeight: '100vh' }} data-screen-label="03 About">
      <NavBar active="about" />

      {/* 4.1, PAGE INTRO + 4.2, ARTIST BIO */}
      <Section padding="clamp(32px, 4vh, 52px) clamp(32px, 5vw, 80px) clamp(28px, 3.5vh, 44px)">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 3.5vh, 44px)' }}>
          <Eyebrow style={{ display: 'inline-block' }}>About the Artist</Eyebrow>
          <H1 style={{ marginTop: 18, fontSize: 'clamp(48px, 6vw, 92px)' }}>
            Meet <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Sabrina Goria</span>
          </H1>
          <Body size={17} maxWidth={620} style={{ margin: '18px auto 0' }}>
            The artist behind SabrinArt Collection.
          </Body>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(40px, 5vw, 64px)', alignItems: 'flex-start' }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <ImgPH label="Sabrina Goria · Melbourne studio" src={PHOTO.portraitWindow} ratio="3 / 4" />
            <div style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 400, fontSize: 18,
              color: T.taupe, marginTop: 14, textAlign: 'center', lineHeight: 1.4,
              padding: '0 16px',
            }}>
              "I let the painting tell me when it's done."
            </div>
          </div>
          <div>
            <Eyebrow>4.2 · Artist Bio</Eyebrow>
            <H2 size={48} style={{ marginTop: 14, lineHeight: 1.05 }}>
              An Italo-Australian abstract<br/>
              <span style={{ color: T.gold }}>expressionist.</span>
            </H2>
            <Body size={16} style={{ marginTop: 22 }}>
              Sabrina Goria is an Italo-Australian contemporary expressionist and abstract
              artist based in Melbourne, known for her vibrant colour language, layered
              textures, and emotionally intuitive approach to painting.
            </Body>
            <Body size={15}>
              Born in <strong style={{ color: T.navy, fontWeight: 500 }}>Asti, Italy</strong>, Sabrina moved to Milan, where she immersed herself in
              the city's cultural life and completed a degree in Literature, Philosophy
              and Visual Arts. Her studies across art, cinema, history and philosophy
              shaped an expressive, colourful and emotionally driven creative identity.
              In Milan she collaborated with internationally recognised artists and
              spent years organising concerts, exhibitions and cultural events, 
              learning early on how beauty and emotion can bring people together.
            </Body>
            <div style={{
              margin: '28px 0', padding: '22px 32px',
              borderLeft: `2px solid ${T.gold}`, background: T.cream,
            }}>
              <Eyebrow>The moment it began</Eyebrow>
              <Body size={15} color={T.navy} style={{ marginTop: 10 }}>
                Her artistic journey truly began in <strong style={{ fontWeight: 500 }}>2011</strong> with her first
                painting, <em style={{ color: T.gold, fontStyle: 'italic' }}>WOW</em>, a
                spontaneous work created in a moment of emotional vulnerability that
                revealed art as a language of healing, freedom and self-expression.
              </Body>
            </div>
            <Body size={15}>
              In <strong style={{ color: T.navy, fontWeight: 500 }}>2007</strong> Sabrina relocated to Australia, and in <strong style={{ color: T.navy, fontWeight: 500 }}>2019</strong> she made her
              professional debut as a visual artist with two exhibitions in
              <strong style={{ color: T.navy, fontWeight: 500 }}> South Yarra, Melbourne</strong>. In <strong style={{ color: T.navy, fontWeight: 500 }}>2022</strong>, a life-changing 15-month
              road trip across Australia deepened her connection to nature, colour,
              movement and freedom, its vast landscapes, oceans and shifting light
              reshaping her palette ever since.
            </Body>
            <Body size={15}>
              Sabrina's process is intuitive and unconventional. She paints with
              kitchen tools inspired by her Italian heritage, rolling pins, spatulas,
              pastry scrapers, forks and ricotta containers, transforming everyday
              objects into expressive instruments. <strong style={{ color: T.gold, fontWeight: 500 }}>Gold</strong>, her signature element,
              runs through her work as a symbol of light, vitality, resilience and
              inner strength.
            </Body>
            <Body size={15}>
              Through colour and abstraction, Sabrina creates a world where emotion
              becomes visible and movement becomes language.
            </Body>
          </div>
        </div>
      </Section>

      <Rule width="calc(100% - 160px)" margin="0 auto" />

      {/* 4.3, ARTIST STATEMENT (full dark stage for impact) */}
      <Section padding="clamp(80px, 10vh, 120px) clamp(32px, 5vw, 80px)" bg={T.darkStage} dark>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <Eyebrow color={T.goldShimmer}>4.3 · Artist Statement</Eyebrow>
          <h2 style={{
            fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
            fontSize: 'clamp(48px, 5.5vw, 88px)', lineHeight: 1.0,
            letterSpacing: '-0.02em', color: T.cream, margin: '32px 0 0',
          }}>
            Painting, for me, is<br/>
            <span style={{ color: T.goldShimmer }}>an act of liberation.</span>
          </h2>
          <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 22 }}>
            {[
              `My journey began in 2011 with my first work, WOW, a spontaneous, vibrant expression born from a longing for freedom, love and happiness. Created in a moment of emotional intensity, it reconnected me with my true passion and showed me both my strength and my vulnerability. WOW was the spark that awakened my creative voice, and a reminder that art can be a place of truth, release and transformation.`,
              `When I paint, the noise of the mind goes quiet and my authentic self emerges through colour, layers, movement and instinct. Layers are central to my visual language, they hold memory, healing, transformation and the complexity of human experience. Each exhibition marks a chapter of my own evolution.`,
              `I am inspired by nature, travel, music, conversation, and the cultural richness of both Italy and Australia. I work intuitively, without rules, brushes and watercolours for fluidity, palette knives and kitchen tools for texture, and gesso, paste and mixed media for depth.`,
            ].map((p, i) => (
              <p key={i} style={{
                fontFamily: T.serif, fontStyle: 'italic', fontWeight: 300,
                fontSize: 22, lineHeight: 1.55, color: 'rgba(255,255,255,.86)',
                margin: 0, letterSpacing: 0.1,
              }}>{p}</p>
            ))}
          </div>

          <div style={{
            margin: '48px 0', padding: '32px 0',
            borderTop: `1px solid rgba(232,200,122,.35)`,
            borderBottom: `1px solid rgba(232,200,122,.35)`,
          }}>
            <p style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
              fontSize: 32, lineHeight: 1.35, color: T.goldShimmer,
              margin: 0, letterSpacing: '-0.005em',
            }}>
              Gold is my signature. It symbolises light, resilience, hope and inner
              strength, a reminder that beauty and clarity can emerge from even the
              most difficult moments.
            </p>
          </div>

          <p style={{
            fontFamily: T.serif, fontStyle: 'italic', fontWeight: 300,
            fontSize: 22, lineHeight: 1.55, color: 'rgba(255,255,255,.86)',
            margin: 0,
          }}>
            I want my work to invite you to pause, feel, and reconnect, with joy,
            with colour, with movement, and with your own emotional freedom.
          </p>

          <div style={{
            marginTop: 36, fontFamily: T.display, fontStyle: 'italic', fontWeight: 400,
            fontSize: 22, color: T.goldShimmer,
          }}>, Sabrina Goria</div>
        </div>
      </Section>

      {/* 4.4, ARTIST CV */}
      <Section padding="clamp(48px, 6vh, 76px) clamp(32px, 5vw, 80px)" bg={T.paper2}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 3.5vh, 44px)' }}>
          <Eyebrow style={{ display: 'inline-block' }}>4.4 · Artist CV</Eyebrow>
          <H2 style={{ marginTop: 16 }}>A practice built over decades.</H2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(40px, 4vw, 56px)' }}>
          {/* Education */}
          <div>
            <div style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 28,
              color: T.navy, paddingBottom: 18, borderBottom: `1px solid ${T.gold}`,
            }}>Education</div>
            {[
              ['2019', "MBA in Digital Marketing", 'Kaplan Business School, Melbourne'],
              ['2002', "Bachelor's Degree in Literature, Philosophy & Visual Arts", 'Milan, Italy'],
              ['1998', "Master's in Film Script & Cinematographic Technique", 'Cinelife School, Milan'],
            ].map(([y, t, s], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '70px 1fr', gap: 24,
                padding: '22px 0', borderBottom: `1px solid ${T.hair}`,
              }}>
                <div style={{ fontFamily: T.mono, fontSize: 11, color: T.gold, letterSpacing: 1.5, paddingTop: 4 }}>{y}</div>
                <div>
                  <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 400, color: T.navy, lineHeight: 1.45 }}>{t}</div>
                  <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.taupe, marginTop: 4 }}>{s}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Background */}
          <div>
            <div style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 28,
              color: T.navy, paddingBottom: 18, borderBottom: `1px solid ${T.gold}`,
            }}>Professional Background</div>
            {[
              ['2019 →', 'Visual Artist & Creative Entrepreneur', 'Melbourne'],
              ['1995-2020', '25 years as an event planner & event manager',
                'Milan / Melbourne, collaborating with internationally recognised artists, organising concerts, exhibitions and cultural events.'],
            ].map(([y, t, s], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '90px 1fr', gap: 24,
                padding: '22px 0', borderBottom: `1px solid ${T.hair}`,
              }}>
                <div style={{ fontFamily: T.mono, fontSize: 15, color: T.gold, letterSpacing: 1.5, paddingTop: 4 }}>{y}</div>
                <div>
                  <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 400, color: T.navy, lineHeight: 1.45 }}>{t}</div>
                  <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.taupe, marginTop: 6, lineHeight: 1.55 }}>{s}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Exhibitions */}
          <div>
            <div style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 28,
              color: T.navy, paddingBottom: 18, borderBottom: `1px solid ${T.gold}`,
            }}>Exhibitions</div>
            {[
              ['2025', 'Solo Exhibition', 'The Alley Edition Cafe, Collins Street, Melbourne'],
              ['2024', 'Solo Exhibition', 'Vespa Rossa Restaurant, St Kilda'],
              ['2024', 'Layers of Happiness', 'Space2b, St Kilda'],
              ['2019', 'My Journey with Nature', 'Da Noi Restaurant, South Yarra'],
            ].map(([y, t, s], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '70px 1fr', gap: 24,
                padding: '22px 0', borderBottom: `1px solid ${T.hair}`,
              }}>
                <div style={{ fontFamily: T.mono, fontSize: 11, color: T.gold, letterSpacing: 1.5, paddingTop: 4 }}>{y}</div>
                <div>
                  <div style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: 18, color: T.navy, lineHeight: 1.3 }}>{t}</div>
                  <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.taupe, marginTop: 4 }}>{s}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Artistic Focus */}
          <div>
            <div style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 28,
              color: T.navy, paddingBottom: 18, borderBottom: `1px solid ${T.gold}`,
            }}>Artistic Focus & Techniques</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
              {[
                'Contemporary Expressionism', 'Abstract Expressionism', 'Mixed Media Art',
                'Resin Art', 'Fluid Art', 'Layered Texture Techniques',
                'Signature Gold Symbolism', 'Kitchen-Tool Painting (Italian heritage)',
              ].map((t) => (
                <span key={t} style={{
                  display: 'inline-block', padding: '7px 14px',
                  fontFamily: T.mono, fontSize: 15, letterSpacing: 1.5, textTransform: 'uppercase',
                  border: `1px solid ${T.navy}`, color: T.navy, background: 'transparent',
                }}>{t}</span>
              ))}
            </div>
            <div style={{
              marginTop: 36, padding: '24px 28px', background: T.navy,
              borderLeft: `2px solid ${T.gold}`,
            }}>
              <div style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 400, fontSize: 18, color: '#ffffff', lineHeight: 1.5 }}>
                "Brushes and watercolours for fluidity, palette knives and kitchen
                tools for texture, gesso and mixed media for depth."
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(48px, 6vh, 64px)', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Btn arrow href="#/studio">See the Studio &amp; Process</Btn>
          <Btn arrow href="#/exhibitions">View Exhibitions</Btn>
          <Btn arrow>Download CV (PDF)</Btn>
        </div>
      </Section>

      <FooterV2 dark />
    </div>
  );
}

window.AboutPage = AboutPage;
