// Studio & Process. Content follows Website Brief v3, section 6.
// Deep links: /studio/moment lands on "The Moment It Began".

// Small photo carousel for Tools & Materials. Photos are never cropped.
function ToolsCarousel({ slides }) {
  const [i, setI] = useState(0);
  const n = slides.length;
  const go = (d) => setI((x) => (x + d + n) % n);
  const touch = useRef(null);
  const btn = (side, label, d) => (
    <button type="button" aria-label={label} onClick={() => go(d)}
      style={{ position: 'absolute', top: '50%', [side]: 10, transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.9)', color: T.navy, fontSize: 22, lineHeight: 1, cursor: 'pointer', boxShadow: '0 1px 6px rgba(0,0,0,0.25)' }}>{d < 0 ? '‹' : '›'}</button>
  );
  return (
    <div style={{ position: 'relative' }}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { if (touch.current == null) return; const dx = e.changedTouches[0].clientX - touch.current; touch.current = null; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', background: '#ffffff' }}>
        {slides.map((s, k) => (
          <img key={s.src} src={s.src} alt={s.alt} loading={k === 0 ? 'eager' : 'lazy'}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: k === i ? 1 : 0, transition: 'opacity .35s ease', pointerEvents: k === i ? 'auto' : 'none' }} />
        ))}
      </div>
      {n > 1 && btn('left', 'Previous photo', -1)}
      {n > 1 && btn('right', 'Next photo', 1)}
      {n > 1 && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
          {slides.map((s, k) => (
            <button key={k} type="button" aria-label={'Photo ' + (k + 1)} onClick={() => setI(k)}
              style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer', background: k === i ? T.navy : '#c9ccd3' }} />
          ))}
        </div>
      )}
    </div>
  );
}

function StudioPage({ section }) {
  const ANCHOR = { moment: 'the-moment-it-began' };
  useEffect(() => {
    if (!section) return;
    const go = () => { const el = document.getElementById(ANCHOR[section] || section); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' }); };
    requestAnimationFrame(go);
    // photos above the section load later and shift the layout, so align again
    const t1 = setTimeout(go, 500), t2 = setTimeout(go, 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [section]);

  const img = { display: 'block', width: '100%', height: 'auto' };
  const words = (list) =>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 14px', marginTop: 24 }}>
      {list.map((w) =>
        <span key={w} style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: 'clamp(22px, 2.2vw, 30px)', color: T.navy, border: `1px solid ${T.hair}`, padding: '8px 18px' }}>{w}</span>
      )}
    </div>;
  const wrap = { maxWidth: 1180, margin: '0 auto' };
  const split = { display: 'grid', gap: 'clamp(28px, 5vw, 72px)', alignItems: 'center' };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }} data-screen-label="04 Studio">
      <NavBar active="studio" />
      <style>{`
        section[id] { scroll-margin-top: 90px; }
        .st-split { grid-template-columns: 1fr 1fr; }
        .st-split.rev > :first-child { order: 2; }
        @media (max-width: 820px) { .st-split { grid-template-columns: 1fr; } .st-split.rev > :first-child { order: 0; } }
      `}</style>

      {/* TITLE */}
      <Section padding="clamp(40px, 6vh, 72px) clamp(24px, 5vw, 80px) 0">
        <div style={{ textAlign: 'center' }}>
          <H1 style={{ fontSize: 'clamp(48px, 6vw, 92px)', margin: 0 }}>
            Studio <span style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>&amp;</span> Process
          </H1>
        </div>
      </Section>

      {/* 1. MOMENT WITH THE ARTIST */}
      <Section id="moment-with-the-artist" padding="clamp(40px, 6vh, 72px) clamp(24px, 5vw, 80px)">
        <div style={wrap}>
          <Eyebrow>Moment with the Artist</Eyebrow>
          <div className="st-split" style={{ ...split, marginTop: 28 }}>
            <img src="assets/studio/moment-with-the-artist.jpg" alt="Sabrina Goria painting at her easel" style={img} />
            <img src="assets/studio/sabrina-painting.jpg" alt="Sabrina Goria painting, working with a brush" style={img} />
          </div>
        </div>
      </Section>

      <Rule width="calc(100% - 160px)" margin="0 auto" />

      {/* 2. THE MOMENT IT BEGAN */}
      <Section id="the-moment-it-began" padding="clamp(56px, 8vh, 96px) clamp(24px, 5vw, 80px)">
        <div className="st-split" style={{ ...split, ...wrap, alignItems: 'start' }}>
          <div>
            <Eyebrow>The Moment It Began · 2011</Eyebrow>
            <a href="#/gallery/wow" aria-label="WOW, 2011, open artwork page" style={{ display: 'block', marginTop: 28, background: '#f6f7f9', padding: 'clamp(12px, 2vw, 28px)' }}>
              <img src="assets/artworks/wow.jpg" alt="WOW 11:11:11, 2011, painting by Sabrina Goria" style={img} />
            </a>
          </div>
          <div style={{ paddingTop: 'clamp(0px, 5vh, 60px)' }}>
            {[
              'WOW / 11:11:11 is more than Sabrina’s first painting. It is where her story as an artist began.',
              'Created during a difficult moment in her life, when words were no longer enough, Sabrina instinctively turned to colour, movement and canvas. What emerged was something unexpected: a new way to express what she could not say.',
              'More than 15 years later, WOW remains deeply personal. Looking at it today, Sabrina sees not only who she was then, but the distance she has travelled — from uncertainty to confidence, from searching to trusting her own instinct.',
              'Today, she paints with freedom. Her art has become part of her voice, her identity and the way she connects with the world.',
              'WOW was the first step. Everything else grew from there.',
            ].map((p, i) =>
              <p key={i} style={{ fontFamily: i === 4 ? T.display : T.sans, fontStyle: i === 4 ? 'italic' : 'normal', fontSize: i === 4 ? 26 : 16, fontWeight: 300, lineHeight: 1.75, color: i === 4 ? T.navy : '#222', margin: i === 0 ? 0 : '20px 0 0' }}>{p}</p>
            )}
          </div>
        </div>
      </Section>

      <Rule width="calc(100% - 160px)" margin="0 auto" />

      {/* 3. THE JOY OF THE PROCESS */}
      <Section id="the-joy-of-the-process" padding="clamp(56px, 8vh, 96px) clamp(24px, 5vw, 80px)">
        <div style={wrap}>
          <Eyebrow>The Joy of the Process</Eyebrow>
          {words(['Freedom', 'Expression', 'Experimentation', 'Movement', 'Spontaneity', 'Personal space', 'A search for peace and clarity'])}
        </div>
      </Section>

      <Rule width="calc(100% - 160px)" margin="0 auto" />

      {/* 4. MY PROCESS */}
      <Section id="my-process" padding="clamp(56px, 8vh, 96px) clamp(24px, 5vw, 80px)">
        <div style={wrap}>
          <Eyebrow>My Process</Eyebrow>
          {words(['Layers', 'Colour', 'Texture', 'Gesture', 'Movement'])}
          <div style={{ marginTop: 32, maxWidth: 760 }}>
            <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: '#222', margin: 0 }}>Adding and removing colour. Returning to a painting and letting it evolve.</p>
            <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: '#222', margin: '14px 0 0' }}>Earlier marks stay part of the work&rsquo;s history.</p>
          </div>
        </div>
      </Section>

      <Rule width="calc(100% - 160px)" margin="0 auto" />

      {/* 5. TOOLS & MATERIALS */}
      <Section id="tools-and-materials" padding="clamp(56px, 8vh, 96px) clamp(24px, 5vw, 80px)">
        <div style={wrap}>
          <Eyebrow>Tools &amp; Materials</Eyebrow>
          <div className="st-split rev" style={{ ...split, marginTop: 28 }}>
            <ToolsCarousel slides={[
              { src: 'assets/studio/tools-and-materials.jpg', alt: 'Sabrina Goria in her studio with spatulas, rollers and other tools on the floor' },
              { src: 'assets/studio/tools-and-materials-2.jpg', alt: 'Kitchen utensils: spatulas, ladles, forks and a rolling pin' },
            ]} />
            <div>
              {words(['Spatulas', 'Forks', 'Ladles', 'Rollers', 'Containers', 'Other kitchen utensils'])}
              <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: '#222', margin: '28px 0 0' }}>Linked to her Italian heritage.</p>
            </div>
          </div>
        </div>
      </Section>

      <Rule width="calc(100% - 160px)" margin="0 auto" />

      {/* 6. COLOUR, LIGHT & TRANSFORMATION */}
      <Section id="colour-light-and-transformation" padding="clamp(56px, 8vh, 96px) clamp(24px, 5vw, 80px)">
        <div style={wrap}>
          <Eyebrow>Colour, Light &amp; Transformation</Eyebrow>
          {words(['Vivid colour', 'Movement', 'Softer tones', 'Gold', 'Light', 'Resilience', 'Hope', 'Freedom'])}
          <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: '#222', margin: '28px 0 0', maxWidth: 760 }}>Gold is a recurring symbol of light, vitality and inner strength.</p>
          <blockquote style={{ margin: 'clamp(40px, 6vh, 72px) 0 0', padding: 0, textAlign: 'center' }}>
            <p style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(28px, 3.4vw, 48px)', lineHeight: 1.2, color: T.navy, margin: 0 }}>&ldquo;I explore the relationship between emotion, movement, colour and transformation.&rdquo;</p>
            <p style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: '#222', margin: '24px auto 0', maxWidth: 680 }}>Transformation is not about removing the past, but allowing it to become part of something new.</p>
          </blockquote>
        </div>
      </Section>

      <FooterV2 dark />
    </div>
  );
}

window.StudioPage = StudioPage;
