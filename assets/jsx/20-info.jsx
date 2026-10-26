// Info pages, Shipping / Returns / Commissions. Short editorial pages linked
// from the footer. Copy only states what the site already says elsewhere and
// points visitors to the Contact page for anything more specific.

const INFO_PAGES = {
  shipping: {
    label: 'Shipping & Returns',
    eyebrow: 'Shipping & Returns',
    title: <>Shipping <span style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>&amp; returns</span>.</>,
    body: [
    'Every original painting is signed by Sabrina Goria and shipped from her studio in Melbourne, Australia.',
    'For delivery questions or a shipping quote to your location, please get in touch. Sabrina replies personally to every message, usually within a few days.',
    'If you have a question about returning an artwork, please contact Sabrina directly with your name and the title of the work.'],

    cta: 'Contact Sabrina'
  },
  terms: {
    label: 'Terms of Sale',
    eyebrow: 'Terms of Sale',
    title: <>Terms <span style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>of sale</span>.</>,
    body: ['This page is being prepared. For any question about a purchase, please contact Sabrina.'],
    cta: 'Contact Sabrina'
  },
  privacy: {
    label: 'Privacy Policy',
    eyebrow: 'Privacy Policy',
    title: <>Privacy <span style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>policy</span>.</>,
    body: ['This page is being prepared. For any question about your personal information, please contact Sabrina.'],
    cta: 'Contact Sabrina'
  }
};

function InfoPage({ topic }) {
  const page = INFO_PAGES[topic];
  return (
    <div style={{ background: T.lightStage, minHeight: '100vh' }} data-screen-label={page.label} id="main-content">
      <NavBar />

      <Section padding="clamp(48px, 6vh, 80px) clamp(32px, 5vw, 80px) clamp(64px, 8vh, 104px)">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow style={{ display: 'inline-block' }}>{page.eyebrow}</Eyebrow>
          <H1 style={{ marginTop: 28, fontSize: 'clamp(44px, 6vw, 88px)' }}>{page.title}</H1>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {page.body.map((p, i) =>
            <Body key={i} size={17} lh={1.75} style={{ margin: 0, textAlign: 'center' }}>{p}</Body>
            )}
          </div>
          <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
            <Btn primary arrow size="lg" href="#/contact">{page.cta}</Btn>
          </div>
          <Body size={15} style={{ marginTop: 24, textAlign: 'center' }}>
            Or email{' '}
            <a href={`mailto:${FOOTER_EMAIL}`} style={{ color: T.navy, borderBottom: `1px solid ${T.hairStrong}`, overflowWrap: 'anywhere' }}>{FOOTER_EMAIL}</a>
          </Body>
        </div>
      </Section>

      <FooterV2 dark />
    </div>);

}

window.InfoPage = InfoPage;
