// About: Meet Sabrina. Biography only (technique lives on Studio & Process).
// Content follows Website Brief v3, section 5.

function AboutPage() {
  const photo = { display: 'block', width: '100%', height: 'auto' };
  const cropped = { display: 'block', width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', objectPosition: 'center top' };
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }} data-screen-label="03 About">
      <NavBar active="about" />

      <Section padding="clamp(32px, 4vh, 52px) clamp(24px, 5vw, 80px) clamp(40px, 5vh, 64px)">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 3.5vh, 44px)' }}>
          <H1 style={{ fontSize: 'clamp(48px, 6vw, 92px)', margin: 0 }}>
            Meet <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Sabrina</span>
          </H1>
          <Body size={17} maxWidth={620} style={{ margin: '18px auto 0' }}>
            Italian Australian Abstract Expressionist Artist
          </Body>
        </div>

        <style>{`
          .about-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: clamp(32px, 5vw, 72px); align-items: start; }
          .about-photos { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(16px, 2vw, 32px); margin-top: clamp(40px, 6vh, 72px); }
          @media (max-width: 820px) { .about-grid { grid-template-columns: 1fr; } .about-photos { grid-template-columns: 1fr; } }
        `}</style>

        <div className="about-grid" style={{ maxWidth: 1240, margin: '0 auto' }}>
          <img src="assets/about/sabrina-portrait-1.jpg" alt="Sabrina Goria, portrait" style={photo} />
          <div>
            <Body size={16} style={{ marginTop: 0 }}>
              Sabrina Goria was born in <strong style={{ color: T.navy, fontWeight: 500 }}>Asti, Italy</strong>, and later moved to Milan.
              She studied Literature, Arts, Cinema, Philosophy, History and Visual Arts.
            </Body>
            <Body size={16}>
              In Milan she worked with internationally recognised artists in music, concerts, exhibitions and events.
            </Body>
            <Body size={16}>
              In <strong style={{ color: T.navy, fontWeight: 500 }}>2007</strong> she moved to Australia.
              She began painting in <strong style={{ color: T.navy, fontWeight: 500 }}>2011</strong>, and her first exhibitions in Melbourne followed in <strong style={{ color: T.navy, fontWeight: 500 }}>2019</strong>.
            </Body>
            <Body size={16}>
              In <strong style={{ color: T.navy, fontWeight: 500 }}>2022</strong> she took a 15-month road trip across Australia, when Australian light, landscape and nature became key influences.
              Her work joins her Italian heritage and her Australian experience.
            </Body>
            <Body size={16}>
              Sabrina has been painting for more than 15 years, first as a passion, and now as her professional practice.
            </Body>
          </div>
        </div>

        <div className="about-photos" style={{ maxWidth: 1240, margin: "clamp(40px, 6vh, 72px) auto 0" }}>
          <img src="assets/about/sabrina-portrait-2.jpg" alt="Sabrina Goria holding a painting" style={cropped} />
          <img src="assets/about/sabrina-happiness.jpg" alt="Sabrina Goria laughing among flying brushes" style={cropped} />
        </div>
      </Section>

      <Rule width="calc(100% - 160px)" margin="0 auto" />

      {/* ARTIST STATEMENT */}
      <Section padding="clamp(56px, 8vh, 96px) clamp(24px, 5vw, 80px)" bg={T.paper2}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Eyebrow>Artist Statement</Eyebrow>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 22 }}>
            {[
              "Sabrina’s artistic journey began in 2011 with her debut work WOW, a spontaneous and vibrant expression born from a longing for freedom, love, and happiness. Created during a moment of emotional intensity, this first painting reconnected her with her true passion and revealed both her inner strength and her vulnerability. WOW became the spark that awakened her creative voice, a reminder that art could be a place of truth, release, and transformation.",
              "Painting is, for Sabrina, an act of liberation. It is a way to quiet the noise of the mind and allow her authentic self to emerge through vivid colour, layers of her emotional voice expressed into canvas, movement, and instinct. Each exhibition reflects a chapter of her personal evolution, tracing a journey of self-discovery, emotional growth, and the courage to create without rules.",
              "Her work is defined by vivid colours, dynamic movement, and a deep emotional resonance. Layers play a central role in her visual language, representing memory, healing, transformation, and the complexity of human experience. Inspired by nature, travel, music, conversations, and the cultural richness of both Italy and Australia, Sabrina creates artworks that invite viewers to reconnect with joy, colour, movement, and emotional freedom.",
              "Gold is one of her signature elements. It symbolises light, resilience, hope, and inner strength, a reminder that beauty and clarity can emerge from even the most challenging moments. Through her intuitive process and expressive mark-making, Sabrina transforms emotion into colour, movement into language, and art into a pathway toward connection and renewal.",
            ].map((p, i) => (
              <p key={i} style={{ fontFamily: T.serif, fontSize: 21, lineHeight: 1.6, color: T.ink, margin: 0 }}>{p}</p>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'clamp(40px, 5vh, 56px)', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn arrow href="#/studio">Step into the studio</Btn>
            <Btn arrow href="#/exhibitions">View Exhibitions</Btn>
          </div>
        </div>
      </Section>

      <FooterV2 dark />
    </div>
  );
}

window.AboutPage = AboutPage;
