// Site chrome, NavBar, Footer, buttons, kicker, hairline rule.
const { useState, useEffect } = React;

const ROUTES = [
{ id: 'home', label: 'Home', href: '#/home' },
{ id: 'gallery', label: 'Gallery', href: '#/gallery' },
{ id: 'about', label: 'About', href: '#/about' },
{ id: 'studio', label: 'Studio & Process', href: '#/studio' },
{ id: 'exhibitions', label: 'Exhibitions', href: '#/exhibitions' },
{ id: 'contact', label: 'Contact', href: '#/contact' }];


function Logo({ light = false, size = 42 }) {
  // PNG wordmark with transparent background, cream variant for dark headers.
  // Uses inlined base64 data when available (for bundled offline preview), falls back to file path.
  const __B = (typeof window !== 'undefined' && window.__SA_ASSET_BASE) ? window.__SA_ASSET_BASE : '';
  const fallback = __B + (light ? 'assets/img/logo-sabrinart-cream.png' : 'assets/img/logo-sabrinart-black.png');
  const src = (typeof window !== 'undefined' && (light ? window.__LOGO_CREAM_DATA : window.__LOGO_BLACK_DATA)) || fallback;
  return (
    <a href="#/home" style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      lineHeight: 0
    }}>
      <img
        src={src}
        alt="SabrinArt Collection"
        style={{ ...{
            height: size,
            width: 'auto',
            maxWidth: '100%',
            display: 'block',
            filter: light ? 'drop-shadow(0 2px 14px rgba(0,0,0,.55))' : 'none'
          }, height: "55px" }} />
      
    </a>);

}

function CartIcon({ light, count = 0 }) {
  const c = light ? T.cream : T.navy;
  const accent = T.gold;
  return (
    <a href="#/cart" aria-label={`Shopping bag${count ? ', ' + count + ' items' : ''}`} style={{
      position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 48, height: 48,
      borderRadius: '50%',
      border: `1px solid ${light ? 'rgba(255,255,255,.35)' : T.hairStrong}`,
      background: light ? 'rgba(20,29,54,.25)' : 'rgba(255,255,255,.6)',
      backdropFilter: 'blur(8px)',
      color: c, textDecoration: 'none',
      transition: 'background .25s, border-color .25s, transform .2s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = light ? 'rgba(255,255,255,.95)' : T.navy;
      e.currentTarget.style.borderColor = light ? T.cream : T.navy;
      const svg = e.currentTarget.querySelector('svg');
      if (svg) {
        svg.querySelectorAll('path, circle').forEach((el) => el.style.stroke = light ? T.navy : T.cream);
      }
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = light ? 'rgba(20,29,54,.25)' : 'rgba(255,255,255,.6)';
      e.currentTarget.style.borderColor = light ? 'rgba(255,255,255,.35)' : T.hairStrong;
      const svg = e.currentTarget.querySelector('svg');
      if (svg) {
        const paths = svg.querySelectorAll('path');
        paths[0].style.stroke = c;
        paths[1].style.stroke = accent;
        svg.querySelectorAll('circle').forEach((el) => el.style.stroke = c);
      }
    }}>
      {/* Elegant shopping bag, body in ink color, handle accent in gold */}
      <svg width="22" height="24" viewBox="0 0 22 24" fill="none"
      strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8h15l-1.2 13.5a1 1 0 0 1-1 .9H5.7a1 1 0 0 1-1-.9L3.5 8z"
        stroke={c} strokeWidth="1.4" style={{ transition: 'stroke .25s' }} />
        <path d="M7.5 8V5.8a3.5 3.5 0 0 1 7 0V8"
        stroke={accent} strokeWidth="1.5" style={{ transition: 'stroke .25s' }} />
        <circle cx="8" cy="12" r="0.9" fill={c} stroke="none" style={{ transition: 'fill .25s' }} />
        <circle cx="14" cy="12" r="0.9" fill={c} stroke="none" style={{ transition: 'fill .25s' }} />
      </svg>

      {count > 0 &&
      <span style={{
        position: 'absolute', top: -3, right: -3,
        minWidth: 18, height: 18, padding: '0 5px',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: T.gold, color: T.cream,
        borderRadius: 9,
        fontSize: 9.5, fontWeight: 500, lineHeight: 1,
        fontFamily: T.mono, letterSpacing: 0,
        boxShadow: '0 2px 6px rgba(184,133,42,.4)',
        border: `1.5px solid ${light ? T.navy : T.cream}`
      }}>{count}</span>
      }
    </a>);

}

// NavLinks, inline-row of links with a single gold underline that slides to
// whichever link is hovered. Falls back to the active link when not hovering.
function NavLinks({ active, fg, effectiveLight, overHero, compact }) {
  const navRef = React.useRef(null);
  const linkRefs = React.useRef({});
  const [hoverId, setHoverId] = React.useState(null);
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0, opacity: 0 });

  const measure = React.useCallback((id) => {
    const nav = navRef.current;
    const el = linkRefs.current[id];
    if (!nav || !el) return null;
    const navRect = nav.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { left: r.left - navRect.left, width: r.width };
  }, []);

  const targetId = hoverId || active;

  React.useEffect(() => {
    const m = measure(targetId);
    if (m) setIndicator({ left: m.left, width: m.width, opacity: 1 });
  }, [targetId, measure, overHero]);

  // Re-measure on resize
  React.useEffect(() => {
    const onResize = () => {
      const m = measure(targetId);
      if (m) setIndicator((s) => ({ ...s, left: m.left, width: m.width }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [targetId, measure]);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setHoverId(null)}
      style={{
        position: 'relative',
        marginTop: compact ? 0 : (overHero ? 110 : 100),
        display: 'inline-flex', gap: 0, alignItems: 'center', flexWrap: 'wrap',
        justifyContent: 'center',
        fontFamily: T.sans, fontSize: 10.5, fontWeight: 400,
        letterSpacing: 3.4, textTransform: 'uppercase',
        color: fg
      }}>
      {ROUTES.map((r, i) =>
        <React.Fragment key={r.id}>
          <a
            ref={(el) => { linkRefs.current[r.id] = el; }}
            href={r.href}
            onMouseEnter={() => setHoverId(r.id)}
            style={{
              padding: '6px 18px',
              color: (hoverId ? hoverId === r.id : active === r.id) ? T.gold : fg,
              transition: 'color .25s', lineHeight: 1, fontSize: "13px"
            }}>{r.label}</a>
          {i < ROUTES.length - 1 &&
            <span style={{
              width: 3, height: 3, borderRadius: '50%',
              background: effectiveLight ? 'rgba(255,255,255,.4)' : T.taupeSoft
            }} />
          }
        </React.Fragment>
      )}
      {/* Sliding underline */}
      <span aria-hidden style={{
        position: 'absolute',
        bottom: -6,
        left: 0,
        height: 1,
        background: T.gold,
        transform: `translateX(${indicator.left}px)`,
        width: indicator.width,
        opacity: indicator.opacity,
        transition: 'transform .35s cubic-bezier(.2,.7,.2,1), width .35s cubic-bezier(.2,.7,.2,1), opacity .25s',
        pointerEvents: 'none'
      }} />
    </nav>
  );
}

// NavBar, centered editorial: logo top, links below in a discreet caps row.
// `light` flips to white text for dark-stage / over-hero overlays.
// `floating` makes it absolute over the hero (transparent, no border).
function NavBar({ active, light = false, floating = false }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 140);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // Floating nav (over hero) flips to a solid white look once you scroll past the hero.
  const overHero = floating && !scrolled;
  const effectiveLight = light && overHero;
  const fg = effectiveLight ? T.cream : T.navy;
  const solid = !overHero;
  // Once scrolled, the tall editorial header collapses into a slim always-visible bar.
  const compact = scrolled;
  return (
    <React.Fragment>
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, zIndex: 50,
      padding: compact ? '0 clamp(20px, 5vw, 56px)' : (overHero ? '12px 56px 8px' : '12px 56px 10px'),
      background: solid ? 'rgba(255,255,255,.92)' : 'transparent',
      backdropFilter: solid ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: solid ? 'blur(14px)' : 'none',
      borderBottom: solid ? `1px solid ${T.hair}` : 'none',
      textAlign: 'center',
      transition: 'background .3s ease, padding .3s ease, border-color .3s ease, height .3s ease',
      height: compact ? '64px' : '180px',
      display: compact ? 'flex' : 'block',
      alignItems: compact ? 'center' : undefined,
      justifyContent: compact ? 'space-between' : undefined,
    }}>
      {compact ? (
        <React.Fragment>
          {/* Slim bar: logo left, nav center, cart right */}
          <a href="#/home" style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
            <Logo light={false} size={30} />
          </a>
          <NavLinks active={active} fg={T.navy} effectiveLight={false} overHero={false} compact />
          <div style={{ flexShrink: 0 }}>
            <CartIcon light={false} count={2} />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Cart anchored top-right */}
          <div style={{ position: 'absolute', top: 22, right: 56 }}>
            <CartIcon light={effectiveLight} count={2} />
          </div>

          {/* Logo, absolute, centered horizontally, positioned below the cart line */}
          <div style={{ position: 'absolute', top: 45, left: '50%', transform: 'translateX(-50%)' }}>
            <Logo light={effectiveLight} size={overHero ? 48 : 42} />
          </div>

          {/* Nav links, centered row, fills the space just below the logo */}
          <NavLinks active={active} fg={fg} effectiveLight={effectiveLight} overHero={overHero} />
        </React.Fragment>
      )}
    </header>
    {/* Spacer reserves the header's footprint on non-floating pages so content
        is never hidden underneath the fixed bar. */}
    {!floating &&
      <div aria-hidden style={{ height: 180 }} />
    }
    </React.Fragment>);

}

window.ROUTES = ROUTES;
window.Logo = Logo;
window.CartIcon = CartIcon;
window.NavBar = NavBar;

// Footer, sand/eucalyptus secondary natural tone option, or dark navy.
function Footer({ dark = false }) {
  const bg = dark ? T.navy : T.paper2;
  const fg = dark ? T.cream : T.ink;
  const fg2 = dark ? 'rgba(255,255,255,.6)' : T.taupe;
  const eyebrow = dark ? T.goldShimmer : T.ochre;
  return (
    <footer style={{
      background: bg, color: fg, padding: 'clamp(48px, 6vh, 72px) clamp(32px, 5vw, 80px) clamp(28px, 4vh, 40px)',
      borderTop: `1px solid ${dark ? 'rgba(255,255,255,.1)' : T.hairStrong}`
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1.5fr', gap: 56
      }}>
        <div>
          <Logo light={dark} size={48} />
          <div style={{
            fontFamily: T.sans, fontSize: 13, color: fg2, marginTop: 24, lineHeight: 1.7, maxWidth: 280
          }}>
            SabrinArt Collection, Contemporary Abstract Art for Modern Interiors.<br />
            Melbourne, Australia.
          </div>
        </div>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 3, color: eyebrow, textTransform: 'uppercase', marginBottom: 18 }}>Browse</div>
          <div style={{ fontFamily: T.sans, fontSize: 12.5, color: fg2, lineHeight: 2, fontWeight: 300 }}>
            <a href="#/gallery" style={{ display: 'block' }}>Gallery</a>
            <a href="#/about" style={{ display: 'block' }}>About the Artist</a>
            <a href="#/studio" style={{ display: 'block' }}>Studio &amp; Process</a>
            <a href="#/exhibitions" style={{ display: 'block' }}>Exhibitions</a>
            <a href="#/contact" style={{ display: 'block' }}>Contact</a>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 3, color: eyebrow, textTransform: 'uppercase', marginBottom: 18 }}>Information</div>
          <div style={{ fontFamily: T.sans, fontSize: 12.5, color: fg2, lineHeight: 2, fontWeight: 300 }}>
            <span style={{ display: 'block' }}>Shipping</span>
            <span style={{ display: 'block' }}>Returns</span>
            <span style={{ display: 'block' }}>Privacy</span>
            <span style={{ display: 'block' }}>Terms</span>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 3, color: eyebrow, textTransform: 'uppercase', marginBottom: 18 }}>Stay in the picture</div>
          <div style={{ fontFamily: T.sans, fontSize: 12.5, color: fg2, lineHeight: 1.6, marginBottom: 18 }}>
            Be the first to see new collections, exhibition news and studio stories. No noise, just art.
          </div>
          <div style={{
            display: 'flex', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.3)' : T.navy}`,
            paddingBottom: 8
          }}>
            <div style={{ flex: 1, fontFamily: T.mono, fontSize: 11, color: fg2, letterSpacing: 0.5 }}>your email address</div>
            <span style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: 2.4, color: fg, textTransform: 'uppercase' }}>Subscribe →</span>
          </div>
          <div style={{ marginTop: 16, fontFamily: T.sans, fontSize: 10.5, color: fg2, letterSpacing: 0.3, lineHeight: 1.6 }}>
            We will only ever email you about SabrinArt Collection. Unsubscribe anytime.
          </div>
        </div>
      </div>
      <div style={{
        maxWidth: 1320, margin: '64px auto 0', paddingTop: 28,
        borderTop: `1px solid ${dark ? 'rgba(255,255,255,.08)' : T.hair}`,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: T.mono, fontSize: 9.5, color: fg2, letterSpacing: 1.5, textTransform: 'uppercase'
      }}>
        <span>© 2026 SabrinArt Collection</span>
        <span>sabrinart.com.au · Melbourne, Australia</span>
        <a href="https://www.instagram.com/sabrinart_collection" target="_blank" rel="noopener noreferrer" style={{ color: fg2 }}>@sabrinart_collection</a>
      </div>
    </footer>);

}

window.Footer = Footer;