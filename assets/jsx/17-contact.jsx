// Contact + Commissions (brief section 8). Both forms are sent with Netlify Forms
// (static twins of the forms live in index.html so Netlify can detect them).
// Spam protection: hidden honeypot field. Messages are emailed to sabrinartcollection@gmail.com
// (set under Netlify > Forms > Form notifications).

const FORM_LABEL = { fontFamily: T.mono, fontSize: 12, color: T.ochre, letterSpacing: 2.2, textTransform: 'uppercase', marginBottom: 10 };
const FORM_FIELD = {
  width: '100%', boxSizing: 'border-box', background: 'transparent', border: 'none',
  borderBottom: `1px solid ${T.navy}`, borderRadius: 0,
  fontFamily: T.serif, fontStyle: 'italic', fontSize: 20, color: T.navy,
  padding: '8px 0', outline: 'none'
};

// fields: [{ name, label, type: text|email|tel|select|area, opts, required, placeholder }]
function SaForm({ formName, fields, thanks, button }) {
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('bot-field')) { setState('sent'); return; } // honeypot filled = bot
    setState('sending');
    try {
      const body = new URLSearchParams();
      data.forEach((v, k) => body.append(k, String(v)));
      const r = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
      if (!r.ok) throw new Error('bad status');
      form.reset();
      setState('sent');
    } catch (err) { setState('error'); }
  };
  if (state === 'sent') {
    return (
      <div role="status" style={{ padding: '40px 0' }}>
        <div style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(28px, 3vw, 40px)', color: T.navy }}>{thanks}</div>
      </div>);
  }
  return (
    <form name={formName} method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <input type="hidden" name="form-name" value={formName} />
      <p aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
        <label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>
      {fields.map((f) =>
      <div key={f.name}>
        <label htmlFor={`${formName}-${f.name}`} style={{ display: 'block' }}>
          <div style={FORM_LABEL}>{f.label}{f.required ? ' *' : ''}</div>
        </label>
        {f.type === 'area' ?
        <textarea id={`${formName}-${f.name}`} name={f.name} required={f.required} rows={5} placeholder={f.placeholder} style={{ ...FORM_FIELD, resize: 'vertical' }} /> :
        f.type === 'select' ?
        <select id={`${formName}-${f.name}`} name={f.name} required={f.required} defaultValue="" style={{ ...FORM_FIELD, cursor: 'pointer' }}>
            <option value="" disabled>Select…</option>
            {f.opts.map((o) => <option key={o} value={o}>{o}</option>)}
          </select> :
        <input id={`${formName}-${f.name}`} name={f.name} type={f.type} required={f.required} placeholder={f.placeholder} style={FORM_FIELD} />}
      </div>
      )}
      {state === 'error' &&
      <div role="alert" style={{ fontFamily: T.sans, fontSize: 14, color: '#a33' }}>
        Sorry, the message could not be sent. Please try again, or email {FOOTER_EMAIL}.
      </div>}
      <div style={{ marginTop: 4 }}>
        <button type="submit" disabled={state === 'sending'} style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 24px', cursor: 'pointer',
          border: `1px solid ${T.navy}`, background: 'transparent', color: T.navy,
          fontFamily: T.sans, fontSize: 11, letterSpacing: 2.4, textTransform: 'uppercase',
          opacity: state === 'sending' ? .6 : 1
        }}>{state === 'sending' ? 'Sending…' : button}</button>
      </div>
    </form>);
}

const CONTACT_FIELDS = [
{ name: 'first-name', label: 'First Name', type: 'text', required: true },
{ name: 'surname', label: 'Surname', type: 'text', required: true },
{ name: 'email', label: 'Email', type: 'email', required: true },
{ name: 'phone', label: 'Phone Number', type: 'tel' },
{ name: 'heard-about', label: 'How did you hear about me?', type: 'select', opts: ['Instagram', 'Exhibition', 'Friend or family', 'Google', 'Other'] },
{ name: 'message', label: 'Message', type: 'area', required: true }];

const COMMISSION_FIELDS = [
{ name: 'name', label: 'Name', type: 'text', required: true },
{ name: 'email', label: 'Email', type: 'email', required: true },
{ name: 'phone', label: 'Phone', type: 'tel' },
{ name: 'address', label: 'Address', type: 'text' },
{ name: 'preferred-size-cm', label: 'Preferred size (cm)', type: 'text', placeholder: 'e.g. 90 × 120 cm' },
{ name: 'colours-style', label: 'Preferred colours / style', type: 'text' },
{ name: 'description', label: 'Description', type: 'area', required: true },
{ name: 'budget', label: 'Budget (optional)', type: 'text' }];

function ContactPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }} data-screen-label="Contact" id="main-content">
      <NavBar active="contact" />
      <section style={{ padding: 'clamp(32px, 5vh, 64px) clamp(24px, 5vw, 80px) clamp(56px, 8vh, 96px)' }}>
        <style>{`
          .ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 5vw, 80px); align-items: start; }
          @media (max-width: 820px) { .ct-grid { grid-template-columns: 1fr; } }
        `}</style>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h1 style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, color: T.navy, margin: '0 0 clamp(28px, 4vh, 48px)',
            fontSize: 'clamp(44px, 6vw, 88px)', lineHeight: 1.05, letterSpacing: '-0.02em', textAlign: 'center' }}>Contact Sabrina</h1>
          <div className="ct-grid">
            <div>
              <img src="assets/about/sabrina-happiness.jpg" alt="Sabrina Goria laughing among flying brushes"
              style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8, fontFamily: T.sans, fontSize: 15 }}>
                <a href={`mailto:${FOOTER_EMAIL}`} style={{ color: T.navy, overflowWrap: 'anywhere' }}>{FOOTER_EMAIL}</a>
                <a href={FOOTER_INSTAGRAM} target="_blank" rel="noopener noreferrer" style={{ color: T.navy, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <InstagramIcon size={15} color={T.navy} />@sabrinart_collection</a>
              </div>
            </div>
            <SaForm formName="contact" fields={CONTACT_FIELDS} button="Send Message" thanks="Thank you! Your message has been sent." />
          </div>
        </div>
      </section>
      <FooterV2 dark />
    </div>);
}

function CommissionsPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }} data-screen-label="Commissions" id="main-content">
      <NavBar />
      <section style={{ padding: 'clamp(32px, 5vh, 64px) clamp(24px, 5vw, 80px) clamp(56px, 8vh, 96px)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h1 style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, color: T.navy, margin: '0 0 clamp(28px, 4vh, 48px)',
            fontSize: 'clamp(44px, 6vw, 88px)', lineHeight: 1.05, letterSpacing: '-0.02em', textAlign: 'center' }}>Commissions</h1>
          <SaForm formName="commission" fields={COMMISSION_FIELDS} button="Send Enquiry" thanks="Thank you! Your enquiry has been sent." />
        </div>
      </section>
      <FooterV2 dark />
    </div>);
}

window.ContactPage = ContactPage;
window.CommissionsPage = CommissionsPage;
