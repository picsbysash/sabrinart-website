// Artwork page: one page per work, route /gallery/<slug>. Data from WORKS_CATALOG (Excel + Brief v3 appendix).

// ---- Cart (kept in this browser; checkout/payment is not connected yet) ----
window.saCart = {
  get() { try { const c = JSON.parse(localStorage.getItem('sa_cart_v2') || '[]'); return Array.isArray(c) ? c.filter((x) => typeof x === 'string') : []; } catch (e) { return []; } },
  set(list) { try { localStorage.setItem('sa_cart_v2', JSON.stringify(list)); } catch (e) {} window.dispatchEvent(new Event('sa-cart')); },
  add(slugs) { const cur = this.get(); const next = cur.concat([].concat(slugs).filter((x) => cur.indexOf(x) < 0)); this.set(next); },
  remove(slug) { this.set(this.get().filter((x) => x !== slug)); },
};
const PAIRS = { 'green-orchid': { other: 'blue-lotus', word: 'blue' }, 'blue-lotus': { other: 'green-orchid', word: 'green' } };

function CartPage() {
  const [, force] = useState(0);
  useEffect(() => { const f = () => force((n) => n + 1); window.addEventListener('sa-cart', f); return () => window.removeEventListener('sa-cart', f); }, []);
  const items = window.saCart.get().map((sl) => WORKS_CATALOG.find((w) => w.slug === sl)).filter((w) => w && w.status === 'ON SALE');
  const total = items.reduce((n, w) => n + (parseInt(String(w.price).replace(/[^0-9]/g, ''), 10) || 0), 0);
  return (
    <div style={{ background: T.paper, minHeight: '100vh' }} data-screen-label="08 Cart">
      <NavBar active="cart" />
      <Section padding="clamp(40px,6vh,72px) clamp(24px,5vw,80px) clamp(64px,9vh,110px)">
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <h1 style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(44px,5vw,72px)', color: T.navy, margin: '0 0 32px' }}>Cart</h1>
          {items.length === 0 ?
            <div>
              <p style={{ fontFamily: T.sans, fontSize: 16, color: T.taupe, margin: '0 0 24px' }}>Your cart is empty.</p>
              <Btn arrow href="#/gallery/on-sale">View all works on sale</Btn>
            </div> :
            <React.Fragment>
              {items.map((w) =>
                <div key={w.slug} style={{ display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 20, alignItems: 'center', padding: '18px 0', borderTop: `1px solid ${T.hair}` }}>
                  <a href={`#/gallery/${w.slug}`}><img src={w.src} alt={w.t} style={{ display: 'block', width: 110, height: 110, objectFit: 'contain', background: '#f6f7f9' }} /></a>
                  <div>
                    <a href={`#/gallery/${w.slug}`} style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: 24, color: T.navy }}>{w.t}</a>
                    <div style={{ marginTop: 6, fontFamily: T.mono, fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: T.taupe }}>{w.year} · {w.sizeCm} · {w.medium}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: 22, color: T.gold }}>AUD {w.price}</div>
                    <button onClick={() => window.saCart.remove(w.slug)} style={{ marginTop: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.mono, fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: T.taupe, textDecoration: 'underline' }}>Remove</button>
                  </div>
                </div>
              )}
              <div style={{ borderTop: `1px solid ${T.gold}`, marginTop: 8, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ fontFamily: T.display, fontStyle: 'italic', fontSize: 30, color: T.navy }}>Total · AUD ${total.toLocaleString('en-US')}</div>
                <Btn primary size="lg" arrow href="#/contact">Proceed to checkout</Btn>
              </div>
            </React.Fragment>
          }
        </div>
      </Section>
      <FooterV2 dark />
    </div>);
}
window.CartPage = CartPage;

function ArtworkPage({ slug }) {
  const [added, setAdded] = useState(false);
  const w = WORKS_CATALOG.find((x) => x.slug === slug);
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => { if (e.key === 'Escape') setZoom(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);
  if (!w) return null;
  const onSale = w.status === 'ON SALE';
  const pair = PAIRS[w.slug] ? { ...PAIRS[w.slug], work: WORKS_CATALOG.find((x) => x.slug === PAIRS[w.slug].other) } : null;
  const edition = w.slug === 'green-orchid' || w.slug === 'blue-lotus';
  const more = WORKS_CATALOG.filter((x) => x.status === 'ON SALE' && x.slug !== w.slug && x.src).slice(0, 4);
  const row = { display: 'flex', justifyContent: 'space-between', gap: 16, padding: '13px 0', borderBottom: `1px solid ${T.hair}` };
  const k = { fontFamily: T.mono, fontSize: 10, color: T.gold, letterSpacing: 2, textTransform: 'uppercase' };
  const v = { fontFamily: T.serif, fontSize: 16, fontStyle: 'italic', color: T.navy, textAlign: 'right' };
  return (
    <div style={{ background: T.paper, minHeight: '100vh' }} data-screen-label={`07 Artwork · ${w.t}`}>
      <NavBar active="gallery" />
      <style>{`
        .aw-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: clamp(32px, 5vw, 80px); align-items: start; }
        .aw-more { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(20px, 2.4vw, 36px); }
        @media (max-width: 900px) { .aw-grid { grid-template-columns: 1fr; } .aw-more { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      `}</style>

      <div style={{
        padding: '24px clamp(24px,5vw,80px) 0', maxWidth: 1320, margin: '0 auto',
        fontFamily: T.mono, fontSize: 12, color: T.taupe, letterSpacing: 2.2, textTransform: 'uppercase',
      }}>
        <a href="#/gallery" style={{ color: T.taupe }}>Gallery</a>
        <span style={{ color: T.taupeSoft, margin: '0 10px' }}>/</span>
        <span style={{ color: T.gold }}>{w.t}</span>
      </div>

      <Section padding="clamp(24px,4vh,48px) clamp(24px,5vw,80px) clamp(56px,8vh,96px)">
        <div className="aw-grid" style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div>
            <button onClick={() => setZoom(true)} aria-label={`Zoom ${w.t}`} style={{
              display: 'block', width: '100%', padding: 'clamp(12px, 2vw, 28px)', border: `1px solid ${T.hair}`,
              background: '#f6f7f9', cursor: 'zoom-in',
            }}>
              <img src={w.src} alt={w.t} style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '78vh', objectFit: 'contain' }} />
            </button>
            <div style={{ marginTop: 10, fontFamily: T.mono, fontSize: 10, letterSpacing: 2, color: T.taupeSoft, textTransform: 'uppercase', textAlign: 'center' }}>Click to zoom</div>
          </div>

          <aside>
            <div style={{ marginBottom: 16 }}><StatusTag status={w.status} /></div>
            <h1 style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
              fontSize: 'clamp(44px, 5vw, 68px)', color: T.navy, margin: 0, lineHeight: 1.0, letterSpacing: '-0.02em',
            }}>{w.t}</h1>
            {w.short && <p style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 20, color: T.taupe, margin: '14px 0 0', lineHeight: 1.45 }}>{w.short}</p>}

            <div style={{ marginTop: 28 }}>
              <div style={row}><span style={k}>Year</span><span style={v}>{w.year}</span></div>
              <div style={row}><span style={k}>Medium</span><span style={v}>{w.medium}</span></div>
              <div style={row}><span style={k}>Size</span><span style={v}>{w.sizeCm}</span></div>
              {edition && <div style={row}><span style={k}>Edition</span><span style={v}>Limited edition of 10</span></div>}
              {onSale && w.price && <div style={row}><span style={k}>Price</span><span style={{ ...v, fontSize: 24, color: T.gold, fontStyle: 'normal' }}>AUD {w.price}</span></div>}
            </div>

            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {onSale ?
                <React.Fragment>
                  <Btn primary size="lg" onClick={() => { window.saCart.add(w.slug); setAdded(true); }}>{added ? 'Added to cart ✓' : 'Add to Cart'}</Btn>
                  <Btn size="lg" onClick={() => { window.saCart.add(w.slug); window.saNavigate('/cart'); }}>Buy Now</Btn>
                  {pair && <Btn size="lg" onClick={() => { window.saCart.add([w.slug, pair.other]); setAdded(true); }}>Add the pair</Btn>}
                </React.Fragment> :
                <Btn arrow href="#/commissions">Enquire about a commission</Btn>
              }
            </div>

            {pair && pair.work &&
              <div style={{ marginTop: 24 }}>
                <a href={`#/gallery/${pair.other}`} style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 18, color: T.gold, textDecoration: 'underline', textUnderlineOffset: 5 }}>Also in {pair.word}: {pair.work.t} →</a>
              </div>
            }

            {w.long &&
              <div style={{ marginTop: 36 }}>
                <p style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: 'rgba(29,42,77,.85)', margin: 0 }}>{w.long}</p>
              </div>
            }
          </aside>
        </div>

        {more.length > 0 &&
          <div style={{ maxWidth: 1320, margin: 'clamp(64px, 9vh, 110px) auto 0' }}>
            <div style={{ paddingBottom: 16, borderBottom: `1px solid ${T.hair}`, marginBottom: 'clamp(24px, 3vh, 36px)' }}>
              <h2 style={{ fontFamily: T.display, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(28px, 3vw, 40px)', color: T.navy, margin: 0 }}>More works on sale</h2>
            </div>
            <div className="aw-more">
              {more.map((m) =>
                <a key={m.slug} href={`#/gallery/${m.slug}`} style={{ display: 'block' }}>
                  <ImgPH label={m.t} src={m.src} ratio="1 / 1" badge={m.status} />
                  <div style={{ marginTop: 12, fontFamily: T.display, fontStyle: 'italic', fontSize: 20, color: T.navy }}>{m.t}</div>
                  <div style={{ marginTop: 4, fontFamily: T.display, fontStyle: 'italic', fontSize: 17, color: T.gold }}>AUD {m.price}</div>
                </a>
              )}
            </div>
          </div>
        }
      </Section>

      {zoom &&
        <div onClick={() => setZoom(false)} role="dialog" aria-label={`${w.t}, enlarged`} style={{
          position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(10,14,28,.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out',
        }}>
          <img src={w.src} alt={w.t} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          <button onClick={() => setZoom(false)} aria-label="Close" style={{
            position: 'absolute', top: 16, right: 20, background: 'transparent', border: 'none', color: '#fff', fontSize: 34, cursor: 'pointer',
          }}>×</button>
        </div>
      }

      <FooterV2 dark />
    </div>);
}

window.ArtworkPage = ArtworkPage;
