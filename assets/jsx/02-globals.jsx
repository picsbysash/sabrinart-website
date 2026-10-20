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

    /* ---------- HEADER: always solid white, black navigation ---------- */
    /* One look in every state (scroll, menu, route): opaque #FFFFFF background,
       #000000 nav text, never transparent and no background transitions. */
    header.sa-header {
      background: #FFFFFF !important;
      background-color: #FFFFFF !important;
      -webkit-backdrop-filter: none !important;
      backdrop-filter: none !important;
      opacity: 1 !important;
      transition: none !important;
      z-index: 1000 !important;
    }
    header.sa-header nav a,
    .sa-mobile-menu nav a { color: #000000 !important; }
    header.sa-header img { filter: none !important; }
    header.sa-header .sa-header-logo-tall img { height: 60px !important; }
    header.sa-header .sa-header-logo-slim img { height: 40px !important; }
    header.sa-header .sa-header-mobile-logo img { height: 38px !important; }

    /* Mobile row + menu are hidden on desktop */
    .sa-header-mobile, .sa-mobile-menu { display: none; }

    /* Narrow desktops: tighten the slim one-row nav so all seven items fit */
    @media (min-width: 721px) and (max-width: 1100px) {
      header.sa-header.is-compact .sa-nav-links { letter-spacing: 1.2px !important; }
      header.sa-header.is-compact .sa-nav-links a { padding: 6px 7px !important; font-size: 11px !important; }
      header.sa-header:not(.is-compact) .sa-nav-links a { padding: 6px 10px !important; }
      header.sa-header:not(.is-compact) .sa-nav-links { letter-spacing: 2px !important; }
    }

    /* ---------- FOOTER (minimal: brand | links | contact) ---------- */
    footer.sa-footer { padding: 72px 80px 32px; overflow-x: hidden; }
    .sa-footer-inner { max-width: 1320px; margin: 0 auto; }
    .sa-footer-main {
      display: flex; align-items: center; justify-content: space-between;
      gap: 48px; flex-wrap: wrap;
    }
    .sa-footer-brand { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; min-width: 0; }
    .sa-footer-tagline {
      margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic;
      font-size: 18px; line-height: 1.4; color: var(--sa-foot-fg2);
    }
    .sa-footer-nav, .sa-footer-contact {
      display: flex; flex-wrap: wrap; align-items: center; gap: 8px 36px;
    }
    .sa-footer-nav a, .sa-footer-contact a {
      font-family: 'Inter', system-ui, sans-serif; font-size: 12px; font-weight: 400;
      letter-spacing: 2.6px; text-transform: uppercase; color: var(--sa-foot-fg);
      padding: 8px 0; text-decoration: none; border-bottom: 1px solid transparent;
      transition: border-color .25s ease, color .25s ease;
    }
    .sa-footer-contact a { display: inline-flex; align-items: center; gap: 10px; }
    .sa-footer-contact a:first-child {
      text-transform: none; letter-spacing: .4px; font-size: 14px; font-weight: 300;
      overflow-wrap: anywhere;
    }
    .sa-footer-nav a:hover, .sa-footer-contact a:hover { border-bottom-color: #d9b463; }
    .sa-footer-base {
      margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--sa-foot-hair);
      display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px 24px;
      font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px;
      letter-spacing: 2px; text-transform: uppercase; color: var(--sa-foot-fg2);
    }
    @media (max-width: 1024px) {
      footer.sa-footer { padding-top: 60px; }
      .sa-footer-main { flex-direction: column; align-items: center; text-align: center; gap: 32px; }
      .sa-footer-brand { align-items: center; }
      .sa-footer-nav, .sa-footer-contact { justify-content: center; }
    }
    @media (max-width: 720px) {
      footer.sa-footer { padding-top: 52px; padding-bottom: max(28px, env(safe-area-inset-bottom)); }
      .sa-footer-nav { flex-direction: column; gap: 0; }
      .sa-footer-contact { flex-direction: column; gap: 0; }
      .sa-footer-nav a, .sa-footer-contact a { justify-content: center; padding: 0; }
      .sa-footer-base { justify-content: center; text-align: center; margin-top: 40px; }
    }

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

      /* ---------- HEADER (mobile): hamburger | logo | bag ---------- */
      header.sa-header {
        height: calc(64px + env(safe-area-inset-top)) !important;
        padding: env(safe-area-inset-top) max(12px, env(safe-area-inset-right)) 0 max(12px, env(safe-area-inset-left)) !important;
      }
      .sa-header-desktop { display: none !important; }
      .sa-header-mobile {
        display: grid; grid-template-columns: 48px 1fr 48px; align-items: center;
        height: 64px; position: relative;
      }
      .sa-header-mobile-logo {
        position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
        display: flex; align-items: center; justify-content: center;
        max-width: calc(100vw - 132px);
      }
      .sa-header-mobile-logo a { min-height: 0 !important; }
      .sa-header-mobile-cart { grid-column: 3; justify-self: end; display: flex; }
      .sa-header-spacer { height: calc(64px + env(safe-area-inset-top)) !important; }
    }

    /* Mobile ≤ 480px: tighten further */
    @media (max-width: 480px) {
      section { padding: 64px 20px !important; }
      h1 { font-size: clamp(30px, 11vw, 48px) !important; }
      h2 { font-size: clamp(24px, 9vw, 36px) !important; }
    }

    /* ---------- MOBILE HAMBURGER MENU (white, beneath the header) ---------- */
    @media (max-width: 720px) {
      .sa-burger {
        grid-column: 1; justify-self: start;
        display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px;
        margin: 0; padding: 10px;
        width: 44px; height: 44px; background: transparent; border: 0; cursor: pointer;
      }
      .sa-burger span {
        display: block; width: 24px; height: 2px; border-radius: 2px; background: #000000;
        transition: transform .3s ease, opacity .25s ease;
      }
      .sa-burger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      .sa-burger.is-open span:nth-child(2) { opacity: 0; }
      .sa-burger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

      .sa-mobile-menu {
        display: block;
        position: fixed; left: 0; right: 0; bottom: 0; z-index: 999;
        top: calc(64px + env(safe-area-inset-top));
        background: #FFFFFF;
        border-top: 1px solid rgba(29,42,77,.12);
        overflow-y: auto;
        padding: 24px max(24px, env(safe-area-inset-right)) max(40px, env(safe-area-inset-bottom)) max(24px, env(safe-area-inset-left));
        opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(-6px);
        transition: opacity .25s ease, transform .25s ease, visibility 0s linear .25s;
      }
      .sa-mobile-menu.open {
        opacity: 1; visibility: visible; pointer-events: auto; transform: translateY(0);
        transition: opacity .25s ease, transform .25s ease, visibility 0s;
      }
      .sa-mobile-menu nav { display: flex !important; flex-direction: column; align-items: center; gap: 2px; }
      .sa-mobile-menu nav a {
        font-family: 'Inter', system-ui, sans-serif; font-weight: 400; font-size: 15px;
        letter-spacing: 3px; text-transform: uppercase;
        text-decoration: none; padding: 14px 18px;
        justify-content: center;
      }
      .sa-mobile-menu nav a[aria-current="page"] { text-decoration: underline; text-decoration-color: #b8852a; text-underline-offset: 6px; }
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

  // -------- 4. Mobile hamburger menu now lives in the React NavBar (04-chrome.jsx) --------

  // -------- 5. Logo / Home link always returns to the top of Home --------
  // Tapping the logo navigates Home (if elsewhere) and always snaps to the very
  // top — even when already on Home, where no route change would fire otherwise.
  document.addEventListener('click', function (e) {
    var a = (e.target && e.target.closest) ? e.target.closest('a[href="#/home"]') : null;
    if (!a) return;
    if (!window.location.hash || window.location.hash === '#/' || window.location.hash === '#') {
      window.location.hash = '#/home';
    }
    setTimeout(function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }, false);
})();
