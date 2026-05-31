// Contact, full hi-fi page following doc section 8.1.

function ContactPage() {
  return (
    <div style={{ background: T.lightStage, minHeight: '100vh' }} data-screen-label="06 Contact">
      <NavBar active="contact" />

      <Section padding="clamp(40px, 5vh, 64px) clamp(32px, 5vw, 80px) clamp(28px, 3.5vh, 44px)">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 4vh, 52px)' }}>
          <Eyebrow style={{ display: 'inline-block' }}>08 · Say hello</Eyebrow>
          <H1 style={{ marginTop: 28, fontSize: 'clamp(56px, 7vw, 104px)' }}>
            Get <span style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>in touch</span>.
          </H1>
          <Body size={17} maxWidth={680} style={{ margin: '32px auto 0', textAlign: 'center' }}>
            For enquiries about available works, commissions, exhibitions, or
            collaborations, Sabrina would love to hear from you.
          </Body>
        </div>
      </Section>

      <Section padding="clamp(24px, 3vh, 40px) clamp(32px, 5vw, 80px) clamp(56px, 7vh, 84px)">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 0,
          background: T.cream, border: `1px solid ${T.hairStrong}`,
          boxShadow: '0 32px 64px -24px rgba(60,40,15,.18)',
        }}>
          {/* LEFT, Contact details */}
          <div style={{
            padding: '64px 56px', borderRight: `1px solid ${T.hair}`,
            background: T.paper2, position: 'relative',
          }}>
            <Eyebrow>Contact details</Eyebrow>
            <H2 size={40} style={{ marginTop: 18 }}>Reach out<br/>directly.</H2>
            <Body size={14} style={{ marginTop: 20 }}>
              Sabrina replies personally to every message, usually within a few
              days from her Melbourne studio.
            </Body>

            <div style={{ marginTop: 48 }}>
              {[
                ['Email', 'sabrinartcollection@gmail.com', 'mailto:sabrinartcollection@gmail.com'],
                ['Instagram', '@sabrinart_collection', 'https://www.instagram.com/sabrinart_collection'],
                ['Facebook', '@sabrinart_collection', '#'],
                ['Based in', 'Melbourne, Australia', null],
                ['Trade enquiries', 'Designers & curators, use the form →', null],
              ].map(([k, v, h]) => (
                <div key={k} style={{
                  padding: '20px 0', borderBottom: `1px solid ${T.hair}`,
                  display: 'grid', gridTemplateColumns: '130px 1fr', gap: 18, alignItems: 'baseline',
                }}>
                  <div style={{ fontFamily: T.mono, fontSize: 15, color: T.ochre, letterSpacing: 2.4, textTransform: 'uppercase' }}>{k}</div>
                  {h ? (
                    <a href={h} target={h.startsWith('http') ? '_blank' : undefined} rel={h.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: 16, color: T.navy }}>{v}</a>
                  ) : (
                    <div style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: 16, color: T.navy }}>{v}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div style={{
              marginTop: 48, padding: '24px 28px',
              borderLeft: `2px solid ${T.gold}`,
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 400, fontSize: 19,
              color: T.indigo, lineHeight: 1.4,
            }}>
              "I want my work to invite you to pause, feel, and reconnect."
              <div style={{ marginTop: 12, fontFamily: T.mono, fontSize: 15, color: T.ochre, letterSpacing: 2, textTransform: 'uppercase', fontStyle: 'normal' }}>
               , Sabrina Goria
              </div>
            </div>
          </div>

          {/* RIGHT, Contact form */}
          <div style={{ padding: '64px 56px' }}>
            <Eyebrow>Contact form</Eyebrow>
            <H2 size={40} style={{ marginTop: 18 }}>Send a message.</H2>
            <Body size={13} style={{ marginTop: 14 }}>
              Tell Sabrina a little about your enquiry, she'll get back to you
              from the studio.
            </Body>

            <form style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                { l: 'Name', t: 'text', ph: 'Your full name' },
                { l: 'Email', t: 'email', ph: 'you@example.com' },
                {
                  l: 'Subject', t: 'select',
                  opts: ['General enquiry', 'Available works', 'Commission enquiry', 'Trade / Designer enquiry', 'Press & exhibitions'],
                },
                { l: 'Message', t: 'area', ph: 'Tell Sabrina more about your enquiry…' },
              ].map((f) => (
                <label key={f.l} style={{ display: 'block' }}>
                  <div style={{ fontFamily: T.mono, fontSize: 15, color: T.ochre, letterSpacing: 2.4, textTransform: 'uppercase', marginBottom: 12 }}>
                    {f.l}
                  </div>
                  {f.t === 'area' ? (
                    <textarea placeholder={f.ph} rows={5} style={{
                      width: '100%', background: 'transparent', border: 'none',
                      borderBottom: `1px solid ${T.navy}`,
                      fontFamily: T.serif, fontStyle: 'italic', fontSize: 20, color: T.navy,
                      padding: '8px 0', resize: 'vertical', outline: 'none',
                    }} />
                  ) : f.t === 'select' ? (
                    <select style={{
                      width: '100%', background: 'transparent', border: 'none',
                      borderBottom: `1px solid ${T.navy}`,
                      fontFamily: T.serif, fontStyle: 'italic', fontSize: 20, color: T.navy,
                      padding: '8px 0', outline: 'none', cursor: 'pointer',
                    }}>
                      {f.opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.t} placeholder={f.ph} style={{
                      width: '100%', background: 'transparent', border: 'none',
                      borderBottom: `1px solid ${T.navy}`,
                      fontFamily: T.serif, fontStyle: 'italic', fontSize: 20, color: T.navy,
                      padding: '8px 0', outline: 'none',
                    }} />
                  )}
                </label>
              ))}

              <label style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                fontFamily: T.sans, fontSize: 11.5, fontWeight: 300, color: T.taupe, lineHeight: 1.6,
              }}>
                <input type="checkbox" style={{ marginTop: 2, accentColor: T.gold }} />
                <span>Add me to the SabrinArt Collection newsletter, new collections, exhibition news and studio stories. No noise, just art.</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <Btn primary arrow size="lg">Send Message</Btn>
              </div>
            </form>
          </div>
        </div>

        {/* Success state preview (per doc 8.1) */}
        <div style={{
          maxWidth: 600, margin: '40px auto 0', padding: '22px 28px',
          background: T.gold, border: 'none',
          textAlign: 'center',
        }}>
          <Eyebrow style={{ display: 'inline-block', margin: 0, marginBottom: 8 }} color="#ffffff">Success state preview</Eyebrow>
          <Body size={14} color="#ffffff" style={{ marginTop: 6 }}>
            "Thank you, your message is on its way. Sabrina will be in touch soon."
          </Body>
        </div>
      </Section>

      <FooterV2 dark />
    </div>
  );
}

window.ContactPage = ContactPage;
