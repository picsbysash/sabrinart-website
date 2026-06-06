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
      position: fixed; left: 16px; top: -64px; z-index: 10000;
      padding: 12px 22px;
      background: #1d2a4d; color: #ffffff;
      font-family: 'IBM Plex Mono', ui-monospace, monospace;
      font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase;
      text-decoration: none;
      border: 1px solid #d9b463;
      transition: top .2s ease;
    }
    .sa-skip:focus, .sa-skip:focus-visible { top: 16px; }

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

      /* ---------- HEADER (mobile) ---------- */
      /* Comfortable side padding + landscape notch safe-area (≥24px) */
      header[style*="180px"], header[style*="64px"] {
        padding-left: max(24px, env(safe-area-inset-left)) !important;
        padding-right: max(24px, env(safe-area-inset-right)) !important;
      }
      /* Logo: keep it perfectly centered, sitting just above the hero badge */
      header[style*="180px"] > div[style*="left: 50%"] { top: 40px !important; }
      /* Nav links: neat row that sits BELOW the centered logo (tall header only) */
      header[style*="180px"] nav {
        font-size: 11px !important;
        letter-spacing: 1.6px !important;
        margin-top: 90px !important;
        row-gap: 2px !important;
      }
      header nav a { padding: 5px 9px !important; }
      header nav span[style*="border-radius: 50"] { display: none !important; }
      /* Cart icon: pin to the top-right — only the cart, never the centered logo */
      header > div[style*="position: absolute"][style*="right:"] { top: 20px !important; right: 16px !important; }
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
})();
