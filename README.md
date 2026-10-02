# Szikszai Zsu — Art & Design

Önálló, reszponzív portfólió weboldal tiszta HTML, CSS és JavaScript
használatával. Nem igényel keretrendszert vagy build folyamatot.

- **Élő oldal:** https://szikszaizsu.com/ (saját domain; a workers.dev cím már nem él)
- **Repository:** https://github.com/szikszaizsu/art-design
- **Nyelvek:** magyar (alapértelmezett), angol (`?lang=en`), román (`?lang=ro`)
- **Megjelenés:** lásd a `DESIGN.md` fájlt (színek, betűk, komponensek, szabályok)

## Telepítés (Cloudflare Workers)

Az oldal Cloudflare **Workers**-en fut, a beállítás a `wrangler.jsonc` fájlban van
(`"name": "art-design"`). A Cloudflare a GitHub-repositoryhoz van kötve:
a `main` ágra küldött (push) változások kb. 30–60 másodperc alatt
automatikusan kikerülnek az élő oldalra.

- A Worker neve a Cloudflare-en és a `wrangler.jsonc`-ban mindig egyezzen
  (`art-design`), különben a következő telepítés új Workert hozna létre.
- A `worker.mjs` szolgálja ki a fájlokat és a látogatásszámlálót
  (`/api/visits`, Durable Object: `VisitCounter`).
- Nem létező címen a `public/404.html` jelenik meg
  (`"not_found_handling": "404-page"`).

## Felépítés

- `public/index.html` – kezdőlap
- `public/digitalis-munkak/`, `public/hagyomanyos-munkak/` – kategóriaoldalak
- `public/art-work/*/index.html` – munkaoldalak (gyöngyszövés, tojásdíszítés,
  nemezelés, közösségi média, UX/UI)
- `public/art-work/grafika-arculat/` – „Grafika és arculat” kategória: 4 logó-kártya (csak a logó a márka sötét színén + márkaszínű nyíl), mindegyik a saját egyoldalas logó-bemutatójára visz:
  - `tihna-dental/`, `alinia/`, `dentaltop/`, `livada/` – önálló HTML oldalak (képek data URI-ként benne), `noindex`
  - kártyaképek: `img/<márka>-logo.webp` (1200×750); a kártyák CSS-e a lap `<head>`-jében van (`.work-card`, `.work-go`)
  - forrás és generátor: privát `droot-demo-sites` repó, `docs/` mappa (`gen.py` + `tpl.html`, a Tihna kézzel írt: `tihna-logo-bemutato.html`)
  - a felhasználó NEM kér ide stílusos mockup-borítókat vagy demóra mutató linkeket, csak a fenti logó-kártyákat
  - kategória-borító (főoldal + `/digitalis-munkak/`): `assets/grafika-mozaik.webp` (1024×1024, a 4 logó elforgatott mozaikja, a webdesign-mozaik párja)
- `public/weboldalak/` – belső demó-gyűjtőoldal (kártyák: `img/demo-N.webp`, RO/HU/EN linkek); új demónál ide is kell egy kártya
- `public/demo-site-N/` – demó weboldalak (RO alap, `hu/`, `en/`)
  - `demo-site-1` Alinia (fogszabályozás), `demo-site-2` DentalTop (férfiaknak), `demo-site-3` Tihna Dental (félelem nélkül), `demo-site-4` Livada Dental (családi fogászat, mindoor.framer.website alapján)
  - A demók forrása (build.py, képek, AGENTS.md) a privát `github.com/szikszaizsu/droot-demo-sites` repóban van; ide csak a kész `site/` mappa kerül (`tools/deploy.sh`), a /weboldalak/ kártyát kézzel kell hozzáadni
- `public/tervezo/` – „Tervező” privát linkgyűjtő (fehér, szürke pontrácsos háttér; belépőkártya a fodorvincent.com/weboldalak/ mintájára), `noindex`; a főoldalról szándékosan NEM vezet rá link
  - jelszó: Cloudflare secret `TERVEZO_JELSZO` (Workers → art-design → Settings → Variables and Secrets); a böngésző localStorage-ben tartja (`tervezo-jelszo`), „Kilépés” törli
  - adatok: `LinkStore` Durable Object (`worker.mjs`, migráció v2), egy JSON dokumentum; amíg nincs mentés, a `TERVEZO_SEED` kezdőlista látszik
  - API (`/tervezo/api/*`, mind jelszavas): `GET links`, `PUT links`, `POST login`, `POST meta` (URL → név + leírás a „Kitöltés” gombhoz)
  - háttér: interaktív pontrács canvas (`.dots`, fodorvincent.com/weboldalak/admin/ mintájára) – az egér körül a pontok kitérnek és szivárványszínben felvillannak, utána kb. 1 mp alatt elhalványulnak
  - jobb felső sarok: sötét/világos téma váltó (`tervezo-tema` a localStorage-ben, alap: világos; sötét = fodorvincent színek)
  - szerkesztés az oldalon: „Szerkesztés” gomb → új link / kategória, átnevezés, ikon (`tervezo/icons.js`), sorrend, törlés
  - „Importálás” gomb: JSON fájl (`{ categories: [{ id, name, icon, links: [{ name, desc, url }] }] }`) összefésülése – azonos id/nevű kategóriába tölt, kategórián belül URL alapján nem duplikál
  - helyi teszt: a `wrangler dev` Windowson nem indítja el a Durable Objecteket, ezért egy Node-os próbaszerver futtatja a `worker.mjs`-t memóriabeli tárolóval
- `public/adatvedelem/` – adatvédelmi tájékoztató
- `public/404.html` – hibaoldal
- `public/styles.css` – megjelenés (alapszabályok + „Apple-style layer”)
- `public/script.js` – menü, animációk, galéria-nagyítás és lapozás
- `public/language.js`, `public/romanian.js` – fordítások (HU → EN, EN → RO)
- `public/visits.js` – látogatásszámláló
- `public/assets/` – képek (WebP), betűtípusok, ikon, megosztási kép
- `public/sitemap.xml`, `public/robots.txt` – keresőknek

## Módosítás

- **Szöveg:** a magyar szöveget a HTML-ben kell átírni, és ugyanazt a
  kulcsot frissíteni a `language.js`-ben (angol) és a `romanian.js`-ben (román).
- **CSS/JS módosítás után** minden HTML-ben át kell írni a `?v=` verziószámot
  (pl. `styles.css?v=...`), hogy a látogatók ne a régi fájlt lássák.
- **Új kép:** WebP formátumban, legfeljebb 1400 px-es hosszabb oldallal.
- **Új oldal:** egy meglévő oldal másolatából induljon (fejléc, lábléc,
  fordítás, megosztási és nyelvi címkék így együtt jönnek), és kerüljön be a
  `sitemap.xml`-be.

## Indexelés

Jelenleg az **egész oldal noindex** (`public/_headers`, `/*` szabály). Ha az oldalt
indexelni kell, azt a blokkot kell törölni, és a `robots.txt` / `sitemap.xml`
címeit `https://szikszaizsu.com/`-ra átírni. A `/demo-site-*` és `/weboldalak/*`
mindig noindex marad.
