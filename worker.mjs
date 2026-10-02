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
      "id": "weboldal-otlet",
      "group": "Ötletek",
      "name": "Weboldalhoz keresek ötletet",
      "icon": "globe",
      "links": [
        {
          "name": "Awwwards",
          "desc": "Díjnyertes weboldalak, trendek",
          "url": "https://www.awwwards.com/"
        },
        {
          "name": "Godly",
          "desc": "Válogatott, nagyon jó webdizájnok",
          "url": "https://godly.website/"
        },
        {
          "name": "Land-book",
          "desc": "Landing page galéria",
          "url": "https://land-book.com/"
        },
        {
          "name": "Saaspo",
          "desc": "SaaS weboldal inspiráció",
          "url": "https://saaspo.com/"
        },
        {
          "name": "Craftwork Curated",
          "desc": "Válogatott weboldalak",
          "url": "https://craftwork.design/curated/websites/"
        },
        {
          "name": "Mobbin",
          "desc": "Mobil- és webapp UI minták",
          "url": "https://mobbin.com/"
        },
        {
          "name": "CTA.gallery",
          "desc": "Gomb- és CTA-blokk ötletek",
          "url": "https://www.cta.gallery/"
        },
        {
          "name": "Behance – Ivory Clinic",
          "desc": "Fogászati landing page dizájn",
          "url": "https://www.behance.net/gallery/237704709/Dental-Landing-Page-Web-Site-Design-Ivory-Clinic"
        },
        {
          "name": "Pinterest – skincare weboldalak",
          "desc": "Keresés: skin care website",
          "url": "https://hu.pinterest.com/search/pins/?q=skin%20care%20website"
        },
        {
          "name": "Pinterest – UI dizájn",
          "desc": "UI minta",
          "url": "https://hu.pinterest.com/pin/3307399722243853/"
        },
        {
          "name": "Pinterest – termékoldal",
          "desc": "Hidratáló gél termékoldal",
          "url": "https://hu.pinterest.com/pin/143974519331822491/"
        },
        {
          "name": "awesome-design-md",
          "desc": "DESIGN.md gyűjtemény ismert oldalakról",
          "url": "https://github.com/VoltAgent/awesome-design-md"
        }
      ]
    },
    {
      "id": "hirdetes-otlet",
      "group": "Ötletek",
      "name": "Hirdetéshez keresek ötletet",
      "icon": "megaphone",
      "links": [
        {
          "name": "Pinterest – Serum tábla",
          "desc": "Vince szérum táblája",
          "url": "https://hu.pinterest.com/fodorvince/serum/"
        },
        {
          "name": "Pinterest – szemkörnyékápoló",
          "desc": "Szérum hirdetés ötlet",
          "url": "https://hu.pinterest.com/pin/1096485840553560375/"
        },
        {
          "name": "Pinterest – GLOSSYBOX",
          "desc": "Szemkörnyékápoló termékfotó",
          "url": "https://hu.pinterest.com/pin/764767580484354830/"
        },
        {
          "name": "Pinterest – olajcsepp háttér",
          "desc": "Csepegő olaj, átlátszó háttér",
          "url": "https://hu.pinterest.com/pin/572449802649225925/"
        },
        {
          "name": "Pinterest – tapéta 2025",
          "desc": "Háttér ötlet",
          "url": "https://hu.pinterest.com/pin/1149262398668406809/"
        }
      ]
    },
    {
      "id": "logo-arculat",
      "group": "Ötletek",
      "name": "Logót, arculatot tervezek",
      "icon": "pen",
      "links": [
        {
          "name": "Dribbble – logók",
          "desc": "Logó inspiráció",
          "url": "https://dribbble.com/search/logo"
        },
        {
          "name": "Rebrand Gallery",
          "desc": "Arculatváltások, vizuális identitás",
          "url": "https://www.rebrand.gallery/"
        }
      ]
    },
    {
      "id": "sablon-mockup",
      "group": "Ötletek",
      "name": "Sablonból, mockupból indulok",
      "icon": "box",
      "links": [
        {
          "name": "Figma Community – mobil appok",
          "desc": "14 000+ ingyenes app sablon",
          "url": "https://www.figma.com/community/mobile-apps?resource_type=files&editor_type=figma"
        },
        {
          "name": "Webflow Marketplace",
          "desc": "Webflow sablonok",
          "url": "https://webflow.com/marketplace"
        },
        {
          "name": "Renance",
          "desc": "SaaS sablon Framerre",
          "url": "https://renance.framer.website/"
        },
        {
          "name": "Divi – webshop",
          "desc": "Webshop építés Divi témával",
          "url": "https://www.elegantthemes.com/online-store-owners/"
        },
        {
          "name": "Minimal Mockups",
          "desc": "Sok jó, ingyenes mockup",
          "url": "https://www.minimalmockups.com/"
        }
      ]
    },
    {
      "id": "foto",
      "group": "Alapanyagok",
      "name": "Fotót keresek",
      "icon": "image",
      "links": [
        {
          "name": "Lummi – női bőr",
          "desc": "Ingyenes HD AI-fotók",
          "url": "https://www.lummi.ai/s/photo/woman-skin"
        },
        {
          "name": "Vecteezy – ráncos bőr",
          "desc": "Ingyenes stock fotók",
          "url": "https://www.vecteezy.com/free-photos/wrinkled-skin"
        },
        {
          "name": "StockCake",
          "desc": "Ingyenes stock képek",
          "url": "https://stockcake.com/"
        },
        {
          "name": "Envato Elements",
          "desc": "Alapanyag mindenhez",
          "url": "https://elements.envato.com/"
        }
      ]
    },
    {
      "id": "betu",
      "group": "Alapanyagok",
      "name": "Betűt választok",
      "icon": "type",
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
        }
      ]
    },
    {
      "id": "szin",
      "group": "Alapanyagok",
      "name": "Színt választok",
      "icon": "color",
      "links": [
        {
          "name": "Coolors",
          "desc": "Színpaletta generátor",
          "url": "https://coolors.co/"
        },
        {
          "name": "Radix Colors",
          "desc": "Weboldal színpaletta tesztelő",
          "url": "https://www.radix-ui.com/colors/custom"
        }
      ]
    },
    {
      "id": "ikon",
      "group": "Alapanyagok",
      "name": "Ikont keresek",
      "icon": "grid",
      "links": [
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
      "group": "Eszközök",
      "name": "AI-jal dolgozom",
      "icon": "spark",
      "links": [
        {
          "name": "Claude",
          "desc": "Szöveg, kód, ötletelés",
          "url": "https://claude.ai/"
        },
        {
          "name": "Magnific",
          "desc": "Képnagyítás, nagy felbontás",
          "url": "https://magnific.ai/"
        },
        {
          "name": "ElevenLabs",
          "desc": "Narráció, hang",
          "url": "https://elevenlabs.io/"
        }
      ]
    },
    {
      "id": "promptok",
      "group": "Eszközök",
      "name": "Promptot írok",
      "icon": "note",
      "links": []
    },
    {
      "id": "optimalizalas",
      "group": "Eszközök",
      "name": "Képet, oldalt optimalizálok",
      "icon": "gauge",
      "links": [
        {
          "name": "Squoosh",
          "desc": "Képtömörítés a böngészőben",
          "url": "https://squoosh.app/"
        },
        {
          "name": "GTmetrix",
          "desc": "Weboldal teljesítmény mérés",
          "url": "https://gtmetrix.com/"
        },
        {
          "name": "GTmetrix – Westhills",
          "desc": "Teljesítmény jelentés",
          "url": "https://gtmetrix.com/reports/westhills-site.fodorvincent.workers.dev/BqZkY9rU/"
        }
      ]
    },
    {
      "id": "tanulas",
      "group": "Eszközök",
      "name": "Tanulok",
      "icon": "book",
      "links": [
        {
          "name": "Kole Jain (YouTube)",
          "desc": "UI/UX dizájn videók",
          "url": "https://www.youtube.com/@KoleJain"
        },
        {
          "name": "UX/UI tippek webshopra",
          "desc": "3,5× konverzió egy redesignnal (videó)",
          "url": "https://www.youtube.com/watch?v=oYskl2ZBoBc"
        }
      ]
    },
    {
      "id": "weboldalam",
      "group": "Munka",
      "name": "A weboldalamat kezelem",
      "icon": "globe",
      "links": [
        {
          "name": "szikszaizsu.com",
          "desc": "Saját portfólió",
          "url": "https://szikszaizsu.com/"
        },
        {
          "name": "Weboldal demók – szikszaizsu.com",
          "desc": "Saját demó gyűjtőoldal",
          "url": "https://szikszaizsu.com/weboldalak/"
        },
        {
          "name": "Weboldal demók – fodorvincent.com",
          "desc": "Vince demó oldala",
          "url": "https://fodorvincent.com/weboldalak/"
        },
        {
          "name": "Cloudflare – Workers & Pages",
          "desc": "A weboldal tárhelye",
          "url": "https://dash.cloudflare.com/f20730e3f3c771f2675f676f79970a09/workers-and-pages"
        },
        {
          "name": "Cloudflare – Workers for Platforms",
          "desc": "Cloudflare fiók",
          "url": "https://dash.cloudflare.com/f20730e3f3c771f2675f676f79970a09/workers-for-platforms/namespaces"
        },
        {
          "name": "GitHub – art-design",
          "desc": "A weboldal kódja",
          "url": "https://github.com/szikszaizsu/art-design"
        }
      ]
    },
    {
      "id": "munkafajlok",
      "group": "Munka",
      "name": "Munkafájlt nyitok meg",
      "icon": "folder",
      "links": [
        {
          "name": "dROOT képi promptok",
          "desc": "Kész dizájnok és képi promptok",
          "url": "https://king.advertiser.ro/tervezunk/droot-kepi-promptok.html"
        },
        {
          "name": "Craft – saját dokumentumok",
          "desc": "Minden jegyzet",
          "url": "https://docs.craft.do/s/Szikszaizsu--23134869-46d8-52d4-b394-e5363e601f7d/all"
        },
        {
          "name": "Craft – Vince küldte",
          "desc": "Vince anyagai",
          "url": "https://docs.craft.do/editor/d/e4bac22a-5647-4fc6-3a70-8c688a4410f7/2136D592-82D0-495E-8D5E-6371255E5BC9?s=WeN"
        },
        {
          "name": "Craft – Untitled Page",
          "desc": "Vince jegyzete",
          "url": "https://docs.craft.do/editor/d/e4bac22a-5647-4fc6-3a70-8c688a4410f7/339D9CDE-F715-4DCA-818A-F285050CBF73?s=Ttg"
        },
        {
          "name": "Retinol firming oil – landing szöveg",
          "desc": "Google Dokumentum",
          "url": "https://docs.google.com/document/d/1AR6wTQKq_Femo7k9zRxRo_M12X2yf7gMPH9uNsa0RZ4/edit"
        },
        {
          "name": "Dropbox – LOGO",
          "desc": "Logó fájlok",
          "url": "https://www.dropbox.com/scl/fo/qyfo5m8vx9dazwz2liea7/AMMeUmEjmRZMe9KWNrdmRjI?rlkey=q4jmmtmp05s1tfejanwhm32xh"
        },
        {
          "name": "Dropbox – WEBSITE",
          "desc": "Weboldal anyagok",
          "url": "https://www.dropbox.com/scl/fo/py6narhvipj4xe6asqyu7/AC73M0OziTS0LKgWVl9A7yA?rlkey=z5ihtygduuuasqmfna6osw6pl"
        },
        {
          "name": "Dropbox – RAW",
          "desc": "Nyers fotók",
          "url": "https://www.dropbox.com/scl/fo/22addb8zxa8o163asum3x/APqKDq96JzLncmgImpN1nN4?rlkey=di2ouae0chgc2h8v71qir9ihz"
        },
        {
          "name": "Dropbox – Exosome",
          "desc": "LifeCell Exosome anyagok",
          "url": "https://www.dropbox.com/scl/fo/ziedq9o3730n8qsaq80xq/ADb9fln_XZ_DvVOreczwaz4/Exosome?dl=0&rlkey=1plllm1yafk1sn"
        }
      ]
    },
    {
      "id": "ugyfelek",
      "group": "Munka",
      "name": "Ügyfél oldalát nézem",
      "icon": "megaphone",
      "links": [
        {
          "name": "LifeCell",
          "desc": "Hivatalos oldal",
          "url": "https://www.lifecellskin.com/"
        },
        {
          "name": "LifeCell – Shop",
          "desc": "Termékek",
          "url": "https://www.lifecellskin.com/shop/"
        },
        {
          "name": "LifeCell – Exosomes",
          "desc": "Exosome termékoldal",
          "url": "https://blog.lifecellskin.com/skin/exosomes"
        },
        {
          "name": "LifeCell – Anti Aging",
          "desc": "Anti-aging tabletta oldal",
          "url": "https://blog.lifecellskin.com/otherproduct/ag/ag-pill-woman"
        }
      ]
    },
    {
      "id": "sajat",
      "group": "Munka",
      "name": "Saját dolgaim",
      "icon": "heart",
      "links": [
        {
          "name": "Eseménynaptár 2026/27",
          "desc": "Claude artifact",
          "url": "https://claude.ai/artifact/XD5EzxKvjt4AmvhEy1tCEq"
        },
        {
          "name": "Komatál beosztás 2026/27",
          "desc": "Claude artifact",
          "url": "https://claude.ai/artifact/5upM1MXxdDUk6xJ9MNjSEf"
        },
        {
          "name": "Komatál heti beosztás – táblázat",
          "desc": "Google Táblázat",
          "url": "https://docs.google.com/spreadsheets/d/1W_YYDjf1mQAwSNM6Qn-gnnC162ZXr65woeUUxV-tufg/edit"
        },
        {
          "name": "Vincent-Mini",
          "desc": "Vince médiaszervere",
          "url": "http://fodorvincent.go.ro:8096/web/#/home"
        }
      ]
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
    const group = cleanText(cat.group, 40);
    categories.push({ id, name, icon: cleanText(cat.icon, 20) || 'link', ...(group && { group }), links });
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
