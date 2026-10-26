// Edit the site without code: artworks (title, year, size, medium, price, status, edition copies left) and
// exhibitions are read from two published Google Sheets (CSV). URLs are set in index.html (window.SA_SHEETS).
// If a sheet cannot be read, the site keeps the last good copy (this browser) or the built-in data in the code.
(function () {
  const STATUSES = ['ON SALE', 'SOLD', 'NOT FOR SALE'];
  const CACHE = 'sa_sheet_v1';

  function parseCSV(text) {
    const rows = []; let row = [], cur = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c;
      } else if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; }
      else cur += c;
    }
    if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
    const head = (rows.shift() || []).map((h) => h.trim().toLowerCase());
    return rows.filter((r) => r.some((x) => x.trim() !== '')).map((r) => {
      const o = {}; head.forEach((h, i) => { o[h] = (r[i] || '').trim(); }); return o;
    });
  }

  function fmtPrice(v) {
    const n = parseInt(String(v || '').replace(/[^0-9]/g, ''), 10);
    return n ? '$' + n.toLocaleString('en-US') : null;
  }

  function applyArtworks(rows) {
    if (!rows || !rows.length) return;
    rows.forEach((r) => {
      const w = WORKS_CATALOG.find((x) => x.slug === r.slug);
      if (!w) return;
      if (r.title) w.t = r.title;
      if (r.year) w.year = r.year;
      if (r.size_cm) w.sizeCm = r.size_cm;
      if (r.medium) w.medium = r.medium;
      const st = (r.status || '').toUpperCase();
      if (STATUSES.includes(st)) {
        w.status = st;
        if (st === 'ON SALE') { w.price = fmtPrice(r.price) || w.price; if (w.col === 'acquired' || w.col === 'private') { w.col = 'available'; w.label = undefined; } }
        else { w.price = null; w.col = st === 'SOLD' ? 'acquired' : 'private'; if (st === 'SOLD' && !w.label) w.label = 'Acquired by Private Collector'; }
      }
      if (r.edition_left !== undefined && r.edition_left !== '' && typeof EDITION_LEFT !== 'undefined') {
        const n = parseInt(r.edition_left, 10); if (!isNaN(n)) EDITION_LEFT[w.slug] = n;
      }
    });
  }

  function applyExhibitions(rows) {
    if (!rows || !rows.length) return;
    const list = rows.filter((r) => r.slug && r.title).map((r) => ({
      slug: r.slug, status: r.label || undefined, title: r.title, sub: r.subtitle || undefined,
      dates: r.dates || '', venue: r.venue || '', note: r.note || undefined,
      link: r.link_url ? { label: r.link_label || r.link_url, href: r.link_url } : undefined,
      photos: parseInt(r.photos, 10) || 0, video: r.video || null
    }));
    if (list.length) { EXHIBITIONS.length = 0; list.forEach((e) => EXHIBITIONS.push(e)); }
  }

  function apply(data) { try { applyArtworks(data.artworks); applyExhibitions(data.exhibitions); } catch (e) {} }

  function get(url) {
    if (!url) return Promise.resolve(null);
    return fetch(url, { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error('sheet'); return r.text(); }).then(parseCSV);
  }

  // 1) last good copy, instantly
  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(CACHE) || 'null'); } catch (e) {}
  if (cached) apply(cached);

  // 2) fresh copy from the sheets, then redraw
  const urls = window.SA_SHEETS || {};
  if (urls.artworks || urls.exhibitions) {
    Promise.all([get(urls.artworks).catch(() => null), get(urls.exhibitions).catch(() => null)]).then(([a, e]) => {
      const data = { artworks: a || (cached && cached.artworks) || null, exhibitions: e || (cached && cached.exhibitions) || null };
      if (!a && !e) return;
      apply(data);
      try { localStorage.setItem(CACHE, JSON.stringify(data)); } catch (err) {}
      window.dispatchEvent(new Event('sa-data'));
    });
  }
})();
