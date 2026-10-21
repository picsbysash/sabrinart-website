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

function AppV2() {
  const path = useRouteV2();
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
    case 'exhibitions': return <ExhibitionsPage />;
    case 'contact':     return <ContactPage />;
    case 'artwork':     return WORKS_CATALOG.some((w) => w.slug === sub) ? <ArtworkPage slug={sub} /> : <GalleryPageV2 />;
    case 'shipping':
    case 'returns':
    case 'commissions': return <InfoPage topic={route} />;
    case 'home':
    default:            return <HomePageV2 />;
  }
}
ReactDOM.createRoot(document.getElementById('root')).render(<AppV2 />);
