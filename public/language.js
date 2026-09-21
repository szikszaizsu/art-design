(() => {
  const translations = {
    'Rólam': 'About me', 'Munkáim': 'My work', 'Elérhetőség': 'Contact details', 'Menü': 'Menu',
    'Egyszemélyes kreatív osztály': 'A one-person creative department',
    'Művészi szem. MI-jártasság. Egyetlen vízió.': 'An artistic eye. AI expertise. One vision.',
    'A klasszikus vizuális gondolkodást digitális tapasztalattal kapcsolom össze, hogy karakteres képi világokat és átgondolt felhasználói élményeket alkossak.': 'I combine classical visual thinking with digital expertise to create distinctive visual worlds and thoughtful user experiences.',
    'Dolgozzunk együtt': 'Let’s work together',
    'Ötletből kép. Képből élmény. Élményből emlék.': 'From idea to image. From image to experience. From experience to memory.',
    'Ahol a klasszikus művészi vízió találkozik a digitális dizájnnal.': 'Where classical artistic vision meets digital design.',
    'Az utam': 'My journey', 'Amit alkotok': 'What I create', 'A szemléletem': 'My approach',
    'Művészként indultam, ma pedig digitális alkotóként és UX/UI tervezőként dolgozom. A hagyományos kézművességet, a vizuális tervezést és az MI lehetőségeit egyetlen kreatív folyamatban kapcsolom össze.': 'I started as an artist and now work as a digital creator and UX/UI designer. I bring traditional craft, visual design and the possibilities of AI together in a single creative process.',
    'Vizuális kampányokat, márkaképeket és felhasználói felületeket tervezek. Minden eszköz az ötletet szolgálja, a végeredmény pedig egyszerre legyen szép, világos és emlékezetes.': 'I design visual campaigns, brand imagery and user interfaces. Every tool serves the idea, with results that are beautiful, clear and memorable.',
    'Minden vonal döntés. A mesterség adja az alapot, a gondolat az irányt, az őszinteség pedig összetartja az egészet. Bármilyen eszközzel dolgozom, legbelül mindig művész maradok.': 'Every line is a decision. Craft provides the foundation, ideas give direction, and honesty holds it all together. Whatever tools I use, I remain an artist at heart.',
    'Válogatott munkák': 'Selected work', '„Digitális tisztaság.': '“Digital clarity.', 'Kézzel alkotott lélek.”': 'A handcrafted soul.”',
    '01 · Vizuális kommunikáció': '01 · Visual communication', '02 · Kézzel készült': '02 · Handmade',
    'Digitális munkák': 'Digital work', 'Hagyományos technikák': 'Traditional techniques',
    'Vizuális kampányok, digitális illusztrációk és felületek, ahol az ötlet élménnyé válik.': 'Visual campaigns, digital illustrations and interfaces where ideas become experiences.',
    'Hagyományos technikák, amelyek türelemből, részletekből és személyes történetekből születnek.': 'Traditional techniques born from patience, details and personal stories.',
    'Belépés a kategóriákhoz ↗': 'Explore categories ↗', 'Kategória megnyitása ↗': 'Explore category ↗',
    'Van egy ötleted?': 'Have an idea?', 'Alkossuk meg együtt.': 'Let’s bring it to life.',
    'Legyen szó karakteres hirdetésről, átgondolt felületről vagy egyedi műalkotásról, minden jó projekt egy beszélgetéssel kezdődik.': 'Whether it is a striking advertisement, a thoughtful interface or a unique artwork, every great project starts with a conversation.',
    'Teljes név': 'Full name', 'E-mail': 'Email', 'Miben segíthetek?': 'How can I help?', 'Üzenet': 'Message', 'Írj nekem': 'Get in touch',
    'UX/UI tervezés': 'UX/UI design', 'Digitális illusztráció': 'Digital illustration', 'Márka- és kampányvizuál': 'Brand and campaign visuals', 'Képzőművészet': 'Fine art', 'Egyéb': 'Other',
    'Az üzenetet a FormSubmit továbbítja nekem. A küldéshez biztonsági ellenőrzésre lehet szükség.': 'FormSubmit delivers your message to me. A security check may be required before sending.',
    'Digitális és hagyományos alkotások egy személyes portfólióban.': 'Digital and traditional creations in a personal portfolio.',
    'Oldalak': 'Explore', 'Főoldal': 'Home', 'Lépj kapcsolatba velem': 'Get in touch', 'Kövess engem': 'Follow me',
    '© 2026 Szikszai Zsu. Minden jog fenntartva.': '© 2026 Szikszai Zsu. All rights reserved.',
    'Vissza a főoldalra ↑': 'Back to home ↑', 'Vissza a főoldalra': 'Back to home', '← Vissza a főoldalra': '← Back to home',
    '← Vissza a két fő területhez': '← Back to the main categories', '← Vissza a hagyományos kategóriákhoz': '← Back to traditional categories', '← Vissza a munkákhoz': '← Back to my work',
    'Digitális': 'Digital', 'Hagyományos': 'Traditional', 'munkák': 'work',
    'Digitális alkotások, ahol a vizuális ötlet, a történet és a felhasználói élmény találkozik.': 'Digital creations where visual ideas, storytelling and user experience meet.',
    'Közösségi média és hirdetések': 'Social media and advertising',
    'Kampányképek, digitális illusztráció és vizuális kommunikáció.': 'Campaign imagery, digital illustration and visual communication.',
    'Felhasználói élmény, felülettervezés és vizuális rendszerek.': 'User experience, interface design and visual systems.',
    'Gyöngyfűzés': 'Beadwork', 'Tojásírás': 'Wax-resist egg decorating',
    'Viselhető művészet, türelem és apró elemekből épülő minták.': 'Wearable art, patience and patterns built from tiny beads.',
    'Viasztechnika, örökség és generációkon át őrzött motívumok.': 'Wax-resist techniques, heritage and motifs preserved through generations.',
    'Kézművesség · Hagyomány': 'Craft · Tradition', 'Hagyományos mesterség': 'Traditional craft', 'Viselhető művészet': 'Wearable art', 'Kézzel készült': 'Handmade',
    'Apró gyöngyök, végtelen türelem. Minden darab egy gondolattal kezdődik: egy színnel, mintával vagy érzéssel, amelyet szeretnék megőrizni. Gyöngyről gyöngyre, sorról sorra válik valósággá a kezemben.': 'Tiny beads, endless patience. Every piece begins with an idea: a colour, a pattern or a feeling I want to preserve. Bead by bead, row by row, it takes shape in my hands.',
    'Ez több mint díszítés: elmélyülés. Minden darab magában hordozza azt a figyelmet és csendet, amelyben megszületett.': 'This is more than decoration: it is a meditative practice. Each piece carries the care and stillness in which it was created.',
    'Válogatás': 'A selection', 'További gyöngyfűzött munkák': 'More beadwork', 'További tojásírásos munkák': 'More decorated eggs',
    'Hagyomány · Viasztechnika': 'Tradition · Wax-resist technique', 'Örökség': 'Heritage', 'Viaszírás': 'Wax-resist decorating',
    'Egy üres felület, egy íróka és egy csepp viasz: lassan életre kel egy évszázados minta. Minden vonal döntés, minden motívum pedig nemzedékeken át továbbadott történet.': 'A blank surface, a wax pen and a drop of wax: slowly, a centuries-old pattern comes to life. Every line is a decision, and every motif a story passed down through generations.',
    'Az eredmény törékeny, mégis maradandó: egy tárgy, amely őrzi a türelmet, a figyelmet és az alkotás csendjét.': 'The result is fragile yet enduring: an object that preserves the patience, care and quiet of its creation.',
    'Digitális design · Felhasználói élmény': 'Digital design · User experience', 'Felhasználói élmény': 'User experience', 'Felülettervezés': 'Interface design', 'Vizuális rendszerek': 'Visual systems',
    'Design, amely az első kattintástól az utolsó lépésig működik. A vizuális ritmust, a világos hierarchiát és az emberközpontú gondolkodást ötvözöm, hogy a felületek természetesek és megkülönböztethetők legyenek.': 'Design that works from the first click to the final step. I combine visual rhythm, clear hierarchy and human-centred thinking to create interfaces that feel natural and distinctive.',
    'Digitális illusztráció · Kampány': 'Digital illustration · Campaign', 'Művészeti irány': 'Art direction', 'Kampányvizuál': 'Campaign visuals', 'Digitális alkotás': 'Digital creation',
    'A merész ötletekből világos vizuális üzenetek születnek. A művészi kompozíciót, a digitális illusztrációt és a célzott kommunikációt kapcsolom össze emlékezetes közösségimédia- és hirdetési megjelenésekké.': 'Bold ideas become clear visual messages. I bring artistic composition, digital illustration and focused communication together to create memorable social media and advertising visuals.',
    'Ez az oldal elkalandozott.': 'This page has wandered off.', 'A cím megváltozhatott, de az alkotások továbbra is itt vannak.': 'The address may have changed, but the artwork is still here.',
    'Ugrás az oldal tetejére': 'Back to top', 'Fő navigáció': 'Main navigation', 'Alkotói hitvallás': 'Creative philosophy', 'Digitális kategóriák': 'Digital categories', 'Hagyományos kategóriák': 'Traditional categories',
    'Szikszai Zsu a Facebookon': 'Szikszai Zsu on Facebook', 'Szikszai Zsu az Instagramon': 'Szikszai Zsu on Instagram',
    'Szikszai Zsu portréja': 'Portrait of Szikszai Zsu', 'Szikszai Zsu alkotás közben': 'Szikszai Zsu at work',
    'Belépés a digitális munkákhoz': 'Explore digital work', 'Belépés a hagyományos technikákhoz': 'Explore traditional techniques',
    'Hagyományos piros, fekete és fehér gyöngyékszer': 'Traditional red, black and white beaded jewellery', 'Kosár hagyományosan díszített tojásokkal': 'Basket of traditionally decorated eggs',
    'Közösségi média és hirdetési grafika': 'Social media and advertising graphics', 'Közösségi média és hirdetési koncepció': 'Social media and advertising concept', 'Letisztult UX és UI design': 'Clean UX and UI design',
    'Gyöngyfűzött karkötők fekete háttéren': 'Beaded bracelets on a black background', 'Hagyományos mintájú gyöngyfűzött pántok': 'Beaded bands with traditional patterns', 'Fekete, fehér és piros gyöngyfűzött nyakpánt': 'Black, white and red beaded choker', 'Kézen viselt gyöngyfűzött karkötő': 'Beaded bracelet worn on a wrist',
    'Hagyományosan díszített tojások kosárban': 'Traditionally decorated eggs in a basket', 'Kézzel írt tojások természetes kompozícióban': 'Hand-decorated eggs in a natural arrangement', 'Piros és fehér mintás írott tojások': 'Decorated eggs with red and white patterns', 'Viasztechnikával készült hagyományos tojások': 'Traditional eggs decorated using wax-resist techniques',
    'Szikszai Zsu művész és UX/UI tervező portfóliója — hagyományos alkotás, digitális design és MI egyetlen kreatív folyamatban.': 'Artist and UX/UI designer Szikszai Zsu’s portfolio — traditional art, digital design and AI in one creative process.',
    'Szikszai Zsu digitális munkáinak kategóriái.': 'Explore Szikszai Zsu’s digital work.', 'Szikszai Zsu hagyományos munkáinak kategóriái.': 'Explore Szikszai Zsu’s traditional work.', 'Szikszai Zsu hagyományos gyöngyfűzései.': 'Traditional beadwork by Szikszai Zsu.', 'Szikszai Zsu hagyományos viaszos tojásírásai.': 'Traditional wax-resist egg decorating by Szikszai Zsu.', 'UX és UI tervezés Szikszai Zsutól.': 'UX and UI design by Szikszai Zsu.', 'Közösségi média és hirdetési design Szikszai Zsutól.': 'Social media and advertising design by Szikszai Zsu.'
  };
  const translate = (text) => {
    if (translations[text]) return translations[text];
    if (text.endsWith(' — Szikszai Zsu')) {
      const title = text.replace(' — Szikszai Zsu', '');
      return (title === 'Az oldal nem található' ? 'Page not found' : translations[title] || title) + ' — Szikszai Zsu';
    }
    if (text === 'Szikszai Zsu — Egyszemélyes kreatív osztály') return 'Szikszai Zsu — A one-person creative department';
    return text;
  };
  const texts = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.parentElement.closest('script, style') && node.textContent.trim()) texts.push([node, node.textContent]);
  }
  const attributes = [];
  document.querySelectorAll('[alt], [aria-label], meta[name="description"]').forEach(el => {
    ['alt', 'aria-label', 'content'].forEach(attr => {
      if (el.hasAttribute(attr)) attributes.push([el, attr, el.getAttribute(attr)]);
    });
  });
  const title = document.title;
  const localize = (text, lang) => {
    if (lang === 'hu') return text;
    const english = translate(text);
    if (lang === 'en') return english;
    if (text === 'munkák') return location.pathname.includes('hagyomanyos') ? 'tradiționale' : 'digitale';
    const ro = window.portfolioRomanian || {};
    if (ro[english]) return ro[english];
    if (english.endsWith(' — Szikszai Zsu')) {
      const base = english.replace(' — Szikszai Zsu', '');
      return (base === 'Page not found' ? 'Pagina nu a fost găsită' : ro[base] || base) + ' — Szikszai Zsu';
    }
    if (english.startsWith('Szikszai Zsu — ')) return 'Szikszai Zsu — ' + ro['A one-person creative department'];
    return english;
  };
  let header = document.querySelector('.site-header');
  if (!header) {
    header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = '<a class="brand" href="/">SZIKSZAI <span>ZSU</span></a>';
    document.body.prepend(header);
  }
  const switcher = document.createElement('div');
  switcher.className = 'language-switch notranslate';
  switcher.setAttribute('translate', 'no');
  switcher.setAttribute('role', 'group');
  switcher.innerHTML = '<button type="button" translate="no" lang="hu" data-lang="hu">HU</button><button type="button" translate="no" lang="en" data-lang="en">EN</button><button type="button" translate="no" lang="ro" data-lang="ro">RO</button>';
  header.append(switcher);
  function setLanguage(lang) {
    const english = lang === 'en';
    document.documentElement.lang = lang;
    texts.forEach(([node, original]) => {
      node.textContent = original.replace(original.trim(), localize(original.trim(), lang));
    });
    attributes.forEach(([el, attr, original]) => el.setAttribute(attr, localize(original, lang)));
    document.title = localize(title, lang);
    switcher.setAttribute('aria-label', lang === 'ro' ? 'Limbă' : english ? 'Language' : 'Nyelv');
    switcher.querySelectorAll('button').forEach(button => {
      button.textContent = button.dataset.lang.toUpperCase();
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
      button.setAttribute('aria-label', { hu: 'Magyar', en: 'English', ro: 'Română' }[button.dataset.lang]);
    });
    try { localStorage.setItem('portfolio-language', lang); } catch {}
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href.startsWith('#') || /^(mailto:|tel:)/.test(href)) return;
      const url = new URL(href || '/', location.href);
      if (url.origin !== location.origin) return;
      url.searchParams.set('lang', lang);
      link.href = url.pathname + url.search + url.hash;
    });
  }
  switcher.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    setLanguage(button.dataset.lang);
    const url = new URL(location.href);
    url.searchParams.set('lang', button.dataset.lang);
    history.replaceState(null, '', url);
  });
  let saved;
  try { saved = localStorage.getItem('portfolio-language'); } catch {}
  const requested = new URLSearchParams(location.search).get('lang');
  setLanguage(['hu', 'en', 'ro'].includes(requested || saved) ? requested || saved : 'hu');
})();
