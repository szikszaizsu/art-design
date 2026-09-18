# Szikszaizsu portfólió

Statikus változat a Framerben közzétett portfólióról. A mappa közvetlenül
publikálható GitHubról a Cloudflare Pages szolgáltatással.

## Cloudflare Pages beállítás

1. A GitHubon hozz létre egy új, nyilvános repositoryt.
2. Töltsd fel a repository gyökerébe ennek a mappának a tartalmát.
3. A Cloudflare vezérlőpultján nyisd meg a **Workers & Pages** részt.
4. Válaszd a **Create application → Pages → Connect to Git** lehetőséget.
5. Válaszd ki a GitHub-repositoryt.
6. A telepítési beállításoknál használd ezeket az értékeket:

   - Framework preset: `None`
   - Build command: hagyd üresen
   - Build output directory: `/`

7. Indítsd el a telepítést. A Cloudflare egy `pages.dev` címet ad az oldalhoz.

## Felépítés

- `index.html` – kezdőlap
- `art-work/*/index.html` – a portfólió aloldalai
- `404.html` – hibaoldal

Az oldal jelenlegi Framer képeket, betűtípusokat és JavaScript-modulokat a
`framerusercontent.com` kiszolgálóról tölti be. Emiatt a megjelenés megmarad,
de a másolat továbbra is függ a Framer külső erőforrásaitól.
