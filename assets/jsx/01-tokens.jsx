// SabrinArt, design tokens (single source of truth across the 6 pages).
// Inspired Color Palette · 80% navy/cream/gold structure, 20% vibrant accents.
const T = {
  // type
  display: "'Cormorant Garamond', 'EB Garamond', Georgia, serif",
  serif: "'Cormorant Garamond', 'EB Garamond', Georgia, serif",
  sans: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, monospace",

  // ink + neutrals (whites / grayscale / navy, no warm bg tones)
  ink: '#16181d',
  navy: '#1d2a4d',
  indigo: '#2a3a6b',
  cobalt: '#2e58b4',
  taupe: '#5a5e66', // body text, neutral gray
  taupeSoft: '#9aa0aa',
  cream: '#ffffff',
  paper: '#ffffff',
  paper2: '#f3f4f6', // light gray
  paperDeep: '#e4e6eb', // medium gray
  hair: 'rgba(29,42,77,.12)',
  hairStrong: 'rgba(29,42,77,.22)',

  // gold family (hairlines, accents only)
  gold: '#b8852a',
  goldRich: '#a87422',
  goldSoft: '#d9b463',
  goldShimmer: '#e8c87a',

  // vibrant, for badges, micro-tags, hover only
  ochre: '#b57e36',
  terracotta: '#c56b45',
  sunset: '#e8702a',
  coral: '#f08570',
  poppy: '#e04a2f',
  vermillion: '#d04428',
  fuchsia: '#d9468c',
  cerise: '#e04788',
  magenta: '#b83a7e',
  ocean: '#1b9aaa',
  turquoise: '#1f9c95',
  eucalyptus: '#6e8c6f',
  sand: '#e0c99a',

  // bg gradients (gallery spotlight)
  lightStage: 'radial-gradient(ellipse at 50% 28%, #ffffff 0%, #f6f7f9 55%, #e8eaef 100%)',
  darkStage: 'radial-gradient(ellipse at 50% 28%, #233152 0%, #1d2a4d 55%, #141d36 100%)',

  // shadow recipes
  artShadow: '0 36px 80px -28px rgba(60,40,15,.25), 0 14px 28px -14px rgba(60,40,15,.14), inset 0 1px 0 rgba(255,255,255,.6)',
  artShadowDark: '0 40px 90px -25px rgba(0,0,0,.7), 0 16px 30px -12px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.04)',
};

// Inject global resets + body shell once.
(function injectStyles() {
  if (typeof document === 'undefined' || document.getElementById('sabrinart-tokens')) return;
  const s = document.createElement('style');
  s.id = 'sabrinart-tokens';
  s.textContent = `
    body { font-family: ${T.sans}; color: ${T.ink}; font-weight: 300; }
    ::selection { background: ${T.goldSoft}; color: ${T.ink}; }
  `;
  document.head.appendChild(s);
})();

window.T = T;

// ---------------------------------------------------------------------------
// Real artwork + photography catalog (dropped in May 2026).
// ART, Sabrina's paintings, by clean name. PHOTO, artist / studio / events.
// ---------------------------------------------------------------------------
const ART = {
  abyssalCreatures: 'assets/art/abyssal-creatures.jpg',
  butterfly: 'assets/art/butterfly.jpg',
  carnivalOfVenice: 'assets/art/carnival-of-venice.jpg',
  carnival: 'assets/art/carnival.jpg',
  confetti: 'assets/art/confetti-and-fallen-stars.jpg',
  flyOnTheSea: 'assets/art/fly-on-the-sea.jpg',
  goldDroplets: 'assets/art/gold-droplets.jpg',
  goldenForest: 'assets/art/golden-forest.jpg',
  humor: 'assets/art/humor.jpg',
  joy: 'assets/art/joy.jpg',
  laughter: 'assets/art/laughter.jpg',
  lotusFlowers: 'assets/art/lotus-flowers.jpg',
  octopus: 'assets/art/octopus.jpg',
  partyTime: 'assets/art/party-time.jpg',
  silverSea: 'assets/art/silver-sea.jpg',
  turquoiseBeach: 'assets/art/turquoise-beach.jpg',
  oilPainting: 'assets/art/fun.jpg',
  whitsunday: 'assets/art/whitsunday-memories.jpg',
  wow: 'assets/art/wow.jpg',
  goldenHeart: 'assets/art/golden-heart.jpg',
  smile: 'assets/art/smile.jpg',
  winter: 'assets/art/winter.jpg',
  blueLotus: 'assets/art/blue-lotus.jpg',
  harmonyOfNature: 'assets/art/harmony-of-nature.jpg',
  passionAndFire: 'assets/art/passion-and-fire.jpg',
  goldenGarden: 'assets/art/golden-garden.jpg',
  layersOfHappiness: 'assets/art/layers-of-happiness.jpg',
  goldenOcean: 'assets/art/golden-ocean.jpg',
  goldenOceanDetail: 'assets/art/golden-ocean-detail.jpg',
  goldenEmber: 'assets/art/golden-ember.jpg',
  goldenPath: 'assets/art/golden-path.jpg',
  galaxy: 'assets/art/galaxy.jpg',
  autumn: 'assets/art/autumn.jpg',
  installBlue: 'assets/art/install-blue.jpg',
  install025: 'assets/art/install-025.jpg',
  installCarnival: 'assets/art/install-carnival.jpg',
  install027: 'assets/art/install-027.jpg',
  install029: 'assets/art/install-029.jpg',
  blueHero: 'assets/art/blue-hero.jpg',
};
const PHOTO = {
  portraitWindow: 'assets/photos/portrait-window.jpg',
  holdingTurquoise: 'assets/photos/holding-turquoise.jpg',
  holdingBlue: 'assets/photos/holding-blue.jpg',
  holdingGreen: 'assets/photos/holding-green.jpg',
  holdingGreen2: 'assets/photos/holding-green2.jpg',
  studioSitting: 'assets/photos/studio-sitting.jpg',
  studioSitting2: 'assets/photos/studio-sitting2.jpg',
  studioInterior: 'assets/photos/studio-interior.jpg',
  porch: 'assets/photos/porch.jpg',
  porch2: 'assets/photos/porch2.jpg',
  brushes: 'assets/photos/brushes.jpg',
  paintingAction: 'assets/photos/painting-action.jpg',
  daNoi: 'assets/photos/da-noi.jpg',
  flyerNature: 'assets/photos/flyer-nature.png',
  exhibRedDot: 'assets/photos/exhib-reddot.jpg',
  exhibThumbsUp: 'assets/photos/exhib-thumbsup.jpg',
  exhibThumbsUp2: 'assets/photos/exhib-thumbsup2.jpg',
  exhibFriends: 'assets/photos/exhib-friends.jpg',
  exhibOpening: 'assets/photos/exhib-opening.jpg',
  exhibCouple: 'assets/photos/exhib-couple.jpg',
};
// Resolve asset paths against the theme directory when embedded in WordPress.
// window.__SA_ASSET_BASE is set by the theme (e.g. ".../themes/sabrinart/").
// Left empty for the offline standalone, where paths stay relative.
(function () {
  var B = (typeof window !== 'undefined' && window.__SA_ASSET_BASE) ? window.__SA_ASSET_BASE : '';
  if (!B) return;
  Object.keys(ART).forEach(function (k) { if (ART[k]) ART[k] = B + ART[k]; });
  Object.keys(PHOTO).forEach(function (k) { if (PHOTO[k]) PHOTO[k] = B + PHOTO[k]; });
})();

window.ART = ART;
window.PHOTO = PHOTO;

// ---------------------------------------------------------------------------
// CANONICAL WORKS CATALOG, single source of truth, aligned with the client's
// inventory docs (Blocks 2-4 / Discovery). Fields:
//   t: title · year · sizeIn / sizeCm · medium · price (AUD, null if not for sale)
//   status: 'ON SALE' | 'AVAILABLE' | 'ACQUIRED' | 'NOT FOR SALE'
//   col: 'new'|'available'|'acquired'|'private'  (gallery collection)
//   label: prestige / context line (acquired & private)  · src: photo or null
//   pal: palette tags for the "shop by palette" filter
// ---------------------------------------------------------------------------
const WORKS_CATALOG = [
  // ----- NEW COLLECTION / Current Projects (2025-2026) · ON SALE · photos pending
  { t: 'Golden Path', year: '2026', sizeIn: '72 × 36 in', sizeCm: '182.9 × 91.4 cm', medium: 'Mixed Media', price: '$1,640', status: 'ON SALE', col: 'new', src: ART.goldenPath, pal: ['gold', 'nature'] },
  { t: 'Passion and Fire', year: '2026', sizeIn: '47 × 71 in', sizeCm: '120 × 180 cm', medium: 'Mixed Media', price: '$2,360', status: 'ON SALE', col: 'new', src: ART.passionAndFire, pal: ['fire', 'cerise'] },
  { t: 'SMILE', year: '2026', sizeIn: '30 × 36 in', sizeCm: '76 × 92 cm', medium: 'Mixed Media', price: '$1,250', status: 'ON SALE', col: 'new', src: ART.smile, pal: ['fire', 'nature'] },
  { t: 'Golden Ember', year: '2026', sizeIn: '14 × 14 in', sizeCm: '35 × 35 cm', medium: 'Mixed Media', price: '$490', status: 'ON SALE', col: 'new', src: ART.goldenEmber, pal: ['fire', 'gold'] },
  { t: 'Harmony of Nature', year: '2025', sizeIn: '14 × 14 in', sizeCm: '35 × 35 cm', medium: 'Mixed Media', price: '$560', status: 'ON SALE', col: 'new', src: ART.harmonyOfNature, pal: ['nature', 'gold'] },
  { t: 'Winter', year: '2026', sizeIn: '10 × 10 in', sizeCm: '25 × 25 cm', medium: 'Oil on Canvas', price: '$210', status: 'ON SALE', col: 'new', src: ART.winter, pal: ['ocean', 'fire'] },

  // ----- AVAILABLE COLLECTION (On Sale)
  { t: 'Silver Sea', year: '2019', sizeIn: '18 × 18 in', sizeCm: '46 × 46 cm', medium: 'Mixed Media', price: '$670', status: 'AVAILABLE', col: 'available', src: ART.silverSea, pal: ['ocean'] },
  { t: 'Gold Droplets', year: '2019', sizeIn: '18 × 18 in', sizeCm: '45 × 45 cm', medium: 'Mixed Media', price: '$620', status: 'AVAILABLE', col: 'available', src: ART.goldDroplets, pal: ['gold', 'cerise'] },
  { t: 'Carnival', year: '2019', sizeIn: '12 × 12 in', sizeCm: '30.5 × 30.5 cm', medium: 'Mixed Media', price: '$420', status: 'AVAILABLE', col: 'available', src: ART.carnival, pal: ['nature', 'ocean'] },
  { t: 'Butterfly', year: '2024', sizeIn: '12 × 12 in', sizeCm: '30 × 30 cm', medium: 'Mixed Media', price: '$480', status: 'AVAILABLE', col: 'available', src: ART.butterfly, pal: ['cerise'] },
  { t: 'Party Time', year: '2024', sizeIn: '16 × 12 in', sizeCm: '40 × 30 cm', medium: 'Mixed Media', price: '$320', status: 'AVAILABLE', col: 'available', src: ART.partyTime, pal: ['fire', 'nature'] },
  { t: 'Fly Over the Sea', year: '2024', sizeIn: '10 × 10 in', sizeCm: '25 × 25 cm', medium: 'Mixed Media', price: '$210', status: 'AVAILABLE', col: 'available', src: ART.flyOnTheSea, pal: ['ocean'] },
  { t: 'Fun', year: '2024', sizeIn: '10 × 10 in', sizeCm: '25 × 25 cm', medium: 'Oil on Canvas', price: '$210', status: 'AVAILABLE', col: 'available', src: ART.oilPainting, pal: ['fire'] },
  { t: 'Autumn', year: '2024', sizeIn: '10 × 10 in', sizeCm: '25 × 25 cm', medium: 'Oil on Canvas', price: '$145', status: 'AVAILABLE', col: 'available', src: ART.autumn, pal: ['fire'] },
  { t: 'Blue Lotus', year: '2024', sizeIn: '12 × 12 in', sizeCm: '30 × 30 cm', medium: 'Resin Art on Canvas', price: '$520', status: 'AVAILABLE', col: 'available', src: ART.blueLotus, pal: ['ocean', 'gold'] },
  { t: 'Billabong', year: '2024', sizeIn: '16 × 16 in', sizeCm: '40.5 × 40.5 cm', medium: 'Resin Art on Wood', price: '$520', status: 'AVAILABLE', col: 'available', src: null, pal: ['ocean'] },
  { t: 'Water Splash', year: '2019', sizeIn: '14 × 14 in', sizeCm: '35.5 × 35.5 cm', medium: 'Mixed Media', price: '$520', status: 'AVAILABLE', col: 'available', src: null, pal: ['ocean'] },
  { t: 'Desert Storm', year: '2019', sizeIn: '20 × 16 in', sizeCm: '50.5 × 40.5 cm', medium: 'Fluid / Mixed Media', price: '$520', status: 'AVAILABLE', col: 'available', src: null, pal: ['nature'] },

  // ----- ACQUIRED COLLECTION (no price · prestige labels)
  { t: 'Turquoise Beach', year: '', sizeIn: '12 × 12 in', sizeCm: '', medium: 'Resin Art on Wood', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector', src: ART.turquoiseBeach, pal: ['ocean', 'nature'] },
  { t: 'Confetti and Falling Stars', year: '', sizeIn: '24 × 24 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired during Solo Exhibition', src: ART.confetti, pal: ['cerise', 'fire'] },
  { t: 'Golden Forest', year: '', sizeIn: '18 × 36 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection · Melbourne', src: ART.goldenForest, pal: ['gold', 'nature'] },
  { t: 'Carnival of Venice', year: '', sizeIn: '10 × 10 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection', src: ART.carnivalOfVenice, pal: ['gold', 'fire'] },
  { t: 'Abyssal Creatures', year: '', sizeIn: '10 × 10 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection · Melbourne', src: ART.abyssalCreatures, pal: ['ocean'] },
  { t: 'Octopus', year: '', sizeIn: '10 × 10 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection · Melbourne', src: ART.octopus, pal: ['ocean'] },
  { t: 'Joy', year: '', sizeIn: '6 × 6 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection · Trilogy of Fun', src: ART.joy, pal: ['fire'] },
  { t: 'Humour', year: '', sizeIn: '6 × 6 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection · Trilogy of Fun', src: ART.humor, pal: ['fire'] },
  { t: 'Laughter', year: '', sizeIn: '6 × 6 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection · Trilogy of Fun', src: ART.laughter, pal: ['fire'] },
  { t: 'Summer', year: '2024', sizeIn: '10 × 10 in', sizeCm: '25 × 25 cm', medium: 'Oil on Canvas', price: '$145', status: 'AVAILABLE', col: 'available', src: null, pal: ['ocean', 'fire'] },
  { t: 'Layers of Happiness', year: '', sizeIn: '41 × 41 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Collector · Exhibition Piece', src: ART.layersOfHappiness, pal: ['cerise', 'fire', 'gold'] },
  { t: 'Goldfields', year: '', sizeIn: '18 × 18 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired during Da Noi Exhibition', src: null },
  { t: 'Hawaii', year: '', sizeIn: '14 × 14 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection · Melbourne', src: null },
  { t: 'Magnolia', year: '', sizeIn: '10 × 10 in', sizeCm: '', medium: 'Resin Art on Wood', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection · Sydney', src: null },
  { t: 'Lava', year: '', sizeIn: '16 × 20 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection · Sydney', src: null },
  { t: 'Galaxy', year: '', sizeIn: '18 × 18 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector · Brisbane', src: ART.galaxy, pal: ['ocean'] },
  { t: 'Abyss', year: '', sizeIn: '16 × 12 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection · Melbourne', src: null },
  { t: 'The Power of Love', year: '', sizeIn: '18 × 36 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection', src: null },
  { t: 'Golden Ocean', year: '', sizeIn: '36 × 72 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector', src: ART.goldenOcean, gallery: [ART.goldenOcean, ART.goldenOceanDetail], pal: ['ocean', 'gold'] },
  { t: 'Golden Garden', year: '', sizeIn: '24 × 36 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector · Melbourne', src: ART.goldenGarden, pal: ['nature', 'gold'] },
  { t: 'Planet', year: '', sizeIn: '14 × 14 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection', src: null },
  { t: 'Marriage', year: '', sizeIn: '18 × 24 in', sizeCm: '', medium: 'Mixed Media', price: null, status: 'ACQUIRED', col: 'acquired', label: 'Private Collection · Melbourne', src: null },

  // ----- NOT FOR SALE / Private archive
  { t: 'WOW', year: '2011', sizeIn: '20 × 30 in', sizeCm: '51 × 76 cm', medium: 'Acrylic on Canvas', price: null, status: 'NOT FOR SALE', col: 'private', label: 'The first painting · 11 / 11 / 2011', src: ART.wow, pal: ['fire'] },
  { t: 'Golden Heart', year: '2019', sizeIn: '12 × 12 in', sizeCm: '30 × 30 cm', medium: 'Mixed Technique', price: null, status: 'NOT FOR SALE', col: 'private', label: "From the Artist's Private Collection", src: ART.goldenHeart, pal: ['gold', 'ocean'] },
];
window.WORKS_CATALOG = WORKS_CATALOG;
