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
    'If you have a question about returning an artwork, please contact Sabrina directly with your name and the title of the work.',
    'Nothing on this page limits your rights under the Australian Consumer Law.'],

    cta: 'Contact Sabrina'
  },
  terms: {
    label: 'Terms of Sale',
    eyebrow: 'Terms of Sale',
    long: true,
    title: <>Terms <span style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>of sale</span>.</>,
    body: [
    '## The artworks',
    'Every painting sold by SabrinArt Collection is an original, one-of-a-kind work created and signed by Sabrina Goria in Melbourne, Australia. An original can be sold only once: when it sells, it is shown as SOLD and can no longer be purchased.',
    '## Availability and prices',
    'Only works marked ON SALE can be purchased. Works marked SOLD or NOT FOR SALE cannot be bought. All prices are shown in Australian dollars (AUD).',
    '## Orders and payment',
    'A purchase is confirmed once payment has been received and you have been sent a confirmation email. Sabrina may decline or cancel an order if a work has already been sold (SOLD), in which case any payment made is refunded in full.',
    '## Shipping and returns',
    'Please see the Shipping & Returns page for how works are sent and how to ask about a return.',
    '## Colours and images',
    'Every effort is made to show each painting as faithfully as possible, but colours and texture can look different on different screens.',
    '## Commissions',
    'A commission is not a purchase. Commission enquiries are answered personally by Sabrina, and the details of any commission are agreed with you before work begins.',
    '## Your rights',
    'Nothing in these terms limits your rights under the Australian Consumer Law.',
    '## Questions',
    'For any question about a purchase, please contact Sabrina at sabrinartcollection@gmail.com.'],
    cta: 'Contact Sabrina'
  },
  privacy: {
    label: 'Privacy Policy',
    eyebrow: 'Privacy Policy',
    long: true,
    title: <>Privacy <span style={{ fontStyle: 'italic', fontWeight: 500, color: T.gold }}>policy</span>.</>,
    body: [
    '## What we collect',
    'When you send a message through the Contact form or a commission enquiry, we receive the details you enter: your name, email address, phone number, address (commission enquiries only), how you heard about Sabrina, and your message.',
    '## How we use it',
    'We use this information only to reply to you and to deal with your enquiry or order. We do not sell your information or share it for marketing.',
    '## Where it is stored',
    'Form messages are received through Netlify, which hosts this website, and are emailed to sabrinartcollection@gmail.com. Your cart is kept only in your own browser on your device.',
    '## Payments',
    'When online payment is available, card details are handled by the payment provider and are not stored on this website.',
    '## Fonts',
    'This website loads its fonts from Google Fonts, which may receive your IP address when a page loads.',
    '## Access and corrections',
    'You can ask to see, correct or delete the personal information we hold about you by emailing sabrinartcollection@gmail.com.',
    '## Questions',
    'For any question about your privacy, please contact Sabrina at sabrinartcollection@gmail.com.'],
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
            {page.body.map((p, i) => p.indexOf('## ') === 0 ?
            <h2 key={i} style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 28, color: T.navy, margin: '16px 0 -8px', textAlign: 'left' }}>{p.slice(3)}</h2> :
            <Body key={i} size={17} lh={1.75} style={{ margin: 0, textAlign: page.long ? 'left' : 'center' }}>{p}</Body>
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
