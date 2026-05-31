// V2 router, hash-based. Falls back to V2 home for unknown routes.
function useHashRouteV2() {
  const [hash, setHash] = useState(() => window.location.hash || '#/home');
  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash || '#/home');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash;
}

function AppV2() {
  const hash = useHashRouteV2();
  const parts = hash.split('/');
  const route = parts[1] || 'home';
  const sub = parts[2];
  switch (route) {
    case 'gallery':     return sub ? <CollectionDetailPage tag={sub} /> : <GalleryPageV2 />;
    case 'about':       return <AboutPage />;
    case 'studio':      return <StudioPage />;
    case 'exhibitions': return <ExhibitionsPage />;
    case 'contact':     return <ContactPage />;
    case 'artwork':     return <ArtworkPage />;
    case 'home':
    default:            return <HomePageV2 />;
  }
}
ReactDOM.createRoot(document.getElementById('root')).render(<AppV2 />);
