// SabrinArt, global accessibility, responsiveness, performance & feedback layer.
// Drop-in: injects a single <style> block + a skip-to-content link + a few
// runtime affordances (img lazy-loading default, reduced-motion respect).
//
// Touches every section in the site without changing the JSX layouts.

(function injectGlobals() {
  if (typeof document === 'undefined' || document.getElementById('sabrinart-globals')) return;

  // -------- 1. Style sheet --------
  const css = `
    /* ---------- ACCESSIBILITY ---------- */
    *:focus { outline: none; }
    *:focus-visible {
      outline: 2px solid #b8852a;
      outline-offset: 3px;
      border-radius: 1px;
    }
    a, button, input, textarea, select { -webkit-tap-highlight-color: rgba(184,133,42,.18); }

    /* Skip-to-content (only visible when keyboard-focused) */
    .sa-skip {
      position: fixed; left: 16px; top: 16px; z-index: 10000;
      transform: translateY(-220%);
      padding: 12px 22px;
      background: #1d2a4d; color: #ffffff;
      font-family: 'IBM Plex Mono', ui-monospace, monospace;
      font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase;
      white-space: nowrap; text-decoration: none;
      border: 1px solid #d9b463;
      transition: transform .2s ease;
    }
    .sa-skip:focus, .sa-skip:focus-visible { transform: translateY(0); }

    /* Honor reduced-motion */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* ---------- BUTTON / LINK FEEDBACK ---------- */
    a, button { transition: transform .12s cubic-bezier(.2,.7,.2,1); }
    a:active, button:active { transform: scale(.98); }

    /* ---------- SKELETON SHIMMER for ImgPH placeholders ---------- */
    @keyframes sa-shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position:  200% 0; }
    }
    .sa-skel {
      background: linear-gradient(90deg,
        transparent 0%,
        rgba(184,133,42,.10) 30%,
        rgba(232,200,122,.20) 50%,
        rgba(184,133,42,.10) 70%,
        transparent 100%);
      background-size: 200% 100%;
      animation: sa-shimmer 2.4s linear infinite;
    }

    /* ---------- PREMIUM POLISH (global, design-preserving) ---------- */
    /* Smooth, intentional scrolling */
    html { scroll-behavior: smooth; }
    /* Eliminate horizontal scroll without breaking sticky elements (clip, not hidden) */
    html, body { max-width: 100%; overflow-x: clip; }
    /* Crisper type rendering for the editorial feel */
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
    /* Media never overflows or distorts its container */
    img, svg, video, canvas { max-width: 100%; }
    /* Snappier, delay-free taps on touch devices */
    a, button { touch-action: manipulation; }
    /* More elegant line breaks for headings and body copy */
    h1, h2, h3 { text-wrap: balance; }
    p { text-wrap: pretty; }
    /* Hero headline: a subtle legibility lift over the painting — artwork stays vivid */
    [data-screen-label="01 Home"] h1 { text-shadow: 0 2px 28px rgba(0,0,0,.42); }
    [data-screen-label="01 Home"] p  { text-shadow: 0 1px 16px rgba(0,0,0,.35); }

    /* ---------- SCROLLED HEADER: dark translucent glass ---------- */
    /* The slim bar that appears on scroll (height 64px) becomes a premium
       dark blur instead of solid white — readable, minimal, never loud. */
    header[style*="64px"] {
      background: rgba(18,26,48,.72) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      backdrop-filter: blur(16px) !important;
      border-bottom: 1px solid rgba(255,255,255,.12) !important;
    }
    /* Logo reads as white on the dark bar (and stays crisp) */
    header[style*="64px"] img {
      filter: brightness(0) invert(1) drop-shadow(0 1px 8px rgba(0,0,0,.35)) !important;
      height: 40px !important;
    }
    /* Nav + cart read as cream on the dark bar */
    header[style*="64px"] nav a { color: #f4ece0 !important; }
    header[style*="64px"] a[href="#/cart"] {
      color: #f4ece0 !important;
      border-color: rgba(255,255,255,.35) !important;
      background: rgba(255,255,255,.08) !important;
    }
    header[style*="64px"] a[href="#/cart"] svg path { stroke: #f4ece0 !important; }
    header[style*="64px"] a[href="#/cart"] svg circle { fill: #f4ece0 !important; }

    /* ---------- LOGO: slightly larger & crisp on the tall header ---------- */
    header[style*="180px"] img { height: 60px !important; }

    /* ---------- RESPONSIVE, Mobile first cascade ---------- */

    /* Laptop ≤ 1180px: reduce horizontal padding */
    @media (max-width: 1180px) {
      section { padding-left: 56px !important; padding-right: 56px !important; }
    }

    /* Tablet ≤ 1024px: collapse 4/5-col grids to 2 */
    @media (max-width: 1024px) {
      section { padding-left: 40px !important; padding-right: 40px !important; }
      section [style*="grid-template-columns: repeat(5"],
      section [style*="grid-template-columns: repeat(4"],
      section [style*="grid-template-columns: repeat(3"] {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      /* Hero h1 scales down */
      [data-screen-label="01 Home"] h1 { font-size: clamp(36px, 8vw, 72px) !important; }
      /* Footer 4-col → 2-col on tablet */
      footer > div > div[style*="grid-template-columns"] {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 56px !important;
      }
      footer { padding-left: 40px !important; padding-right: 40px !important; }
    }

    /* Mobile ≤ 720px: everything stacks */
    @media (max-width: 720px) {
      section {
        padding: 80px 20px !important;
        padding-left: max(20px, env(safe-area-inset-left)) !important;
        padding-right: max(20px, env(safe-area-inset-right)) !important;
      }
      section [style*="grid-template-columns"] {
        grid-template-columns: 1fr !important;
      }
      section [style*="gap: 96"],
      section [style*="gap: 80"],
      section [style*="gap: 64"],
      section [style*="gap: 56"] {
        gap: 32px !important;
      }
      /* Tap targets */
      a, button { min-height: 44px; }
      a[href]:not(.sa-skip), button {
        display: inline-flex; align-items: center;
      }
      /* Type scale dampening */
      h1 { font-size: clamp(34px, 10vw, 56px) !important; line-height: 1.05 !important; }
      h2 { font-size: clamp(28px, 8vw, 44px) !important; line-height: 1.05 !important; }
      h3 { font-size: clamp(22px, 6vw, 32px) !important; }
      /* Marquee scale */
      .marquee-wrap span { font-size: 48px !important; }
      /* Footer dense grid */
      footer > div > div[style*="grid-template-columns"] {
        grid-template-columns: 1fr !important;
        gap: 48px !important;
      }
      /* Footer breathing room + safe-area on phones */
      footer {
        padding-left: max(24px, env(safe-area-inset-left)) !important;
        padding-right: max(24px, env(safe-area-inset-right)) !important;
      }

      /* ---------- HEADER (mobile): hamburger takes over ---------- */
      /* Comfortable side padding + landscape notch safe-area (≥24px) */
      header[style*="180px"], header[style*="64px"] {
        padding-left: max(24px, env(safe-area-inset-left)) !important;
        padding-right: max(24px, env(safe-area-inset-right)) !important;
      }
      /* Logo: centered and lowered, clearly off the top edge */
      header[style*="180px"] > div[style*="left: 50%"] { top: 72px !important; }
      /* Keep the slim (scrolled) logo centered too */
      header[style*="64px"] > a[href="#/home"] {
        position: absolute !important; left: 50% !important; transform: translateX(-50%) !important;
      }
      /* Hide the desktop link row + cart on phones — the hamburger replaces them */
      header nav { display: none !important; }
      header[style*="180px"] > div[style*="position: absolute"][style*="right:"] { display: none !important; }
      header[style*="64px"] a[href="#/cart"] { display: none !important; }
    }

    /* Mobile ≤ 480px: tighten further */
    @media (max-width: 480px) {
      section { padding: 64px 20px !important; }
      h1 { font-size: clamp(30px, 11vw, 48px) !important; }
      h2 { font-size: clamp(24px, 9vw, 36px) !important; }
      header[style*="180px"], header[style*="64px"] {
        padding-left: max(20px, env(safe-area-inset-left)) !important;
        padding-right: max(20px, env(safe-area-inset-right)) !important;
      }
      header[style*="180px"] nav { font-size: 10.5px !important; letter-spacing: 1.4px !important; }
    }

    /* ---------- MOBILE HAMBURGER MENU ---------- */
    .sa-burger, .sa-menu-overlay { display: none; }
    @media (max-width: 720px) {
      .sa-burger {
        display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px;
        position: fixed; z-index: 120; margin: 0; padding: 10px;
        top: max(44px, calc(env(safe-area-inset-top) + 28px));
        right: max(20px, env(safe-area-inset-right));
        width: 44px; height: 44px; background: transparent; border: 0; cursor: pointer;
      }
      .sa-burger span {
        display: block; width: 24px; height: 2px; border-radius: 2px; background: #f4ece0;
        transition: transform .3s ease, opacity .25s ease, background .25s ease;
      }
      .sa-burger.dark span { background: #1d2a4d; }
      .sa-burger.is-open span { background: #f4ece0; }
      .sa-burger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      .sa-burger.is-open span:nth-child(2) { opacity: 0; }
      .sa-burger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

      .sa-menu-overlay {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        position: fixed; inset: 0; z-index: 110;
        background: rgba(16,23,43,.97);
        -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
        padding: max(72px, env(safe-area-inset-top)) 24px max(40px, env(safe-area-inset-bottom));
        opacity: 0; pointer-events: none; transform: translateY(-6px);
        transition: opacity .3s ease, transform .3s ease;
      }
      .sa-menu-overlay.open { opacity: 1; pointer-events: auto; transform: translateY(0); }
      .sa-menu-close {
        position: fixed; z-index: 130; top: max(40px, calc(env(safe-area-inset-top) + 22px)); right: 20px;
        width: 44px; height: 44px; background: transparent; border: 0; cursor: pointer;
        color: #f4ece0; font-family: Georgia, serif; font-size: 32px; line-height: 1;
      }
      .sa-menu-nav { display: flex; flex-direction: column; align-items: center; gap: 2px; }
      .sa-menu-nav a {
        font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: 30px;
        color: #f4ece0; text-decoration: none; padding: 10px 18px; letter-spacing: .3px;
        transition: color .2s ease;
      }
      .sa-menu-nav a:active { color: #d9b463; }
      .sa-menu-bag {
        margin-top: 28px; font-family: 'IBM Plex Mono', ui-monospace, monospace;
        font-size: 11px; letter-spacing: 2.6px; text-transform: uppercase;
        color: rgba(244,236,224,.75); text-decoration: none;
        border: 1px solid rgba(244,236,224,.3); padding: 13px 26px;
      }
    }

    /* ---------- Image fade-in on load ---------- */
    img[loading="lazy"] {
      opacity: 0;
      transition: opacity .6s ease;
    }
    img[loading="lazy"].sa-loaded,
    img[loading="lazy"][src]:not([data-pending]) {
      opacity: 1;
    }
  `;

  const style = document.createElement('style');
  style.id = 'sabrinart-globals';
  style.textContent = css;
  document.head.appendChild(style);

  // -------- 2. Skip-to-content link --------
  const onReady = () => {
    if (document.querySelector('.sa-skip')) return;
    const skip = document.createElement('a');
    skip.href = '#main-content';
    skip.className = 'sa-skip';
    skip.textContent = 'Skip to content';
    document.body.insertBefore(skip, document.body.firstChild);
  };
  if (document.readyState !== 'loading') onReady();
  else document.addEventListener('DOMContentLoaded', onReady);

  // -------- 3. Lazy-load every <img> by default (except logo) --------
  const lazifyImages = () => {
    document.querySelectorAll('img:not([loading])').forEach((img) => {
      // Logo is above-the-fold, load eagerly
      if (img.alt && /sabrinart/i.test(img.alt)) {
        img.setAttribute('loading', 'eager');
        img.setAttribute('decoding', 'sync');
        img.setAttribute('fetchpriority', 'high');
      } else {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      }
    });
  };
  // Run periodically since React mounts images progressively.
  let runs = 0;
  const tick = () => {
    lazifyImages();
    if (++runs < 10) setTimeout(tick, 400);
  };
  if (document.readyState !== 'loading') tick();
  else document.addEventListener('DOMContentLoaded', tick);

  // -------- 4. Mobile hamburger menu (premium, full-screen) --------
  function buildMobileMenu() {
    if (document.querySelector('.sa-burger') && document.querySelector('.sa-menu-overlay')) return;
    var _pb = document.querySelector('.sa-burger'); if (_pb) _pb.remove();
    var _po = document.querySelector('.sa-menu-overlay'); if (_po) _po.remove();
    var routes = (window.ROUTES && window.ROUTES.length) ? window.ROUTES : [
      { label: 'Home', href: '#/home' }, { label: 'Gallery', href: '#/gallery' },
      { label: 'About', href: '#/about' }, { label: 'Studio & Process', href: '#/studio' },
      { label: 'Exhibitions', href: '#/exhibitions' }, { label: 'Contact', href: '#/contact' }
    ];
    var burger = document.createElement('button');
    burger.type = 'button';
    burger.className = 'sa-burger';
    burger.setAttribute('aria-label', 'Open menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span><span></span><span></span>';

    var overlay = document.createElement('div');
    overlay.className = 'sa-menu-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    var html = '<button type="button" class="sa-menu-close" aria-label="Close menu">×</button><nav class="sa-menu-nav">';
    routes.forEach(function (r) { html += '<a href="' + r.href + '">' + r.label + '</a>'; });
    html += '</nav><a class="sa-menu-bag" href="#/cart">View bag</a>';
    overlay.innerHTML = html;

    document.body.appendChild(burger);
    document.body.appendChild(overlay);

    function setOpen(open) {
      overlay.classList.toggle('open', open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    burger.addEventListener('click', function () { setOpen(!overlay.classList.contains('open')); });
    overlay.querySelector('.sa-menu-close').addEventListener('click', function () { setOpen(false); });
    overlay.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    window.addEventListener('hashchange', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    // Burger ink adapts: light over the dark hero / dark scrolled bar; dark on light interior headers.
    function updateColor() {
      var hash = window.location.hash || '#/home';
      var isHome = hash.indexOf('#/home') === 0 || hash === '#/' || hash === '';
      var light = isHome || window.scrollY > 140;
      burger.classList.toggle('dark', !light);
    }
    window.addEventListener('scroll', updateColor, { passive: true });
    window.addEventListener('hashchange', updateColor);
    updateColor();
  }
  // Build after the app has mounted (the React mount sweeps body once on load),
  // then re-assert a few times so the menu always survives that churn.
  function scheduleMenu() {
    buildMobileMenu();
    setTimeout(buildMobileMenu, 1200);
    setTimeout(buildMobileMenu, 3000);
    setTimeout(buildMobileMenu, 6000);
  }
  if (document.readyState === 'complete') scheduleMenu();
  else window.addEventListener('load', scheduleMenu);
})();
