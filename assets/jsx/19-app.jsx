// Router: clean paths (/gallery/smile). Old "#/..." links are converted to paths.
// Netlify serves index.html for every path (_redirects), this reads location.pathname.
function saToPath(h) {
  var p = String(h || '').replace(/^#/, '') || '/';
  if (p === '/home') p = '/';
  return p;
}
function saFixLegacyHash() {
  var h = window.location.hash;
  if (h && h.indexOf('#/') === 0) {
    window.history.replaceState(null, '', saToPath(h) + window.location.search);
  }
}
window.saNavigate = function (path) {
  if (path === window.location.pathname) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  window.history.pushState(null, '', path);
  window.dispatchEvent(new Event('sa-nav'));
};
(function () {
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href^="#/"]') : null;
    if (!a || (a.target && a.target !== '_self')) return;
    e.preventDefault();
    window.saNavigate(saToPath(a.getAttribute('href')));
  }, true);
})();

function useRouteV2() {
  const [path, setPath] = useState(() => { saFixLegacyHash(); return window.location.pathname; });
  useEffect(() => {
    const onNav = () => { saFixLegacyHash(); setPath(window.location.pathname); window.scrollTo({ top: 0, behavior: 'instant' }); };
    window.addEventListener('sa-nav', onNav);
    window.addEventListener('popstate', onNav);
    window.addEventListener('hashchange', onNav);
    return () => { window.removeEventListener('sa-nav', onNav); window.removeEventListener('popstate', onNav); window.removeEventListener('hashchange', onNav); };
  }, []);
  return path;
}


// Page title / description / share tags, kept in sync with the route (the server also injects them: netlify/edge-functions/seo.js).
const SA_PAGES = {
  home: ['SabrinArt Collection · Contemporary Abstract Art · Melbourne', 'Contemporary abstract art for modern interiors by Sabrina Goria, Melbourne. Original paintings, works on sale and commissions.'],
  gallery: ['Gallery · SabrinArt Collection', 'All 39 original paintings by Sabrina Goria: on sale, sold and not for sale.'],
  about: ['About Sabrina Goria · SabrinArt Collection', 'Meet Sabrina Goria, the Melbourne abstract artist behind SabrinArt Collection.'],
  studio: ['Studio & Process · SabrinArt Collection', 'How Sabrina Goria became an artist and how she paints in her Melbourne studio.'],
  exhibitions: ['Exhibitions · SabrinArt Collection', 'Current, upcoming and past exhibitions by Sabrina Goria, with photos.'],
  contact: ['Contact Sabrina · SabrinArt Collection', 'Get in touch with Sabrina Goria about her paintings, commissions and exhibitions.'],
  commissions: ['Commissions · SabrinArt Collection', 'Send a commission enquiry to Sabrina Goria for an original abstract painting.'],
  shipping: ['Shipping & Returns · SabrinArt Collection', 'How SabrinArt Collection paintings are shipped from Melbourne, and how to ask about a return.'],
  terms: ['Terms of Sale · SabrinArt Collection', 'Terms of sale for original paintings from SabrinArt Collection.'],
  privacy: ['Privacy Policy · SabrinArt Collection', 'How SabrinArt Collection handles the personal information you send through this website.'],
  cart: ['Cart · SabrinArt Collection', 'Your cart at SabrinArt Collection.']
};
function saSetMeta(title, desc, image) {
  try {
    document.title = title;
    const url = window.location.origin + window.location.pathname;
    const set = (sel, make, val) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = make(); document.head.appendChild(el); }
      if (el.tagName === 'LINK') el.setAttribute('href', val); else el.setAttribute('content', val);
    };
    const meta = (attr, name) => () => { const m = document.createElement('meta'); m.setAttribute(attr, name); m.setAttribute('data-sa', ''); return m; };
    set('meta[name="description"]', meta('name', 'description'), desc);
    set('meta[property="og:title"]', meta('property', 'og:title'), title);
    set('meta[property="og:description"]', meta('property', 'og:description'), desc);
    set('meta[property="og:url"]', meta('property', 'og:url'), url);
    set('meta[property="og:image"]', meta('property', 'og:image'), window.location.origin + '/' + image);
    set('link[rel="canonical"]', () => { const l = document.createElement('link'); l.setAttribute('rel', 'canonical'); l.setAttribute('data-sa', ''); return l; }, url);
  } catch (e) {}
}
function useSeo(path) {
  useEffect(() => {
    const parts = path.replace(/\/+$/, '').split('/');
    const route = parts[1] || 'home';
    const sub = parts[2];
    const w = (route === 'gallery' || route === 'artwork') && sub ? WORKS_CATALOG.find((x) => x.slug === sub) : null;
    if (w) {
      const txt = (window.WORK_TEXT && window.WORK_TEXT[w.t] && window.WORK_TEXT[w.t].short) || '';
      saSetMeta(`${w.t} · ${w.medium} · SabrinArt Collection`, `${txt} ${w.year}, ${w.sizeCm}, ${w.medium}.`.trim(), w.src);
    } else {
      const p = SA_PAGES[route] || SA_PAGES.home;
      saSetMeta(p[0], p[1], 'assets/artworks/wow.jpg');
    }
  }, [path]);
}

function AppV2() {
  const path = useRouteV2();
  const [, bumpData] = useState(0);
  useEffect(() => { const f = () => bumpData((n) => n + 1); window.addEventListener('sa-data', f); return () => window.removeEventListener('sa-data', f); }, []);
  useSeo(path);
  const parts = path.replace(/\/+$/, '').split('/');
  const route = parts[1] || 'home';
  const sub = parts[2];
  switch (route) {
    case 'gallery': {
      if (!sub) return <GalleryPageV2 />;
      if (WORKS_CATALOG.some((w) => w.slug === sub)) return <ArtworkPage slug={sub} />;
      return <CollectionDetailPage tag={sub} />;
    }
    case 'cart':        return <CartPage />;
    case 'about':       return <AboutPage />;
    case 'studio':      return <StudioPage section={sub} />;
    case 'exhibitions': return sub ? <ExhibitionGalleryPage slug={sub} /> : <ExhibitionsPage />;
    case 'contact':     return <ContactPage />;
    case 'artwork':     return WORKS_CATALOG.some((w) => w.slug === sub) ? <ArtworkPage slug={sub} /> : <GalleryPageV2 />;
    case 'commissions': return <CommissionsPage />;
    case 'returns':     return <InfoPage topic="shipping" />;
    case 'shipping':
    case 'terms':
    case 'privacy':     return <InfoPage topic={route} />;
    case 'home':
    default:            return <HomePageV2 />;
  }
}
ReactDOM.createRoot(document.getElementById('root')).render(<AppV2 />);
