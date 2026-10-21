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
  abyssalCreatures: 'assets/artworks/abyssal-creatures.jpg',
  butterfly: 'assets/artworks/butterfly.jpg',
  carnivalOfVenice: 'assets/artworks/carnival-of-venice.jpg',
  carnival: 'assets/artworks/carnival.jpg',
  confetti: 'assets/artworks/confetti-and-fallen-stars.jpg',
  goldDroplets: 'assets/artworks/gold-droplets.jpg',
  goldenForest: 'assets/artworks/golden-forest.jpg',
  humor: 'assets/artworks/humor.jpg',
  joy: 'assets/artworks/joy.jpg',
  laughter: 'assets/artworks/laughter.jpg',
  octopus: 'assets/artworks/octopus.jpg',
  silverSea: 'assets/artworks/silver-sea.jpg',
  turquoiseBeach: 'assets/artworks/turquoise-beach.jpg',
  wow: 'assets/artworks/wow.jpg',
  goldenHeart: 'assets/artworks/golden-heart.jpg',
  smile: 'assets/artworks/smile.jpg',
  blueLotus: 'assets/artworks/blue-lotus.jpg',
  harmonyOfNature: 'assets/artworks/harmony-of-nature.jpg',
  passionAndFire: 'assets/artworks/passion-and-fire.jpg',
  goldenGarden: 'assets/artworks/golden-garden.jpg',
  layersOfHappiness: 'assets/artworks/layers-of-happiness.jpg',
  goldenOcean: 'assets/artworks/golden-ocean.jpg',
  goldenPath: 'assets/artworks/golden-path.jpg',
  galaxy: 'assets/artworks/galaxy.jpg',
  autumn: 'assets/artworks/autumn.jpg',
  summer: 'assets/artworks/summer.jpg',
  waterSplash: 'assets/artworks/splash.jpg',
  desertStorm: 'assets/artworks/desert-storm.jpg',
  abyss: 'assets/artworks/abyss.jpg',
  goldfields: 'assets/artworks/golden-fields.jpg',
  hawaii: 'assets/artworks/hawaii.jpg',
  lava: 'assets/artworks/lava.jpg',
  magnolia: 'assets/artworks/magnolia.jpg',
  planet: 'assets/artworks/planet.jpg',
  marriage: 'assets/artworks/the-marriage.jpg',
  aboriginalSunset: 'assets/artworks/aboriginal-sunset.jpg',
  greenOrchid: 'assets/artworks/green-orchid.jpg',
  echoesInRed: 'assets/artworks/echoes-in-red.jpg',
  lightsAndShadows: 'assets/artworks/lights-and-shadows.jpg',
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
//   t: title · year · sizeCm · medium · price (AUD, null if not for sale)
//   status: 'ON SALE' | 'SOLD' | 'NOT FOR SALE'
//   col: 'new'|'available'|'acquired'|'private'  (gallery collection)
//   label: prestige / context line (acquired & private)  · src: photo or null
//   pal: palette tags for the "shop by palette" filter
// ---------------------------------------------------------------------------
const WORKS_CATALOG = [
  { t: 'Smile', year: '2025', sizeCm: '92 × 76 cm', medium: 'Mixed Media on Canvas', price: '$1,250', status: 'ON SALE', col: 'new', src: ART.smile, pal: ['fire', 'nature'] },
  { t: 'Passion and Fire', year: '2026', sizeCm: '180 × 120 cm', medium: 'Mixed Media on Canvas', price: '$2,360', status: 'ON SALE', col: 'new', src: ART.passionAndFire, pal: ['fire', 'cerise'] },
  { t: 'Golden Path', year: '2025', sizeCm: '182.8 × 91.4 cm', medium: 'Mixed Media on Canvas', price: '$2,100', status: 'ON SALE', col: 'new', src: ART.goldenPath, pal: ['gold', 'nature'] },
  { t: 'Echoes in Red', year: '2026', sizeCm: '90 × 90 cm', medium: 'Mixed Media on Canvas', price: '$1,200', status: 'ON SALE', col: 'new', src: ART.echoesInRed, pal: ['fire', 'cerise'] },
  { t: 'Aboriginal Sunset', year: '2026', sizeCm: '30.5 × 30.5 cm', medium: 'Mixed Media on Canvas', price: '$520', status: 'ON SALE', col: 'new', src: ART.aboriginalSunset, pal: ['fire', 'gold'] },
  { t: 'Lights and Shadows', year: '2026', sizeCm: '91 × 38 cm', medium: 'Mixed Media on Canvas', price: '$520', status: 'ON SALE', col: 'new', src: ART.lightsAndShadows, pal: ['ocean', 'gold'] },
  { t: 'Green Orchid', year: '2025', sizeCm: '40 × 40 cm', medium: 'Resin on Wood (Print 1/10)', price: '$520', status: 'ON SALE', col: 'new', src: ART.greenOrchid, pal: ['nature'] },
  { t: 'Blue Lotus', year: '2025', sizeCm: '40 × 40 cm', medium: 'Resin on Wood (Print 1/10)', price: '$520', status: 'ON SALE', col: 'new', src: ART.blueLotus, pal: ['ocean', 'gold'] },
  { t: 'Harmony of Nature', year: '2025', sizeCm: '35 × 35 cm', medium: 'Mixed Media on Canvas', price: '$590', status: 'ON SALE', col: 'new', src: ART.harmonyOfNature, pal: ['nature', 'gold'] },
  { t: 'Gold Droplets', year: '2019', sizeCm: '45 × 45 cm', medium: 'Mixed Media on Canvas', price: '$620', status: 'ON SALE', col: 'available', src: ART.goldDroplets, pal: ['gold', 'cerise'] },
  { t: 'Turquoise Beach', year: '2021', sizeCm: '30.5 × 30.5 cm', medium: 'Mixed Media · Resin on Wood', price: '$630', status: 'ON SALE', col: 'available', src: ART.turquoiseBeach, pal: ['ocean', 'nature'] },
  { t: 'Butterfly', year: '2024', sizeCm: '30 × 30 cm', medium: 'Mixed Media on Canvas', price: '$560', status: 'ON SALE', col: 'available', src: ART.butterfly, pal: ['cerise'] },
  { t: 'Autumn', year: '2024', sizeCm: '25 × 25 cm', medium: 'Oil on Canvas', price: '$470', status: 'ON SALE', col: 'available', src: ART.autumn, pal: ['fire'] },
  { t: 'Summer', year: '2024', sizeCm: '25 × 25 cm', medium: 'Oil on Canvas', price: '$470', status: 'ON SALE', col: 'available', src: ART.summer, pal: ['ocean', 'fire'] },
  { t: 'Galaxy', year: '2019', sizeCm: '46 × 46 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector · Brisbane', src: ART.galaxy, pal: ['ocean'] },
  { t: 'Abyss', year: '2019', sizeCm: '40.5 × 30.5 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Private Collection · Melbourne', src: ART.abyss },
  { t: 'Abyssal Creatures', year: '2024', sizeCm: '40 × 30 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Private Collection · Melbourne', src: ART.abyssalCreatures, pal: ['ocean'] },
  { t: 'Carnival of Venice', year: '2024', sizeCm: '25 × 25 cm', medium: 'Acrylic on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Private Collection', src: ART.carnivalOfVenice, pal: ['gold', 'fire'] },
  { t: 'Carnival', year: '2019', sizeCm: '30.5 × 30.5 cm', medium: 'Acrylic on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector', src: ART.carnival, pal: ['nature', 'ocean'] },
  { t: 'Confetti and Falling Stars', year: '2024', sizeCm: '91 × 91 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired during Solo Exhibition', src: ART.confetti, pal: ['cerise', 'fire'] },
  { t: 'Desert Storm', year: '2019', sizeCm: '50.5 × 40.5 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector', src: ART.desertStorm, pal: ['nature'] },
  { t: 'Golden Fields', year: '2019', sizeCm: '46 × 46 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector', src: ART.goldfields },
  { t: 'Golden Forest', year: '2024', sizeCm: '91.4 × 45.7 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Private Collection · Melbourne', src: ART.goldenForest, pal: ['gold', 'nature'] },
  { t: 'Golden Garden', year: '2024', sizeCm: '91 × 61 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector · Melbourne', src: ART.goldenGarden, pal: ['nature', 'gold'] },
  { t: 'Golden Ocean', year: '2024', sizeCm: '182.8 × 91.4 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector', src: ART.goldenOcean, pal: ['ocean', 'gold'] },
  { t: 'Hawaii', year: '2019', sizeCm: '35 × 35 cm', medium: 'Acrylic on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Private Collection · Melbourne', src: ART.hawaii },
  { t: 'Humor', year: '2024', sizeCm: '15 × 15 cm', medium: 'Acrylic on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector', src: ART.humor },
  { t: 'Joy', year: '2024', sizeCm: '15 × 15 cm', medium: 'Acrylic on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Private Collection · Trilogy of Fun', src: ART.joy, pal: ['fire'] },
  { t: 'Laughter', year: '2024', sizeCm: '15 × 15 cm', medium: 'Acrylic on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Private Collection · Trilogy of Fun', src: ART.laughter, pal: ['fire'] },
  { t: 'Lava', year: '2019', sizeCm: '50.5 × 40.5 cm', medium: 'Acrylic on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Private Collection · Sydney', src: ART.lava },
  { t: 'Layers of Happiness', year: '2024', sizeCm: '100 × 100 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Collector · Exhibition Piece', src: ART.layersOfHappiness, pal: ['cerise', 'fire', 'gold'] },
  { t: 'Magnolia', year: '2019', sizeCm: '35.5 × 35.5 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Private Collection · Sydney', src: ART.magnolia },
  { t: 'Octopus', year: '2024', sizeCm: '30 × 30 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Private Collection · Melbourne', src: ART.octopus, pal: ['ocean'] },
  { t: 'Planet', year: '2019', sizeCm: '35.5 × 35.5 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Private Collection', src: ART.planet },
  { t: 'Silver Sea', year: '2019', sizeCm: '46 × 46 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector', src: ART.silverSea, pal: ['ocean'] },
  { t: 'Splash', year: '2019', sizeCm: '35.5 × 35.5 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector', src: ART.waterSplash },
  { t: 'The Marriage', year: '2019', sizeCm: '50.5 × 40.5 cm', medium: 'Mixed Media on Canvas', price: null, status: 'SOLD', col: 'acquired', label: 'Acquired by Private Collector', src: ART.marriage },
  { t: 'WOW', year: '2011', sizeCm: '76 × 51 cm', medium: 'Mixed Media on Canvas', price: null, status: 'NOT FOR SALE', col: 'private', label: 'The first painting · 11 / 11 / 2011', src: ART.wow, pal: ['fire'] },
  { t: 'Golden Heart', year: '2019', sizeCm: '30 × 30 cm', medium: 'Mixed Media on Canvas', price: null, status: 'NOT FOR SALE', col: 'private', label: "From the Artist's Private Collection", src: ART.goldenHeart, pal: ['gold', 'ocean'] },
];
window.WORKS_CATALOG = WORKS_CATALOG;
