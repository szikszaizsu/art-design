# SZIKSZAIZSU portfólió

Önálló, reszponzív portfólió weboldal tiszta HTML, CSS és JavaScript
használatával. Nem igényel Framert, keretrendszert vagy build folyamatot.

## Cloudflare Pages beállítás

1. A GitHubon hozz létre egy új, nyilvános repositoryt.
2. Töltsd fel a repository gyökerébe ennek a mappának a tartalmát.
3. A Cloudflare vezérlőpultján nyisd meg a **Workers & Pages** részt.
4. Válaszd a **Create application → Pages → Connect to Git** lehetőséget.
5. Válaszd ki a GitHub-repositoryt.
6. A telepítési beállításoknál használd ezeket az értékeket:

   - Framework preset: `None`
   - Build command: `exit 0`
   - Build output directory: `public`

7. Indítsd el a telepítést. A Cloudflare egy `pages.dev` címet ad az oldalhoz.

## Felépítés

- `public/index.html` – kezdőlap
- `public/art-work/*/index.html` – a portfólió aloldalai
- `public/404.html` – hibaoldal

Az oldal képei a `public/assets` mappában vannak. A tartalom az
`index.html`, a megjelenés a `styles.css`, az interakciók pedig a `script.js`
fájlban módosíthatók.

