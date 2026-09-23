# Szikszai Zsu — Art & Design

Önálló, reszponzív portfólió weboldal tiszta HTML, CSS és JavaScript
használatával. Nem igényel keretrendszert vagy build folyamatot.

- **Élő oldal:** https://art-design.szikszaizsu.workers.dev/
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
