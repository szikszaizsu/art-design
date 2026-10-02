export class VisitCounter {
  constructor(state) {
    this.sql = state.storage.sql;
    this.sql.exec('CREATE TABLE IF NOT EXISTS counter (id INTEGER PRIMARY KEY, total INTEGER NOT NULL)');
    this.sql.exec('INSERT OR IGNORE INTO counter (id, total) VALUES (1, 0)');
  }

  async fetch(request) {
    const query = request.method === 'POST'
      ? 'UPDATE counter SET total = total + 1 WHERE id = 1 RETURNING total'
      : 'SELECT total FROM counter WHERE id = 1';
    return Response.json({ count: this.sql.exec(query).one().total });
  }
}

// /tervezo/ link list: one JSON document, edited from the /tervezo/ page in edit mode.
export class LinkStore {
  constructor(state) {
    this.sql = state.storage.sql;
    this.sql.exec('CREATE TABLE IF NOT EXISTS doc (id INTEGER PRIMARY KEY, json TEXT NOT NULL)');
  }

  async fetch(request) {
    if (request.method === 'PUT') {
      const json = await request.text();
      this.sql.exec('INSERT INTO doc (id, json) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET json = excluded.json', json);
      return new Response(null, { status: 204 });
    }
    const row = this.sql.exec('SELECT json FROM doc WHERE id = 1').toArray()[0];
    return new Response(row ? row.json : null, { status: row ? 200 : 404 });
  }
}

const noStore = { 'Cache-Control': 'no-store' };

// Starter list shown until the first save from the /tervezo/ editor.
const TERVEZO_SEED = {
  "categories": [
    {
      "id": "hasznos-linkek",
      "name": "Hasznos linkek",
      "icon": "link",
      "links": [
        {
          "name": "Fontshare",
          "desc": "Ingyenes, nagyon jó minőségű betűk",
          "url": "https://www.fontshare.com/"
        },
        {
          "name": "Free Faces",
          "desc": "Szép, ingyenes betűtípusok gyűjteménye",
          "url": "https://www.freefaces.gallery/"
        },
        {
          "name": "Radix Colors",
          "desc": "Weboldal színpaletta tesztelő",
          "url": "https://www.radix-ui.com/colors/custom"
        },
        {
          "name": "Envato Elements",
          "desc": "Alapanyag mindenhez",
          "url": "https://elements.envato.com/"
        },
        {
          "name": "Coolors",
          "desc": "Színpaletta generátor",
          "url": "https://coolors.co/"
        },
        {
          "name": "Squoosh",
          "desc": "Képtömörítés a böngészőben",
          "url": "https://squoosh.app/"
        }
      ]
    },
    {
      "id": "grafika",
      "name": "Grafika és ikonok",
      "icon": "pen",
      "links": [
        {
          "name": "Minimal Mockups",
          "desc": "Sok jó, ingyenes mockup",
          "url": "https://www.minimalmockups.com/"
        },
        {
          "name": "Tabler Icons",
          "desc": "5600+ vektor ikon",
          "url": "https://tabler.io/icons"
        },
        {
          "name": "Phosphor Icons",
          "desc": "Minőségi vektor ikonok",
          "url": "https://phosphoricons.com/"
        },
        {
          "name": "Lordicon",
          "desc": "Animált ikonkészlet",
          "url": "https://lordicon.com/"
        },
        {
          "name": "Google Fonts Icons",
          "desc": "Material Symbols ikonok",
          "url": "https://fonts.google.com/icons"
        }
      ]
    },
    {
      "id": "ai",
      "name": "AI",
      "icon": "spark",
      "links": [
        {
          "name": "Magnific",
          "desc": "Képnagyítás, nagy felbontás",
          "url": "https://magnific.ai/"
        },
        {
          "name": "ElevenLabs",
          "desc": "Narráció, hang",
          "url": "https://elevenlabs.io/"
        },
        {
          "name": "Claude",
          "desc": "Szöveg, kód, ötletelés",
          "url": "https://claude.ai/"
        }
      ]
    },
    {
      "id": "promptok",
      "name": "Promptok",
      "icon": "note",
      "links": []
    }
  ]
};

async function sha256(text) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
}

// Constant-time compare of the Bearer token with the TERVEZO_JELSZO secret.
async function isAdmin(request, env) {
  if (!env.TERVEZO_JELSZO) return false;
  const token = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  const [a, b] = await Promise.all([sha256(token), sha256(env.TERVEZO_JELSZO)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

function cleanText(value, max) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

// Validates and normalises an uploaded link document; returns null when it is malformed.
function cleanDoc(doc) {
  if (!doc || !Array.isArray(doc.categories) || doc.categories.length > 50) return null;
  const categories = [];
  for (const cat of doc.categories) {
    const name = cleanText(cat?.name, 60);
    const id = cleanText(cat?.id, 60).toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!name || !id || !Array.isArray(cat.links) || cat.links.length > 500) return null;
    const links = [];
    for (const link of cat.links) {
      let url;
      try { url = new URL(link?.url); } catch { return null; }
      if (!['http:', 'https:'].includes(url.protocol)) return null;
      links.push({ name: cleanText(link.name, 80) || url.hostname, desc: cleanText(link.desc, 160), url: url.href });
    }
    categories.push({ id, name, icon: cleanText(cat.icon, 20) || 'link', links });
  }
  return { categories };
}

function decodeEntities(text) {
  return text.replace(/&(#x?[0-9a-f]+|amp|lt|gt|quot|apos);/gi, (m, e) => {
    const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[e.toLowerCase()];
    if (named) return named;
    const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
    return Number.isFinite(code) ? String.fromCodePoint(code) : m;
  });
}

// Reads the site name and description of a page, for the admin "Kitöltés" button.
async function pageMeta(target) {
  const response = await fetch(target, { headers: { 'User-Agent': 'Mozilla/5.0 (szikszaizsu.com tervezo)', Accept: 'text/html' }, redirect: 'follow' });
  if (!response.ok) return { title: '', desc: '' };
  const html = (await response.text()).slice(0, 300000);
  const pick = (re) => { const m = html.match(re); return m ? decodeEntities(m[1]).replace(/\s+/g, ' ').trim() : ''; };
  const title = pick(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']*)/i)
    || pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)/i)
    || pick(/<title[^>]*>([^<]*)/i);
  const desc = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)
    || pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)/i);
  // Bot-check and error pages have useless titles; let the editor fall back to the domain name.
  if (/not a bot|just a moment|attention required|access denied|captcha|verify you are human|forbidden/i.test(title)) return { title: '', desc: '' };
  return { title: title.slice(0, 80), desc: desc.slice(0, 160) };
}

async function handleTervezo(request, env, url) {
  const store = env.LINKS.get(env.LINKS.idFromName('tervezo'));
  const route = url.pathname.slice('/tervezo/api/'.length);

  if (!['GET', 'POST', 'PUT'].includes(request.method)) return new Response(null, { status: 405 });
  if (request.method !== 'GET' && request.headers.get('Origin') !== url.origin) return new Response(null, { status: 403 });
  if (!env.TERVEZO_JELSZO) return Response.json({ error: 'Még nincs beállítva a jelszó (TERVEZO_JELSZO).' }, { status: 503, headers: noStore });
  if (!(await isAdmin(request, env))) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return Response.json({ error: 'Hibás jelszó.' }, { status: 401, headers: noStore });
  }

  if (route === 'login' && request.method === 'POST') return new Response(null, { status: 204 });

  if (route === 'links' && request.method === 'GET') {
    const saved = await store.fetch('https://store/');
    const body = saved.ok ? saved.body : JSON.stringify(TERVEZO_SEED);
    return new Response(body, { headers: { 'Content-Type': 'application/json', ...noStore } });
  }

  if (route === 'links' && request.method === 'PUT') {
    let doc;
    try { doc = cleanDoc(await request.json()); } catch { doc = null; }
    if (!doc) return Response.json({ error: 'Hibás adat.' }, { status: 400, headers: noStore });
    await store.fetch('https://store/', { method: 'PUT', body: JSON.stringify(doc) });
    return Response.json(doc, { headers: noStore });
  }

  if (route === 'meta' && request.method === 'POST') {
    try {
      const { url: target } = await request.json();
      const parsed = new URL(target);
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('bad protocol');
      return Response.json(await pageMeta(parsed.href), { headers: noStore });
    } catch {
      return Response.json({ title: '', desc: '' }, { headers: noStore });
    }
  }

  return new Response(null, { status: 404 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/tervezo/api/')) return handleTervezo(request, env, url);
    if (url.pathname !== '/api/visits') return env.ASSETS.fetch(request);
    if (!['GET', 'POST'].includes(request.method)) return new Response(null, { status: 405 });
    if (request.method === 'POST' && (request.headers.get('Origin') !== url.origin || request.headers.get('X-Visit-Counter') !== '1')) {
      return new Response(null, { status: 403 });
    }
    const counted = /(?:^|;\s*)portfolio_visit=1(?:;|$)/.test(request.headers.get('Cookie') || '');
    const increment = request.method === 'POST' && !counted;
    try {
      const counter = env.VISITS.get(env.VISITS.idFromName('portfolio-total'));
      const response = await counter.fetch(new Request(request.url, { method: increment ? 'POST' : 'GET' }));
      const headers = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      if (request.method === 'POST') headers.set('Set-Cookie', 'portfolio_visit=1; Path=/; Max-Age=1800; HttpOnly; Secure; SameSite=Lax');
      return new Response(response.body, { headers });
    } catch {
      return Response.json({ error: 'Counter unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    }
  }
};
