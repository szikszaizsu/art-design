(() => {
  const translations = {
    'Rólam': 'About me', 'Munkáim': 'My work', 'Elérhetőség': 'Contact details', 'Menü': 'Menu',
    'Vizuális alkotó · UX/UI tervező': 'Visual artist · UX/UI designer',
    'Művészi szem. MI-jártasság. Egyetlen vízió.': 'An artistic eye. AI expertise. One vision.',
    'A klasszikus vizuális gondolkodást digitális tapasztalattal kapcsolom össze, hogy karakteres képi világokat és átgondolt felhasználói élményeket alkossak.': 'I combine classical visual thinking with digital expertise to create distinctive visual worlds and thoughtful user experiences.',
    'Dolgozzunk együtt': 'Let’s work together',
    'Ötletből kép. Képből élmény. Élményből emlék.': 'From idea to image. From image to experience. From experience to memory.',
    'Ahol a klasszikus művészi vízió találkozik a digitális dizájnnal.': 'Where classical artistic vision meets digital design.',
    'A látomásom': 'My vision', 'A küldetésem': 'My mission', 'Filozófiám': 'My philosophy',
    'Képzőművészként kezdtem, ma pedig UX/UI tervezőként dolgozom – a klasszikus vizuális gondolkodást a digitális design logikájával ötvözve. Célom olyan vizuális élmények létrehozása, amelyek nemcsak szépek, hanem maradandó benyomást is hagynak. Számomra a mesterséges intelligencia nem helyettesíti a művészi víziót – hanem kiterjeszti azt. Bármilyen eszközt is használok, a szívem mélyén mindig művész maradok.': 'I started out as a fine artist and today I work as a UX/UI designer – blending classical visual thinking with the logic of digital design. My goal is to create visual experiences that are not only beautiful but also leave a lasting impression. For me, artificial intelligence does not replace artistic vision – it extends it. Whatever tools I use, at heart I will always remain an artist.',
    'Olyan vizuális kampányokat és felhasználói felületeket készítek, amelyek a klasszikus művészi víziót ötvözik a legújabb mesterséges intelligencia eszközökkel – mesterséges intelligencia által generált képeket, márkaidentitást és UX/UI designt egyaránt felölelve. Célom olyan vizuális élmények létrehozása, amelyek hitelesek, prémium minőségűek és könnyedén használhatóak.': 'I create visual campaigns and user interfaces that combine classical artistic vision with the latest artificial intelligence tools – spanning AI-generated imagery, brand identity and UX/UI design alike. My goal is to create visual experiences that are authentic, premium in quality and effortless to use.',
    'A technológia nem helyettesíti a művészi víziót – új eszközöket ad a kezébe, így a szépség és a funkcionalitás végre egymás mellett virágozhat.': 'Technology does not replace artistic vision – it puts new tools in its hands, so beauty and functionality can finally flourish side by side.',
    'Minden jegy egy döntés. Minden döntés egy vita. Nem hiszek a szerencsés véletlenekben – csak a több ezer órás munka során finomodott ösztönökben. A szakértelem az első. A koncepció következik. Az őszinteség tartja össze az egészet.': 'Every mark is a decision. Every decision is an argument. I don’t believe in happy accidents – only in instincts refined over thousands of hours of work. Craft comes first. Concept follows. Honesty holds it all together.',
    'Nem számít, milyen eszközökkel dolgozom, szívem mélyén mindig művész maradok – ez az alapja és hitelessége mindennek, amit alkotok.': 'No matter what tools I work with, deep down I will always remain an artist – it is the foundation and the authenticity of everything I create.',
    'Válogatott munkák': 'Selected work', '„Digitális tisztaság.': '“Digital clarity.', 'Kézzel alkotott lélek.”': 'A handcrafted soul.”',
    '01 · Vizuális kommunikáció': '01 · Visual communication', '02 · Kézzel készült': '02 · Handmade',
    'Digitális munkák': 'Digital work', 'Hagyományos technikák': 'Traditional techniques',
    'Mielőtt a képernyő lett az eszközöm, a kezem volt. A gyöngyszövés és a tojásírás ma is a legszemélyesebb nyelvem: lassú, türelmes munka, ahol semmit nem lehet átugrani, és semmi nem törölhető vissza. Apró elemekből áll össze a nagy egész, viaszból és színből a generációk óta őrzött minta. Ezek a munkák emlékeztetnek arra, hogy minden vonal döntés, és hogy a legjobb formák sokszor a legtürelmesebb kezektől születnek.': 'Before the screen became my tool, my hands were. Beadwork and wax-resist egg decorating are still my most personal language: slow, patient work where nothing can be skipped and nothing can be undone. Small elements form the whole; wax and colour create patterns preserved through generations. These works remind me that every line is a decision, and that the best forms are often made by the most patient hands.',
    'Vizuális kampányok, digitális illusztrációk és felületek, ahol az ötlet élménnyé válik.': 'Visual campaigns, digital illustrations and interfaces where ideas become experiences.',
    'Hagyományos technikák, amelyek türelemből, részletekből és személyes történetekből születnek.': 'Traditional techniques born from patience, details and personal stories.',
    'Belépés a kategóriákhoz ↗': 'Explore categories ↗', 'Kategória megnyitása ↗': 'Explore category ↗',
    'Van egy ötleted?': 'Have an idea?', 'Alkossuk meg együtt.': 'Let’s bring it to life.',
    'Legyen szó karakteres hirdetésről, átgondolt felületről vagy egyedi műalkotásról, minden jó projekt egy beszélgetéssel kezdődik.': 'Whether it is a striking advertisement, a thoughtful interface or a unique artwork, every great project starts with a conversation.',
    'Teljes név': 'Full name', 'E-mail cím': 'Email address', 'Üzenet': 'Message', 'Írj nekem': 'Get in touch',
    'Az üzenetet a FormSubmit továbbítja nekem. A küldéshez biztonsági ellenőrzésre lehet szükség.': 'FormSubmit delivers your message to me. A security check may be required before sending.',
    'Digitális és hagyományos alkotások egy személyes portfólióban.': 'Digital and traditional creations in a personal portfolio.',
    'Oldalak': 'Explore', 'Főoldal': 'Home', 'Lépj kapcsolatba velem': 'Get in touch', 'Kövess engem': 'Follow me',
    '© 2026 Szikszai Zsu. Minden jog fenntartva.': '© 2026 Szikszai Zsu. All rights reserved.',
    'Vissza a főoldalra ↑': 'Back to home ↑', 'Vissza a főoldalra': 'Back to home', '← Vissza a főoldalra': '← Back to home',
    '← Vissza a két fő területhez': '← Back to the main categories', '← Vissza a hagyományos kategóriákhoz': '← Back to traditional categories', '← Vissza a munkákhoz': '← Back to my work',
    'Digitális': 'Digital', 'Hagyományos': 'Traditional', 'munkák': 'work', 'technikák': 'techniques',
    'Digitális alkotások, ahol a vizuális ötlet, a történet és a felhasználói élmény találkozik.': 'Digital creations where visual ideas, storytelling and user experience meet.',
    'Közösségi média és hirdetések': 'Social media and advertising',
    'Kampányképek, digitális illusztráció és vizuális kommunikáció.': 'Campaign imagery, digital illustration and visual communication.',
    'Felhasználói élmény, felülettervezés és vizuális rendszerek.': 'User experience, interface design and visual systems.',
    'Gyöngyszövés': 'Bead weaving', 'Tojásírás': 'Wax-resist egg decorating', 'Tojásírás viasztechnikával': 'Wax-resist egg decorating', 'Nemezelés': 'Felting',
    'Amikor a gyapjú életre kel.': 'When wool comes to life.',
    'A nemezeléshez tartozó munkák hamarosan itt kapnak helyet.': 'Felting work will soon have its place here.',
    'Viselhető művészet, türelem és apró elemekből épülő minták.': 'Wearable art, patience and patterns built from tiny beads.',
    'Viasztechnika, örökség és generációkon át őrzött motívumok.': 'Wax-resist techniques, heritage and motifs preserved through generations.',
    'Kézművesség · Hagyomány': 'Craft · Tradition', 'Hagyományos mesterség': 'Traditional craft', 'Viselhető művészet': 'Wearable art', 'Kézzel készült': 'Handmade',
    'Apró gyöngyök, végtelen türelem. Minden darab egy gondolattal kezdődik – egy színnel, egy mintával, egy érzéssel, amihez ragaszkodni szeretnék. Itt kezdődik a munka: gyöngyről gyöngyre, sorról sorra, órákon, néha napokon át, amíg az elmémben lévő minta valósággá nem válik a kezem alatt.': 'Tiny beads, endless patience. Every piece begins with a thought – a colour, a pattern, a feeling I want to hold on to. This is where the work begins: bead by bead, row by row, for hours, sometimes days, until the pattern in my mind becomes real under my hands.',
    'Ez nem dekoráció – ez meditáció. Itt nincs helye a sietségnek, csak a jelenlétnek. Minden darab magában hordozza azt az állapotot, amelyben született: a türelmet, a figyelmet, a csendet. Bárki megtanulhatja a technikát – de a mögötte rejlő látás nem tanítható.': 'This is not decoration – it is meditation. There is no room for haste here, only for presence. Every piece carries the state in which it was born: patience, attention, silence. Anyone can learn the technique – but the vision behind it cannot be taught.',
    'Válogatás': 'A selection', 'További gyöngyszövött munkák': 'More beadwork', 'További tojásírásos munkák': 'More decorated eggs',
    'Hagyomány · Viasztechnika': 'Tradition · Wax-resist technique', 'Örökség': 'Heritage', 'Viaszírás': 'Wax-resist decorating',
    'Egy üres felület, egy kesice, egy csepp viasz – és lassan egy évszázados minta kel életre. A viasztechnikával végzett tojásdíszítés nem pusztán dekoráció – ez egy hagyomány, amelyet a saját kezemmel viszek tovább. Minden vonal egy döntés, minden minta egy történet – generációkon át ismétlődő, időkön át öröklődő formák.': 'An empty surface, a kistka, a drop of wax – and slowly a centuries-old pattern comes to life. Wax-resist egg decorating is not mere decoration – it is a tradition I carry on with my own hands. Every line is a decision, every pattern a story – forms repeated across generations and inherited through the ages.',
    'Ez nem gyors munka: a viasz felvitele ugyanolyan türelmet igényel, mint a gyöngyfonás – sorról sorra, formáról formára. Az eredmény törékeny, mégis tartós: egy tárgy, amely magában hordozza azt a csendet és figyelmet, amelyből született.': 'This is not quick work: applying the wax takes the same patience as beadwork – row by row, shape by shape. The result is fragile, yet lasting: an object that carries within it the silence and attention it was born from.',
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
    'Gyöngyszövött karkötők fekete háttéren': 'Beaded bracelets on a black background', 'Hagyományos mintájú gyöngyszövött pántok': 'Beaded bands with traditional patterns', 'Fekete, fehér és piros gyöngyszövött nyakpánt': 'Black, white and red beaded choker', 'Kézen viselt gyöngyszövött karkötő': 'Beaded bracelet worn on a wrist',
    'Hagyományosan díszített tojások kosárban': 'Traditionally decorated eggs in a basket', 'Kézzel írt tojások természetes kompozícióban': 'Hand-decorated eggs in a natural arrangement', 'Piros és fehér mintás írott tojások': 'Decorated eggs with red and white patterns', 'Viasztechnikával készült hagyományos tojások': 'Traditional eggs decorated using wax-resist techniques',
    'Szikszai Zsu művész és UX/UI tervező portfóliója — hagyományos alkotás, digitális design és MI egyetlen kreatív folyamatban.': 'Artist and UX/UI designer Szikszai Zsu’s portfolio — traditional art, digital design and AI in one creative process.',
    'Szikszai Zsu digitális munkáinak kategóriái.': 'Explore Szikszai Zsu’s digital work.', 'Szikszai Zsu hagyományos munkáinak kategóriái.': 'Explore Szikszai Zsu’s traditional work.', 'Szikszai Zsu hagyományos technikáinak kategóriái.': 'Explore Szikszai Zsu’s traditional techniques.', 'Szikszai Zsu hagyományos gyöngyszövései.': 'Traditional beadwork by Szikszai Zsu.', 'Szikszai Zsu hagyományos viaszos tojásírásai.': 'Traditional wax-resist egg decorating by Szikszai Zsu.', 'UX és UI tervezés Szikszai Zsutól.': 'UX and UI design by Szikszai Zsu.', 'Közösségi média és hirdetési design Szikszai Zsutól.': 'Social media and advertising design by Szikszai Zsu.'
  };
  const translate = (text) => {
    if (translations[text]) return translations[text];
    if (text.endsWith(' — Szikszai Zsu')) {
      const title = text.replace(' — Szikszai Zsu', '');
      return (title === 'Az oldal nem található' ? 'Page not found' : translations[title] || title) + ' — Szikszai Zsu';
    }
    if (text === 'Szikszai Zsu — Vizuális alkotó · UX/UI tervező') return 'Szikszai Zsu — Visual artist · UX/UI designer';
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
    if (english.startsWith('Szikszai Zsu — ')) return 'Szikszai Zsu — ' + ro['Visual artist · UX/UI designer'];
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
  switcher.innerHTML = '<button type="button" class="language-toggle" translate="no" aria-expanded="false"><span class="language-current"></span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div class="language-options"><button type="button" translate="no" lang="hu" data-lang="hu">HU</button><button type="button" translate="no" lang="en" data-lang="en">EN</button><button type="button" translate="no" lang="ro" data-lang="ro">RO</button></div>';
  header.append(switcher);
  const languageToggle = switcher.querySelector('.language-toggle');
  const setSwitcherOpen = open => {
    switcher.classList.toggle('open', open);
    languageToggle.setAttribute('aria-expanded', String(open));
  };
  document.addEventListener('click', event => {
    if (!switcher.contains(event.target)) setSwitcherOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setSwitcherOpen(false);
  });
  function setLanguage(lang) {
    const english = lang === 'en';
    document.documentElement.lang = lang;
    texts.forEach(([node, original]) => {
      node.textContent = original.replace(original.trim(), localize(original.trim(), lang));
    });
    attributes.forEach(([el, attr, original]) => el.setAttribute(attr, localize(original, lang)));
    document.title = localize(title, lang);
    switcher.setAttribute('aria-label', lang === 'ro' ? 'Limbă' : english ? 'Language' : 'Nyelv');
    const names = { hu: 'Magyar', en: 'English', ro: 'Română' };
    switcher.querySelector('.language-current').textContent = lang.toUpperCase();
    languageToggle.setAttribute('aria-label', `${lang === 'ro' ? 'Limbă' : english ? 'Language' : 'Nyelv'}: ${names[lang]}`);
    switcher.querySelectorAll('button[data-lang]').forEach(button => {
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
    if (button === languageToggle) {
      setSwitcherOpen(!switcher.classList.contains('open'));
      return;
    }
    setSwitcherOpen(false);
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
